import { elements } from "./js/dom";
import { toggleTimer, setMode } from "./js/timer";
import { toggleDarkMode } from "./js/darkmode";
import { playClick, playMode, toggleSound, updateSoundButton } from "./js/sounds";
import { setupModal, timerInputLimiter } from "./js/settings";

document.addEventListener("DOMContentLoaded", () => {
  // Set initial display
  elements.timerDisplay.textContent = formatTime(25 * 60);
  document.body.className = "pomodoro";
  elements.pomodoro.classList.add("active");

  // Set default mode
  setMode(parseInt(elements.pomodoroInput.value), "pomodoro", elements.pomodoro, elements.timerDisplay, elements.start, elements.progressBar);

  // Mode Buttons
  elements.pomodoro.addEventListener("click", () => {
    setMode(parseInt(elements.pomodoroInput.value), "pomodoro", elements.pomodoro, elements.timerDisplay, elements.start, elements.progressBar);
    playMode();
  });

  elements.shortBreak.addEventListener("click", () => {
    setMode(parseInt(elements.shortInput.value), "short", elements.shortBreak, elements.timerDisplay, elements.start, elements.progressBar);
    playMode();
  });

  elements.longBreak.addEventListener("click", () => {
    setMode(parseInt(elements.longInput.value), "long", elements.longBreak, elements.timerDisplay, elements.start, elements.progressBar);
    playMode();
  });

  // Input Change
  elements.pomodoroInput.addEventListener("change", () => {
    if (getCurrentMode() === "pomodoro") {
      setMode(parseInt(elements.pomodoroInput.value), "pomodoro", elements.pomodoro, elements.timerDisplay, elements.start, elements.progressBar);
    }
  });

  elements.shortInput.addEventListener("change", () => {
    if (getCurrentMode() === "short") {
      setMode(parseInt(elements.shortInput.value), "short", elements.shortBreak, elements.timerDisplay, elements.start, elements.progressBar);
    }
  });

  elements.longInput.addEventListener("change", () => {
    if (getCurrentMode() === "long") {
      setMode(parseInt(elements.longInput.value), "long", elements.longBreak, elements.timerDisplay, elements.start, elements.progressBar);
    }
  });

  // Start/Pause
  elements.start.addEventListener("click", () => {
    toggleTimer(elements.timerDisplay, document, elements.start, elements.progressBar);
    playClick();
  });

  // Enforce input ranges
  timerInputLimiter(elements.pomodoroInput, 1, 60);
  timerInputLimiter(elements.shortInput, 1, 60);
  timerInputLimiter(elements.longInput, 1, 60);

  // Sound Toggle
  elements.enableSoundBtn.addEventListener("click", () => {
    toggleSound();
    updateSoundButton(elements.enableSoundBtn);
  });

  // Dark Mode
  elements.darkModeToggleBtn.addEventListener("click", () => {
    toggleDarkMode(elements.darkModeToggleBtn);
  });

  // Settings Modal
  setupModal(elements.settingsModal, elements.modalBackdrop, elements.settingsButton, elements.closeSettingsBtn);
});