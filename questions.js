/* =====================================================================
   BANK SOAL PANTAU
   30 soal per bagian (mengenal & menyikapi), bahasa sehari-hari anak SMP.

   Tipe soal:
   - pg    : pilihan ganda 1 jawaban     { o: 4 opsi, a: indeks benar }
   - multi : pilih 3 jawaban benar       { o: 5 opsi, a: [3 indeks] }
   - urut  : urutkan 4 langkah           { items: 4 teks SUDAH urut benar }
   - jodoh : jodohkan 4 pasangan         { pairs: [{kiri, kanan}] }

   `story` opsional, `e` = penjelasan jawaban.
   ===================================================================== */

window.QUESTION_BANK = {
  mengenal: [
    {
      id: 'mg01', t: 'pg',
      story: 'Pas jam istirahat, kamu denger temen-temen ngobrolin kasus bullying yang lagi rame di sekolah.',
      q: 'Sebenernya, bullying alias perundungan itu apa sih?',
      o: [
        'Bercandaan seru yang cuma kejadian sekali, habis itu udah.',
        'Perilaku yang sengaja buat nyakitin orang, dilakuin berulang, dan pelakunya ngerasa lebih kuat.',
        'Peraturan sekolah biar murid yang bandel kapok.',
        'Permainan yang seru asal semua orang ikut ketawa.'
      ],
      a: 1,
      e: 'Bullying itu sengaja, berulang, dan ada ketimpangan kekuatan. Tiga-tiganya harus ada.'
    },
    {
      id: 'mg02', t: 'pg',
      story: 'Di sekolah kadang ada anak yang ngerasa paling jago dan bebas ngapa-ngapain.',
      q: 'Kekuatan apa yang biasanya dipakai pelaku buat nge-bully?',
      o: [
        'Nilai ulangannya paling kecil di kelas.',
        'Badan lebih gede, punya geng, atau uang jajan lebih banyak.',
        'Duduk paling depan, deket meja guru.',
        'Jarang ikut kegiatan ekskul.'
      ],
      a: 1,
      e: 'Kekuatan bully bisa fisik, sosial, status, atau ekonomi.'
    },
    {
      id: 'mg03', t: 'pg',
      story: 'Dua temen saling ledek pas istirahat. Dua-duanya ketawa, gak ada yang baper.',
      q: 'Kenapa itu masih masuk candaan sehat?',
      o: [
        'Soalnya dilihat banyak anak di kantin.',
        'Karena gak ada niat nyakitin, sama-sama nyaman, dan bisa berhenti kapan aja.',
        'Karena yang ngeledek kakak kelas.',
        'Karena ledekannya lewat HP.'
      ],
      a: 1,
      e: 'Candaan sehat itu setara, gak ada yang tersinggung, dan bisa berhenti kalau diminta.'
    },
    {
      id: 'mg04', t: 'pg',
      story: 'Temenmu tiap hari dipanggil julukan jelek. Dia udah bilang “jangan gitu, aku gak suka”, tapi pelakunya tetap lanjut.',
      q: 'Dari cerita itu, apa yang bikin jelas ini bullying?',
      o: [
        'Cuma kejadian sekali pas lagi gabut.',
        'Dilakuin terus-terusan dan tetap dilanjutin walau udah diminta berhenti.',
        'Biar korban makin semangat sekolah.',
        'Udah disetujui ketua kelas.'
      ],
      a: 1,
      e: 'Berulang plus tetap jalan walau diminta berhenti = bullying, bukan iseng.'
    },
    {
      id: 'mg05', t: 'pg',
      story: 'Di lorong, ada anak yang sengaja dijegal sampai jatuh dan bukunya berserakan.',
      q: 'Itu jenis bullying apa?',
      o: ['Verbal', 'Fisik', 'Sosial (pengucilan)', 'Siber'],
      a: 1,
      e: 'Nyentuh atau nyakitin badan = bullying fisik.'
    },
    {
      id: 'mg06', t: 'pg',
      story: 'Sekelompok anak hobi manggil nama orang tua temennya pakai nada ngatain, tiap ketemu di kelas.',
      q: 'Ngatain lewat kata-kata kayak gitu disebut…',
      o: ['Bullying verbal', 'Bullying fisik', 'Cyberbullying', 'Pengucilan'],
      a: 0,
      e: 'Hinaan lewat kata atau julukan = bullying verbal.'
    },
    {
      id: 'mg07', t: 'pg',
      story: 'Ada anak baru yang sengaja dijauhin. Satu kelas gak boleh ngajak dia ngobrol karena dianggap aneh.',
      q: 'Ini termasuk…',
      o: [
        'Bullying fisik',
        'Bullying sosial (pengucilan)',
        'Cyberbullying',
        'Bullying verbal'
      ],
      a: 1,
      e: 'Ngejauhin dan ngecualiin orang = bullying sosial atau relasional.'
    },
    {
      id: 'mg08', t: 'pg',
      story: 'Ada akun anonim yang posting foto editan jelek temen sekelas. Caption-nya ngehina fisik, biar ditonton satu sekolah.',
      q: 'Kasus kayak gitu namanya…',
      o: ['Cyberbullying', 'Bullying fisik', 'Candaan online biasa', 'Konflik biasa'],
      a: 0,
      e: 'Pakai akun medsos buat ngerendahin = cyberbullying.'
    },
    {
      id: 'mg09', t: 'pg',
      story: 'Temenmu yang sering dibully jadi murung, mager sekolah, dan tiap pagi ngeluh sakit kepala.',
      q: 'Itu tanda dampak apa?',
      o: [
        'Dia makin pede dan pinter.',
        'Stres, cemas, plus gangguan kesehatan mental dan fisik.',
        'Dia makin semangat ikut lomba.',
        'Dia jadi lebih mandiri.'
      ],
      a: 1,
      e: 'Bullying nyerang mental, dan efeknya bisa kelihatan di badan juga.'
    },
    {
      id: 'mg10', t: 'pg',
      story: 'Ada yang bilang, “korban bully sih pantes, dia kan aneh.”',
      q: 'Faktanya gimana?',
      o: [
        'Bullying itu salah korban.',
        'Bullying bukan salah korban. Semua orang berhak diperlakuin baik.',
        'Korban emang suka digituin.',
        'Biarin aja, biar mentalnya kuat.'
      ],
      a: 1,
      e: 'Gak ada alasan yang bikin bullying jadi bener. Salah pelaku, bukan korban.'
    },
    {
      id: 'mg11', t: 'multi',
      q: 'Pilih TIGA hal yang wajib ada biar satu kejadian bisa disebut bullying.',
      o: [
        'Ada niat sengaja buat nyakitin atau ngerendahin.',
        'Ketidaksengajaan, cuma sekali seumur hidup.',
        'Kejadiannya berulang.',
        'Ada ketimpangan kekuatan: pelaku di atas, korban susah ngelawan.',
        'Dilakuin demi seru-seruan bareng.'
      ],
      a: [0, 2, 3],
      e: 'Sengaja, berulang, dan ada ketimpangan kekuatan. Itu tiga syarat utamanya.'
    },
    {
      id: 'mg12', t: 'multi',
      q: 'Pilih TIGA hal yang bikin pelaku ngerasa “punya kuasa” buat nge-bully.',
      o: [
        'Badan lebih gede atau tenaga lebih kuat.',
        'Punya geng banyak atau terkenal di sekolah.',
        'Suka nolongin orang dan rendah hati.',
        'Status sosial atau uang lebih yang bikin dia songong.',
        'Rajin belajar di perpus.'
      ],
      a: [0, 1, 3],
      e: 'Fisik, popularitas, dan status atau uang sering disalahgunain jadi alat nindas.'
    },
    {
      id: 'mg13', t: 'multi',
      q: 'Pilih TIGA contoh bullying fisik atau verbal.',
      o: [
        'Nendang, mukul, atau nyubit temen dengan sengaja.',
        'Ngatain fisik temen pakai sebutan kasar.',
        'Ngajak anak baru gabung kelompok piket.',
        'Ngerusak barang temen dengan sengaja.',
        'Minjemin pensil pas ulangan.'
      ],
      a: [0, 1, 3],
      e: 'Mukul, ngerusak barang, dan ngatain fisik itu bullying. Nolongin orang bukan.'
    },
    {
      id: 'mg14', t: 'multi',
      q: 'Pilih TIGA contoh cyberbullying.',
      o: [
        'Nge-chat ngatain lewat DM atau grup WA terus-terusan.',
        'Nyebar foto aib temen ke medsos biar dia malu.',
        'Ngucapin selamat ulang tahun di kolom komentar.',
        'Bikin stiker WA pakai muka temen buat diejekin.',
        'Download materi pelajaran dari web sekolah.'
      ],
      a: [0, 1, 3],
      e: 'Teror chat, nyebar foto aib, dan stiker ejekan itu semua cyberbullying.'
    },
    {
      id: 'mg15', t: 'multi',
      q: 'Pilih TIGA contoh bullying sosial alias pengucilan.',
      o: [
        'Sengaja ngejauhin dan gak ngasih temen ikut main.',
        'Nyebar gosip jelek biar satu kelas benci dia.',
        'Nemenin temen yang makan sendirian di kantin.',
        'Sengaja bikin dia malu di depan kelompok.',
        'Bagi tugas kelompok dengan adil.'
      ],
      a: [0, 1, 3],
      e: 'Ngejauhin, nyebar gosip, dan bikin malu di depan orang = bullying sosial.'
    },
    {
      id: 'mg16', t: 'multi',
      q: 'Pilih TIGA dampak negatif yang biasanya kena ke korban bullying.',
      o: [
        'Sering cemas, takut berlebihan, atau stres berat.',
        'Nilai turun karena susah fokus belajar.',
        'Makin pede dan aktif di kelas.',
        'Sering sakit kepala atau sakit perut tiap mau sekolah.',
        'Langganan juara kelas.'
      ],
      a: [0, 1, 3],
      e: 'Mental, nilai, dan badan bisa kena semua. Itu kenapa bullying gak boleh dibiarin.'
    },
    {
      id: 'mg17', t: 'multi',
      q: 'Pilih TIGA peran yang biasa ada di sekitar kasus bullying.',
      o: [
        'Korban, yang disakiti.',
        'Pelaku, yang ngerjain.',
        'Pembela korban (upstander), yang berani nolong.',
        'Wasit pertandingan bola.',
        'Tukang kebun sekolah.'
      ],
      a: [0, 1, 2],
      e: 'Korban, pelaku, dan pembela. Saksi juga ada, dan perannya penting banget.'
    },
    {
      id: 'mg18', t: 'multi',
      q: 'Pilih TIGA ciri yang nunjukin itu candaan sehat, bukan bullying.',
      o: [
        'Semua yang ikut ketawa sama-sama nyaman.',
        'Kalau ada yang bilang “stop”, langsung berhenti.',
        'Gak ada yang ngerasa direndahin atau ditekan.',
        'Candaan dilanjutin terus walau temen udah gak nyaman.',
        'Pelakunya ngerasa paling berkuasa setelah ngejek.'
      ],
      a: [0, 1, 2],
      e: 'Candaan sehat itu setara, bisa berhenti, dan gak ada yang jadi korban.'
    },
    {
      id: 'mg19', t: 'urut',
      q: 'Urutkan cara ngenalin ciri bullying, dari yang paling dasar sampai kesimpulan.',
      items: [
        'Tindakan sengaja dilakukan buat bikin orang lain sakit hati.',
        'Kejadiannya berulang, bukan cuma sekali.',
        'Ada ketimpangan kekuatan antara pelaku dan korban.',
        'Kalau ketiganya ada, itu memenuhi definisi bullying dari UNICEF.'
      ],
      e: 'Urutannya: sengaja, berulang, ada ketimpangan kekuatan, lalu simpulan.'
    },
    {
      id: 'mg20', t: 'urut',
      q: 'Urutkan dampak bullying ke korban, dari kejadian pertama sampai efek jangka panjang.',
      items: [
        'Korban terus-menerus dibully sama pelaku.',
        'Muncul rasa kaget, sedih, dan gak nyaman di sekolah.',
        'Keluhan fisik muncul: pusing, susah tidur, atau cemas.',
        'Konsentrasi dan prestasi belajar di kelas ikut anjlok.'
      ],
      e: 'Dampaknya ngalir: kejadian dulu, baru efeknya kerasa makin lama makin berat.'
    },
    {
      id: 'mg21', t: 'urut',
      q: 'Urutkan langkah ngecek satu kejadian itu bullying atau bukan.',
      items: [
        'Cek apakah ada unsur sengaja buat nyakitin.',
        'Cek apakah ada ketimpangan kekuatan atau posisi.',
        'Cek apakah kejadiannya berulang.',
        'Baru simpulin: ini bullying atau cuma konflik biasa.'
      ],
      e: 'Cek satu per satu. Jangan langsung nuduh.'
    },
    {
      id: 'mg22', t: 'urut',
      q: 'Urutkan alur cyberbullying bisa nyebar dan bikin korban tertekan.',
      items: [
        'Pelaku bikin atau screenshot hal yang ngerendahin korban.',
        'Kontennya di-upload ke medsos atau grup chat.',
        'Anak lain ikut nonton, ngetawain, dan share ulang.',
        'Korban stres berat karena satu sekolah udah tahu.'
      ],
      e: 'Sekali di-upload, konten bisa nyebar jauh lebih cepat dari yang kamu kira.'
    },
    {
      id: 'mg23', t: 'urut',
      q: 'Urutkan cara ngenalin pihak yang terlibat, dari yang paling inti.',
      items: [
        'Kenali korban yang jadi sasaran.',
        'Kenali pelaku yang suka nindas.',
        'Liat peran saksi yang ada di lokasi.',
        'Liat pembela korban yang dateng nolong.'
      ],
      e: 'Mulai dari korban dan pelaku, lanjut ke orang-orang di sekitarnya.'
    },
    {
      id: 'mg24', t: 'urut',
      q: 'Urutkan cara ngecek suatu aksi itu bercanda atau bullying.',
      items: [
        'Cek niat awalnya: mau seru-seruan atau emang mau ngerendahin.',
        'Liat ekspresi dan perasaan korban: senang atau sakit hati.',
        'Cek seberapa sering dilakuin: sesekali atau terus-terusan.',
        'Ambil kesimpulan: candaan sehat atau bullying.'
      ],
      e: 'Niat, perasaan korban, lalu frekuensi. Tiga cek ini cukup buat nebak.'
    },
    {
      id: 'mg25', t: 'jodoh',
      q: 'Jodohin jenis bullying dengan contohnya.',
      pairs: [
        { kiri: 'Bullying fisik', kanan: 'Mukul, nendang, atau nyegal temen.' },
        { kiri: 'Bullying verbal', kanan: 'Ngatain fisik atau manggil julukan jelek.' },
        { kiri: 'Bullying sosial', kanan: 'Sengaja ngucilin dan nyebar gosip.' },
        { kiri: 'Cyberbullying', kanan: 'Kirim chat hinaan atau stiker ejekan di HP.' }
      ],
      e: 'Jenisnya beda, tapi efek sakitnya sama.'
    },
    {
      id: 'mg26', t: 'jodoh',
      q: 'Jodohin ciri bullying dengan artinya.',
      pairs: [
        { kiri: 'Kesengajaan', kanan: 'Pelaku emang punya niat sadar buat nyakitin.' },
        { kiri: 'Perulangan', kanan: 'Dilakuin terus-terusan, bukan cuma sekali.' },
        { kiri: 'Ketimpangan kekuatan', kanan: 'Pelaku lebih dominan, korban susah ngelawan.' },
        { kiri: 'Dampak', kanan: 'Korban jadi cemas, takut, atau mager sekolah.' }
      ],
      e: 'Empat ciri ini yang bikin bullying beda dari konflik biasa.'
    },
    {
      id: 'mg27', t: 'jodoh',
      q: 'Jodohin aspek pembeda bercanda dan bullying.',
      pairs: [
        { kiri: 'Perasaan korban', kanan: 'Korban ngerasa sakit hati, malu, dan gak nyaman.' },
        { kiri: 'Respons saat diminta berhenti', kanan: 'Pelaku tetap lanjut walau udah diminta stop.' },
        { kiri: 'Status hubungan', kanan: 'Ada pihak yang ngerasa lebih kuat dari yang lain.' },
        { kiri: 'Niat', kanan: 'Ada yang emang pengin ngerendahin, bukan sekadar lucu-lucuan.' }
      ],
      e: 'Kalau semua tanda ini muncul, itu bukan candaan lagi.'
    },
    {
      id: 'mg28', t: 'jodoh',
      q: 'Jodohin peran orang dalam kasus bullying.',
      pairs: [
        { kiri: 'Korban', kanan: 'Orang yang disasar dan disakitin.' },
        { kiri: 'Pelaku', kanan: 'Orang yang nindas dan ngerjain.' },
        { kiri: 'Saksi (bystander)', kanan: 'Orang yang cuma nonton atau tahu kejadiannya.' },
        { kiri: 'Pembela (upstander)', kanan: 'Orang yang berani nolak dan nolongin korban.' }
      ],
      e: 'Saksi yang diam juga ikut bikin bullying jalan terus.'
    },
    {
      id: 'mg29', t: 'jodoh',
      q: 'Jodohin keluhan korban dengan jenis dampaknya.',
      pairs: [
        { kiri: 'Sakit kepala dan sakit perut', kanan: 'Dampak fisik.' },
        { kiri: 'Cemas dan stres berat', kanan: 'Dampak psikologis atau mental.' },
        { kiri: 'Nilai sekolah anjlok', kanan: 'Dampak ke prestasi belajar.' },
        { kiri: 'Males ketemu temen dan ngejauh', kanan: 'Dampak sosial.' }
      ],
      e: 'Dampak bullying nyebar ke banyak sisi, bukan cuma ke perasaan.'
    },
    {
      id: 'mg30', t: 'jodoh',
      q: 'Jodohin istilah dunia digital dengan artinya.',
      pairs: [
        { kiri: 'Cyberbullying', kanan: 'Ngerjain orang lewat internet atau HP.' },
        { kiri: 'Doxxing', kanan: 'Nyebar data pribadi orang lain tanpa izin.' },
        { kiri: 'Meme ejekan', kanan: 'Foto atau gambar editan buat ngerendahin orang.' },
        { kiri: 'Catfishing', kanan: 'Bikin akun palsu dan ngaku-ngaku jadi orang lain.' }
      ],
      e: 'Kenal istilahnya biar gak gampang kena jebakan online.'
    }
  ],

  menyikapi: [
    {
      id: 'ms01', t: 'pg',
      story: 'Di grup WA kelas, ada yang nyebar foto editan jelek temenmu jadi meme. Banyak yang ketawa, korban langsung keluar grup.',
      q: 'Sebaiknya kamu ngapain?',
      o: [
        'Ikut ketawa biar dianggap asik.',
        'Diem aja, biar gak ikut ribet.',
        'Chat korban buat nyemangati, terus tegur yang bikin meme di grup.',
        'Ikut ngeledek pas istirahat biar kompak.'
      ],
      a: 2,
      e: 'Dukung korban dan tegur pelakunya. Dua-duanya bisa kamu lakuin tanpa harus ribut.'
    },
    {
      id: 'ms02', t: 'pg',
      story: 'Di kantin, anak kelas 7 gak sengaja nyenggol kakak kelas 9. Kakak itu langsung bentak dan ngatain fisiknya di depan umum sampai dia nunduk malu.',
      q: 'Kalau kamu ada di antrean, sikap paling pas?',
      o: [
        'Tenangin anak kelas 7, ajak pindah tempat, lalu lapor guru piket.',
        'Ikut marahin dia biar senior gak ngamuk ke kita.',
        'Nonton dari jauh aja, gak usah ikut campur.',
        'Rekam pakai HP terus upload ke medsos.'
      ],
      a: 0,
      e: 'Amankan korban dulu, baru lapor. Merekam tanpa izin cuma nambah masalah.'
    },
    {
      id: 'ms03', t: 'pg',
      story: 'Pas bagi kelompok, temen-temen nolak satu anak dengan alasan “dia aneh dan pendiem”. Anak itu akhirnya duduk sendirian di pojokan.',
      q: 'Sebagai anggota kelompok, kamu ngapain?',
      o: [
        'Suruh dia gabung kelompok lain aja.',
        'Ajak dia masuk kelompokmu dan sambut dengan ramah.',
        'Pura-pura gak liat biar gak ikut dikatain aneh.',
        'Biarin guru yang nyuruh dia gabung.'
      ],
      a: 1,
      e: 'Satu orang yang jagain bisa bikin korban gak ngerasa sendirian.'
    },
    {
      id: 'ms04', t: 'pg',
      story: 'Kamu liat dari jauh ada siswa dipojokkan dua kakak kelas dan dimintain uang saku. Korbannya kelihatan takut banget.',
      q: 'Apa yang kamu lakuin?',
      o: [
        'Kabur, takut kena juga.',
        'Ikut minta bagian uangnya.',
        'Cepat cari guru atau satpam terdekat.',
        'Tunggu selesai, baru tanya korban.'
      ],
      a: 2,
      e: 'Keselamatanmu juga penting: jangan hadapi sendirian, cari bantuan.'
    },
    {
      id: 'ms05', t: 'pg',
      story: 'Temenmu maju presentasi. Anak-anak di belakang berbisik sambil ngetawain bentuk badan dan bajunya sampai presentasinya kacau.',
      q: 'Tindakan paling bener?',
      o: [
        'Ikut ketawa biar kelas rame.',
        'Tegur yang di belakang biar tenang dan hargain yang presentasi.',
        'Suruh guru marahin temenmu yang grogi.',
        'Main HP aja, bodo amat.'
      ],
      a: 1,
      e: 'Menegur itu kerjaan kecil, tapi efeknya gede buat korban.'
    },
    {
      id: 'ms06', t: 'pg',
      story: 'Ada gosip nyebar kalau temen sekelasmu nyolong HP di ruang guru. Padahal gak ada bukti, cuma tuduhan ngawur.',
      q: 'Waktu ada temen cerita gosip itu ke kamu, kamu ngapain?',
      o: [
        'Sebarin ke grup angkatan biar semua waspada.',
        'Bilang jangan percaya gosip tanpa bukti, dan ingetin dia buat gak nyebarin.',
        'Tambahin bumbu biar ceritanya makin seru.',
        'Langsung jauhin anak yang dituduh.'
      ],
      a: 1,
      e: 'Gosip tanpa bukti itu fitnah. Berhentiin di kamu aja.'
    },
    {
      id: 'ms07', t: 'pg',
      story: 'Tas temenmu udah sobek dan sepatunya udah tipis. Beberapa anak ngejek dia “orang miskin” pas istirahat.',
      q: 'Kamu nyikapinnya gimana?',
      o: [
        'Samperin, rangkul dia, dan ajak pergi dari situ.',
        'Ikut sorakin dari jauh biar gak dikira dukung dia.',
        'Diem aja, kan bukan urusanmu.',
        'Videoin ejekannya buat konten.'
      ],
      a: 0,
      e: 'Kadang yang korban butuh cuma satu orang yang berdiri di sampingnya.'
    },
    {
      id: 'ms08', t: 'pg',
      story: 'Di lorong, seorang siswa sengaja dijegal sampai jatuh dan bukunya berserakan. Pelakunya malah ketawa bangga.',
      q: 'Reaksi paling tepat?',
      o: [
        'Bantu korban beresin buku, lalu tegur pelakunya.',
        'Ketawa juga, soalnya keliatan lucu.',
        'Lompatin bukunya dan lanjut jalan.',
        'Suruh korban minta maaf ke pelakunya.'
      ],
      a: 0,
      e: 'Bantuin korban dulu, jangan biarin dia ngerasa sendirian di lantai.'
    },
    {
      id: 'ms09', t: 'pg',
      story: 'Kolom komentar foto postingan temenmu penuh hujatan dari akun-akun anonim anak sekolah kalian.',
      q: 'Cara kamu ngebantu ngadepin ini?',
      o: [
        'Ikut komen pedes biar gak ketinggalan tren.',
        'Suruh dia hapus medsos dan salahin dia karena upload foto.',
        'Like komen-komen jahatnya.',
        'Chat pribadi buat nyemangati, dan bantu laporin akunnya ke sekolah.'
      ],
      a: 3,
      e: 'Dukungan satu orang bisa ngeringanin banget. Laporannya juga bikin pelaku kapok.'
    },
    {
      id: 'ms10', t: 'pg',
      story: 'Ada siswi lewat lapangan, disiulin dan dikatain soal fisiknya sama sekelompok anak yang lagi main bola.',
      q: 'Kalau kamu ada di situ, ngapain?',
      o: [
        'Ingetin mereka kalau itu gak sopan dan gak boleh dilakuin.',
        'Ikut siulin biar dianggap keren.',
        'Pura-pura gak denger.',
        'Ketawa ngakak, dukung temen.'
      ],
      a: 0,
      e: 'Satu teguran bisa ngerusak kebiasaan yang udah dianggap normal.'
    },
    {
      id: 'ms11', t: 'multi',
      q: 'Pilih TIGA tindakan bener buat nolong sahabatmu yang uang sakunya diporotin senior tiap hari.',
      o: [
        'Temenin dia lapor ke Guru BK atau wali kelas.',
        'Ajak seniornya berantem di luar sekolah.',
        'Simpen bukti waktu dan lokasi kejadian.',
        'Minta bantuan orang tua atau guru biar dia aman.',
        'Bayarin aja uang palaknya pakai uang sakumu.'
      ],
      a: [0, 2, 3],
      e: 'Lapor, simpen bukti, libatkan orang dewasa. Balas berantem cuma nambah masalah.'
    },
    {
      id: 'ms12', t: 'multi',
      q: 'Pilih TIGA dukungan yang pas buat temenmu yang nangis karena dibully.',
      o: [
        'Duduk di sampingnya dan dengerin tanpa ngehakimi.',
        'Suruh berhenti nangis, bilang itu cuma bercanda.',
        'Bilang kalau yang dilakuin pelaku itu salah, dan dia gak sendirian.',
        'Tawarin antar ke UKS atau ruang BK kalau dia udah siap.',
        'Sebarin cerita nangisnya ke grup kelas biar rame.'
      ],
      a: [0, 2, 3],
      e: 'Dengerin, validasi, temenin. Tiga hal simpel yang ngebantu banget.'
    },
    {
      id: 'ms13', t: 'multi',
      q: 'Pilih TIGA tindakan bijak kalau kamu tiba-tiba dimasukin grup WA yang isinya ngejelekin guru atau murid lain.',
      o: [
        'Langsung keluar dari grup.',
        'Screenshot chat-nya dulu sebagai bukti.',
        'Ikut nimbrung ngejelekin biar disukai.',
        'Laporin grupnya ke guru kesiswaan atau BK.',
        'Undang anak lain masuk biar makin rame.'
      ],
      a: [0, 1, 3],
      e: 'Keluar, simpen bukti, lapor. Jangan tambah orang ke dalamnya.'
    },
    {
      id: 'ms14', t: 'multi',
      q: 'Pilih TIGA peran aktif yang bisa kamu lakuin buat nolak bullying di sekolah.',
      o: [
        'Berani negur dengan sopan atau lapor kalau lihat bullying.',
        'Rangkul dan temenin anak yang sering dikucilin.',
        'Jadi penonton paling heboh pas ada yang berantem.',
        'Gak ikut share atau repost konten ejekan.',
        'Bikin julukan buat guru atau temen sekelas.'
      ],
      a: [0, 1, 3],
      e: 'Upstander gak harus berani lawan pelaku. Cukup gak ikut, dan berani lapor.'
    },
    {
      id: 'ms15', t: 'multi',
      q: 'Pilih TIGA langkah bener kalau kamu sadar pernah ngebully temen.',
      o: [
        'Minta maaf dengan tulus langsung ke korban.',
        'Stop semua candaan yang ngeledek fisik atau kekurangan orang.',
        'Beralasan “kan cuma bercanda, jangan baper”.',
        'Bela korban kalau ada yang coba ngejek dia lagi.',
        'Pura-pura gak tau dan jauhin korban.'
      ],
      a: [0, 1, 3],
      e: 'Minta maaf, berhenti, dan jadi pelindung. Itu baru namanya berubah.'
    },
    {
      id: 'ms16', t: 'multi',
      q: 'Pilih TIGA hal yang TIDAK BOLEH kamu lakuin pas jadi penonton keributan.',
      o: [
        'Nyorakin dan manasin situasi biar makin ricuh.',
        'Videoin cuma buat konten story.',
        'Cepat panggil guru piket atau pembina OSIS.',
        'Halangin anak lain yang mau nelerai.',
        'Teriak dari jauh minta mereka berhenti.'
      ],
      a: [0, 1, 3],
      e: 'Nyorakin, videoin buat konten, dan ngehalangin penolong justru bikin makin parah.'
    },
    {
      id: 'ms17', t: 'multi',
      q: 'Pilih TIGA langkah pas kalau temenmu diancam sepedanya dirusak gara-gara gak mau kasih contekan.',
      o: [
        'Minta dia tetap jujur dan gak kasih contekan.',
        'Laporin ancamannya ke guru pengawas atau wali kelas.',
        'Kasih contekan aja biar sepedanya aman.',
        'Bantu parkir sepedanya di area yang dipantau CCTV atau satpam.',
        'Balas dendam dengan ngerusak sepeda anak itu.'
      ],
      a: [0, 1, 3],
      e: 'Jujur tetap jalan, tapi ancamannya harus dilaporin ke orang dewasa.'
    },
    {
      id: 'ms18', t: 'multi',
      q: 'Pilih TIGA langkah pengamanan digital kalau kamu diteror chat jahat dari orang yang gak kamu kenal.',
      o: [
        'Screenshot semua chat-nya buat bukti.',
        'Blokir dan report akun pengirimnya.',
        'Balas maki dan ancam balik.',
        'Cerita ke orang tua atau Guru BK.',
        'Pendam sendiri karena takut disalahin.'
      ],
      a: [0, 1, 3],
      e: 'Simpen bukti, blokir, lapor. Jangan balas, itu cuma bikin makin rame.'
    },
    {
      id: 'ms19', t: 'urut',
      q: 'Urutkan langkah ngebantu temen yang lagi dikeroyok di lorong sepi.',
      items: [
        'Tetap tenang, teriak dari jarak aman: “Stop! Guru dateng!” biar pelaku kaget.',
        'Panggil guru atau satpam terdekat.',
        'Pastikan kondisi fisik dan mental korban aman setelahnya.',
        'Kasih kesaksian jujur ke Guru BK soal kronologinya.'
      ],
      e: 'Pecah konsentrasi pelaku, panggil bantuan, amankan korban, baru lapor.'
    },
    {
      id: 'ms20', t: 'urut',
      q: 'Urutkan langkah kalau ada foto atau ejekan temen disebar di grup WA.',
      items: [
        'Screenshot chat dan fotonya sebagai bukti.',
        'Tegur yang posting di grup dengan sopan, minta hapus.',
        'Chat pribadi korban buat nguatin mentalnya.',
        'Laporin buktinya ke wali kelas atau Guru BK.'
      ],
      e: 'Bukti dulu, baru tindakan. Tanpa bukti, laporan gampang dibantah.'
    },
    {
      id: 'ms21', t: 'urut',
      q: 'Urutkan langkah kalau kamu sadar dulu sering ikut ketawa pas temen diejek.',
      items: [
        'Akui ke diri sendiri kalau ikut ketawa itu sama aja dukung bullying.',
        'Minta maaf dengan tulus ke korban.',
        'Janji gak bakal ketawa lagi, dan berani negur kalau kejadian lagi.',
        'Ajak dia main bareng lagi sebagai awal pertemanan yang sehat.'
      ],
      e: 'Mulai dari jujur ke diri sendiri, baru minta maaf dan berubah.'
    },
    {
      id: 'ms22', t: 'urut',
      q: 'Urutkan langkah dampingin sahabatmu yang dipalak senior tiap Jumat.',
      items: [
        'Dengerin ceritanya sampai habis tanpa motong atau nyalahin.',
        'Temenin dia ke ruang BK buat lapor.',
        'Yakinkan dia kalau lapor itu bener dan dia gak sendirian.',
        'Pastikan kalian selalu jalan bareng biar gak gampang disatroni lagi.'
      ],
      e: 'Dengerin dulu, baru gerak bareng. Jangan nyalahin korban.'
    },
    {
      id: 'ms23', t: 'urut',
      q: 'Urutkan cara ngamankan diri dari akun palsu yang nyebar fitnah soal temenmu.',
      items: [
        'Simpen URL dan screenshot bukti fitnahnya.',
        'Ingetin anak-anak sekelas buat gak nge-share link-nya.',
        'Laporin akun palsunya bareng-bareng (mass report).',
        'Lapor ke pihak sekolah atau orang tua.'
      ],
      e: 'Bukti dulu, cegah nyebar, baru report dan lapor.'
    },
    {
      id: 'ms24', t: 'urut',
      q: 'Urutkan cara damaiin dua geng kelas yang hobi sindir-sindiran.',
      items: [
        'Cari tahu apa pemicu awal kesalahpahaman mereka.',
        'Ajak perwakilan dua kubu duduk bareng, ditemenin wali kelas atau BK.',
        'Biarin masing-masing cerita uneg-unegnya tanpa emosi.',
        'Bikin kesepakatan kelas buat saling menghargai perbedaan.'
      ],
      e: 'Cari akar masalahnya dulu, baru duduk bareng dan bikin kesepakatan.'
    },
    {
      id: 'ms25', t: 'jodoh',
      q: 'Jodohin tindakan dengan jenis bullying yang dihadapi.',
      pairs: [
        { kiri: 'Blokir akun dan simpan screenshot', kanan: 'Cyberbullying' },
        { kiri: 'Tegur yang ngatain nama orang tua', kanan: 'Bullying verbal' },
        { kiri: 'Panggil guru pas ada yang mukul', kanan: 'Bullying fisik' },
        { kiri: 'Ajak anak baru yang dikucilin gabung', kanan: 'Pengucilan sosial' }
      ],
      e: 'Respon yang tepat beda-beda, tergantung jenis bullying-nya.'
    },
    {
      id: 'ms26', t: 'jodoh',
      q: 'Jodohin peran dengan cirinya.',
      pairs: [
        { kiri: 'Upstander', kanan: 'Anak yang berani nolak bullying dan nolong korban.' },
        { kiri: 'Bystander pasif', kanan: 'Anak yang nonton doang tapi diem aja.' },
        { kiri: 'Pelaku', kanan: 'Anak yang hobi nindas orang lain.' },
        { kiri: 'Korban', kanan: 'Anak yang disasar dan disakitin.' }
      ],
      e: 'Peran paling gampang buat kamu ambil: jadi upstander.'
    },
    {
      id: 'ms27', t: 'jodoh',
      q: 'Jodohin kasus dengan tempat lapor yang paling pas.',
      pairs: [
        { kiri: 'Diejek pakai julukan', kanan: 'Wali kelas' },
        { kiri: 'Diporotin dan diancam fisik', kanan: 'Guru BK dan tim sekolah' },
        { kiri: 'Akun anonim nyebar foto editan', kanan: 'Tim siber sekolah atau Kominfo' },
        { kiri: 'Dipukul sampai luka berat', kanan: 'Pihak berwajib atau polisi' }
      ],
      e: 'Makin berat kasusnya, makin tinggi pihak yang perlu dilibatkan.'
    },
    {
      id: 'ms28', t: 'jodoh',
      q: 'Jodohin perasaan korban dengan kalimat support yang pas.',
      pairs: [
        { kiri: 'Korban ngerasa ini salah dia', kanan: '“Ini bukan salahmu. Gak ada yang boleh lakuin ini ke kamu.”' },
        { kiri: 'Korban takut diancam pelaku', kanan: '“Kamu gak sendiri, aku temenin lapor ke BK.”' },
        { kiri: 'Korban ngerasa dikucilin', kanan: '“Yuk gabung sama kelompok kita.”' },
        { kiri: 'Korban malu fotonya disebar', kanan: '“Tenang, kita hapus dan laporin akunnya bareng-bareng.”' }
      ],
      e: 'Kata-kata yang tepat bisa bikin korban berani ambil langkah.'
    },
    {
      id: 'ms29', t: 'jodoh',
      q: 'Jodohin masalah siber dengan solusinya.',
      pairs: [
        { kiri: 'Doxxing, data pribadi disebar', kanan: 'Set akun jadi private dan hapus data sensitif.' },
        { kiri: 'Diteror chat terus-terusan', kanan: 'Pakai fitur blokir dan report.' },
        { kiri: 'Akun medsos dibajak', kanan: 'Ganti password dan aktifin 2FA.' },
        { kiri: 'Akun palsu niru identitas', kanan: 'Report impersonation ke pusat bantuan medsos.' }
      ],
      e: 'Masalah siber punya solusi teknis yang jelas. Manfaatin fiturnya.'
    },
    {
      id: 'ms30', t: 'jodoh',
      q: 'Jodohin aksi intervensi dengan strateginya.',
      pairs: [
        { kiri: 'Ajak korban pergi dari lokasi', kanan: 'Strategi pengalihan (distraction)' },
        { kiri: 'Bilang tegas “perilaku kamu salah”', kanan: 'Intervensi langsung' },
        { kiri: 'Amankan bukti lalu lapor diam-diam', kanan: 'Strategi pelaporan' },
        { kiri: 'Cek kondisi korban setelah kejadian', kanan: 'Dukungan lanjutan (follow-up)' }
      ],
      e: 'Nolong korban gak harus berantem. Ada banyak cara yang lebih aman.'
    }
  ]
};
