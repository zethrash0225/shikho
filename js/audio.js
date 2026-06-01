// Audio cascade with reliability hardening.
//
// Each speak(text) call:
//   1. Chunks long text into ~150-char pieces split on sentence/comma boundaries.
//      (Google Translate TTS has a hard ~200-char limit per request.)
//   2. For each chunk, tries Google TTS via <audio>:
//      - Detects empty/silent responses via loadedmetadata.duration check
//      - Retries once after a short delay on non-autoplay failure (handles rate limits)
//   3. Falls back to Web Speech for any chunk Google can't serve.
//   4. Maintains a session counter so a new speak() / stop() cleanly aborts the loop.

const Speech = (() => {
  let voices = [];
  let preferredVoiceURI = null;
  let lastMode = null;
  let currentAudio = null;
  let consecutiveGoogleFailures = 0;
  let speakSession = 0;  // bump to invalidate any in-flight chunk loop

  function init() {
    try {
      const state = Storage.load();
      preferredVoiceURI = state.preferredVoiceURI || null;
    } catch (_) {}
    if ("speechSynthesis" in window) {
      voices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
      };
    }
  }

  function listVoices() {
    if (!voices.length && "speechSynthesis" in window) {
      voices = window.speechSynthesis.getVoices();
    }
    return voices;
  }

  function setPreferredVoice(uri) {
    preferredVoiceURI = uri || null;
    const s = Storage.load();
    s.preferredVoiceURI = preferredVoiceURI;
    Storage.save(s);
  }

  function autoVoice() {
    const all = listVoices();
    if (!all.length) return null;
    if (preferredVoiceURI) {
      const v = all.find(v => v.voiceURI === preferredVoiceURI);
      if (v) return v;
    }
    let v = all.find(v => /^gu/i.test(v.lang || ""));
    if (v) return v;
    v = all.find(v => /^hi/i.test(v.lang || ""));
    if (v) return v;
    v = all.find(v => /(india|indian|marathi|bengali|tamil|punjabi)/i.test((v.name || "") + " " + (v.lang || "")));
    return v || null;
  }

  function googleTtsUrl(text) {
    const q = encodeURIComponent(text);
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${q}&tl=gu&client=tw-ob&ttsspeed=0.9`;
  }

  function isAutoplayBlock(err) {
    if (!err) return false;
    if (err.name === "NotAllowedError") return true;
    if (typeof err.message === "string" && /play\(\) (failed|request)/i.test(err.message)) return true;
    return false;
  }

  // Split text into chunks that fit comfortably under Google TTS's ~200-char limit.
  // First splits on sentence boundaries, then commas if a sentence is still too long.
  function chunkText(text, maxLen = 150) {
    text = text.trim();
    if (text.length <= maxLen) return [text];

    // Split on sentence punctuation; keep the punctuation attached.
    const sentenceRe = /([^।.!?]+[।.!?]?)/g;
    const sentences = (text.match(sentenceRe) || [text]).map(s => s.trim()).filter(Boolean);

    // Greedy combine sentences up to maxLen
    const chunks = [];
    let cur = "";
    for (const s of sentences) {
      if (!cur) cur = s;
      else if ((cur + " " + s).length <= maxLen) cur = cur + " " + s;
      else { chunks.push(cur); cur = s; }
    }
    if (cur) chunks.push(cur);

    // Any chunk still over maxLen → split on commas
    const out = [];
    for (const c of chunks) {
      if (c.length <= maxLen) { out.push(c); continue; }
      const parts = c.split(/,\s*/);
      let sub = "";
      for (const p of parts) {
        if (!sub) sub = p;
        else if ((sub + ", " + p).length <= maxLen) sub = sub + ", " + p;
        else { out.push(sub); sub = p; }
      }
      if (sub) out.push(sub);
    }

    // Last resort — hard wrap any chunk still too long
    return out.flatMap(c => {
      if (c.length <= maxLen) return [c];
      const slices = [];
      for (let i = 0; i < c.length; i += maxLen) slices.push(c.slice(i, i + maxLen));
      return slices;
    });
  }

  // Speak a single chunk via Google TTS. Detects empty/silent responses by
  // checking the loaded audio duration; treats them as failures.
  function speakViaGoogle(text) {
    return new Promise((resolve, reject) => {
      try {
        if (currentAudio) { try { currentAudio.pause(); } catch (_) {} currentAudio = null; }
        const a = new window.Audio(googleTtsUrl(text));
        currentAudio = a;
        let resolved = false;

        // If the loaded audio is suspiciously short, treat as silent/failed
        a.addEventListener("loadedmetadata", () => {
          if (resolved) return;
          if (isFinite(a.duration) && a.duration > 0 && a.duration < 0.2) {
            resolved = true;
            try { a.pause(); } catch (_) {}
            reject(new Error("google_tts_empty"));
          }
        });

        a.addEventListener("error", () => {
          if (resolved) return;
          resolved = true;
          reject(new Error("google_tts_error"));
        });
        a.addEventListener("ended", () => {
          if (resolved) return;
          resolved = true;
          resolve();
        });
        a.play().catch(err => {
          if (resolved) return;
          resolved = true;
          reject(err);
        });

        // Safety timeout — if nothing has happened after 8s, give up on this attempt
        setTimeout(() => {
          if (resolved) return;
          resolved = true;
          try { a.pause(); } catch (_) {}
          reject(new Error("google_tts_timeout"));
        }, 8000);
      } catch (e) { reject(e); }
    });
  }

  function speakViaWebSpeech(text, opts) {
    return new Promise((resolve, reject) => {
      if (!("speechSynthesis" in window)) return reject(new Error("no_speech_api"));
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = autoVoice();
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "gu-IN"; }
      u.rate = (opts && opts.rate) || 0.85;
      u.pitch = (opts && opts.pitch) || 1.0;
      let settled = false;
      u.onend = () => { if (!settled) { settled = true; resolve(); } };
      u.onerror = (e) => { if (!settled) { settled = true; reject(new Error("speech_error: " + (e.error || ""))); } };
      window.speechSynthesis.speak(u);
      setTimeout(() => { if (!settled) { settled = true; resolve(); } }, Math.max(1500, text.length * 80));
    });
  }

  // Single-chunk speak: Google with one retry on non-autoplay failure, then Web Speech.
  async function speakOne(text, opts) {
    try {
      await speakViaGoogle(text);
      lastMode = "google";
      consecutiveGoogleFailures = 0;
      return;
    } catch (e) {
      const autoplay = isAutoplayBlock(e);
      if (!autoplay) consecutiveGoogleFailures += 1;
      // Retry once after a short delay for transient rate-limit / empty-response failures.
      // Skip retry for autoplay blocks (they'll just block again).
      if (!autoplay) {
        await new Promise(r => setTimeout(r, 450));
        try {
          await speakViaGoogle(text);
          lastMode = "google";
          consecutiveGoogleFailures = 0;
          return;
        } catch (_) { /* fall through */ }
      }
    }

    // Fallback to Web Speech for this chunk only
    try {
      await speakViaWebSpeech(text, opts);
      lastMode = "speech";
    } catch (_) {
      lastMode = "none";
    }
  }

  async function speak(text, opts = {}) {
    if (!text) return;
    const session = ++speakSession;
    const chunks = chunkText(text);

    for (const chunk of chunks) {
      if (session !== speakSession) return; // canceled by another speak() or stop()
      await speakOne(chunk, opts);
      // Brief pause between chunks for natural cadence
      if (chunks.length > 1 && session === speakSession) {
        await new Promise(r => setTimeout(r, 120));
      }
    }

    if (consecutiveGoogleFailures >= 3 && !autoVoice() && !window.__warnedNoAudio) {
      window.__warnedNoAudio = true;
      toast("Audio isn't working reliably. Check Settings → Pronunciation.");
    }
  }

  function status() {
    if (lastMode === "google") return "Using Google Translate TTS";
    if (lastMode === "speech") {
      const v = autoVoice();
      if (!v) return "No Indic voice installed (Web Speech fallback)";
      if (/^gu/i.test(v.lang)) return `Gujarati voice: ${v.name}`;
      if (/^hi/i.test(v.lang)) return `Hindi voice (fallback): ${v.name}`;
      return `Voice: ${v.name}`;
    }
    if (lastMode === "none") return "Audio unavailable for last attempt";
    return "Will try Google Translate TTS first";
  }

  function stop() {
    speakSession++; // invalidate any in-flight chunk loop
    if (currentAudio) { try { currentAudio.pause(); } catch(_){}; currentAudio = null; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  function diagnostics() {
    return {
      lastMode,
      consecutiveGoogleFailures,
      voiceCount: listVoices().length,
      preferredVoice: autoVoice()?.name || "(none)",
    };
  }

  return { init, speak, stop, status, listVoices, setPreferredVoice, autoVoice, diagnostics, chunkText };
})();

// Helper to make a speak button
function speakButton(text) {
  const btn = document.createElement("button");
  btn.className = "speak-btn";
  btn.title = "Listen";
  btn.innerHTML = "🔊";
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    Speech.speak(text);
  });
  return btn;
}

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}
