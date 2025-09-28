import { playSettings } from "./sounds";

export function setupModal(settingsModal, backdrop, openBtn, closeBtn) {
  openBtn.addEventListener("click", () => {
    settingsModal.classList.remove("hidden");
    backdrop.classList.remove("hidden");
    playSettings();
  });

  closeBtn.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
    backdrop.classList.add("hidden");
  });

  backdrop.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
    backdrop.classList.add("hidden");
  });
}

export function timerInputLimiter(minutesInput, min, max) {
  input.addEventListener("input", () => {
    const value = parseInt(minutesInput.value);

    // If the input is not a number, skip
    if (isNaN(value)) return;

    if (value < min) {
      minutesInput.value = min;
    } else if (value > max) {
      minutesInput.value = max;
    } else {
      minutesInput.value = Math.floor(value);
    }
  });
}