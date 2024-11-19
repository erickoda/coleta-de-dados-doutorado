export default function playAudio(hertz: number = 160): void {
  const audioContext = new window.AudioContext;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'square'; // Tipo de onda: square, sine, sawtooth, triangle
  oscillator.frequency.setValueAtTime(hertz, audioContext.currentTime); // Frequência em Hz

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 2); 

  oscillator.onended = () => {
    audioContext.close();
  };
}