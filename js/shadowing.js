// Local-only shadowing: record yourself saying a phrase and play it back next to
// the reference audio. Audio lives in browser memory only — never written to
// localStorage and never sent over the network. All recordings clear on reload.

const Shadow = (() => {
  // recordingId -> { blob: Blob, url: string }
  const recordings = new Map();
  let activeStream = null;
  let activeRecorder = null;
  let activeKey = null;
  let activeOnStop = null;

  function supported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  }

  async function startRecording(key, onStop) {
    if (!supported()) {
      toast("Recording not supported in this browser.");
      return false;
    }
    // Stop any in-flight recording first
    if (activeRecorder && activeRecorder.state !== "inactive") {
      try { activeRecorder.stop(); } catch (_) {}
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      activeStream = stream;
      const chunks = [];
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus"
                : MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm"
                : MediaRecorder.isTypeSupported("audio/mp4") ? "audio/mp4"
                : "";
      const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      activeRecorder = rec;
      activeKey = key;
      activeOnStop = onStop;

      rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
        // Revoke prior url for this key
        const prev = recordings.get(key);
        if (prev?.url) URL.revokeObjectURL(prev.url);
        const url = URL.createObjectURL(blob);
        recordings.set(key, { blob, url });
        // Stop the mic so the browser indicator turns off
        if (activeStream) {
          activeStream.getTracks().forEach(t => t.stop());
          activeStream = null;
        }
        activeRecorder = null;
        activeKey = null;
        const cb = activeOnStop; activeOnStop = null;
        if (cb) cb();
      };
      rec.start();
      return true;
    } catch (e) {
      console.warn("Mic permission denied or unavailable:", e);
      toast("Microphone access denied. Allow it in browser settings to use shadowing.");
      return false;
    }
  }

  function stopRecording() {
    if (activeRecorder && activeRecorder.state !== "inactive") {
      try { activeRecorder.stop(); } catch (_) {}
    }
  }

  function hasRecording(key) {
    return recordings.has(key);
  }

  function play(key) {
    const r = recordings.get(key);
    if (!r) return;
    const audio = new window.Audio(r.url);
    audio.play().catch(() => toast("Couldn't play your recording."));
    return audio;
  }

  function clear(key) {
    const r = recordings.get(key);
    if (r?.url) URL.revokeObjectURL(r.url);
    recordings.delete(key);
  }

  // Build a compact toolbar: 🔊 reference + 🎤 record + ▶ playback
  function makeToolbar(text, key) {
    const wrap = document.createElement("span");
    wrap.className = "shadow-toolbar";

    const refBtn = document.createElement("button");
    refBtn.className = "shadow-btn shadow-ref";
    refBtn.title = "Hear the reference";
    refBtn.innerHTML = "🔊";
    refBtn.addEventListener("click", (e) => { e.stopPropagation(); Speech.speak(text); });
    wrap.appendChild(refBtn);

    const recBtn = document.createElement("button");
    recBtn.className = "shadow-btn shadow-rec";
    recBtn.title = "Record yourself";
    recBtn.innerHTML = "🎤";
    wrap.appendChild(recBtn);

    const playBtn = document.createElement("button");
    playBtn.className = "shadow-btn shadow-play";
    playBtn.title = "Play your recording";
    playBtn.innerHTML = "▶";
    if (!hasRecording(key)) playBtn.classList.add("hidden");
    wrap.appendChild(playBtn);

    let isRecording = false;

    recBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (isRecording) {
        stopRecording();
        return;
      }
      // Stop any reference audio so the mic isn't picking it up
      Speech.stop();
      isRecording = true;
      recBtn.classList.add("is-recording");
      recBtn.innerHTML = "⏺";
      const started = await startRecording(key, () => {
        isRecording = false;
        recBtn.classList.remove("is-recording");
        recBtn.innerHTML = "🎤";
        playBtn.classList.remove("hidden");
        // Auto-play user's recording so they can compare immediately
        setTimeout(() => play(key), 200);
      });
      if (!started) {
        isRecording = false;
        recBtn.classList.remove("is-recording");
        recBtn.innerHTML = "🎤";
      }
    });

    playBtn.addEventListener("click", (e) => { e.stopPropagation(); play(key); });

    return wrap;
  }

  return { supported, makeToolbar, play, hasRecording, clear };
})();
