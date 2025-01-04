function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

const start = document.getElementById("start-btn");
const pause = document.getElementById("pause-btn");
const restart = document.getElementById("restart-btn");

let timer = null;
let time = 25 * 60;

const updateTimeDisplay = () => {
  let minutes = Math.floor(time/60);
  let seconds = time % 60;
  displat.textContent = `${minutes.toString().padStart('2', '0')}`
}

// function to start the timer
const startTimer = () => {
  if (!timer) {
    timer = setInterval(() => {
      time --;
      updateTimeDisplay();
      if (time === 0) {
        timer = null;
        alert('Time is Up!');
      }
    }, 1000);
  }
}