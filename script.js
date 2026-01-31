document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".menu-content");
  const themeBtn = document.getElementById("themeToggle");

  /* -------- THEME TOGGLE -------- */
  themeBtn?.addEventListener("click", () => {
    const newTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  });

  /* -------- MENU TOGGLE -------- */
  menuBtn?.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.remove("open");
    }
  });

  /* -------- PAGE FADE NAV -------- */
  document.querySelectorAll("a[data-link]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location = link.href;
      }, 300);
    });
  });

  /* -------- TIME SINCE CLOCK -------- */
  const startDate = new Date("2025-08-13T23:37:12");

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  function fadeUpdate(el, value) {
    if (el.textContent !== value) {
      el.style.opacity = 0;
      setTimeout(() => {
        el.textContent = value;
        el.style.opacity = 1;
      }, 150);
    }
  }

  function updateClock() {
    const now = new Date();
    let diff = now - startDate;

    const d = Math.floor(diff / 86400000);
    diff %= 86400000;
    const h = Math.floor(diff / 3600000);
    diff %= 3600000;
    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    fadeUpdate(days, String(d).padStart(3, "0"));
    fadeUpdate(hours, String(h).padStart(2, "0"));
    fadeUpdate(minutes, String(m).padStart(2, "0"));
    fadeUpdate(seconds, String(s).padStart(2, "0"));
  }

  setInterval(updateClock, 1000);
  updateClock();
});
