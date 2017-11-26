import FrequencyUtils from './FrequencyUtils';
import Note from '../Note';

export default class NotePlayer {
  constructor(private audioContext: AudioContext) {}

  play(note: Note, startSecondsFromNow: number = 0) {
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0.1;
    gainNode.connect(this.audioContext.destination);

    const oscillator = this.audioContext.createOscillator();
    oscillator.frequency.value = FrequencyUtils.getFrequencyFromPitch(note.pitch);
    oscillator.connect(gainNode);

    const startWhen = startSecondsFromNow + this.audioContext.currentTime;
    oscillator.start(startWhen);
    oscillator.stop(startWhen + note.durationSeconds);
  }
}
