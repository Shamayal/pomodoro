const settings = document.getElementById("settings");
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");
const start = document.getElementById("start");
const timerDisplay = document.querySelector(".timer");

let countdown;
let timeLeft = 25 * 60;
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
        timerDisplay.textContent = "00:00";
        alert("Time's up!");
        timerRunning = false;
        start.textContent = "Start";
        return;
      }

      timeLeft--;

      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      timerDisplay.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
  timeLeft = minutes * 60;

  // Change Time Display
  const mins = minutes.toString().padStart(2, "0");
  timerDisplay.textContent = `${mins}:00`;

  // Change background
  document.body.className = mode;

  // Reset active button styles
  document.querySelectorAll(".mode-buttons button").forEach(btn => {
    btn.classList.remove("active");
  });

  activeButton.classList.add("active");
}

// Pomodoro - 25 Minutes
pomodoro.addEventListener("click", () => setMode(25, "pomodoro", pomodoro));

// Short Break - 5 Minutes
shortBreak.addEventListener("click", () => setMode(5, "short", shortBreak));

// Long Break - 15 Minutes
longBreak.addEventListener("click", () => setMode(15, "long", longBreak));

// Start Button
start.addEventListener("click", toggleTimer);