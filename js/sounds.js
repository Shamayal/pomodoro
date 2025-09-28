const clickSound = new Audio("sounds/click.wav");
const modeSound = new Audio("sounds/mode.wav");
const alarmSound = new Audio("sounds/alarm.wav");
const lightSound = new Audio("sounds/light_switch.wav");
const settingsSound = new Audio("sounds/settings.wav");

let soundOn = true;

export function updateSoundButton(button) {
  button.innerHTML = soundOn
  ? '<i class="fa-solid fa-volume-high"></i>'
  : '<i class="fa-solid fa-volume-xmark"></i>';
}

export function toggleSound() {
  soundOn = !soundOn;
  updateSoundButton();
}

export function playClick() { if (soundOn) clickSound.play(); }
export function playMode() { if (soundOn) modeSound.play(); }
export function playAlarm() { if (soundOn) alarmSound.play(); }
export function playLight() { if (soundOn) lightSound.play(); }
export function playSettings() { if (soundOn) settingsSound.play(); }

export function isSoundOn() {
  return soundOn;
}