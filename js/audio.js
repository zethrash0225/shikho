// Audio system. Cascade:
//   1. Google Translate TTS via <audio> element (works in most browsers, free, decent Gujarati)
//   2. Web Speech API with user-selected or auto-detected voice (Gujarati > Hindi > any Indic)
//   3. Failure: show toast once
//
// Note: rename global `Audio` -> `Speech` to avoid shadowing the built-in window.Audio constructor
// we need for the HTMLAudioElement approach.

const Speech = (() => {
  let voices = [];
  let preferredVoiceURI = null; // user override from settings
  let lastMode = null; // "google" | "speech" | "none"
  let googleFailed = false; // remember if Google TTS is blocked in this session
  let currentAudio = null;

  function init() {
    // Load saved voice pref
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
    // Prefer Gujarati
    let v = all.find(v => /^gu/i.test(v.lang || ""));
    if (v) return v;
    // Then Hindi (closest phonetic)
    v = all.find(v => /^hi/i.test(v.lang || ""));
    if (v) return v;
    // Any Indic
    v = all.find(v => /(india|indian|marathi|bengali|tamil|punjabi)/i.test((v.name || "") + " " + (v.lang || "")));
    return v || null;
  }

  function googleTtsUrl(text) {
    // Unofficial Google Translate TTS endpoint. `client=tw-ob` is the public-web-translate flag.
    // Works for short phrases (< ~200 chars). Plays via <audio>, which is not CORS-restricted for playback.
    const q = encodeURIComponent(text);
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${q}&tl=gu&client=tw-ob&ttsspeed=0.9`;
  }

  function speakViaGoogle(text) {
    return new Promise((resolve, reject) => {
      try {
        if (currentAudio) { currentAudio.pause(); currentAudio = null; }
        const a = new window.Audio(googleTtsUrl(text));
        currentAudio = a;
        a.addEventListener("error", () => reject(new Error("google_tts_error")));
        a.addEventListener("ended", () => resolve());
        a.addEventListener("playing", () => { /* nothing */ });
        a.play().catch(reject);
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
      u.onend = () => resolve();
      u.onerror = (e) => reject(new Error("speech_error: " + (e.error || "")));
      window.speechSynthesis.speak(u);
      // Some browsers (Safari) never fire onstart/onend if no voice. Resolve after a timeout.
      setTimeout(() => resolve(), Math.max(1500, text.length * 80));
    });
  }

  async function speak(text, opts = {}) {
    if (!text) return;
    // Mode 1: Google TTS (preferred unless it's already failed this session)
    if (!googleFailed) {
      try {
        await speakViaGoogle(text);
        lastMode = "google";
        return;
      } catch (e) {
        googleFailed = true;
        console.warn("Google TTS unavailable, falling back to Web Speech:", e.message);
      }
    }
    // Mode 2: Web Speech
    try {
      await speakViaWebSpeech(text, opts);
      lastMode = "speech";
      const v = autoVoice();
      if (!v && !window.__warnedNoVoice) {
        window.__warnedNoVoice = true;
        toast("No Gujarati voice installed. Open Settings → Audio to choose one, or install a system voice.");
      }
      return;
    } catch (e) {
      lastMode = "none";
      if (!window.__warnedNoAudio) {
        window.__warnedNoAudio = true;
        toast("Audio unavailable in this browser. Try Chrome on desktop.");
      }
    }
  }

  function status() {
    if (lastMode === "google") return "Using Google Translate TTS";
    if (lastMode === "speech") {
      const v = autoVoice();
      if (!v) return "No Indic voice installed";
      if (/^gu/i.test(v.lang)) return `Gujarati voice: ${v.name}`;
      if (/^hi/i.test(v.lang)) return `Hindi voice (fallback): ${v.name}`;
      return `Voice: ${v.name}`;
    }
    if (lastMode === "none") return "Audio unavailable";
    return googleFailed ? "Will use Web Speech voice" : "Will try Google Translate TTS first";
  }

  function stop() {
    if (currentAudio) { try { currentAudio.pause(); } catch(_){}; currentAudio = null; }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  return { init, speak, stop, status, listVoices, setPreferredVoice, autoVoice };
})();

// Helper to make a speak button. Stops propagation so it works inside clickable cards.
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

// Simple toast
function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}
