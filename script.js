// set timer variable
let timerInterval;
// 25 minutes in seconds
let timer = 25 * 60; 
// initially paused
let isPaused = true;

const timerElement = document.querySelector('.timer');

function updateTimerDisplay() {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// start the timer
function startTimer() {
  if (isPaused) {
    isPaused = false;
    timerInterval = setInterval(() => {
      if (timer > 0) {
        timer--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        alert("Time's up!");
      }
    }, 1000);
  }
}

// pause the timer
function pauseTimer() {
  isPaused = true;
  clearInterval(timerInterval);
}

// restart the timer
function restartTimer() {
  clearInterval(timerInterval);
  timer = 25 * 60; // Reset to 25 minutes
  isPaused = true;
  updateTimerDisplay();
}

updateTimerDisplay();