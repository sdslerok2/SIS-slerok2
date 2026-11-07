/**
 * SIS SD Negeri Slerok 2 — Router data (supabase.js)
 * ---------------------------------------------------------------------------
 *  • BACA  : langsung ke Supabase (REST/PostgREST) — cepat, dibatasi RLS per peran.
 *  • TULIS : ke Google Apps Script (GAS_URL) → divalidasi → disimpan ke Supabase.
 *  • LOGIN : username + sandi → Supabase Auth (email bayangan, tidak pernah dikirimi surel).
 * Bentuk balasan sama dengan versi Apps Script lama: { success, data, message }.
 * Tanpa pustaka tambahan (hanya fetch), sehingga ringan dan aman di iframe Blogger.
 */
(function (window) {
  'use strict';
  const CFG = window.APP_CONFIG || {};
  // Toleran terhadap salah tempel: buang spasi, garis miring di akhir, dan akhiran /rest/v1 atau /auth/v1
  const URL0 = String(CFG.SUPABASE_URL || '').trim().replace(/\/+$/, '').replace(/\/(rest|auth)\/v1$/, '').replace(/\/+$/, '');
  const KEY = CFG.SUPABASE_ANON_KEY || '';
  const SIAP = !!(URL0 && KEY && CFG.GAS_URL);
  const PUBLIK = ['apiLogin', 'apiLogout', 'apiPublik', 'apiVerifikasi', 'apiLupaSandi', 'apiKirimPesan'];
  const STAF = ['Admin', 'KepalaSekolah', 'GuruKelas', 'GuruMapel'];

  const ok = (d, m) => ({ success: true, data: d === undefined ? null : d, message: m || 'OK' });
  const fail = (m, x) => Object.assign({ success: false, message: m }, x || {});
  const bersih = r => { const o = {}; Object.keys(r || {}).forEach(k => { o[k] = r[k] === null || r[k] === undefined ? '' : String(r[k]); }); return o; };

  /* ---------------- Sesi Supabase Auth ---------------- */
  const KS = 'sis2_sb';
  const area = () => { try { return localStorage.getItem('sis2_ingat') === '0' ? sessionStorage : localStorage; } catch (e) { return null; } };
  let sesi = null;
  try { sesi = JSON.parse(localStorage.getItem(KS) || sessionStorage.getItem(KS) || 'null'); } catch (e) { sesi = null; }
  function simpanSesi(s) {
    sesi = s;
    try { localStorage.removeItem(KS); sessionStorage.removeItem(KS); if (s) area().setItem(KS, JSON.stringify(s)); } catch (e) { }
  }
  function emailAkun(username) {
    const u = String(username || '').trim().toLowerCase().replace(/@/g, '.at.').replace(/[^a-z0-9._+-]/g, '-');
    return u + '@' + (CFG.AUTH_DOMAIN || 'akun.sdnslerok2.id');
  }
  /** Ubah pesan teknis Supabase menjadi penjelasan yang bisa ditindaklanjuti (null = bukan masalah konfigurasi). */
  function masalahKonfigurasi(status, pesan) {
    const m = String(pesan || '');
    if (/secret API key|service_role/i.test(m)) return 'SUPABASE_ANON_KEY di js/config.js berisi kunci RAHASIA (service_role/secret). Ganti dengan anon public / Publishable key, lalu buat ulang secret key di Supabase.';
    if (/Invalid API key|No API key|apikey|Unregistered API key|JWS|JWT|signature/i.test(m) || (status === 401 && !/credential/i.test(m))) return 'SUPABASE_ANON_KEY di js/config.js salah atau bukan dari project ini. Salin ulang dari Supabase → Project Settings → API Keys (anon public / Publishable key).';
    if (/Email logins are disabled|email.*disabled|provider is not enabled/i.test(m)) return 'Login email dimatikan di Supabase. Buka Authentication → Sign In / Providers → Email → aktifkan (Enable), lalu Save.';
    if (status === 404) return 'SUPABASE_URL di js/config.js salah. Isi dengan Project URL (https://xxxx.supabase.co) dari Project Settings → Data API.';
    if (/function .* does not exist|Could not find the function|PGRST202/i.test(m)) return 'Fungsi database belum ada. Jalankan ulang SETUP_SUPABASE.sql di Supabase SQL Editor sampai muncul ✅ SETUP SELESAI.';
    return null;
  }
  async function authFetch(path, body, token) {
    const h = { apikey: KEY, 'Content-Type': 'application/json' };
    if (token) h.Authorization = 'Bearer ' + token;
    let res;
    try { res = await fetch(URL0 + '/auth/v1/' + path, { method: 'POST', headers: h, body: JSON.stringify(body || {}) }); }
    catch (e) { return { ok: false, status: 0, json: { message: 'jaringan' } }; }
    const t = await res.text(); let j = {}; try { j = t ? JSON.parse(t) : {}; } catch (e) { }
    return { ok: res.ok, status: res.status, json: j };
  }
  let refreshJalan = null;
  /** Access token yang masih berlaku (diperbarui otomatis). null = harus login ulang. */
  async function token() {
    if (!sesi || !sesi.access_token) return null;
    if ((sesi.expires_at || 0) * 1000 - Date.now() > 60000) return sesi.access_token;
    if (!refreshJalan) refreshJalan = (async () => {
      try {
        const r = await authFetch('token?grant_type=refresh_token', { refresh_token: sesi.refresh_token });
        if (!r.ok) { simpanSesi(null); return null; }
        simpanSesi(simpanBentuk(r.json)); return sesi.access_token;
      } catch (e) { return sesi.access_token; }   // offline: pakai token lama, biar antrean menunggu
      finally { setTimeout(() => { refreshJalan = null; }, 0); }
    })();
    return refreshJalan;
  }
  function simpanBentuk(j) { return { access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at || Math.floor(Date.now() / 1000) + (j.expires_in || 3600) }; }

  /* ---------------- REST Supabase (baca) ---------------- */
  class SesiHabis extends Error { }
  async function rest(path, opsi) {
    opsi = opsi || {};
    const t = opsi.anon ? null : await token();
    if (!opsi.anon && !t) throw new SesiHabis('Sesi berakhir.');
    const h = Object.assign({ apikey: KEY }, opsi.headers || {});
    // Kunci baru sb_publishable_… bukan JWT: jangan dikirim sebagai Bearer
    if (t) h.Authorization = 'Bearer ' + t; else if (!/^sb_/.test(KEY)) h.Authorization = 'Bearer ' + KEY;
    if (opsi.body !== undefined) h['Content-Type'] = 'application/json';
    const res = await fetch(URL0 + '/rest/v1/' + path, { method: opsi.method || 'GET', headers: h, body: opsi.body === undefined ? undefined : JSON.stringify(opsi.body) });
    const txt = await res.text();
    if (res.status === 401 && !opsi.anon) { simpanSesi(null); throw new SesiHabis('Sesi berakhir.'); }
    if (!res.ok) { let m = txt; try { const j = JSON.parse(txt); m = j.message || j.msg || m; } catch (e) { } if (/permission denied|42501/.test(m)) throw new Error('Akses ditolak.'); throw new Error(masalahKonfigurasi(res.status, m) || 'Database: ' + m); }
    return { json: txt ? JSON.parse(txt) : null, range: res.headers.get('Content-Range') || '' };
  }
  const rpc = (fn, args, anon) => rest('rpc/' + fn, { method: 'POST', body: args || {}, anon: anon }).then(r => r.json);
  const enc = encodeURIComponent;
  const fIn = a => 'in.(' + a.map(v => '"' + String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"').join(',') + ')';
  /** Ambil semua baris (paging paralel; Supabase membatasi 1000 baris per permintaan). */
  async function semua(tabel, query, select) {
    const kol = select || (tabel === 'Users' ? (window.KOLOM.Users || []).filter(c => c !== 'auth_id').join(',') : '*');
    const base = enc(tabel) + '?select=' + kol + (query ? '&' + query : '') + '&order=' + (tabel === 'Pengaturan' ? 'kunci.asc' : 'dibuat.asc,id.asc');
    const first = await rest(base + '&limit=1000&offset=0', { headers: { Prefer: 'count=exact' } });
    let rows = first.json || [];
    const total = Number(String(first.range).split('/')[1]);
    if (isFinite(total) && total > rows.length && rows.length) {
      const hal = rows.length, jobs = [];
      for (let off = hal; off < total; off += hal) jobs.push(rest(base + '&limit=' + hal + '&offset=' + off).then(r => r.json || []));
      (await Promise.all(jobs)).forEach(r => { rows = rows.concat(r); });
    }
    return rows.map(bersih);
  }

  /* ---------------- Peran (sama dengan Kode.gs) ---------------- */
  function tokenPeran(u) {
    let t = '';
    if (u.peran === 'Admin') t += 'A';
    if (u.peran === 'KepalaSekolah') t += 'K';
    if (u.peran === 'GuruKelas' || u.peran === 'GuruMapel') t += 'G';
    if (u.tugas && u.tugas.indexOf('Bendahara') > -1) t += 'B';
    if (u.peran === 'Siswa') t += 'S';
    if (u.peran === 'OrangTua') t += 'O';
    return t;
  }
  const punya = (acl, u) => tokenPeran(u).split('').some(c => String(acl || '').indexOf(c) > -1);
  function bentukUser(p) {
    return {
      id: p.id, username: p.username, nama: p.nama, peran: p.peran, email: p.email,
      tugas: String(p.tugas_tambahan || '').split(',').map(s => s.trim()).filter(Boolean),
      id_guru: p.id_guru || '', anak: String(p.id_siswa_terkait || '').split(',').map(s => s.trim()).filter(Boolean),
      wajib_ganti: p.wajib_ganti_sandi === 'Ya'
    };
  }
  let userCache = null, userWaktu = 0, setCache = null;
  async function userSaya(paksa) {
    if (!paksa && userCache && Date.now() - userWaktu < 60000) return userCache;
    const p = await rpc('profil_saya');
    if (!p || p.status !== 'Aktif') { simpanSesi(null); throw new SesiHabis('Akun tidak terdaftar atau nonaktif.'); }
    userCache = bentukUser(p); userWaktu = Date.now(); return userCache;
  }
  async function pengaturan() {
    const o = Object.assign({}, window.PENGATURAN_AWAL || {});
    (await semua('Pengaturan', '', '*').catch(() => [])).forEach(r => { if (r.kunci) o[r.kunci] = r.nilai; });
    setCache = o; return o;
  }
  const sekarang = () => { const d = new Date(Date.now() + 7 * 3600e3).toISOString(); return d.slice(0, 10) + ' ' + d.slice(11, 19); };

  /* ---------------- Aksi BACA langsung ---------------- */
  async function bacaTabel(daftar, u) {
    const data = {};
    await Promise.all(daftar.map(async n => { data[n] = await semua(n); }));
    return data;
  }
  const READ = {
    async apiBootstrap() {
      const u = await userSaya(true);
      const sk = window.SKEMA, daftar = Object.keys(sk).filter(n => !sk[n].besar && punya(sk[n].acl.r, u));
      const staf = STAF.indexOf(u.peran) > -1, ortu = u.peran === 'Siswa' || u.peran === 'OrangTua';
      const [data, set, cx, anak, stat] = await Promise.all([
        bacaTabel(daftar, u), pengaturan(), rpc('konteks_saya'),
        ortu ? rpc('anak_saya') : Promise.resolve([]),
        staf ? rpc('statistik_dashboard').catch(() => null) : Promise.resolve(null)
      ]);
      if (!data.Tahun_Ajaran) data.Tahun_Ajaran = (await semua('Tahun_Ajaran')).map(x => ({ id: x.id, nama: x.nama, tgl_mulai: x.tgl_mulai, tgl_selesai: x.tgl_selesai, aktif: x.aktif }));
      const k = { kelasWali: cx.kelasWali || [], kelasAjar: cx.kelasAjar || [], mapelAjar: cx.mapelAjar || {}, anak: cx.anak || [] };
      if (k.anak.length) data.Anak = (anak || []).map(bersih);
      return { user: u, cx: k, data: data, schema: window.SKEMA, pengaturan: set, statistik: stat, versi: window.APP_VERSI, waktu: sekarang() };
    },
    async apiTarik(daftar) {
      const u = await userSaya(), sk = window.SKEMA;
      const boleh = (daftar || []).filter(n => sk[n] && !sk[n].besar && punya(sk[n].acl.r, u));
      return { data: await bacaTabel(boleh, u), waktu: sekarang() };
    },
    async apiAbsensi(idKelas, bulan) {
      await wajibStaf();
      return semua('Absensi_Siswa', 'id_kelas=eq.' + enc(idKelas) + '&tanggal=like.' + enc(bulan + '*'));
    },
    async apiAbsensiGuruBulan(bulan) {
      await wajibStaf();
      return semua('Absensi_Guru', 'tanggal=like.' + enc(bulan + '*'));
    },
    async apiNilai(idKelas, semester, idMapel) {
      await wajibStaf();
      const th = (setCache || await pengaturan()).tahun_ajaran_aktif;
      const rows = await semua('Nilai', 'id_kelas=eq.' + enc(idKelas) + '&semester=eq.' + enc(semester) + (idMapel ? '&id_mapel=eq.' + enc(idMapel) : ''));
      return rows.filter(n => !th || !n.id_tahun || n.id_tahun === th);
    },
    async apiAksi_log(p) {
      const u = await userSaya();
      if (u.peran !== 'Admin' && u.peran !== 'KepalaSekolah') throw new Error('Akses ditolak.');
      const r = await rest('Log_Aktivitas?select=*&order=waktu.desc&limit=' + (p && p.cari ? 5000 : ((p && p.batas) || 500)));
      let rows = (r.json || []).map(bersih);
      if (p && p.cari) { const q = String(p.cari).toLowerCase(); rows = rows.filter(x => JSON.stringify(x).toLowerCase().indexOf(q) > -1); }
      return rows.slice(0, (p && p.batas) || 500);
    },
    async apiAksi_statistik() { await wajibStaf(); return rpc('statistik_dashboard'); }
  };
  async function wajibStaf() { const u = await userSaya(); if (STAF.indexOf(u.peran) < 0) throw new Error('Akses ditolak.'); return u; }

  /* ---------------- Tulis lewat Apps Script ---------------- */
  async function gas(fn, args, tok) {
    let res;
    try {
      res = await fetch(CFG.GAS_URL, { method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ fn: fn, token: tok || '', args: args || [] }) });
    } catch (e) { throw new Error('Koneksi ke server Apps Script terputus. Periksa internet Anda.'); }
    const t = await res.text();
    try { return JSON.parse(t); } catch (e) { return fail('Server Apps Script membalas HTTP ' + res.status + ' (bukan JSON). Periksa GAS_URL dan deployment "Siapa saja".'); }
  }

  /* ---------------- Login / logout / publik ---------------- */
  async function login(username, sandi) {
    username = String(username || '').trim().toLowerCase();
    if (!username || !sandi) return fail('Username dan kata sandi wajib diisi.');
    const r = await authFetch('token?grant_type=password', { email: emailAkun(username), password: sandi });
    if (!r.ok) {
      const m = String(r.json.error_description || r.json.msg || r.json.message || '');
      if (r.status === 429 || /rate|too many/i.test(m)) return fail('Terlalu banyak percobaan. Coba lagi beberapa menit lagi.');
      if (/banned/i.test(m + (r.json.error || '') + (r.json.error_code || ''))) return fail('Akun dinonaktifkan. Hubungi operator sekolah.');
      if (r.status === 0) return fail('Tidak dapat terhubung ke Supabase. Periksa internet dan SUPABASE_URL di js/config.js (harus https://xxxx.supabase.co).');
      const k = masalahKonfigurasi(r.status, m + ' ' + (r.json.error_code || '') + ' ' + (r.json.error || ''));
      if (k) return fail(k);
      return fail('Username atau kata sandi salah.');
    }
    simpanSesi(simpanBentuk(r.json));
    try {
      const u = await userSaya(true);
      gas('apiProfil', [], sesi.access_token).catch(() => { });   // catat login (latar belakang)
      return ok({ token: sesi.access_token, user: u });
    } catch (e) { return fail('Akun tidak terdaftar atau nonaktif. Hubungi operator sekolah.'); }
  }
  async function logout() {
    const t = sesi && sesi.access_token;
    simpanSesi(null); userCache = null;
    if (t) authFetch('logout', {}, t).catch(() => { });
    return ok();
  }

  /** Pintu tunggal semua panggilan data dari aplikasi. */
  async function route(fn, args) {
    args = (args || []).slice();
    if (!SIAP) return fail('Aplikasi belum dikonfigurasi. Isi SUPABASE_URL, SUPABASE_ANON_KEY, dan GAS_URL di js/config.js.');
    try {
      if (fn === 'apiLogin') return await login(args[0], args[1]);
      if (fn === 'apiLogout') return await logout();
      if (fn === 'apiPublik') return ok(await rpc('web_publik', {}, true));
      if (fn === 'apiVerifikasi') return ok(await rpc('verifikasi_dokumen', { p_kode: String(args[0] || '') }, true));
      if (PUBLIK.indexOf(fn) > -1) return await gas(fn, args, '');
      args.shift();                                   // buang token lama; pakai token Supabase terbaru
      const sub = fn === 'apiAksi' ? 'apiAksi_' + args[0] : '';
      if (READ[sub]) return ok(await READ[sub](args[1] || {}));
      if (READ[fn]) return ok(await READ[fn].apply(null, args));
      const t = await token();
      if (!t) return fail('Sesi berakhir. Silakan masuk kembali.', { sesi: true });
      const r = await gas(fn, args, t);
      if (r && r.success && /^api(Simpan|Hapus|Aksi)/.test(fn)) { setCache = null; if (fn === 'apiAksi' && /resetSandi|simpanPengaturan/.test(args[0])) userCache = null; }
      return r;
    } catch (e) {
      if (e instanceof SesiHabis) return fail(e.message === 'Sesi berakhir.' ? 'Sesi berakhir. Silakan masuk kembali.' : e.message, { sesi: true });
      if (e instanceof TypeError) return fail(fn === 'apiPublik' ? 'Tidak dapat terhubung ke Supabase. Periksa internet dan SUPABASE_URL di js/config.js.' : 'Koneksi ke database terputus. Periksa internet Anda.', { jaringan: fn !== 'apiPublik' });
      return fail(e.message || String(e));
    }
  }

  window.SB = { route: route, siap: SIAP, punyaSesi: () => !!(sesi && sesi.access_token), emailAkun: emailAkun, _rest: rest, _rpc: rpc };
})(typeof window !== 'undefined' ? window : globalThis);
