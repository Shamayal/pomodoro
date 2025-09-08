const settings = document.getElementById("settings");
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");
const start = document.getElementById("start");
const timerDisplay = document.querySelector(".timer");

let countdown;
let timeLeft = 25 * 60;
let timerRunning = false;

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

// Pomodoro - 25 Minutes
pomodoro.addEventListener("click", () => {
  clearInterval(countdown);
  timerRunning = false;
  start.textContent = "Start";
  timeLeft = 25 * 60;
  timerDisplay.textContent = "25:00";
})

// Short Break - 5 Minutes
shortBreak.addEventListener("click", () => {
  clearInterval(countdown);
  timerRunning = false;
  start.textContent = "Start";
  timeLeft = 5 * 60;
  timerDisplay.textContent = "05:00";
})

// Long Break - 15 Minutes
longBreak.addEventListener("click", () => {
  clearInterval(countdown);
  timerRunning = false;
  start.textContent = "Start";
  timeLeft = 15 * 60;
  timerDisplay.textContent = "15:00";
})

// Start Button
start.addEventListener("click", toggleTimer);