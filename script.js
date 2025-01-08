// set timer variable
let timerInterval;
// 25 minutes in seconds
let timer = 25 * 60; 
// initially paused
let isPaused = true;

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

}

// restart the timer
function restartTimer() {

}