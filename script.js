const settingsButton = document.getElementById("settings");
const settingsModal = document.getElementById("settings-modal");
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");
const start = document.getElementById("start");
const timerDisplay = document.querySelector(".timer");
const progressBar = document.getElementById("progress-bar");
// Timer Lengths 
const pomodoroInput = document.getElementById("pomodoro-length");
const shortInput = document.getElementById("short-length");
const longInput = document.getElementById("long-length");
// Sound
const clickSound = new Audio("sounds/click.wav");
const modeSound = new Audio("sounds/mode.wav");
const alarmSound = new Audio("sounds/alarm.wav");
const lightSound = new Audio("sounds/light_switch.wav");
const settingsSound = new Audio("sounds/settings.wav");
const enableSoundBtn = document.getElementById("sound-toggle-btn");
// Dark Mode
const darkModeToggleBtn = document.getElementById("dark-mode-toggle");
// Settings Modal
const closeSettingsBtn = document.getElementById("close-settings");
const modalBackdrop = document.getElementById("modal-backdrop");

let countdown;
let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let timerRunning = false;
let currentMode = "pomodoro"; // default mode

function formatTime(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

timerDisplay.textContent = formatTime(timeLeft);
document.body.className = "pomodoro";
pomodoro.classList.add("active");

function formatModeTitle(mode) {
  switch (mode) {
    case "pomodoro":
      return "Pomodoro";
    case "short":
      return "Short Break";
    case "long":
      return "Long Break";
  }
}


// Start/Pause Toggle
function toggleTimer() {
  if (!timerRunning) {
    timerRunning = true;
    start.innerHTML = 'Pause <i class="fa-solid fa-pause"></i>';

    countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown);
        timerRunning = false;
        timeLeft = totalTime;
        timerDisplay.textContent = formatTime(timeLeft);
        document.title = "Time's up! - Pomodoro";
        start.innerHTML = 'Start <i class="fa-solid fa-play"></i>';
        updateProgressBar();
        if (soundOn) alarmSound.play();
        alert("Time's up!");
        return;
      }

      timeLeft--;

      timerDisplay.textContent = formatTime(timeLeft);
      document.title = `${formatTime(timeLeft)} - ${formatModeTitle(currentMode)}`;

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

  // Update Title
  document.title = `${formatTime(timeLeft)} - ${formatModeTitle(mode)}`;

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

// Pomodoro - 25 Minutes Default
pomodoro.addEventListener("click", () => {
  const minutes = parseInt(pomodoroInput.value);
  setMode(minutes, "pomodoro", pomodoro);
});

pomodoroInput.addEventListener("change", () => {
  if (currentMode === "pomodoro") {
    const minutes = parseInt(pomodoroInput.value);
    setMode(minutes, "pomodoro", pomodoro);
  }
});

// Short Break - 5 Minutes Default
shortBreak.addEventListener("click", () => {
  const minutes = parseInt(shortInput.value);
  setMode(minutes, "short", shortBreak);
});

shortInput.addEventListener("change", () => {
  if (currentMode === "short") {
    const minutes = parseInt(shortInput.value);
    setMode(minutes, "short", shortBreak);
  }
});

// Long Break - 15 Minutes Default
longBreak.addEventListener("click", () => {
  const minutes = parseInt(longInput.value);
  setMode(minutes, "long", longBreak);
});

longInput.addEventListener("change", () => {
  if (currentMode === "long") {
    const minutes = parseInt(longInput.value);
    setMode(minutes, "long", longBreak);
  } 
});

// Start Button
start.addEventListener("click", toggleTimer);

// Sounds
[start].forEach((button) => {
  button.addEventListener("click", () => {
    if (soundOn) clickSound.play();
  });
});

[pomodoro, shortBreak, longBreak].forEach((button) => {
  button.addEventListener("click", () => {
    if (soundOn) modeSound.play();
  });
});

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  if (soundOn) lightSound.play();

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
  if (soundOn) settingsSound.play();
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

// Function to enforce timer range
function timerInput(minutesInput, min, max) {
  minutesInput.addEventListener("input", () => {
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

timerInput(document.getElementById("pomodoro-length"), 1, 60);
timerInput(document.getElementById("short-length"), 1, 60);
timerInput(document.getElementById("long-length"), 1, 60);

// Sound On/Off
let soundOn = true;
function updateSoundButton() {
  enableSoundBtn.innerHTML = soundOn
  ? '<i class="fa-solid fa-volume-high"></i>'
  : '<i class="fa-solid fa-volume-xmark"></i>';
}

enableSoundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  updateSoundButton();
});

updateSoundButton();