import { formatTime, formatModeTitle } from './helper.js';
import { playAlarm } from './sounds.js';
import { updateProgressBar } from './progress.js';

let countdown;
let timerRunning = false;
let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let currentMode = "pomodoro"; // default mode

export function toggleTimer(timerDisplay, title, start, progressBar) {
  if (!timerRunning) {
    timerRunning = true;
    start.innerHTML = 'Pause <i class="fa-solid fa-pause"></i>';
    countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown);
        timerRunning = false;
        timeLeft = totalTime;
        timerDisplay.textContent = formatTime(timeLeft);
        title.textContent = "Time's up! - Pomodoro";
        start.innerHTML = 'Start <i class="fa-solid fa-play"></i>';
        updateProgressBar(progressBar, totalTime, timeLeft);
        playAlarm();
        alert("Time's up!");
        return;
      }

      timeLeft--;
      timerDisplay.textContent = formatTime(timeLeft);
      title.textContent = `${formatTime(timeLeft)} - ${formatModeTitle(currentMode)}`;
      updateProgressBar(progressBar, totalTime, timeLeft);
    }, 1000);
  } else {
    clearInterval(countdown);
    timerRunning = false;
    start.innerHTML = 'Start <i class="fa-solid fa-play"></i>';
  }
}

export function setMode(minutes, mode, activeButton, timerDisplay, startBtn, progressBar) {
  clearInterval(countdown);
  timerRunning = false;
  startBtn.innerHTML = 'Start <i class="fa-solid fa-play"></i>';

  // Set time
  timeLeft = totalTime = minutes * 60;

  // Save current mode
  currentMode = mode;

  // Change time display
  timerDisplay.textContent = formatTime(timeLeft);

  // Update title
  document.title = `${formatTime(timeLeft)} - ${formatModeTitle(mode)}`;

  // Reset progress bar
  updateProgressBar(progressBar, totalTime, timeLeft);

  // Change background if not dark mode
  if (!document.body.classList.contains("dark-mode")) {
    document.body.className = mode;
  }
  // Reset active button styles
  document.querySelectorAll(".mode-buttons button").forEach((btn) => {
    btn.classList.remove("active");
  });
  activeButton.classList.add("active");
}

export function getCurrentMode() {
  return currentMode;
}