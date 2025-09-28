export function formatTime(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function formatModeTitle(mode) {
  switch (mode) {
    case "pomodoro":
      return "Pomodoro";
    case "short":
      return "Short Break";
    case "long":
      return "Long Break";
  }
}