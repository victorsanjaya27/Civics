/* ==========================================================================
   PANTAU – engine kuis
   - 10 soal acak dari 30 per bagian (4 pg, 2 multi, 2 urut, 2 jodoh)
   - progres tersimpan di localStorage per perangkat (tanpa database)
   - progres tetap ada saat reload atau pindah section
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     0. BANTUAN UMUM
     --------------------------------------------------------------- */

  function $(id) {
    return document.getElementById(id);
  }

  // Buat elemen dengan kelas dan teks (selalu textContent, bukan innerHTML)
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function shuffle(list) {
    var out = list.slice();
    for (var i = out.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
    return out;
  }

  function sample(list, count) {
    return shuffle(list).slice(0, count);
  }


  /* ---------------------------------------------------------------
     1. PENYIMPANAN (localStorage)
     --------------------------------------------------------------- */

  var STORE_PREFIX = 'pantau.v2.';
  var storageOk = true;

  try {
    localStorage.setItem(STORE_PREFIX + 'probe', '1');
    localStorage.removeItem(STORE_PREFIX + 'probe');
  } catch (err) {
    storageOk = false;
  }

  function storageWarning() {
    var note = $('storage-note');
    if (note) note.hidden = false;
  }

  if (!storageOk) storageWarning();

  function readJSON(key, fallback) {
    if (!key || !storageOk) return fallback;
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    if (!key) return false;
    if (!storageOk) return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      storageOk = false;
      storageWarning();
      return false;
    }
  }

  // Data versi lama (profil bernama) dibuang sekali. Setelah itu progres
  // dipakai bersama tanpa nama: satu perangkat, satu pengguna.
  function cleanOldStorage() {
    if (!storageOk) return;
    try {
      if (localStorage.getItem(STORE_PREFIX + 'cleaned') === '1') return;
      Object.keys(localStorage).forEach(function (key) {
        if (key.indexOf('pantau.v1.') === 0) localStorage.removeItem(key);
      });
      localStorage.setItem(STORE_PREFIX + 'cleaned', '1');
    } catch (err) {
      storageOk = false;
      storageWarning();
    }
  }

  cleanOldStorage();


  // Kunci progres: satu sesi per bagian, tanpa nama pengguna.
  function stateKey(bank) {
    return STORE_PREFIX + 'quiz.' + bank;
  }

  function bestKey(bank) {
    return STORE_PREFIX + 'best.' + bank;
  }


  /* ---------------------------------------------------------------
     3. NAVIGASI
     --------------------------------------------------------------- */

  var views = ['home', 'mengenal', 'mencegah', 'menyikapi', 'lapor'];

  function go(viewId) {
    if (views.indexOf(viewId) < 0) viewId = 'home';

    views.forEach(function (id) {
      $(id).classList.toggle('on', id === viewId);
    });

    document.querySelectorAll('#nav button[data-go]').forEach(function (button) {
      button.setAttribute('aria-current', button.dataset.go === viewId);
    });

    try { history.replaceState(null, '', '#' + viewId); } catch (err) {}

    if (viewId === 'mengenal' || viewId === 'menyikapi') {
      openBank(viewId);
    } else {
      updateProgressBadges();
    }

    window.scrollTo(0, 0);
  }


  /* ---------------------------------------------------------------
     4. DATA SOAL & SESI KUIS
     --------------------------------------------------------------- */

  var sessions = { mengenal: null, menyikapi: null };
  var resumed = { mengenal: false, menyikapi: false };

  function bankPool(bank) {
    var data = window.QUESTION_BANK;
    return data && Array.isArray(data[bank]) ? data[bank] : null;
  }

  function getItem(bank, id) {
    var pool = bankPool(bank) || [];
    for (var i = 0; i < pool.length; i++) {
      if (pool[i].id === id) return pool[i];
    }
    return null;
  }

  function answeredCount(session) {
    return Object.keys(session.answers || {}).length;
  }

  // Ambil 10 soal: 4 pg + 2 multi + 2 urut + 2 jodoh, lalu diacak
  function buildSession(bank) {
    var pool = bankPool(bank);
    if (!pool) return null;

    var groups = { pg: [], multi: [], urut: [], jodoh: [] };
    pool.forEach(function (item) {
      if (groups[item.t]) groups[item.t].push(item);
    });

    var picked = []
      .concat(sample(groups.pg, 4))
      .concat(sample(groups.multi, 2))
      .concat(sample(groups.urut, 2))
      .concat(sample(groups.jodoh, 2));

    picked = shuffle(picked);

    // Simpan urutan acak opsi supaya stabil saat resume
    var optOrder = {};
    picked.forEach(function (item) {
      if (item.t === 'pg' || item.t === 'multi') {
        optOrder[item.id] = shuffle(item.o.map(function (_, i) { return i; }));
      } else if (item.t === 'jodoh') {
        optOrder[item.id] = shuffle(item.pairs.map(function (_, i) { return i; }));
      }
    });

    return {
      v: 1,
      bank: bank,
      ids: picked.map(function (item) { return item.id; }),
      optOrder: optOrder,
      idx: 0,
      answers: {},
      score: 0,
      done: false,
      ts: Date.now()
    };
  }

  function saveSession(bank) {
    var session = sessions[bank];
    var key = stateKey(bank);
    if (!session || !key) return;
    session.ts = Date.now();
    writeJSON(key, session);
  }

  function startNewSession(bank) {
    sessions[bank] = buildSession(bank);
    resumed[bank] = false;
    saveSession(bank);
    renderBank(bank, false);
    updateProgressBadges();
  }

  // Dipanggil setiap kali section mengenal/menyikapi dibuka
  function openBank(bank) {
    if (!bankPool(bank)) {
      renderBroken(bank);
      return;
    }

    var current = sessions[bank];
    if (current && !current.done) {
      renderBank(bank, false);
      return;
    }

    if (current && current.done) sessions[bank] = null;

    var saved = readJSON(stateKey(bank), null);
    var valid = saved && saved.v === 1 && saved.bank === bank &&
      !saved.done && Array.isArray(saved.ids) && saved.ids.length > 0;

    if (valid) {
      sessions[bank] = saved;
      // Banner hanya muncul kalau sudah ada jawaban, bukan sesi baru yang kosong
      resumed[bank] = answeredCount(saved) > 0;
    } else {
      sessions[bank] = buildSession(bank);
      resumed[bank] = false;
      saveSession(bank);
    }

    renderBank(bank, false);
    updateProgressBadges();
    syncGate();
  }

  function progressText(bank) {
    var session = sessions[bank] || readJSON(stateKey(bank), null);
    var best = readJSON(bestKey(bank), null);

    if (session && !session.done) {
      var answered = answeredCount(session);
      return answered ? 'Progres ' + answered + '/' + session.ids.length : 'Belum mulai';
    }
    if (session && session.done) {
      return 'Selesai • skor ' + session.score + '/' + session.ids.length;
    }
    if (best) return 'Terakhir • skor ' + best.score + '/' + best.total;
    return 'Belum mulai';
  }

  function updateProgressBadges() {
    document.querySelectorAll('[data-progress]').forEach(function (node) {
      node.textContent = progressText(node.dataset.progress);
    });
  }

  // Pertanyaan komitmen hanya relevan buat yang sudah menyelesaikan kuis Mengenal
  function syncGate() {
    var gate = $('gate');
    if (!gate) return;
    gate.hidden = !readJSON(bestKey('mengenal'), null);
  }


  /* ---------------------------------------------------------------
     5. RENDER KUIS
     --------------------------------------------------------------- */

  function quizBox(bank) {
    return $(bank === 'mengenal' ? 'q1' : 'q2');
  }

  function quizTitle(bank) {
    return bank === 'mengenal' ? 'Kuis Mengenal' : 'Kuis Menyikapi';
  }

  function renderBroken(bank) {
    var box = quizBox(bank);
    if (!box) return;
    box.replaceChildren(el('p', 'note', 'Bank soal gagal dimuat. Coba refresh halaman ini.'));
  }

  function quizHeader(bank, session) {
    var head = el('div', 'qz-head');
    head.appendChild(el('span', 'qz-title', quizTitle(bank)));
    head.appendChild(el('span', 'qz-count', 'Soal ' + Math.min(session.idx + 1, session.ids.length) + ' dari ' + session.ids.length));
    head.appendChild(el('span', 'qz-score', 'Skor ' + session.score));

    var reset = el('button', 'btn small brown', 'Ganti soal');
    reset.type = 'button';
    reset.onclick = function () {
      if (!confirm('Tukar 10 soal ini dengan soal acak baru? Progres bagian ini bakal direset.')) return;
      startNewSession(bank);
    };
    head.appendChild(reset);

    return head;
  }

  function progressBar(session) {
    var bar = el('div', 'qz-bar');
    var fill = el('span');
    fill.style.width = Math.round(answeredCount(session) / session.ids.length * 100) + '%';
    bar.appendChild(fill);
    return bar;
  }

  function renderBank(bank, focus) {
    var box = quizBox(bank);
    if (!box) return;

    var session = sessions[bank];
    if (!session) { startNewSession(bank); return; }
    if (session.done) { renderDone(bank); return; }

    var item = getItem(bank, session.ids[session.idx]);
    if (!item) {
      sessions[bank] = buildSession(bank);
      saveSession(bank);
      renderBank(bank, false);
      return;
    }

    var nodes = [quizHeader(bank, session), progressBar(session)];

    if (resumed[bank]) {
      nodes.push(el('p', 'note qz-resume',
        'Progres kamu tersimpan — lanjut dari soal ' + (session.idx + 1) + '.'));
      resumed[bank] = false;
    }

    if (item.story) nodes.push(el('p', 'qz-story', item.story));

    var question = el('h3', 'qz-q', item.q);
    question.tabIndex = -1;
    nodes.push(question);

    var body;
    if (item.t === 'pg') body = renderPg(bank, item);
    else if (item.t === 'multi') body = renderMulti(bank, item);
    else if (item.t === 'urut') body = renderUrut(bank, item);
    else body = renderJodoh(bank, item);

    nodes.push(body);
    box.replaceChildren.apply(box, nodes);

    if (focus) question.focus();
  }

  function nextButton(bank, session) {
    var label = session.idx >= session.ids.length ? 'Lihat skor' : 'Lanjut';
    var button = el('button', 'btn', label);
    button.type = 'button';
    button.onclick = function () {
      if (session.idx >= session.ids.length) finishBank(bank);
      else renderBank(bank, true);
    };
    return button;
  }

  // Simpan jawaban, majukan indeks, tampilkan umpan balik
  function recordAnswer(bank, item, correct, value, feedback) {
    var session = sessions[bank];
    if (!session) return;

    session.answers[item.id] = value;
    if (correct) session.score++;
    session.idx++;
    saveSession(bank);

    var box = quizBox(bank);
    if (box) {
      var scoreNode = box.querySelector('.qz-score');
      if (scoreNode) scoreNode.textContent = 'Skor ' + session.score;
      var fill = box.querySelector('.qz-bar span');
      if (fill) fill.style.width = Math.round(answeredCount(session) / session.ids.length * 100) + '%';
    }

    feedback.textContent = (correct ? 'Tepat! ' : 'Belum tepat. ') + item.e;
    updateProgressBadges();
  }

  function renderPg(bank, item) {
    var session = sessions[bank];
    var order = session.optOrder[item.id] || item.o.map(function (_, i) { return i; });
    var body = el('div', 'qz-body');
    var feedback = el('p', 'fb');
    feedback.setAttribute('aria-live', 'polite');
    var footer = el('div', 'qz-actions');
    var buttons = [];
    var locked = false;

    order.forEach(function (original, i) {
      var button = el('button', 'opt', item.o[original]);
      button.type = 'button';

      button.onclick = function () {
        if (locked) return;
        locked = true;

        var correct = original === item.a;
        buttons.forEach(function (btn) { btn.disabled = true; });
        order.forEach(function (value, pos) {
          if (value === item.a) buttons[pos].classList.add('ok');
        });
        if (!correct) button.classList.add('no');

        recordAnswer(bank, item, correct, original, feedback);
        footer.appendChild(nextButton(bank, session));
      };

      buttons.push(button);
      body.appendChild(button);
    });

    body.appendChild(footer);
    body.appendChild(feedback);
    return body;
  }

  function renderMulti(bank, item) {
    var session = sessions[bank];
    var order = session.optOrder[item.id] || item.o.map(function (_, i) { return i; });
    var body = el('div', 'qz-body');
    var feedback = el('p', 'fb');
    feedback.setAttribute('aria-live', 'polite');
    var footer = el('div', 'qz-actions');
    var check = el('button', 'btn g', 'Cek jawaban');
    check.type = 'button';
    check.disabled = true;
    var buttons = [];
    var picked = [];
    var locked = false;

    order.forEach(function (original, i) {
      var button = el('button', 'opt', item.o[original]);
      button.type = 'button';
      button.setAttribute('aria-pressed', 'false');

      button.onclick = function () {
        if (locked) return;
        var at = picked.indexOf(original);

        if (at >= 0) {
          picked.splice(at, 1);
          button.classList.remove('picked');
          button.setAttribute('aria-pressed', 'false');
        } else if (picked.length < 3) {
          picked.push(original);
          button.classList.add('picked');
          button.setAttribute('aria-pressed', 'true');
        }

        check.disabled = picked.length !== 3;
      };

      buttons.push(button);
      body.appendChild(button);
    });

    body.appendChild(el('p', 'qz-hint', 'Pilih 3 jawaban yang paling pas.'));

    check.onclick = function () {
      if (locked) return;
      locked = true;

      var correct = picked.length === 3 && picked.every(function (value) {
        return item.a.indexOf(value) >= 0;
      });

      order.forEach(function (original, i) {
        buttons[i].disabled = true;
        if (item.a.indexOf(original) >= 0) buttons[i].classList.add('ok');
        else if (picked.indexOf(original) >= 0) buttons[i].classList.add('no');
      });

      check.remove();
      recordAnswer(bank, item, correct, picked.slice(), feedback);
      footer.appendChild(nextButton(bank, session));
    };

    footer.appendChild(check);
    body.appendChild(footer);
    body.appendChild(feedback);
    return body;
  }

  function renderUrut(bank, item) {
    var session = sessions[bank];
    var body = el('div', 'qz-body');
    var feedback = el('p', 'fb');
    feedback.setAttribute('aria-live', 'polite');
    var footer = el('div', 'qz-actions');
    var check = el('button', 'btn g', 'Cek urutan');
    check.type = 'button';
    var list = el('ol', 'qz-sort');
    var order = shuffle(item.items.map(function (_, i) { return i; }));
    var locked = false;

    function paint() {
      list.replaceChildren();

      order.forEach(function (original, pos) {
        var row = el('li', 'qz-sort__item');
        row.appendChild(el('span', 'qz-sort__num', String(pos + 1)));
        row.appendChild(el('span', 'qz-sort__txt', item.items[original]));

        var move = el('div', 'qz-sort__move');
        var up = el('button', 'qz-sort__btn', '↑');
        var down = el('button', 'qz-sort__btn', '↓');
        up.type = 'button';
        down.type = 'button';
        up.setAttribute('aria-label', 'Naikkan langkah nomor ' + (pos + 1));
        down.setAttribute('aria-label', 'Turunkan langkah nomor ' + (pos + 1));
        up.disabled = locked || pos === 0;
        down.disabled = locked || pos === order.length - 1;

        up.onclick = function () {
          if (locked) return;
          var tmp = order[pos - 1];
          order[pos - 1] = order[pos];
          order[pos] = tmp;
          paint();
        };

        down.onclick = function () {
          if (locked) return;
          var tmp = order[pos + 1];
          order[pos + 1] = order[pos];
          order[pos] = tmp;
          paint();
        };

        move.appendChild(up);
        move.appendChild(down);
        row.appendChild(move);
        list.appendChild(row);
      });
    }

    paint();
    body.appendChild(list);

    check.onclick = function () {
      if (locked) return;
      locked = true;
      paint();

      var correct = order.every(function (value, i) { return value === i; });
      if (!correct) {
        body.insertBefore(
          el('p', 'qz-answer', 'Urutan bener: ' + item.items.join(' → ')),
          footer
        );
      }

      check.remove();
      recordAnswer(bank, item, correct, order.slice(), feedback);
      footer.appendChild(nextButton(bank, session));
    };

    footer.appendChild(check);
    body.appendChild(footer);
    body.appendChild(feedback);
    return body;
  }

  function renderJodoh(bank, item) {
    var session = sessions[bank];
    var body = el('div', 'qz-body');
    var feedback = el('p', 'fb');
    feedback.setAttribute('aria-live', 'polite');
    var footer = el('div', 'qz-actions');
    var check = el('button', 'btn g', 'Cek pasangan');
    check.type = 'button';
    var rightOrder = session.optOrder[item.id] || item.pairs.map(function (_, i) { return i; });
    var rows = [];
    var locked = false;

    item.pairs.forEach(function (pair, leftIndex) {
      var row = el('div', 'qz-match');
      row.appendChild(el('span', 'qz-match__left', pair.kiri));

      var select = document.createElement('select');
      select.className = 'qz-match__select';
      select.setAttribute('aria-label', 'Pasangan untuk ' + pair.kiri);

      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Pilih pasangan…';
      select.appendChild(placeholder);

      rightOrder.forEach(function (original) {
        var option = document.createElement('option');
        option.value = String(original);
        option.textContent = item.pairs[original].kanan;
        select.appendChild(option);
      });

      row.appendChild(select);
      rows.push({ row: row, select: select, leftIndex: leftIndex });
      body.appendChild(row);
    });

    check.onclick = function () {
      if (locked) return;

      var filled = rows.every(function (entry) { return entry.select.value !== ''; });
      if (!filled) {
        feedback.textContent = 'Isi semua pasangannya dulu ya.';
        return;
      }

      locked = true;
      var correct = true;
      var answers = [];

      rows.forEach(function (entry) {
        var chosen = Number(entry.select.value);
        answers.push(chosen);
        entry.select.disabled = true;

        if (chosen === entry.leftIndex) {
          entry.row.classList.add('ok');
        } else {
          correct = false;
          entry.row.classList.add('no');
          entry.row.appendChild(el('span', 'qz-answer', 'Benernya: ' + item.pairs[entry.leftIndex].kanan));
        }
      });

      check.remove();
      recordAnswer(bank, item, correct, answers, feedback);
      footer.appendChild(nextButton(bank, session));
    };

    footer.appendChild(check);
    body.appendChild(footer);
    body.appendChild(feedback);
    return body;
  }

  function doneMessage(score, total) {
    if (score === total) return 'Luar biasa, kamu paham banget! 🌟';
    if (score >= total / 2) return 'Bagus! Baca lagi bagian yang masih bingung ya.';
    return 'Santai, gak apa-apa. Baca materinya lagi, terus coba kuis baru.';
  }

  function renderDone(bank) {
    var box = quizBox(bank);
    var session = sessions[bank];
    if (!box || !session) return;

    var total = session.ids.length;
    var wrap = el('div', 'qz-body');
    wrap.appendChild(el('h3', 'qz-q', 'Skor kamu: ' + session.score + ' dari ' + total));
    wrap.appendChild(el('p', '', doneMessage(session.score, total)));

    var best = readJSON(bestKey(bank), null);
    if (best) wrap.appendChild(el('p', 'qz-hint', 'Skor terbaik kamu di bagian ini: ' + best.score + '/' + best.total));

    var actions = el('div', 'qz-actions');
    var again = el('button', 'btn g', 'Main lagi (10 soal baru)');
    again.type = 'button';
    again.onclick = function () { startNewSession(bank); };
    actions.appendChild(again);
    wrap.appendChild(actions);

    box.replaceChildren(wrap);
  }

  function finishBank(bank) {
    var session = sessions[bank];
    if (!session) return;

    session.done = true;
    saveSession(bank);

    var best = readJSON(bestKey(bank), null);
    if (!best || session.score > best.score) {
      writeJSON(bestKey(bank), { score: session.score, total: session.ids.length, ts: Date.now() });
    }

    renderDone(bank);
    showScorePopup(session.score, session.ids.length, doneMessage(session.score, session.ids.length));
    updateProgressBadges();

    if (bank === 'mengenal') {
      syncGate();
    }
  }


  /* ---------------------------------------------------------------
     6. POPUP SKOR
     --------------------------------------------------------------- */

  var scorePopup = $('score-popup');
  var scorePopupTitle = $('score-popup-title');
  var scorePopupScore = $('score-popup-score');
  var scorePopupMessage = $('score-popup-message');

  $('score-popup-close').addEventListener('click', function () {
    scorePopup.close();
  });

  function showScorePopup(score, total, message) {
    var passed = score >= total / 2;
    scorePopupTitle.textContent = passed ? 'Selamat!' : 'Tetap semangat!';
    scorePopupScore.textContent = 'Skor kamu: ' + score + ' dari ' + total;
    scorePopupMessage.textContent = message;
    scorePopup.classList.toggle('is-celebrating', passed);
    if (!scorePopup.open) scorePopup.showModal();
  }


  /* ---------------------------------------------------------------
     7. GRAFIK JPPI
     --------------------------------------------------------------- */

  var jppiCases = [
    { year: 2020, cases: 91 },
    { year: 2021, cases: 142 },
    { year: 2022, cases: 194 },
    { year: 2023, cases: 285 },
    { year: 2024, cases: 573 }
  ];

  function renderJppiChart() {
    var bars = $('jpji-bars');
    var years = $('jpji-years');
    if (!bars || !years) return;

    var maxCases = Math.max.apply(null, jppiCases.map(function (item) { return item.cases; }));

    bars.replaceChildren();
    years.replaceChildren();

    jppiCases.forEach(function (item) {
      var bar = document.createElement('div');
      var year = document.createElement('span');
      var height = Math.max(16, item.cases / maxCases * 100);

      bar.style.height = height + '%';
      bar.textContent = item.cases;
      bar.setAttribute('aria-label', item.cases + ' kasus pada tahun ' + item.year);
      year.textContent = item.year;
      bars.appendChild(bar);
      years.appendChild(year);
    });

    bars.setAttribute('aria-label', 'Grafik: ' + jppiCases.map(function (item) {
      return item.cases + ' kasus tahun ' + item.year;
    }).join(', '));
  }


  /* ---------------------------------------------------------------
     8. KLIK GLOBAL & TAB
     --------------------------------------------------------------- */

  document.addEventListener('click', function (event) {
    var goButton = event.target.closest('[data-go]');
    if (goButton) go(goButton.dataset.go);

    var scrollButton = event.target.closest('[data-scroll]');
    if (scrollButton) {
      var target = $(scrollButton.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }

    var tabButton = event.target.closest('[data-tab]');
    if (tabButton) {
      var tab = tabButton.dataset.tab;
      $('murid').hidden = tab !== 'murid';
      $('guru').hidden = tab !== 'guru';

      tabButton.parentNode.querySelectorAll('button').forEach(function (button) {
        button.className = 'btn' + (button === tabButton ? ' g' : '');
      });
    }
  });

  var yes1 = $('yes1');
  if (yes1) {
    yes1.onclick = function () {
      var button = el('button', 'btn g', 'Lanjut ke Mencegah');
      button.dataset.go = 'mencegah';
      $('gfb').replaceChildren(document.createTextNode('Mantap! '), button);
    };
  }

  var no1 = $('no1');
  if (no1) {
    no1.onclick = function () {
      $('gfb').textContent = 'Gak apa-apa. Baca lagi bagian dampak perundungan, lalu pikirkan lagi.';
    };
  }

  var yes2 = $('yes2');
  if (yes2) {
    yes2.onclick = function () {
      var button = el('button', 'btn g', 'Menyikapi');
      button.dataset.go = 'menyikapi';
      $('fb2').replaceChildren(document.createTextNode('Hebat! Pertahankan ya 🌟 Lanjut ke '), button);
    };
  }

  var no2 = $('no2');
  if (no2) {
    no2.onclick = function () {
      $('fb2').textContent = 'Gak apa-apa. Mulai dari satu langkah kecil hari ini: sapa satu teman dengan ramah.';
    };
  }


  /* ---------------------------------------------------------------
     9. INISIALISASI
     --------------------------------------------------------------- */

  go((location.hash || '#home').slice(1));
  renderJppiChart();
  updateProgressBadges();
  syncGate();

  /* ---------------------------------------------------------------
     Animasi semua section: reveal saat scroll, progres membaca,
     dan angka penghitung di badge kepala section.
     Semua hanya aktif bila pengguna TIDAK meminta animasi minim dan
     browser mendukung IntersectionObserver; selain itu konten tampil
     normal sejak awal tanpa animasi (fallback sama dengan sebelumnya).
     --------------------------------------------------------------- */

  function animDiizinkan() {
    return !(window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* Progres membaca: hitung accordion yang terbuka pada konten yang
     terlihat (detail di dalam tab tersembunyi tidak dihitung), lalu isi
     bar "X dari N bagian terbuka". Elemen progres disembunyikan di HTML —
     hanya ditampilkan JS, jadi tanpa JS pengunjung tetap melihat konten
     tanpa bar progres basi. */
  var sinkronProgres = [];

  function pasangProgres(view) {
    var box = view.querySelector('.sec-prog');
    if (!box) return;

    var text = box.querySelector('.sec-prog-text');
    var fill = box.querySelector('.sec-prog-bar i');

    function terlihat(node) {
      for (var n = node; n; n = n.parentElement) {
        if (n.hidden) return false;
        if (n === view) break;
      }
      return true;
    }

    function sync() {
      var items = [];
      Array.prototype.forEach.call(view.querySelectorAll('details'), function (item) {
        if (terlihat(item)) items.push(item);
      });
      if (!items.length) return;

      var buka = 0;
      items.forEach(function (item) {
        if (item.open) buka += 1;
      });

      box.hidden = false;
      if (text) text.textContent = buka + ' dari ' + items.length + ' bagian terbuka';
      if (fill) fill.style.width = Math.round(buka / items.length * 100) + '%';
      box.classList.toggle('lengkap', buka === items.length);
    }

    Array.prototype.forEach.call(view.querySelectorAll('details'), function (item) {
      item.addEventListener('toggle', sync);
    });

    sinkronProgres.push(sync);
    sync();
  }

  /* Sinkron ulang progres saat tab murid/guru berganti. Listener ini
     dipasang SETELAH handler tab di atas, sehingga status hidden sudah
     berubah lebih dulu ketika sinkron berjalan. */
  document.addEventListener('click', function (event) {
    if (!event.target.closest('[data-tab]')) return;
    sinkronProgres.forEach(function (sync) { sync(); });
  });

  /* Angka di badge kepala section: hitung naik sekali saat badge pertama
     masuk layar. Bila animasi diminta minim, browser tanpa
     IntersectionObserver, atau angka tidak terbaca, angka akhir dari HTML
     dipertahankan. */
  function hitungAngka(badge) {
    var num = badge.querySelector('.sec-num');
    if (!num) return;

    var target = parseInt(num.getAttribute('data-count'), 10);
    if (!target || !animDiizinkan() || !('IntersectionObserver' in window)) return;

    num.textContent = '0';

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        var mulai = null;
        function langkah(ts) {
          if (mulai === null) mulai = ts;
          var t = Math.min((ts - mulai) / 900, 1);
          var ease = 1 - Math.pow(1 - t, 3);  /* ease-out cubic */
          num.textContent = String(Math.round(target * ease));
          if (t < 1) requestAnimationFrame(langkah);
        }
        requestAnimationFrame(langkah);
      });
    }, { threshold: 0.4 });

    observer.observe(num);
  }

  /* Reveal bertahap: beri class .anim pada section, tandai tiap blok
     dalam atribut data-reveal dengan .rv, lalu tampilkan bertahap saat
     masuk layar. Tanpa IntersectionObserver atau saat animasi diminim-
     kan, class .anim tidak dipasang sehingga CSS animasi tidak aktif
     dan konten tampil normal sejak awal. */
  function animateView(view) {
    var daftar = view.getAttribute('data-reveal');
    if (!daftar || !animDiizinkan() || !('IntersectionObserver' in window)) return;

    var targets = view.querySelectorAll(daftar);
    if (!targets.length) return;

    view.classList.add('anim');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    /* --d dihitung per induk: blok dalam satu wadah masuk bergelombang
       berurutan, wadah berbeda mulai bersamaan. */
    var perInduk = new Map();
    Array.prototype.forEach.call(targets, function (target) {
      var induk = target.parentElement;
      var urut = perInduk.get(induk) || 0;
      perInduk.set(induk, urut + 1);
      target.style.setProperty('--d', (urut % 6) * 90 + 'ms');
      target.classList.add('rv');
      observer.observe(target);
    });
  }

  /* Pasang progres, animasi, dan badge penghitung untuk tiap section. */
  Array.prototype.forEach.call(document.querySelectorAll('.view'), function (view) {
    pasangProgres(view);
    animateView(view);

    var badge = view.querySelector('.sec-badge');
    if (badge) hitungAngka(badge);
  });


  // Simpan progres terakhir sebelum halaman ditutup / ditinggal
  window.addEventListener('pagehide', function () {
    saveSession('mengenal');
    saveSession('menyikapi');
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      saveSession('mengenal');
      saveSession('menyikapi');
    }
  });

  // Layar pembuka
  setTimeout(function () {
    var loader = $('load');
    if (!loader) return;
    loader.style.opacity = 0;
    setTimeout(function () { loader.style.display = 'none'; }, 500);
  }, 1500);
})();
