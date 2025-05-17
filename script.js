// Dark mode toggle with localStorage
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-mode");
  const savedMode = localStorage.getItem("mode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply dark mode if saved or preferred
  if (savedMode === "dark" || (!savedMode && prefersDark)) {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  // Toggle functionality
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("mode", isDark ? "dark" : "light");
  });
});
