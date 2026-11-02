// Aynı github.io alan adını paylaşan diğer ders siteleriyle karışmasın diye anahtarlar "os-" ile başlar.
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
};

const main = document.getElementById("main");
const nav = document.getElementById("nav");
const side = document.getElementById("side");
const scrim = document.getElementById("scrim");
const LETTERS = ["A", "B", "C", "D"];
const VIZE_WEEKS = WEEKS.filter(w => w.exam === "vize");
const FINAL_WEEKS = WEEKS.filter(w => w.exam === "final");

// Şıkları her soru için sabit ama karışık sırada göstermek (doğru cevap hep aynı harfte olmasın).
function seededOrder(n, seed) {
  const idx = [...Array(n).keys()];
  let s = seed;
  for (let i = n - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

function testLabel(i) {
  const t = TESTS[i];
  return (t.kind === "vize" ? "V" : "F") + TESTS.slice(0, i + 1).filter(x => x.kind === t.kind).length;
}

function topicLabel(topic) {
  const [wk, sec] = topic.replace("hafta-", "").split(":");
  const w = WEEKS.find(x => x.id === Number(wk));
  return w ? `Hafta ${w.id} · ${w.title}` : "Konu";
}

function route() {
  const h = decodeURIComponent(location.hash.replace("#", "")) || "home";
  closeMenu();
  let scrollTarget = null;
  if (h.startsWith("hafta-")) {
    const [wk, sec] = h.replace("hafta-", "").split(":");
    renderWeek(Number(wk));
    scrollTarget = sec;
  }
  else if (h.startsWith("deneme-")) renderTest(Number(h.split("-")[1]));
  else if (h === "denemeler") renderTestList();
  else if (h === "cikmis") renderPapers();
  else if (h.startsWith("cikmis-")) renderSolved(h.replace("cikmis-", ""));
  else renderHome();
  renderNav(h.split(":")[0]);
  const el = scrollTarget && document.getElementById(scrollTarget);
  if (el) {
    el.scrollIntoView({ block: "start" });
    el.classList.add("flash");
  } else window.scrollTo(0, 0);
}

function renderNav(current) {
  const done = store.get("os-done", []);
  const best = store.get("os-best", {});
  const weekBtn = w => {
    const id = "hafta-" + w.id;
    return `<button data-go="${id}" class="${current === id ? "active" : ""}"><span class="num">${w.id}</span><span>${w.title}</span>${done.includes(w.id) ? '<span class="done-dot">✓</span>' : ""}</button>`;
  };
  const testBtn = (t, i) => {
    const id = "deneme-" + (i + 1);
    const b = best[i + 1];
    return `<button data-go="${id}" class="${current === id ? "active" : ""}"><span class="num">${testLabel(i)}</span><span>${t.title}</span>${b !== undefined ? `<span class="done-dot">${b}/${t.questions.length}</span>` : ""}</button>`;
  };
  let html = `<button data-go="home" class="${current === "home" ? "active" : ""}"><span class="num">⌂</span>Ana sayfa</button>`;
  html += `<div class="nav-group">Vize konuları (1–5)</div>` + VIZE_WEEKS.map(weekBtn).join("");
  html += `<div class="nav-group">Final konuları (6–9)</div>` + FINAL_WEEKS.map(weekBtn).join("");
  html += `<div class="nav-group">Çıkmış sorular</div>`;
  html += `<button data-go="cikmis" class="${current === "cikmis" ? "active" : ""}"><span class="num">📄</span>Tüm kâğıtlar (PDF)</button>`;
  html += SOLVED.map(s => `<button data-go="cikmis-${s.id}" class="${current === "cikmis-" + s.id ? "active" : ""}"><span class="num">✓</span><span>${s.title.split(" (")[0]} çözümü</span></button>`).join("");
  html += `<div class="nav-group">Denemeler</div>`;
  html += `<button data-go="denemeler" class="${current === "denemeler" ? "active" : ""}"><span class="num">≡</span>Tüm denemeler</button>`;
  html += TESTS.map((t, i) => t.kind === "vize" ? testBtn(t, i) : "").join("");
  html += TESTS.map((t, i) => t.kind === "final" ? testBtn(t, i) : "").join("");
  nav.innerHTML = html;
}

function weekCards(list, done) {
  return `<div class="week-grid">${list.map(w => `
    <button class="week-card" data-go="hafta-${w.id}">
      <div class="wk">HAFTA ${w.id} · ${w.exam === "vize" ? "VİZE" : "FİNAL"} ${done.includes(w.id) ? "· ✓" : ""}</div>
      <div class="tt">${w.title}</div>
      <div class="ds">${w.short}</div>
    </button>`).join("")}</div>`;
}

function renderHome() {
  const done = store.get("os-done", []);
  main.innerHTML = `
    <div class="eyebrow">BSM · Sakarya Üniversitesi · 5. yarıyıl</div>
    <h1>İşletim Sistemleri çalışma rehberi</h1>
    <p class="lead">9 haftanın özetleri, çıkmış sınavların adım adım çözümleri ve çıkmış sorular tarzında 5 vize ve 5 final denemesi. Vize 1–5. haftalardan, final ağırlıklı olarak 6–9. haftalardan sorar.</p>
    <div class="card"><b>İlerleme:</b> ${done.length} / ${WEEKS.length} hafta tamamlandı</div>
    <div class="box warn"><span class="label">📄 Çıkmış sorular</span>
      2024 vizesi, 2023-2024 ve 2022-2023 finallerinin her sorusu adım adım çözüldü; her çözümde "Konuya git" ile ilgili ders başlığına gidebilirsin.
      Diğer yılların kâğıtları PDF olarak açılıp indirilebilir. <a href="#cikmis">Çıkmış sorulara git →</a>
    </div>
    <h2>Vize konuları (1–5. hafta)</h2>
    ${weekCards(VIZE_WEEKS, done)}
    <h2>Final konuları (6–9. hafta)</h2>
    ${weekCards(FINAL_WEEKS, done)}
    <div class="box tip"><span class="label">Sınavda sürekli çıkanlar</span>
      fork() çıktısı ve proses sayısı (2ⁿ) · Amdahl · FCFS/SJF/SRTF/öncelik/RR Gantt hesapları · MLFQ seviye · üstel ortalama · TestAndSet satır soruları · Peterson boşlukları · semafor çıktı sırası · üretici–tüketici boşlukları · Banker (boşta, ihtiyaç, güvenli dizi, istek) · sayfa adresi (p, d, çerçeve) · bit uzunlukları · iç parçalanma · TLB EAT · FIFO/OPT/LRU hata sayısı · best/first/worst fit · monitör "yanlış ifade".
    </div>
    <p><button class="btn primary" data-go="hafta-1">1. haftadan başla →</button> <button class="btn" data-go="cikmis">Çıkmış sorular</button> <button class="btn" data-go="denemeler">Denemeler</button></p>
  `;
}

function renderWeek(id) {
  const w = WEEKS.find(x => x.id === id);
  if (!w) return renderHome();
  const isDone = store.get("os-done", []).includes(id);
  const prev = WEEKS.find(x => x.id === id - 1);
  const next = WEEKS.find(x => x.id === id + 1);
  main.innerHTML = `
    <div class="eyebrow">Hafta ${w.id} · ${w.exam === "vize" ? "Vize konusu" : "Final konusu"}</div>
    <h1>${w.title}</h1>
    <div class="box key"><span class="label">🧩 Haftanın özü</span>${w.principle}</div>
    ${w.body}
    <button class="btn ${isDone ? "" : "primary"} mark-done" id="markDone">${isDone ? "✓ Tamamlandı (geri al)" : "Bu haftayı tamamladım"}</button>
    <div class="pager">
      ${prev ? `<button class="btn" data-go="hafta-${prev.id}">← Hafta ${prev.id}</button>` : "<span></span>"}
      ${next ? `<button class="btn primary" data-go="hafta-${next.id}">Hafta ${next.id} →</button>` : `<button class="btn primary" data-go="cikmis">Çıkmış sorulara geç →</button>`}
    </div>
  `;
  document.getElementById("markDone").onclick = () => {
    const d = store.get("os-done", []);
    store.set("os-done", d.includes(id) ? d.filter(x => x !== id) : [...d, id]);
    renderWeek(id);
    renderNav("hafta-" + id);
  };
}

function renderPapers() {
  const groups = ["Vize", "Final", "Kısa Sınav"];
  main.innerHTML = `
    <div class="eyebrow">Çıkmış sorular</div>
    <h1>Çıkmış sınav kâğıtları</h1>
    <p class="lead">Kâğıtlar MelisaYuksek/Sakarya-University-Ceng deposundan. "Aç" GitHub'da görüntüler, "İndir" dosyayı doğrudan indirir. Yeşil etiketli sınavların her sorusu bu sitede çözüldü.</p>
    <h2>Çözümlü sınavlar</h2>
    <div class="test-list">${SOLVED.map(s => `
      <div class="test-row"><button class="btn" data-go="cikmis-${s.id}"><b>${s.title}</b> — <span class="quiz-meta">${s.questions.length} soru, adım adım çözüm</span></button></div>`).join("")}
    </div>
    ${groups.map(g => `
      <h2>${g}</h2>
      <div class="pdf-list">${PAPERS.filter(p => p.group === g).map(p => `
        <div class="pdf-row">
          <span class="nm">${p.name} ${p.solved ? '<span class="ans">çözümlü</span>' : ""}</span>
          ${p.solved ? `<button class="btn" data-go="cikmis-${p.solved}">Çözüme git</button>` : ""}
          ${p.files.length === 1
            ? `<a class="btn" href="${SRC + p.files[0]}" target="_blank" rel="noopener">Aç</a><a class="btn" href="${RAW + p.files[0]}" download>İndir</a>`
            : p.files.map((f, i) => `<a class="btn" href="${RAW + f}" target="_blank" rel="noopener">Sayfa ${i + 1}</a>`).join("")}
        </div>`).join("")}
      </div>`).join("")}
  `;
}

function renderSolved(id) {
  const s = SOLVED.find(x => x.id === id);
  if (!s) return renderPapers();
  const paper = PAPERS.find(p => p.solved === id);
  main.innerHTML = `
    <div class="eyebrow">Çıkmış sınav çözümü · ${s.kind === "vize" ? "Vize" : "Final"}</div>
    <h1>${s.title}</h1>
    <p class="lead">${s.info}</p>
    <p>${paper ? (paper.files.length === 1
      ? `<a class="btn" href="${SRC + paper.files[0]}" target="_blank" rel="noopener">Orijinal kâğıdı aç</a> <a class="btn" href="${RAW + paper.files[0]}" download>PDF indir</a>`
      : paper.files.map((f, i) => `<a class="btn" href="${RAW + f}" target="_blank" rel="noopener" style="margin:0 6px 6px 0">Fotoğraf ${i + 1}</a>`).join("")) : ""}
      <button class="btn" id="showAll">Bütün çözümleri aç</button></p>
    <div class="box tip">Soruyu önce kâğıttan kendin çöz, sonra "Çözümü göster"e bas. Konuyu hatırlamıyorsan "Konuya git" seni ders notundaki ilgili başlığa götürür.</div>
    ${s.questions.map(q => `
      <div class="solve-q">
        <div class="meta"><b>Soru ${q.n}.</b> <span>${q.q}</span>
          <a class="topic" href="#${q.topic}">📘 Konuya git: ${topicLabel(q.topic)}</a></div>
        <p style="margin:.6em 0 0"><button class="btn" data-sol="${q.n}">Çözümü göster</button></p>
        <div class="steps" id="sol-${q.n}" hidden>
          <div><span class="ans">Cevap: ${q.a}</span></div>
          <div style="margin-top:6px">${q.s}</div>
        </div>
      </div>`).join("")}
    <div class="pager">
      <button class="btn" data-go="cikmis">← Tüm kâğıtlar</button>
      <button class="btn primary" data-go="denemeler">Denemelere geç →</button>
    </div>
  `;
  main.querySelectorAll("[data-sol]").forEach(b => {
    b.onclick = () => { document.getElementById("sol-" + b.dataset.sol).hidden = false; b.remove(); };
  });
  document.getElementById("showAll").onclick = e => {
    main.querySelectorAll("[id^='sol-']").forEach(d => { d.hidden = false; });
    main.querySelectorAll("[data-sol]").forEach(x => x.remove());
    e.target.remove();
  };
}

function renderTestList() {
  const best = store.get("os-best", {});
  const rows = kind => TESTS.map((t, i) => t.kind !== kind ? "" : `
    <div class="test-row">
      <button class="btn" data-go="deneme-${i + 1}"><b>${t.title}</b> — <span class="quiz-meta">${t.desc}</span></button>
      <span class="best">${best[i + 1] !== undefined ? "En iyi: " + best[i + 1] + "/" + t.questions.length : "—"}</span>
    </div>`).join("");
  main.innerHTML = `
    <div class="eyebrow">Denemeler</div>
    <h1>${TESTS.length} deneme, ${TESTS.reduce((s, t) => s + t.questions.length, 0)} soru</h1>
    <p class="lead">Çıkmış sınavlardaki soru tiplerine göre hazırlandı. Şıkka tıkladığın anda doğru cevap ve çözüm görünür; test bitince tekrar etmen gereken haftalar çıkar.</p>
    <h2>Vize denemeleri (1–5. hafta)</h2>
    <div class="test-list">${rows("vize")}</div>
    <h2>Final denemeleri (bütün haftalar)</h2>
    <div class="test-list">${rows("final")}</div>
  `;
}

function renderTest(n) {
  const t = TESTS[n - 1];
  if (!t) return renderTestList();
  const answers = {};
  const total = t.questions.length;
  const prev = TESTS[n - 2];
  const next = TESTS[n];

  main.innerHTML = `
    <div class="eyebrow">${t.kind === "vize" ? "Vize denemesi · 1–5. haftalar" : "Final denemesi · bütün haftalar"}</div>
    <h1>${t.title}</h1>
    <p class="quiz-meta">${t.desc} · ${total} soru · Her soruda tek doğru cevap var.</p>
    <div class="score-bar">
      <span class="pill" id="progress">0 / ${total} cevaplandı</span>
      <span class="pill" id="score">Doğru: 0</span>
      <button class="btn" id="resetBtn">Baştan başla</button>
    </div>
    <div id="qs"></div>
    <div id="result"></div>
    <div class="pager">
      ${prev ? `<button class="btn" data-go="deneme-${n - 1}">← ${prev.title}</button>` : `<button class="btn" data-go="denemeler">← Tüm denemeler</button>`}
      ${next ? `<button class="btn primary" data-go="deneme-${n + 1}">${next.title} →</button>` : `<button class="btn" data-go="denemeler">Tüm denemeler</button>`}
    </div>
  `;

  const qs = document.getElementById("qs");
  t.questions.forEach((q, qi) => {
    const order = seededOrder(q.o.length, n * 100 + qi + 7);
    const el = document.createElement("div");
    el.className = "q";
    el.innerHTML = `
      <div class="q-head"><span class="q-num">${qi + 1}.</span><span class="q-text"></span><span class="q-week">Hafta ${q.w}</span></div>
      <div class="opts">${order.map((oi, pos) => `<button class="opt" data-oi="${oi}"><span class="letter">${LETTERS[pos]})</span><span class="otext"></span></button>`).join("")}</div>
      <div class="explain" hidden></div>
    `;
    // Sorularda kod parçaları (<, &&) olduğu için metinler textContent ile yazılır.
    el.querySelector(".q-text").textContent = q.q;
    el.querySelectorAll(".opt").forEach(btn => {
      btn.querySelector(".otext").textContent = q.o[Number(btn.dataset.oi)];
      btn.onclick = () => {
        if (answers[qi] !== undefined) return;
        const chosen = Number(btn.dataset.oi);
        answers[qi] = chosen;
        el.querySelectorAll(".opt").forEach(b => {
          b.disabled = true;
          const oi = Number(b.dataset.oi);
          if (oi === q.a) b.classList.add("correct");
          else if (oi === chosen) b.classList.add("wrong");
        });
        const ex = el.querySelector(".explain");
        ex.hidden = false;
        ex.innerHTML = `<b>${chosen === q.a ? "✓ Doğru." : "✗ Yanlış."}</b> <span></span> <a href="#hafta-${q.w}">Konuya git →</a>`;
        ex.querySelector("span").textContent = q.e;
        update();
      };
    });
    qs.appendChild(el);
  });

  function update() {
    const answered = Object.keys(answers).length;
    const correct = Object.entries(answers).filter(([qi, a]) => t.questions[qi].a === a).length;
    document.getElementById("progress").textContent = `${answered} / ${total} cevaplandı`;
    document.getElementById("score").textContent = `Doğru: ${correct}`;
    if (answered === total) {
      const best = store.get("os-best", {});
      if (best[n] === undefined || correct > best[n]) { best[n] = correct; store.set("os-best", best); }
      const wrongWeeks = [...new Set(t.questions.filter((q, i) => answers[i] !== q.a).map(q => q.w))].sort((a, b) => a - b);
      document.getElementById("result").innerHTML = `
        <div class="card result">
          <div class="big">${correct} / ${total}</div>
          <div>Puan: ${Math.round((correct / total) * 100)}</div>
          ${wrongWeeks.length ? `<p>Tekrar etmen önerilen haftalar: ${wrongWeeks.map(w => `<a href="#hafta-${w}">Hafta ${w}</a>`).join(" · ")}</p>` : "<p>Hepsi doğru, tebrikler! 🎉</p>"}
        </div>`;
      renderNav("deneme-" + n);
    }
  }

  document.getElementById("resetBtn").onclick = () => renderTest(n);
}

document.addEventListener("click", e => {
  const go = e.target.closest("[data-go]");
  if (go) { e.preventDefault(); location.hash = go.dataset.go; }
});

function closeMenu() { side.classList.remove("open"); scrim.classList.remove("show"); }
document.getElementById("menuBtn").onclick = () => { side.classList.add("open"); scrim.classList.add("show"); };
scrim.onclick = closeMenu;

document.getElementById("themeBtn").onclick = () => {
  const root = document.documentElement;
  const isDark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
  store.set("vm-theme", root.dataset.theme);
};

window.addEventListener("hashchange", route);
route();
