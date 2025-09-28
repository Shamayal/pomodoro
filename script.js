const settingsButton = document.getElementById("settings");
const settingsModal = document.getElementById("settings-modal");
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");
const start = document.getElementById("start");
const timerDisplay = document.querySelector(".timer");
const progressBar = document.getElementById("progress-bar");
// sound
const clickSound = new Audio("sounds/click.wav");
const modeSound = new Audio("sounds/mode.wav");
const alarmSound = new Audio("sounds/alarm.wav");
const lightSound = new Audio("sounds/light_switch.wav");
const enableSoundBtn = document.getElementById("sound-toggle-btn");
// dark mode
const darkModeToggleBtn = document.getElementById("dark-mode-toggle");
// settings modal
const closeSettingsBtn = document.getElementById("close-settings");
const modalBackdrop = document.getElementById("modal-backdrop");

let countdown;
let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let timerRunning = false;
let currentMode = "pomodoro"; // default mode

timerDisplay.textContent = "25:00";
document.body.className = "pomodoro";
pomodoro.classList.add("active");

// Start/Pause Toggle
function toggleTimer() {
  if (!timerRunning) {
    timerRunning = true;
    start.innerHTML = 'Pause <i class="fa-solid fa-pause"></i>';

    countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown);
        timerRunning = false;
        timerDisplay.textContent = "00:00";
        start.innerHTML = 'Start <i class="fa-solid fa-play"></i>';
        updateProgressBar();
        alarmSound.play();
        alert("Time's up!");
        return;
      }

      timeLeft--;

      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      timerDisplay.textContent = formattedTime;
      document.title = `${formattedTime} - Pomodoro`;

      updateProgressBar();
    }, 1000);
  } else {
    clearInterval(countdown);
    timerRunning = false;
    start.innerHTML = 'Start <i class="fa-solid fa-play"></i>';
  }
}

function setMode(minutes, mode, activeButton) {
  clearInterval(countdown);
  timerRunning = false;
  start.innerHTML = 'Start <i class="fa-solid fa-play"></i>';

  // Set time
  timeLeft = minutes * 60;
  totalTime = minutes * 60;

  // Change Time Display
  const mins = minutes.toString().padStart(2, "0");
  timerDisplay.textContent = `${mins}:00`;

  // Reset progress bar
  updateProgressBar();

  // Save current mode
  currentMode = mode;

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

// Progress Bar Update
function updateProgressBar() {
  const percent = ((totalTime - timeLeft) / totalTime) * 100;
  progressBar.style.width = `${percent}%`;
}

// Pomodoro - 25 Minutes
pomodoro.addEventListener("click", () => setMode(25, "pomodoro", pomodoro));

// Short Break - 5 Minutes
shortBreak.addEventListener("click", () => setMode(5, "short", shortBreak));

// Long Break - 15 Minutes
longBreak.addEventListener("click", () => setMode(15, "long", longBreak));

// Start Button
start.addEventListener("click", toggleTimer);

// Sounds
[start].forEach((button) => {
  button.addEventListener("click", () => {
    clickSound.play();
  });
});

[pomodoro, shortBreak, longBreak].forEach((button) => {
  button.addEventListener("click", () => {
    modeSound.play();
  });
});

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  lightSound.play();

  const isDark = document.body.classList.contains("dark-mode");

  darkModeToggleBtn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun" style="color: #FFD43B;"></i> Light Mode'
    : '<i class="fa-solid fa-moon" style="color: #234b90;"></i> Dark Mode';

  if (isDark) {
    document.body.classList.remove("pomodoro", "short", "long");
  } else {
    document.body.className = currentMode;
  }
}

darkModeToggleBtn.addEventListener("click", toggleDarkMode);

// Open Settings Modal
settingsButton.addEventListener("click", () => {
  settingsModal.classList.remove("hidden");
  modalBackdrop.classList.remove("hidden");
});

closeSettingsBtn.addEventListener("click", () => {
  settingsModal.classList.add("hidden");
  modalBackdrop.classList.add("hidden");
});

// Click outside modal to close
modalBackdrop.addEventListener("click", () => {
  settingsModal.classList.add("hidden");
  modalBackdrop.classList.add("hidden");
});

// Sound On/Off
enableSoundBtn.innerHTML = soundOn
  ? 'Sound Off <i class="fa-solid fa-volume-xmark"></i>'
  : 'Sound On <i class="fa-solid fa-volume-high"></i>';