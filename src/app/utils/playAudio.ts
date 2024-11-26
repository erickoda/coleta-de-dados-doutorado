export default function playAudio(audioRef: React.RefObject<HTMLAudioElement>): void {
  if (audioRef.current === null) return;
  audioRef.current.play();
}