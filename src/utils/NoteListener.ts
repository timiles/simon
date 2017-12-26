import FrequencyUtils from './FrequencyUtils';
import PitchBuffer from './PitchBuffer';
import Note from '../Note';

export default class NoteListener {
  private pitchBuffer: PitchBuffer;
  private animationFrameId: number;
  private analyser: AnalyserNode;

  constructor(private audioContext: AudioContext) {
    this.pitchBuffer = new PitchBuffer();
  }

  initialise(): Promise<void> {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia(
        { audio: true },
        stream => {
          const mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 2048;
          mediaStreamSource.connect(this.analyser);
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

  stop(): void {
    window.cancelAnimationFrame(this.animationFrameId);
    this.pitchBuffer.flush();
  }

  // use () => syntax so callback keeps `this` context
  private updatePitch = () => {

    const dataArray = new Float32Array(this.analyser.fftSize);
    this.analyser.getFloatTimeDomainData(dataArray);

    const frequency = FrequencyUtils.getFrequencyFromTimeDomainData(dataArray, this.audioContext.sampleRate);
    this.pitchBuffer.push(this.audioContext.currentTime, FrequencyUtils.getPitchFromFrequency(frequency, false));

    // repeat
    this.animationFrameId = window.requestAnimationFrame(this.updatePitch);
  }
}
