// Settings view
const SettingsView = {
  render(container) {
    container.innerHTML = "";

    const header = document.createElement("div");
    header.className = "view-header";
    header.innerHTML = `<h2>Settings</h2><p>Configure audio, AI tutor, and progress.</p>`;
    container.appendChild(header);

    const state = Storage.load();

    // ---- Install as web app ----
    const installSec = document.createElement("div");
    installSec.className = "settings-section install-section";
    function renderInstall() {
      const installed = window.__isInstalled;
      const hasPrompt = !!window.__installPrompt;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const isLocal = location.protocol === "file:";

      let body = "";
      if (installed) {
        body = `<p>This app is already installed on your device.</p>`;
      } else if (isLocal) {
        body = `<p>You're running the app from a local file. To install, host it on a server (GitHub Pages, Netlify) or open the bundled <code>INSTALL-ANDROID.md</code> for step-by-step instructions.</p>`;
      } else if (isIOS) {
        body = `<p>On iPhone/iPad: tap the <strong>Share</strong> icon in Safari → <strong>Add to Home Screen</strong>. The app will install as a standalone icon. (iOS doesn't expose a programmatic install button.)</p>`;
      } else if (hasPrompt) {
        body = `<p>Install Shīkho as a standalone app on this device. It will launch full-screen with its own icon, work offline, and stay out of your browser tabs.</p>
                <div class="setting-row"><span></span><button class="btn install-btn" id="do-install">Install on this device</button></div>`;
      } else {
        body = `<p>Your browser hasn't offered the install prompt yet. This usually means: the page just loaded (give it a few seconds), your browser doesn't support installable PWAs, or the app is already installed. On desktop Chrome, look for an <strong>install ⊕</strong> icon in the address bar.</p>`;
      }

      installSec.innerHTML = `<h3>Install as app</h3>${body}`;
      const btn = installSec.querySelector("#do-install");
      if (btn) {
        btn.addEventListener("click", async () => {
          const e = window.__installPrompt;
          if (!e) return;
          e.prompt();
          try {
            const result = await e.userChoice;
            toast(result.outcome === "accepted" ? "Installing…" : "Install canceled.");
            window.__installPrompt = null;
            renderInstall();
          } catch (_) {}
        });
      }
    }
    container.appendChild(installSec);
    renderInstall();
    document.addEventListener("install-available", renderInstall, { once: true });
    document.addEventListener("install-state-changed", renderInstall, { once: true });

    // ---- Appearance ----
    const themeSec = document.createElement("div");
    themeSec.className = "settings-section";
    themeSec.innerHTML = `
      <h3>Appearance</h3>
      <p>Choose a theme. "Auto" follows your device setting.</p>
      <div class="setting-row">
        <label for="theme-picker">Theme</label>
        <select id="theme-picker">
          <option value="auto"${state.theme === "auto" ? " selected" : ""}>Auto (follow system)</option>
          <option value="light"${state.theme === "light" ? " selected" : ""}>Light</option>
          <option value="dark"${state.theme === "dark" ? " selected" : ""}>Dark</option>
        </select>
      </div>
    `;
    container.appendChild(themeSec);
    themeSec.querySelector("#theme-picker").addEventListener("change", (e) => {
      const s = Storage.load();
      s.theme = e.target.value;
      Storage.save(s);
      document.documentElement.setAttribute("data-theme", s.theme);
      toast("Theme updated");
    });

    // ---- Lesson style ----
    const lessonSec = document.createElement("div");
    lessonSec.className = "settings-section";
    lessonSec.innerHTML = `
      <h3>Lesson style</h3>
      <p>Reverse-direction exercises force you to produce Gujarati after recognizing it. Recommended for real progress.</p>
      <div class="setting-row">
        <label for="reverse-mode">Production exercises</label>
        <select id="reverse-mode">
          <option value="true"${state.reverseMode !== false ? " selected" : ""}>On — generate reverse for each prompt (longer lessons)</option>
          <option value="false"${state.reverseMode === false ? " selected" : ""}>Off — recognition only</option>
        </select>
      </div>
    `;
    container.appendChild(lessonSec);
    lessonSec.querySelector("#reverse-mode").addEventListener("change", (e) => {
      const s = Storage.load();
      s.reverseMode = e.target.value === "true";
      Storage.save(s);
      toast(s.reverseMode ? "Production exercises on" : "Production exercises off");
    });

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
