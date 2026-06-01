// On-screen Gujarati keyboard.
// Layout: consonants (in 3 rows by traditional order), then matras + halant,
// then common conjuncts as quick-access keys, then a space/punctuation/digit row.
//
// Half-letter usage:  type a consonant then ્ (halant) and the next consonant
// to form a conjunct. E.g.,  ન + મ + સ + ્ + ત + ે = નમસ્તે (namaste).

const GUKB_ROWS = [
  // Vowels
  ["અ","આ","ઇ","ઈ","ઉ","ઊ","એ","ઐ","ઓ","ઔ"],
  // Consonants
  ["ક","ખ","ગ","ઘ","ચ","છ","જ","ઝ","ટ","ઠ","ડ","ઢ","ણ"],
  ["ત","થ","દ","ધ","ન","પ","ફ","બ","ભ","મ","ય","ર"],
  ["લ","વ","શ","ષ","સ","હ","ળ"],
  // Matras (vowel signs)
  ["ા","િ","ી","ુ","ૂ","ે","ૈ","ો","ૌ","ં","ઃ"],
];

// Most common conjuncts in everyday Gujarati. Tapping inserts the
// pre-composed conjunct so users don't have to remember the halant shortcut.
const GUKB_CONJUNCTS = [
  "ક્ષ","જ્ઞ","સ્ત","સ્થ","સ્ય","ત્ર","ત્ય","ત્વ",
  "ન્ય","ન્ત","ન્દ","મ્ય","ર્ય","ષ્ટ","શ્ર","દ્ધ",
  "દ્વ","પ્ર","બ્ર","વ્ય","ધ્ય","ગ્ર","ચ્છ","હ્ય",
];

function makeKeyboard(target) {
  const kb = document.createElement("div");
  kb.className = "gu-keyboard";

  // Hint
  const hint = document.createElement("div");
  hint.className = "kb-hint";
  hint.innerHTML = `Half letter (જોડાક્ષર): tap consonant → <span class="kb-halant-token">્</span> → next consonant. Or pick one from the "Common" row.`;
  kb.appendChild(hint);

  // Letter rows
  for (const row of GUKB_ROWS) {
    const r = document.createElement("div");
    r.className = "kb-row";
    for (const ch of row) {
      r.appendChild(makeKey(target, ch));
    }
    kb.appendChild(r);
  }

  // Dedicated halant + space + punctuation row
  const utility = document.createElement("div");
  utility.className = "kb-row";
  utility.appendChild(makeKey(target, "્", { label: "્ Half", className: "kb-halant" }));
  utility.appendChild(makeKey(target, " ", { label: "space", className: "kb-space" }));
  utility.appendChild(makeKey(target, "।", { label: "।" }));
  utility.appendChild(makeKey(target, "?",   { label: "?" }));
  utility.appendChild(makeKey(target, ",",   { label: "," }));
  utility.appendChild(makeBackspace(target));
  kb.appendChild(utility);

  // Common conjuncts header
  const conjHeader = document.createElement("div");
  conjHeader.className = "kb-section-label";
  conjHeader.textContent = "Common conjuncts (જોડાક્ષર)";
  kb.appendChild(conjHeader);

  const conjRow = document.createElement("div");
  conjRow.className = "kb-row";
  for (const cj of GUKB_CONJUNCTS) {
    conjRow.appendChild(makeKey(target, cj, { className: "kb-conjunct" }));
  }
  kb.appendChild(conjRow);

  // Digits
  const digitRow = document.createElement("div");
  digitRow.className = "kb-row";
  for (const d of ["૦","૧","૨","૩","૪","૫","૬","૭","૮","૯"]) {
    digitRow.appendChild(makeKey(target, d));
  }
  const clear = document.createElement("button");
  clear.type = "button";
  clear.className = "kb-key special";
  clear.textContent = "Clear";
  clear.addEventListener("click", (e) => {
    e.preventDefault();
    target.value = "";
    target.focus();
  });
  digitRow.appendChild(clear);
  kb.appendChild(digitRow);

  return kb;
}

function makeKey(target, ch, opts = {}) {
  const key = document.createElement("button");
  key.type = "button";
  key.className = "kb-key " + (opts.className || "");
  key.textContent = opts.label || ch;
  key.addEventListener("click", (e) => {
    e.preventDefault();
    insertAtCursor(target, ch);
  });
  return key;
}

function makeBackspace(target) {
  const back = document.createElement("button");
  back.type = "button";
  back.className = "kb-key special kb-backspace";
  back.textContent = "⌫";
  back.addEventListener("click", (e) => {
    e.preventDefault();
    const start = target.selectionStart;
    if (start > 0) {
      target.value = target.value.slice(0, start - 1) + target.value.slice(target.selectionEnd);
      target.selectionStart = target.selectionEnd = start - 1;
      target.focus();
    }
  });
  return back;
}

function insertAtCursor(el, text) {
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  el.value = el.value.slice(0, start) + text + el.value.slice(end);
  el.selectionStart = el.selectionEnd = start + text.length;
  el.focus();
}
