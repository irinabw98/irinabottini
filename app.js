const soundButton = document.getElementById('soundToggle');
const soundLabel = document.getElementById('soundLabel');
let audioContext = null;
let masterGain = null;
let intervalId = null;
let playing = false;

function createTone(frequency, startTime, duration, gainValue) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(gain).connect(masterGain);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
}

function playLoop() {
  const base = audioContext.currentTime;
  const notes = [261.63, 329.63, 392.0, 523.25, 440.0, 392.0, 329.63, 293.66];
  notes.forEach((note, index) => {
    createTone(note, base + index * 0.42, 0.36, 0.035);
    createTone(note / 2, base + index * 0.42, 0.5, 0.018);
  });
}

function startMusic() {
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.22;
  masterGain.connect(audioContext.destination);
  playLoop();
  intervalId = setInterval(playLoop, 3400);
  playing = true;
  soundButton.classList.add('playing');
  soundLabel.textContent = 'Pausar música';
}

function stopMusic() {
  clearInterval(intervalId);
  intervalId = null;
  if (masterGain) {
    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);
  }
  playing = false;
  soundButton.classList.remove('playing');
  soundLabel.textContent = 'Música ambiente';
}

soundButton.addEventListener('click', () => {
  if (!playing) startMusic();
  else stopMusic();
});
