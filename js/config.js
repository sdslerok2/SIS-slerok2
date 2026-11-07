/**
 * KONFIGURASI APLIKASI — isi 4 nilai di bawah ini (lihat README langkah 5).
 * Aman dipublikasikan: anon key memang untuk browser. JANGAN pernah menaruh
 * service_role / secret key di file ini.
 */
window.APP_CONFIG = {
  // Supabase → Project Settings → Data API → Project URL
  SUPABASE_URL: 'https://ynmpciortikpnxfodyoq.supabase.co/rest/v1/',
  // Supabase → Project Settings → API Keys → anon public (atau Publishable key sb_publishable_...)
  SUPABASE_ANON_KEY: 'sb_publishable_gJ3H83NRDkYWGjy2x3Vceg_vHgo0NUQ',
  // Apps Script → Terapkan → Kelola deployment → URL aplikasi web (berakhiran /exec)
  GAS_URL: 'https://script.google.com/macros/s/AKfycbxRR6H0GaQVBSxXfKGn7FCzu0BnW2Uz0Xz6qVNLIT9vp3nV1Iukz5_yGpoRnrqFAazw/exec',
  // Alamat website ini setelah dipasang (untuk QR verifikasi), mis. https://namaanda.github.io/sis-slerok2/
  APP_URL: '',
  // Jangan diubah — harus sama dengan AUTH_DOMAIN di Supabase.gs
  AUTH_DOMAIN: 'akun.sdnslerok2.id'
};
// Nilai contoh di atas belum diisi → anggap belum dikonfigurasi
if (/ISI_/.test(window.APP_CONFIG.SUPABASE_URL + window.APP_CONFIG.SUPABASE_ANON_KEY + window.APP_CONFIG.GAS_URL)) {
  window.APP_CONFIG.SUPABASE_URL = ''; window.APP_CONFIG.SUPABASE_ANON_KEY = ''; window.APP_CONFIG.GAS_URL = '';
}
