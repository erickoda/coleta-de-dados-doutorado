import * as Tone from 'tone';

export default function playAudio(): void {
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();

  synth.triggerAttack("A4", now);
  synth.triggerRelease(now + 0.001);
}