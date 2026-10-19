// Picks the right download for the visitor's computer and fills in direct links.
// Without JavaScript every button still goes to the Releases page.
(function () {
  "use strict";

  var REPO = "Quynn-Software-Solutions/QPackageTracker-releases";

  function detectOS() {
    var p = ((navigator.userAgentData && navigator.userAgentData.platform) ||
             navigator.platform || "").toLowerCase();
    var ua = navigator.userAgent.toLowerCase();
    if (/android|iphone|ipad|ipod/.test(ua)) return "mobile";
    if (p.indexOf("win") === 0 || ua.indexOf("windows") !== -1) return "windows";
    if (p.indexOf("mac") === 0 || ua.indexOf("mac os") !== -1) return "mac";
    if (p.indexOf("linux") !== -1 || ua.indexOf("linux") !== -1) return "linux";
    return "other";
  }

  function formatSize(bytes) {
    return Math.round(bytes / 1048576) + " MB";
  }

  // Tabs
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        var next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        selectTab(next, true);
      }
    });
  });

  var os = detectOS();
  var hero = document.getElementById("hero-download");
  var heroLabel = document.getElementById("hero-download-label");
  var heroMeta = document.getElementById("hero-meta");

  if (os === "linux") {
    selectTab(document.getElementById("tab-linux"));
    heroLabel.textContent = "Download for Linux";
    hero.href = "#download";
  } else if (os === "windows") {
    heroLabel.textContent = "Download for Windows";
  } else {
    hero.href = "#download";
    if (os === "mac" || os === "mobile") {
      heroMeta.textContent = "QPackageTracker runs on Windows and Linux computers. Open this page on one to download it.";
    }
  }

  function apply(release) {
    var files = release.files || {};
    document.querySelectorAll("[data-file]").forEach(function (el) {
      var f = files[el.getAttribute("data-file")];
      if (!f) {
        // Not in this release (Flatpak and Snap aren't built every time).
        if (el.classList.contains("dl") && !el.classList.contains("dl-main")) el.hidden = true;
        return;
      }
      el.href = f.url;
      var size = el.querySelector("[data-size]");
      if (size) size.textContent = formatSize(f.size);
    });

    if (os === "windows" && files.windows_installer) {
      hero.href = files.windows_installer.url;
      heroMeta.textContent = "Free · Version " + release.version + " · " +
        formatSize(files.windows_installer.size) + " · Windows 10 and 11";
    } else if (os === "linux") {
      heroMeta.textContent = "Free · Version " + release.version + " · Ubuntu, Debian and most other Linux systems";
    }

    if (release.version) {
      var line = "Version " + release.version;
      if (release.published) {
        var d = new Date(release.published);
        if (!isNaN(d)) line += ", released " + d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
      }
      document.getElementById("release-line").textContent = line + ". Free for personal use.";
    }
  }

  // release.json is written at build time; the live API covers a release
  // published since the last build.
  function fromAPI() {
    return fetch("https://api.github.com/repos/" + REPO + "/releases/latest")
      .then(function (r) { if (!r.ok) throw r; return r.json(); })
      .then(function (rel) {
        var names = {
          windows_installer: /-windows-installer\.exe$/,
          windows_portable: /^QPackageTracker-[^-]+-windows-portable\.zip$/,
          deb: /_amd64\.deb$/,
          appimage: /-x86_64\.AppImage$/,
          flatpak: /-x86_64\.flatpak$/,
          snap: /_amd64\.snap$/,
          demo_windows: /^QPackageTracker-Demo-.*-windows-portable\.zip$/,
          demo_linux: /^QPackageTracker-Demo-.*-linux-portable\.tar\.gz$/
        };
        var files = {};
        (rel.assets || []).forEach(function (a) {
          Object.keys(names).forEach(function (k) {
            if (names[k].test(a.name)) files[k] = { name: a.name, url: a.browser_download_url, size: a.size };
          });
        });
        return {
          tag: rel.tag_name,
          version: String(rel.tag_name || "").replace(/^v/, "").replace(/-release$/, ""),
          published: rel.published_at,
          files: files
        };
      });
  }

  // Screenshot carousel. Links keep their href so they still work without JavaScript.
  var SCREENS = [
    ["main", "Packages and timeline"],
    ["calendar", "Calendar and reminders"],
    ["archived", "Archive"],
    ["add", "Add a package"],
    ["paste", "Paste a list"],
    ["import", "Import from a file"],
    ["schedule", "Notification schedule"],
    ["templates", "Schedule templates"],
    ["reminder", "New reminder"],
    ["settings", "Settings"],
    ["narrow", "Narrow layout"],
    ["locked", "Vault locked"]
  ];
  var lb = document.getElementById("lightbox");
  if (lb && typeof lb.showModal === "function") {
    var lbImg = document.getElementById("lb-img");
    var lbCaption = document.getElementById("lb-caption");
    var lbCount = document.getElementById("lb-count");
    var lbThumbs = document.getElementById("lb-thumbs");
    var themeButtons = lb.querySelectorAll("[data-theme]");
    var theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var current = 0;

    function src(i) { return "assets/images/" + SCREENS[i][0] + "-" + theme + ".png"; }

    SCREENS.forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", s[1]);
      b.appendChild(document.createElement("img"));
      b.addEventListener("click", function () { show(i); });
      lbThumbs.appendChild(b);
    });
    var thumbs = lbThumbs.querySelectorAll("button");

    function renderThumbs() {
      thumbs.forEach(function (b, i) {
        var img = b.querySelector("img");
        img.alt = "";
        img.loading = "lazy";
        img.src = src(i);
      });
    }

    function show(i) {
      current = (i + SCREENS.length) % SCREENS.length;
      lbImg.src = src(current);
      lbImg.alt = SCREENS[current][1];
      lbCaption.textContent = SCREENS[current][1];
      lbCount.textContent = (current + 1) + " of " + SCREENS.length;
      thumbs.forEach(function (b, j) { b.setAttribute("aria-current", j === current ? "true" : "false"); });
      thumbs[current].scrollIntoView({ block: "nearest", inline: "nearest" });
      // Warm the neighbours so next/previous is instant.
      [current + 1, current - 1].forEach(function (j) {
        new Image().src = src((j + SCREENS.length) % SCREENS.length);
      });
    }

    function setTheme(t) {
      theme = t;
      themeButtons.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-theme") === t ? "true" : "false"); });
      renderThumbs();
      show(current);
    }

    function open(name) {
      var i = 0;
      SCREENS.forEach(function (s, j) { if (s[0] === name) i = j; });
      setTheme(theme);
      show(i);
      lb.showModal();
    }

    document.querySelectorAll("[data-gallery]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        open(a.getAttribute("data-gallery"));
      });
    });
    themeButtons.forEach(function (b) {
      b.addEventListener("click", function () { setTheme(b.getAttribute("data-theme")); });
    });
    document.getElementById("lb-close").addEventListener("click", function () { lb.close(); });
    document.getElementById("lb-prev").addEventListener("click", function () { show(current - 1); });
    document.getElementById("lb-next").addEventListener("click", function () { show(current + 1); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { show(current + 1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { show(current - 1); e.preventDefault(); }
    });
    // Clicking the dark area around the screenshot closes the overlay.
    document.getElementById("lb-stage").addEventListener("click", function (e) {
      if (e.target === e.currentTarget) lb.close();
    });

    // Swipe on touch screens.
    var startX = null;
    lbImg.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lbImg.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  fetch("release.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw r; return r.json(); })
    .catch(fromAPI)
    .then(apply)
    .catch(function () { /* keep the Releases page links */ });
})();
