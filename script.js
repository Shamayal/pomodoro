const settingsButton = document.getElementById("settings");
const settingsModal = document.getElementById("settings-modal");
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");
const start = document.getElementById("start");
const timerDisplay = document.querySelector(".timer");
const progressBar = document.getElementById("progress-bar");
// sound
const clickSound = new Audio('sounds/click.wav');
const modeSound = new Audio('sounds/mode.wav');
const alarmSound = new Audio('sounds/alarm.wav');

let countdown;
let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let timerRunning = false;

timerDisplay.textContent = "25:00";
document.body.className = "pomodoro";
pomodoro.classList.add("active");

// Start/Pause Toggle
function toggleTimer() {
  if (!timerRunning) {
    timerRunning = true;
    start.textContent = "Pause";

    countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown);
        timerRunning = false;
        timerDisplay.textContent = "00:00";
        start.textContent = "Start";
        updateProgressBar();
        alarmSound.play();
        alert("Time's up!");
        return;
      }

      timeLeft--;

      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      timerDisplay.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        updateProgressBar();
    }, 1000);
  } else {
    clearInterval(countdown);
    timerRunning = false;
    start.textContent = "Start";
  }
}

function setMode(minutes, mode, activeButton) {
  clearInterval(countdown);
  timerRunning = false;
  start.textContent = "Start";

  // Set time
  timeLeft = minutes * 60;
  totalTime = minutes * 60;

  // Change Time Display
  const mins = minutes.toString().padStart(2, "0");
  timerDisplay.textContent = `${mins}:00`;

  // Reset progress bar
  updateProgressBar();

  // Change background
  document.body.className = mode;

  // Reset active button styles
  document.querySelectorAll(".mode-buttons button").forEach(btn => {
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

[start].forEach(button => {
  button.addEventListener("click", () => {
    clickSound.play();
  });
});

[pomodoro, shortBreak, longBreak].forEach(button => {
  button.addEventListener("click", () => {
    modeSound.play();
  });
});