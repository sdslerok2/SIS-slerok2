'use strict';
/* ============================================================================
 * SIS SD Negeri Slerok 2 — Frontend (JavaScript.html)
 * SPA instan: semua tampilan dirender di klien dari state lokal.
 *  - Navigasi 0 ms (tanpa ubah URL — aman di iframe Blogger)
 *  - Data: BACA langsung dari Supabase, TULIS lewat Apps Script (lihat js/supabase.js)
 *  - Optimistic UI + antrean sinkron tersimpan di localStorage
 *  - Snapshot data untuk buka ulang instan (stale-while-revalidate)
 * ========================================================================== */
const LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAwFBMVEUbM1XQ2N0UJCRjZWNkkdCrrKrWsDIlUZRubm4lRnEZXBaSsd1SeKj62BNeUBuyyeREe8eqqqqemWKujyJjY2NuhpgkgiXs7OygoKCampqNdBs6Ojra2tpiYmJEPSTzzkEkJCRyhHmsy7eBfHoqKirMzMzFu0PBvrs2gVZCP0EVP4A/gNrFwb4AAAA4ccL9/f4BAQIxark4cL4wbcUVFhX+/v41NjQheSGWlZImJynn6eyJiYr0pwwqVpVIR0jrxjqactntAAAAQHRSTlP///v3//z//wb//////////wr//6X//ylinv8JWmH//57///9nif////////8A///+/////gb9///+//7///3/VDJtOgAAHO1JREFUeNrtXQl3ozizFcIY49BekjiLs0wvM9/y3gu22BpwwP//X70qSQgJhON0Z7ZzhvMtHceOr4uqe6tKJZm8/A0v8g/of0D/GaCzl9nfDXSGiB+yvxFojjibIeTZ3wQ0x/l43aTufYa413950NkaMN/euXm63+/T0r1DL5n9tUEjvNv7pty3V0nvbz/c2h8K+gEs/XgtEadNKv7RXCPsWfZXBI3Rl4FfCKT5odo5B4k/v37MPhI2+UjHuHOlcV1vJy7PlV7icth/LdDCyqUE6Oy6y5EfBGIy+yjfJh/lGE9UgMuLamdeVVHqsLO/AmiuJHcScuPtbJfXiNjksGd/PuhM82UdsnMxuagGsLlvz2Z/LujsAUhO+rLuys5kxRhbXTgD2Lm7/vMtfStJToe8nDCWRFGUMDZZDq2NvP1T/Ed+zplvr/OBY1wA5Ki9erDls+9/LpX6OUvfC9XLO8jVxUqDLGFrzu1JV7r7GWOTHzczKDaHXBYG5ESCjeMO9uqis/YhlRH5h1sagimTnuFWVsjJ5WWiYCc6bMeVrv3D9Ed+lDPupHt28adBRtTHY6w5iQm7UT6y/qNAo64JZi69McjJ5adPmqk5bC0ki1SITSaI/g+x9JMw80EnuUQHmISf4AqTpBeSCnYlfCS//xEXIT+QGkkzd8zsTEzGSMLLT/y6DJM+kzimj6RI2uvfGTRgvs9Nz+hDjiIJmcM2fxOxpIPtCb6EfOSd7Efer4AiiDpnjpjmyRv0441CfbnhloeHO9hdRAof4QqZ/W6ggZuFmXNlreVKt3L46V8IOkniS+kdCX6UjRmTmmsLrcHkb/37gEY9EQWga/cMThnc1HEk2COK5cPHMIqtri2N7WVYYH48aPDmu8b0Zs0zEFsSHhEpQo2RPkJu3gQMLR7WXbvzEeHZIJDndxrIe1wjNcwMNNejjCP3402caIrYMgm4tQm7MzY3RXN3PvmRd0Qg7790Zu5xRkcZRwy7JOR0F2pMsjFRJ8rYh5b8Hj4SNNQaj66h2mYA4qUo43gZCoERD/9LMUnYpz9lbIeHN5YH2YeBhtv2VBoSaAqgVMGNRhn6w//i1o8Hr4CAVMZ2pT7O1h9m6VvXiEBnwgYAIBVNkqmijO7hKImP3DXi4Ws0Y3uCss9ybHJOeiQwqxz0IrFgjgQhfwoH4DgTWiEj6ujCcBFw7PXPgwbMvzW6a1jN3PrC0czsWl75VCTx2GvYpNJdxD1DHsnb2f59qbPGMAJ1eJtNiy4O9YfDZPxFbOXoLFKCPGY/BRpFEJmudBTRnXh7RRmYbug2P/kaeNGF4dj3by3XkDfsLNy5qd52DRl20o3DVx10fPpVnYs4/K6+FY7kdLIhQ/Ac1+jF3usUxDwK4/NeoFxEyOP16VTktKVnuR6Cb7iGfoXTVzR1chme+ZKOssWtfTxla3KCNjKhKJ4SlCh6D+jXMAmn4dkvYRM9HE+iJicwc9poQ9B5D2YB+jUML5Nz/CM2hcYTBc04anIiqSu1dH8ZvcfOccRBv4bxGU4dK9StYzucsJ5GqzBymuoaJYLJe+x8ubnkoKfJW7aOWbSqA4k6iZY6iTyNyQwZxazTxgUb4bZR7hCgX8PL1/AND2G1n9Yt6jYcq5yjHpEZcsrO7lgIxm8QXvgqr8vX15OmZgEJvrh03qKOFOqGy7AdNTlh58M4ZkaIcPI4PgmaW/tE3kG8r87Ond/MmUI90agPUa/PAt3DXPUxw49+ume8Z84sdg8F6Kmy9hjoOPK/7BznC/3+fU6TAfW5o7Ymb2F2hpgZWSzqFSN5npeE1HEvpbuExANBhxL2Ca723d2yBMzfb6iv6Elpeot69iboFrNsOjt95Qbz5FfHPGHldorXltLAAH35Kr0jbFFvxv2DOEt6g6DnpONURdgS9YD5yFBTDMzREDOd/jIlEdn+ApB/uVoEdW04B/jDVGKVqC9PgS446O8A2pKJuIL5Hk6D7tvZklTSq+P0ikQlQD4et8QfsF3ny9Lkl6NxGAVf8vn31tJMfbg3UJN+mcK5rmhlMOkRXR35i+P0eEUmYOnjdEEi81Yo0G3CxP89zngk5Zi/z1NCSNCVan3Us3HQmWzIyBhc9torYGVwCzD0cRv4lC4Wud+nDgUaJBG9gjvIdJQ9akrnc465cBxnt1HEB9bSUJd3JvERYyrGxNy3c0KB6DjoBSWM+T6zFbFSvzcIWvw4PaFDAeUXcZyl59L/rJKoj7oZZk/EcGieI7lWO8OfybfgDfUCom9PAfAKEwc76Clkpa9fEHR4MhBjLuO1H5GvzpzOv8//o72djhoy1bUV9Oxllp7ADDYG0gD2eF7Q7dUi74WgomnBzMlGOEV8mj1aReXUBzQyD5IBap6HuDpqoteDeZfXLZO+TcjilyskU0b3V8fjcbrNSUDqIYwpF24swOP2xzdSU3C84OtcRqTfuVyLmmeqVBMZomHm3lONcB2wxnGas6hOfTI9IkUftymx+sfU/AyXb2a1jEBAcsw3oFTd30xWGurrDjVRRWzG41RiXiV9Y2AATp+TOq1X/jMw9BE8pLYm033Qb1dcMTAfl5jv31Nmq9I9We1mffdAUUmlF/W0G1ckctTsBaEMJaFcLBYU3I9Ze2M6xcWvZ1VcAVj65uZmTlPi1xqPttlTgeDus5kBGogj7WrYXo4EPhFEHPQzFb9JfN8fS6vj5EtXgmPlclax4xNkvvSLU7guYUPUB52uiXTou7Ij6Enfzmxfg3uAAu4pCFftM1ZH0VjRGIMaM3XFCTunuMR01yd+gHd6aWRgLWoujZKuW/f43JHdsLYq0yTyy+0VXVxNr7aghPvgPXVudG5BzkBjCqhj5gbqi46ur0UWQuToIoBO7ZghBrcLhn9xT494/TJd+CcKrpr0r3MbH5heu1zX54H2BkxUu44dNI/U5cCEPj0uMEUnBHIl4I2rsh7HDP6/710kis80NvGcnNPInBq/cVrQ97p7zHhy59gKQiS7X1C/A0iWFpxB2CnfgOf3QLOzLR0UrpQYOuw9ee8AHTFg5WkO9sZgybl6s5P2qn/M0KDlrcRgSRD3vXoAes0Zz7O4dCwS6IVP6vPeHBPYnqHjM21dtxKDFaMVtKGI46Dhnm0xgQYaSuBiA+w9QFh71aahI1bbciTLPQI552FIycR4i6XUl9QQl9uX30pZrwwCUYDekwCK75z2ZJY3aQ2HxpDVTV2jcAwqzXiE9nxUmNzFTKz7qAI0yEu51kFD9zyV2tIDTRhmSp8W9IrX3vp9i4WSmUkTDUQrp72QcWvKjOyoZmO4EXZNvu6ArQmhJnuAuuS3pri8pFJcHGYGFVDd4mqR8sROUJ+WvxOwqaEzDH8MdJIOoKzc1/pHJftU4ramqSzAygumnDoDOVJc3MwEneUtaJO+0B18lBVk6IV+n1nAvYAazw/2PvzXuCiANhkEX5dikye2xTEpYFDSBe6bSwslKy4uuQU0Wl9keImeRC/AuVbgA4Kh1dt0xGb6KwWjMkK1C73T4GrWfipq5SMW7Jb5HK6blvdk9gGu8LmXmiLospcuoYBPERREF/TAjDIlpl2kxboa8lTKVxcP1f1edytG1T2wZHt07gLgG9EK0UBXCFo2QBRoTKerAegrcONVTfmkQ2SxluQH7cajXLLulxytgY913BL0TQ2qsJd1F4D2ddAOX6qb6aAfXn7dDyWR5RB/NOIUsEJ7d2mutFXAkPJiLe1g3W/VfaCdqTHQ6oCMKTzcVSprmO9tICptSe+NfBo+wZNFXXzwZOh8AalBslt2FM1kfkEgpaMkUDk7bU3aSzyIbmrIAgMmzU0sGYFErbxD05ZHE/T65THvE7VU8Ckk/jRfbLcqDGNpStLmRtycwmWI4gcFWqRQEp9CS8eSqZjwDGSuyJ21NL3vVePZy205JGq24IKSbjnf+f1EjhENGtyNznYGaBkAtfEbwkZNHfGu075Wfqq0JRv0PajseVRGfwZqLGyTYs+xMzQQL1Xv2763sKGARvYaQUh6FCVx92nQZ8jenoaRwvGob9RbgqZ7oBVRd5EYMP/5arrgwoItj84UBN++7hBQlduhf8cm6Eh5k34Lgho/qr2s8XGM1YEClxiMNwT94rW1SwuaQeSBrJA9NqTz2lBrsAKpiR5vpAOpgSaR5uNEBw0vB3SWegLeFOrbjec4LqU64+1/bfvUHej7lvNa+vAFA0PzC5ocfj+JRO3SLE20jD/uvIAYH4LooIEqg6FzxEhI3lfAi7KIy0eK8UrVpiaq+/jQct6StdxBODwkPMyTY0NciE7HhOplioxJy4egRJekwFrUsBSSasyq52JNQzAeOq/qQRKj/ailTNiJxka/j395xQYRQykbVIOS/LSKK+j9rKVRER2pHgkgvmmrLtaRBx20xcQMjWiZ8uYjb58/kwm6HmQEab8KqwOdJbTaygAphZANMDP0Oxvfga62msirro48qKXVm302UibRcnz2gwCMvbjK2UiTg/axdOKjGDA2y0ZKCBsvOOGNZak4R0tZyKMDPeMdyC77EAsVkI5CHPI1uNjSE4r19AddeBVHhmVr+TTjlhB2uv3BeIEL3UhMPkQcInk8vVhA3+/17ENY+ni1T8XKkMU0WByJLXt548JVpkSOGbJUuQd2XFniw8ZmuJpc7Lqo30CN60fzlL+nyjzK2aA/jbDbMtFRbXRQFbrF/332rQUdGrA5dHsTnOVE7IKimoqz1WTpqB08ziHnAXqiIYFKlbupVIY2DptuNpJoy3FNK+SieGHlVIo4rltYDQI7VZz+Pk++30yCTpmxu0XbwUpOzl8Q+LMFf89ExGHZlS090G7bhJSaWJdXV4s9JE3bMrFj3he2fZ7OpPVhqm0R0a+Cx2w8MjfGApBDmE7gGc2kXb+47tZtibbp+1dDE1mAqQHoOBRajDErZjUu1LuWLWjH/vt8P4YaFZF4cDM2MAdCaDxoiZmgZy93adewQa6VjQ9cm6PD5q7wAPue2l24720sMbfcjpaIGEopdWFNEbzahQVikUzjOsCDffHzdq9rYo0tDCA+/AB+OgAtbZnbYRUnQZdGNtV3D8pr8e/4vyRatQ31RptWMdbGjewU2geEWzqK/mfRo7xWwdN8xNTeKdDFXjDfyHpCqy1cEQftg8Ha+LXu1FAgYisa/7M4bg1LS50u3YNXllZcjgBtjdNdmnsHsf3LSqR+K+NQcXVFrT6JQPTjF570RA/70pBGQ967PfZAS4duvEPhjhDIftzjD/tvxUHstrW7NRWmvtFduvzt5dYGOuPFratKLoIFC6wcbnl/OoqHzX63OBQ5fSfoKs0L/LDSQaxcyrs1UAIkq0pKS6kPYBmgM9o5tZTxKeXVVlfV4oxYTBq38JwwhHf/ZjV1JZzWsRr6AC/zQ8cr3IbEbDAqjPkWBCMlTM+WxidrDKeuuYxvFz1FRFFuh4U2aOp0nCAsoKt9Ay/atHMRKPw9DU988gVmP5ixBnCdzcYmax7aW+okshaHVfspVIh+qy7JRANwwQ5gNaupucum1fAXLhr6wLTtzTut5Qn3F0YivwIA3gJKVPfgbmTeQw4iuOoPMbqdXpUU+v911xMz3y4cM7XYmlaNGDo0P7rB0pDOOF+/8tQj6QqAbHQcyCwEYt4e94lI21RCzbQEaMkOBZj6YDOoXXnQ0MUmMf7GUFpovty5PutyaXd88EorBJY46MhhYoM5ChbzxFxNkMvo5GA3tRiStxv6QDRDOwM9vMGSlsLYLBX2QZe+G7U0HBhyp+fUKcHVNKy7a6rzB+tQO9S1m9q1CyIY+lA0mq87bABaCAvSx6T9U/l6dPBK5tRKyQmyDmRdmFl3TI01bQ+FxdSFFTQa2vyMQW8YMWrXP0FbaquGDycgDSUPtltcoIXuFAwtbbtEgdUTQypspvasoLlH68o/8QfLllLEodWbLC1p6RC0lp7CfcN6C3offCFfB21QSAG6WAS0soE+DHQSDO1qOnlhmSYXIg5lLVNymD6eAv3CRbFR/oFjYVc4HdYTcp1CJiGY2iBCJYl9bbmowdD1ZoQ4eN0RJQTlcA5R2FVabm+IejCK7LaacAGrWlwTsUzErmmtvUWy6qrZZFMU4WpQB+73Yf+DRPjMjnyc4ShAQHJ3+SWlfGxgqcY8sofTU70q00NRBE3ExOMZppf8yJg+YxNdF8HUZvla5dAXn/QNzZ/YbXUfjHeReerhR3K5hHfecXdqQLZdxlD+AbPSR8yZCC7HUWrdAAQGBAcJewgLCIVJ39Dm84ajUhQo2gM1dH1V0qIc5m9Nqj9kmn9gQb6AAQS+ggiVjGWgYczU2CWYDA296Z42sYyTIz9Td/eVt2s773gTNG80FdLlIG/EQY+ar4DiQuhwoqGNxZ6pscvZA70ynmUhDl5n3Xyn3g5X+rpUerAhigy2BNzq/kH8Ca8IYVU+N7JqQ8+XbNM39RA0N3TijBAHLnoEomIBWwdB3XEHHWzAGLDHAyZNSl9qUcbVfNjb5GoVKlZTD0FjRqhcqj/LGose7/e2OITOpdMpy8Pbuy/uWv/A8MYVeVAtGFERK1xmUT7RaG9jmBpT00nf0GFUjQVh7a+iVsLBQ4JI5R3lOpu9vTkHpyhU/uHDsMdiEQRUbAWIzLaQshyHNOlpSzhq6CHmfQADkJQCYOh4QJdFPJUXWrcvb4OeZXp+CuUtDktf0WeuiqzXzGqti3TWOSxaiPh7XduX+qcaBGECrF4UX7wvWBtSvlFHecf1GZtz5Nyp25maz9RM06spTufRfi/SsZq6wKVRvSUCXq/8x0kGA3nzG8oVzRWD5O2iBThZeXvehjPMT0sJBWJaoF7scyyPF1tid2u4/RutPGj2dL/RVB2cvv1M1SoZdjqQM3DpENnKIGnXsnnLurXvSdW3vHRZoCzmoHC4TPepN2jaosb7r6VNjskeE817hvteReY/T7/uNhA1yCSrdv64tO1ate6SM6gaUOdbnMvDsQ/c/FT2UuCLDlc0uVg6AhtMM03a5YGLCaRK7aezqIpPRQa92XniPsq/WfL+f3beJsouFEU1xHyedWFRLsYRYotbO2xzCHFkGpDDIyFFlHA+IZiOsc53liwaAQ0espSg9TA8exPlLNVCESNlgl3fmvKplaveSpe8l2hqrM0PmxCeDzc6mVSThIWbAz7auo5tN1hXGFIxKNWFYf5oO3txZOenq00mQyxSHw90AdQ20O17QLB5Bb/A4hM4tgQWjTYH8Yi3kboysa53yu7uzTwVjSUtDG07mkf22F6rPi1PejE5hcE1QlN0j8HynLTihIVhuOE4DyE/tob/c7OBh+VThlPwwodTsRouBuuZUsPUvnl8ZAt2VraqeMG7NjC1iXObMGAPPSeLsRyxsRUu8KMQwB5gowj/vxCdHK6RiXK+sBfUhM/yyVVRYWhUQ5rN3rFvnG968dqur9w5idKYWhd4tDqmgthbsVCADmEN8UJbQxwyNI45lAiW71/jfzlRfGdTw1P7xg1VjEQNwzXGTW1LgKyXhgJsAM1WZmVgYWi4iQePyNFgpjtbyQdis3edheAq1pPjLvkV7geglZPSWDsDTbl15WjFN/BGr8PqONUF6287h0wJTpD0jOJCNtK9cUOPHytw12c92L0MEzZwnoPjlt38oEKAN361mqC6yFe1pALaMlmtuvNU9FnmAE8cMkFLQ+d8XHr9HtBiVUCwnspv4AAA2InCz14Ta9uw8F7rKBLcSQ5ujCvLAvRywo+SZd0+wZjPsAW8VGGEH0blCe1ur+qksJw+deJetYiw7SvWbCeROIXCafjyIvl2KEndn4RG5IA1SYAzWG91Ap/ol67HGaimrqzcJ3J9uTM0CEu6HjvUl4we74ENdmlqEMNSznC3x324kPQGz9iUkbB7eoNY+zugOCMHJZ6ofcDxtvYwqgOVf5uYCp49vPdQEthvq5sa3gGvg2rPec9EpMDOZY5zsm8d6yCH8Uv338Jl4V+VmqY4FJ73f9/Q1zpDl4+jx0iR8cOMDFNHAZwQVHmuVow8t03RymtKItufsWXWXz4E6wrNN3UqV9pfrvPK2tg95I4fx0ROHGd0n2qmjgJYYb/UT2sunappDxZ23OeSEr3bZzoMwx1d6qR1nJ9vei3Vgg+ua4a+Gz+v69RBO5qpuSqaxmlc2GwASZ06vqtw8TyHoGZmDsjqANqKTYe4qnaulxel0VP9xkdRI8HRbxj61JFGgkAUVzMuBNrdhHdviipttMN6cQtkU1Kqb7+A8SbP0dYrKqS5qtm5esvdJXxbw3mGPgU6W3NTK1lEyVVvVEHoH2CU6tDs4CDnSjv9HZTRwxvAo8txjG47/JgfsCYqcrfoDoAGBhV7YjsxPGXok4dH6aa+4NlMTJ5byoO3rg5AuF4FXuOB7x+qkTGa9sOABfMUvjgA/cLNCwDeunPpD8TwlKHfAH2rMhC+GoozbeVBRqHsQzclfCoXyLfxYCRi59iQV0CWTV6ARxWll7ppseMWFbHouG3eKHVfGPrU0fwnj+kSZyO4O31sVkgvvHV7hBneZLjn7sHNPcfNm8JzD04B/oKuCy4CcZDD3AE8BU2bOvAsT57qxx2lVFmj7IuUPOuY/ejZYmKCbO9oeSVPcr5VEIflocuTG9j6D4DBW8Brgc2KFMgQIDaw1Cn+D57v7mCgsGnvBcy5ufjKbshZGrrgYrj+8aPnRLLX6H0hjHGCMdTAl3Koo0nBx530UAFRgNeWANHloNH4JXqPtyuLxnVcdX9cCqFQuZh5MbP8SXlXafYTh/w9dCWMqu/wbBIKPnLAac3OhSu4/w44rAMG90pYPMm58B1yB75H4uC5XtVpi9vgHyiwZ6Vl5Gqp9/qNownJW6cp4hpM2WtncR9xHQ8o+L+A1FjUclEmC7AzhN0O/TyHZ7oHbWUa/R/I3WuIZS8+6kpz+3OgM9FDPfT6LLFM11xAjq5skHGF44s7DyPQgcUqg08qmKY5wKf91oOsorCxnqzzzoMrM96uVrHImA6buDlXlueyh9t+OQekRvRktzHTcMYMuptlP3lE6IzTXnvqB3a5unOumB+U+2cPRBimO8F6zihyHFiCzMSn/4YsIyXaMr6odS6WaoqovHvzPNYzzjXVYlG2CATyRCb16aLkLQCYaAnAXb1/A+2pCzTd++b+F7eAQvL6v7BRN22TwUQ0/vQeA77TIVt/xAmyj2l/HEkUq4koprQdNpDRQdulhLYwnuGF6RImfnD6hdoiRwImzRtpVbA2GJef8XVuZ53V61kHTioBvbUZY7qLwvE5eDoFM7YRw8g6buOWcCvr4NP9GQcjk3POceaH2RxG8iHEfoGNr1XSno+RdFd3aAbcFHjShRVt9/US7kcd5Sx0EWdLvVOJXIXtc3lN2kv+vIRe+3iY8kScT/Llj+ecCE/O+3qOa/WNZRBpZ7DbOy4oPLtvRLvPzvnKgDNB3x7yNFV7PvIPQu7AdG+u/moK34U2+9Az1bPbu/vPTartVkGbe84PWheI0HVL7a+lrnu/zj7yePL2b93O7l2a68jTEmp0SJpPOWwHVVRiLsiMvlcnzWE17u42e3n56CP3M/4dgng9Pv0K23DKtLcbC+BD/sQLQ753Ql3wM5SMuDHH8hrYs3P99Ji1qya/w9dIKKnKstv7p2v8DsR0/2NXui8b9/PTb4+ZBDpbZ7/n97msHxTy2d399efPTZOfjx3ciX6+vr4H8m9RPrz7m9p+8DuKZusue7y9Xc8e7iGwYNUkb+AETrjS9sIfcngUfgdlzdPDbK057+x2/Qd/hVUGd3YGcI0HH+G6u7t76i74CR806yH8NoAs+zO/tW+9fseXw81mH/C1fR/8nZ9AMvgZ4HrAi/8LHsmyf77m+B/Q/4D+B/Rf4Pp/HpC326pCzPMAAAAASUVORK5CYII=';
const CDN = {
  chart: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js',
  xlsx: 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  qr: 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'
};
const BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const BLN = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const HARI = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const LIBUR = ['Libur Nasional','Cuti Bersama','Libur Semester','Libur Sekolah'];
const KODE_HARI = { 'Libur Nasional':'LN','Cuti Bersama':'CB','Libur Sekolah':'LSk','Libur Semester':'LS','Kegiatan':'K','STS':'STS','SAS':'SAS','MPLS':'MPLS','Pembagian Rapor':'R' };
const PERAN_LABEL = { Admin:'Admin / Operator', KepalaSekolah:'Kepala Sekolah', GuruKelas:'Guru Kelas', GuruMapel:'Guru Mapel', Siswa:'Siswa', OrangTua:'Orang Tua / Wali' };

/* ============================== 1. STATE ================================== */
const S = {
  token: null, user: null, cx: null, data: {}, schema: {}, set: {}, stat: null, pub: null,
  layout: null, view: null, params: {}, hist: [], vs: {}, charts: [], timer: {},
  cache: { abs: {}, nilai: {}, rapor: {}, img: {}, absGuru: {} }, sinkronTerakhir: 0
};
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

/* ---------- Penyimpanan lokal (aman bila diblokir browser) ---------- */
const store = {
  ingat() { try { return localStorage.getItem('sis2_ingat') !== '0'; } catch (e) { return true; } },
  area(priv) { try { return priv && !store.ingat() ? sessionStorage : localStorage; } catch (e) { return null; } },
  get(k, priv) { try { const a = store.area(priv); const v = a && a.getItem('sis2_' + k); return v ? JSON.parse(v) : null; } catch (e) { return null; } },
  set(k, v, priv) { try { const a = store.area(priv); a && a.setItem('sis2_' + k, JSON.stringify(v)); } catch (e) { } },
  del(k) { try { localStorage.removeItem('sis2_' + k); sessionStorage.removeItem('sis2_' + k); } catch (e) { } }
};

/* ============================== 2. UTILITAS =============================== */
const esc = s => String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]);
const uid = () => (Date.now().toString(36) + Math.random().toString(36).slice(2, 10)).slice(0, 16);
const ic = (n, c) => '<i data-lucide="' + n + '"' + (c ? ' class="' + c + '"' : '') + '></i>';
const pad = n => String(n).padStart(2, '0');
const tglISO = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const hariIni = () => tglISO(new Date());
const keDate = t => new Date(String(t).slice(0, 10) + 'T00:00:00');
const fTgl = t => { if (!t) return '—'; const p = String(t).slice(0, 10).split('-'); if (p.length < 3) return esc(t); return Number(p[2]) + ' ' + BLN[Number(p[1]) - 1] + ' ' + p[0]; };
const fTglP = t => { if (!t) return ''; const d = keDate(t); return HARI[d.getDay()] + ', ' + d.getDate() + ' ' + BULAN[d.getMonth()] + ' ' + d.getFullYear(); };
const fTglL = t => { if (!t) return ''; const d = keDate(t); return d.getDate() + ' ' + BULAN[d.getMonth()] + ' ' + d.getFullYear(); };
const angka = v => { const n = Number(String(v === undefined || v === null ? '' : v).replace(/[^\d.-]/g, '')); return isNaN(n) ? 0 : n; };
const fNum = v => angka(v).toLocaleString('id-ID');
const fRp = v => 'Rp ' + Math.round(angka(v)).toLocaleString('id-ID');
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const thumb = (id, w) => id ? 'https://drive.google.com/thumbnail?id=' + encodeURIComponent(id) + '&sz=w' + (w || 800) : '';
const urutNama = (a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id');
let _ikonJadwal = 0;
function ikon() { if (_ikonJadwal) return; _ikonJadwal = requestAnimationFrame(() => { _ikonJadwal = 0; try { lucide.createIcons(); } catch (e) { } }); }
const _skrip = {};
function muat(url) {
  if (_skrip[url]) return _skrip[url];
  _skrip[url] = new Promise((ok, no) => { const s = document.createElement('script'); s.src = url; s.onload = ok; s.onerror = () => { delete _skrip[url]; no(new Error('Gagal memuat pustaka. Periksa koneksi internet.')); }; document.head.appendChild(s); });
  return _skrip[url];
}
function logoUrl() { return (S.set && S.set.logo_kustom === 'Ya' && S.set.logo_id) ? thumb(S.set.logo_id, 240) : LOGO; }

/* ---------- Panggilan server ---------- */
function api(fn, ...args) {
  // Semua panggilan data lewat router Supabase/Apps Script (js/supabase.js)
  return window.SB.route(fn, args).then(r => {
    if (r && r.jaringan) throw new Error(r.message);            // biar antrean mencoba lagi saat online
    if (r && r.sesi && S.token) sesiHabis();
    return r || { success: false, message: 'Tidak ada respons server.' };
  });
}
const apiT = (fn, ...a) => api(fn, S.token, ...a);
async function sibuk(btn, fn) {
  if (btn && btn.getAttribute('aria-busy') === 'true') return;
  const html = btn ? btn.innerHTML : '';
  if (btn) { btn.setAttribute('aria-busy', 'true'); btn.disabled = true; btn.innerHTML = '<span class="spin"></span> ' + (btn.dataset.busy || 'Memproses…'); }
  try { return await fn(); }
  catch (e) { toast(e.message || String(e), 'err'); }
  finally { if (btn && document.body.contains(btn)) { btn.removeAttribute('aria-busy'); btn.disabled = false; btn.innerHTML = html; ikon(); } }
}
function pastikan(r) { if (!r || !r.success) throw new Error((r && r.message) || 'Terjadi kesalahan.'); return r.data; }

/* ---------- Toast, modal, dialog ---------- */
function toast(pesan, jenis, judul) {
  jenis = jenis || 'ok';
  const t = document.createElement('div');
  t.className = 'toast ' + jenis; t.setAttribute('role', jenis === 'err' ? 'alert' : 'status');
  const ik = { ok: 'circle-check', err: 'circle-alert', warn: 'triangle-alert', info: 'info' }[jenis] || 'info';
  t.innerHTML = ic(ik) + '<div>' + (judul ? '<b>' + esc(judul) + '</b>' : '') + esc(pesan) + '</div><button aria-label="Tutup">' + ic('x') + '</button>';
  t.querySelector('button').onclick = () => t.remove();
  $('#toastRoot').appendChild(t); ikon();
  if (jenis !== 'err') setTimeout(() => t.remove(), 3800); else setTimeout(() => t.remove(), 9000);
  const all = $$('#toastRoot .toast'); if (all.length > 3) all[0].remove();
}
function modal(o) {
  const bg = document.createElement('div');
  bg.className = 'mbg';
  bg.innerHTML = '<div class="modal ' + (o.ukuran ? 'm-' + o.ukuran : '') + '" role="dialog" aria-modal="true" aria-label="' + esc(o.judul || '') + '">' +
    '<div class="m-h"><h3>' + (o.judulHtml || esc(o.judul || '')) + '</h3><button class="btn btn-icon btn-ghost btn-sm" data-tutup aria-label="Tutup">' + ic('x') + '</button></div>' +
    '<div class="m-b">' + (o.isi || '') + '</div>' + (o.kaki ? '<div class="m-f">' + o.kaki + '</div>' : '') + '</div>';
  const fokusLama = document.activeElement;
  const tutup = () => { if (!bg.parentNode) return; bg.remove(); document.removeEventListener('keydown', esc_); if (o.onTutup) o.onTutup(); if (S.perluRender && !$('#modalRoot').children.length) { S.perluRender = false; renderUlang(); } try { fokusLama && fokusLama.focus(); } catch (e) { } };
  const esc_ = e => { if (e.key === 'Escape' && $('#modalRoot').lastElementChild === bg) tutup(); };
  bg.addEventListener('mousedown', e => { if (e.target === bg && !o.kunci) tutup(); });
  bg.addEventListener('click', e => { if (e.target.closest('[data-tutup]')) tutup(); });
  document.addEventListener('keydown', esc_);
  $('#modalRoot').appendChild(bg); ikon();
  const m = { el: bg.querySelector('.modal'), tutup: tutup };
  if (o.onBuka) o.onBuka(m);
  setTimeout(() => { const f = bg.querySelector('input:not([type=hidden]):not([disabled]),select,textarea,button.btn-primary'); if (f) f.focus(); }, 30);
  return m;
}
function konfirmasi(pesan, o) {
  o = o || {};
  return new Promise(res => {
    let jawab = false;
    const m = modal({ judul: o.judul || 'Konfirmasi', ukuran: 'sm', isi: '<p style="margin:0">' + esc(pesan) + '</p>',
      kaki: '<button class="btn btn-ghost" data-tutup>Batal</button><button class="btn ' + (o.bahaya ? 'btn-danger' : 'btn-primary') + '" id="kfYa">' + esc(o.ok || 'Ya, lanjutkan') + '</button>',
      onTutup: () => res(jawab) });
    $('#kfYa', m.el).onclick = () => { jawab = true; m.tutup(); };
  });
}
function mintaTeks(judul, label, o) {
  o = o || {};
  return new Promise(res => {
    let nilai = null;
    const m = modal({ judul: judul, ukuran: 'sm', isi: '<div class="field"><label class="label" for="mtIn">' + esc(label) + (o.wajib ? '<span class="req">*</span>' : '') + '</label><textarea class="textarea" id="mtIn" placeholder="' + esc(o.ph || '') + '"></textarea><span class="errmsg" id="mtErr"></span></div>',
      kaki: '<button class="btn btn-ghost" data-tutup>Batal</button><button class="btn ' + (o.bahaya ? 'btn-danger' : 'btn-primary') + '" id="mtOk">' + esc(o.ok || 'Kirim') + '</button>',
      onTutup: () => res(nilai) });
    $('#mtOk', m.el).onclick = () => { const v = $('#mtIn', m.el).value.trim(); if (o.wajib && !v) { $('#mtErr', m.el).textContent = label + ' wajib diisi.'; return; } nilai = v; m.tutup(); };
  });
}
function kosong(ikonN, pesan, aksi) {
  return '<div class="empty"><div class="em-ic">' + ic(ikonN || 'inbox') + '</div><div>' + esc(pesan) + '</div>' + (aksi || '') + '</div>';
}
function unduhB64(b64, nama, mime) {
  try {
    const bin = atob(b64), arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    const url = URL.createObjectURL(new Blob([arr], { type: mime || 'application/octet-stream' }));
    const a = document.createElement('a'); a.href = url; a.download = nama || 'berkas'; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 2000);
  } catch (e) { toast('Unduhan diblokir browser. Gunakan tautan Google Drive.', 'warn'); }
}
function linkDrive(id) { return 'https://drive.google.com/file/d/' + encodeURIComponent(id) + '/view'; }
async function pratinjauBerkas(id, judul) {
  if (!id) return;
  const m = modal({ judul: judul || 'Pratinjau Berkas', ukuran: 'lg', isi: '<div class="skel" style="height:60vh"></div>',
    kaki: '<a class="btn btn-ghost" href="' + linkDrive(id) + '" target="_blank" rel="noopener">' + ic('external-link') + 'Buka di Drive</a><button class="btn btn-secondary" data-tutup>Tutup</button><button class="btn btn-primary" id="pvUnduh" disabled>' + ic('download') + 'Unduh</button>' });
  try {
    const d = pastikan(await apiT('apiBerkas', id));
    const src = 'data:' + d.mime + ';base64,' + d.b64;
    $('.m-b', m.el).innerHTML = d.mime.indexOf('image') === 0 ? '<img src="' + src + '" alt="' + esc(d.nama) + '" style="max-height:70vh;margin:auto;border-radius:8px">'
      : d.mime === 'application/pdf' ? '<iframe class="preview-frame" title="Pratinjau PDF" src="' + src + '"></iframe>'
      : kosong('file', 'Pratinjau tidak tersedia untuk jenis berkas ini.');
    const b = $('#pvUnduh', m.el); b.disabled = false; b.onclick = () => unduhB64(d.b64, d.nama, d.mime);
  } catch (e) { $('.m-b', m.el).innerHTML = '<div class="alert alert-err">' + ic('circle-alert') + esc(e.message) + '</div>'; ikon(); }
}
/** Gambar privat (mis. foto siswa) dimuat lewat server lalu dicache di memori. */
function hidrasiGambar(root) {
  $$('img[data-fid]', root || document).forEach(img => {
    const id = img.dataset.fid; if (!id) return;
    if (S.cache.img[id]) { img.src = S.cache.img[id]; img.removeAttribute('data-fid'); return; }
    if (S.cache.img[id] === 0) return; S.cache.img[id] = 0;
    apiT('apiBerkas', id).then(r => { if (r.success) { S.cache.img[id] = 'data:' + r.data.mime + ';base64,' + r.data.b64; $$('img[data-fid="' + id + '"]').forEach(x => { x.src = S.cache.img[id]; x.removeAttribute('data-fid'); }); } else delete S.cache.img[id]; }).catch(() => delete S.cache.img[id]);
  });
}

/* ---------- Kompres & unggah berkas ---------- */
function bacaBerkas(file) {
  return new Promise((ok, no) => {
    if (!file) return no(new Error('Tidak ada berkas.'));
    if (['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].indexOf(file.type) < 0) return no(new Error('Hanya JPG, PNG, WEBP, atau PDF.'));
    const r = new FileReader();
    r.onload = () => {
      if (file.type === 'application/pdf') { if (file.size > 5242880) return no(new Error('PDF maksimal 5 MB.')); return ok({ nama: file.name, mime: file.type, b64: String(r.result).split(',')[1] }); }
      const img = new Image();
      img.onload = () => {
        const maks = 1600, sk = Math.min(1, maks / Math.max(img.width, img.height));
        const c = document.createElement('canvas'); c.width = Math.round(img.width * sk); c.height = Math.round(img.height * sk);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        const png = file.type === 'image/png' && file.size < 400000;
        const url = c.toDataURL(png ? 'image/png' : 'image/jpeg', 0.82);
        ok({ nama: file.name.replace(/\.\w+$/, png ? '.png' : '.jpg'), mime: png ? 'image/png' : 'image/jpeg', b64: url.split(',')[1], pratinjau: url });
      };
      img.onerror = () => no(new Error('Gambar tidak dapat dibaca.'));
      img.src = r.result;
    };
    r.onerror = () => no(new Error('Berkas tidak dapat dibaca.'));
    r.readAsDataURL(file);
  });
}
async function unggah(file, folder, publik) {
  const f = await bacaBerkas(file);
  const d = pastikan(await apiT('apiUnggah', { folder: folder, nama: f.nama, mime: f.mime, b64: f.b64, publik: !!publik }));
  if (f.pratinjau) S.cache.img[d.id] = f.pratinjau;
  return d;
}

/* ============================== 3. DATA LOKAL ============================= */
const daftar = t => S.data[t] || [];
const rek = (t, id) => id ? daftar(t).find(x => x.id === id) : null;
function judul(t, id) {
  const r = rek(t, id); if (!r) return id ? '—' : '';
  if (t === 'Keuangan_Anggaran') return r.kode + ' · ' + r.uraian;
  if (t === 'Surat_Keluar') return (r.no_surat || 'Draf') + ' · ' + r.perihal;
  if (t === 'Kaldik_Tahun') return 'Kaldik ' + judul('Tahun_Ajaran', r.id_tahun);
  const sc = S.schema[t]; return r[(sc && sc.judul) || 'nama'] || r.nama || r.judul || id;
}
const siswaAktif = idKelas => daftar('Siswa').filter(s => s.status === 'Aktif' && (!idKelas || s.id_kelas === idKelas)).sort(urutNama);
const kelasUrut = () => daftar('Kelas_Rombel').slice().sort((a, b) => String(a.nama).localeCompare(String(b.nama), 'id', { numeric: true }));
function tokenPeran() {
  const u = S.user || {}; let t = '';
  if (u.peran === 'Admin') t += 'A'; if (u.peran === 'KepalaSekolah') t += 'K';
  if (u.peran === 'GuruKelas' || u.peran === 'GuruMapel') t += 'G';
  if ((u.tugas || []).indexOf('Bendahara') > -1) t += 'B';
  return t;
}
const punya = acl => { const t = tokenPeran(); for (let i = 0; i < t.length; i++) if (String(acl || '').indexOf(t[i]) > -1) return true; return false; };
const isA = () => S.user && S.user.peran === 'Admin';
const isK = () => S.user && S.user.peran === 'KepalaSekolah';
const isG = () => S.user && (S.user.peran === 'GuruKelas' || S.user.peran === 'GuruMapel');
const isB = () => tokenPeran().indexOf('B') > -1;
const taAktif = () => rek('Tahun_Ajaran', S.set.tahun_ajaran_aktif);
function kelasSaya() {
  if (isA() || isK()) return kelasUrut();
  const ids = (S.cx && S.cx.kelasAjar) || [];
  return kelasUrut().filter(k => ids.indexOf(k.id) > -1);
}

/* ---------- Snapshot (buka ulang instan) ---------- */
const simpanSnapshot = debounce(() => {
  if (!S.token) return;
  store.set('snap', { user: S.user, cx: S.cx, data: S.data, schema: S.schema, set: S.set, stat: S.stat, waktu: Date.now() }, true);
}, 800);
function terapkanBootstrap(d) {
  S.user = d.user; S.cx = d.cx; S.data = d.data || {}; S.schema = d.schema || S.schema; S.set = d.pengaturan || d.set || {}; S.stat = d.statistik || d.stat || null;
  // pertahankan perubahan lokal yang belum tersinkron
  Antrian.items.forEach(op => { if (op.jenis === 'simpan' && op.t && op.rec) { const l = S.data[op.t] = S.data[op.t] || []; const i = l.findIndex(x => x.id === op.rec.id); const m = Object.assign({}, i > -1 ? l[i] : {}, op.rec, { _p: 1 }); if (i > -1) l[i] = m; else l.unshift(m); } });
  simpanSnapshot();
}

/* ---------- Antrean sinkron (Optimistic UI) ----------
 * Setiap perubahan langsung tampil di layar, lalu dikirim ke server di
 * latar belakang. Antrean disimpan di localStorage sehingga aman walau
 * koneksi putus atau halaman ditutup. */
const Antrian = {
  items: [], jalan: false, gagalJaringan: 0,
  muat() { this.items = store.get('antrian', true) || []; },
  simpan() { store.set('antrian', this.items, true); this.status(); },
  tambah(op) { op.k = uid(); this.items.push(op); this.simpan(); this.proses(); },
  status() {
    const el = $('#sync'); if (!el) return;
    el.className = 'sync' + (this.items.length ? (this.gagalJaringan ? ' err' : ' busy') : '');
    el.title = this.items.length ? (this.gagalJaringan ? 'Offline — ' + this.items.length + ' perubahan menunggu dikirim' : 'Menyinkronkan ' + this.items.length + ' perubahan…') : 'Semua perubahan tersimpan';
    el.innerHTML = ic(this.items.length ? (this.gagalJaringan ? 'cloud-off' : 'refresh-cw') : 'cloud-check'); ikon();
  },
  async proses() {
    if (this.jalan || !S.token) return; this.jalan = true; this.status();
    while (this.items.length) {
      const op = this.items[0];
      let r;
      try { r = await api(op.fn, S.token, ...op.args); }
      catch (e) { this.gagalJaringan++; this.status(); this.jalan = false; setTimeout(() => this.proses(), Math.min(30000, 4000 * this.gagalJaringan)); return; }
      this.gagalJaringan = 0;
      if (r && r.sesi) { this.jalan = false; return; }
      this.items.shift(); this.simpan();
      try { hasilOp(op, r); } catch (e) { console.warn(e); }
    }
    this.jalan = false; this.status();
  }
};
function hasilOp(op, r) {
  const l = op.t ? (S.data[op.t] = S.data[op.t] || []) : null;
  if (!r.success) {
    // kembalikan keadaan semula
    if (op.jenis === 'simpan' && l) { const i = l.findIndex(x => x.id === op.rec.id); if (i > -1) { if (op.prev) l[i] = op.prev; else l.splice(i, 1); } }
    if (op.jenis === 'hapus' && l && op.prev) { const i = l.findIndex(x => x.id === op.prev.id); if (i > -1) l[i] = op.prev; else l.unshift(op.prev); }
    if (op.jenis === 'absensi') delete S.cache.abs[op.kunci];
    if (op.jenis === 'nilai') delete S.cache.nilai[op.kunci];
    if (op.jenis === 'kaldik') apiT('apiTarik', ['Kaldik_Hari', 'Kaldik_Tahun']).then(x => { if (x.success) { Object.assign(S.data, x.data.data); renderUlang(); } });
    toast(r.message || 'Perubahan ditolak server.', 'err', 'Gagal disimpan');
    renderUlang(); simpanSnapshot(); return;
  }
  if (op.jenis === 'simpan' && l) { const i = l.findIndex(x => x.id === op.rec.id); const baru = Object.assign({}, r.data); delete baru._p; if (i > -1) l[i] = baru; else l.unshift(baru); }
  if (op.jenis === 'hapus' && l && r.data && r.data.status) { const i = l.findIndex(x => x.id === r.data.id); if (i > -1) l[i] = Object.assign({}, l[i], r.data); }
  if (op.jenis === 'kaldik' && r.data) { S.data.Kaldik_Hari = daftar('Kaldik_Hari').filter(h => h.id_tahun !== r.data.tahun.id_tahun).concat(r.data.hari); const i = daftar('Kaldik_Tahun').findIndex(x => x.id === r.data.tahun.id); if (i > -1) S.data.Kaldik_Tahun[i] = r.data.tahun; }
  if (op.jenis === 'absensi' || op.jenis === 'nilai') { S.stat = null; }
  simpanSnapshot();
  if (op.jenis === 'simpan' || op.jenis === 'hapus' || op.jenis === 'kaldik') renderUlang(true);
}
/** Simpan rekaman secara optimistik. */
function simpanRek(t, rec, opsi) {
  opsi = opsi || {};
  const l = S.data[t] = S.data[t] || [];
  rec = Object.assign({}, rec); if (!rec.id) rec.id = uid();
  const i = l.findIndex(x => x.id === rec.id), prev = i > -1 ? Object.assign({}, l[i]) : null;
  const tampil = Object.assign({}, prev || {}, rec, { _p: 1 });
  if (i > -1) l[i] = tampil; else l.unshift(tampil);
  Antrian.tambah({ jenis: 'simpan', fn: 'apiSimpan', args: [t, rec], t: t, rec: rec, prev: prev });
  simpanSnapshot();
  if (!opsi.diam) toast(opsi.pesan || 'Data tersimpan.', 'ok');
  if (!opsi.tanpaRender) renderUlang();
  return tampil;
}
function hapusRek(t, row) {
  const l = daftar(t), i = l.findIndex(x => x.id === row.id);
  const prev = Object.assign({}, row);
  if (['Siswa', 'Guru_Pegawai', 'Users'].indexOf(t) > -1) { if (i > -1) l[i] = Object.assign({}, row, { status: 'Nonaktif', _p: 1 }); }
  else if (i > -1) l.splice(i, 1);
  Antrian.tambah({ jenis: 'hapus', fn: 'apiHapus', args: [t, row.id], t: t, prev: prev });
  simpanSnapshot(); toast(['Siswa', 'Guru_Pegawai', 'Users'].indexOf(t) > -1 ? 'Data dinonaktifkan.' : 'Data dihapus.'); renderUlang();
}

/* ============================== 4. ROUTER ================================= */
const VIEW = {};
function tampilkanLayout(nama) {
  if (S.layout === nama) return;
  S.layout = nama;
  ['pub', 'adm', 'portal'].forEach(x => { $('#' + x).hidden = x !== nama; });
  document.documentElement.setAttribute('data-theme', nama === 'adm' ? (store.get('tema') || 'light') : 'light');
  $('#boot').hidden = true;
}
/** Satu-satunya cara pindah halaman: tanpa reload, tanpa ubah URL. */
function buka(view, params, opsi) {
  opsi = opsi || {};
  const v = VIEW[view]; if (!v) return;
  if (S.view && !opsi.tanpaRiwayat && !(S.view === view && JSON.stringify(S.params) === JSON.stringify(params || {}))) S.hist.push({ v: S.view, p: S.params });
  if (S.hist.length > 30) S.hist.shift();
  bersihkanHalaman();
  S.view = view; S.params = params || {};
  tampilkanLayout(v.layout);
  render(true);
}
function bersihkanHalaman() {
  S.charts.forEach(c => { try { c.destroy(); } catch (e) { } }); S.charts = [];
  Object.keys(S.timer).forEach(k => { clearInterval(S.timer[k]); clearTimeout(S.timer[k]); }); S.timer = {};
}
function render(gulir) {
  const v = VIEW[S.view]; if (!v) return;
  const el = v.layout === 'pub' ? $('#pubMain') : v.layout === 'adm' ? $('#admMain') : $('#porMain');
  if (v.layout === 'adm') {
    $('#topJudul').textContent = typeof v.judul === 'function' ? v.judul(S.params) : v.judul;
    $('#topCrumb').textContent = typeof v.crumb === 'function' ? v.crumb(S.params) : (v.crumb || 'SIS SD Negeri Slerok 2');
    tandaiMenu(); tutupSide();
  }
  if (v.layout === 'pub') tandaiMenuPub();
  try { v.render(el, S.params); }
  catch (e) { console.error(e); el.innerHTML = '<div class="alert alert-err">' + ic('circle-alert') + 'Terjadi kesalahan saat menampilkan halaman: ' + esc(e.message) + '</div>'; }
  ikon(); hidrasiGambar(el);
  if (gulir) { window.scrollTo(0, 0); }
}
/** Render ulang halaman aktif bila aman (tidak sedang mengetik / modal terbuka). */
function renderUlang(dariServer) {
  if (!S.view) return;
  if (VIEW[S.view].layout === 'adm') renderMenu();
  const ae = document.activeElement;
  const mengetik = ae && /INPUT|TEXTAREA|SELECT/.test(ae.tagName) && ae.closest('#admMain,#porMain,#pubMain');
  if (dariServer && (mengetik || $('#modalRoot').children.length)) { S.perluRender = true; return; }
  const y = window.scrollY; render(false); window.scrollTo(0, y);
}
function kembali() { const h = S.hist.pop(); if (h) buka(h.v, h.p, { tanpaRiwayat: true }); }

/* ============================== 5. CETAK & EKSPOR ========================= */
function kopHtml(pdf) {
  const s = S.set && S.set.nama_sekolah ? S.set : (S.pub ? S.pub.sekolah : {});
  return '<table class="kop"><tr><td style="width:84px"><img src="' + (pdf ? '__LOGO__' : logoUrl()) + '" style="width:74px;height:74px;object-fit:contain"></td>' +
    '<td style="text-align:center"><div style="font-size:12pt">' + esc(s.dinas || 'PEMERINTAH KOTA TEGAL') + '</div><div style="font-size:12pt">' + esc(s.dinas2 || 'DINAS PENDIDIKAN DAN KEBUDAYAAN') + '</div>' +
    '<div style="font-size:17pt;font-weight:bold;letter-spacing:.5px">' + esc(String(s.nama_sekolah || 'SD Negeri Slerok 2').toUpperCase()) + '</div>' +
    '<div style="font-size:9.5pt">' + esc(s.alamat || '') + ' · ' + esc(s.kota || '') + (s.telepon ? ' · Telp. ' + esc(s.telepon) : '') + '</div>' +
    '<div style="font-size:9.5pt">NPSN ' + esc(s.npsn || '') + (s.email ? ' · ' + esc(s.email) : '') + '</div></td><td style="width:84px"></td></tr></table>';
}
function blokTtd(ttd, kota) {
  const s = S.set || {};
  const kol = (ttd || ['kepsek']).map(x => {
    if (x === 'kepsek') return { a: 'Mengetahui,', b: 'Kepala ' + (s.nama_sekolah || 'Sekolah'), n: s.kepala_sekolah, nip: s.nip_kepsek };
    if (typeof x === 'object') return x;
    return null;
  }).filter(Boolean);
  const tgl = (kota || s.kota || '') + ', ' + fTglL(hariIni());
  return '<table class="ttd"><tr>' + kol.map((k, i) => '<td>' + (i === kol.length - 1 ? tgl + '<br>' : '<br>') + esc(k.a || '') + '<br>' + esc(k.b || '') + '<div style="height:62px"></div><b><u>' + esc(k.n || '..............................') + '</u></b><br>' + (k.nip ? 'NIP. ' + esc(k.nip) : '&nbsp;') + '</td>').join('') + '</tr></table>';
}
async function qrDataUrl(teks) {
  try { await muat(CDN.qr); const q = qrcode(0, 'M'); q.addData(teks); q.make(); return q.createDataURL(3, 2); } catch (e) { return ''; }
}
function urlApp() { const c = window.APP_CONFIG || {}; return String(c.APP_URL || (S.set && S.set.web_app_url) || (location.protocol.indexOf('http') === 0 ? location.origin + location.pathname : '')).replace(/[?#].*$/, ''); }
function urlVerif(kode) { const u = urlApp(); return u ? u + '?verif=' + kode : 'VERIFIKASI SDN SLEROK 2: ' + kode; }
/** Bangun dokumen cetak lengkap (kop, judul, isi, tanda tangan, QR, kaki). */
async function dokumen(o) {
  const kertas = o.kertas === 'F4' ? '215mm 330mm' : 'A4';
  const orient = o.lanskap ? ' landscape' : '';
  let qr = '';
  if (o.kodeVerif) { const u = await qrDataUrl(urlVerif(o.kodeVerif)); qr = '<div class="qr">' + (u ? '<img src="' + u + '">' : '') + '<div>Kode verifikasi: <b>' + esc(o.kodeVerif) + '</b><br>Pindai QR atau buka menu Verifikasi Dokumen di website sekolah.</div></div>'; }
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + esc(o.judul) + '</title><style>' +
    '@page{size:' + kertas + orient + ';margin:14mm 14mm 16mm}*{box-sizing:border-box}body{font-family:"Times New Roman",serif;color:#000;font-size:11pt;margin:0}' +
    '.kop{width:100%;border-bottom:3px double #000;margin-bottom:10pt;border-collapse:collapse}.kop td{vertical-align:middle;padding:2pt}' +
    'h1{font-size:13pt;text-align:center;margin:6pt 0 2pt;text-transform:uppercase}.sub{text-align:center;margin:0 0 10pt;font-size:10.5pt}' +
    'table.t{width:100%;border-collapse:collapse;font-size:9.5pt}table.t th,table.t td{border:1px solid #000;padding:3pt 4pt;vertical-align:top}table.t th{background:#e8edf5;text-align:center}' +
    'table.t td.r{text-align:right}table.t td.c{text-align:center}table.t tfoot td{font-weight:bold;background:#f1f4f9}' +
    '.ttd{width:100%;margin-top:18pt;font-size:10.5pt;page-break-inside:avoid}.ttd td{text-align:center;vertical-align:top;width:' + Math.floor(100 / Math.max(1, (o.ttd || ['kepsek']).length)) + '%}' +
    '.qr{display:flex;gap:8pt;align-items:center;margin-top:10pt;font-size:8.5pt;color:#333;page-break-inside:avoid}.qr img{width:70pt;height:70pt}' +
    '.kaki{position:fixed;bottom:-10mm;left:0;right:0;font-size:8pt;color:#555;display:flex;justify-content:space-between}' +
    '.kv td{padding:2pt 6pt;vertical-align:top}.blok{page-break-inside:avoid}' + (o.css || '') +
    '</style></head><body>' + (o.tanpaKop ? '' : kopHtml(o.pdf)) + (o.judul ? '<h1>' + esc(o.judul) + '</h1>' : '') + (o.sub ? '<p class="sub">' + o.sub + '</p>' : '') +
    (o.isi || '') + (o.ttd === false ? '' : blokTtd(o.ttd)) + qr +
    '<div class="kaki"><span>Dicetak oleh ' + esc(S.user ? S.user.nama : 'Pengunjung') + ' pada ' + fTglL(hariIni()) + ' ' + new Date().toTimeString().slice(0, 5) + '</span><span>' + esc((S.set && S.set.nama_sekolah) || '') + ' · SIS</span></div>' +
    '</body></html>';
}
function tabelCetak(kolom, baris, kaki) {
  return '<table class="t"><thead><tr>' + kolom.map(k => '<th>' + esc(k.l || k) + '</th>').join('') + '</tr></thead><tbody>' +
    (baris.length ? baris.map(r => '<tr>' + r.map((c, i) => '<td class="' + ((kolom[i] && kolom[i].a) || '') + '">' + (c === undefined || c === null ? '' : (kolom[i] && kolom[i].html ? c : esc(c))) + '</td>').join('') + '</tr>').join('') : '<tr><td colspan="' + kolom.length + '" class="c">Tidak ada data</td></tr>') +
    '</tbody>' + (kaki ? '<tfoot><tr>' + kaki.map((c, i) => '<td class="' + ((kolom[i] && kolom[i].a) || '') + '">' + esc(c) + '</td>').join('') + '</tr></tfoot>' : '') + '</table>';
}
function cetakHtml(html) {
  const f = $('#printFrame');
  f.onload = () => { setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { toast('Browser memblokir cetak dari dalam bingkai. Gunakan tombol Unduh PDF.', 'warn'); } }, 250); f.onload = null; };
  f.srcdoc = html;
}
async function excel(judulF, kolom, baris, sub) {
  await muat(CDN.xlsx);
  const aoa = [[judulF], [sub || ((S.set.nama_sekolah || '') + ' · dicetak ' + fTglL(hariIni()))], [], kolom.map(k => k.l || k)].concat(baris.map(r => r.map(c => (typeof c === 'string' && /^-?\d+(\.\d+)?$/.test(c) && c.length < 12 && c.charAt(0) !== '0') ? Number(c) : c)));
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws['!cols'] = kolom.map(k => ({ wch: Math.min(48, Math.max(8, String(k.l || k).length + 4)) }));
  const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Data');
  XLSX.writeFile(wb, String(judulF).replace(/[^\w\- ]/g, '_').slice(0, 60) + '.xlsx');
}
/** Modal pratinjau dokumen + tombol Cetak / Unduh PDF / Excel / Arsip. */
async function pratinjauDokumen(o) {
  const html = await dokumen(o);
  const m = modal({ judul: 'Pratinjau: ' + o.judul, ukuran: 'xl',
    isi: '<iframe class="preview-frame" title="Pratinjau dokumen"></iframe>',
    kaki: (o.excel ? '<button class="btn btn-secondary" id="dkX">' + ic('sheet') + 'Unduh Excel</button>' : '') +
      '<button class="btn btn-secondary" id="dkPdf" data-busy="Membuat PDF…">' + ic('file-down') + 'Unduh PDF</button>' +
      '<button class="btn btn-primary" id="dkCetak">' + ic('printer') + 'Cetak</button>' });
  $('iframe', m.el).srcdoc = html;
  $('#dkCetak', m.el).onclick = () => cetakHtml(html);
  if (o.excel) $('#dkX', m.el).onclick = () => sibuk($('#dkX', m.el), () => excel(o.judul, o.excel.kolom, o.excel.baris));
  $('#dkPdf', m.el).onclick = () => sibuk($('#dkPdf', m.el), async () => {
    const htmlPdf = await dokumen(Object.assign({}, o, { pdf: true }));
    const d = pastikan(await apiT('apiPdf', { html: htmlPdf, judul: o.judul, jenis: o.jenis || 'Laporan', kaldikId: o.kaldikId || '', folder: o.folder || '' }));
    unduhB64(d.b64, d.nama, 'application/pdf');
    toast('PDF tersimpan di arsip laporan.', 'ok');
    if (o.kaldikId) { const k = rek('Kaldik_Tahun', o.kaldikId); if (k) k.id_file = d.id; }
    $('.m-f', m.el).insertAdjacentHTML('afterbegin', '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' + linkDrive(d.id) + '">' + ic('external-link') + 'Buka di Drive</a>'); ikon();
  });
  return m;
}

/* ============================== 6. WEBSITE PUBLIK ========================= */
const MENU_PUB = [['beranda', 'Beranda'], ['profil', 'Profil'], ['berita', 'Berita'], ['pengumuman', 'Pengumuman'], ['agenda', 'Agenda'], ['galeri', 'Galeri'], ['prestasi', 'Prestasi'], ['ekskul', 'Ekstrakurikuler'], ['kontak', 'Kontak']];
function renderMenuPub() {
  const h = MENU_PUB.map(m => '<a href="javascript:void(0)" data-go="' + m[0] + '">' + m[1] + '</a>').join('');
  $('#pubNav').innerHTML = h; $('#pubNavM').innerHTML = h;
}
function tandaiMenuPub() {
  const aktif = S.view === 'berita-detail' ? 'berita' : S.view;
  $$('#pubNav a,#pubNavM a').forEach(a => a.classList.toggle('on', a.dataset.go === aktif));
  $('#pubDrawer').hidden = true;
  $('#pubMasuk').hidden = S.view === 'masuk';
}
const pub = () => S.pub || { sekolah: {}, profil: [], banner: [], berita: [], pengumuman: [], agenda: [], galeri: [], prestasi: [], ekskul: [], guru: [], statistik: {} };
const profil = b => pub().profil.find(p => p.bagian === b) || {};
function skelPub() { return '<div class="wrap sec"><div class="skel" style="height:320px;border-radius:24px"></div><div class="g3 mt24"><div class="skel" style="height:180px"></div><div class="skel" style="height:180px"></div><div class="skel" style="height:180px"></div></div></div>'; }
function judulHalaman(eyebrow, judulH, sub) {
  return '<section class="page-head"><span class="deco" style="width:220px;height:220px;right:-60px;top:-80px;background:#FFDEA5;opacity:.5"></span><span class="deco" style="width:120px;height:120px;right:180px;bottom:-60px;background:#E2F5EA"></span>' +
    '<div class="wrap" style="position:relative;z-index:2"><div class="crumb">Beranda / ' + esc(eyebrow) + '</div><h1 class="h1" style="font-size:38px">' + esc(judulH) + '</h1>' + (sub ? '<p class="lead" style="margin:8px 0 0">' + esc(sub) + '</p>' : '') + '</div></section>';
}
function kartuBerita(b) {
  return '<button class="ncard" data-berita="' + esc(b.id) + '"><div class="ncard-img" style="' + (b.gambar ? 'background-image:url(\'' + thumb(b.gambar, 720) + '\')' : '') + '">' + (b.gambar ? '' : ic('newspaper')) + '</div>' +
    '<div class="ncard-b"><div class="ncard-meta"><span class="badge b-info">' + esc(b.kategori || 'Umum') + '</span><span>' + fTglL(b.tgl_terbit) + '</span></div>' +
    '<h3>' + esc(b.judul) + '</h3><p>' + esc(b.ringkasan || String(b.isi || '').slice(0, 160)) + '</p><span class="more">Baca selengkapnya ' + ic('arrow-right', 'sm') + '</span></div></button>';
}
function itemAgenda(a) {
  const d = keDate(a.tanggal);
  return '<div class="agenda-i"><div class="dbox"><b>' + pad(d.getDate()) + '</b><small>' + BLN[d.getMonth()] + '</small></div><div><div style="font-weight:800;line-height:1.3">' + esc(a.judul) + '</div><div class="small muted">' + esc([a.waktu, a.tempat].filter(Boolean).join(' · ') || fTglP(a.tanggal)) + '</div></div></div>';
}

VIEW.beranda = { layout: 'pub', render(el) {
  if (!S.pub) { el.innerHTML = skelPub(); return; }
  const p = pub(), s = p.sekolah, st = p.statistik || {};
  const tag = profil('tagline'), sam = profil('sambutan');
  const banner = p.banner.length ? p.banner : [{ judul: tag.judul || s.tagline || 'Belajar Ceria, Berprestasi, Berkarakter', subjudul: tag.isi || '' }];
  const agendaNext = p.agenda.filter(a => a.tanggal >= hariIni()).slice(0, 3);
  el.innerHTML =
    '<div class="wrap"><section class="hero" aria-roledescription="carousel" aria-label="Banner kegiatan">' +
      banner.map((b, i) => '<div class="hero-bg" data-slide="' + i + '" style="opacity:' + (i ? 0 : 1) + ';' + (b.foto ? 'background-image:url(\'' + thumb(b.foto, 1600) + '\')' : 'background:linear-gradient(120deg,#0B2E5C,#1E63D6)') + '"></div>').join('') +
      '<span class="deco" style="width:260px;height:260px;right:-70px;top:-70px;background:#F5B82E;opacity:.18;z-index:1"></span><span class="deco" style="width:140px;height:140px;right:160px;bottom:-50px;background:#E3EEFD;opacity:.18;z-index:1"></span>' +
      '<div class="hero-in"><span class="hero-tag">' + ic('sparkles', 'sm') + esc(s.nama_sekolah || 'SD Negeri Slerok 2') + ' · ' + esc(s.kota || 'Kota Tegal') + '</span>' +
      '<h1 class="h1" id="heroJ">' + esc(banner[0].judul) + '</h1><p id="heroS">' + esc(banner[0].subjudul || '') + '</p>' +
      '<div class="row"><button class="btn btn-cta" data-go="profil">Lihat Profil Sekolah ' + ic('arrow-right') + '</button><button class="btn pill" style="color:#fff;border:1px solid rgba(255,255,255,.35);min-height:48px" data-go="berita">' + ic('newspaper') + 'Berita & Agenda</button></div></div>' +
      (banner.length > 1 ? '<div class="hero-ctl"><button aria-label="Sebelumnya" data-geser="-1">' + ic('chevron-left') + '</button><div class="dots">' + banner.map((b, i) => '<i class="' + (i ? '' : 'on') + '"></i>').join('') + '</div><button aria-label="Berikutnya" data-geser="1">' + ic('chevron-right') + '</button><button aria-label="Jeda slider" id="heroJeda">' + ic('pause') + '</button></div>' : '') +
    '</section>' +
    '<div class="stats">' + [['users', fNum(st.siswa), 'Siswa'], ['graduation-cap', fNum(st.guru), 'Guru & Tendik'], ['school', fNum(st.rombel), 'Rombel'], ['trophy', fNum(st.prestasi), 'Prestasi']].map(x =>
      '<div class="stat-pub"><span class="ic">' + ic(x[0]) + '</span><div><b>' + x[1] + '</b><small>' + x[2] + '</small></div></div>').join('') + '</div></div>' +
    '<section class="sec"><div class="wrap"><div class="welcome"><span class="deco" style="width:180px;height:180px;right:-50px;top:-50px;background:#E3EEFD"></span>' +
      '<div class="center"><div class="welcome-foto">' + (sam.gambar ? '<img src="' + thumb(sam.gambar, 400) + '" alt="Foto Kepala Sekolah">' : ic('user-round')) + '</div>' +
      '<div style="margin-top:12px;font-weight:800">' + esc(s.kepala_sekolah || '') + '</div><div class="small muted">Kepala ' + esc(s.nama_sekolah || '') + '</div></div>' +
      '<div style="position:relative"><span class="eyebrow">' + ic('message-circle-heart', 'sm') + 'Sambutan Kepala Sekolah</span><p class="quote">“' + esc(sam.judul || 'Selamat datang') + '”</p><div class="prose muted">' + esc(sam.isi || '').replace(/\n/g, '<br>') + '</div>' +
      '<button class="btn btn-ghost pill mt8" data-go="profil">Baca profil sekolah ' + ic('arrow-right', 'sm') + '</button></div></div></div></section>' +
    '<section class="sec alt"><div class="wrap"><div class="sec-h"><div><span class="eyebrow">' + ic('newspaper', 'sm') + 'Kabar Sekolah</span><h2 class="h2">Berita Terbaru</h2></div><button class="btn btn-secondary pill" data-go="berita">Lihat Semua Berita ' + ic('arrow-right', 'sm') + '</button></div>' +
      (p.berita.length ? '<div class="ncards">' + p.berita.slice(0, 3).map(kartuBerita).join('') + '</div>' : kosong('newspaper', 'Belum ada berita.')) + '</div></section>' +
    '<section class="sec"><div class="wrap g2"><div><div class="sec-h"><h2 class="h2" style="font-size:26px">' + ic('calendar-days') + ' Agenda Terdekat</h2><button class="btn btn-ghost pill btn-sm" data-go="agenda">Kalender ' + ic('arrow-right', 'sm') + '</button></div>' +
      (agendaNext.length ? agendaNext.map(itemAgenda).join('') : kosong('calendar', 'Belum ada agenda terdekat.')) + '</div>' +
      '<div><div class="sec-h"><h2 class="h2" style="font-size:26px">' + ic('megaphone') + ' Pengumuman</h2><button class="btn btn-ghost pill btn-sm" data-go="pengumuman">Semua ' + ic('arrow-right', 'sm') + '</button></div>' +
      (p.pengumuman.length ? p.pengumuman.slice(0, 3).map(x => '<div class="agenda-i"><div class="li-ic">' + ic('file-text') + '</div><div class="grow"><div style="font-weight:800;line-height:1.3">' + esc(x.judul) + '</div><div class="small muted">' + fTglL(x.tgl_mulai) + '</div></div>' + (x.tgl_mulai >= tglISO(new Date(Date.now() - 7 * 864e5)) ? '<span class="badge b-warning">Baru</span>' : '') + '</div>').join('') : kosong('megaphone', 'Belum ada pengumuman.')) + '</div></div></section>' +
    (p.galeri.length ? '<section class="sec alt"><div class="wrap"><div class="sec-h"><div><span class="eyebrow">' + ic('camera', 'sm') + 'Dokumentasi</span><h2 class="h2">Galeri Kegiatan</h2></div><button class="btn btn-secondary pill" data-go="galeri">Buka Galeri ' + ic('arrow-right', 'sm') + '</button></div>' +
      '<div class="galeri">' + p.galeri.slice(0, 8).map((g, i) => '<button data-lb="' + i + '" style="background-image:url(\'' + thumb(g.foto, 500) + '\')" aria-label="' + esc(g.keterangan || g.album) + '"></button>').join('') + '</div></div></section>' : '') +
    (p.prestasi.length ? '<section class="sec"><div class="wrap"><div class="sec-h"><div><span class="eyebrow">' + ic('trophy', 'sm') + 'Kebanggaan Kami</span><h2 class="h2">Prestasi Unggulan</h2></div><button class="btn btn-secondary pill" data-go="prestasi">Semua Prestasi ' + ic('arrow-right', 'sm') + '</button></div>' +
      '<div class="g3">' + p.prestasi.slice(0, 3).map(kartuPrestasi).join('') + '</div></div></section>' : '') +
    '<section class="sec"><div class="wrap"><div class="verif-band"><span class="deco" style="width:200px;height:200px;right:-60px;top:-60px;background:#F5B82E;opacity:.15"></span><div style="position:relative"><span class="eyebrow" style="color:#F5B82E">' + ic('shield-check', 'sm') + 'Layanan Digital</span><h2 class="h2">Verifikasi Rapor, Surat & Kaldik</h2><p style="margin:8px 0 0;opacity:.85">Pindai kode QR pada dokumen resmi sekolah atau masukkan kode verifikasinya untuk memastikan keasliannya.</p></div>' +
      '<button class="btn btn-cta" data-go="verifikasi" style="background:#F5B82E;color:#0F2340">' + ic('scan-line') + 'Cek Keaslian Dokumen</button></div></div></section>';
  // slider
  if (banner.length > 1) {
    let idx = 0, jeda = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const geser = d => { idx = (idx + d + banner.length) % banner.length; $$('.hero-bg', el).forEach((x, i) => x.style.opacity = i === idx ? 1 : 0); $$('.dots i', el).forEach((x, i) => x.classList.toggle('on', i === idx)); $('#heroJ', el).textContent = banner[idx].judul; $('#heroS', el).textContent = banner[idx].subjudul || ''; };
    $$('[data-geser]', el).forEach(b => b.onclick = () => geser(Number(b.dataset.geser)));
    $('#heroJeda', el).onclick = e => { jeda = !jeda; e.currentTarget.innerHTML = ic(jeda ? 'play' : 'pause'); e.currentTarget.setAttribute('aria-label', jeda ? 'Putar slider' : 'Jeda slider'); ikon(); };
    $('.hero', el).addEventListener('pointerdown', () => { jeda = true; });
    S.timer.slider = setInterval(() => { if (!jeda && !document.hidden) geser(1); }, 6000);
  }
} };
function kartuPrestasi(x) {
  return '<div class="pcard"><div class="row row-sb"><span class="tro">' + ic('trophy') + '</span><span class="badge b-warning">' + esc(x.juara || 'Prestasi') + '</span></div><h3 class="h3">' + esc(x.lomba) + '</h3><div class="small muted">Tingkat ' + esc(x.tingkat || '-') + ' · ' + fTglL(x.tanggal) + '</div><div class="small"><b>' + esc(x.nama_pemilik) + '</b> <span class="muted">(' + esc(x.jenis) + ')</span></div></div>';
}
VIEW.profil = { layout: 'pub', render(el) {
  const p = pub(), s = p.sekolah, sub = S.vs.profil || 'sejarah';
  const tabs = [['sejarah', 'Sejarah'], ['visimisi', 'Visi & Misi'], ['struktur', 'Struktur Organisasi'], ['guru', 'Guru & Tendik'], ['identitas', 'Identitas Sekolah']];
  let isi = '';
  if (sub === 'sejarah') { const x = profil('sejarah'); isi = '<div class="card" style="border-radius:16px;padding:24px">' + (x.gambar ? '<img src="' + thumb(x.gambar, 1000) + '" alt="" style="border-radius:16px;margin-bottom:16px">' : '') + '<h2 class="h3">' + esc(x.judul || 'Sejarah') + '</h2><div class="prose mt8">' + esc(x.isi || '').replace(/\n/g, '<br>') + '</div></div>'; }
  if (sub === 'visimisi') { const v = profil('visi'), m = profil('misi'); isi = '<div class="card" style="border-radius:16px;padding:24px;background:#EEF4FF"><span class="eyebrow">Visi</span><p class="quote mt8">“' + esc(v.isi || '') + '”</p></div><div class="card mt16" style="border-radius:16px;padding:24px"><span class="eyebrow">Misi</span><ol style="padding-left:0;list-style:none;margin:12px 0 0">' + String(m.isi || '').split('\n').filter(Boolean).map((x, i) => '<li class="row" style="align-items:flex-start;margin-bottom:12px;flex-wrap:nowrap"><span style="width:32px;height:32px;border-radius:50%;background:#1E63D6;color:#fff;display:grid;place-items:center;font-weight:800;flex:none">' + (i + 1) + '</span><span>' + esc(x) + '</span></li>').join('') + '</ol></div>'; }
  if (sub === 'struktur') {
    const g = p.guru, kep = g.filter(x => x.jabatan === 'Kepala Sekolah'), lain = g.filter(x => x.jabatan !== 'Kepala Sekolah');
    const kotak = (x, gelap) => '<div style="background:' + (gelap ? '#0B2E5C' : '#fff') + ';color:' + (gelap ? '#fff' : '#0F2340') + ';border:1px solid #DCE3ED;border-radius:14px;padding:12px 16px;text-align:center;min-width:160px"><b style="display:block">' + esc(x.nama) + '</b><small style="opacity:.8">' + esc(x.jabatan || '') + '</small></div>';
    isi = '<div class="card" style="border-radius:16px;padding:24px;overflow-x:auto"><div style="display:flex;flex-direction:column;align-items:center;gap:16px;min-width:max-content">' + (kep.length ? kep.map(x => kotak(x, 1)).join('') : kotak({ nama: s.kepala_sekolah, jabatan: 'Kepala Sekolah' }, 1)) +
      '<div style="width:2px;height:20px;background:#1E63D6"></div><div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;max-width:960px">' + lain.map(x => kotak(x)).join('') + '</div></div>' + (p.profil.find(x => x.bagian === 'struktur') ? '<div class="prose mt16">' + esc(profil('struktur').isi || '').replace(/\n/g, '<br>') + '</div>' : '') + '</div>';
  }
  if (sub === 'guru') isi = '<div class="g4">' + p.guru.map(g => '<div class="pcard center" style="align-items:center"><div class="welcome-foto" style="width:96px;height:96px;border-width:4px">' + (g.foto ? '<img src="' + thumb(g.foto, 300) + '" alt="Foto ' + esc(g.nama) + '" loading="lazy">' : ic('user-round')) + '</div><b>' + esc(g.nama) + '</b><span class="small muted">' + esc(g.jabatan || '') + '</span></div>').join('') + '</div>';
  if (sub === 'identitas') isi = '<div class="card" style="border-radius:16px;padding:24px"><dl class="kv">' + [['Nama Sekolah', s.nama_sekolah], ['NPSN', s.npsn], ['Akreditasi', s.akreditasi], ['Alamat', s.alamat], ['Kecamatan', s.kecamatan], ['Kota', s.kota], ['Kepala Sekolah', s.kepala_sekolah], ['Telepon', s.telepon], ['Email', s.email]].map(x => '<dt>' + x[0] + '</dt><dd>' + esc(x[1] || '-') + '</dd>').join('') + '</dl></div>';
  el.innerHTML = judulHalaman('Profil', 'Profil Sekolah', s.nama_sekolah) + '<section class="sec"><div class="wrap"><div class="subnav mb16" role="tablist">' + tabs.map(t => '<button role="tab" aria-selected="' + (t[0] === sub) + '" class="' + (t[0] === sub ? 'on' : '') + '" data-sub="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>' + isi + '</div></section>';
  $$('[data-sub]', el).forEach(b => b.onclick = () => { S.vs.profil = b.dataset.sub; render(); });
} };
VIEW.berita = { layout: 'pub', render(el) {
  const st = S.vs.berita = S.vs.berita || { q: '', k: 'Semua', hal: 1 };
  el.innerHTML = judulHalaman('Berita', 'Warta & Inspirasi', 'Kabar kegiatan, akademik, dan prestasi warga sekolah.') +
    '<section class="sec"><div class="wrap"><div class="row mb16"><div class="search" style="max-width:420px">' + ic('search') + '<input class="input pill" id="bq" placeholder="Cari berita…" value="' + esc(st.q) + '" aria-label="Cari berita"></div>' +
    '<div class="subnav">' + ['Semua', 'Kegiatan', 'Akademik', 'Prestasi', 'Umum'].map(k => '<button class="' + (k === st.k ? 'on' : '') + '" data-k="' + k + '">' + k + '</button>').join('') + '</div></div><div id="bList"></div></div></section>';
  const isi = () => {
    const q = st.q.toLowerCase();
    const l = pub().berita.filter(b => (st.k === 'Semua' || b.kategori === st.k) && (!q || (b.judul + ' ' + b.ringkasan + ' ' + b.isi).toLowerCase().indexOf(q) > -1));
    const per = 9, hal = Math.min(st.hal, Math.max(1, Math.ceil(l.length / per)));
    $('#bList', el).innerHTML = l.length ? '<div class="ncards">' + l.slice((hal - 1) * per, hal * per).map(kartuBerita).join('') + '</div>' + (l.length > per ? '<div class="pages mt24" style="justify-content:center">' + Array.from({ length: Math.ceil(l.length / per) }, (_, i) => '<button class="' + (i + 1 === hal ? 'on' : '') + '" data-hal="' + (i + 1) + '">' + (i + 1) + '</button>').join('') + '</div>' : '') : kosong('newspaper', 'Tidak ada berita yang cocok.');
    $$('[data-hal]', el).forEach(b => b.onclick = () => { st.hal = Number(b.dataset.hal); isi(); window.scrollTo(0, 0); });
    ikon();
  };
  $('#bq', el).oninput = debounce(e => { st.q = e.target.value; st.hal = 1; isi(); }, 200);
  $$('[data-k]', el).forEach(b => b.onclick = () => { st.k = b.dataset.k; st.hal = 1; render(); });
  isi();
} };
VIEW['berita-detail'] = { layout: 'pub', render(el, p) {
  const b = pub().berita.find(x => x.id === p.id);
  if (!b) { el.innerHTML = '<div class="wrap sec">' + kosong('newspaper', 'Berita tidak ditemukan.') + '</div>'; return; }
  const terkait = pub().berita.filter(x => x.id !== b.id && x.kategori === b.kategori).slice(0, 3);
  el.innerHTML = '<article class="sec"><div class="wrap" style="max-width:820px"><button class="btn btn-ghost pill btn-sm" data-go="berita">' + ic('arrow-left', 'sm') + 'Kembali ke Berita</button>' +
    '<div class="row mt16"><span class="badge b-info">' + esc(b.kategori || 'Umum') + '</span><span class="small muted">' + fTglP(b.tgl_terbit) + (b.penulis ? ' · ' + esc(b.penulis) : '') + '</span></div>' +
    '<h1 class="h1 mt8" style="font-size:36px">' + esc(b.judul) + '</h1>' + (b.gambar ? '<img src="' + thumb(b.gambar, 1400) + '" alt="' + esc(b.judul) + '" style="border-radius:24px;margin:20px 0;width:100%">' : '') +
    '<div class="prose mt16">' + esc(b.isi || '').split(/\n\s*\n/).map(x => '<p>' + x.replace(/\n/g, '<br>') + '</p>').join('') + '</div>' +
    '<div class="row mt16"><a class="btn btn-secondary pill btn-sm" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(b.judul) + '">' + ic('share-2', 'sm') + 'Bagikan ke WhatsApp</a></div></div>' +
    (terkait.length ? '<div class="wrap mt24"><h2 class="h3 mb16">Berita Terkait</h2><div class="ncards">' + terkait.map(kartuBerita).join('') + '</div></div>' : '') + '</article>';
} };
VIEW.pengumuman = { layout: 'pub', render(el) {
  const l = pub().pengumuman;
  el.innerHTML = judulHalaman('Pengumuman', 'Pengumuman Sekolah', 'Informasi resmi untuk orang tua, siswa, dan masyarakat.') + '<section class="sec"><div class="wrap" style="max-width:900px">' +
    (l.length ? l.map(x => '<div class="card" style="border-radius:16px;padding:20px;margin-bottom:12px"><div class="row row-sb"><h3 class="h3">' + esc(x.judul) + '</h3>' + (x.tgl_mulai >= tglISO(new Date(Date.now() - 7 * 864e5)) ? '<span class="badge b-warning">Baru</span>' : '') + '</div><div class="small muted">' + fTglL(x.tgl_mulai) + (x.tgl_selesai ? ' — berlaku s.d. ' + fTglL(x.tgl_selesai) : '') + '</div><div class="prose mt8">' + esc(x.isi || '').replace(/\n/g, '<br>') + '</div>' +
      (x.lampiran ? '<a class="btn btn-secondary pill btn-sm" target="_blank" rel="noopener" href="' + linkDrive(x.lampiran) + '">' + ic('download', 'sm') + 'Unduh Lampiran</a>' : '') + '</div>').join('') : kosong('megaphone', 'Belum ada pengumuman aktif.')) + '</div></section>';
} };
VIEW.agenda = { layout: 'pub', render(el) {
  const st = S.vs.agendaPub = S.vs.agendaPub || { b: new Date().getMonth(), t: new Date().getFullYear(), sel: '' };
  const l = pub().agenda;
  const awal = new Date(st.t, st.b, 1), off = (awal.getDay() + 6) % 7, jml = new Date(st.t, st.b + 1, 0).getDate();
  let sel = '';
  for (let i = 0; i < off; i++) sel += '<div class="d x"></div>';
  for (let d = 1; d <= jml; d++) {
    const t = st.t + '-' + pad(st.b + 1) + '-' + pad(d), ada = l.filter(a => a.tanggal === t);
    sel += '<button class="d' + (t === hariIni() ? ' today' : '') + (ada.length ? ' k-K' : '') + '" data-tgl="' + t + '" aria-label="' + fTglP(t) + (ada.length ? ', ' + ada.length + ' agenda' : '') + '"><b>' + d + '</b>' + (ada.length ? '<small>' + esc(ada[0].judul) + '</small>' : '') + '</button>';
  }
  const pilih = st.sel ? l.filter(a => a.tanggal === st.sel) : l.filter(a => a.tanggal >= hariIni()).slice(0, 6);
  el.innerHTML = judulHalaman('Agenda', 'Agenda Sekolah', 'Kegiatan sekolah yang terbuka untuk diketahui orang tua dan masyarakat.') +
    '<section class="sec"><div class="wrap split s2"><div class="card" style="border-radius:16px"><div class="row row-sb mb16"><button class="btn btn-icon btn-ghost" data-bln="-1" aria-label="Bulan sebelumnya">' + ic('chevron-left') + '</button><b class="h3">' + BULAN[st.b] + ' ' + st.t + '</b><button class="btn btn-icon btn-ghost" data-bln="1" aria-label="Bulan berikutnya">' + ic('chevron-right') + '</button></div>' +
    '<div class="kbig">' + ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'].map(x => '<div class="dw">' + x + '</div>').join('') + sel + '</div></div>' +
    '<div><h2 class="h3 mb16">' + (st.sel ? fTglP(st.sel) : 'Agenda Mendatang') + '</h2>' + (pilih.length ? pilih.map(itemAgenda).join('') : kosong('calendar', 'Tidak ada agenda.')) + '</div></div></section>';
  $$('[data-bln]', el).forEach(b => b.onclick = () => { st.b += Number(b.dataset.bln); if (st.b < 0) { st.b = 11; st.t--; } if (st.b > 11) { st.b = 0; st.t++; } st.sel = ''; render(); });
  $$('[data-tgl]', el).forEach(b => b.onclick = () => { st.sel = b.dataset.tgl; render(); });
} };
VIEW.galeri = { layout: 'pub', render(el) {
  const st = S.vs.galeri = S.vs.galeri || { album: '' };
  const g = pub().galeri, albums = {};
  g.forEach(x => { (albums[x.album] = albums[x.album] || []).push(x); });
  let isi;
  if (!st.album) isi = Object.keys(albums).length ? '<div class="ncards">' + Object.keys(albums).map(a => '<button class="ncard" data-album="' + esc(a) + '"><div class="ncard-img" style="background-image:url(\'' + thumb(albums[a][0].foto, 600) + '\')"></div><div class="ncard-b"><h3>' + esc(a) + '</h3><span class="badge b-info">' + albums[a].length + ' foto</span></div></button>').join('') + '</div>' : kosong('images', 'Belum ada foto di galeri.');
  else isi = '<button class="btn btn-ghost pill btn-sm mb16" data-album="">' + ic('arrow-left', 'sm') + 'Semua Album</button><h2 class="h2 mb16">' + esc(st.album) + '</h2><div class="galeri">' + (albums[st.album] || []).map(x => '<button data-lbx="' + g.indexOf(x) + '" style="background-image:url(\'' + thumb(x.foto, 500) + '\')" aria-label="' + esc(x.keterangan || st.album) + '"></button>').join('') + '</div>';
  el.innerHTML = judulHalaman('Galeri', 'Galeri Kegiatan', 'Momen belajar dan bermain warga SD Negeri Slerok 2.') + '<section class="sec"><div class="wrap">' + isi + '</div></section>';
  $$('[data-album]', el).forEach(b => b.onclick = () => { st.album = b.dataset.album; render(true); });
  $$('[data-lbx]', el).forEach(b => b.onclick = () => lightbox(g.filter(x => x.album === st.album), (albums[st.album] || []).indexOf(g[Number(b.dataset.lbx)])));
} };
function lightbox(daftarFoto, i) {
  const lb = document.createElement('div'); lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', 'Galeri foto');
  const tampil = () => { const f = daftarFoto[i]; lb.innerHTML = '<button class="btn btn-icon x" style="color:#fff" aria-label="Tutup">' + ic('x') + '</button><button class="nv l" aria-label="Sebelumnya">' + ic('chevron-left') + '</button><img src="' + thumb(f.foto, 1600) + '" alt="' + esc(f.keterangan || '') + '"><p>' + esc(f.keterangan || f.album || '') + ' · ' + (i + 1) + ' / ' + daftarFoto.length + '</p><button class="nv r" aria-label="Berikutnya">' + ic('chevron-right') + '</button>'; ikon();
    lb.querySelector('.x').onclick = tutup; lb.querySelector('.l').onclick = () => { i = (i - 1 + daftarFoto.length) % daftarFoto.length; tampil(); }; lb.querySelector('.r').onclick = () => { i = (i + 1) % daftarFoto.length; tampil(); }; };
  const kunci = e => { if (e.key === 'Escape') tutup(); if (e.key === 'ArrowRight') { i = (i + 1) % daftarFoto.length; tampil(); } if (e.key === 'ArrowLeft') { i = (i - 1 + daftarFoto.length) % daftarFoto.length; tampil(); } };
  const tutup = () => { lb.remove(); document.removeEventListener('keydown', kunci); };
  document.addEventListener('keydown', kunci); lb.onclick = e => { if (e.target === lb) tutup(); };
  document.body.appendChild(lb); tampil();
}
VIEW.prestasi = { layout: 'pub', render(el) {
  const st = S.vs.prestasiPub = S.vs.prestasiPub || 'Semua';
  const l = pub().prestasi.filter(x => st === 'Semua' || x.jenis === st);
  el.innerHTML = judulHalaman('Prestasi', 'Prestasi Siswa, Guru & Sekolah') + '<section class="sec"><div class="wrap"><div class="subnav mb16">' + ['Semua', 'Siswa', 'Guru', 'Sekolah'].map(k => '<button class="' + (k === st ? 'on' : '') + '" data-j="' + k + '">' + k + '</button>').join('') + '</div>' +
    (l.length ? '<div class="g3">' + l.map(kartuPrestasi).join('') + '</div>' : kosong('trophy', 'Belum ada data prestasi.')) + '</div></section>';
  $$('[data-j]', el).forEach(b => b.onclick = () => { S.vs.prestasiPub = b.dataset.j; render(); });
} };
VIEW.ekskul = { layout: 'pub', render(el) {
  const l = pub().ekskul;
  el.innerHTML = judulHalaman('Ekstrakurikuler', 'Ekstrakurikuler', 'Wadah mengembangkan bakat, minat, dan karakter siswa.') + '<section class="sec"><div class="wrap">' +
    (l.length ? '<div class="g3">' + l.map(e => '<div class="ecard"><span class="ic">' + ic(e.ikon || 'star') + '</span><div><h3 class="h3">' + esc(e.nama) + '</h3><div class="small muted">' + ic('clock', 'sm') + ' ' + esc(e.jadwal || '-') + '</div>' + (e.pembina ? '<div class="small">Pembina: <b>' + esc(e.pembina) + '</b></div>' : '') + (e.deskripsi ? '<p class="small muted" style="margin:6px 0 0">' + esc(e.deskripsi) + '</p>' : '') + '</div></div>').join('') + '</div>' : kosong('trophy', 'Belum ada data ekstrakurikuler.')) + '</div></section>';
} };
VIEW.kontak = { layout: 'pub', render(el) {
  const s = pub().sekolah;
  el.innerHTML = judulHalaman('Kontak', 'Hubungi Kami', 'Kami senang menerima pertanyaan, saran, dan masukan.') +
    '<section class="sec"><div class="wrap g2"><div><div class="card" style="border-radius:16px;padding:24px">' + [['map-pin', 'Alamat', s.alamat + (s.kota ? ', ' + s.kota : '')], ['phone', 'Telepon', s.telepon], ['mail', 'Email', s.email], ['clock', 'Jam Layanan', s.jam_layanan]].map(x => '<div class="li"><span class="li-ic">' + ic(x[0]) + '</span><div class="li-b"><div class="li-s">' + x[1] + '</div><div class="li-t">' + esc(x[2] || '-') + '</div></div></div>').join('') + '</div>' +
    (s.maps_embed ? '<iframe title="Peta lokasi sekolah" src="' + esc(s.maps_embed) + '" style="width:100%;height:280px;border:0;border-radius:16px;margin-top:16px" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' : '') + '</div>' +
    '<form class="card" style="border-radius:16px;padding:24px" id="fKontak" novalidate><h2 class="h3 mb16">Kirim Pesan</h2><div class="grid">' +
    '<div class="field"><label class="label" for="kNama">Nama<span class="req">*</span></label><input class="input" id="kNama" maxlength="100" required autocomplete="name"></div>' +
    '<div class="field"><label class="label" for="kKontak">Email / No. HP<span class="req">*</span></label><input class="input" id="kKontak" maxlength="100" required></div>' +
    '<div class="field"><label class="label" for="kPesan">Pesan<span class="req">*</span></label><textarea class="textarea" id="kPesan" maxlength="2000" required></textarea></div>' +
    '<div id="kInfo"></div><button class="btn btn-cta" type="submit" data-busy="Mengirim…">' + ic('send') + 'Kirim Pesan</button></div></form></div></section>';
  $('#fKontak', el).onsubmit = e => { e.preventDefault(); const b = e.submitter || $('#fKontak button', el);
    const d = { nama: $('#kNama', el).value.trim(), kontak: $('#kKontak', el).value.trim(), pesan: $('#kPesan', el).value.trim() };
    if (!d.nama || !d.kontak || !d.pesan) { $('#kInfo', el).innerHTML = '<div class="alert alert-err">' + ic('circle-alert') + 'Nama, kontak, dan pesan wajib diisi.</div>'; ikon(); return; }
    sibuk(b, async () => { const r = await api('apiKirimPesan', d); if (!r.success) throw new Error(r.message); $('#fKontak', el).innerHTML = '<div class="empty"><div class="em-ic" style="background:#E2F5EA;color:#0F7A44">' + ic('circle-check') + '</div><b>' + esc(r.message) + '</b></div>'; ikon(); });
  };
} };
VIEW.verifikasi = { layout: 'pub', render(el, p) {
  el.innerHTML = judulHalaman('Verifikasi Dokumen', 'Verifikasi Dokumen', 'Periksa keaslian rapor, surat keluar, dan kalender pendidikan resmi.') +
    '<section class="sec"><div class="wrap" style="max-width:640px"><form class="card" style="border-radius:16px;padding:24px" id="fVerif"><div class="field"><label class="label" for="vKode">Kode Verifikasi</label><input class="input" id="vKode" placeholder="Contoh: K7Q2MZP4XA" style="text-transform:uppercase" value="' + esc(p.kode || '') + '" maxlength="12"></div><button class="btn btn-primary w100 mt16" data-busy="Memeriksa…">' + ic('scan-line') + 'Periksa Keaslian</button></form><div id="vHasil" class="mt16"></div></div></section>';
  const cek = async () => {
    const kode = $('#vKode', el).value.trim().toUpperCase(); if (!kode) return;
    await sibuk($('#fVerif button', el), async () => {
      const d = pastikan(await api('apiVerifikasi', kode));
      $('#vHasil', el).innerHTML = d.valid ? '<div class="card center" style="border-radius:16px;padding:28px"><div class="em-ic" style="width:72px;height:72px;border-radius:50%;margin:0 auto;background:#E2F5EA;color:#0F7A44;display:grid;place-items:center">' + ic('badge-check') + '</div><h2 class="h2 mt16" style="color:#0F7A44">Dokumen Asli</h2><dl class="kv mt16" style="text-align:left">' +
        [['Jenis', d.jenis], ['Nomor', d.nomor], ['Nama / Perihal', d.nama], ['Tanggal terbit', fTglL(d.tanggal)], ['Disahkan oleh', d.disahkan_oleh]].map(x => '<dt>' + x[0] + '</dt><dd>' + esc(x[1] || '-') + '</dd>').join('') + '</dl></div>'
        : '<div class="card center" style="border-radius:16px;padding:28px"><div style="width:72px;height:72px;border-radius:50%;margin:0 auto;background:#FBE4E4;color:#C62828;display:grid;place-items:center">' + ic('circle-x') + '</div><h2 class="h3 mt16" style="color:#C62828">Dokumen tidak ditemukan atau tidak sah</h2><p class="muted">Periksa kembali kode verifikasi atau hubungi sekolah.</p></div>';
      ikon();
    });
  };
  $('#fVerif', el).onsubmit = e => { e.preventDefault(); cek(); };
  if (p.kode) cek();
} };

/* ---------- Masuk / lupa sandi ---------- */
VIEW.masuk = { layout: 'pub', render(el) {
  el.innerHTML = '<section class="auth"><div class="auth-art"><span class="deco" style="width:320px;height:320px;right:-100px;top:-100px;background:#F5B82E;opacity:.18"></span><span class="deco" style="width:200px;height:200px;left:-60px;bottom:-60px;background:#E3EEFD;opacity:.15"></span>' +
    '<div style="width:96px;height:96px;border-radius:50%;background:#fff;padding:8px"><img src="' + logoUrl() + '" alt=""></div><h1 class="h1" style="color:#fff">Sistem Informasi Sekolah</h1><p style="opacity:.85;font-size:18px;margin:0">' + esc(pub().sekolah.nama_sekolah || 'SD Negeri Slerok 2') + ' — satu akun untuk administrasi, akademik, keuangan, surat, dan kalender pendidikan.</p></div>' +
    '<div class="auth-wrap"><form class="auth-card" id="fMasuk" novalidate><div class="center"><img src="' + logoUrl() + '" alt="" style="width:64px;height:64px;margin:0 auto 8px"><h2 style="margin:0;font-size:22px">Masuk ke SIS</h2><p class="small muted" style="margin:4px 0 16px">Guru & staf: email/username. Siswa: NISN. Orang tua: OT-NISN anak.</p></div>' +
    '<div class="grid"><div class="field"><label class="label" for="mU">Email atau Username / NISN</label><input class="input" id="mU" autocomplete="username" required autocapitalize="none"></div>' +
    '<div class="field"><label class="label" for="mP">Kata Sandi</label><div style="position:relative"><input class="input" id="mP" type="password" autocomplete="current-password" required style="padding-right:48px"><button type="button" class="btn btn-icon btn-ghost btn-sm" id="mLihat" aria-label="Tampilkan kata sandi" style="position:absolute;right:4px;top:4px">' + ic('eye') + '</button></div></div>' +
    '<div class="row row-sb"><label class="row small" style="gap:6px"><input type="checkbox" id="mIngat" ' + (store.ingat() ? 'checked' : '') + '>Ingat saya di perangkat ini</label><a href="javascript:void(0)" class="small bold" data-go="lupa">Lupa kata sandi?</a></div>' +
    '<div id="mErr"></div><button class="btn btn-primary w100" type="submit" data-busy="Memeriksa…">' + ic('log-in') + 'Masuk</button>' +
    '<button type="button" class="btn btn-ghost w100" data-go="beranda">' + ic('arrow-left') + 'Kembali ke Beranda</button></div></form></div></section>';
  $('#mLihat', el).onclick = () => { const i = $('#mP', el); i.type = i.type === 'password' ? 'text' : 'password'; };
  $('#fMasuk', el).onsubmit = e => {
    e.preventDefault();
    const u = $('#mU', el).value.trim(), p = $('#mP', el).value;
    if (!u || !p) { $('#mErr', el).innerHTML = '<div class="alert alert-err">' + ic('circle-alert') + 'Isi username dan kata sandi.</div>'; ikon(); return; }
    sibuk($('#fMasuk button[type=submit]', el), async () => {
      try { localStorage.setItem('sis2_ingat', $('#mIngat', el).checked ? '1' : '0'); } catch (x) { }
      const r = await api('apiLogin', u, p);
      if (!r.success) { $('#mErr', el).innerHTML = '<div class="alert alert-err">' + ic('circle-alert') + esc(r.message) + '</div>'; ikon(); return; }
      S.token = r.data.token; S.user = r.data.user; store.set('token', S.token, true);
      $('#mErr', el).innerHTML = '<div class="alert alert-info">' + ic('loader') + 'Memuat data…</div>'; ikon();
      await muatBootstrap();
      masukAplikasi();
      if (S.user.wajib_ganti) gantiSandi(true);
      else toast('Selamat datang, ' + S.user.nama + '!', 'ok');
    });
  };
} };
VIEW.lupa = { layout: 'pub', render(el) {
  el.innerHTML = '<div class="auth-wrap" style="min-height:70vh"><form class="auth-card" id="fLupa"><h2 style="margin:0 0 6px;font-size:22px">Lupa Kata Sandi</h2><p class="small muted" style="margin:0 0 16px">Masukkan email staf yang terdaftar. Kata sandi sementara akan dikirim ke email tersebut.</p>' +
    '<div class="field"><label class="label" for="lE">Email</label><input class="input" id="lE" type="email" required autocomplete="email"></div><div id="lInfo" class="mt16"></div>' +
    '<button class="btn btn-primary w100 mt16" data-busy="Mengirim…">' + ic('mail') + 'Kirim Kata Sandi Sementara</button><div class="alert alert-info mt16">' + ic('info') + '<span>Siswa dan orang tua: hubungi wali kelas atau operator sekolah untuk reset kata sandi.</span></div>' +
    '<button type="button" class="btn btn-ghost w100 mt8" data-go="masuk">' + ic('arrow-left') + 'Kembali ke Masuk</button></form></div>';
  $('#fLupa', el).onsubmit = e => { e.preventDefault(); sibuk($('#fLupa .btn-primary', el), async () => { const r = await api('apiLupaSandi', $('#lE', el).value); $('#lInfo', el).innerHTML = '<div class="alert ' + (r.success ? 'alert-ok' : 'alert-err') + '">' + esc(r.message) + '</div>'; }); };
} };
function gantiSandi(wajib) {
  const m = modal({ judul: wajib ? 'Buat Kata Sandi Baru' : 'Ganti Kata Sandi', ukuran: 'sm', kunci: wajib,
    isi: (wajib ? '<div class="alert alert-warn mb16">' + ic('shield-alert') + '<span>Demi keamanan, ganti kata sandi sementara Anda sebelum melanjutkan.</span></div>' : '') +
      '<div class="grid"><div class="field"><label class="label" for="gLama">Kata sandi saat ini</label><input class="input" type="password" id="gLama" autocomplete="current-password"></div>' +
      '<div class="field"><label class="label" for="gBaru">Kata sandi baru</label><input class="input" type="password" id="gBaru" autocomplete="new-password"><div class="prog mt8"><span id="gMeter" style="width:0"></span></div><span class="help">Minimal 8 karakter, berisi huruf dan angka.</span></div>' +
      '<div class="field"><label class="label" for="gUlang">Ulangi kata sandi baru</label><input class="input" type="password" id="gUlang" autocomplete="new-password"></div><div id="gErr"></div></div>',
    kaki: (wajib ? '<button class="btn btn-ghost" id="gKeluar">Keluar</button>' : '<button class="btn btn-ghost" data-tutup>Batal</button>') + '<button class="btn btn-primary" id="gSimpan" data-busy="Menyimpan…">Simpan Kata Sandi</button>' });
  if (wajib) $('[data-tutup]', m.el).hidden = true;
  $('#gBaru', m.el).oninput = e => { const v = e.target.value; let s = 0; if (v.length >= 8) s++; if (/[A-Za-z]/.test(v) && /\d/.test(v)) s++; if (v.length >= 12) s++; if (/[^A-Za-z0-9]/.test(v)) s++; const b = $('#gMeter', m.el); b.style.width = (s * 25) + '%'; b.style.background = ['#C62828', '#C62828', '#F5B82E', '#0F7A44', '#0F7A44'][s]; };
  if (wajib) $('#gKeluar', m.el).onclick = () => { m.tutup(); keluar(); };
  $('#gSimpan', m.el).onclick = () => sibuk($('#gSimpan', m.el), async () => {
    const lama = $('#gLama', m.el).value, baru = $('#gBaru', m.el).value, ulang = $('#gUlang', m.el).value;
    if (baru !== ulang) throw new Error('Ulangan kata sandi tidak sama.');
    pastikan(await apiT('apiGantiSandi', lama, baru));
    S.user.wajib_ganti = false; simpanSnapshot(); m.tutup(); toast('Kata sandi berhasil diganti.', 'ok');
  });
}

/* ============================== 7. PORTAL SISWA & ORANG TUA =============== */
function infoHari(tgl, kd) {
  const d = keDate(tgl), dow = d.getDay();
  const hs = kd ? String(kd.hari_sekolah) : String(S.set.hari_sekolah || '6');
  const r = (S.vs._hariMap || {})[tgl];
  if (r && LIBUR.indexOf(r.jenis) > -1) return { jenis: r.jenis, kode: KODE_HARI[r.jenis], ket: r.keterangan, efektif: false };
  if (dow === 0) return { jenis: 'Minggu', kode: 'off', efektif: false };
  if (dow === 6 && hs === '5') return { jenis: 'Sabtu', kode: 'off', efektif: false };
  if (r) return { jenis: r.jenis, kode: KODE_HARI[r.jenis], ket: r.keterangan, efektif: true };
  return { jenis: 'Hari Efektif', kode: '', efektif: true };
}
function petaHari(idTahun) { const m = {}; daftar('Kaldik_Hari').forEach(h => { if (!idTahun || h.id_tahun === idTahun) m[h.tanggal] = h; }); S.vs._hariMap = m; return m; }
function kaldikUntuk(tgl) { return daftar('Kaldik_Tahun').find(k => k.tgl_awal <= tgl && k.tgl_akhir >= tgl) || daftar('Kaldik_Tahun')[0]; }
function legendaKaldik() {
  return '<div class="legend">' + [['', 'E · Hari Efektif', 'background:var(--surface);border:1px solid var(--line)'], ['k-LN', 'LN · Libur Nasional'], ['k-CB', 'CB · Cuti Bersama'], ['k-LSk', 'LSk · Libur Sekolah'], ['k-LS', 'LS · Libur Semester'], ['k-K', 'K · Kegiatan'], ['k-STS', 'STS/SAS · Penilaian'], ['k-MPLS', 'MPLS / R · Rapor'], ['k-off', 'Minggu/Libur Pekan']].map(x => '<span class="lg ' + x[0] + '" style="' + (x[2] || '') + '">' + x[1] + '</span>').join('') + '</div>';
}
function bulanKalender(th, bl, kd, opsi) {
  opsi = opsi || {};
  const awal = new Date(th, bl, 1), off = (awal.getDay() + 6) % 7, jml = new Date(th, bl + 1, 0).getDate();
  let h = '<div class="' + (opsi.besar ? 'kbig' : 'kd') + '">' + (opsi.besar ? ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'] : ['S', 'S', 'R', 'K', 'J', 'S', 'M']).map(x => '<div class="dw">' + x + '</div>').join('');
  for (let i = 0; i < off; i++) h += '<div class="d x"></div>';
  const today = hariIni();
  for (let d = 1; d <= jml; d++) {
    const t = th + '-' + pad(bl + 1) + '-' + pad(d);
    const luar = kd && (t < kd.tgl_awal || t > kd.tgl_akhir);
    const inf = infoHari(t, kd);
    const kls = inf.kode === 'off' ? 'k-off' : inf.kode ? 'k-' + inf.kode : '';
    const lbl = fTglP(t) + ' — ' + inf.jenis + (inf.ket ? ': ' + inf.ket : '');
    h += opsi.besar
      ? '<button class="d ' + kls + (t === today ? ' today' : '') + (luar ? ' x' : '') + (opsi.pilih === t ? ' today' : '') + '" data-hari="' + t + '" aria-label="' + esc(lbl) + '"><b>' + d + '</b><small>' + esc(inf.kode === 'off' ? inf.jenis : (inf.ket || (inf.kode ? inf.kode : 'E'))) + '</small></button>'
      : '<button class="d ' + kls + (t === today ? ' today' : '') + (luar ? ' x' : '') + '" data-hari="' + t + '" title="' + esc(lbl) + '" aria-label="' + esc(lbl) + '">' + d + '</button>';
  }
  return h + '</div>';
}
function bulanRentang(kd) { const out = []; if (!kd) return out; const a = keDate(kd.tgl_awal), b = keDate(kd.tgl_akhir); for (let d = new Date(a.getFullYear(), a.getMonth(), 1); d <= b; d.setMonth(d.getMonth() + 1)) out.push([d.getFullYear(), d.getMonth()]); return out; }
function rekapKaldik(kd) {
  const per = {}, smt = { Ganjil: { e: 0, w: {}, l: 0 }, Genap: { e: 0, w: {}, l: 0 } }; let total = 0;
  if (!kd) return { per: per, smt: smt, total: 0 };
  for (let d = keDate(kd.tgl_awal), b = keDate(kd.tgl_akhir); d <= b; d.setDate(d.getDate() + 1)) {
    const t = tglISO(d), k = t.slice(0, 7), inf = infoHari(t, kd), sm = d.getMonth() >= 6 ? 'Ganjil' : 'Genap';
    const x = per[k] = per[k] || { e: 0, w: {}, l: 0 };
    const senin = new Date(d); senin.setDate(d.getDate() - ((d.getDay() + 6) % 7)); const wk = tglISO(senin);
    if (inf.efektif) { x.e++; x.w[wk] = 1; smt[sm].e++; smt[sm].w[wk] = 1; total++; }
    else if (inf.kode !== 'off') { x.l++; smt[sm].l++; }
  }
  return { per: per, smt: smt, total: total };
}
VIEW.portal = { layout: 'portal', render(el) {
  const st = S.vs.portal = S.vs.portal || { anak: (S.cx && S.cx.anak && S.cx.anak[0]) || '', b: new Date().getMonth(), t: new Date().getFullYear(), sel: hariIni() };
  const anak = daftar('Anak'), a = anak.find(x => x.id === st.anak) || anak[0] || {};
  const kd = kaldikUntuk(hariIni());
  if (!kd) { el.innerHTML = '<div class="hello"><div><h1 class="h1">Halo, ' + esc((a.nama || S.user.nama).split(' ')[0]) + '!</h1><p class="lead">Kalender pendidikan tahun ini belum disahkan. Silakan cek kembali nanti.</p></div></div>' + kosong('calendar-x', 'Belum ada Kaldik yang disahkan.'); return; }
  petaHari(kd.id_tahun);
  const today = infoHari(hariIni(), kd), rk = rekapKaldik(kd), bl = st.t + '-' + pad(st.b + 1);
  const mendatang = daftar('Kaldik_Hari').filter(h => h.id_tahun === kd.id_tahun && h.tanggal >= hariIni()).sort((x, y) => x.tanggal < y.tanggal ? -1 : 1);
  const unik = []; mendatang.forEach(h => { if (!unik.length || unik[unik.length - 1].jenis !== h.jenis || unik[unik.length - 1].keterangan !== h.keterangan) unik.push(Object.assign({ akhir: h.tanggal }, h)); else unik[unik.length - 1].akhir = h.tanggal; });
  const warna = { LN: 'background:#FBE4E4;color:#C62828', CB: 'background:#FBE9DC;color:#C2560F', LSk: 'background:#FBE9DC;color:#C2560F', LS: 'background:#E3EEFD;color:#1E63D6', K: 'background:#E2F5EA;color:#0F7A44', STS: 'background:#F5B82E;color:#0F2340', SAS: 'background:#F5B82E;color:#0F2340', MPLS: 'background:#0B2E5C;color:#fff', R: 'background:#0B2E5C;color:#fff' };
  const pilih = infoHari(st.sel, kd);
  const ujian = daftar('Kaldik_Hari').filter(h => h.id_tahun === kd.id_tahun && h.tanggal.indexOf(bl) === 0 && (h.jenis === 'STS' || h.jenis === 'SAS')).length;
  const keg = daftar('Kaldik_Hari').filter(h => h.id_tahun === kd.id_tahun && h.tanggal.indexOf(bl) === 0 && h.jenis === 'Kegiatan').length;
  const lib = daftar('Kaldik_Hari').filter(h => h.id_tahun === kd.id_tahun && h.tanggal.indexOf(bl) === 0 && LIBUR.indexOf(h.jenis) > -1).length;
  el.innerHTML =
    (anak.length > 1 ? '<div class="row"><span class="small muted">Pilih anak:</span>' + anak.map(x => '<button class="chip ' + (x.id === a.id ? 'on' : '') + '" data-anak="' + x.id + '">' + ic('smile') + esc(x.nama.split(' ')[0]) + ' · ' + esc(judul('Kelas_Rombel', x.id_kelas)) + '</button>').join('') + '</div>' : '') +
    '<section class="hello"><span class="deco" style="width:240px;height:240px;right:-70px;top:-70px;background:#ABC7FE;opacity:.35"></span><span class="deco" style="width:160px;height:160px;right:200px;bottom:-70px;background:#FFDEA5;opacity:.45"></span>' +
      '<div style="position:relative;z-index:2"><span class="badge b-info">' + ic('badge-check') + 'Tahun Ajaran ' + esc(judul('Tahun_Ajaran', kd.id_tahun)) + '</span><h1 class="h1 mt8">Halo, ' + esc(S.user.peran === 'OrangTua' ? 'Bapak/Ibu Wali ' + (a.nama || '').split(' ')[0] : (a.nama || S.user.nama).split(' ')[0]) + '!</h1><p class="lead" style="margin:6px 0 0">Lihat hari efektif, jadwal penilaian, kegiatan, dan hari libur sekolah' + (a.nama ? ' untuk <b>' + esc(a.nama) + '</b> (' + esc(judul('Kelas_Rombel', a.id_kelas)) + ')' : '') + '.</p></div>' +
      '<div class="hello-card"><div class="row row-sb"><span class="xs bold muted" style="text-transform:uppercase;letter-spacing:.05em">Hari ini</span><span class="badge ' + (today.efektif ? 'b-success' : 'b-danger') + '">' + esc(today.kode && today.kode !== 'off' ? today.kode + ' · ' : (today.efektif ? 'E · ' : '')) + esc(today.jenis) + '</span></div><div class="h3 mt8">' + fTglP(hariIni()) + '</div>' + (today.ket ? '<div class="small muted">' + esc(today.ket) + '</div>' : '') + '</div></section>' +
    '<div class="g4">' + [['calendar-check', rk.per[bl] ? rk.per[bl].e + ' hari' : '0 hari', 'Hari efektif bulan ini', ''], ['clipboard-pen', ujian + ' hari', 'Penilaian (STS/SAS)', 'y'], ['party-popper', keg + ' hari', 'Kegiatan sekolah', 'g'], ['tree-palm', lib + ' hari', 'Hari libur', 'o']].map(x => '<div class="stat-pub"><span class="ic stat-ic ' + x[3] + '">' + ic(x[0]) + '</span><div><b>' + x[1] + '</b><small>' + x[2] + '</small></div></div>').join('') + '</div>' +
    '<section><h2 class="h3 mb16">' + ic('calendar-clock') + ' Agenda & Tanggal Penting Terdekat</h2>' + (unik.length ? '<div class="acards">' + unik.slice(0, 4).map(h => '<div class="acard" style="' + (warna[KODE_HARI[h.jenis]] || '') + '"><span class="badge" style="background:rgba(0,0,0,.08);color:inherit;align-self:flex-start">' + esc(h.jenis) + '</span><b>' + esc(h.keterangan || h.jenis) + '</b><span class="dt">' + fTgl(h.tanggal) + (h.akhir !== h.tanggal ? ' – ' + fTgl(h.akhir) : '') + '</span></div>').join('') + '</div>' : kosong('calendar', 'Tidak ada agenda khusus dalam waktu dekat.')) + '</section>' +
    '<section class="card" style="border-radius:16px;padding:16px"><div class="row row-sb mb16"><div class="row"><button class="btn btn-icon btn-ghost" data-bln="-1" aria-label="Bulan sebelumnya">' + ic('chevron-left') + '</button><b class="h3" style="min-width:170px;text-align:center">' + BULAN[st.b] + ' ' + st.t + '</b><button class="btn btn-icon btn-ghost" data-bln="1" aria-label="Bulan berikutnya">' + ic('chevron-right') + '</button><button class="btn btn-secondary pill btn-sm" data-bln="0">Hari Ini</button></div>' +
      '<button class="btn btn-secondary pill btn-sm" id="pSetahun">' + ic('calendar-range') + 'Lihat Setahun</button></div>' +
      '<div class="split s2"><div>' + bulanKalender(st.t, st.b, kd, { besar: 1, pilih: st.sel }) + '</div>' +
      '<div class="card" style="background:#EEF4FF;border:0;border-radius:16px"><div class="xs bold muted" style="text-transform:uppercase;letter-spacing:.05em">Detail tanggal dipilih</div><div class="h3 mt8">' + fTglP(st.sel) + '</div><span class="badge mt8 ' + (pilih.efektif ? 'b-success' : 'b-danger') + '">' + esc(pilih.jenis) + '</span>' + (pilih.ket ? '<p style="margin:10px 0 0">' + esc(pilih.ket) + '</p>' : '') +
      '<p class="small muted" style="margin:12px 0 0">' + (pilih.efektif ? 'Siswa masuk sekolah seperti biasa.' : 'Tidak ada kegiatan belajar di sekolah.') + '</p></div></div>' +
      '<div class="mt16">' + legendaKaldik() + '</div></section>' +
    '<section class="card row row-sb" style="border-radius:16px;padding:20px"><div class="row" style="flex-wrap:nowrap"><span class="stat-ic y" style="width:52px;height:52px">' + ic('file-down') + '</span><div><b class="h3">Kalender Pendidikan Resmi</b><div class="small muted">Disahkan ' + esc(kd.disahkan_oleh || 'Kepala Sekolah') + (kd.tgl_pengesahan ? ' pada ' + fTglL(kd.tgl_pengesahan) : '') + (kd.no_dokumen ? ' · No. ' + esc(kd.no_dokumen) : '') + '</div></div></div>' +
      '<button class="btn btn-cta" id="pUnduh" data-busy="Menyiapkan…">' + ic('download') + (kd.id_file ? 'Unduh Kaldik PDF Resmi' : 'Cetak Kaldik') + '</button></section>';
  $$('[data-anak]', el).forEach(b => b.onclick = () => { st.anak = b.dataset.anak; render(); });
  $$('[data-bln]', el).forEach(b => b.onclick = () => { const v = Number(b.dataset.bln); if (!v) { st.b = new Date().getMonth(); st.t = new Date().getFullYear(); st.sel = hariIni(); } else { st.b += v; if (st.b < 0) { st.b = 11; st.t--; } if (st.b > 11) { st.b = 0; st.t++; } } render(); });
  $$('[data-hari]', el).forEach(b => b.onclick = () => { st.sel = b.dataset.hari; render(); });
  $('#pSetahun', el).onclick = () => modal({ judul: 'Kalender Pendidikan ' + judul('Tahun_Ajaran', kd.id_tahun), ukuran: 'xl', isi: '<div class="kgrid">' + bulanRentang(kd).map(x => '<div class="km"><h4>' + BULAN[x[1]] + ' ' + x[0] + '<small>' + ((rk.per[x[0] + '-' + pad(x[1] + 1)] || {}).e || 0) + ' HE</small></h4>' + bulanKalender(x[0], x[1], kd) + '</div>').join('') + '</div><div class="mt16">' + legendaKaldik() + '</div>' });
  $('#pUnduh', el).onclick = e => sibuk(e.currentTarget, async () => {
    if (kd.id_file) { const d = pastikan(await apiT('apiBerkas', kd.id_file)); unduhB64(d.b64, d.nama, d.mime); }
    else cetakHtml(await dokumenKaldik(kd));
  });
} };


/* ============================== 8. KERANGKA ADMIN ========================= */
const MENU = [
  { g: 'Utama', i: [{ v: 'dashboard', l: 'Dashboard', ic: 'layout-dashboard' }] },
  { g: 'Data Induk', i: [{ t: 'Siswa' }, { t: 'Guru_Pegawai' }, { v: 'kelas', l: 'Kelas & Rombel', ic: 'school', need: 'AKG' }, { t: 'Mapel' }, { t: 'Penugasan_Guru' }, { t: 'Mutasi_Siswa' }, { t: 'Alumni' }] },
  { g: 'Akademik', i: [{ v: 'kaldik', l: 'Kaldik', ic: 'calendar-days', need: 'AKG' }, { t: 'Jadwal' }, { t: 'Kurikulum_TP' }, { t: 'Jurnal_Mengajar' }, { v: 'absensi', l: 'Absensi', ic: 'clipboard-check', need: 'AKG' }, { v: 'nilai', l: 'Input Nilai', ic: 'pencil-line', need: 'AKG' }, { v: 'rapor', l: 'Rapor', ic: 'award', need: 'AKG' }] },
  { g: 'Kesiswaan', i: [{ t: 'Ekstrakurikuler' }, { t: 'Anggota_Ekskul' }, { t: 'Prestasi' }, { t: 'Kegiatan_Sekolah' }] },
  { g: 'Keuangan', i: [{ v: 'keuangan', l: 'Buku Kas Umum', ic: 'wallet', need: 'AKB' }, { t: 'Keuangan_Anggaran' }, { t: 'Laporan_Keuangan' }] },
  { g: 'Surat & Dokumen', i: [{ t: 'Surat_Masuk' }, { t: 'Disposisi' }, { t: 'Surat_Keluar' }, { t: 'Ekspedisi' }, { t: 'Arsip_Dokumen' }, { t: 'Template_Surat', need: 'A' }, { t: 'Klasifikasi_Surat', need: 'A' }] },
  { g: 'Administrasi', i: [{ t: 'Inventaris' }, { t: 'Peminjaman_Inventaris' }, { t: 'Penghapusan_Inventaris' }, { t: 'Buku_Perpustakaan' }, { t: 'Peminjaman_Buku' }] },
  { g: 'Website', i: [{ t: 'Berita' }, { t: 'Pengumuman', need: 'AK' }, { t: 'Agenda', need: 'AK' }, { t: 'Galeri' }, { t: 'Banner' }, { t: 'Halaman_Profil' }, { t: 'Pesan_Kontak' }] },
  { g: 'Laporan', i: [{ v: 'persetujuan', l: 'Persetujuan', ic: 'stamp', need: 'AK' }, { v: 'laporan', l: 'Pusat Laporan', ic: 'file-bar-chart', need: 'AKGB' }, { t: 'Arsip_Laporan' }] },
  { g: 'Pengaturan', i: [{ v: 'pengaturan', l: 'Pengaturan', ic: 'settings', need: 'A' }, { t: 'Users', l: 'Pengguna & Peran', need: 'A' }, { t: 'Tahun_Ajaran', need: 'A' }] }
];
function itemTerlihat(it) {
  if (it.need && !punya(it.need)) return false;
  if (it.t) return S.data[it.t] !== undefined;
  return true;
}
function hitungBadge(it) {
  const me = S.user || {};
  if (it.t === 'Disposisi') return daftar('Disposisi').filter(d => d.kepada === me.id && d.status === 'Baru').length;
  if (it.t === 'Surat_Masuk' && isK()) return daftar('Surat_Masuk').filter(s => s.status === 'Baru').length;
  if (it.t === 'Pesan_Kontak') return daftar('Pesan_Kontak').filter(p => p.dibaca !== 'Sudah').length;
  if (it.v === 'persetujuan') return tugasPersetujuan().length;
  if (it.t === 'Peminjaman_Inventaris' && isA()) return daftar('Peminjaman_Inventaris').filter(p => p.status === 'Diajukan').length;
  return 0;
}
function renderMenu() {
  let h = '';
  MENU.forEach(g => {
    const items = g.i.filter(itemTerlihat); if (!items.length) return;
    h += '<div class="nav-g">' + g.g + '</div>';
    items.forEach(it => {
      const sc = it.t ? S.schema[it.t] : null;
      const lbl = it.l || (sc && sc.label) || it.t, n = hitungBadge(it);
      h += '<button class="nav-i" data-v="' + (it.v || 'tabel') + '"' + (it.t ? ' data-t="' + it.t + '"' : '') + ' title="' + esc(lbl) + '">' + ic(it.ic || (sc && sc.ikon) || 'circle') + '<span>' + esc(lbl) + '</span>' + (n ? '<em>' + n + '</em>' : '') + '</button>';
    });
  });
  $('#sideNav').innerHTML = h; tandaiMenu(); ikon();
  const notif = perluTindakan().length; $('#notifN').hidden = !notif; $('#notifN').textContent = notif;
}
function tandaiMenu() { $$('#sideNav .nav-i').forEach(b => b.classList.toggle('on', b.dataset.v === S.view && (!b.dataset.t || b.dataset.t === S.params.t))); }
function tutupSide() { if (window.innerWidth < 1024) { $('#side').classList.remove('open'); $('#sideDim').hidden = true; } }
function siapkanAdmin() {
  const u = S.user;
  $('#admLogo').src = logoUrl(); $('#admPeran').textContent = PERAN_LABEL[u.peran] + ((u.tugas || []).length ? ' · ' + u.tugas.join(', ') : '');
  $('#meNama').textContent = u.nama; $('#meRole').textContent = PERAN_LABEL[u.peran]; $('#meAv').textContent = (u.nama || '?').trim().charAt(0).toUpperCase();
  const ta = taAktif(); $('#topTA span').textContent = 'TA ' + (ta ? ta.nama : '—') + ' · ' + (S.set.semester_aktif || '');
  $('#btnTema').innerHTML = ic(document.documentElement.getAttribute('data-theme') === 'dark' ? 'sun' : 'moon');
  renderMenu(); Antrian.status();
}
function masukAplikasi() {
  if (S.user.peran === 'Siswa' || S.user.peran === 'OrangTua') { $('#porLogo').src = logoUrl(); buka('portal', {}, { tanpaRiwayat: true }); return; }
  tampilkanLayout('adm'); siapkanAdmin();
  buka('dashboard', {}, { tanpaRiwayat: true });
}
async function muatBootstrap(diam) {
  const r = await apiT('apiBootstrap');
  if (!r.success) { if (r.sesi) return false; throw new Error(r.message); }
  terapkanBootstrap(r.data); S.sinkronTerakhir = Date.now();
  if (S.layout === 'adm') siapkanAdmin();
  if (diam) renderUlang(true);
  return true;
}
async function keluar() {
  const t = S.token;
  if (Antrian.items.length && !await konfirmasi('Masih ada ' + Antrian.items.length + ' perubahan yang belum terkirim. Tetap keluar?', { ok: 'Tetap Keluar' })) return;
  if (t) api('apiLogout', t).catch(() => { });
  S.token = null; S.user = null; S.data = {}; S.stat = null; S.cache = { abs: {}, nilai: {}, rapor: {}, img: {}, absGuru: {} }; S.vs = {};
  Antrian.items = []; store.del('token'); store.del('snap'); store.del('antrian');
  document.documentElement.setAttribute('data-theme', 'light');
  buka('beranda', {}, { tanpaRiwayat: true }); toast('Anda telah keluar.', 'info');
}
function sesiHabis() {
  if (!S.token) return;
  S.token = null; store.del('token'); store.del('snap');
  toast('Sesi berakhir. Silakan masuk kembali.', 'warn');
  buka('masuk', {}, { tanpaRiwayat: true });
}
function perluTindakan() {
  if (!S.user || S.user.peran === 'Siswa' || S.user.peran === 'OrangTua') return [];
  const me = S.user, out = [], hi = hariIni();
  daftar('Disposisi').filter(d => d.kepada === me.id && d.status !== 'Selesai').forEach(d => out.push({ ic: 'send', t: 'Disposisi: ' + d.instruksi, s: d.batas_waktu && d.batas_waktu < hi ? 'Terlambat (' + fTgl(d.batas_waktu) + ')' : (d.batas_waktu ? 'Batas ' + fTgl(d.batas_waktu) : d.status), bahaya: d.batas_waktu && d.batas_waktu < hi, go: ['tabel', { t: 'Disposisi' }] }));
  if (isK()) { const n = daftar('Surat_Masuk').filter(s => s.status === 'Baru').length; if (n) out.push({ ic: 'inbox', t: n + ' surat masuk belum didisposisi', s: 'Surat & Dokumen', go: ['tabel', { t: 'Surat_Masuk' }] }); }
  tugasPersetujuan().forEach(x => out.push({ ic: 'stamp', t: x.judul, s: x.jenis + ' · menunggu ' + (isK() ? 'persetujuan Anda' : 'verifikasi'), go: ['persetujuan', {}] }));
  if (isA()) {
    const pesan = daftar('Pesan_Kontak').filter(p => p.dibaca !== 'Sudah').length; if (pesan) out.push({ ic: 'message-square', t: pesan + ' pesan website belum dibaca', s: 'Website', go: ['tabel', { t: 'Pesan_Kontak' }] });
    const tlt = daftar('Peminjaman_Buku').filter(p => !p.tgl_kembali && p.jatuh_tempo < hi).length; if (tlt) out.push({ ic: 'book-x', t: tlt + ' peminjaman buku terlambat', s: 'Perpustakaan', bahaya: 1, go: ['tabel', { t: 'Peminjaman_Buku' }] });
  }
  if (isG() || isA()) {
    const ef = infoHari(hi, kaldikUntuk(hi));
    if (ef.efektif && keDate(hi).getDay() !== 0) {
      const kl = isA() ? [] : ((S.cx && S.cx.kelasWali) || []);
      const sudah = (S.stat && S.stat.perKelasHariIni) || {};
      kl.forEach(k => { if (!sudah[k]) out.push({ ic: 'clipboard-check', t: 'Absensi ' + judul('Kelas_Rombel', k) + ' hari ini belum diisi', s: fTglP(hi), go: ['absensi', { kelas: k }] }); });
    }
  }
  const draf = daftar('Rapor').filter(r => r.status === 'Ditolak'); if (draf.length && isG()) out.push({ ic: 'award', t: draf.length + ' rapor dikembalikan Kepala Sekolah', s: 'Perlu diperbaiki', bahaya: 1, go: ['rapor', {}] });
  return out;
}
function tugasPersetujuan() {
  const out = [];
  if (isK()) {
    const rp = {}; daftar('Rapor').filter(r => r.status === 'Diajukan').forEach(r => { (rp[r.id_kelas + '|' + r.semester] = rp[r.id_kelas + '|' + r.semester] || []).push(r); });
    Object.keys(rp).forEach(k => out.push({ jenis: 'Rapor', tabel: 'Rapor', ids: rp[k].map(r => r.id), judul: 'Rapor ' + judul('Kelas_Rombel', k.split('|')[0]) + ' · ' + k.split('|')[1] + ' (' + rp[k].length + ' siswa)', rows: rp[k] }));
    daftar('Surat_Keluar').filter(r => r.status === 'Diverifikasi').forEach(r => out.push({ jenis: 'Surat Keluar', tabel: 'Surat_Keluar', ids: [r.id], judul: r.perihal, rows: [r] }));
    daftar('Kaldik_Tahun').filter(r => r.status === 'Diajukan').forEach(r => out.push({ jenis: 'Kaldik', tabel: 'Kaldik_Tahun', ids: [r.id], judul: 'Kaldik ' + judul('Tahun_Ajaran', r.id_tahun) + ' (revisi ' + (r.revisi || 0) + ')', rows: [r] }));
    daftar('Keuangan_Anggaran').filter(r => r.status === 'Diajukan').forEach(r => out.push({ jenis: 'RKAS', tabel: 'Keuangan_Anggaran', ids: [r.id], judul: r.kode + ' · ' + r.uraian, rows: [r] }));
    daftar('Laporan_Keuangan').filter(r => r.status === 'Diajukan').forEach(r => out.push({ jenis: 'Laporan Keuangan', tabel: 'Laporan_Keuangan', ids: [r.id], judul: 'Laporan keuangan ' + r.periode + ' (' + (r.sumber_dana || 'Semua') + ')', rows: [r] }));
  }
  if (isA()) {
    daftar('Surat_Keluar').filter(r => r.status === 'Diajukan').forEach(r => out.push({ jenis: 'Verifikasi Surat', tabel: 'Surat_Keluar', ids: [r.id], judul: r.perihal, rows: [r], verif: 1 }));
    daftar('Kaldik_Kegiatan').filter(r => r.status === 'Diusulkan').forEach(r => out.push({ jenis: 'Usulan Kegiatan', tabel: 'Kaldik_Kegiatan', ids: [r.id], judul: r.judul + ' (' + fTgl(r.tgl_mulai) + ')', rows: [r], usulan: 1 }));
  }
  return out;
}
function bukaNotif() {
  const l = perluTindakan();
  const m = modal({ judul: 'Perlu Tindakan (' + l.length + ')', isi: l.length ? '<div class="list">' + l.map((x, i) => '<button class="li" data-i="' + i + '" style="border:0;border-bottom:1px solid var(--line);background:none;text-align:left;cursor:pointer;width:100%"><span class="li-ic" style="' + (x.bahaya ? 'background:var(--rose);color:var(--danger)' : '') + '">' + ic(x.ic) + '</span><span class="li-b"><span class="li-t" style="display:block">' + esc(x.t) + '</span><span class="li-s">' + esc(x.s || '') + '</span></span>' + ic('chevron-right') + '</button>').join('') + '</div>' : kosong('party-popper', 'Tidak ada tugas yang menunggu. Mantap!') });
  $$('[data-i]', m.el).forEach(b => b.onclick = () => { const x = l[Number(b.dataset.i)]; m.tutup(); buka(x.go[0], x.go[1]); });
}
function bukaProfil() {
  const u = S.user;
  const m = modal({ judul: 'Profil Saya', ukuran: 'sm', isi: '<div class="center"><span class="avatar" style="width:64px;height:64px;font-size:24px;margin:0 auto">' + esc(u.nama.charAt(0)) + '</span><h3 style="margin:10px 0 0">' + esc(u.nama) + '</h3><div class="muted small">' + esc(PERAN_LABEL[u.peran]) + ((u.tugas || []).length ? ' · ' + esc(u.tugas.join(', ')) : '') + '</div></div><dl class="kv mt16"><dt>Username</dt><dd>' + esc(u.username) + '</dd><dt>Email</dt><dd>' + esc(u.email || '-') + '</dd>' + (u.id_guru ? '<dt>Data guru</dt><dd>' + esc(judul('Guru_Pegawai', u.id_guru)) + '</dd>' : '') + '</dl>',
    kaki: '<button class="btn btn-secondary" id="pfSandi">' + ic('key-round') + 'Ganti Sandi</button><button class="btn btn-danger-o" id="pfOut">' + ic('log-out') + 'Keluar</button>' });
  $('#pfSandi', m.el).onclick = () => { m.tutup(); gantiSandi(false); };
  $('#pfOut', m.el).onclick = () => { m.tutup(); keluar(); };
}

/* ============================== 9. DASHBOARD ============================== */
async function grafik(canvas, cfg) {
  if (!canvas) return;
  try { await muat(CDN.chart); } catch (e) {
    if (canvas.parentNode) canvas.parentNode.innerHTML = '<div class="empty" style="height:100%">' + ic('wifi-off') + '<span class="small muted">Grafik tidak dapat dimuat (koneksi internet). Data tetap aman.</span></div>';
    ikon(); return;
  }
  if (!document.body.contains(canvas)) return;
  const gelap = document.documentElement.getAttribute('data-theme') === 'dark';
  Chart.defaults.font.family = '"Plus Jakarta Sans",system-ui,sans-serif'; Chart.defaults.color = gelap ? '#A9B6C8' : '#51627A';
  Chart.defaults.borderColor = gelap ? '#2A3B55' : '#E6ECF4';
  cfg.options = Object.assign({ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } } } }, cfg.options || {});
  S.charts.push(new Chart(canvas, cfg));
}
const WARNA = { biru: '#1E63D6', hijau: '#0F7A44', oranye: '#C2560F', navy: '#0B2E5C', kuning: '#F5B82E', merah: '#C62828', abu: '#94A3B8' };
function persenHadir(h) { const t = (h.H || 0) + (h.S || 0) + (h.I || 0) + (h.A || 0); return t ? Math.round((h.H || 0) / t * 1000) / 10 : null; }
function kartuStat(ik, label, nilai, ket, kls) { return '<div class="card stat"><span class="stat-ic ' + (kls || '') + '">' + ic(ik) + '</span><div><div class="stat-l">' + label + '</div><div class="stat-v">' + nilai + '</div>' + (ket ? '<div class="stat-d">' + ket + '</div>' : '') + '</div></div>'; }
function kartuHariIni() {
  const hi = hariIni(), kd = kaldikUntuk(hi); if (kd) petaHari(kd.id_tahun);
  const inf = infoHari(hi, kd);
  const next = daftar('Kaldik_Hari').filter(h => h.tanggal > hi && (!kd || h.id_tahun === kd.id_tahun)).sort((a, b) => a.tanggal < b.tanggal ? -1 : 1);
  const unik = []; next.forEach(h => { if (unik.length < 3 && !unik.some(u => u.jenis === h.jenis && u.keterangan === h.keterangan)) unik.push(h); });
  return '<div class="card today mb16"><div class="row" style="flex-wrap:nowrap"><span class="today-ic">' + ic('calendar-heart') + '</span><div><h2>Hari ini: ' + fTglP(hi) + ' <span class="badge ' + (inf.efektif ? 'b-success' : 'b-danger') + '">' + esc(inf.jenis) + '</span></h2><div class="small muted">' + (inf.ket ? esc(inf.ket) + ' · ' : '') + 'TA ' + esc((taAktif() || {}).nama || '—') + ' · Semester ' + esc(S.set.semester_aktif || '') + '</div></div></div>' +
    '<div class="row">' + unik.map(h => '<span class="lg k-' + (KODE_HARI[h.jenis] || 'K') + '">' + esc(h.keterangan || h.jenis) + ' · ' + fTgl(h.tanggal) + '</span>').join('') + '</div></div>';
}
function wawasan() {
  const out = [], st = S.stat || {}, hi = hariIni();
  const bulan = {}; Object.keys(st.harian || {}).forEach(t => { const k = t.slice(0, 7); const b = bulan[k] = bulan[k] || { H: 0, S: 0, I: 0, A: 0 }; ['H', 'S', 'I', 'A'].forEach(x => b[x] += st.harian[t][x] || 0); });
  const ks = Object.keys(bulan).sort();
  if (ks.length >= 2) { const a = persenHadir(bulan[ks[ks.length - 2]]), b = persenHadir(bulan[ks[ks.length - 1]]); if (a !== null && b !== null) out.push('Kehadiran siswa bulan ini <b>' + b + '%</b>, ' + (b >= a ? 'naik' : 'turun') + ' ' + Math.abs(Math.round((b - a) * 10) / 10) + ' poin dibanding bulan lalu.'); }
  const sering = Object.keys(st.perSiswa || {}).filter(id => (st.perSiswa[id].A || 0) >= 3);
  if (sering.length) out.push('<b>' + sering.length + ' siswa</b> tercatat alpa 3 kali atau lebih dalam 200 hari terakhir. Pertimbangkan komunikasi dengan orang tua.');
  const nm = st.nilaiMapel || {}; const mp = Object.keys(nm).map(k => ({ k: k, v: nm[k].j / nm[k].n })).sort((a, b) => a.v - b.v);
  if (mp.length) out.push('Rata-rata nilai terendah semester ini: <b>' + esc(judul('Mapel', mp[0].k)) + '</b> (' + mp[0].v.toFixed(1) + '); tertinggi: <b>' + esc(judul('Mapel', mp[mp.length - 1].k)) + '</b> (' + mp[mp.length - 1].v.toFixed(1) + ').');
  if (daftar('Keuangan_Anggaran').length) {
    const pagu = daftar('Keuangan_Anggaran').filter(a => a.status === 'Disetujui').reduce((s, a) => s + angka(a.pagu), 0);
    const real = daftar('Keuangan_Transaksi').filter(t => t.jenis === 'Keluar' && String(t.tanggal).slice(0, 4) === hi.slice(0, 4)).reduce((s, t) => s + angka(t.jumlah), 0);
    if (pagu) { const p = Math.round(real / pagu * 100), target = Math.round((new Date().getMonth() + 1) / 12 * 100); out.push('Realisasi anggaran ' + hi.slice(0, 4) + ' mencapai <b>' + p + '%</b> dari pagu disetujui (target linier bulan ini ±' + target + '%).' + (p < target - 15 ? ' Serapan tergolong lambat.' : '')); }
  }
  const tl = daftar('Disposisi').filter(d => d.status !== 'Selesai' && d.batas_waktu && d.batas_waktu < hi).length;
  if (tl) out.push('<b>' + tl + ' disposisi</b> melewati batas waktu dan belum selesai ditindaklanjuti.');
  const rusak = daftar('Inventaris').filter(i => i.kondisi === 'Rusak Berat').length;
  if (rusak) out.push('<b>' + rusak + ' jenis barang</b> inventaris berstatus rusak berat — dapat diusulkan penghapusan.');
  return out;
}
VIEW.dashboard = { layout: 'adm', judul: 'Dashboard', crumb: 'Utama', render(el) {
  if (isG() && !isA() && !isK()) return dashboardGuru(el);
  const st = S.stat || {}, siswa = daftar('Siswa').filter(s => s.status === 'Aktif'), hi = hariIni();
  const hk = Object.values(st.perKelasHariIni || {}).reduce((a, x) => { ['H', 'S', 'I', 'A'].forEach(k => a[k] += x[k] || 0); return a; }, { H: 0, S: 0, I: 0, A: 0 });
  const ph = persenHadir(hk);
  const trx = daftar('Keuangan_Transaksi'), saldo = trx.reduce((s, t) => s + (t.jenis === 'Masuk' ? 1 : -1) * angka(t.jumlah), 0);
  const mBulanIni = trx.filter(t => t.jenis === 'Masuk' && String(t.tanggal).slice(0, 7) === hi.slice(0, 7)).reduce((s, t) => s + angka(t.jumlah), 0);
  const tindakan = perluTindakan(), ins = wawasan();
  const agenda = daftar('Agenda').filter(a => a.tanggal >= hi).sort((a, b) => a.tanggal < b.tanggal ? -1 : 1).slice(0, 4);
  const prestasi = daftar('Prestasi').slice().sort((a, b) => a.tanggal < b.tanggal ? 1 : -1).slice(0, 4);
  el.innerHTML = '<div class="ph"><div><h1>Dasbor Eksekutif & Manajemen Sekolah</h1><p>Ringkasan data terkini ' + esc(S.set.nama_sekolah || '') + '. Sinkron terakhir ' + (S.sinkronTerakhir ? new Date(S.sinkronTerakhir).toTimeString().slice(0, 5) : '—') + '.</p></div>' +
    '<div class="row"><button class="btn btn-secondary" id="dRefresh" data-busy="Memuat…">' + ic('refresh-cw') + 'Muat Ulang</button>' + (isA() ? '<button class="btn btn-primary" data-v="tabel" data-t="Kegiatan_Sekolah">' + ic('plus') + 'Catat Kegiatan</button>' : '') + '</div></div>' +
    kartuHariIni() +
    '<div class="g4 mb16">' +
      kartuStat('users', 'Siswa Aktif', fNum(siswa.length), 'L ' + siswa.filter(s => s.jk === 'L').length + ' · P ' + siswa.filter(s => s.jk === 'P').length + ' · ' + daftar('Kelas_Rombel').length + ' rombel') +
      kartuStat('graduation-cap', 'Guru & Pegawai', fNum(daftar('Guru_Pegawai').filter(g => g.status !== 'Nonaktif').length), daftar('Guru_Pegawai').filter(g => g.status !== 'Nonaktif' && /Guru/.test(g.jabatan)).length + ' guru', 'g') +
      kartuStat('clipboard-check', 'Kehadiran Hari Ini', ph === null ? '—' : ph + '%', hk.H + ' hadir · ' + hk.S + ' S · ' + hk.I + ' I · ' + hk.A + ' A', 'y') +
      (S.data.Keuangan_Transaksi ? kartuStat('wallet', 'Saldo Kas', fRp(saldo), 'Masuk bulan ini ' + fRp(mBulanIni), 'o') : kartuStat('stamp', 'Perlu Tindakan', tindakan.length, 'tugas menunggu', 'o')) +
    '</div>' +
    (ins.length ? '<div class="card insight mb16"><div class="card-h"><h3>' + ic('sparkles') + ' Ringkasan Otomatis</h3><span class="badge b-info">Analisis data</span></div><ul>' + ins.map(x => '<li>' + x + '</li>').join('') + '</ul></div>' : '') +
    '<div class="g2 mb16"><div class="card"><div class="card-h"><h3>Distribusi Siswa per Rombel</h3><span class="badge b-neutral">' + siswa.length + ' siswa</span></div><div class="chart-box"><canvas id="cKelas" aria-label="Grafik jumlah siswa per rombel" role="img"></canvas></div></div>' +
      '<div class="card"><div class="card-h"><h3>Tren Kehadiran per Bulan (%)</h3></div><div class="chart-box"><canvas id="cHadir" role="img" aria-label="Grafik tren kehadiran"></canvas></div></div></div>' +
    '<div class="g2 mb16"><div class="card"><div class="card-h"><h3>Rata-rata Nilai per Mapel</h3><span class="badge b-neutral">Semester ' + esc(S.set.semester_aktif || '') + '</span></div><div class="chart-box"><canvas id="cNilai" role="img" aria-label="Grafik rata-rata nilai"></canvas></div></div>' +
      (S.data.Keuangan_Transaksi ? '<div class="card"><div class="card-h"><h3>Arus Kas Masuk vs Keluar ' + hi.slice(0, 4) + '</h3></div><div class="chart-box"><canvas id="cKas" role="img" aria-label="Grafik arus kas"></canvas></div></div>' : '<div class="card"><div class="card-h"><h3>Surat Masuk & Keluar per Bulan</h3></div><div class="chart-box"><canvas id="cSurat" role="img" aria-label="Grafik surat"></canvas></div></div>') + '</div>' +
    '<div class="g2 mb16">' + (S.data.Keuangan_Anggaran ? '<div class="card"><div class="card-h"><h3>Realisasi Anggaran (RKAS)</h3><button class="btn btn-ghost btn-sm" data-v="keuangan">Detail BKU</button></div>' + realisasiHtml(5) + '</div>' : '<div class="card"><div class="card-h"><h3>Statistik Prestasi per Tingkat</h3></div><div class="chart-box"><canvas id="cPres" role="img" aria-label="Grafik prestasi"></canvas></div></div>') +
      '<div class="card"><div class="card-h"><h3>Kondisi Sarana & Prasarana</h3><span class="badge b-neutral">' + daftar('Inventaris').length + ' jenis</span></div><div class="chart-box" style="height:220px"><canvas id="cInv" role="img" aria-label="Grafik kondisi inventaris"></canvas></div></div></div>' +
    '<div class="g3"><div class="card"><div class="card-h"><h3>' + ic('bell-ring') + ' Perlu Tindakan</h3><span class="badge ' + (tindakan.length ? 'b-danger' : 'b-success') + '">' + tindakan.length + '</span></div>' + daftarTindakan(tindakan.slice(0, 6)) + '</div>' +
      '<div class="card"><div class="card-h"><h3>' + ic('calendar') + ' Agenda Terdekat</h3><button class="btn btn-ghost btn-sm" data-v="kaldik">Kaldik</button></div>' + (agenda.length ? '<div class="list">' + agenda.map(a => '<div class="li"><span class="li-ic">' + ic('calendar-days') + '</span><div class="li-b"><div class="li-t">' + esc(a.judul) + '</div><div class="li-s">' + fTglP(a.tanggal) + (a.tempat ? ' · ' + esc(a.tempat) : '') + '</div></div></div>').join('') + '</div>' : kosong('calendar', 'Belum ada agenda.')) + '</div>' +
      '<div class="card"><div class="card-h"><h3>' + ic('trophy') + ' Prestasi Terbaru</h3><button class="btn btn-ghost btn-sm" data-v="tabel" data-t="Prestasi">Semua</button></div>' + (prestasi.length ? '<div class="list">' + prestasi.map(p => '<div class="li"><span class="li-ic" style="background:#fff3d1;color:#7a5600">' + ic('medal') + '</span><div class="li-b"><div class="li-t">' + esc(p.lomba) + '</div><div class="li-s">' + esc(p.nama_pemilik) + ' · ' + esc(p.juara || '') + ' · ' + esc(p.tingkat || '') + '</div></div></div>').join('') + '</div>' : kosong('trophy', 'Belum ada prestasi.')) + '</div></div>';
  $('#dRefresh', el).onclick = e => sibuk(e.currentTarget, async () => { await muatBootstrap(); renderUlang(); toast('Data diperbarui.', 'ok'); });
  pasangDaftarTindakan(el, tindakan);
  // grafik
  const kls = kelasUrut();
  grafik($('#cKelas', el), { type: 'bar', data: { labels: kls.map(k => k.nama), datasets: [{ label: 'Laki-laki', data: kls.map(k => siswa.filter(s => s.id_kelas === k.id && s.jk === 'L').length), backgroundColor: WARNA.biru, borderRadius: 6 }, { label: 'Perempuan', data: kls.map(k => siswa.filter(s => s.id_kelas === k.id && s.jk === 'P').length), backgroundColor: WARNA.hijau, borderRadius: 6 }] }, options: { scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true, ticks: { precision: 0 } } } } });
  const bln = {}, blnG = {};
  Object.keys(st.harian || {}).forEach(t => { const k = t.slice(0, 7), b = bln[k] = bln[k] || { H: 0, S: 0, I: 0, A: 0 }; ['H', 'S', 'I', 'A'].forEach(x => b[x] += st.harian[t][x] || 0); });
  Object.keys(st.guruHarian || {}).forEach(t => { const k = t.slice(0, 7), b = blnG[k] = blnG[k] || { H: 0, S: 0, I: 0, A: 0 }; b.H += st.guruHarian[t].H || 0; b.S += (st.guruHarian[t].S || 0) + (st.guruHarian[t].DL || 0); b.I += st.guruHarian[t].I || 0; b.A += st.guruHarian[t].A || 0; });
  const kb = Object.keys(bln).concat(Object.keys(blnG)).filter((v, i, a) => a.indexOf(v) === i).sort().slice(-6);
  grafik($('#cHadir', el), { type: 'line', data: { labels: kb.map(k => BLN[Number(k.slice(5)) - 1]), datasets: [{ label: 'Siswa', data: kb.map(k => bln[k] ? persenHadir(bln[k]) : null), borderColor: WARNA.biru, backgroundColor: 'rgba(30,99,214,.1)', fill: true, tension: .35 }, { label: 'Guru', data: kb.map(k => blnG[k] ? persenHadir(blnG[k]) : null), borderColor: WARNA.hijau, tension: .35 }] }, options: { scales: { y: { suggestedMin: 80, max: 100 } } } });
  const nm = st.nilaiMapel || {}, mp = daftar('Mapel').filter(m => nm[m.id]).sort((a, b) => angka(a.urutan) - angka(b.urutan));
  grafik($('#cNilai', el), { type: 'bar', data: { labels: mp.map(m => m.kode), datasets: [{ label: 'Rata-rata', data: mp.map(m => Math.round(nm[m.id].j / nm[m.id].n * 10) / 10), backgroundColor: mp.map(m => (nm[m.id].j / nm[m.id].n) < angka(m.kktp || 70) ? WARNA.oranye : WARNA.biru), borderRadius: 6 }] }, options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { min: 0, max: 100 } } } });
  if ($('#cKas', el)) { const m = Array(12).fill(0), k = Array(12).fill(0); trx.filter(t => String(t.tanggal).slice(0, 4) === hi.slice(0, 4)).forEach(t => { const i = Number(t.tanggal.slice(5, 7)) - 1; if (t.jenis === 'Masuk') m[i] += angka(t.jumlah); else k[i] += angka(t.jumlah); });
    grafik($('#cKas', el), { type: 'bar', data: { labels: BLN, datasets: [{ label: 'Penerimaan', data: m, backgroundColor: WARNA.hijau, borderRadius: 6 }, { label: 'Pengeluaran', data: k, backgroundColor: WARNA.oranye, borderRadius: 6 }] }, options: { scales: { y: { ticks: { callback: v => (v / 1e6) + ' jt' } } }, plugins: { tooltip: { callbacks: { label: c => c.dataset.label + ': ' + fRp(c.raw) } } } } }); }
  if ($('#cSurat', el)) { const m = Array(12).fill(0), k = Array(12).fill(0); daftar('Surat_Masuk').forEach(s => { if (String(s.tgl_terima).slice(0, 4) === hi.slice(0, 4)) m[Number(s.tgl_terima.slice(5, 7)) - 1]++; }); daftar('Surat_Keluar').forEach(s => { if (String(s.tanggal).slice(0, 4) === hi.slice(0, 4)) k[Number(s.tanggal.slice(5, 7)) - 1]++; });
    grafik($('#cSurat', el), { type: 'bar', data: { labels: BLN, datasets: [{ label: 'Surat Masuk', data: m, backgroundColor: WARNA.biru, borderRadius: 6 }, { label: 'Surat Keluar', data: k, backgroundColor: WARNA.navy, borderRadius: 6 }] }, options: { scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } } }); }
  if ($('#cPres', el)) { const tk = ['Sekolah', 'Kecamatan', 'Kota', 'Provinsi', 'Nasional']; grafik($('#cPres', el), { type: 'bar', data: { labels: tk, datasets: [{ label: 'Prestasi', data: tk.map(t => daftar('Prestasi').filter(p => p.tingkat === t).length), backgroundColor: WARNA.kuning, borderRadius: 6 }] }, options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } } }); }
  const inv = ['Baik', 'Rusak Ringan', 'Rusak Berat'].map(k => daftar('Inventaris').filter(i => i.kondisi === k).reduce((s, i) => s + angka(i.jumlah || 1), 0));
  grafik($('#cInv', el), { type: 'doughnut', data: { labels: ['Baik', 'Rusak Ringan', 'Rusak Berat'], datasets: [{ data: inv, backgroundColor: [WARNA.hijau, WARNA.kuning, WARNA.merah], borderWidth: 0 }] }, options: { cutout: '62%', plugins: { legend: { position: 'right' } } } });
} };
function daftarTindakan(l) { return l.length ? '<div class="list">' + l.map((x, i) => '<button class="li" data-tdk="' + i + '" style="border:0;border-bottom:1px solid var(--line);background:none;text-align:left;cursor:pointer;width:100%"><span class="li-ic" style="' + (x.bahaya ? 'background:var(--rose);color:var(--danger)' : '') + '">' + ic(x.ic) + '</span><span class="li-b"><span class="li-t" style="display:block">' + esc(x.t) + '</span><span class="li-s">' + esc(x.s || '') + '</span></span></button>').join('') + '</div>' : kosong('party-popper', 'Tidak ada tugas yang menunggu.'); }
function pasangDaftarTindakan(el, l) { $$('[data-tdk]', el).forEach(b => b.onclick = () => { const x = l[Number(b.dataset.tdk)]; buka(x.go[0], x.go[1]); }); }
function realisasiHtml(batas) {
  const tahun = hariIni().slice(0, 4);
  const ang = daftar('Keuangan_Anggaran').filter(a => String(a.tahun) === tahun || !batas);
  if (!ang.length) return kosong('piggy-bank', 'Belum ada RKAS tahun ' + tahun + '.');
  const keluar = {}; daftar('Keuangan_Transaksi').forEach(t => { if (t.jenis === 'Keluar' && t.id_anggaran) keluar[t.id_anggaran] = (keluar[t.id_anggaran] || 0) + angka(t.jumlah); });
  return '<div class="list">' + ang.slice(0, batas || 999).map(a => { const r = keluar[a.id] || 0, p = angka(a.pagu) ? Math.round(r / angka(a.pagu) * 100) : 0;
    return '<div class="li" style="display:block"><div class="row row-sb"><b class="small">' + esc(a.kode + ' · ' + a.uraian) + '</b><span class="small bold num">' + p + '%</span></div><div class="prog mt8 ' + (p > 100 ? 'over' : '') + '"><span style="width:' + Math.min(100, p) + '%"></span></div><div class="row row-sb xs muted mt8"><span>Realisasi ' + fRp(r) + '</span><span>Pagu ' + fRp(a.pagu) + '</span></div></div>'; }).join('') + '</div>';
}
function dashboardGuru(el) {
  const hi = hariIni(), cx = S.cx || {}, st = S.stat || {}, hariN = HARI[keDate(hi).getDay()];
  const kls = kelasSaya(), tindakan = perluTindakan();
  const jadwal = daftar('Jadwal').filter(j => j.hari === hariN && (j.id_guru === S.user.id_guru || (cx.kelasWali || []).indexOf(j.id_kelas) > -1)).sort((a, b) => a.mulai < b.mulai ? -1 : 1);
  el.innerHTML = '<div class="ph"><div><h1>Halo, ' + esc(S.user.nama.split(' ')[0]) + '!</h1><p>' + esc(PERAN_LABEL[S.user.peran]) + ((cx.kelasWali || []).length ? ' · Wali kelas ' + cx.kelasWali.map(k => judul('Kelas_Rombel', k)).join(', ') : '') + '</p></div>' +
    '<div class="row"><button class="btn btn-primary" data-v="absensi">' + ic('clipboard-check') + 'Isi Absensi Hari Ini</button><button class="btn btn-secondary" data-v="nilai">' + ic('pencil-line') + 'Input Nilai</button><button class="btn btn-secondary" id="gHadir" data-busy="Mencatat…">' + ic('fingerprint') + 'Catat Kehadiran Saya</button></div></div>' + kartuHariIni() +
    '<div class="g4 mb16">' + kls.slice(0, 4).map(k => { const n = siswaAktif(k.id).length, h = (st.perKelasHariIni || {})[k.id];
      return '<button class="card stat" style="text-align:left;cursor:pointer" data-v="absensi" data-kelas="' + k.id + '"><span class="stat-ic">' + ic('school') + '</span><div><div class="stat-l">Kelas ' + esc(k.nama) + '</div><div class="stat-v">' + n + ' <span class="small muted">siswa</span></div><div class="stat-d">' + (h ? 'Hadir hari ini: <b class="txt-green">' + (h.H || 0) + '</b> · S ' + (h.S || 0) + ' · I ' + (h.I || 0) + ' · A ' + (h.A || 0) : '<span class="txt-danger">Absensi hari ini belum diisi</span>') + '</div></div></button>'; }).join('') + '</div>' +
    '<div class="g3"><div class="card"><div class="card-h"><h3>' + ic('clock') + ' Jadwal ' + hariN + '</h3></div>' + (jadwal.length ? '<div class="list">' + jadwal.map(j => '<div class="li"><span class="li-ic">' + ic('book-open') + '</span><div class="li-b"><div class="li-t">' + esc(judul('Mapel', j.id_mapel)) + ' · ' + esc(judul('Kelas_Rombel', j.id_kelas)) + '</div><div class="li-s">' + esc(j.mulai + '–' + j.selesai) + '</div></div></div>').join('') + '</div>' : kosong('coffee', 'Tidak ada jadwal mengajar hari ini.')) + '</div>' +
    '<div class="card"><div class="card-h"><h3>' + ic('bell-ring') + ' Perlu Tindakan</h3><span class="badge ' + (tindakan.length ? 'b-danger' : 'b-success') + '">' + tindakan.length + '</span></div>' + daftarTindakan(tindakan.slice(0, 6)) + '</div>' +
    '<div class="card"><div class="card-h"><h3>' + ic('megaphone') + ' Pengumuman</h3></div>' + (daftar('Pengumuman').filter(p => p.status === 'Terbit').length ? '<div class="list">' + daftar('Pengumuman').filter(p => p.status === 'Terbit').slice(0, 4).map(p => '<div class="li"><span class="li-ic">' + ic('file-text') + '</span><div class="li-b"><div class="li-t">' + esc(p.judul) + '</div><div class="li-s">' + fTgl(p.tgl_mulai) + '</div></div></div>').join('') + '</div>' : kosong('megaphone', 'Belum ada pengumuman.')) + '</div></div>';
  pasangDaftarTindakan(el, tindakan);
  $('#gHadir', el).onclick = e => sibuk(e.currentTarget, async () => { const r = await apiT('apiAbsensiGuru', 'masuk'); if (!r.success && /sudah tercatat/.test(r.message)) { const r2 = await apiT('apiAbsensiGuru', 'pulang'); toast(r2.message, r2.success ? 'ok' : 'err'); } else toast(r.message, r.success ? 'ok' : 'err'); });
}

/* ============================== 10. TABEL & FORM GENERIK ================== */
const STATUS_KOLOM = ['status', 'kondisi', 'sifat', 'dibaca', 'aktif', 'tampil_web', 'peran', 'jenis'];
const WARNA_BADGE = { Aktif: 'success', Hadir: 'success', Disetujui: 'success', Disahkan: 'success', Terbit: 'success', Baik: 'success', Selesai: 'success', Ditindaklanjuti: 'success', Dikembalikan: 'orange', Masuk: 'success', Ya: 'success', Sudah: 'neutral',
  Diajukan: 'info', Diverifikasi: 'info', Baru: 'info', Dipinjam: 'info', Diusulkan: 'info', Siap: 'info', Didisposisi: 'info', Rencana: 'info', Berlangsung: 'info', Admin: 'navy', KepalaSekolah: 'navy',
  'Rusak Ringan': 'warning', Penting: 'orange', Mutasi: 'warning', Keluar: 'orange', Belum: 'orange',
  Ditolak: 'danger', 'Rusak Berat': 'danger', Rahasia: 'danger', Terlambat: 'danger',
  Nonaktif: 'neutral', Draf: 'neutral', Dibaca: 'neutral', Biasa: 'neutral', Tidak: 'neutral', Lulus: 'navy' };
const badge = v => v ? '<span class="badge b-' + (WARNA_BADGE[v] || 'neutral') + '">' + esc(PERAN_LABEL[v] || v) + '</span>' : '';
function sel(f, row, cetak) {
  const v = row[f.k];
  if (v === undefined || v === null || v === '') return cetak ? '' : '<span class="muted">—</span>';
  if (f.t === 'ref') return cetak ? judul(f.ref, v) : esc(judul(f.ref, v));
  if (f.t === 'multi') { const l = String(v).split(',').map(x => x.trim()).filter(Boolean).map(x => f.ref ? judul(f.ref, x) : (PERAN_LABEL[x] || x)); return cetak ? l.join(', ') : l.map(x => '<span class="badge b-neutral">' + esc(x) + '</span>').join(' '); }
  if (f.t === 'money') return cetak ? fNum(v) : fRp(v);
  if (f.t === 'date') return fTgl(v);
  if (f.t === 'number') return cetak ? String(v) : fNum(v);
  if (cetak) return String(v);
  if (f.t === 'select' && STATUS_KOLOM.indexOf(f.k) > -1) return badge(v);
  if (f.t === 'image') return '<img class="th" ' + (f.publik ? 'src="' + thumb(v, 120) + '"' : 'data-fid="' + esc(v) + '" src="data:image/gif;base64,R0lGODlhAQABAAAAACw="') + ' alt="" loading="lazy">';
  if (f.t === 'file') return '<button class="btn btn-ghost btn-sm" data-pv="' + esc(v) + '">' + ic('paperclip', 'sm') + 'Lihat</button>';
  if (f.t === 'textarea') { const s = String(v); return esc(s.length > 70 ? s.slice(0, 70) + '…' : s); }
  return esc(v);
}
function bisaTambah(t) {
  const sc = S.schema[t]; if (!sc || !punya(sc.acl.w)) return false;
  if (isK()) return false;
  if (['Disposisi', 'Rapor', 'Kaldik_Hari', 'Kaldik_Riwayat', 'Arsip_Laporan', 'Nomor_Dokumen', 'Verifikasi_Dokumen', 'Pesan_Kontak', 'Log_Aktivitas'].indexOf(t) > -1) return false;
  if (isG() && !isA()) { if (['Kurikulum_TP', 'Jurnal_Mengajar', 'Prestasi', 'Kaldik_Kegiatan', 'Surat_Keluar', 'Peminjaman_Inventaris', 'Anggota_Ekskul'].indexOf(t) < 0 && !(isB() && /^(Keuangan|Laporan_Keuangan)/.test(t))) return false; }
  return true;
}
function bisaUbah(t, r) {
  if (!r || r._p) return false;
  const sc = S.schema[t]; if (!sc || !punya(sc.acl.w) || isK()) return false;
  if (['Disposisi', 'Rapor', 'Arsip_Laporan', 'Pesan_Kontak'].indexOf(t) > -1) return false;
  const kunci = ['Diajukan', 'Diverifikasi', 'Disetujui'];
  if (['Surat_Keluar', 'Keuangan_Anggaran', 'Laporan_Keuangan'].indexOf(t) > -1 && kunci.indexOf(r.status) > -1) return false;
  if (t === 'Kaldik_Tahun' && r.status === 'Diajukan') return false;
  if (isA()) return true;
  const u = S.user;
  if (t === 'Jurnal_Mengajar') return r.id_guru === u.id_guru;
  if (t === 'Surat_Keluar') return r.pengaju === u.username;
  if (t === 'Kaldik_Kegiatan') return r.diusulkan_oleh === u.nama && r.status === 'Diusulkan';
  if (t === 'Anggota_Ekskul') { const e = rek('Ekstrakurikuler', r.id_ekskul); return !!e && e.id_pembina === u.id_guru; }
  if (/^(Keuangan_|Laporan_Keuangan)/.test(t)) return isB();
  if (t === 'Kurikulum_TP' || t === 'Prestasi') return true;
  return false;
}
const bisaHapus = (t, r) => bisaUbah(t, r) && !(t === 'Surat_Keluar' && r.status === 'Disetujui');
/** Aksi khusus per tabel. */
function aksiBaris(t, r) {
  const a = [], u = S.user, hi = hariIni();
  if (r._p) return a;
  if (t === 'Surat_Masuk') { if (isK() || isA()) a.push({ l: 'Disposisi', ic: 'send', fn: () => formDisposisi(r) }); a.push({ l: 'Lembar Disposisi', ic: 'printer', fn: () => cetakLembarDisposisi(r) }); if (isA() && r.status !== 'Selesai') a.push({ l: 'Selesai', ic: 'check', fn: () => simpanRek(t, { id: r.id, status: 'Selesai' }, { pesan: 'Surat ditandai selesai.' }) }); }
  if (t === 'Disposisi' && r.kepada === u.id && r.status !== 'Selesai') { if (r.status === 'Baru') a.push({ l: 'Tandai Dibaca', ic: 'eye', fn: () => simpanRek(t, { id: r.id, status: 'Dibaca' }, { pesan: 'Ditandai dibaca.' }) }); a.push({ l: 'Tindak Lanjut', ic: 'message-square-reply', fn: () => formTindakLanjut(r), utama: 1 }); }
  if (t === 'Surat_Keluar') {
    if ((r.pengaju === u.username || isA()) && ['Draf', 'Dikembalikan', 'Ditolak'].indexOf(r.status) > -1) a.push({ l: 'Ajukan', ic: 'send', fn: () => ajukan('Surat_Keluar', [r.id]), utama: 1 });
    if (isA() && r.status === 'Diajukan') a.push({ l: 'Verifikasi', ic: 'shield-check', fn: () => verifikasiSurat(r), utama: 1 });
    if (r.status === 'Disetujui') { a.push({ l: 'PDF', ic: 'file-down', fn: b => unduhSurat(r, b) }); if (isA()) a.push({ l: 'Ekspedisi', ic: 'truck', fn: () => bukaForm('Ekspedisi', null, { id_surat: r.id, tgl_kirim: hi }) }); }
    a.push({ l: 'Pratinjau', ic: 'eye', fn: () => pratinjauSurat(r) });
  }
  if ((t === 'Keuangan_Anggaran' || t === 'Laporan_Keuangan') && isB() && ['Draf', 'Ditolak'].indexOf(r.status || 'Draf') > -1) a.push({ l: 'Ajukan', ic: 'send', fn: () => ajukan(t, [r.id]), utama: 1 });
  if (t === 'Peminjaman_Buku' && isA() && !r.tgl_kembali) a.push({ l: 'Kembalikan', ic: 'undo-2', fn: () => aksiCepat('kembalikan', { tabel: t, id: r.id }, t) });
  if (t === 'Peminjaman_Inventaris' && isA()) { if (r.status === 'Diajukan') a.push({ l: 'Setujui', ic: 'check', fn: () => aksiCepat('kembalikan', { tabel: t, id: r.id, status: 'Dipinjam' }, t) }); if (r.status === 'Dipinjam') a.push({ l: 'Kembalikan', ic: 'undo-2', fn: () => aksiCepat('kembalikan', { tabel: t, id: r.id, status: 'Dikembalikan' }, t) }); }
  if (t === 'Pesan_Kontak' && r.dibaca !== 'Sudah') a.push({ l: 'Tandai Dibaca', ic: 'check-check', fn: () => aksiCepat('pesanDibaca', { id: r.id }, t) });
  if (t === 'Users' && isA()) a.push({ l: 'Reset Sandi', ic: 'key-round', fn: b => resetSandi(r, b) });
  if (t === 'Kaldik_Kegiatan' && isA() && r.status === 'Diusulkan') { a.push({ l: 'Setujui', ic: 'check', fn: b => putusUsulan(r, true, b), utama: 1 }); a.push({ l: 'Tolak', ic: 'x', fn: b => putusUsulan(r, false, b) }); }
  return a;
}
function kolomEkstra(t) {
  const hi = hariIni();
  if (t === 'Peminjaman_Buku') return [{ l: 'Status', v: r => r.tgl_kembali ? badge('Selesai') : (r.jatuh_tempo < hi ? '<span class="badge b-danger">Terlambat ' + Math.round((keDate(hi) - keDate(r.jatuh_tempo)) / 864e5) + ' hari</span>' : badge('Dipinjam')), c: r => r.tgl_kembali ? 'Kembali' : (r.jatuh_tempo < hi ? 'Terlambat' : 'Dipinjam') }];
  if (t === 'Disposisi') return [{ l: 'Tenggat', v: r => r.status !== 'Selesai' && r.batas_waktu && r.batas_waktu < hi ? '<span class="badge b-danger">Terlambat</span>' : '', c: r => r.status !== 'Selesai' && r.batas_waktu && r.batas_waktu < hi ? 'Terlambat' : '' }];
  if (t === 'Siswa') return [];
  return [];
}
VIEW.tabel = { layout: 'adm', judul: p => (S.schema[p.t] || {}).label || p.t, crumb: p => { const g = MENU.find(m => m.i.some(i => i.t === p.t)); return g ? g.g : 'Data'; }, render(el, p) {
  const t = p.t, sc = S.schema[t];
  if (!sc || !S.data[t]) { el.innerHTML = kosong('lock', 'Anda tidak memiliki akses ke data ini.'); return; }
  const st = S.vs['t:' + t] = S.vs['t:' + t] || { q: '', f: {}, sort: null, dir: 1, hal: 1, per: 25 };
  if (p.filter) { Object.assign(st.f, p.filter); delete p.filter; }
  const kolom = sc.fields.filter(f => f.list).slice(0, 8), ekstra = kolomEkstra(t), filterF = sc.fields.filter(f => f.filter);
  el.innerHTML = '<div class="ph"><div><h1>' + esc(sc.label) + '</h1><p id="tInfo"></p></div><div class="row">' +
    (isA() && ['Siswa', 'Guru_Pegawai', 'Mapel', 'Inventaris', 'Buku_Perpustakaan', 'Kurikulum_TP', 'Jadwal', 'Penugasan_Guru', 'Kelas_Rombel', 'Keuangan_Anggaran', 'Klasifikasi_Surat'].indexOf(t) > -1 ? '<button class="btn btn-secondary" id="tImpor">' + ic('upload') + 'Impor Excel</button>' : '') +
    (bisaTambah(t) ? '<button class="btn btn-primary" id="tTambah">' + ic('plus') + 'Tambah</button>' : '') + '</div></div>' +
    '<div class="tw"><div class="tbar"><div class="search">' + ic('search') + '<input class="input" id="tQ" placeholder="Cari di ' + esc(sc.label) + '…" value="' + esc(st.q) + '" aria-label="Cari"></div>' +
    filterF.map(f => '<select class="select" style="width:auto;min-width:140px" data-f="' + f.k + '" aria-label="Filter ' + esc(f.l) + '"><option value="">' + esc(f.l) + ': Semua</option>' + opsiField(f).map(o => '<option value="' + esc(o[0]) + '"' + (st.f[f.k] === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>').join('') +
    '<button class="btn btn-secondary btn-sm" id="tCetak">' + ic('printer') + '<span class="hide-sm">Cetak/PDF</span></button><button class="btn btn-secondary btn-sm" id="tXls">' + ic('sheet') + '<span class="hide-sm">Excel</span></button></div>' +
    '<div class="tscroll"><table class="tbl cards"><thead><tr>' + kolom.map(f => '<th class="sort" data-s="' + f.k + '"' + (f.t === 'money' || f.t === 'number' ? ' style="text-align:right"' : '') + '>' + esc(f.l) + (st.sort === f.k ? (st.dir > 0 ? ' ↑' : ' ↓') : '') + '</th>').join('') + ekstra.map(e => '<th>' + esc(e.l) + '</th>').join('') + '<th class="act"><span class="sr">Aksi</span></th></tr></thead><tbody id="tBody"></tbody></table></div>' +
    '<div class="pager" id="tPager"></div></div>';
  const saring = () => {
    const q = st.q.toLowerCase();
    let l = daftar(t).filter(r => {
      for (const k in st.f) { if (!st.f[k]) continue; const f = sc.fields.find(x => x.k === k); if (f && f.t === 'multi') { if (String(r[k] || '').split(',').indexOf(st.f[k]) < 0) return false; } else if (String(r[k]) !== st.f[k]) return false; }
      if (!q) return true;
      return kolom.some(f => String(sel(f, r, 1)).toLowerCase().indexOf(q) > -1) || sc.fields.some(f => f.t === 'text' && String(r[f.k] || '').toLowerCase().indexOf(q) > -1);
    });
    if (st.sort) { const f = sc.fields.find(x => x.k === st.sort); l = l.slice().sort((a, b) => { let x = a[st.sort], y = b[st.sort]; if (f && (f.t === 'number' || f.t === 'money')) { x = angka(x); y = angka(y); } else { x = String(sel(f, a, 1)).toLowerCase(); y = String(sel(f, b, 1)).toLowerCase(); } return (x > y ? 1 : x < y ? -1 : 0) * st.dir; }); }
    return l;
  };
  const isi = () => {
    const l = saring(), hal = Math.min(st.hal, Math.max(1, Math.ceil(l.length / st.per))); st.hal = hal;
    const potong = l.slice((hal - 1) * st.per, hal * st.per);
    $('#tInfo', el).textContent = l.length + ' data' + (l.length !== daftar(t).length ? ' (dari ' + daftar(t).length + ')' : '');
    $('#tBody', el).innerHTML = potong.length ? potong.map(r => {
      const ak = aksiBaris(t, r);
      return '<tr class="' + (r._p ? 'pending' : '') + '" data-id="' + esc(r.id) + '">' + kolom.map(f => '<td data-l="' + esc(f.l) + '"' + (f.t === 'money' || f.t === 'number' ? ' class="r"' : '') + '>' + sel(f, r) + '</td>').join('') + ekstra.map(e => '<td data-l="' + esc(e.l) + '">' + e.v(r) + '</td>').join('') +
        '<td class="act">' + (r._p ? '<span class="badge b-neutral"><span class="spin" style="width:10px;height:10px"></span> Sinkron</span>' : '') +
        ak.map((a, i) => '<button class="btn ' + (a.utama ? 'btn-primary' : 'btn-secondary') + ' btn-sm" data-ak="' + i + '" title="' + esc(a.l) + '">' + ic(a.ic) + '<span class="hide-sm">' + esc(a.l) + '</span></button> ').join('') +
        '<button class="btn btn-ghost btn-icon btn-sm" data-det title="Lihat detail" aria-label="Lihat detail">' + ic('eye') + '</button>' +
        (bisaUbah(t, r) ? '<button class="btn btn-ghost btn-icon btn-sm" data-ubah title="Ubah" aria-label="Ubah">' + ic('pencil') + '</button>' : '') +
        (bisaHapus(t, r) ? '<button class="btn btn-ghost btn-icon btn-sm txt-danger" data-hapus title="Hapus" aria-label="Hapus">' + ic('trash-2') + '</button>' : '') + '</td></tr>';
    }).join('') : '<tr><td colspan="' + (kolom.length + ekstra.length + 1) + '">' + kosong(sc.ikon || 'inbox', st.q || Object.values(st.f).some(Boolean) ? 'Tidak ada data yang cocok dengan pencarian/filter.' : 'Belum ada data ' + sc.label + '.', bisaTambah(t) && !st.q ? '<button class="btn btn-primary" data-tambah>' + ic('plus') + 'Tambah ' + esc(sc.label) + '</button>' : '') + '</td></tr>';
    const jh = Math.max(1, Math.ceil(l.length / st.per));
    let pg = ''; for (let i = 1; i <= jh; i++) { if (jh > 9 && i > 2 && i < jh - 1 && Math.abs(i - hal) > 1) { if (pg.slice(-3) !== '…</span>') pg += '<span>…</span>'; continue; } pg += '<button class="' + (i === hal ? 'on' : '') + '" data-hal="' + i + '" aria-label="Halaman ' + i + '">' + i + '</button>'; }
    $('#tPager', el).innerHTML = '<span>Menampilkan ' + (l.length ? (hal - 1) * st.per + 1 : 0) + '–' + Math.min(l.length, hal * st.per) + ' dari ' + l.length + '</span><div class="row"><select class="select" style="width:auto;min-height:36px" id="tPer" aria-label="Baris per halaman">' + [10, 25, 50, 100].map(n => '<option' + (n === st.per ? ' selected' : '') + '>' + n + '</option>').join('') + '</select><div class="pages">' + pg + '</div></div>';
    $$('#tBody tr[data-id]', el).forEach(tr => {
      const r = daftar(t).find(x => x.id === tr.dataset.id); if (!r) return;
      const ak = aksiBaris(t, r);
      $$('[data-ak]', tr).forEach(b => b.onclick = () => ak[Number(b.dataset.ak)].fn(b));
      const d = $('[data-det]', tr); if (d) d.onclick = () => detail(t, r);
      const u = $('[data-ubah]', tr); if (u) u.onclick = () => bukaForm(t, r);
      const h = $('[data-hapus]', tr); if (h) h.onclick = async () => { if (await konfirmasi((['Siswa', 'Guru_Pegawai', 'Users'].indexOf(t) > -1 ? 'Nonaktifkan' : 'Hapus') + ' "' + (r[sc.judul] || r.nama || r.judul || 'data ini') + '"?', { bahaya: 1, ok: 'Ya, hapus' })) hapusRek(t, r); };
      $$('[data-pv]', tr).forEach(b => b.onclick = () => pratinjauBerkas(b.dataset.pv));
    });
    $$('[data-hal]', el).forEach(b => b.onclick = () => { st.hal = Number(b.dataset.hal); isi(); });
    $('#tPer', el).onchange = e => { st.per = Number(e.target.value); st.hal = 1; isi(); };
    const tb = $('[data-tambah]', el); if (tb) tb.onclick = () => bukaForm(t);
    ikon(); hidrasiGambar(el);
  };
  $('#tQ', el).oninput = debounce(e => { st.q = e.target.value; st.hal = 1; isi(); }, 150);
  $$('[data-f]', el).forEach(s => s.onchange = () => { st.f[s.dataset.f] = s.value; st.hal = 1; isi(); });
  $$('[data-s]', el).forEach(th => th.onclick = () => { if (st.sort === th.dataset.s) st.dir = -st.dir; else { st.sort = th.dataset.s; st.dir = 1; } render(); });
  if ($('#tTambah', el)) $('#tTambah', el).onclick = () => bukaForm(t);
  if ($('#tImpor', el)) $('#tImpor', el).onclick = () => imporExcel(t);
  const dataCetak = () => { const l = saring(); return { kolom: [{ l: 'No', a: 'c' }].concat(kolom.map(f => ({ l: f.l, a: f.t === 'money' || f.t === 'number' ? 'r' : '' })), ekstra.map(e => ({ l: e.l }))), baris: l.map((r, i) => [i + 1].concat(kolom.map(f => sel(f, r, 1)), ekstra.map(e => e.c ? e.c(r) : ''))) }; };
  $('#tCetak', el).onclick = () => { const d = dataCetak(); pratinjauDokumen({ judul: 'Daftar ' + sc.label, sub: filterTeks(sc, st), isi: tabelCetak(d.kolom, d.baris), lanskap: kolom.length > 6, excel: d, jenis: sc.label }); };
  $('#tXls', el).onclick = e => sibuk(e.currentTarget, () => { const d = dataCetak(); return excel('Daftar ' + sc.label, d.kolom, d.baris); });
  isi();
} };
function filterTeks(sc, st) { const f = Object.keys(st.f).filter(k => st.f[k]).map(k => { const fd = sc.fields.find(x => x.k === k); return fd.l + ': ' + (fd.t === 'ref' ? judul(fd.ref, st.f[k]) : st.f[k]); }); return (f.length ? f.join(' · ') + ' · ' : '') + 'Tahun Ajaran ' + esc((taAktif() || {}).nama || ''); }
function opsiField(f) {
  if (f.ref) {
    let l = daftar(f.ref);
    if (f.ref === 'Users') l = l.filter(u => ['Admin', 'KepalaSekolah', 'GuruKelas', 'GuruMapel'].indexOf(u.peran) > -1 && u.status !== 'Nonaktif');
    if (f.ref === 'Siswa') l = l.filter(s => s.status === 'Aktif');
    if (f.ref === 'Guru_Pegawai') l = l.filter(s => s.status !== 'Nonaktif');
    if (f.ref === 'Kelas_Rombel') l = kelasUrut();
    return l.map(r => [r.id, judul(f.ref, r.id)]).sort((a, b) => f.ref === 'Kelas_Rombel' ? 0 : String(a[1]).localeCompare(String(b[1]), 'id'));
  }
  return (f.opts || []).map(o => [o, PERAN_LABEL[o] || o]);
}
function detail(t, r) {
  const sc = S.schema[t];
  let ekstra = '';
  if (t === 'Surat_Masuk') { const dp = daftar('Disposisi').filter(d => d.id_surat === r.id); ekstra = '<h4 class="mt16" style="margin-bottom:8px">Alur Disposisi</h4>' + (dp.length ? '<div class="list">' + dp.map(d => '<div class="li"><span class="li-ic">' + ic('send') + '</span><div class="li-b"><div class="li-t">' + esc(judul('Users', d.kepada)) + ' ' + badge(d.status) + '</div><div class="li-s">' + esc(d.instruksi) + (d.batas_waktu ? ' · batas ' + fTgl(d.batas_waktu) : '') + (d.tindak_lanjut ? '<br>Tindak lanjut: ' + esc(d.tindak_lanjut) : '') + '</div></div></div>').join('') + '</div>' : '<p class="muted small">Belum didisposisi.</p>'); }
  const m = modal({ judul: sc.label, ukuran: 'lg', isi: '<dl class="kv">' + sc.fields.filter(f => f.t !== 'json').map(f => '<dt>' + esc(f.l) + '</dt><dd>' + (f.t === 'image' && r[f.k] ? '<img ' + (f.publik ? 'src="' + thumb(r[f.k], 400) + '"' : 'data-fid="' + esc(r[f.k]) + '"') + ' alt="" style="max-width:220px;border-radius:10px">' : sel(f, r)) + '</dd>').join('') +
    '<dt>Diubah</dt><dd class="muted small">' + esc(r.diubah || '-') + (r.oleh ? ' oleh ' + esc(r.oleh) : '') + '</dd></dl>' + ekstra,
    kaki: '<button class="btn btn-secondary" data-tutup>Tutup</button>' + (bisaUbah(t, r) ? '<button class="btn btn-primary" id="dUbah">' + ic('pencil') + 'Ubah</button>' : '') });
  $$('[data-pv]', m.el).forEach(b => b.onclick = () => pratinjauBerkas(b.dataset.pv)); hidrasiGambar(m.el);
  if ($('#dUbah', m.el)) $('#dUbah', m.el).onclick = () => { m.tutup(); bukaForm(t, r); };
}
function inputField(f, v, idp) {
  const id = idp + f.k, req = f.req ? ' required' : '', ro = f.ro ? ' disabled' : '';
  const label = '<label class="label" for="' + id + '">' + esc(f.l) + (f.req ? '<span class="req">*</span>' : '') + '</label>';
  let inp;
  if (f.t === 'textarea') inp = '<textarea class="textarea" id="' + id + '" name="' + f.k + '"' + req + ro + ' placeholder="' + esc(f.ph || '') + '"' + (f.besar ? ' style="min-height:220px"' : '') + '>' + esc(v || '') + '</textarea>';
  else if (f.t === 'select' || f.t === 'ref') inp = '<select class="select" id="' + id + '" name="' + f.k + '"' + req + ro + '><option value="">— Pilih —</option>' + opsiField(f).map(o => '<option value="' + esc(o[0]) + '"' + (String(v) === String(o[0]) ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>';
  else if (f.t === 'multi') { const set = String(v || '').split(',').map(x => x.trim()); inp = '<div class="multi" id="' + id + '" data-multi="' + f.k + '">' + opsiField(f).map(o => '<label><input type="checkbox" value="' + esc(o[0]) + '"' + (set.indexOf(o[0]) > -1 ? ' checked' : '') + ro + '><span>' + esc(o[1]) + '</span></label>').join('') + '</div>'; }
  else if (f.t === 'file' || f.t === 'image') inp = '<input type="hidden" name="' + f.k + '" value="' + esc(v || '') + '"><label class="drop" for="' + id + '"><span class="drop-pv">' + (v ? (f.t === 'image' ? '<img ' + (f.publik ? 'src="' + thumb(v, 160) + '"' : 'data-fid="' + esc(v) + '"') + ' alt="">' : ic('file-check')) : ic(f.t === 'image' ? 'image-plus' : 'upload')) + '</span><span class="grow small"><b class="drop-t">' + (v ? 'Berkas terunggah · ganti' : 'Pilih atau seret berkas') + '</b><br><span class="muted">' + (f.t === 'image' ? 'JPG/PNG, dikompres otomatis' : 'PDF/JPG/PNG, maks. 5 MB') + '</span></span></label><input type="file" id="' + id + '" data-up="' + f.k + '" accept="' + (f.t === 'image' ? 'image/*' : 'application/pdf,image/*') + '" hidden' + ro + '>';
  else {
    const tipe = { date: 'date', time: 'time', number: 'number', money: 'text', email: 'email', tel: 'tel' }[f.t] || 'text';
    inp = '<input class="input" id="' + id + '" name="' + f.k + '" type="' + tipe + '"' + (f.t === 'money' ? ' inputmode="numeric" data-uang' : '') + (f.t === 'number' ? ' inputmode="decimal"' : '') + (f.pola ? ' inputmode="numeric"' : '') + ' value="' + esc(f.t === 'money' && v ? fNum(v) : (v || '')) + '"' + req + ro + ' placeholder="' + esc(f.ph || '') + '">';
  }
  return '<div class="field' + (f.t === 'textarea' || f.t === 'multi' || f.t === 'file' || f.t === 'image' ? ' span2' : '') + '" data-field="' + f.k + '">' + label + inp + '<span class="errmsg" hidden></span>' + (f.help ? '<span class="help">' + esc(f.help) + '</span>' : '') + '</div>';
}
function nilaiForm(root, fields) {
  const o = {};
  fields.forEach(f => {
    if (f.t === 'multi') { o[f.k] = $$('[data-multi="' + f.k + '"] input:checked', root).map(i => i.value).join(','); return; }
    const el = root.querySelector('[name="' + f.k + '"]'); if (!el || el.disabled) return;
    let v = el.value.trim(); if (f.t === 'money') v = String(angka(v)); o[f.k] = v;
  });
  return o;
}
function validasiForm(root, fields, v) {
  let ok = true;
  fields.forEach(f => {
    const box = root.querySelector('[data-field="' + f.k + '"]'); if (!box) return;
    const msg = box.querySelector('.errmsg'); let e = '';
    const x = v[f.k];
    if (f.req && !f.ro && (x === '' || x === undefined) ) e = f.l + ' wajib diisi.';
    else if (x && f.pola && !(new RegExp(f.pola)).test(x)) e = f.pesan || f.l + ' tidak valid.';
    else if (x && f.t === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x)) e = 'Format email tidak valid.';
    else if (x && f.t === 'number' && isNaN(Number(x))) e = f.l + ' harus berupa angka.';
    box.classList.toggle('err', !!e); msg.hidden = !e; msg.textContent = e;
    if (e && ok) { const i = box.querySelector('input,select,textarea'); if (i) i.focus(); }
    if (e) ok = false;
  });
  return ok;
}
function pasangUnggah(root, fields) {
  $$('[data-up]', root).forEach(inp => {
    const f = fields.find(x => x.k === inp.dataset.up), box = inp.closest('.field');
    const drop = box.querySelector('.drop');
    const proses = async file => {
      const t = box.querySelector('.drop-t'), pv = box.querySelector('.drop-pv');
      t.innerHTML = '<span class="spin"></span> Mengunggah…';
      try { const d = await unggah(file, f.folder || 'Arsip_Dokumen', f.publik); box.querySelector('input[type=hidden]').value = d.id; t.textContent = 'Terunggah: ' + d.nama; pv.innerHTML = f.t === 'image' ? '<img src="' + (S.cache.img[d.id] || thumb(d.id, 160)) + '" alt="">' : ic('file-check'); ikon(); }
      catch (e) { t.textContent = 'Gagal: ' + e.message; toast(e.message, 'err'); }
    };
    inp.onchange = () => inp.files[0] && proses(inp.files[0]);
    drop.addEventListener('dragover', e => { e.preventDefault(); drop.style.borderColor = 'var(--primary)'; });
    drop.addEventListener('drop', e => { e.preventDefault(); if (e.dataTransfer.files[0]) proses(e.dataTransfer.files[0]); });
  });
  $$('[data-uang]', root).forEach(i => i.addEventListener('input', () => { const n = angka(i.value); i.value = n ? n.toLocaleString('id-ID') : ''; }));
}
/** Form tambah/ubah generik berbasis skema. */
function bukaForm(t, r, awal) {
  const sc = S.schema[t], baru = !r;
  r = r || Object.assign({}, awal || {});
  let fields = sc.fields.filter(f => f.t !== 'json');
  if (baru) fields = fields.filter(f => !f.ro);
  if (isG() && !isA()) fields = fields.filter(f => !(f.auto === 'guru'));
  if (t === 'Kaldik_Kegiatan' && !isA()) fields = fields.filter(f => f.k !== 'status');
  if (t === 'Surat_Keluar') fields = fields.filter(f => ['status', 'pengaju', 'catatan', 'file', 'kode_verif', 'no_surat'].indexOf(f.k) < 0 || (!baru && f.ro));
  if (baru) fields.forEach(f => { if (r[f.k] === undefined || r[f.k] === '') { if (f.t === 'date' && /^(tanggal|tgl_terima|tgl_pinjam|tgl_terbit|tgl_mulai|tgl_kirim)$/.test(f.k)) r[f.k] = hariIni(); if (f.k === 'status' && f.opts) r[f.k] = f.opts[0]; if (f.k === 'tahun' && /Keuangan/.test(t)) r[f.k] = hariIni().slice(0, 4); if (f.k === 'jatuh_tempo') r[f.k] = tglISO(new Date(Date.now() + 7 * 864e5)); if (f.k === 'semester') r[f.k] = S.set.semester_aktif; } });
  const ekstraUser = t === 'Users' ? '<div class="field span2"><label class="label" for="fx_sandi">Kata sandi ' + (baru ? 'awal (kosongkan = dibuat otomatis)' : 'baru (kosongkan bila tidak diganti)') + '</label><input class="input" id="fx_sandi" type="text" autocomplete="new-password"></div>' : '';
  const m = modal({ judul: (baru ? 'Tambah ' : 'Ubah ') + sc.label, ukuran: 'lg',
    isi: '<form id="frm" class="fgrid" novalidate>' + fields.map(f => inputField(f, r[f.k], 'fx_')).join('') + ekstraUser + (t === 'Surat_Keluar' ? '<div class="span2" id="isianBox"></div>' : '') + '</form>',
    kaki: '<button class="btn btn-ghost" data-tutup>Batal</button><button class="btn btn-primary" id="fSimpan" data-busy="Menyimpan…">' + ic('save') + 'Simpan</button>' });
  pasangUnggah(m.el, fields); hidrasiGambar(m.el);
  if (t === 'Surat_Keluar') { const isi = (() => { try { return JSON.parse(r.isian || '{}'); } catch (e) { return {}; } })(); const sel_ = $('[name=id_template]', m.el); const ren = () => { const tp = rek('Template_Surat', sel_.value); $('#isianBox', m.el).innerHTML = tp && tp.placeholder ? '<h4 style="margin:4px 0 8px">Isian Template</h4><div class="fgrid">' + tp.placeholder.split(',').map(x => x.trim()).filter(Boolean).map(k => '<div class="field"><label class="label" for="is_' + k + '">' + esc(k.replace(/_/g, ' ')) + '</label><input class="input" id="is_' + k + '" data-isian="' + esc(k) + '" value="' + esc(isi[k] || '') + '"></div>').join('') + '</div>' : ''; }; sel_.onchange = ren; ren(); }
  $('#frm', m.el).onsubmit = e => { e.preventDefault(); $('#fSimpan', m.el).click(); };
  $('#fSimpan', m.el).onclick = () => {
    const v = nilaiForm(m.el, fields);
    if (!validasiForm(m.el, fields, v)) return;
    if (t === 'Surat_Keluar') { const isi = {}; $$('[data-isian]', m.el).forEach(i => isi[i.dataset.isian] = i.value); v.isian = JSON.stringify(isi); }
    if (t === 'Siswa' && v.nisn) { const dup = daftar('Siswa').find(x => x.nisn === v.nisn && x.id !== r.id); if (dup) { toast('NISN ' + v.nisn + ' sudah dipakai ' + dup.nama + '.', 'err'); return; } }
    if (t === 'Keuangan_Transaksi' && v.jenis === 'Keluar' && v.id_anggaran) { const a = rek('Keuangan_Anggaran', v.id_anggaran); const terpakai = daftar('Keuangan_Transaksi').filter(x => x.id_anggaran === v.id_anggaran && x.jenis === 'Keluar' && x.id !== r.id).reduce((s, x) => s + angka(x.jumlah), 0); if (a && terpakai + angka(v.jumlah) > angka(a.pagu)) toast('Perhatian: transaksi ini melebihi sisa anggaran ' + a.kode + ' (sisa ' + fRp(angka(a.pagu) - terpakai) + ').', 'warn'); }
    if (!baru) v.id = r.id;
    if (t === 'Users') {
      v.sandi_baru = $('#fx_sandi', m.el).value;
      return sibuk($('#fSimpan', m.el), async () => {
        const d = pastikan(await apiT('apiSimpan', 'Users', v));
        const l = S.data.Users; const i = l.findIndex(x => x.id === d.rec.id); if (i > -1) l[i] = d.rec; else l.unshift(d.rec);
        m.tutup(); renderUlang(); simpanSnapshot();
        if (d.sandi) tampilkanSandi([{ nama: d.rec.nama, username: d.rec.username, sandi: d.sandi }]); else toast('Pengguna tersimpan.', 'ok');
      });
    }
    m.tutup(); simpanRek(t, v, { pesan: (baru ? 'Data ditambahkan.' : 'Perubahan tersimpan.') });
  };
}
function tampilkanSandi(l) {
  const m = modal({ judul: 'Kata Sandi Sementara', isi: '<div class="alert alert-warn mb16">' + ic('shield-alert') + '<span>Catat atau cetak sekarang. Kata sandi tidak dapat dilihat lagi. Pengguna wajib menggantinya saat login pertama.</span></div><table class="tbl"><thead><tr><th>Nama</th><th>Username</th><th>Kata sandi</th></tr></thead><tbody>' + l.map(x => '<tr><td>' + esc(x.nama) + '</td><td><code>' + esc(x.username) + '</code></td><td><code>' + esc(x.sandi) + '</code></td></tr>').join('') + '</tbody></table>',
    kaki: '<button class="btn btn-secondary" id="spCetak">' + ic('printer') + 'Cetak</button><button class="btn btn-primary" data-tutup>Selesai</button>' });
  $('#spCetak', m.el).onclick = async () => cetakHtml(await dokumen({ judul: 'Daftar Akun Pengguna', isi: tabelCetak([{ l: 'No', a: 'c' }, 'Nama', 'Username', 'Kata Sandi Sementara'], l.map((x, i) => [i + 1, x.nama, x.username, x.sandi])) + '<p style="font-size:9.5pt">Masuk di website sekolah → tombol Masuk. Ganti kata sandi saat login pertama. Simpan lembar ini dengan aman.</p>', ttd: false }));
}
async function imporExcel(t) {
  const sc = S.schema[t], fields = sc.fields.filter(f => !f.ro && f.t !== 'json' && f.t !== 'file' && f.t !== 'image');
  const m = modal({ judul: 'Impor Excel · ' + sc.label, ukuran: 'lg', isi: '<ol class="small" style="padding-left:18px;margin-top:0"><li>Unduh template, isi mulai baris ke-3 (baris 2 = keterangan).</li><li>Untuk kolom referensi (mis. Kelas) tulis <b>nama</b>-nya, contoh <code>3A</code>.</li><li>Data dengan ' + esc((fields.find(f => f.k === (sc.key || '')) || {}).l || 'kunci') + ' yang sama akan diperbarui, bukan digandakan.</li></ol>' +
    '<div class="row"><button class="btn btn-secondary" id="ixTpl">' + ic('download') + 'Unduh Template</button><label class="btn btn-primary" for="ixFile">' + ic('upload') + 'Pilih Berkas Excel</label><input type="file" id="ixFile" accept=".xlsx,.xls,.csv" hidden></div><div id="ixHasil" class="mt16"></div>',
    kaki: '<button class="btn btn-ghost" data-tutup>Tutup</button><button class="btn btn-primary" id="ixGo" disabled data-busy="Mengimpor…">' + ic('database-zap') + 'Impor Data</button>' });
  let siap = [];
  $('#ixTpl', m.el).onclick = e => sibuk(e.currentTarget, async () => { await muat(CDN.xlsx); const ws = XLSX.utils.aoa_to_sheet([fields.map(f => f.k), fields.map(f => f.l + (f.opts ? ' (' + f.opts.join('/') + ')' : '') + (f.req ? ' *' : ''))]); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Data'); XLSX.writeFile(wb, 'Template_' + t + '.xlsx'); });
  $('#ixFile', m.el).onchange = e => sibuk(null, async () => {
    await muat(CDN.xlsx); const f = e.target.files[0]; if (!f) return;
    const wb = XLSX.read(await f.arrayBuffer(), { type: 'array' }); const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, raw: false, defval: '' });
    const head = rows[0].map(String); const mulai = rows[1] && String(rows[1][0]).indexOf(fields[0].l) === 0 ? 2 : 1;
    siap = rows.slice(mulai).filter(r => r.join('').trim()).map(r => { const o = {}; head.forEach((h, i) => { const fd = fields.find(x => x.k === h || x.l === h); if (!fd) return; let v = String(r[i]).trim(); if (fd.t === 'ref' && v) { const cocok = daftar(fd.ref).find(x => x.id === v || String(judul(fd.ref, x.id)).toLowerCase() === v.toLowerCase()); v = cocok ? cocok.id : ''; } if (fd.t === 'date' && /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(v)) { const p = v.split('/'); v = (p[2].length === 2 ? '20' + p[2] : p[2]) + '-' + pad(p[1]) + '-' + pad(p[0]); } if (fd.pola === '^\\d{10}$' && /^\d{9}$/.test(v)) v = '0' + v; o[fd.k] = v; }); return o; });
    const bad = siap.filter(o => fields.some(f => f.req && !o[f.k]));
    $('#ixHasil', m.el).innerHTML = '<div class="alert ' + (bad.length ? 'alert-warn' : 'alert-ok') + '">' + ic(bad.length ? 'triangle-alert' : 'circle-check') + '<span>' + siap.length + ' baris terbaca' + (bad.length ? ', <b>' + bad.length + ' baris</b> kolom wajibnya kosong dan akan ditolak server.' : ', siap diimpor.') + '</span></div>';
    $('#ixGo', m.el).disabled = !siap.length; ikon();
  });
  $('#ixGo', m.el).onclick = e => sibuk(e.currentTarget, async () => {
    const d = pastikan(await apiT('apiSimpanBanyak', t, siap));
    const l = S.data[t] = S.data[t] || []; d.forEach(x => { const i = l.findIndex(y => y.id === x.id); if (i > -1) l[i] = Object.assign({}, l[i], x); else l.push(x); });
    m.tutup(); simpanSnapshot(); renderUlang(); toast(d.length + ' baris diimpor.', 'ok');
  });
}
async function aksiCepat(aksi, p, tabel) {
  const r = await apiT('apiAksi', aksi, p);
  if (!r.success) return toast(r.message, 'err');
  if (tabel && r.data && r.data.id) { const l = daftar(tabel), i = l.findIndex(x => x.id === r.data.id); if (i > -1) l[i] = Object.assign({}, l[i], r.data); }
  simpanSnapshot(); renderUlang(); toast(r.message === 'OK' ? 'Berhasil.' : r.message, 'ok');
  return r.data;
}
function terapkanBaris(tabel, rows) { const l = S.data[tabel] = S.data[tabel] || []; (rows || []).forEach(x => { const i = l.findIndex(y => y.id === x.id); if (i > -1) l[i] = x; else l.unshift(x); }); simpanSnapshot(); }
async function ajukan(tabel, ids, btn) {
  if (!await konfirmasi('Ajukan ' + ids.length + ' ' + S.schema[tabel].label + ' untuk ' + (tabel === 'Surat_Keluar' ? 'diverifikasi Admin' : 'disetujui Kepala Sekolah') + '? Data akan terkunci selama proses.', { ok: 'Ajukan' })) return;
  // tampil instan, kirim di latar
  const l = daftar(tabel); ids.forEach(id => { const r = l.find(x => x.id === id); if (r) r.status = 'Diajukan'; }); renderUlang();
  const r = await apiT('apiAksi', 'ajukan', { tabel: tabel, ids: ids });
  if (!r.success) { toast(r.message, 'err'); const x = await apiT('apiTarik', [tabel]); if (x.success) Object.assign(S.data, x.data.data); renderUlang(); return; }
  terapkanBaris(tabel, r.data); renderUlang(); toast(r.message, 'ok');
}


/* ============================== 11. KELAS & KENAIKAN ====================== */
VIEW.kelas = { layout: 'adm', judul: 'Kelas & Rombel', crumb: 'Data Induk', render(el) {
  const tab = S.vs.kelasTab || 'rombel';
  const kls = kelasUrut();
  let isi = '';
  if (tab === 'rombel') isi = '<div class="g3">' + kls.map(k => { const n = siswaAktif(k.id); return '<div class="card"><div class="row" style="flex-wrap:nowrap"><span style="width:56px;height:56px;border-radius:14px;background:var(--sky);color:var(--primary);display:grid;place-items:center;font-weight:800;font-size:20px;flex:none">' + esc(k.nama) + '</span><div class="grow"><b>Kelas ' + esc(k.nama) + '</b><div class="small muted">Wali: ' + esc(judul('Guru_Pegawai', k.id_wali) || 'belum ditentukan') + '</div><div class="small muted">' + n.length + ' siswa · L ' + n.filter(s => s.jk === 'L').length + ' / P ' + n.filter(s => s.jk === 'P').length + (k.ruang ? ' · ' + esc(k.ruang) : '') + '</div></div></div><div class="row mt16"><button class="btn btn-secondary btn-sm" data-lihat="' + k.id + '">' + ic('users', 'sm') + 'Daftar Siswa</button>' + (isA() ? '<button class="btn btn-ghost btn-sm" data-ubah="' + k.id + '">' + ic('pencil', 'sm') + 'Ubah</button>' : '') + '</div></div>'; }).join('') + '</div>';
  if (tab === 'kenaikan') {
    const st = S.vs.naik = S.vs.naik || { asal: (kls[0] || {}).id, data: {} };
    const sw = siswaAktif(st.asal), asal = rek('Kelas_Rombel', st.asal) || {}, tingkat = Number(asal.tingkat || 0);
    const tujuanDef = (kls.find(k => Number(k.tingkat) === tingkat + 1 && String(k.nama).slice(1) === String(asal.nama).slice(1)) || kls.find(k => Number(k.tingkat) === tingkat + 1) || {}).id || '';
    isi = '<div class="card"><div class="row mb16"><div class="field" style="min-width:200px"><label class="label" for="nkAsal">1. Kelas asal</label><select class="select" id="nkAsal">' + kls.map(k => '<option value="' + k.id + '"' + (k.id === st.asal ? ' selected' : '') + '>' + esc(k.nama) + '</option>').join('') + '</select></div><div class="alert alert-info grow">' + ic('info') + '<span>2. Tentukan status tiap siswa. Siswa kelas 6 berstatus <b>Lulus</b> otomatis menjadi alumni dan akunnya dinonaktifkan.</span></div></div>' +
      (sw.length ? '<div class="tscroll"><table class="tbl"><thead><tr><th>No</th><th>Nama</th><th>NISN</th><th>Status</th><th>Kelas Tujuan</th></tr></thead><tbody>' + sw.map((s, i) => { const d = st.data[s.id] = st.data[s.id] || { status: tingkat === 6 ? 'Lulus' : 'Naik', ke: tujuanDef };
        return '<tr><td>' + (i + 1) + '</td><td>' + esc(s.nama) + '</td><td class="num">' + esc(s.nisn) + '</td><td><div class="seg" data-sid="' + s.id + '">' + ['Naik', 'Tinggal', 'Lulus'].map(x => '<button class="' + (d.status === x ? 'on x' : '') + '" data-st="' + x + '" style="padding:0 10px">' + x + '</button>').join('') + '</div></td><td><select class="select" data-ke="' + s.id + '" style="min-height:36px"' + (d.status !== 'Naik' ? ' disabled' : '') + '><option value="">—</option>' + kls.map(k => '<option value="' + k.id + '"' + (d.ke === k.id ? ' selected' : '') + '>' + esc(k.nama) + '</option>').join('') + '</select></td></tr>'; }).join('') + '</tbody></table></div><div class="row mt16" style="justify-content:flex-end"><button class="btn btn-primary" id="nkGo" data-busy="Memproses…">' + ic('arrow-big-up-dash') + '3. Proses Kenaikan ' + sw.length + ' Siswa</button></div>' : kosong('users', 'Tidak ada siswa aktif di kelas ini.')) + '</div>';
  }
  el.innerHTML = '<div class="ph"><div><h1>Kelas & Rombongan Belajar</h1><p>Tahun ajaran ' + esc((taAktif() || {}).nama || '—') + '</p></div><div class="row">' + (isA() ? '<button class="btn btn-primary" id="kTambah">' + ic('plus') + 'Tambah Rombel</button>' : '') + '</div></div>' +
    '<div class="tabs">' + [['rombel', 'Kelas & Rombel'], ['kenaikan', 'Kenaikan Kelas & Kelulusan']].filter(x => x[0] !== 'kenaikan' || isA()).map(x => '<button class="tab ' + (x[0] === tab ? 'on' : '') + '" data-tab="' + x[0] + '">' + x[1] + '</button>').join('') + '<button class="tab" data-v="tabel" data-t="Penugasan_Guru">Penugasan Guru</button><button class="tab" data-v="tabel" data-t="Mutasi_Siswa">Mutasi Siswa</button></div>' + isi;
  $$('[data-tab]', el).forEach(b => b.onclick = () => { S.vs.kelasTab = b.dataset.tab; render(); });
  $$('[data-lihat]', el).forEach(b => b.onclick = () => buka('tabel', { t: 'Siswa', filter: { id_kelas: b.dataset.lihat } }));
  $$('[data-ubah]', el).forEach(b => b.onclick = () => bukaForm('Kelas_Rombel', rek('Kelas_Rombel', b.dataset.ubah)));
  if ($('#kTambah', el)) $('#kTambah', el).onclick = () => bukaForm('Kelas_Rombel');
  if (tab === 'kenaikan') {
    const st = S.vs.naik;
    if ($('#nkAsal', el)) $('#nkAsal', el).onchange = e => { st.asal = e.target.value; st.data = {}; render(); };
    $$('[data-sid]', el).forEach(sg => $$('button', sg).forEach(b => b.onclick = () => { st.data[sg.dataset.sid].status = b.dataset.st; render(); }));
    $$('[data-ke]', el).forEach(s => s.onchange = () => { st.data[s.dataset.ke].ke = s.value; });
    if ($('#nkGo', el)) $('#nkGo', el).onclick = e => sibuk(e.currentTarget, async () => {
      const items = siswaAktif(st.asal).map(s => ({ id_siswa: s.id, status: st.data[s.id].status, id_kelas_baru: st.data[s.id].ke }));
      if (items.some(i => i.status === 'Naik' && !i.id_kelas_baru)) throw new Error('Pilih kelas tujuan untuk semua siswa yang naik.');
      if (!await konfirmasi('Proses kenaikan/kelulusan ' + items.length + ' siswa? Riwayat rombel akan dicatat.', { ok: 'Proses' })) return;
      const d = pastikan(await apiT('apiAksi', 'kenaikan', { items: items }));
      S.data.Siswa = d.siswa; if (S.data.Alumni) S.data.Alumni = d.alumni; st.data = {}; simpanSnapshot(); render(); toast('Kenaikan kelas diproses.', 'ok');
    });
  }
} };

/* ============================== 12. KALDIK (ADMIN & GURU) ================= */
async function dokumenKaldik(kd, pdf) {
  petaHari(kd.id_tahun);
  const rk = rekapKaldik(kd), bl = bulanRentang(kd);
  const warna = { LN: '#FBE4E4;color:#C62828', CB: '#FBE9DC;color:#C2560F', LSk: '#FBE9DC;color:#C2560F', LS: '#E3EEFD;color:#1E63D6', K: '#E2F5EA;color:#0F7A44', STS: '#F5B82E;color:#0F2340', SAS: '#F5B82E;color:#0F2340', MPLS: '#0B2E5C;color:#fff', R: '#0B2E5C;color:#fff', off: '#eef1f5;color:#8a96a8' };
  const bulan = bl.map(x => {
    const awal = new Date(x[0], x[1], 1), off = (awal.getDay() + 6) % 7, jml = new Date(x[0], x[1] + 1, 0).getDate();
    let c = '', ket = [];
    for (let i = 0; i < off; i++) c += '<td></td>';
    for (let d = 1; d <= jml; d++) {
      const t = x[0] + '-' + pad(x[1] + 1) + '-' + pad(d), inf = infoHari(t, kd);
      if (inf.ket && LIBUR.concat(['Kegiatan', 'STS', 'SAS', 'MPLS', 'Pembagian Rapor']).indexOf(inf.jenis) > -1 && !ket.some(k => k.indexOf(inf.ket) > -1)) ket.push(d + ': ' + inf.ket);
      c += '<td style="background:' + (warna[inf.kode] || '#fff;color:#000') + '">' + d + '</td>';
      if ((off + d) % 7 === 0 && d < jml) c += '</tr><tr>';
    }
    const k = x[0] + '-' + pad(x[1] + 1);
    return '<div class="bln"><div class="bh">' + BULAN[x[1]].toUpperCase() + ' ' + x[0] + '<span>' + ((rk.per[k] || {}).e || 0) + ' HE</span></div><table class="kal"><tr>' + ['S', 'S', 'R', 'K', 'J', 'S', 'M'].map(h => '<th>' + h + '</th>').join('') + '</tr><tr>' + c + '</tr></table><div class="ket">' + esc(ket.slice(0, 4).join('; ')) + '</div></div>';
  }).join('');
  const rekap = tabelCetak([{ l: 'Bulan' }, { l: 'Hari Efektif', a: 'c' }, { l: 'Minggu Efektif', a: 'c' }, { l: 'Hari Libur', a: 'c' }], bl.map(x => { const k = x[0] + '-' + pad(x[1] + 1), r = rk.per[k] || { e: 0, w: {}, l: 0 }; return [BULAN[x[1]] + ' ' + x[0], r.e, Object.keys(r.w).length, r.l]; }),
    ['Jumlah (Ganjil ' + rk.smt.Ganjil.e + ' · Genap ' + rk.smt.Genap.e + ')', rk.total, Object.keys(rk.smt.Ganjil.w).length + Object.keys(rk.smt.Genap.w).length, rk.smt.Ganjil.l + rk.smt.Genap.l]);
  const leg = [['#fff;color:#000;border:1px solid #999', 'Hari efektif'], [warna.LN, 'Libur nasional'], [warna.CB, 'Cuti bersama / libur sekolah'], [warna.LS, 'Libur semester'], [warna.K, 'Kegiatan'], [warna.STS, 'STS / SAS'], [warna.MPLS, 'MPLS / pembagian rapor'], [warna.off, 'Minggu' + (String(kd.hari_sekolah) === '5' ? '/Sabtu' : '')]].map(x => '<span style="display:inline-block;margin:0 8pt 3pt 0"><span style="display:inline-block;width:10pt;height:10pt;vertical-align:middle;background:' + x[0] + '"></span> ' + x[1] + '</span>').join('');
  return dokumen({ judul: 'Kalender Pendidikan Tahun Ajaran ' + judul('Tahun_Ajaran', kd.id_tahun), sub: (kd.no_dokumen ? 'Nomor: ' + esc(kd.no_dokumen) + ' · ' : '') + 'Sekolah ' + esc(S.set.hari_sekolah === '5' || String(kd.hari_sekolah) === '5' ? '5' : '6') + ' hari · ' + (kd.status === 'Disahkan' ? 'Disahkan ' + fTglL(kd.tgl_pengesahan) : 'DRAF — belum disahkan'),
    kertas: 'F4', lanskap: true, pdf: pdf, kodeVerif: kd.status === 'Disahkan' ? kd.kode_verif : '',
    css: '.grid12{display:grid;grid-template-columns:repeat(4,1fr);gap:6pt}.bln{border:1px solid #999;padding:3pt;page-break-inside:avoid}.bh{font-weight:bold;font-size:9pt;display:flex;justify-content:space-between;background:#0B2E5C;color:#fff;padding:2pt 4pt}.bh span{color:#F5B82E}.kal{width:100%;border-collapse:collapse;font-size:8pt;text-align:center}.kal th{font-size:7.5pt;color:#333}.kal td{border:1px solid #ddd;height:12pt}.ket{font-size:6.5pt;color:#333;min-height:14pt;margin-top:2pt}',
    isi: '<div class="grid12">' + bulan + '</div><div style="margin:6pt 0;font-size:8.5pt">' + leg + '</div><div style="display:flex;gap:12pt;align-items:flex-start"><div style="flex:1">' + rekap + '</div></div>' });
}
VIEW.kaldik = { layout: 'adm', judul: 'Kalender Pendidikan', crumb: 'Akademik', render(el) {
  const kdList = daftar('Kaldik_Tahun').slice().sort((a, b) => a.tgl_awal < b.tgl_awal ? 1 : -1);
  const st = S.vs.kaldik = S.vs.kaldik || { id: (kaldikUntuk(hariIni()) || kdList[0] || {}).id, mode: 'tahunan', tab: 'kalender' };
  const kd = rek('Kaldik_Tahun', st.id) || kdList[0];
  if (!kd) { el.innerHTML = '<div class="ph"><div><h1>Kalender Pendidikan</h1></div></div>' + kosong('calendar-plus', 'Belum ada Kaldik. Buat Kaldik untuk tahun ajaran aktif.', isA() ? '<button class="btn btn-primary" id="kdBaru">' + ic('plus') + 'Buat Kaldik</button>' : ''); if ($('#kdBaru', el)) $('#kdBaru', el).onclick = () => { const ta = taAktif() || {}; bukaForm('Kaldik_Tahun', null, { id_tahun: ta.id, tgl_awal: ta.tgl_mulai, tgl_akhir: ta.tgl_selesai, hari_sekolah: S.set.hari_sekolah || '6' }); }; return; }
  st.id = kd.id; petaHari(kd.id_tahun);
  const rk = rekapKaldik(kd), today = infoHari(hariIni(), kd), bisaUbahK = isA() && kd.status !== 'Diajukan';
  const usulan = daftar('Kaldik_Kegiatan').slice().sort((a, b) => a.tgl_mulai < b.tgl_mulai ? 1 : -1), nUsul = usulan.filter(u => u.status === 'Diusulkan').length;
  const statusB = { Draf: 'b-neutral', Diajukan: 'b-info', Disahkan: 'b-success', Ditolak: 'b-danger' }[kd.status] || 'b-neutral';
  let isi = '';
  if (st.tab === 'kalender') {
    isi = '<div class="split s2"><div><div class="card mb16"><div class="row row-sb"><div class="row"><span class="small bold muted">Keterangan:</span></div>' + (bisaUbahK ? '<button class="btn btn-primary btn-sm" id="kdTandai">' + ic('calendar-plus') + 'Tandai Tanggal</button>' : '') + '</div><div class="mt8">' + legendaKaldik() + '</div>' + (bisaUbahK ? '<p class="xs muted" style="margin:8px 0 0">Klik tanggal untuk menandai libur, kegiatan, atau penilaian.' + (kd.status === 'Disahkan' ? ' <b>Perubahan pada Kaldik yang sudah disahkan membuat revisi baru yang perlu disahkan ulang.</b>' : '') + '</p>' : '') + '</div>' +
      '<div class="kgrid">' + bulanRentang(kd).map(x => { const k = x[0] + '-' + pad(x[1] + 1); return '<div class="km"><h4>' + BULAN[x[1]] + ' ' + x[0] + '<small>' + ((rk.per[k] || {}).e || 0) + ' HE</small></h4>' + bulanKalender(x[0], x[1], kd) + '</div>'; }).join('') + '</div></div>' +
      '<div><div class="card mb16"><div class="card-h"><h3>' + ic('chart-column') + ' Rekapitulasi Hari Efektif</h3></div><div class="row" style="flex-wrap:nowrap"><span style="width:84px;height:84px;border-radius:50%;border:6px solid var(--primary);display:grid;place-items:center;flex:none"><b style="font-size:24px">' + rk.total + '</b></span><div class="small muted">Total hari efektif satu tahun ajaran (' + (Object.keys(rk.smt.Ganjil.w).length + Object.keys(rk.smt.Genap.w).length) + ' minggu efektif).</div></div>' +
        ['Ganjil', 'Genap'].map(s => '<div class="card mt16" style="background:var(--bg)"><div class="row row-sb"><b>Semester ' + s + '</b><span class="badge b-info">' + rk.smt[s].e + ' hari efektif</span></div><div class="row row-sb small muted mt8"><span>' + Object.keys(rk.smt[s].w).length + ' minggu efektif</span><span>' + rk.smt[s].l + ' hari libur/jeda</span></div></div>').join('') +
        '<div class="tscroll mt16"><table class="tbl"><thead><tr><th>Bulan</th><th class="r">HE</th><th class="r">ME</th><th class="r">Libur</th></tr></thead><tbody>' + bulanRentang(kd).map(x => { const k = x[0] + '-' + pad(x[1] + 1), r = rk.per[k] || { e: 0, w: {}, l: 0 }; return '<tr><td>' + BLN[x[1]] + ' ' + x[0] + '</td><td class="r">' + r.e + '</td><td class="r">' + Object.keys(r.w).length + '</td><td class="r">' + r.l + '</td></tr>'; }).join('') + '</tbody></table></div></div>' +
        '<div class="card"><div class="card-h"><h3>' + ic('list') + ' Tanggal Khusus</h3></div><div class="list" style="max-height:360px;overflow:auto">' + daftar('Kaldik_Hari').filter(h => h.id_tahun === kd.id_tahun).sort((a, b) => a.tanggal < b.tanggal ? -1 : 1).map(h => '<div class="li"><span class="lg k-' + (KODE_HARI[h.jenis] || 'K') + '" style="min-width:52px;justify-content:center">' + (KODE_HARI[h.jenis] || '') + '</span><div class="li-b"><div class="li-t">' + esc(h.keterangan || h.jenis) + '</div><div class="li-s">' + fTglP(h.tanggal) + '</div></div></div>').join('') + '</div></div></div></div>';
  }
  if (st.tab === 'usulan') isi = '<div class="row row-sb mb16"><p class="muted small" style="margin:0">Guru dapat mengusulkan kegiatan; Admin/Operator menyetujui agar masuk ke Kaldik.</p>' + (bisaTambah('Kaldik_Kegiatan') ? '<button class="btn btn-primary" id="kdUsul">' + ic('plus') + (isA() ? 'Tambah Kegiatan' : 'Usulkan Kegiatan') + '</button>' : '') + '</div>' +
    '<div class="tw"><div class="tscroll"><table class="tbl cards"><thead><tr><th>Kegiatan</th><th>Tanggal</th><th>Jenis</th><th>Pengusul</th><th>Status</th><th class="act"></th></tr></thead><tbody>' + (usulan.length ? usulan.map(u => '<tr><td data-l="Kegiatan"><b>' + esc(u.judul) + '</b></td><td data-l="Tanggal">' + fTgl(u.tgl_mulai) + (u.tgl_selesai && u.tgl_selesai !== u.tgl_mulai ? ' – ' + fTgl(u.tgl_selesai) : '') + '</td><td data-l="Jenis">' + esc(u.jenis || 'Kegiatan') + '</td><td data-l="Pengusul">' + esc(u.diusulkan_oleh || '') + '</td><td data-l="Status">' + badge(u.status) + '</td><td class="act">' + (isA() && u.status === 'Diusulkan' ? '<button class="btn btn-success btn-sm" data-ya="' + u.id + '">' + ic('check') + 'Setujui</button> <button class="btn btn-danger-o btn-sm" data-tidak="' + u.id + '">' + ic('x') + 'Tolak</button>' : '') + '</td></tr>').join('') : '<tr><td colspan="6">' + kosong('calendar-plus', 'Belum ada usulan kegiatan.') + '</td></tr>') + '</tbody></table></div></div>';
  if (st.tab === 'riwayat') isi = '<div class="tw"><div class="tscroll"><table class="tbl"><thead><tr><th>Waktu</th><th>Revisi</th><th>Perubahan</th><th>Oleh</th></tr></thead><tbody>' + (daftar('Kaldik_Riwayat').filter(r => r.id_tahun === kd.id_tahun).sort((a, b) => a.waktu < b.waktu ? 1 : -1).map(r => '<tr><td class="nowrap">' + esc(r.waktu) + '</td><td>' + esc(r.revisi) + '</td><td>' + esc(r.perubahan) + '</td><td>' + esc(r.pelaku) + '</td></tr>').join('') || '<tr><td colspan="4">' + kosong('history', 'Belum ada riwayat.') + '</td></tr>') + '</tbody></table></div></div>';
  el.innerHTML = '<div class="ph"><div><h1>Kalender Pendidikan ' + esc(judul('Tahun_Ajaran', kd.id_tahun)) + '</h1><p><span class="badge ' + statusB + '">' + esc(kd.status) + (kd.revisi ? ' · Revisi ' + esc(kd.revisi) : '') + '</span>' + (kd.no_dokumen ? ' No. ' + esc(kd.no_dokumen) : '') + (kd.catatan && kd.status === 'Ditolak' ? ' <span class="txt-danger">Catatan: ' + esc(kd.catatan) + '</span>' : '') + '</p></div><div class="row">' +
    (kdList.length > 1 ? '<select class="select" id="kdPilih" style="width:auto" aria-label="Pilih tahun ajaran">' + kdList.map(k => '<option value="' + k.id + '"' + (k.id === kd.id ? ' selected' : '') + '>' + esc(judul('Tahun_Ajaran', k.id_tahun)) + '</option>').join('') + '</select>' : '') +
    '<button class="btn btn-secondary" id="kdCetak">' + ic('printer') + 'Cetak / PDF F4</button>' +
    (isA() && ['Draf', 'Ditolak'].indexOf(kd.status) > -1 ? '<button class="btn btn-primary" id="kdAjukan">' + ic('send') + 'Ajukan Pengesahan</button>' : '') +
    (isA() ? '<button class="btn btn-ghost btn-icon" id="kdAtur" title="Pengaturan Kaldik" aria-label="Pengaturan Kaldik">' + ic('settings-2') + '</button>' : '') + '</div></div>' +
    '<div class="card today mb16"><div class="row" style="flex-wrap:nowrap"><span class="today-ic">' + ic('calendar-check') + '</span><div><h2>Hari ini: ' + fTglP(hariIni()) + ' <span class="badge ' + (today.efektif ? 'b-success' : 'b-danger') + '">' + esc(today.jenis) + '</span></h2><div class="small muted">' + rk.total + ' hari efektif · sekolah ' + esc(kd.hari_sekolah) + ' hari</div></div></div></div>' +
    '<div class="tabs">' + [['kalender', 'Kalender 12 Bulan'], ['usulan', 'Usulan Kegiatan' + (nUsul ? ' <em>' + nUsul + '</em>' : '')], ['riwayat', 'Riwayat Revisi']].filter(x => x[0] !== 'riwayat' || S.data.Kaldik_Riwayat).map(x => '<button class="tab ' + (x[0] === st.tab ? 'on' : '') + '" data-tab="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>' + isi;
  $$('[data-tab]', el).forEach(b => b.onclick = () => { st.tab = b.dataset.tab; render(); });
  if ($('#kdPilih', el)) $('#kdPilih', el).onchange = e => { st.id = e.target.value; render(); };
  if ($('#kdAtur', el)) $('#kdAtur', el).onclick = () => bukaForm('Kaldik_Tahun', kd);
  $('#kdCetak', el).onclick = async () => { const html = await dokumenKaldik(kd); const m = modal({ judul: 'Pratinjau Kaldik (F4 lanskap)', ukuran: 'xl', isi: '<iframe class="preview-frame" title="Pratinjau Kaldik"></iframe>', kaki: '<button class="btn btn-secondary" id="kpPdf" data-busy="Membuat PDF…">' + ic('file-down') + 'Unduh PDF' + (isA() && kd.status === 'Disahkan' ? ' & Simpan sebagai Resmi' : '') + '</button><button class="btn btn-primary" id="kpCetak">' + ic('printer') + 'Cetak</button>' });
    $('iframe', m.el).srcdoc = html; $('#kpCetak', m.el).onclick = () => cetakHtml(html);
    $('#kpPdf', m.el).onclick = e => sibuk(e.currentTarget, async () => { const d = pastikan(await apiT('apiPdf', { html: await dokumenKaldik(kd, true), judul: 'Kaldik ' + judul('Tahun_Ajaran', kd.id_tahun), jenis: 'Kaldik', folder: 'Kaldik', kaldikId: isA() && kd.status === 'Disahkan' ? kd.id : '' })); unduhB64(d.b64, d.nama, 'application/pdf'); if (isA() && kd.status === 'Disahkan') { kd.id_file = d.id; simpanSnapshot(); toast('PDF resmi tersimpan dan dapat diunduh siswa & orang tua.', 'ok'); } }); };
  if ($('#kdAjukan', el)) $('#kdAjukan', el).onclick = () => ajukan('Kaldik_Tahun', [kd.id]);
  const tandai = (dari, sampai) => {
    const m = modal({ judul: 'Tandai Tanggal Kaldik', isi: '<div class="fgrid"><div class="field"><label class="label" for="tdDari">Dari tanggal</label><input class="input" type="date" id="tdDari" value="' + (dari || hariIni()) + '" min="' + kd.tgl_awal + '" max="' + kd.tgl_akhir + '"></div><div class="field"><label class="label" for="tdSampai">Sampai tanggal</label><input class="input" type="date" id="tdSampai" value="' + (sampai || dari || hariIni()) + '" min="' + kd.tgl_awal + '" max="' + kd.tgl_akhir + '"></div>' +
      '<div class="field span2"><label class="label" for="tdJenis">Jenis hari</label><select class="select" id="tdJenis">' + ['Efektif'].concat(Object.keys(KODE_HARI)).map(j => '<option value="' + j + '">' + (j === 'Efektif' ? 'E · Hari Efektif (hapus tanda)' : KODE_HARI[j] + ' · ' + j) + '</option>').join('') + '</select></div>' +
      '<div class="field span2"><label class="label" for="tdKet">Keterangan</label><input class="input" id="tdKet" placeholder="Contoh: Hari Raya Natal, STS Ganjil, Peringatan HUT RI"></div>' +
      '<label class="row small span2"><input type="checkbox" id="tdLewati" checked> Lewati hari Minggu' + (String(kd.hari_sekolah) === '5' ? '/Sabtu' : '') + ' dalam rentang</label></div>',
      kaki: '<button class="btn btn-ghost" data-tutup>Batal</button><button class="btn btn-primary" id="tdOk">' + ic('check') + 'Simpan</button>' });
    $('#tdOk', m.el).onclick = () => {
      const p = { id_kaldik: kd.id, dari: $('#tdDari', m.el).value, sampai: $('#tdSampai', m.el).value, jenis: $('#tdJenis', m.el).value, keterangan: $('#tdKet', m.el).value.trim(), lewatiAkhirPekan: $('#tdLewati', m.el).checked };
      if (!p.dari || p.sampai < p.dari) return toast('Rentang tanggal tidak valid.', 'err');
      // optimistik: ubah peta lokal langsung
      const l = S.data.Kaldik_Hari = daftar('Kaldik_Hari');
      for (let d = keDate(p.dari); d <= keDate(p.sampai); d.setDate(d.getDate() + 1)) {
        const t = tglISO(d); if (p.lewatiAkhirPekan && (d.getDay() === 0 || (d.getDay() === 6 && String(kd.hari_sekolah) === '5'))) continue;
        for (let i = l.length - 1; i >= 0; i--) if (l[i].tanggal === t && l[i].id_tahun === kd.id_tahun) l.splice(i, 1);
        if (p.jenis !== 'Efektif') l.push({ id: kd.id_tahun + '_' + t, tanggal: t, id_tahun: kd.id_tahun, jenis: p.jenis, keterangan: p.keterangan, _p: 1 });
      }
      if (kd.status === 'Disahkan' || kd.status === 'Ditolak') { kd.status = 'Draf'; }
      Antrian.tambah({ jenis: 'kaldik', fn: 'apiKaldikTandai', args: [p] });
      m.tutup(); simpanSnapshot(); render(); toast('Kaldik diperbarui.', 'ok');
    };
  };
  if ($('#kdTandai', el)) $('#kdTandai', el).onclick = () => tandai();
  $$('.kd [data-hari]', el).forEach(b => b.onclick = () => { if (bisaUbahK) tandai(b.dataset.hari); else { const i = infoHari(b.dataset.hari, kd); toast(fTglP(b.dataset.hari) + ': ' + i.jenis + (i.ket ? ' — ' + i.ket : ''), 'info'); } });
  if ($('#kdUsul', el)) $('#kdUsul', el).onclick = () => bukaForm('Kaldik_Kegiatan', null, { status: isA() ? 'Disetujui' : 'Diusulkan', jenis: 'Kegiatan', terbit_agenda: 'Ya' });
  $$('[data-ya]', el).forEach(b => b.onclick = () => putusUsulan(rek('Kaldik_Kegiatan', b.dataset.ya), true, b));
  $$('[data-tidak]', el).forEach(b => b.onclick = () => putusUsulan(rek('Kaldik_Kegiatan', b.dataset.tidak), false, b));
} };
async function putusUsulan(r, terima, btn) {
  return sibuk(btn, async () => {
    const d = pastikan(await apiT('apiAksi', 'setujuiUsulan', { id: r.id, terima: terima }));
    terapkanBaris('Kaldik_Kegiatan', [d.usulan]);
    if (d.hari) { const l = S.data.Kaldik_Hari = daftar('Kaldik_Hari'); d.hari.forEach(h => { const i = l.findIndex(x => x.id === h.id); if (i > -1) l[i] = h; else l.push(h); }); }
    renderUlang(); renderMenu(); toast(terima ? 'Usulan disetujui dan masuk ke Kaldik.' : 'Usulan ditolak.', 'ok');
  });
}

/* ============================== 13. ABSENSI ================================ */
async function dataAbsensi(kelas, bulan) {
  const k = kelas + '|' + bulan;
  if (S.cache.abs[k]) return S.cache.abs[k];
  const d = pastikan(await apiT('apiAbsensi', kelas, bulan));
  const m = {}; d.forEach(a => { m[a.tanggal + '_' + a.id_siswa] = a; });
  S.cache.abs[k] = m; return m;
}
VIEW.absensi = { layout: 'adm', judul: 'Absensi', crumb: 'Akademik', render(el, p) {
  const kls = kelasSaya();
  const st = S.vs.abs = S.vs.abs || { kelas: p.kelas || ((S.cx && S.cx.kelasWali && S.cx.kelasWali[0]) || (kls[0] || {}).id), tgl: hariIni(), tab: 'harian', bulan: hariIni().slice(0, 7) };
  if (p.kelas) { st.kelas = p.kelas; delete p.kelas; }
  if (!kls.length) { el.innerHTML = kosong('school', 'Anda belum memiliki kelas/penugasan. Hubungi Admin untuk mengatur Penugasan Guru atau wali kelas.'); return; }
  if (!kls.some(k => k.id === st.kelas)) st.kelas = kls[0].id;
  const tabs = [['harian', 'Absensi Harian'], ['rekap', 'Rekap Bulanan'], ['guru', 'Absensi Guru']];
  el.innerHTML = '<div class="ph"><div><h1>Absensi</h1><p>Absensi hanya dapat diisi pada hari efektif menurut Kaldik.</p></div></div><div class="tabs">' + tabs.map(x => '<button class="tab ' + (x[0] === st.tab ? 'on' : '') + '" data-tab="' + x[0] + '">' + x[1] + '</button>').join('') + '</div><div id="absIsi"></div>';
  $$('[data-tab]', el).forEach(b => b.onclick = () => { st.tab = b.dataset.tab; render(); });
  const box = $('#absIsi', el);
  if (st.tab === 'guru') return absensiGuru(box);
  const pilihKelas = '<select class="select" id="aKelas" style="width:auto;min-width:120px" aria-label="Kelas">' + kls.map(k => '<option value="' + k.id + '"' + (k.id === st.kelas ? ' selected' : '') + '>Kelas ' + esc(k.nama) + '</option>').join('') + '</select>';
  if (st.tab === 'rekap') {
    box.innerHTML = '<div class="tw"><div class="tbar">' + pilihKelas + '<input type="month" class="input" id="aBln" value="' + st.bulan + '" style="width:auto" aria-label="Bulan"><span class="grow"></span><button class="btn btn-secondary btn-sm" id="aCetak">' + ic('printer') + 'Cetak/PDF</button><button class="btn btn-secondary btn-sm" id="aXls">' + ic('sheet') + 'Excel</button></div><div class="tscroll" id="aMat"><div class="skel" style="height:240px;margin:16px"></div></div></div>';
    $('#aKelas', box).onchange = e => { st.kelas = e.target.value; render(); };
    $('#aBln', box).onchange = e => { st.bulan = e.target.value; render(); };
    let siap = null;
    dataAbsensi(st.kelas, st.bulan).then(m => {
      if (S.view !== 'absensi') return;
      const kd = kaldikUntuk(st.bulan + '-15'); if (kd) petaHari(kd.id_tahun);
      const [y, mo] = st.bulan.split('-').map(Number), jml = new Date(y, mo, 0).getDate(), sw = siswaAktif(st.kelas);
      const hari = []; for (let d = 1; d <= jml; d++) { const t = st.bulan + '-' + pad(d); hari.push({ t: t, d: d, e: infoHari(t, kd).efektif }); }
      const he = hari.filter(h => h.e && h.t <= hariIni()).length;
      const baris = sw.map((s, i) => { const tot = { H: 0, S: 0, I: 0, A: 0 }; const sel = hari.map(h => { const a = m[h.t + '_' + s.id]; if (a) tot[a.status]++; return h.e ? (a ? a.status : '') : '·'; }); return { s: s, sel: sel, tot: tot, pct: he ? Math.round(tot.H / he * 100) : 0, i: i }; });
      siap = { hari: hari, baris: baris, he: he };
      $('#aMat', box).innerHTML = '<table class="tbl matrix"><thead><tr><th>Nama</th>' + hari.map(h => '<th style="' + (h.e ? '' : 'background:var(--surface-2);color:var(--ink-3)') + '">' + h.d + '</th>').join('') + '<th>H</th><th>S</th><th>I</th><th>A</th><th>%</th></tr></thead><tbody>' +
        baris.map(b => '<tr><td class="nowrap">' + esc(b.s.nama) + '</td>' + b.sel.map(x => '<td class="c' + x + '">' + x + '</td>').join('') + '<td class="cH">' + b.tot.H + '</td><td class="cS">' + b.tot.S + '</td><td class="cI">' + b.tot.I + '</td><td class="cA">' + b.tot.A + '</td><td><b>' + b.pct + '</b></td></tr>').join('') + '</tbody></table><p class="small muted" style="padding:0 16px">Hari efektif s.d. hari ini: <b>' + he + '</b>. Tanda “·” = bukan hari efektif.</p>';
    }).catch(e => { $('#aMat', box).innerHTML = '<div class="alert alert-err" style="margin:16px">' + esc(e.message) + '</div>'; });
    const lap = () => { const k = judul('Kelas_Rombel', st.kelas), [y, mo] = st.bulan.split('-'); return { judul: 'Rekap Absensi Kelas ' + k + ' Bulan ' + BULAN[Number(mo) - 1] + ' ' + y, kolom: [{ l: 'No', a: 'c' }, 'Nama'].concat(siap.hari.map(h => ({ l: String(h.d), a: 'c' })), [{ l: 'H', a: 'c' }, { l: 'S', a: 'c' }, { l: 'I', a: 'c' }, { l: 'A', a: 'c' }, { l: '%', a: 'c' }]), baris: siap.baris.map(b => [b.i + 1, b.s.nama].concat(b.sel, [b.tot.H, b.tot.S, b.tot.I, b.tot.A, b.pct])) }; };
    $('#aCetak', box).onclick = () => { if (!siap) return; const d = lap(); pratinjauDokumen({ judul: d.judul, sub: 'Hari efektif: ' + siap.he, isi: tabelCetak(d.kolom, d.baris), lanskap: true, css: 'table.t{font-size:7.5pt}table.t td,table.t th{padding:1.5pt 2pt}', ttd: ['kepsek', { a: '', b: 'Wali Kelas ' + judul('Kelas_Rombel', st.kelas), n: judul('Guru_Pegawai', (rek('Kelas_Rombel', st.kelas) || {}).id_wali) }], excel: d, jenis: 'Absensi' }); };
    $('#aXls', box).onclick = e => siap && sibuk(e.currentTarget, () => { const d = lap(); return excel(d.judul, d.kolom, d.baris); });
    return;
  }
  // Harian
  const kd = kaldikUntuk(st.tgl); if (kd) petaHari(kd.id_tahun);
  const inf = infoHari(st.tgl, kd), masaDepan = st.tgl > hariIni(), hanyaLihat = isK();
  box.innerHTML = '<div class="tw"><div class="tbar">' + pilihKelas + '<input type="date" class="input" id="aTgl" value="' + st.tgl + '" max="' + hariIni() + '" style="width:auto" aria-label="Tanggal"><span class="badge ' + (inf.efektif ? 'b-success' : 'b-danger') + '">' + esc(inf.jenis) + '</span><span class="grow"></span><span id="aRing" class="row"></span></div><div id="aList"><div class="skel" style="height:300px;margin:16px"></div></div></div>';
  $('#aKelas', box).onchange = e => { st.kelas = e.target.value; render(); };
  $('#aTgl', box).onchange = e => { st.tgl = e.target.value || hariIni(); render(); };
  if (!inf.efektif || masaDepan) { $('#aList', box).innerHTML = '<div class="empty"><div class="em-ic" style="background:var(--rose);color:var(--danger)">' + ic('calendar-x') + '</div><b>' + fTglP(st.tgl) + ' — ' + esc(inf.jenis) + (inf.ket ? ': ' + esc(inf.ket) : '') + '</b><span>' + (masaDepan ? 'Absensi tidak dapat diisi untuk tanggal yang akan datang.' : 'Bukan hari efektif. Absensi tidak perlu diisi.') + '</span></div>'; ikon(); return; }
  dataAbsensi(st.kelas, st.tgl.slice(0, 7)).then(m => {
    if (S.view !== 'absensi' || st.tab !== 'harian') return;
    const sw = siswaAktif(st.kelas), sudah = sw.some(s => m[st.tgl + '_' + s.id]);
    const cur = {}; sw.forEach(s => { const a = m[st.tgl + '_' + s.id]; cur[s.id] = { status: a ? a.status : 'H', ket: a ? a.keterangan : '' }; });
    const ring = () => { const c = { H: 0, S: 0, I: 0, A: 0 }; Object.values(cur).forEach(x => c[x.status]++); $('#aRing', box).innerHTML = '<span class="badge b-success">Hadir ' + c.H + '</span><span class="badge b-warning">Sakit ' + c.S + '</span><span class="badge b-warning">Izin ' + c.I + '</span><span class="badge b-danger">Alpa ' + c.A + '</span>'; };
    if (!sw.length) { $('#aList', box).innerHTML = kosong('users', 'Belum ada siswa aktif di kelas ini.'); ikon(); return; }
    $('#aList', box).innerHTML = (sudah ? '<div class="alert alert-ok" style="margin:12px 16px 0">' + ic('circle-check') + 'Absensi tanggal ini sudah diisi. Anda masih dapat mengubahnya.</div>' : '') +
      (hanyaLihat ? '' : '<div class="row" style="padding:12px 16px"><button class="btn btn-secondary btn-sm" id="aSemua">' + ic('check-check') + 'Tandai Semua Hadir</button></div>') +
      '<div class="tscroll"><table class="tbl cards"><thead><tr><th>No</th><th>Nama Siswa</th><th>Kehadiran</th><th>Keterangan</th></tr></thead><tbody>' + sw.map((s, i) => '<tr><td data-l="No">' + (i + 1) + '</td><td data-l="Nama"><b>' + esc(s.nama) + '</b><div class="xs muted">' + esc(s.nisn) + '</div></td><td data-l="Status"><div class="seg" role="radiogroup" aria-label="Kehadiran ' + esc(s.nama) + '" data-sw="' + s.id + '">' + ['H', 'S', 'I', 'A'].map(x => '<button role="radio" aria-checked="' + (cur[s.id].status === x) + '" class="' + x + (cur[s.id].status === x ? ' on' : '') + '" data-st="' + x + '"' + (hanyaLihat ? ' disabled' : '') + ' title="' + { H: 'Hadir', S: 'Sakit', I: 'Izin', A: 'Alpa' }[x] + '">' + x + '</button>').join('') + '</div></td><td data-l="Keterangan"><input class="input" style="min-height:36px" data-ket="' + s.id + '" value="' + esc(cur[s.id].ket) + '" placeholder="Opsional"' + (hanyaLihat ? ' disabled' : '') + '></td></tr>').join('') + '</tbody></table></div>' +
      (hanyaLihat ? '' : '<div style="position:sticky;bottom:0;background:var(--surface);border-top:1px solid var(--line);padding:12px 16px;display:flex;justify-content:flex-end"><button class="btn btn-primary" id="aSimpan">' + ic('save') + 'Simpan Absensi</button></div>');
    ring(); ikon();
    $$('[data-sw]', box).forEach(sg => $$('button', sg).forEach(b => b.onclick = () => { cur[sg.dataset.sw].status = b.dataset.st; $$('button', sg).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); }); ring(); }));
    $$('[data-ket]', box).forEach(i => i.oninput = () => { cur[i.dataset.ket].ket = i.value; });
    if ($('#aSemua', box)) $('#aSemua', box).onclick = () => { Object.keys(cur).forEach(k => cur[k].status = 'H'); $$('[data-sw]', box).forEach(sg => $$('button', sg).forEach(x => { x.classList.toggle('on', x.dataset.st === 'H'); x.setAttribute('aria-checked', x.dataset.st === 'H'); })); ring(); };
    if ($('#aSimpan', box)) $('#aSimpan', box).onclick = () => {
      const items = Object.keys(cur).map(k => ({ id_siswa: k, status: cur[k].status, keterangan: cur[k].ket }));
      const kunci = st.kelas + '|' + st.tgl.slice(0, 7);
      items.forEach(x => { m[st.tgl + '_' + x.id_siswa] = { tanggal: st.tgl, id_siswa: x.id_siswa, status: x.status, keterangan: x.keterangan }; });
      S.stat = S.stat || {}; S.stat.perKelasHariIni = S.stat.perKelasHariIni || {};
      if (st.tgl === hariIni()) { const c = { H: 0, S: 0, I: 0, A: 0 }; items.forEach(x => c[x.status]++); S.stat.perKelasHariIni[st.kelas] = c; }
      Antrian.tambah({ jenis: 'absensi', fn: 'apiSimpanAbsensi', args: [st.kelas, st.tgl, items], kunci: kunci });
      toast('Absensi kelas ' + judul('Kelas_Rombel', st.kelas) + ' tersimpan.', 'ok'); renderMenu(); render();
    };
  }).catch(e => { $('#aList', box).innerHTML = '<div class="alert alert-err" style="margin:16px">' + esc(e.message) + '</div>'; });
} };
function absensiGuru(box) {
  const bln = (S.vs.abs.bulanG = S.vs.abs.bulanG || hariIni().slice(0, 7));
  box.innerHTML = (S.user.id_guru ? '<div class="card mb16 row row-sb"><div class="row" style="flex-wrap:nowrap"><span class="today-ic">' + ic('fingerprint') + '</span><div><b>Kehadiran Saya Hari Ini</b><div class="small muted" id="agHari">' + fTglP(hariIni()) + '</div></div></div><div class="row"><button class="btn btn-primary" id="agMasuk" data-busy="Mencatat…">' + ic('log-in') + 'Catat Masuk</button><button class="btn btn-secondary" id="agPulang" data-busy="Mencatat…">' + ic('log-out') + 'Catat Pulang</button></div></div>' : '') +
    '<div class="tw"><div class="tbar"><input type="month" class="input" id="agBln" value="' + bln + '" style="width:auto"><span class="grow"></span></div><div class="tscroll" id="agList"><div class="skel" style="height:200px;margin:16px"></div></div></div>';
  const muatL = async () => {
    const k = bln; if (!S.cache.absGuru[k]) S.cache.absGuru[k] = pastikan(await apiT('apiAbsensiGuruBulan', bln));
    const l = S.cache.absGuru[k].slice().sort((a, b) => a.tanggal < b.tanggal ? 1 : -1);
    $('#agList', box).innerHTML = l.length ? '<table class="tbl cards"><thead><tr><th>Tanggal</th><th>Guru</th><th>Masuk</th><th>Pulang</th><th>Status</th></tr></thead><tbody>' + l.map(a => '<tr><td data-l="Tanggal">' + fTglP(a.tanggal) + '</td><td data-l="Guru">' + esc(judul('Guru_Pegawai', a.id_guru)) + '</td><td data-l="Masuk">' + esc(a.masuk || '-') + '</td><td data-l="Pulang">' + esc(a.pulang || '-') + '</td><td data-l="Status">' + badge(a.status === 'H' ? 'Hadir' : a.status) + '</td></tr>').join('') + '</tbody></table>' : kosong('fingerprint', 'Belum ada catatan kehadiran bulan ini.');
    const hariIniRec = l.find(a => a.tanggal === hariIni() && a.id_guru === S.user.id_guru);
    if (hariIniRec && $('#agHari', box)) $('#agHari', box).innerHTML = fTglP(hariIni()) + ' · Masuk <b>' + esc(hariIniRec.masuk || '-') + '</b> · Pulang <b>' + esc(hariIniRec.pulang || '-') + '</b>';
    ikon();
  };
  muatL().catch(e => { $('#agList', box).innerHTML = '<div class="alert alert-err" style="margin:16px">' + esc(e.message) + '</div>'; });
  $('#agBln', box).onchange = e => { S.vs.abs.bulanG = e.target.value; absensiGuru(box); };
  const catat = (aksi, b) => sibuk(b, async () => { const d = pastikan(await apiT('apiAbsensiGuru', aksi)); const k = hariIni().slice(0, 7); const l = S.cache.absGuru[k] = S.cache.absGuru[k] || []; const i = l.findIndex(x => x.id === d.id); if (i > -1) l[i] = d; else l.unshift(d); toast(aksi === 'pulang' ? 'Jam pulang tercatat.' : 'Jam masuk tercatat.', 'ok'); muatL(); });
  if ($('#agMasuk', box)) { $('#agMasuk', box).onclick = e => catat('masuk', e.currentTarget); $('#agPulang', box).onclick = e => catat('pulang', e.currentTarget); }
}

/* ============================== 14. NILAI ================================= */
function bobot() { const o = { sumatif: 50, sts: 25, sas: 25 }; String(S.set.bobot_rapor || '').split(',').forEach(x => { const p = x.split(':'); if (p.length === 2 && !isNaN(Number(p[1]))) o[p[0].trim().toLowerCase()] = Number(p[1]); }); return o; }
function nilaiAkhir(rows) {
  const sm = rows.filter(n => n.jenis === 'Sumatif').map(n => angka(n.nilai)), sts = rows.find(n => n.jenis === 'STS'), sas = rows.find(n => n.jenis === 'SAS'), b = bobot();
  let t = 0, w = 0;
  if (sm.length) { t += sm.reduce((a, x) => a + x, 0) / sm.length * b.sumatif; w += b.sumatif; }
  if (sts && sts.nilai !== '') { t += angka(sts.nilai) * b.sts; w += b.sts; }
  if (sas && sas.nilai !== '') { t += angka(sas.nilai) * b.sas; w += b.sas; }
  return w ? Math.round(t / w) : null;
}
function faseKelas(idKelas) { const t = Number((rek('Kelas_Rombel', idKelas) || {}).tingkat || 1); return t <= 2 ? 'A (1-2)' : t <= 4 ? 'B (3-4)' : 'C (5-6)'; }
function daftarTP(mapel, kelas) { const l = daftar('Kurikulum_TP').filter(t => t.id_mapel === mapel && (!t.fase || t.fase === faseKelas(kelas))).sort((a, b) => angka(a.urutan) - angka(b.urutan)); return l.length ? l.map((t, i) => ({ kode: t.kode_tp || ('TP' + (i + 1)), teks: t.tp })) : ['TP1', 'TP2', 'TP3', 'TP4'].map(k => ({ kode: k, teks: '' })); }
function mapelBoleh(kelas) {
  if (isA() || isK() || ((S.cx && S.cx.kelasWali) || []).indexOf(kelas) > -1) return daftar('Mapel').slice().sort((a, b) => angka(a.urutan) - angka(b.urutan));
  const ids = ((S.cx && S.cx.mapelAjar) || {})[kelas] || [];
  return daftar('Mapel').filter(m => ids.indexOf(m.id) > -1);
}
VIEW.nilai = { layout: 'adm', judul: 'Input Nilai', crumb: 'Akademik', render(el) {
  const kls = kelasSaya();
  if (!kls.length) { el.innerHTML = kosong('school', 'Anda belum memiliki kelas/penugasan.'); return; }
  const st = S.vs.nilai = S.vs.nilai || { kelas: kls[0].id, sem: S.set.semester_aktif || 'Ganjil', mode: 'Sumatif' };
  if (!kls.some(k => k.id === st.kelas)) st.kelas = kls[0].id;
  const mp = mapelBoleh(st.kelas); if (!mp.some(m => m.id === st.mapel)) st.mapel = (mp[0] || {}).id;
  const tp = daftarTP(st.mapel, st.kelas), ro = isK();
  const raporKunci = daftar('Rapor').filter(r => r.id_kelas === st.kelas && r.semester === st.sem && ['Diajukan', 'Disetujui'].indexOf(r.status) > -1).map(r => r.id_siswa);
  el.innerHTML = '<div class="ph"><div><h1>Input Nilai</h1><p>Nilai akhir = Sumatif ' + bobot().sumatif + '% · STS ' + bobot().sts + '% · SAS ' + bobot().sas + '% (diatur di Pengaturan).</p></div><div class="row"><span class="small muted" id="nStatus">' + ic('cloud-check', 'sm') + ' Tersimpan otomatis</span></div></div>' +
    '<div class="tw"><div class="tbar"><select class="select" id="nKelas" style="width:auto">' + kls.map(k => '<option value="' + k.id + '"' + (k.id === st.kelas ? ' selected' : '') + '>Kelas ' + esc(k.nama) + '</option>').join('') + '</select>' +
    '<select class="select" id="nMapel" style="width:auto;max-width:280px">' + mp.map(m => '<option value="' + m.id + '"' + (m.id === st.mapel ? ' selected' : '') + '>' + esc(m.nama) + '</option>').join('') + '</select>' +
    '<select class="select" id="nSem" style="width:auto">' + ['Ganjil', 'Genap'].map(s => '<option' + (s === st.sem ? ' selected' : '') + '>' + s + '</option>').join('') + '</select>' +
    '<div class="seg">' + ['Sumatif', 'Formatif'].map(x => '<button class="' + (st.mode === x ? 'on x' : '') + '" data-mode="' + x + '" style="padding:0 12px">' + x + ' TP</button>').join('') + '</div><span class="grow"></span>' +
    (ro ? '' : '<button class="btn btn-secondary btn-sm" id="nTpl">' + ic('download') + 'Template</button><label class="btn btn-secondary btn-sm" for="nImp">' + ic('upload') + 'Impor</label><input type="file" id="nImp" accept=".xlsx,.xls" hidden>') + '</div>' +
    (tp[0] && !tp[0].teks ? '<div class="alert alert-info" style="margin:12px 16px 0">' + ic('info') + '<span>TP mapel ini belum disusun. Kolom TP1–TP4 dipakai sementara. Susun TP di menu <a href="javascript:void(0)" data-v="tabel" data-t="Kurikulum_TP">Kurikulum (CP/TP)</a> agar deskripsi rapor otomatis lebih tepat.</span></div>' : '') +
    '<div class="tscroll" id="nGrid"><div class="skel" style="height:300px;margin:16px"></div></div></div>';
  $('#nKelas', el).onchange = e => { st.kelas = e.target.value; render(); };
  $('#nMapel', el).onchange = e => { st.mapel = e.target.value; render(); };
  $('#nSem', el).onchange = e => { st.sem = e.target.value; render(); };
  $$('[data-mode]', el).forEach(b => b.onclick = () => { st.mode = b.dataset.mode; render(); });
  if (!st.mapel) { $('#nGrid', el).innerHTML = kosong('book-open', 'Tidak ada mapel yang ditugaskan untuk kelas ini.'); ikon(); return; }
  const kunci = st.kelas + '|' + st.sem + '|' + st.mapel;
  const muatN = S.cache.nilai[kunci] ? Promise.resolve(S.cache.nilai[kunci]) : apiT('apiNilai', st.kelas, st.sem, st.mapel).then(r => { const m = {}; pastikan(r).forEach(n => { m[n.id_siswa + '|' + n.jenis + '|' + (n.tp || '-')] = n; }); S.cache.nilai[kunci] = m; return m; });
  muatN.then(m => {
    if (S.view !== 'nilai') return;
    const sw = siswaAktif(st.kelas);
    const kol = tp.map(t => ({ jenis: st.mode, tp: t.kode, l: (st.mode === 'Sumatif' ? 'S-' : 'F-') + t.kode, judul: t.teks })).concat([{ jenis: 'STS', tp: '', l: 'STS' }, { jenis: 'SAS', tp: '', l: 'SAS' }]);
    const na = sid => nilaiAkhir(Object.keys(m).filter(k => k.indexOf(sid + '|') === 0).map(k => m[k]));
    if (!sw.length) { $('#nGrid', el).innerHTML = kosong('users', 'Belum ada siswa aktif.'); ikon(); return; }
    $('#nGrid', el).innerHTML = '<table class="tbl ngrid"><thead><tr><th>Nama Siswa</th>' + kol.map(k => '<th class="center" title="' + esc(k.judul || k.l) + '">' + esc(k.l) + '</th>').join('') + '<th class="center">Nilai Akhir</th></tr></thead><tbody>' +
      sw.map((s, ri) => { const lk = raporKunci.indexOf(s.id) > -1; return '<tr><td class="nowrap"><b>' + esc(s.nama) + '</b>' + (lk ? ' <span class="badge b-info" title="Rapor sudah diajukan/disetujui">' + ic('lock', 'sm') + '</span>' : '') + '</td>' + kol.map((k, ci) => { const n = m[s.id + '|' + k.jenis + '|' + (k.tp || '-')]; return '<td class="center"><input inputmode="numeric" aria-label="' + esc(s.nama + ' ' + k.l) + '" data-r="' + ri + '" data-c="' + ci + '" data-sid="' + s.id + '" data-j="' + k.jenis + '" data-tp="' + esc(k.tp) + '" value="' + esc(n ? n.nilai : '') + '"' + (ro || lk ? ' disabled' : '') + '></td>'; }).join('') + '<td class="center na" id="na_' + s.id + '">' + (na(s.id) === null ? '—' : na(s.id)) + '</td></tr>'; }).join('') +
      '</tbody><tfoot><tr><td>Rata-rata kelas</td>' + kol.map(k => { const v = sw.map(s => m[s.id + '|' + k.jenis + '|' + (k.tp || '-')]).filter(Boolean).map(n => angka(n.nilai)); return '<td class="center">' + (v.length ? (v.reduce((a, x) => a + x, 0) / v.length).toFixed(1) : '—') + '</td>'; }).join('') + '<td></td></tr></tfoot></table>';
    const tunda = {};
    const kirim = debounce(() => {
      const items = Object.values(tunda); if (!items.length) return; Object.keys(tunda).forEach(k => delete tunda[k]);
      Antrian.tambah({ jenis: 'nilai', fn: 'apiSimpanNilai', args: [st.kelas, st.mapel, st.sem, items], kunci: kunci });
      const s = $('#nStatus'); if (s) { s.innerHTML = ic('cloud-check', 'sm') + ' Tersimpan ' + new Date().toTimeString().slice(0, 5); ikon(); }
    }, 900);
    $$('#nGrid input', el).forEach(inp => {
      inp.oninput = () => { const v = inp.value.trim(); const bad = v !== '' && (isNaN(Number(v)) || Number(v) < 0 || Number(v) > 100); inp.classList.toggle('bad', bad); inp.title = bad ? 'Nilai harus 0–100' : ''; };
      inp.onchange = () => {
        const v = inp.value.trim(); if (v !== '' && (isNaN(Number(v)) || Number(v) < 0 || Number(v) > 100)) return toast('Nilai harus angka 0–100.', 'err');
        const key = inp.dataset.sid + '|' + inp.dataset.j + '|' + (inp.dataset.tp || '-');
        if (v === '') delete m[key]; else m[key] = { id_siswa: inp.dataset.sid, jenis: inp.dataset.j, tp: inp.dataset.tp, nilai: v };
        tunda[key] = { id_siswa: inp.dataset.sid, jenis: inp.dataset.j, tp: inp.dataset.tp, nilai: v };
        const n = na(inp.dataset.sid); $('#na_' + inp.dataset.sid, el).textContent = n === null ? '—' : n;
        const s = $('#nStatus'); if (s) s.innerHTML = '<span class="spin"></span> Menyimpan…';
        kirim();
      };
      inp.onkeydown = e => { if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); const nx = $('#nGrid input[data-r="' + (Number(inp.dataset.r) + (e.key === 'ArrowUp' ? -1 : 1)) + '"][data-c="' + inp.dataset.c + '"]', el); if (nx) { nx.focus(); nx.select(); } } };
    });
    if ($('#nTpl', el)) $('#nTpl', el).onclick = ev => sibuk(ev.currentTarget, async () => { await muat(CDN.xlsx); const aoa = [['id_siswa', 'nama'].concat(kol.map(k => k.l))].concat(sw.map(s => [s.id, s.nama].concat(kol.map(k => { const n = m[s.id + '|' + k.jenis + '|' + (k.tp || '-')]; return n ? Number(n.nilai) : ''; })))); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Nilai'); XLSX.writeFile(wb, 'Nilai_' + judul('Kelas_Rombel', st.kelas) + '_' + judul('Mapel', st.mapel).replace(/\W+/g, '_') + '.xlsx'); });
    if ($('#nImp', el)) $('#nImp', el).onchange = ev => sibuk(null, async () => { await muat(CDN.xlsx); const f = ev.target.files[0]; if (!f) return; const wb = XLSX.read(await f.arrayBuffer(), { type: 'array' }); const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, raw: false, defval: '' }); const head = rows[0]; const items = [];
      rows.slice(1).forEach(r => { const sid = r[0]; if (!sw.some(s => s.id === sid)) return; kol.forEach(k => { const i = head.indexOf(k.l); if (i < 0) return; const v = String(r[i]).trim(); if (v === '') return; if (isNaN(Number(v)) || Number(v) < 0 || Number(v) > 100) return; items.push({ id_siswa: sid, jenis: k.jenis, tp: k.tp, nilai: v }); m[sid + '|' + k.jenis + '|' + (k.tp || '-')] = { id_siswa: sid, jenis: k.jenis, tp: k.tp, nilai: v }; }); });
      if (!items.length) throw new Error('Tidak ada nilai valid yang terbaca dari berkas.');
      Antrian.tambah({ jenis: 'nilai', fn: 'apiSimpanNilai', args: [st.kelas, st.mapel, st.sem, items], kunci: kunci }); toast(items.length + ' nilai diimpor.', 'ok'); render(); });
    ikon();
  }).catch(e => { $('#nGrid', el).innerHTML = '<div class="alert alert-err" style="margin:16px">' + esc(e.message) + '</div>'; });
} };

/* ============================== 15. RAPOR ================================= */
VIEW.rapor = { layout: 'adm', judul: 'Rapor', crumb: 'Akademik', render(el) {
  const kls = (isA() || isK()) ? kelasUrut() : kelasUrut().filter(k => ((S.cx && S.cx.kelasWali) || []).indexOf(k.id) > -1);
  if (!kls.length) { el.innerHTML = kosong('award', 'Rapor diisi oleh wali kelas. Anda belum tercatat sebagai wali kelas.'); return; }
  const st = S.vs.rapor = S.vs.rapor || { kelas: kls[0].id, sem: S.set.semester_aktif || 'Ganjil', siswa: '', tab: 'nilai' };
  if (!kls.some(k => k.id === st.kelas)) st.kelas = kls[0].id;
  const kunci = st.kelas + '|' + st.sem, sw = siswaAktif(st.kelas), th = S.set.tahun_ajaran_aktif;
  if (!sw.some(s => s.id === st.siswa)) st.siswa = (sw[0] || {}).id;
  const raporDari = sid => daftar('Rapor').find(r => r.id_siswa === sid && r.semester === st.sem && (!th || !r.id_tahun || r.id_tahun === th));
  el.innerHTML = '<div class="ph"><div><h1>Rapor</h1><p>Kelas ' + esc(judul('Kelas_Rombel', st.kelas)) + ' · Semester ' + esc(st.sem) + ' · TA ' + esc((taAktif() || {}).nama || '') + '</p></div><div class="row"><select class="select" id="rKelas" style="width:auto">' + kls.map(k => '<option value="' + k.id + '"' + (k.id === st.kelas ? ' selected' : '') + '>Kelas ' + esc(k.nama) + '</option>').join('') + '</select><select class="select" id="rSem" style="width:auto">' + ['Ganjil', 'Genap'].map(s => '<option' + (s === st.sem ? ' selected' : '') + '>' + s + '</option>').join('') + '</select>' +
    (isG() ? '<button class="btn btn-primary" id="rAjukanSemua">' + ic('send') + 'Ajukan Semua (Siap)</button>' : '') + '</div></div><div id="rIsi"><div class="skel" style="height:360px"></div></div>';
  $('#rKelas', el).onchange = e => { st.kelas = e.target.value; render(); };
  $('#rSem', el).onchange = e => { st.sem = e.target.value; render(); };
  if ($('#rAjukanSemua', el)) $('#rAjukanSemua', el).onclick = () => { const ids = sw.map(s => raporDari(s.id)).filter(r => r && r.status === 'Siap').map(r => r.id); if (!ids.length) return toast('Belum ada rapor berstatus Siap. Tandai Siap dulu setelah diperiksa.', 'warn'); ajukan('Rapor', ids); };
  const muatR = S.cache.rapor[kunci] ? Promise.resolve(S.cache.rapor[kunci]) : apiT('apiDataRapor', st.kelas, st.sem).then(r => (S.cache.rapor[kunci] = pastikan(r)));
  muatR.then(D => {
    if (S.view !== 'rapor') return;
    if (!sw.length) { $('#rIsi', el).innerHTML = kosong('users', 'Belum ada siswa aktif.'); ikon(); return; }
    const s = rek('Siswa', st.siswa) || sw[0], rap = raporDari(s.id) || {}, kunciR = ['Diajukan', 'Disetujui'].indexOf(rap.status) > -1 || isK();
    const mp = daftar('Mapel').slice().sort((a, b) => angka(a.urutan) - angka(b.urutan));
    let desk = {}; try { desk = JSON.parse(rap.deskripsi || '{}'); } catch (e) { }
    const nilaiS = D.nilai.filter(n => n.id_siswa === s.id);
    const hitung = m => { const rows = nilaiS.filter(n => n.id_mapel === m.id); const na = nilaiAkhir(rows); const tpRows = rows.filter(n => n.jenis === 'Sumatif' && n.tp); let auto = '';
      if (tpRows.length) { const tps = daftarTP(m.id, st.kelas); const txt = k => ((tps.find(t => t.kode === k) || {}).teks || k); const max = tpRows.reduce((a, x) => angka(x.nilai) > angka(a.nilai) ? x : a), min = tpRows.reduce((a, x) => angka(x.nilai) < angka(a.nilai) ? x : a);
        auto = 'Ananda ' + s.nama.split(' ')[0] + ' menunjukkan penguasaan yang baik dalam ' + txt(max.tp).replace(/\.$/, '').toLowerCase() + '.' + (min.tp !== max.tp && angka(min.nilai) < angka(m.kktp || 70) ? ' Perlu bimbingan dalam ' + txt(min.tp).replace(/\.$/, '').toLowerCase() + '.' : ''); }
      return { na: na, auto: auto }; };
    const ab = D.absen[s.id] || { S: 0, I: 0, A: 0 };
    const ek = daftar('Anggota_Ekskul').filter(a => a.id_siswa === s.id && (!a.semester || a.semester === st.sem));
    const statusB = r => r ? badge(r.status) : '<span class="badge b-neutral">Belum</span>';
    $('#rIsi', el).innerHTML = '<div class="split"><div class="card" style="padding:0"><div class="pick">' + sw.map(x => { const r = raporDari(x.id); return '<button class="' + (x.id === s.id ? 'on' : '') + '" data-s="' + x.id + '"><span><b class="small">' + esc(x.nama) + '</b><br><span class="xs muted">' + esc(x.nisn) + '</span></span>' + statusB(r) + '</button>'; }).join('') + '</div></div>' +
      '<div class="card"><div class="card-h"><div><h3>' + esc(s.nama) + '</h3><div class="small muted">NISN ' + esc(s.nisn) + ' · ' + statusB(rap.status ? rap : null) + (rap.status === 'Ditolak' && rap.catatan_kepsek ? ' <span class="txt-danger small">Catatan Kepsek: ' + esc(rap.catatan_kepsek) + '</span>' : '') + '</div></div><div class="row">' +
        '<button class="btn btn-secondary btn-sm" id="rCetak">' + ic('printer') + (rap.status === 'Disetujui' ? 'Cetak Rapor' : 'Pratinjau') + '</button>' +
        (!kunciR ? '<button class="btn btn-secondary btn-sm" id="rSimpan">' + ic('save') + 'Simpan Draf</button><button class="btn btn-primary btn-sm" id="rSiap">' + ic('check') + 'Simpan & Tandai Siap</button>' : '') + '</div></div>' +
        (kunciR && !isK() ? '<div class="alert alert-info mb16">' + ic('lock') + '<span>Rapor ' + esc(rap.status) + ' dan terkunci.</span></div>' : '') +
        '<div class="tabs">' + [['nilai', 'Nilai & Deskripsi'], ['kok', 'Kokurikuler & Catatan'], ['hadir', 'Ekskul & Kehadiran']].map(x => '<button class="tab ' + (x[0] === st.tab ? 'on' : '') + '" data-tab="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>' +
        '<div data-pane="nilai"' + (st.tab !== 'nilai' ? ' hidden' : '') + '><div class="tscroll"><table class="tbl"><thead><tr><th>Mata Pelajaran</th><th class="r">NA</th><th>Capaian Kompetensi</th></tr></thead><tbody>' + mp.map(m => { const h = hitung(m), d = desk[m.id] || {}; return '<tr><td style="min-width:160px"><b class="small">' + esc(m.nama) + '</b></td><td class="r"><b' + (h.na !== null && h.na < angka(m.kktp || 70) ? ' class="txt-danger"' : '') + '>' + (h.na === null ? '—' : h.na) + '</b></td><td style="min-width:280px"><textarea class="textarea" style="min-height:64px" data-desk="' + m.id + '"' + (kunciR ? ' disabled' : '') + '>' + esc(d.d || '') + '</textarea>' + (!kunciR && h.auto ? '<button class="btn btn-ghost btn-sm" data-auto="' + m.id + '">' + ic('wand-sparkles', 'sm') + 'Isi otomatis dari TP</button>' : '') + '</td></tr>'; }).join('') + '</tbody></table></div></div>' +
        '<div data-pane="kok"' + (st.tab !== 'kok' ? ' hidden' : '') + '><div class="grid"><div class="field"><label class="label" for="rKok">Kokurikuler & Karakter (Profil Pelajar Pancasila)</label><textarea class="textarea" id="rKok"' + (kunciR ? ' disabled' : '') + '>' + esc(rap.kokurikuler || '') + '</textarea></div><div class="field"><label class="label" for="rCat">Catatan Wali Kelas</label><textarea class="textarea" id="rCat"' + (kunciR ? ' disabled' : '') + '>' + esc(rap.catatan || '') + '</textarea></div></div></div>' +
        '<div data-pane="hadir"' + (st.tab !== 'hadir' ? ' hidden' : '') + '><h4 style="margin:0 0 8px">Ekstrakurikuler</h4>' + (ek.length ? '<table class="tbl"><tbody>' + ek.map(a => '<tr><td>' + esc(judul('Ekstrakurikuler', a.id_ekskul)) + '</td><td>' + esc(a.predikat || '-') + '</td></tr>').join('') + '</tbody></table>' : '<p class="muted small">Tidak mengikuti ekstrakurikuler (atau belum dicatat di menu Anggota Ekskul).</p>') +
        '<h4 style="margin:16px 0 8px">Ketidakhadiran</h4><div class="g4"><div class="card center"><div class="stat-l">Sakit</div><div class="stat-v">' + (ab.S || 0) + '</div></div><div class="card center"><div class="stat-l">Izin</div><div class="stat-v">' + (ab.I || 0) + '</div></div><div class="card center"><div class="stat-l">Alpa</div><div class="stat-v">' + (ab.A || 0) + '</div></div><div class="card center"><div class="stat-l">Hari Efektif</div><div class="stat-v">' + D.hariEfektif + '</div></div></div><p class="xs muted">Periode ' + fTglL(D.dari) + ' – ' + fTglL(D.sampai) + ', dihitung dari absensi dan Kaldik.</p></div></div></div>';
    $$('[data-s]', el).forEach(b => b.onclick = () => { st.siswa = b.dataset.s; render(); });
    $$('[data-tab]', el).forEach(b => b.onclick = () => { st.tab = b.dataset.tab; $$('[data-tab]', el).forEach(x => x.classList.toggle('on', x === b)); $$('[data-pane]', el).forEach(p => p.hidden = p.dataset.pane !== st.tab); });
    $$('[data-auto]', el).forEach(b => b.onclick = () => { const m = rek('Mapel', b.dataset.auto); $('[data-desk="' + m.id + '"]', el).value = hitung(m).auto; });
    const kumpul = status => { const d = {}; mp.forEach(m => { d[m.id] = { na: hitung(m).na, d: ($('[data-desk="' + m.id + '"]', el) || {}).value || '' }; }); return { id: rap.id || undefined, id_siswa: s.id, id_kelas: st.kelas, id_tahun: th, semester: st.sem, deskripsi: JSON.stringify(d), kokurikuler: $('#rKok', el).value, catatan: $('#rCat', el).value, ekskul: JSON.stringify(ek.map(a => ({ n: judul('Ekstrakurikuler', a.id_ekskul), p: a.predikat }))), sakit: String(ab.S || 0), izin: String(ab.I || 0), alpa: String(ab.A || 0), hari_efektif: String(D.hariEfektif), status: status }; };
    if ($('#rSimpan', el)) $('#rSimpan', el).onclick = () => simpanRek('Rapor', kumpul('Draf'), { pesan: 'Draf rapor tersimpan.' });
    if ($('#rSiap', el)) $('#rSiap', el).onclick = () => { simpanRek('Rapor', kumpul('Siap'), { pesan: 'Rapor ditandai Siap.', tanpaRender: true }); const i = sw.findIndex(x => x.id === s.id); if (sw[i + 1]) st.siswa = sw[i + 1].id; render(); };
    $('#rCetak', el).onclick = () => cetakRapor(s, raporDari(s.id) || kumpul('Draf'), D, mp, hitung);
    ikon();
  }).catch(e => { $('#rIsi', el).innerHTML = '<div class="alert alert-err">' + esc(e.message) + '</div>'; });
} };
function cetakRapor(s, rap, D, mp, hitung) {
  let desk = {}; try { desk = JSON.parse(rap.deskripsi || '{}'); } catch (e) { }
  let ek = []; try { ek = JSON.parse(rap.ekskul || '[]'); } catch (e) { }
  const k = rek('Kelas_Rombel', s.id_kelas) || {}, ta = taAktif() || {};
  const isi = '<table class="kv" style="font-size:10.5pt;margin-bottom:8pt;width:100%"><tr><td>Nama Peserta Didik</td><td>: <b>' + esc(s.nama) + '</b></td><td>Kelas</td><td>: ' + esc(k.nama || '') + '</td></tr><tr><td>NISN / NIS</td><td>: ' + esc(s.nisn) + ' / ' + esc(s.nis || '-') + '</td><td>Semester</td><td>: ' + esc(rap.semester) + '</td></tr><tr><td>Sekolah</td><td>: ' + esc(S.set.nama_sekolah) + '</td><td>Tahun Pelajaran</td><td>: ' + esc(ta.nama || '') + '</td></tr></table>' +
    tabelCetak([{ l: 'No', a: 'c' }, 'Mata Pelajaran', { l: 'Nilai Akhir', a: 'c' }, 'Capaian Kompetensi'], mp.map((m, i) => { const d = desk[m.id] || {}; const na = d.na !== undefined && d.na !== null ? d.na : hitung(m).na; return [i + 1, m.nama, na === null ? '-' : na, d.d || '']; })) +
    '<div class="blok"><h3 style="font-size:11pt;margin:10pt 0 4pt">Kokurikuler</h3><div style="border:1px solid #000;padding:5pt;min-height:30pt">' + esc(rap.kokurikuler || '-') + '</div></div>' +
    '<div class="blok" style="display:flex;gap:10pt;margin-top:8pt"><div style="flex:1"><h3 style="font-size:11pt;margin:0 0 4pt">Ekstrakurikuler</h3>' + tabelCetak(['Kegiatan', 'Predikat'], ek.length ? ek.map(x => [x.n, x.p || '-']) : [['-', '-']]) + '</div><div style="width:40%"><h3 style="font-size:11pt;margin:0 0 4pt">Ketidakhadiran</h3>' + tabelCetak(['Keterangan', { l: 'Hari', a: 'c' }], [['Sakit', rap.sakit || 0], ['Izin', rap.izin || 0], ['Tanpa keterangan', rap.alpa || 0]]) + '</div></div>' +
    '<div class="blok"><h3 style="font-size:11pt;margin:10pt 0 4pt">Catatan Wali Kelas</h3><div style="border:1px solid #000;padding:5pt;min-height:30pt">' + esc(rap.catatan || '-') + '</div></div>';
  pratinjauDokumen({ judul: 'Laporan Hasil Belajar' + (rap.status !== 'Disetujui' ? ' (DRAF)' : ''), sub: rap.no_rapor ? 'Nomor: ' + esc(rap.no_rapor) : '', isi: isi, kertas: 'A4', jenis: 'Rapor', kodeVerif: rap.status === 'Disetujui' ? rap.kode_verif : '',
    ttd: [{ a: 'Orang Tua/Wali', b: '', n: '' }, 'kepsek', { a: '', b: 'Wali Kelas', n: judul('Guru_Pegawai', k.id_wali) }] });
}

/* ============================== 16. KEUANGAN ============================== */
VIEW.keuangan = { layout: 'adm', judul: 'Buku Kas Umum', crumb: 'Keuangan', render(el) {
  if (!S.data.Keuangan_Transaksi) { el.innerHTML = kosong('lock', 'Menu keuangan hanya untuk Bendahara, Admin, dan Kepala Sekolah.'); return; }
  const st = S.vs.keu = S.vs.keu || { bulan: hariIni().slice(0, 7), sumber: '', tab: 'bku' };
  const trxAll = daftar('Keuangan_Transaksi').filter(t => !st.sumber || t.sumber_dana === st.sumber).sort((a, b) => (a.tanggal + a.dibuat) < (b.tanggal + b.dibuat) ? -1 : 1);
  const awal = trxAll.filter(t => t.tanggal < st.bulan + '-01').reduce((s, t) => s + (t.jenis === 'Masuk' ? 1 : -1) * angka(t.jumlah), 0);
  const trx = trxAll.filter(t => String(t.tanggal).indexOf(st.bulan) === 0);
  const masuk = trx.filter(t => t.jenis === 'Masuk').reduce((s, t) => s + angka(t.jumlah), 0), keluar = trx.filter(t => t.jenis === 'Keluar').reduce((s, t) => s + angka(t.jumlah), 0);
  const sumberOpt = ['BOS Reguler', 'BOS Kinerja', 'Komite', 'APBD', 'Lainnya'];
  let isi = '';
  if (st.tab === 'bku') {
    let saldo = awal;
    isi = '<div class="g4 mb16">' + kartuStat('wallet', 'Saldo Awal', fRp(awal), 'Per 1 ' + BULAN[Number(st.bulan.slice(5)) - 1]) + kartuStat('arrow-down-left', 'Penerimaan', fRp(masuk), trx.filter(t => t.jenis === 'Masuk').length + ' transaksi', 'g') + kartuStat('arrow-up-right', 'Pengeluaran', fRp(keluar), trx.filter(t => t.jenis === 'Keluar').length + ' transaksi', 'o') + '<div class="card stat" style="background:var(--navy);color:#fff;border:0"><span class="stat-ic" style="background:rgba(255,255,255,.14);color:#fff">' + ic('landmark') + '</span><div><div class="stat-l" style="color:rgba(255,255,255,.75)">Saldo Akhir</div><div class="stat-v">' + fRp(awal + masuk - keluar) + '</div></div></div></div>' +
      '<div class="tw"><div class="tscroll"><table class="tbl cards"><thead><tr><th>Tanggal</th><th>No. Bukti</th><th>Uraian</th><th>Kode</th><th class="r">Penerimaan</th><th class="r">Pengeluaran</th><th class="r">Saldo</th><th class="act"></th></tr></thead><tbody>' +
      '<tr><td colspan="6" data-l=""><i class="muted">Saldo awal bulan</i></td><td class="r" data-l="Saldo"><b>' + fRp(awal) + '</b></td><td></td></tr>' +
      (trx.length ? trx.map(t => { saldo += (t.jenis === 'Masuk' ? 1 : -1) * angka(t.jumlah); return '<tr class="' + (t._p ? 'pending' : '') + '"><td data-l="Tanggal" class="nowrap">' + fTgl(t.tanggal) + '</td><td data-l="No. Bukti">' + esc(t.no_bukti || '…') + '</td><td data-l="Uraian">' + esc(t.uraian) + '<div class="xs muted">' + esc(t.sumber_dana) + '</div></td><td data-l="Kode">' + esc(t.id_anggaran ? (rek('Keuangan_Anggaran', t.id_anggaran) || {}).kode || '' : '') + '</td><td class="r txt-green" data-l="Penerimaan">' + (t.jenis === 'Masuk' ? fRp(t.jumlah) : '') + '</td><td class="r" data-l="Pengeluaran">' + (t.jenis === 'Keluar' ? fRp(t.jumlah) : '') + '</td><td class="r" data-l="Saldo"><b>' + fRp(saldo) + '</b></td><td class="act">' + (t.bukti ? '<button class="btn btn-ghost btn-icon btn-sm" data-pv="' + esc(t.bukti) + '" aria-label="Lihat bukti">' + ic('paperclip') + '</button>' : '') + (bisaUbah('Keuangan_Transaksi', t) ? '<button class="btn btn-ghost btn-icon btn-sm" data-ubah="' + t.id + '" aria-label="Ubah">' + ic('pencil') + '</button>' : '') + '</td></tr>'; }).join('') : '<tr><td colspan="8">' + kosong('receipt', 'Belum ada transaksi pada bulan ini.') + '</td></tr>') +
      '</tbody><tfoot><tr><td colspan="4">Jumlah</td><td class="r">' + fRp(masuk) + '</td><td class="r">' + fRp(keluar) + '</td><td class="r">' + fRp(awal + masuk - keluar) + '</td><td></td></tr></tfoot></table></div></div>';
  }
  if (st.tab === 'rkas') isi = '<div class="row row-sb mb16"><p class="small muted" style="margin:0">RKAS diajukan Bendahara dan disetujui Kepala Sekolah. Realisasi dihitung dari transaksi keluar yang memakai kode anggaran.</p>' + (isB() ? '<button class="btn btn-primary" id="kRkas">' + ic('plus') + 'Tambah Kegiatan RKAS</button>' : '') + '</div><div class="card">' + realisasiHtml() + '</div><div class="row mt16"><button class="btn btn-secondary" data-v="tabel" data-t="Keuangan_Anggaran">' + ic('table') + 'Kelola tabel RKAS & ajukan</button></div>';
  if (st.tab === 'lpj') {
    const ada = daftar('Laporan_Keuangan').find(l => l.periode === st.bulan && (l.sumber_dana || 'Semua') === (st.sumber || 'Semua'));
    isi = '<div class="card"><div class="card-h"><h3>Laporan Pertanggungjawaban ' + BULAN[Number(st.bulan.slice(5)) - 1] + ' ' + st.bulan.slice(0, 4) + ' · ' + esc(st.sumber || 'Semua sumber dana') + '</h3>' + (ada ? badge(ada.status) : '<span class="badge b-neutral">Belum dibuat</span>') + '</div>' +
      '<dl class="kv"><dt>Saldo awal</dt><dd>' + fRp(awal) + '</dd><dt>Penerimaan</dt><dd>' + fRp(masuk) + '</dd><dt>Pengeluaran</dt><dd>' + fRp(keluar) + '</dd><dt>Saldo akhir</dt><dd>' + fRp(awal + masuk - keluar) + '</dd>' + (ada && ada.catatan ? '<dt>Catatan</dt><dd>' + esc(ada.catatan) + '</dd>' : '') + '</dl>' +
      '<div class="row mt16">' + (isB() && (!ada || ['Draf', 'Ditolak'].indexOf(ada.status) > -1) ? '<button class="btn btn-primary" id="kLpj" data-busy="Mengajukan…">' + ic('send') + 'Simpan & Ajukan ke Kepala Sekolah</button>' : '') + '<button class="btn btn-secondary" id="kLpjCetak">' + ic('printer') + 'Cetak LPJ</button></div></div>';
  }
  el.innerHTML = '<div class="ph"><div><h1>Keuangan Sekolah</h1><p>Buku Kas Umum, RKAS & realisasi, serta laporan pertanggungjawaban.</p></div><div class="row"><input type="month" class="input" id="kBln" value="' + st.bulan + '" style="width:auto" aria-label="Bulan"><select class="select" id="kSum" style="width:auto"><option value="">Semua sumber dana</option>' + sumberOpt.map(s => '<option' + (s === st.sumber ? ' selected' : '') + '>' + s + '</option>').join('') + '</select>' +
    (isB() ? '<button class="btn btn-primary" id="kCatat">' + ic('plus') + 'Catat Transaksi</button>' : '') + '<button class="btn btn-secondary" id="kCetak">' + ic('printer') + 'Cetak BKU</button></div></div>' +
    '<div class="tabs">' + [['bku', 'Buku Kas Umum'], ['rkas', 'RKAS & Realisasi'], ['lpj', 'Laporan Pertanggungjawaban']].map(x => '<button class="tab ' + (x[0] === st.tab ? 'on' : '') + '" data-tab="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>' + isi;
  $$('[data-tab]', el).forEach(b => b.onclick = () => { st.tab = b.dataset.tab; render(); });
  $('#kBln', el).onchange = e => { st.bulan = e.target.value || hariIni().slice(0, 7); render(); };
  $('#kSum', el).onchange = e => { st.sumber = e.target.value; render(); };
  if ($('#kCatat', el)) $('#kCatat', el).onclick = () => bukaForm('Keuangan_Transaksi', null, { tanggal: hariIni(), sumber_dana: st.sumber || 'BOS Reguler', jenis: 'Keluar' });
  if ($('#kRkas', el)) $('#kRkas', el).onclick = () => bukaForm('Keuangan_Anggaran');
  $$('[data-ubah]', el).forEach(b => b.onclick = () => bukaForm('Keuangan_Transaksi', rek('Keuangan_Transaksi', b.dataset.ubah)));
  $$('[data-pv]', el).forEach(b => b.onclick = () => pratinjauBerkas(b.dataset.pv, 'Bukti Transaksi'));
  const bkuCetak = () => { let saldo = awal; const kolom = [{ l: 'No', a: 'c' }, 'Tanggal', 'No. Bukti', 'Uraian', 'Kode', { l: 'Penerimaan', a: 'r' }, { l: 'Pengeluaran', a: 'r' }, { l: 'Saldo', a: 'r' }]; const baris = [['', '', '', 'Saldo awal', '', '', '', fNum(awal)]].concat(trx.map((t, i) => { saldo += (t.jenis === 'Masuk' ? 1 : -1) * angka(t.jumlah); return [i + 1, fTgl(t.tanggal), t.no_bukti || '', t.uraian, t.id_anggaran ? (rek('Keuangan_Anggaran', t.id_anggaran) || {}).kode : '', t.jenis === 'Masuk' ? fNum(t.jumlah) : '', t.jenis === 'Keluar' ? fNum(t.jumlah) : '', fNum(saldo)]; })); return { kolom: kolom, baris: baris, kaki: ['', '', '', 'Jumlah', '', fNum(masuk), fNum(keluar), fNum(awal + masuk - keluar)] }; };
  const bendahara = (daftar('Users').find(u => (u.tugas_tambahan || '').indexOf('Bendahara') > -1) || {}).nama || (isB() ? S.user.nama : '');
  const ttdK = ['kepsek', { a: '', b: 'Bendahara', n: bendahara }];
  $('#kCetak', el).onclick = () => { const d = bkuCetak(); pratinjauDokumen({ judul: 'Buku Kas Umum', sub: BULAN[Number(st.bulan.slice(5)) - 1] + ' ' + st.bulan.slice(0, 4) + ' · ' + esc(st.sumber || 'Semua sumber dana'), isi: tabelCetak(d.kolom, d.baris, d.kaki), kertas: 'F4', lanskap: true, ttd: ttdK, excel: d, jenis: 'Keuangan' }); };
  if ($('#kLpjCetak', el)) $('#kLpjCetak', el).onclick = () => { const d = bkuCetak(); pratinjauDokumen({ judul: 'Laporan Pertanggungjawaban Keuangan', sub: BULAN[Number(st.bulan.slice(5)) - 1] + ' ' + st.bulan.slice(0, 4) + ' · ' + esc(st.sumber || 'Semua sumber dana'), isi: '<table class="t" style="width:60%;margin-bottom:10pt"><tr><td>Saldo awal</td><td class="r">' + fRp(awal) + '</td></tr><tr><td>Penerimaan</td><td class="r">' + fRp(masuk) + '</td></tr><tr><td>Pengeluaran</td><td class="r">' + fRp(keluar) + '</td></tr><tr><td><b>Saldo akhir</b></td><td class="r"><b>' + fRp(awal + masuk - keluar) + '</b></td></tr></table>' + tabelCetak(d.kolom, d.baris, d.kaki), kertas: 'F4', ttd: ttdK, jenis: 'Keuangan' }); };
  if ($('#kLpj', el)) $('#kLpj', el).onclick = e => sibuk(e.currentTarget, async () => {
    const ada = daftar('Laporan_Keuangan').find(l => l.periode === st.bulan && (l.sumber_dana || 'Semua') === (st.sumber || 'Semua'));
    const rec = { id: ada ? ada.id : undefined, periode: st.bulan, sumber_dana: st.sumber || 'Semua', saldo_awal: String(awal), masuk: String(masuk), keluar: String(keluar), saldo_akhir: String(awal + masuk - keluar), status: 'Draf' };
    const d = pastikan(await apiT('apiSimpan', 'Laporan_Keuangan', rec)); terapkanBaris('Laporan_Keuangan', [d]);
    const r = pastikan(await apiT('apiAksi', 'ajukan', { tabel: 'Laporan_Keuangan', ids: [d.id] })); terapkanBaris('Laporan_Keuangan', r); render(); toast('LPJ diajukan ke Kepala Sekolah.', 'ok');
  });
} };

/* ============================== 17. SURAT & DOKUMEN ======================= */
function formDisposisi(sm) {
  const staf = daftar('Users').filter(u => ['GuruKelas', 'GuruMapel', 'Admin'].indexOf(u.peran) > -1 && u.status !== 'Nonaktif');
  const m = modal({ judul: 'Disposisi Surat', isi: '<div class="card mb16" style="background:var(--bg)"><b>' + esc(sm.perihal) + '</b><div class="small muted">' + esc(sm.pengirim) + ' · No. ' + esc(sm.no_surat) + ' · ' + badge(sm.sifat) + '</div>' + (sm.file ? '<button class="btn btn-ghost btn-sm mt8" id="dpLihat">' + ic('paperclip', 'sm') + 'Lihat scan surat</button>' : '') + '</div>' +
    '<div class="grid"><div class="field"><span class="label">Kepada<span class="req">*</span></span><div class="multi" id="dpKe">' + staf.map(u => '<label><input type="checkbox" value="' + u.id + '"><span>' + esc(u.nama) + ' <span class="muted">(' + esc(PERAN_LABEL[u.peran]) + ')</span></span></label>').join('') + '</div></div>' +
    '<div class="field"><label class="label" for="dpIns">Instruksi<span class="req">*</span></label><textarea class="textarea" id="dpIns" placeholder="Contoh: Mohon ditindaklanjuti dan dilaporkan."></textarea></div>' +
    '<div class="field"><label class="label" for="dpBatas">Batas waktu</label><input class="input" type="date" id="dpBatas" value="' + esc(sm.batas_waktu || '') + '"></div></div>',
    kaki: '<button class="btn btn-ghost" data-tutup>Batal</button><button class="btn btn-primary" id="dpKirim" data-busy="Mengirim…">' + ic('send') + 'Kirim Disposisi</button>' });
  if ($('#dpLihat', m.el)) $('#dpLihat', m.el).onclick = () => pratinjauBerkas(sm.file, 'Scan Surat');
  $('#dpKirim', m.el).onclick = e => sibuk(e.currentTarget, async () => {
    const ke = $$('#dpKe input:checked', m.el).map(i => i.value), ins = $('#dpIns', m.el).value.trim();
    if (!ke.length) throw new Error('Pilih minimal satu penerima.'); if (!ins) throw new Error('Instruksi wajib diisi.');
    const d = pastikan(await apiT('apiAksi', 'disposisi', { id_surat: sm.id, kepada: ke, instruksi: ins, batas_waktu: $('#dpBatas', m.el).value }));
    terapkanBaris('Disposisi', d.disposisi); terapkanBaris('Surat_Masuk', [d.surat]); m.tutup(); renderUlang(); toast('Disposisi terkirim ke ' + ke.length + ' penerima.', 'ok');
  });
}
function formTindakLanjut(d) {
  const sm = rek('Surat_Masuk', d.id_surat) || {};
  const m = modal({ judul: 'Tindak Lanjut Disposisi', isi: '<div class="card mb16" style="background:var(--bg)"><b>' + esc(sm.perihal || 'Surat') + '</b><div class="small">' + esc(d.instruksi) + '</div><div class="xs muted">Dari ' + esc(d.dari) + (d.batas_waktu ? ' · batas ' + fTgl(d.batas_waktu) : '') + '</div>' + (sm.file ? '<button class="btn btn-ghost btn-sm mt8" id="tlLihat">' + ic('paperclip', 'sm') + 'Lihat scan surat</button>' : '') + '</div>' +
    '<form class="grid" id="tlF">' + inputField({ k: 'tindak_lanjut', l: 'Catatan tindak lanjut', t: 'textarea', req: 1 }, d.tindak_lanjut, 'tl_') + inputField({ k: 'lampiran', l: 'Lampiran (opsional)', t: 'file', folder: 'Surat_Masuk' }, d.lampiran, 'tl_') +
    '<div class="field"><label class="label" for="tlSt">Status</label><select class="select" id="tlSt"><option value="Ditindaklanjuti">Ditindaklanjuti (masih berjalan)</option><option value="Selesai">Selesai</option></select></div></form>',
    kaki: '<button class="btn btn-ghost" data-tutup>Batal</button><button class="btn btn-primary" id="tlOk">' + ic('save') + 'Simpan</button>' });
  pasangUnggah(m.el, [{ k: 'lampiran', t: 'file', folder: 'Surat_Masuk' }]);
  if ($('#tlLihat', m.el)) $('#tlLihat', m.el).onclick = () => pratinjauBerkas(sm.file);
  $('#tlOk', m.el).onclick = () => { const v = nilaiForm(m.el, [{ k: 'tindak_lanjut', t: 'textarea' }, { k: 'lampiran', t: 'file' }]); if (!v.tindak_lanjut) return toast('Catatan tindak lanjut wajib diisi.', 'err'); m.tutup(); simpanRek('Disposisi', { id: d.id, tindak_lanjut: v.tindak_lanjut, lampiran: v.lampiran, status: $('#tlSt', m.el).value }, { pesan: 'Tindak lanjut tersimpan.' }); };
}
async function verifikasiSurat(r) {
  const m = modal({ judul: 'Verifikasi Surat Keluar', ukuran: 'lg', isi: '<iframe class="preview-frame" style="height:50vh" title="Pratinjau surat"></iframe><div class="field mt16"><label class="label" for="vsCat">Catatan (wajib bila dikembalikan)</label><textarea class="textarea" id="vsCat" style="min-height:70px"></textarea></div>',
    kaki: '<button class="btn btn-danger-o" id="vsBalik" data-busy="Memproses…">' + ic('undo-2') + 'Kembalikan</button><button class="btn btn-success" id="vsOk" data-busy="Memproses…">' + ic('shield-check') + 'Verifikasi & Teruskan</button>' });
  $('iframe', m.el).srcdoc = await htmlSurat(r);
  const kirim = (terima, b) => sibuk(b, async () => { const cat = $('#vsCat', m.el).value.trim(); if (!terima && !cat) throw new Error('Isi catatan alasan pengembalian.'); const d = pastikan(await apiT('apiAksi', 'verifikasiSurat', { id: r.id, terima: terima, catatan: cat })); terapkanBaris('Surat_Keluar', [d]); m.tutup(); renderUlang(); renderMenu(); toast(terima ? 'Surat diteruskan ke Kepala Sekolah.' : 'Surat dikembalikan ke pengaju.', 'ok'); });
  $('#vsOk', m.el).onclick = e => kirim(true, e.currentTarget); $('#vsBalik', m.el).onclick = e => kirim(false, e.currentTarget);
}
async function htmlSurat(r) {
  const tp = rek('Template_Surat', r.id_template) || { isi: '(Belum memilih template)' };
  let isian = {}; try { isian = JSON.parse(r.isian || '{}'); } catch (e) { }
  const data = Object.assign({ nomor: r.no_surat || '…/…/…', tanggal: fTglL(r.tanggal), tujuan: r.tujuan, perihal: r.perihal, kepala_sekolah: S.set.kepala_sekolah, nip_kepsek: S.set.nip_kepsek, nama_sekolah: S.set.nama_sekolah }, isian);
  let isi = esc(tp.isi || ''); Object.keys(data).forEach(k => { isi = isi.split('{{' + k + '}}').join(esc(data[k] || '')); });
  return dokumen({ judul: '', isi: '<table style="width:100%;font-size:11.5pt;margin-bottom:12pt"><tr><td style="width:80px">Nomor</td><td>: ' + esc(data.nomor) + '</td><td style="text-align:right">' + esc(S.set.kota || '') + ', ' + esc(data.tanggal) + '</td></tr><tr><td>Perihal</td><td colspan="2">: <b>' + esc(r.perihal) + '</b></td></tr><tr><td>Kepada</td><td colspan="2">: ' + esc(r.tujuan) + '</td></tr></table><div style="font-size:12pt;line-height:1.6">' + isi.replace(/\n/g, '<br>') + '</div>', ttd: [{ a: '', b: 'Kepala ' + (S.set.nama_sekolah || ''), n: S.set.kepala_sekolah, nip: S.set.nip_kepsek }], kodeVerif: r.status === 'Disetujui' ? r.kode_verif : '' });
}
async function pratinjauSurat(r) { const html = await htmlSurat(r); const m = modal({ judul: 'Pratinjau Surat' + (r.status !== 'Disetujui' ? ' (draf)' : ''), ukuran: 'lg', isi: '<iframe class="preview-frame" title="Pratinjau surat"></iframe>', kaki: '<button class="btn btn-primary" id="psC">' + ic('printer') + 'Cetak</button>' }); $('iframe', m.el).srcdoc = html; $('#psC', m.el).onclick = () => cetakHtml(html); }
function unduhSurat(r, b) { return sibuk(b, async () => { const d = pastikan(await apiT('apiAksi', 'pdfSurat', { id: r.id })); unduhB64(d.b64, d.nama, d.mime); if (!r.file) { r.file = d.id; simpanSnapshot(); } }); }
async function cetakLembarDisposisi(sm) {
  const dp = daftar('Disposisi').filter(d => d.id_surat === sm.id);
  cetakHtml(await dokumen({ judul: 'Lembar Disposisi', isi: '<table class="t"><tr><td style="width:30%">Nomor Agenda</td><td>' + esc(sm.no_agenda) + '</td></tr><tr><td>Tanggal Terima</td><td>' + fTglL(sm.tgl_terima) + '</td></tr><tr><td>Nomor / Tanggal Surat</td><td>' + esc(sm.no_surat) + ' / ' + fTglL(sm.tgl_surat) + '</td></tr><tr><td>Pengirim</td><td>' + esc(sm.pengirim) + '</td></tr><tr><td>Perihal</td><td>' + esc(sm.perihal) + '</td></tr><tr><td>Sifat</td><td>' + esc(sm.sifat) + '</td></tr><tr><td>Batas Waktu</td><td>' + fTglL(sm.batas_waktu) + '</td></tr></table>' +
    '<h3 style="font-size:11pt;margin:12pt 0 4pt">Diteruskan kepada / Instruksi</h3>' + tabelCetak([{ l: 'No', a: 'c' }, 'Kepada', 'Instruksi', 'Batas', 'Paraf / Tindak Lanjut'], dp.length ? dp.map((d, i) => [i + 1, judul('Users', d.kepada), d.instruksi, fTgl(d.batas_waktu), d.tindak_lanjut || '']) : [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]), ttd: [{ a: '', b: 'Kepala ' + (S.set.nama_sekolah || ''), n: S.set.kepala_sekolah, nip: S.set.nip_kepsek }] }));
}
function resetSandi(u, b) { return sibuk(b, async () => { if (!await konfirmasi('Reset kata sandi ' + u.nama + '? Kata sandi lama tidak berlaku lagi.', { ok: 'Reset' })) return; const d = pastikan(await apiT('apiAksi', 'resetSandi', { id: u.id })); tampilkanSandi([d]); }); }

/* ============================== 18. PERSETUJUAN =========================== */
VIEW.persetujuan = { layout: 'adm', judul: 'Persetujuan', crumb: 'Laporan', render(el) {
  const st = S.vs.setuju = S.vs.setuju || { f: 'Semua', i: 0 };
  const semua = tugasPersetujuan(), jenis = ['Semua'].concat(semua.map(x => x.jenis).filter((v, i, a) => a.indexOf(v) === i));
  const l = semua.filter(x => st.f === 'Semua' || x.jenis === st.f); if (st.i >= l.length) st.i = 0;
  const x = l[st.i];
  el.innerHTML = '<div class="ph"><div><h1>' + (isK() ? 'Persetujuan Kepala Sekolah' : 'Verifikasi & Usulan') + '</h1><p>' + semua.length + ' dokumen menunggu tindakan Anda.</p></div></div>' +
    (semua.length ? '<div class="split"><div class="card" style="padding:0"><div class="row" style="padding:12px">' + jenis.map(j => '<button class="chip ' + (j === st.f ? 'on' : '') + '" data-f="' + esc(j) + '">' + esc(j) + '</button>').join('') + '</div><div class="pick">' + l.map((y, i) => '<button class="' + (i === st.i ? 'on' : '') + '" data-i="' + i + '"><span><span class="badge b-info">' + esc(y.jenis) + '</span><br><b class="small">' + esc(y.judul) + '</b><br><span class="xs muted">oleh ' + esc(y.rows[0].oleh || y.rows[0].pengaju || '-') + ' · ' + esc(String(y.rows[0].diubah || '').slice(0, 16)) + '</span></span>' + ic('chevron-right') + '</button>').join('') + '</div></div>' +
      '<div class="card" id="psDet"></div></div>' : kosong('party-popper', 'Tidak ada dokumen yang menunggu. Semua sudah ditangani.'));
  $$('[data-f]', el).forEach(b => b.onclick = () => { st.f = b.dataset.f; st.i = 0; render(); });
  $$('[data-i]', el).forEach(b => b.onclick = () => { st.i = Number(b.dataset.i); render(); });
  if (!x) return;
  const det = $('#psDet', el), r = x.rows[0];
  let isi = '';
  if (x.tabel === 'Rapor') isi = '<div class="tscroll"><table class="tbl"><thead><tr><th>Siswa</th><th class="r">Rata-rata NA</th><th>Catatan Wali</th></tr></thead><tbody>' + x.rows.map(rp => { let d = {}; try { d = JSON.parse(rp.deskripsi || '{}'); } catch (e) { } const v = Object.values(d).map(z => z.na).filter(z => z !== null && z !== undefined); return '<tr><td>' + esc(judul('Siswa', rp.id_siswa)) + '</td><td class="r">' + (v.length ? (v.reduce((a, b) => a + angka(b), 0) / v.length).toFixed(1) : '-') + '</td><td class="small">' + esc(String(rp.catatan || '').slice(0, 90)) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  else if (x.tabel === 'Surat_Keluar') isi = '<iframe class="preview-frame" style="height:52vh" title="Pratinjau surat"></iframe>';
  else if (x.tabel === 'Kaldik_Tahun') { petaHari(r.id_tahun); const rk = rekapKaldik(r); isi = '<dl class="kv"><dt>Periode</dt><dd>' + fTglL(r.tgl_awal) + ' – ' + fTglL(r.tgl_akhir) + '</dd><dt>Hari sekolah</dt><dd>' + esc(r.hari_sekolah) + ' hari</dd><dt>Hari efektif</dt><dd>' + rk.total + ' (Ganjil ' + rk.smt.Ganjil.e + ', Genap ' + rk.smt.Genap.e + ')</dd><dt>Tanggal khusus</dt><dd>' + daftar('Kaldik_Hari').filter(h => h.id_tahun === r.id_tahun).length + ' hari</dd></dl><button class="btn btn-secondary mt16" id="psKal">' + ic('calendar-range') + 'Lihat Kaldik Lengkap</button>'; }
  else isi = '<dl class="kv">' + S.schema[x.tabel].fields.filter(f => f.t !== 'json' && r[f.k]).map(f => '<dt>' + esc(f.l) + '</dt><dd>' + sel(f, r) + '</dd>').join('') + '</dl>' + (x.tabel === 'Keuangan_Anggaran' ? '' : '');
  det.innerHTML = '<div class="card-h"><div><span class="badge b-info">' + esc(x.jenis) + '</span><h3 class="mt8">' + esc(x.judul) + '</h3></div></div>' + isi +
    '<div class="field mt16"><label class="label" for="psCat">Catatan ' + (x.usulan ? '' : '(wajib bila ditolak)') + '</label><textarea class="textarea" id="psCat" style="min-height:70px"></textarea></div>' +
    '<div class="grid mt16" style="grid-template-columns:1fr 1fr"><button class="btn btn-danger-o" id="psTolak" data-busy="Memproses…">' + ic('x') + (x.verif ? 'Kembalikan' : 'Tolak') + '</button><button class="btn btn-success" id="psOk" data-busy="Memproses…">' + ic('check') + (x.verif ? 'Verifikasi & Teruskan' : x.tabel === 'Kaldik_Tahun' ? 'Sahkan' : 'Setujui') + '</button></div>';
  if (x.tabel === 'Surat_Keluar') htmlSurat(r).then(h => { const f = $('iframe', det); if (f) f.srcdoc = h; });
  if ($('#psKal', det)) $('#psKal', det).onclick = () => { S.vs.kaldik = { id: r.id, mode: 'tahunan', tab: 'kalender' }; buka('kaldik'); };
  const putus = (setuju, b) => sibuk(b, async () => {
    const cat = $('#psCat', det).value.trim();
    if (!setuju && !cat && !x.usulan) throw new Error('Isi catatan alasan penolakan.');
    let d;
    if (x.usulan) { d = pastikan(await apiT('apiAksi', 'setujuiUsulan', { id: r.id, terima: setuju })); terapkanBaris('Kaldik_Kegiatan', [d.usulan]); if (d.hari) { const l = S.data.Kaldik_Hari = daftar('Kaldik_Hari'); d.hari.forEach(h => { const i = l.findIndex(z => z.id === h.id); if (i > -1) l[i] = h; else l.push(h); }); } }
    else if (x.verif) { d = pastikan(await apiT('apiAksi', 'verifikasiSurat', { id: r.id, terima: setuju, catatan: cat })); terapkanBaris('Surat_Keluar', [d]); }
    else { d = pastikan(await apiT('apiAksi', setuju ? 'setujui' : 'tolak', { tabel: x.tabel, ids: x.ids, catatan: cat })); terapkanBaris(x.tabel, d); }
    renderMenu(); render(); toast(setuju ? 'Disetujui.' : 'Dikembalikan/ditolak.', 'ok');
  });
  $('#psOk', det).onclick = e => putus(true, e.currentTarget); $('#psTolak', det).onclick = e => putus(false, e.currentTarget);
} };

/* ============================== 19. PUSAT LAPORAN ========================= */
function laporanTabel(t, kolomK, filter, urut) {
  const sc = S.schema[t]; const f = kolomK.map(k => sc.fields.find(x => x.k === k)).filter(Boolean);
  let l = daftar(t).filter(filter || (() => true)); if (urut) l = l.slice().sort(urut);
  return { kolom: [{ l: 'No', a: 'c' }].concat(f.map(x => ({ l: x.l, a: x.t === 'money' || x.t === 'number' ? 'r' : '' }))), baris: l.map((r, i) => [i + 1].concat(f.map(x => sel(x, r, 1)))) };
}
const LAPORAN = [
  { g: 'Siswa', ic: 'users', l: [
    { id: 'siswaKelas', j: 'Daftar Siswa per Kelas', p: ['kelas'], f: p => laporanTabel('Siswa', ['nisn', 'nis', 'nama', 'jk', 'tempat_lahir', 'tgl_lahir', 'agama', 'nama_ibu'], r => r.status === 'Aktif' && (!p.kelas || r.id_kelas === p.kelas), urutNama) },
    { id: 'bukuInduk', j: 'Buku Induk Siswa', p: ['kelas'], kertas: 'F4', lanskap: 1, f: p => laporanTabel('Siswa', ['nis', 'nisn', 'nama', 'jk', 'tempat_lahir', 'tgl_lahir', 'agama', 'alamat', 'nama_ayah', 'nama_ibu', 'pekerjaan_ortu', 'tgl_masuk', 'status'], r => !p.kelas || r.id_kelas === p.kelas, urutNama) },
    { id: 'mutasi', j: 'Laporan Mutasi Siswa', f: () => laporanTabel('Mutasi_Siswa', ['tanggal', 'id_siswa', 'jenis', 'sekolah', 'alasan', 'no_surat']) },
    { id: 'kenaikan', j: 'Riwayat Kenaikan & Kelulusan', f: () => laporanTabel('Anggota_Rombel', ['id_siswa', 'id_kelas', 'id_tahun', 'status_akhir']) },
    { id: 'alumni', j: 'Data Alumni', f: () => laporanTabel('Alumni', ['nama', 'tahun_lulus', 'sekolah_lanjutan', 'kontak']) }] },
  { g: 'Guru', ic: 'graduation-cap', l: [
    { id: 'guru', j: 'Data Guru & Pegawai', lanskap: 1, f: () => laporanTabel('Guru_Pegawai', ['nama', 'nip', 'jk', 'jabatan', 'status_pegawai', 'pendidikan', 'hp', 'email'], r => r.status !== 'Nonaktif', urutNama) },
    { id: 'tugas', j: 'Pembagian Tugas Mengajar', f: () => laporanTabel('Penugasan_Guru', ['id_guru', 'id_mapel', 'id_kelas', 'jam']) },
    { id: 'wali', j: 'Daftar Wali Kelas', f: () => laporanTabel('Kelas_Rombel', ['nama', 'id_wali', 'ruang']) },
    { id: 'tgsTambahan', j: 'Tugas Tambahan Guru', f: () => laporanTabel('Users', ['nama', 'peran', 'tugas_tambahan'], r => r.tugas_tambahan) }] },
  { g: 'Akademik', ic: 'book-open', l: [
    { id: 'jadwal', j: 'Jadwal Pelajaran', p: ['kelas'], f: p => laporanTabel('Jadwal', ['hari', 'jam_ke', 'mulai', 'selesai', 'id_mapel', 'id_guru', 'id_kelas'], r => !p.kelas || r.id_kelas === p.kelas, (a, b) => (['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].indexOf(a.hari) - ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].indexOf(b.hari)) || (angka(a.jam_ke) - angka(b.jam_ke))) },
    { id: 'leger', j: 'Leger Nilai Akhir (Rekap Hasil Belajar)', p: ['kelas', 'semester'], wajib: ['kelas'], lanskap: 1, async: async p => { const D = pastikan(await apiT('apiDataRapor', p.kelas, p.semester)); const mp = daftar('Mapel').slice().sort((a, b) => angka(a.urutan) - angka(b.urutan)); const sw = siswaAktif(p.kelas); const rows = sw.map((s, i) => { const na = mp.map(m => nilaiAkhir(D.nilai.filter(n => n.id_siswa === s.id && n.id_mapel === m.id))); const v = na.filter(x => x !== null); return [i + 1, s.nama].concat(na.map(x => x === null ? '' : x), [v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) : '']); }); const rata = rows.map(r => angka(r[r.length - 1])); const rk = rata.map(x => rata.filter(y => y > x).length + 1); rows.forEach((r, i) => r.push(rata[i] ? rk[i] : '')); return { kolom: [{ l: 'No', a: 'c' }, 'Nama'].concat(mp.map(m => ({ l: m.kode, a: 'c' })), [{ l: 'Rata', a: 'c' }, { l: 'Rank', a: 'c' }]), baris: rows }; } },
    { id: 'jurnal', j: 'Jurnal Mengajar', p: ['bulan'], f: p => laporanTabel('Jurnal_Mengajar', ['tanggal', 'id_guru', 'id_kelas', 'id_mapel', 'materi', 'kegiatan'], r => !p.bulan || String(r.tanggal).indexOf(p.bulan) === 0) },
    { id: 'prestasi', j: 'Pencapaian & Prestasi', f: () => laporanTabel('Prestasi', ['tanggal', 'jenis', 'nama_pemilik', 'lomba', 'tingkat', 'juara', 'penyelenggara'], null, (a, b) => a.tanggal < b.tanggal ? 1 : -1) }] },
  { g: 'Kaldik & Absensi', ic: 'calendar-days', l: [
    { id: 'kaldik', j: 'Kalender Pendidikan Resmi (F4)', khusus: () => { const kd = kaldikUntuk(hariIni()); if (!kd) return toast('Belum ada Kaldik.', 'warn'); S.vs.kaldik = { id: kd.id, mode: 'tahunan', tab: 'kalender' }; buka('kaldik'); setTimeout(() => { const b = $('#kdCetak'); if (b) b.click(); }, 50); } },
    { id: 'hariEfektif', j: 'Rekap Hari & Minggu Efektif', f: () => { const kd = kaldikUntuk(hariIni()); if (!kd) return { kolom: ['Bulan'], baris: [] }; petaHari(kd.id_tahun); const rk = rekapKaldik(kd); return { kolom: ['Bulan', { l: 'Hari Efektif', a: 'c' }, { l: 'Minggu Efektif', a: 'c' }, { l: 'Hari Libur', a: 'c' }], baris: bulanRentang(kd).map(x => { const k = x[0] + '-' + pad(x[1] + 1), r = rk.per[k] || { e: 0, w: {}, l: 0 }; return [BULAN[x[1]] + ' ' + x[0], r.e, Object.keys(r.w).length, r.l]; }), kaki: ['Jumlah', rk.total, Object.keys(rk.smt.Ganjil.w).length + Object.keys(rk.smt.Genap.w).length, rk.smt.Ganjil.l + rk.smt.Genap.l] }; } },
    { id: 'absHarian', j: 'Absensi Harian Kelas', p: ['kelas', 'tanggal'], wajib: ['kelas'], async: async p => { const m = await dataAbsensi(p.kelas, p.tanggal.slice(0, 7)); const sw = siswaAktif(p.kelas); return { kolom: [{ l: 'No', a: 'c' }, 'Nama', 'NISN', { l: 'Status', a: 'c' }, 'Keterangan'], baris: sw.map((s, i) => { const a = m[p.tanggal + '_' + s.id]; return [i + 1, s.nama, s.nisn, a ? a.status : '-', a ? a.keterangan : '']; }) }; } },
    { id: 'absBulan', j: 'Absensi Bulanan Kelas', khusus: () => { S.vs.abs = Object.assign(S.vs.abs || {}, { tab: 'rekap' }); buka('absensi'); } },
    { id: 'absSemester', j: 'Rekap Absensi Semester', p: ['kelas', 'semester'], wajib: ['kelas'], async: async p => { const D = pastikan(await apiT('apiDataRapor', p.kelas, p.semester)); return { kolom: [{ l: 'No', a: 'c' }, 'Nama', { l: 'Hadir', a: 'c' }, { l: 'Sakit', a: 'c' }, { l: 'Izin', a: 'c' }, { l: 'Alpa', a: 'c' }, { l: '% Hadir', a: 'c' }], baris: siswaAktif(p.kelas).map((s, i) => { const a = D.absen[s.id] || { H: 0, S: 0, I: 0, A: 0 }; return [i + 1, s.nama, a.H, a.S, a.I, a.A, D.hariEfektif ? Math.round(a.H / D.hariEfektif * 100) : '']; }), sub: 'Hari efektif: ' + D.hariEfektif }; } }] },
  { g: 'Keuangan', ic: 'wallet', need: 'AKB', l: [
    { id: 'bku', j: 'Buku Kas Umum (BKU)', khusus: () => { S.vs.keu = Object.assign(S.vs.keu || {}, { tab: 'bku' }); buka('keuangan'); } },
    { id: 'realisasi', j: 'Realisasi RKAS', lanskap: 1, f: () => { const keluar = {}; daftar('Keuangan_Transaksi').forEach(t => { if (t.jenis === 'Keluar' && t.id_anggaran) keluar[t.id_anggaran] = (keluar[t.id_anggaran] || 0) + angka(t.jumlah); }); const l = daftar('Keuangan_Anggaran'); return { kolom: [{ l: 'No', a: 'c' }, 'Tahun', 'Sumber', 'Kode', 'Uraian', { l: 'Pagu', a: 'r' }, { l: 'Realisasi', a: 'r' }, { l: 'Sisa', a: 'r' }, { l: '%', a: 'c' }, 'Status'], baris: l.map((a, i) => [i + 1, a.tahun, a.sumber_dana, a.kode, a.uraian, fNum(a.pagu), fNum(keluar[a.id] || 0), fNum(angka(a.pagu) - (keluar[a.id] || 0)), angka(a.pagu) ? Math.round((keluar[a.id] || 0) / angka(a.pagu) * 100) : 0, a.status]) }; } },
    { id: 'lpj', j: 'Laporan Pertanggungjawaban', khusus: () => { S.vs.keu = Object.assign(S.vs.keu || {}, { tab: 'lpj' }); buka('keuangan'); } },
    { id: 'bukti', j: 'Daftar Bukti Transaksi', p: ['bulan'], f: p => laporanTabel('Keuangan_Transaksi', ['tanggal', 'no_bukti', 'jenis', 'sumber_dana', 'uraian', 'jumlah', 'pajak'], r => !p.bulan || String(r.tanggal).indexOf(p.bulan) === 0, (a, b) => a.tanggal < b.tanggal ? -1 : 1) }] },
  { g: 'Surat & Dokumen', ic: 'mail', l: [
    { id: 'agendaMasuk', j: 'Buku Agenda Surat Masuk', p: ['tahun'], lanskap: 1, f: p => laporanTabel('Surat_Masuk', ['no_agenda', 'tgl_terima', 'no_surat', 'tgl_surat', 'pengirim', 'perihal', 'sifat', 'status'], r => !p.tahun || String(r.tgl_terima).indexOf(p.tahun) === 0, (a, b) => a.no_agenda < b.no_agenda ? -1 : 1) },
    { id: 'agendaKeluar', j: 'Buku Agenda Surat Keluar', p: ['tahun'], lanskap: 1, f: p => laporanTabel('Surat_Keluar', ['no_surat', 'tanggal', 'tujuan', 'perihal', 'pengaju', 'status'], r => r.status === 'Disetujui' && (!p.tahun || String(r.tanggal).indexOf(p.tahun) === 0), (a, b) => a.tanggal < b.tanggal ? -1 : 1) },
    { id: 'ekspedisi', j: 'Buku Ekspedisi', f: () => laporanTabel('Ekspedisi', ['tgl_kirim', 'id_surat', 'cara', 'penerima']) },
    { id: 'rekapDisp', j: 'Rekap Disposisi', lanskap: 1, f: () => laporanTabel('Disposisi', ['id_surat', 'kepada', 'instruksi', 'batas_waktu', 'status', 'tgl_selesai', 'tindak_lanjut']) },
    { id: 'terlambat', j: 'Surat Terlambat Ditindaklanjuti', f: () => laporanTabel('Disposisi', ['id_surat', 'kepada', 'instruksi', 'batas_waktu', 'status'], r => r.status !== 'Selesai' && r.batas_waktu && r.batas_waktu < hariIni()) },
    { id: 'arsip', j: 'Daftar Arsip Dokumen', f: () => laporanTabel('Arsip_Dokumen', ['kategori', 'judul', 'nomor', 'tanggal', 'tahun_ajaran']) }] },
  { g: 'Sarpras & Perpustakaan', ic: 'package', l: [
    { id: 'inv', j: 'Daftar Inventaris Barang', kertas: 'F4', lanskap: 1, f: () => laporanTabel('Inventaris', ['kode', 'nama', 'kategori', 'merk', 'tahun', 'sumber', 'jumlah', 'kondisi', 'lokasi']) },
    { id: 'invPinjam', j: 'Peminjaman Barang', f: () => laporanTabel('Peminjaman_Inventaris', ['id_barang', 'peminjam', 'tgl_pinjam', 'tgl_kembali', 'status']) },
    { id: 'invHapus', j: 'Penghapusan Barang', f: () => laporanTabel('Penghapusan_Inventaris', ['id_barang', 'tanggal', 'alasan', 'no_ba']) },
    { id: 'buku', j: 'Koleksi Buku Perpustakaan', f: () => laporanTabel('Buku_Perpustakaan', ['kode', 'judul', 'pengarang', 'penerbit', 'tahun', 'kategori', 'jumlah', 'rak']) },
    { id: 'pinjamBuku', j: 'Peminjaman & Pengembalian Buku', p: ['bulan'], f: p => laporanTabel('Peminjaman_Buku', ['id_buku', 'peminjam', 'tgl_pinjam', 'jatuh_tempo', 'tgl_kembali'], r => !p.bulan || String(r.tgl_pinjam).indexOf(p.bulan) === 0) }] },
  { g: 'Kegiatan', ic: 'party-popper', l: [
    { id: 'kegiatan', j: 'Agenda Kegiatan Sekolah', f: () => laporanTabel('Kegiatan_Sekolah', ['tanggal', 'nama', 'tempat', 'penanggung_jawab', 'status'], null, (a, b) => a.tanggal < b.tanggal ? -1 : 1) },
    { id: 'ekskul', j: 'Ekstrakurikuler & Anggota', f: () => laporanTabel('Anggota_Ekskul', ['id_ekskul', 'id_siswa', 'semester', 'predikat'], null, (a, b) => String(a.id_ekskul).localeCompare(String(b.id_ekskul))) }] }
];
VIEW.laporan = { layout: 'adm', judul: 'Pusat Laporan', crumb: 'Laporan', render(el) {
  const st = S.vs.lap = S.vs.lap || { g: 0 };
  const grup = LAPORAN.filter(g => !g.need || punya(g.need));
  if (st.g >= grup.length) st.g = 0; const g = grup[st.g];
  el.innerHTML = '<div class="ph"><div><h1>Pusat Laporan</h1><p>Semua laporan dibaca langsung dari database. Cetak dengan kop resmi, unduh PDF (otomatis diarsipkan), atau ekspor Excel.</p></div><button class="btn btn-secondary" data-v="tabel" data-t="Arsip_Laporan">' + ic('folder-archive') + 'Arsip Laporan</button></div>' +
    '<div class="split"><div class="card" style="padding:0"><div class="pick">' + grup.map((x, i) => '<button class="' + (i === st.g ? 'on' : '') + '" data-g="' + i + '"><span class="row" style="flex-wrap:nowrap">' + ic(x.ic) + '<b class="small">' + esc(x.g) + '</b></span><span class="badge b-neutral">' + x.l.length + '</span></button>').join('') + '</div></div>' +
    '<div class="g2" style="align-content:start">' + g.l.map(r => '<div class="card"><div class="row" style="flex-wrap:nowrap;align-items:flex-start"><span class="li-ic">' + ic('file-text') + '</span><div class="grow"><b>' + esc(r.j) + '</b><div class="xs muted">' + (r.kertas || 'A4') + (r.lanskap ? ' lanskap' : '') + (r.p ? ' · parameter: ' + r.p.join(', ') : '') + '</div></div></div><button class="btn btn-secondary btn-sm mt16" data-r="' + r.id + '">' + ic('file-output') + 'Buat Laporan</button></div>').join('') + '</div></div>';
  $$('[data-g]', el).forEach(b => b.onclick = () => { st.g = Number(b.dataset.g); render(); });
  $$('[data-r]', el).forEach(b => b.onclick = () => buatLaporan(g.l.find(r => r.id === b.dataset.r)));
} };
function buatLaporan(def) {
  if (def.khusus) return def.khusus();
  const prm = def.p || [], kls = kelasSaya();
  const jalankan = async p => {
    const d = def.async ? await def.async(p) : def.f(p);
    let sub = []; if (p.kelas) sub.push('Kelas ' + judul('Kelas_Rombel', p.kelas)); if (p.semester) sub.push('Semester ' + p.semester); if (p.bulan) sub.push(BULAN[Number(p.bulan.slice(5)) - 1] + ' ' + p.bulan.slice(0, 4)); if (p.tanggal) sub.push(fTglP(p.tanggal)); if (p.tahun) sub.push('Tahun ' + p.tahun); sub.push('TA ' + ((taAktif() || {}).nama || '')); if (d.sub) sub.push(d.sub);
    const ttd = p.kelas ? ['kepsek', { a: '', b: 'Wali Kelas ' + judul('Kelas_Rombel', p.kelas), n: judul('Guru_Pegawai', (rek('Kelas_Rombel', p.kelas) || {}).id_wali) }] : ['kepsek'];
    pratinjauDokumen({ judul: def.j, sub: esc(sub.join(' · ')), isi: tabelCetak(d.kolom, d.baris, d.kaki), kertas: def.kertas || 'A4', lanskap: def.lanskap, excel: d, jenis: def.j, ttd: ttd, css: def.lanskap ? 'table.t{font-size:8.5pt}' : '' });
  };
  if (!prm.length) return sibuk(null, () => jalankan({}));
  const m = modal({ judul: def.j, ukuran: 'sm', isi: '<div class="grid">' + prm.map(p => p === 'kelas' ? '<div class="field"><label class="label" for="lpKelas">Kelas' + ((def.wajib || []).indexOf('kelas') > -1 ? '<span class="req">*</span>' : '') + '</label><select class="select" id="lpKelas">' + ((def.wajib || []).indexOf('kelas') > -1 ? '' : '<option value="">Semua kelas</option>') + kls.map(k => '<option value="' + k.id + '">' + esc(k.nama) + '</option>').join('') + '</select></div>'
    : p === 'semester' ? '<div class="field"><label class="label" for="lpSem">Semester</label><select class="select" id="lpSem">' + ['Ganjil', 'Genap'].map(s => '<option' + (s === S.set.semester_aktif ? ' selected' : '') + '>' + s + '</option>').join('') + '</select></div>'
    : p === 'bulan' ? '<div class="field"><label class="label" for="lpBln">Bulan</label><input type="month" class="input" id="lpBln" value="' + hariIni().slice(0, 7) + '"></div>'
    : p === 'tanggal' ? '<div class="field"><label class="label" for="lpTgl">Tanggal</label><input type="date" class="input" id="lpTgl" value="' + hariIni() + '"></div>'
    : '<div class="field"><label class="label" for="lpThn">Tahun</label><input class="input" id="lpThn" inputmode="numeric" value="' + hariIni().slice(0, 4) + '"></div>').join('') + '</div>',
    kaki: '<button class="btn btn-ghost" data-tutup>Batal</button><button class="btn btn-primary" id="lpGo" data-busy="Menyusun…">' + ic('file-output') + 'Tampilkan</button>' });
  $('#lpGo', m.el).onclick = e => sibuk(e.currentTarget, async () => { const v = id => ($('#' + id, m.el) || {}).value; const p = { kelas: v('lpKelas'), semester: v('lpSem'), bulan: v('lpBln'), tanggal: v('lpTgl'), tahun: v('lpThn') }; Object.keys(p).forEach(k => { if (p[k] === undefined) delete p[k]; }); if ((def.wajib || []).some(k => !p[k])) throw new Error('Lengkapi parameter wajib.'); m.tutup(); await jalankan(p); });
}

/* ============================== 20. PENGATURAN & MIGRASI ================== */
VIEW.pengaturan = { layout: 'adm', judul: 'Pengaturan', crumb: 'Pengaturan', render(el) {
  if (!isA()) { el.innerHTML = kosong('lock', 'Hanya Admin/Operator.'); return; }
  const tab = S.vs.atur || 'sekolah', s = S.set;
  const tabs = [['sekolah', 'Identitas Sekolah'], ['akademik', 'Tahun Ajaran & Penilaian'], ['akun', 'Akun Siswa & Orang Tua'], ['sistem', 'Backup & Log'], ['migrasi', 'Migrasi Data']];
  let isi = '';
  const fld = (k, l, o) => '<div class="field' + (o && o.span ? ' span2' : '') + '"><label class="label" for="st_' + k + '">' + l + '</label>' + (o && o.ta ? '<textarea class="textarea" id="st_' + k + '" data-set="' + k + '">' + esc(s[k] || '') + '</textarea>' : o && o.opts ? '<select class="select" id="st_' + k + '" data-set="' + k + '">' + o.opts.map(x => '<option value="' + esc(x[0]) + '"' + (String(s[k]) === String(x[0]) ? ' selected' : '') + '>' + esc(x[1]) + '</option>').join('') + '</select>' : '<input class="input" id="st_' + k + '" data-set="' + k + '" value="' + esc(s[k] || '') + '"' + (o && o.ph ? ' placeholder="' + esc(o.ph) + '"' : '') + '>') + (o && o.help ? '<span class="help">' + o.help + '</span>' : '') + '</div>';
  if (tab === 'sekolah') isi = '<div class="card"><div class="row mb16"><img src="' + logoUrl() + '" alt="Logo" style="width:72px;height:72px;object-fit:contain"><div class="grow"><b>Logo sekolah</b><div class="small muted">Dipakai di website, aplikasi, dan kop laporan.</div></div><label class="btn btn-secondary btn-sm" for="stLogo">' + ic('upload') + 'Ganti Logo</label><input type="file" id="stLogo" accept="image/png,image/jpeg" hidden></div>' +
    '<div class="fgrid">' + fld('nama_sekolah', 'Nama sekolah') + fld('npsn', 'NPSN') + fld('akreditasi', 'Akreditasi') + fld('kepala_sekolah', 'Nama Kepala Sekolah') + fld('nip_kepsek', 'NIP Kepala Sekolah') + fld('alamat', 'Alamat', { span: 1 }) + fld('kecamatan', 'Kecamatan') + fld('kota', 'Kota') + fld('telepon', 'Telepon') + fld('email', 'Email sekolah') +
    fld('dinas', 'Kop baris 1', { ph: 'PEMERINTAH KOTA TEGAL' }) + fld('dinas2', 'Kop baris 2', { ph: 'DINAS PENDIDIKAN DAN KEBUDAYAAN' }) + fld('tagline', 'Slogan website', { span: 1 }) + fld('jam_layanan', 'Jam layanan') + fld('maps_embed', 'URL embed Google Maps', { help: 'Google Maps → Bagikan → Sematkan peta → salin URL di atribut src.' }) + fld('sosmed_ig', 'Instagram (URL)') + fld('sosmed_fb', 'Facebook (URL)') + fld('sosmed_yt', 'YouTube (URL)') +
    fld('web_app_url', 'Alamat website aplikasi', { span: 1, help: 'Alamat halaman aplikasi (GitHub Pages/Vercel/Blogger), mis. https://sdnslerok2.github.io/sis/. Dipakai untuk QR verifikasi dokumen dan tautan di email.' }) + '</div><div class="row mt16" style="justify-content:flex-end"><button class="btn btn-primary" id="stSimpan" data-busy="Menyimpan…">' + ic('save') + 'Simpan Pengaturan</button></div></div>';
  if (tab === 'akademik') isi = '<div class="card"><div class="fgrid">' + fld('tahun_ajaran_aktif', 'Tahun ajaran aktif', { opts: daftar('Tahun_Ajaran').map(t => [t.id, t.nama]) }) + fld('semester_aktif', 'Semester aktif', { opts: [['Ganjil', 'Ganjil'], ['Genap', 'Genap']] }) + fld('hari_sekolah', 'Hari sekolah default', { opts: [['6', '6 hari (Senin–Sabtu)'], ['5', '5 hari (Senin–Jumat)']] }) + fld('bobot_rapor', 'Bobot nilai rapor', { help: 'Format: sumatif:50,sts:25,sas:25' }) + '</div><div class="row mt16" style="justify-content:space-between"><button class="btn btn-secondary" data-v="tabel" data-t="Tahun_Ajaran">' + ic('calendar-range') + 'Kelola Tahun Ajaran</button><button class="btn btn-primary" id="stSimpan" data-busy="Menyimpan…">' + ic('save') + 'Simpan</button></div></div>';
  if (tab === 'akun') {
    const kls = kelasUrut(), pilih = S.vs.akunKelas || (kls[0] || {}).id, users = daftar('Users');
    isi = '<div class="tw"><div class="tbar"><select class="select" id="akKelas" style="width:auto">' + kls.map(k => '<option value="' + k.id + '"' + (k.id === pilih ? ' selected' : '') + '>Kelas ' + esc(k.nama) + '</option>').join('') + '</select><span class="grow"></span><button class="btn btn-primary btn-sm" id="akBuat" data-busy="Membuat akun…">' + ic('user-plus') + 'Buat Akun Massal</button></div>' +
      '<div class="tscroll"><table class="tbl cards"><thead><tr><th>Nama Siswa</th><th>NISN</th><th>Akun Siswa</th><th>Akun Orang Tua</th><th class="act"></th></tr></thead><tbody>' + siswaAktif(pilih).map(sw => { const a = users.find(u => u.username === sw.nisn), o = users.find(u => u.username === 'ot-' + sw.nisn) || users.find(u => u.peran === 'OrangTua' && String(u.id_siswa_terkait || '').split(',').indexOf(sw.id) > -1);
        return '<tr><td data-l="Nama"><b>' + esc(sw.nama) + '</b></td><td data-l="NISN" class="num">' + esc(sw.nisn) + '</td><td data-l="Akun Siswa">' + (a ? badge(a.status) : '<span class="badge b-neutral">Belum dibuat</span>') + '</td><td data-l="Akun Ortu">' + (o ? badge(o.status) + ' <code class="xs">' + esc(o.username) + '</code>' + (String(o.id_siswa_terkait).split(',').length > 1 ? ' <span class="badge b-info">' + String(o.id_siswa_terkait).split(',').length + ' anak</span>' : '') : '<span class="badge b-neutral">Belum dibuat</span>') + '</td><td class="act">' + (a ? '<button class="btn btn-ghost btn-sm" data-rs="' + a.id + '">' + ic('key-round', 'sm') + 'Reset Siswa</button>' : '') + (o ? '<button class="btn btn-ghost btn-sm" data-rs="' + o.id + '">' + ic('key-round', 'sm') + 'Reset Ortu</button><button class="btn btn-ghost btn-sm" data-taut="' + o.id + '">' + ic('link', 'sm') + 'Tautkan Anak</button>' : '') + '</td></tr>'; }).join('') + '</tbody></table></div></div>' +
      '<div class="alert alert-info mt16">' + ic('info') + '<span>Username siswa = NISN; orang tua = <code>OT-NISN</code> anak. Kata sandi awal acak dan hanya tampil sekali — langsung cetak dan bagikan melalui wali kelas.</span></div>';
  }
  if (tab === 'sistem') isi = '<div class="g2"><div class="card"><div class="card-h"><h3>' + ic('database-backup') + ' Backup Database</h3></div><p class="small muted">Backup otomatis berjalan tiap Minggu pukul 02.00: seluruh tabel Supabase diekspor ke spreadsheet di folder Drive <code>Backup</code> (8 minggu terakhir disimpan).</p><dl class="kv"><dt>Backup terakhir</dt><dd>' + esc(s.backup_terakhir || 'Belum pernah') + '</dd></dl><button class="btn btn-primary mt16" id="syBackup" data-busy="Mencadangkan…">' + ic('database-backup') + 'Jalankan Backup Sekarang</button></div>' +
    '<div class="card"><div class="card-h"><h3>' + ic('wrench') + ' Pemeliharaan</h3></div><p class="small muted">Periksa apakah semua tabel & kolom sudah ada di Supabase. Bila ada yang kurang, jalankan ulang SETUP_SUPABASE.sql (data lama aman).</p><div class="row"><button class="btn btn-secondary" id="sySkema" data-busy="Memeriksa…">' + ic('table-properties') + 'Periksa Database</button><button class="btn btn-secondary" id="syCache">' + ic('eraser') + 'Bersihkan Cache Perangkat Ini</button></div><p class="xs muted mt16">Versi aplikasi: ' + esc(S.versi || '1.0.0') + '</p></div></div>' +
    '<div class="tw mt16"><div class="tbar"><b>Log Aktivitas</b><div class="search">' + ic('search') + '<input class="input" id="syQ" placeholder="Cari di log…"></div><button class="btn btn-secondary btn-sm" id="syMuat" data-busy="Memuat…">' + ic('refresh-cw') + 'Muat</button></div><div class="tscroll" id="syLog">' + kosong('scroll-text', 'Klik Muat untuk menampilkan 500 aktivitas terbaru.') + '</div></div>';
  if (tab === 'migrasi') isi = '<div class="card"><div class="alert alert-info mb16">' + ic('info') + '<span>Impor data dari spreadsheet lain (mis. aplikasi lama). Sumber <b>hanya dibaca</b>. Kolom dicocokkan berdasarkan <b>nama header</b> dan nama sheet harus sama dengan tabel tujuan. Aman dijalankan berulang (tanpa data ganda).</span></div>' +
    '<div class="field"><label class="label" for="mgSrc">URL atau ID spreadsheet sumber</label><input class="input" id="mgSrc" placeholder="https://docs.google.com/spreadsheets/d/…"></div>' +
    '<div class="field mt16"><span class="label">Tabel yang diimpor</span><div class="multi" id="mgT">' + Object.keys(S.schema).filter(t => !S.schema[t].besar || t === 'Absensi_Siswa' || t === 'Nilai').filter(t => ['Log_Aktivitas', 'Nomor_Dokumen'].indexOf(t) < 0).map(t => '<label><input type="checkbox" value="' + t + '"><span>' + esc(S.schema[t].label) + '</span></label>').join('') + '</div></div>' +
    '<label class="row small mt16"><input type="checkbox" id="mgTimpa"> Timpa data yang sudah ada (default: hanya menambah data baru)</label>' +
    '<div class="row mt16"><button class="btn btn-secondary" id="mgScan" data-busy="Memindai…">' + ic('scan-search') + 'Pindai (Dry-run)</button><button class="btn btn-primary" id="mgGo" data-busy="Mengimpor…">' + ic('database-zap') + 'Jalankan Impor</button></div><div id="mgHasil" class="mt16"></div></div>';
  el.innerHTML = '<div class="ph"><div><h1>Pengaturan</h1><p>Identitas sekolah, tahun ajaran, akun, backup, dan migrasi data.</p></div><button class="btn btn-secondary" data-v="tabel" data-t="Users">' + ic('user-cog') + 'Pengguna & Peran</button></div>' +
    '<div class="tabs">' + tabs.map(x => '<button class="tab ' + (x[0] === tab ? 'on' : '') + '" data-tab="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>' + isi;
  $$('[data-tab]', el).forEach(b => b.onclick = () => { S.vs.atur = b.dataset.tab; render(); });
  if ($('#stSimpan', el)) $('#stSimpan', el).onclick = e => sibuk(e.currentTarget, async () => { const p = {}; $$('[data-set]', el).forEach(i => p[i.dataset.set] = i.value.trim()); const d = pastikan(await apiT('apiAksi', 'simpanPengaturan', p)); S.set = d; simpanSnapshot(); siapkanAdmin(); toast('Pengaturan tersimpan.', 'ok'); });
  if ($('#stLogo', el)) $('#stLogo', el).onchange = e => sibuk(null, async () => { const f = e.target.files[0]; if (!f) return; const d = await unggah(f, 'Template', true); const r = pastikan(await apiT('apiAksi', 'simpanPengaturan', { logo_id: d.id, logo_kustom: 'Ya' })); S.set = r; simpanSnapshot(); siapkanAdmin(); render(); toast('Logo diperbarui.', 'ok'); });
  if ($('#akKelas', el)) $('#akKelas', el).onchange = e => { S.vs.akunKelas = e.target.value; render(); };
  if ($('#akBuat', el)) $('#akBuat', el).onclick = e => sibuk(e.currentTarget, async () => { const k = $('#akKelas', el).value; if (!await konfirmasi('Buat akun siswa dan orang tua untuk semua siswa kelas ' + judul('Kelas_Rombel', k) + ' yang belum punya akun?', { ok: 'Buat Akun' })) return; const d = pastikan(await apiT('apiAksi', 'akunMassal', { id_kelas: k })); S.data.Users = d.users; simpanSnapshot(); render(); if (d.daftar.length) tampilkanSandi(d.daftar.map(x => ({ nama: x.nama + ' (' + x.jenis + ')', username: x.username, sandi: x.sandi }))); else toast('Semua siswa di kelas ini sudah memiliki akun.', 'info'); });
  $$('[data-rs]', el).forEach(b => b.onclick = () => resetSandi(rek('Users', b.dataset.rs), b));
  $$('[data-taut]', el).forEach(b => b.onclick = () => bukaForm('Users', rek('Users', b.dataset.taut)));
  if ($('#syBackup', el)) $('#syBackup', el).onclick = e => sibuk(e.currentTarget, async () => { const d = pastikan(await apiT('apiAksi', 'backup', {})); S.set.backup_terakhir = d.waktu; render(); toast('Backup selesai: ' + d.berkas.length + ' berkas.', 'ok'); });
  if ($('#sySkema', el)) $('#sySkema', el).onclick = e => sibuk(e.currentTarget, async () => { const d = pastikan(await apiT('apiAksi', 'sinkronSkema', {})); toast(d.pesan ? d.pesan + ' (' + d.sheetBaru.concat(d.kolomBaru).join('; ') + ')' : 'Database lengkap: semua tabel dan kolom sudah ada.', d.pesan ? 'warn' : 'ok'); });
  if ($('#syCache', el)) $('#syCache', el).onclick = async () => { if (await konfirmasi('Hapus data cache di perangkat ini dan muat ulang dari server?')) { store.del('snap'); store.del('pub'); S.cache = { abs: {}, nilai: {}, rapor: {}, img: {}, absGuru: {} }; await sibuk(null, () => muatBootstrap()); render(); toast('Cache dibersihkan.', 'ok'); } };
  if ($('#syMuat', el)) $('#syMuat', el).onclick = e => sibuk(e.currentTarget, async () => { const d = pastikan(await apiT('apiAksi', 'log', { cari: $('#syQ', el).value })); $('#syLog', el).innerHTML = d.length ? '<table class="tbl cards"><thead><tr><th>Waktu</th><th>Pengguna</th><th>Modul</th><th>Aksi</th><th>Keterangan</th></tr></thead><tbody>' + d.map(r => '<tr><td data-l="Waktu" class="nowrap">' + esc(r.waktu) + '</td><td data-l="Pengguna">' + esc(r.pengguna) + '</td><td data-l="Modul">' + esc(r.modul) + '</td><td data-l="Aksi">' + esc(r.aksi) + '</td><td data-l="Ket">' + esc(r.keterangan) + '</td></tr>').join('') + '</tbody></table>' : kosong('scroll-text', 'Tidak ada log.'); ikon(); });
  const migrasi = (dry, b) => sibuk(b, async () => {
    const src = $('#mgSrc', el).value.trim(), tabel = $$('#mgT input:checked', el).map(i => i.value);
    if (!src) throw new Error('Isi URL/ID spreadsheet sumber.'); if (!tabel.length) throw new Error('Pilih minimal satu tabel.');
    if (!dry && !await konfirmasi('Jalankan impor ke database aplikasi? Disarankan Pindai dulu.', { ok: 'Impor' })) return;
    const d = pastikan(await apiT('apiImpor', { sumber: src, tabel: tabel, dryRun: dry, timpa: $('#mgTimpa', el).checked }));
    $('#mgHasil', el).innerHTML = '<div class="alert ' + (dry ? 'alert-info' : 'alert-ok') + '">' + ic(dry ? 'scan-search' : 'circle-check') + '<span>' + (dry ? 'Hasil pindai (belum ada yang ditulis)' : 'Impor selesai') + ' dari <b>' + esc(d.sumber.nama) + '</b>.</span></div><table class="tbl mt16"><thead><tr><th>Tabel</th><th class="r">Di sumber</th><th class="r">Ditambah</th><th class="r">Diperbarui</th><th class="r">Dilewati</th></tr></thead><tbody>' + Object.keys(d.laporan).map(k => '<tr><td>' + esc((S.schema[k] || {}).label || k) + '</td><td class="r">' + d.laporan[k].sumber + '</td><td class="r">' + d.laporan[k].ditambah + '</td><td class="r">' + d.laporan[k].diperbarui + '</td><td class="r">' + d.laporan[k].dilewati + '</td></tr>').join('') + '</tbody></table>' + (d.peringatan.length ? '<div class="alert alert-warn mt16">' + ic('triangle-alert') + '<span>' + d.peringatan.slice(0, 20).map(esc).join('<br>') + '</span></div>' : '');
    ikon(); if (!dry) await muatBootstrap();
  });
  if ($('#mgScan', el)) { $('#mgScan', el).onclick = e => migrasi(true, e.currentTarget); $('#mgGo', el).onclick = e => migrasi(false, e.currentTarget); }
} };

/* ============================== 21. EVENT GLOBAL & BOOT =================== */
document.addEventListener('click', e => {
  const go = e.target.closest('[data-go]');
  if (go) { e.preventDefault(); const v = go.dataset.go; if (v === 'masuk' && S.token && S.user) { masukAplikasi(); return; } buka(v); return; }
  const be = e.target.closest('[data-berita]'); if (be) { buka('berita-detail', { id: be.dataset.berita }); return; }
  const lb = e.target.closest('[data-lb]'); if (lb) { lightbox(pub().galeri.slice(0, 8), Number(lb.dataset.lb)); return; }
  const v = e.target.closest('[data-v]');
  if (v && (v.closest('#adm') || v.closest('.modal'))) { e.preventDefault(); const p = {}; if (v.dataset.t) p.t = v.dataset.t; if (v.dataset.kelas) p.kelas = v.dataset.kelas; if (v.closest('.modal')) { const bg = v.closest('.mbg'); if (bg) bg.remove(); } buka(v.dataset.v, p); return; }
  const act = e.target.closest('[data-act]');
  if (act) { const a = act.dataset.act; if (a === 'keluar') keluar(); if (a === 'ke-web') buka('beranda'); if (a === 'ganti-sandi') gantiSandi(false); }
  if (e.target.closest('[data-close-drawer]') || e.target.id === 'pubDrawer') $('#pubDrawer').hidden = true;
});
$('#pubBurger').onclick = () => { $('#pubDrawer').hidden = false; ikon(); };
$('#btnSide').onclick = () => { if (window.innerWidth >= 1024) { $('#adm').classList.toggle('mini'); store.set('mini', $('#adm').classList.contains('mini')); } else { $('#side').classList.add('open'); $('#sideDim').hidden = false; } };
$('#sideDim').onclick = tutupSide;
$('#sideNav').addEventListener('click', e => { const b = e.target.closest('.nav-i'); if (!b) return; buka(b.dataset.v, b.dataset.t ? { t: b.dataset.t } : {}); });
$('#btnTema').onclick = () => { const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', t); store.set('tema', t); $('#btnTema').innerHTML = ic(t === 'dark' ? 'sun' : 'moon'); ikon(); if (S.view === 'dashboard') renderUlang(); };
$('#btnNotif').onclick = bukaNotif;
$('#btnMe').onclick = bukaProfil;
document.addEventListener('visibilitychange', () => {
  if (document.hidden || !S.token) return;
  if (Antrian.items.length) { Antrian.proses(); return; }
  if (Date.now() - S.sinkronTerakhir > 3 * 60 * 1000) muatBootstrap(true).catch(() => { });
});
window.addEventListener('online', () => Antrian.proses());
window.addEventListener('beforeunload', e => { if (Antrian.items.length) { e.preventDefault(); e.returnValue = ''; } });

async function muatPublik(rerender) {
  try {
    const r = await api('apiPublik');
    if (r.success) { const lama = JSON.stringify(S.pub); S.pub = r.data; store.set('pub', r.data); if (rerender && VIEW[S.view] && VIEW[S.view].layout === 'pub' && lama !== JSON.stringify(r.data) && !(document.activeElement && /INPUT|TEXTAREA/.test(document.activeElement.tagName))) renderUlang(); }
  } catch (e) { if (!S.pub) toast('Gagal memuat data website: ' + e.message, 'err'); }
}
function bacaParamUrl() {
  try { const p = new URLSearchParams(location.search), o = {}; p.forEach((v, k) => { o[k] = v; }); return Promise.resolve(o); } catch (e) { return Promise.resolve({}); }
}
(async function boot() {
  $('.boot-logo').innerHTML = '<img src="' + LOGO + '" alt="" style="width:100%;height:100%;padding:8px">';
  $('#pubLogo').src = LOGO;
  renderMenuPub();
  if (store.get('mini')) $('#adm').classList.add('mini');
  Antrian.muat();
  S.pub = store.get('pub');
  S.token = window.SB && SB.punyaSesi() ? store.get('token', true) : null;
  if (!window.SB || !SB.siap) document.body.insertAdjacentHTML('beforeend', '<div class="cfg-warn" role="alert">⚙️ Aplikasi belum dikonfigurasi: isi SUPABASE_URL, SUPABASE_ANON_KEY, dan GAS_URL di <b>js/config.js</b> (lihat README).</div>');
  const snap = S.token ? store.get('snap', true) : null;
  const prm = await Promise.race([bacaParamUrl(), new Promise(r => setTimeout(() => r({}), 600))]);
  if (prm.verif) { buka('verifikasi', { kode: String(prm.verif) }, { tanpaRiwayat: true }); muatPublik(false); return; }
  if (S.token && snap && snap.user) {
    // Buka instan dari snapshot, lalu segarkan di latar belakang
    S.user = snap.user; S.cx = snap.cx; S.data = snap.data || {}; S.schema = snap.schema || {}; S.set = snap.set || {}; S.stat = snap.stat;
    masukAplikasi();
    muatBootstrap(true).then(ok => { if (ok) Antrian.proses(); }).catch(e => toast('Mode offline: ' + e.message, 'warn'));
    muatPublik(false);
    return;
  }
  if (S.token) {
    try { if (await muatBootstrap()) { masukAplikasi(); Antrian.proses(); muatPublik(false); return; } } catch (e) { }
    S.token = null; store.del('token');
  }
  buka('beranda', {}, { tanpaRiwayat: true });
  await muatPublik(true);
  if (S.view === 'beranda') renderUlang();
})();
