import { playLight } from "./sounds";
import { getCurrentMode } from "./timer";

export function toggleDarkMode(btn) {
  document.body.classList.toggle("dark-mode");

  playLight();

  const isDark = document.body.classList.contains("dark-mode");

  btn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun" style="color: #FFD43B;"></i> Light Mode'
    : '<i class="fa-solid fa-moon" style="color: #234b90;"></i> Dark Mode';

  if (isDark) {
    document.body.classList.remove("pomodoro", "short", "long");
  } else {
    document.body.className = getCurrentMode();
  }
}