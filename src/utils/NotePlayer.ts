import FrequencyUtils from './FrequencyUtils';
import Note from '../Note';

export default class NotePlayer {
  constructor(private audioContext: AudioContext) { }

  play(note: Note, startSecondsFromNow: number = 0) {
    if (note.pitch > 0) {
      const gainNode = this.audioContext.createGain();
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.connect(this.audioContext.destination);

      const oscillator = this.audioContext.createOscillator();
      const frequency = FrequencyUtils.getFrequencyFromPitch(note.pitch);
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.connect(gainNode);

      const startWhen = startSecondsFromNow + this.audioContext.currentTime;
      oscillator.start(startWhen);
      oscillator.stop(startWhen + note.durationSeconds);
    }
  }
}
