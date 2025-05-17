// Dark mode toggle with localStorage
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-mode");
  const savedMode = localStorage.getItem("mode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedMode === "dark" || (!savedMode && prefersDark)) {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("mode", isDark ? "dark" : "light");
  });
});
