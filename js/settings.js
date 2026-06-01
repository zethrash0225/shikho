// Settings view
const SettingsView = {
  render(container) {
    container.innerHTML = "";

    const header = document.createElement("div");
    header.className = "view-header";
    header.innerHTML = `<h2>Settings</h2><p>Configure audio, AI tutor, and progress.</p>`;
    container.appendChild(header);

    const state = Storage.load();

    // ---- Audio ----
    const audioSec = document.createElement("div");
    audioSec.className = "settings-section";
    audioSec.innerHTML = `
      <h3>Pronunciation</h3>
      <p>The app uses Google Translate TTS by default for clear Gujarati audio. If that fails, it falls back to your browser's built-in voices.</p>
      <div class="setting-row">
        <label>Status</label>
        <span style="font-size: 13px; color: var(--ink-muted);">${Speech.status()}</span>
      </div>
      <div class="setting-row">
        <label>Test</label>
        <button class="btn" id="test-voice">🔊 Play "નમસ્તે"</button>
      </div>
    `;
    container.appendChild(audioSec);
    audioSec.querySelector("#test-voice").addEventListener("click", () => Speech.speak("નમસ્તે"));

    // Voice picker (Web Speech fallback)
    const voices = Speech.listVoices();
    if (voices && voices.length) {
      const row = document.createElement("div");
      row.className = "setting-row";
      const indic = voices.filter(v => /^(gu|hi|mr|bn|ta|pa)/i.test(v.lang || "") || /india|indian/i.test(v.name));
      const interesting = indic.length ? indic : voices;
      row.innerHTML = `
        <label>Fallback voice</label>
        <select id="voice-picker">
          <option value="">Auto (prefer Gujarati > Hindi)</option>
          ${interesting.map(v => `<option value="${v.voiceURI}"${v.voiceURI === state.preferredVoiceURI ? " selected" : ""}>${v.name} — ${v.lang}</option>`).join("")}
        </select>
      `;
      audioSec.appendChild(row);
      row.querySelector("#voice-picker").addEventListener("change", (e) => {
        Speech.setPreferredVoice(e.target.value);
        toast("Voice updated");
      });

      if (!indic.length) {
        const note = document.createElement("div");
        note.className = "setting-row";
        note.innerHTML = `<label>Note</label><span style="font-size: 13px; color: var(--ink-muted); max-width: 60%; text-align: right;">
          No Indic voice detected on your system. macOS: System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → install Lekha (Hindi) or any Gujarati voice. Google TTS should still work as the primary.</span>`;
        audioSec.appendChild(note);
      }
    }

    // ---- API key ----
    const apiSec = document.createElement("div");
    apiSec.className = "settings-section";
    apiSec.innerHTML = `
      <h3>AI Tutor (Anthropic API)</h3>
      <p>Add your API key to unlock the live Claude tutor in Conversation Practice. Stored only in your browser; only sent to api.anthropic.com.</p>
      <div class="setting-row">
        <label for="api-key">API key</label>
        <input type="password" id="api-key" placeholder="sk-ant-..." value="${state.apiKey || ""}" />
      </div>
      <div class="setting-row">
        <span></span>
        <button class="btn btn-primary" id="save-api">Save</button>
      </div>
    `;
    container.appendChild(apiSec);
    apiSec.querySelector("#save-api").addEventListener("click", () => {
      const v = apiSec.querySelector("#api-key").value.trim();
      const s = Storage.load();
      s.apiKey = v;
      Storage.save(s);
      toast(v ? "API key saved." : "API key cleared.");
    });

    // ---- Reset ----
    const resetSec = document.createElement("div");
    resetSec.className = "settings-section";
    resetSec.innerHTML = `
      <h3>Reset progress</h3>
      <p>Erase XP, hearts, completed lessons, and SRS data. Cannot be undone.</p>
      <div class="setting-row">
        <span></span>
        <button class="btn" id="reset-btn" style="color: var(--bad); border-color: var(--bad);">Reset everything</button>
      </div>
    `;
    container.appendChild(resetSec);
    resetSec.querySelector("#reset-btn").addEventListener("click", () => {
      if (confirm("Erase ALL progress?")) {
        Storage.reset();
        toast("Cleared.");
        setTimeout(() => location.reload(), 500);
      }
    });

    // ---- About ----
    const aboutSec = document.createElement("div");
    aboutSec.className = "settings-section";
    aboutSec.innerHTML = `
      <h3>About Shīkho</h3>
      <p>${UNITS.length} units · ${UNITS.reduce((s, u) => s + u.lessons.length, 0)} lessons · ${UNITS.reduce((s, u) => s + u.lessons.reduce((t, l) => t + l.exercises.length, 0), 0)} exercises across A1 → B1+.</p>
      <p style="font-size:13px;color:var(--ink-muted);margin-top:8px;">v0.2 · Built for Harsh</p>
    `;
    container.appendChild(aboutSec);
  },
};
