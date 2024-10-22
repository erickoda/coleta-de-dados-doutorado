export default function playAudio(): void {
    const audioContext = new window.AudioContext;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'square'; // Tipo de onda: square, sine, sawtooth, triangle
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Frequência em Hz

    gainNode.gain.setValueAtTime(0.8, audioContext.currentTime); // Volume
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1); // Duração do beep: 1 segundo

    oscillator.onended = () => {
      audioContext.close();
    };
}