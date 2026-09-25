function themeToggle() {
  const STORAGE_KEY = "coffee-house-theme";
  const html = document.documentElement;

   function applyTheme(theme) {
    html.setAttribute("data-theme", theme);

    document.querySelectorAll("[data-theme-btn]").forEach((btn) => {
      const isActive = btn.dataset.themeBtn === theme;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      applyTheme(savedTheme);
    }
  }
  
  initTheme();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-btn]");
    if (!btn) return;

    const theme = btn.dataset.themeBtn;
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  });

}

themeToggle();
