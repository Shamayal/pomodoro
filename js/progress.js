export function updateProgressBar(progressBar, totalTime, timeLeft) {
  const percent = ((totalTime - timeLeft) / totalTime) * 100;
  progressBar.style.width = `${percent}%`;
}