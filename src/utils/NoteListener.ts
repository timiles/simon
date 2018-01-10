import { AnalyserInterface } from './FrequencyAnalysers/AnalyserInterface';
import FrequencyUtils from './FrequencyUtils';
import PitchBuffer from './PitchBuffer';
import Note from '../Note';
import FrequencyDataAnalyser from './FrequencyAnalysers/FrequencyDataAnalyser';

export default class NoteListener {
  private pitchBuffer: PitchBuffer;
  private animationFrameId: number;
  private analyser: AnalyserInterface;

  constructor(private audioContext: AudioContext) {
    this.pitchBuffer = new PitchBuffer();
    this.analyser = new FrequencyDataAnalyser(audioContext);
  }

  initialise(): Promise<void> {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia(
        { audio: true },
        stream => {
          const mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
          mediaStreamSource.connect(this.analyser.getNode());
          resolve();
        },
        (e) => {
          reject(e.name);
        });
    });
  }

  onNoteCompleted(listener: (completedNote: Note) => void) {
    return this.pitchBuffer.onNoteCompleted(listener);
  }

  start(): void {
    this.updatePitch();
  }

  stop(flush: boolean = false): void {
    window.cancelAnimationFrame(this.animationFrameId);
    this.pitchBuffer.removeOnNoteCompletedListener();
    if (flush) {
      this.pitchBuffer.flush();
    }
  }

  // use () => syntax so callback keeps `this` context
  private updatePitch = () => {

    const frequency = this.analyser.getFrequency();
    this.pitchBuffer.push(this.audioContext.currentTime, FrequencyUtils.getPitchFromFrequency(frequency, false));

    // repeat
    this.animationFrameId = window.requestAnimationFrame(this.updatePitch);
  }
}
