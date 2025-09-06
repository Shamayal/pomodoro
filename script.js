const settings = document.getElementById("settings");
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break");
const start = document.getElementById("start");
//const pause = document.getElementById("start");
const timerDisplay = document.querySelector(".timer");

let countdown;
let pomodoroTime = 25;
let timeLeft = pomodoroTime * 60;

function startTimer() {
  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      timerDisplay.textContent = "00:00";
      alert("Time's up!");
      return;
    }
    timeLeft --;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

start.addEventListener("click", startTimer);
//pause.addEventListener("click", stopTimer);