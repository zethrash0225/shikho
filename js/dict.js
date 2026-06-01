// Lightweight Gujarati→English dictionary built from all curriculum data.
// Used to provide tap-to-translate hints on Gujarati words shown in stories
// and lesson prompts. Coverage is partial — conjugated verb forms and rare
// words may not match. The hint UI gracefully no-ops on misses.

const GuDict = (() => {
  let table = null; // Map<string, string[]> — word → list of English glosses

  function add(map, gu, en) {
    if (!gu || !en) return;
    const key = gu.trim();
    if (!key) return;
    const arr = map.get(key) || [];
    if (!arr.includes(en)) arr.push(en);
    map.set(key, arr);
  }

  function build() {
    const map = new Map();

    // From UNITS exercises — capture both single words and short phrases.
    if (typeof UNITS !== "undefined") {
      for (const u of UNITS) for (const l of u.lessons) for (const ex of l.exercises) {
        if (ex.gu && ex.en) add(map, ex.gu, ex.en);
        if (ex.expected && ex.en) add(map, ex.expected, ex.en);
        if (ex.correct && ex.en) add(map, ex.correct, ex.en);
        if (ex.pairs) for (const p of ex.pairs) add(map, p.gu, p.en);
      }
    }

    // From STORIES gloss
    if (typeof STORIES !== "undefined") {
      for (const s of STORIES) if (s.gloss) for (const g of s.gloss) add(map, g.gu, g.en);
    }

    // From legacy VOCAB
    if (typeof VOCAB !== "undefined") {
      for (const lvl of Object.values(VOCAB)) for (const v of lvl) add(map, v.gu, v.en);
    }

    // From ALPHABET
    if (typeof ALPHABET !== "undefined") {
      for (const v of ALPHABET.vowels) add(map, v.char, `${v.translit} — ${v.sound}`);
      for (const c of ALPHABET.consonants) add(map, c.char, `${c.translit} — ${c.sound}`);
      for (const n of ALPHABET.numbers) add(map, n.char, `${n.value} (${n.translit})`);
    }

    table = map;
  }

  function lookup(word) {
    if (!table) build();
    if (!word) return null;
    const direct = table.get(word);
    if (direct) return direct.join(" · ");
    // Try stripping trailing punctuation
    const stripped = word.replace(/[\s।.,?!:;"'()]+$/u, "").replace(/^[\s।.,?!:;"'()]+/u, "");
    if (stripped !== word) {
      const v = table.get(stripped);
      if (v) return v.join(" · ");
    }
    return null;
  }

  // Tokenize a Gujarati phrase preserving punctuation. Splits on whitespace.
  function tokenize(text) {
    return text.split(/(\s+)/);
  }

  // Render Gujarati text into a DOM element with tappable hint words.
  // Words present in the dictionary get a dotted underline + click handler.
  function renderHintable(text, opts = {}) {
    const span = document.createElement("span");
    span.className = "gu-hintable";
    const tokens = tokenize(text);
    for (const tok of tokens) {
      if (/^\s+$/.test(tok)) {
        span.appendChild(document.createTextNode(tok));
        continue;
      }
      // Strip surrounding punctuation for lookup
      const m = tok.match(/^([\s।.,?!:;"'()]*)(.*?)([\s।.,?!:;"'()]*)$/u);
      const lead = m ? m[1] : "";
      const core = m ? m[2] : tok;
      const trail = m ? m[3] : "";
      if (lead) span.appendChild(document.createTextNode(lead));
      const gloss = lookup(core);
      if (gloss) {
        const w = document.createElement("span");
        w.className = "gu-word hintable";
        w.textContent = core;
        w.addEventListener("click", (e) => {
          e.stopPropagation();
          showHint(w, core, gloss);
        });
        span.appendChild(w);
      } else {
        const w = document.createElement("span");
        w.className = "gu-word";
        w.textContent = core;
        span.appendChild(w);
      }
      if (trail) span.appendChild(document.createTextNode(trail));
    }
    return span;
  }

  // Floating tooltip with the gloss. Click anywhere to dismiss.
  let currentTip = null;
  function showHint(anchor, word, gloss) {
    dismissHint();
    const tip = document.createElement("div");
    tip.className = "gu-hint-tooltip";
    tip.innerHTML = `
      <div class="hint-gu">${word}</div>
      <div class="hint-en">${gloss}</div>
      <button class="hint-speak">🔊</button>
    `;
    document.body.appendChild(tip);
    const r = anchor.getBoundingClientRect();
    const tr = tip.getBoundingClientRect();
    let left = r.left + r.width / 2 - tr.width / 2;
    let top = r.top - tr.height - 8 + window.scrollY;
    if (top < window.scrollY + 8) top = r.bottom + 8 + window.scrollY;
    left = Math.max(8, Math.min(left, window.innerWidth - tr.width - 8));
    tip.style.left = left + "px";
    tip.style.top = top + "px";
    tip.querySelector(".hint-speak").addEventListener("click", (e) => {
      e.stopPropagation();
      Speech.speak(word);
    });
    currentTip = tip;
    setTimeout(() => document.addEventListener("click", dismissHint, { once: true }), 0);
  }

  function dismissHint() {
    if (currentTip) {
      currentTip.remove();
      currentTip = null;
    }
  }

  return { build, lookup, renderHintable, dismissHint };
})();
