import PitchBuffer from './PitchBuffer';
import Note from '../Note';

describe('PitchBuffer', () => {

  let pitchBuffer: PitchBuffer;
  let completedNotes: Array<Note>;

  beforeEach(() => {
    pitchBuffer = new PitchBuffer();
    completedNotes = new Array<Note>();
    pitchBuffer.addListener('onNoteCompleted', n => completedNotes.push(n));
  });

  it('should emit pitch 96 when given pitch 96', () => {
    pitchBuffer.push(0, 96);
    pitchBuffer.push(1, 0);

    expect(completedNotes.length).toBe(1);
    expect(completedNotes[0].pitch).toBe(96);
    expect(completedNotes[0].durationSeconds).toBe(1);
  });

  it('should emit rounded pitch when given notes close together', () => {
    pitchBuffer.push(0, 95.6);
    pitchBuffer.push(1, 96.4);
    pitchBuffer.push(2, 95.6);
    pitchBuffer.push(3, 0);

    expect(completedNotes.length).toBe(1);
    expect(completedNotes[0].pitch).toBe(96);
    expect(completedNotes[0].durationSeconds).toBe(3);
  });

  it('should emit rounded distinct notes when given notes slightly apart', () => {
    pitchBuffer.push(0, 95.3);
    pitchBuffer.push(1, 96.4);
    pitchBuffer.push(2, 95.6);
    pitchBuffer.push(3, 0);

    expect(completedNotes.length).toBe(2);
    expect(completedNotes[0].pitch).toBe(95);
    expect(completedNotes[0].durationSeconds).toBe(1);
    expect(completedNotes[1].pitch).toBe(96);
    expect(completedNotes[1].durationSeconds).toBe(2);
  });

  it('should emit average pitch rather than oscillating even when given notes round away from each other', () => {
    pitchBuffer.push(0, 96.1);
    pitchBuffer.push(1, 96.8);
    pitchBuffer.push(2, 96.1);
    pitchBuffer.push(3, 0);

    expect(completedNotes.length).toBe(1);
    expect(completedNotes[0].pitch).toBe(96);
    expect(completedNotes[0].durationSeconds).toBe(3);
  });

  it('should ignore notes that are too short', () => {
    pitchBuffer.push(0, 96);
    pitchBuffer.push(1, 88); // too short
    pitchBuffer.push(1.01, 80);
    pitchBuffer.push(2, 0);

    expect(completedNotes.length).toBe(2);
    expect(completedNotes[0].pitch).toBe(96);
    expect(completedNotes[0].durationSeconds).toBe(1);
    expect(completedNotes[1].pitch).toBe(80);
    expect(completedNotes[1].durationSeconds).toBe(0.99);
  });

  fit('should emit pitch of minimum length after a flush', () => {
    pitchBuffer.push(0, 96);
    pitchBuffer.flush();

    expect(completedNotes.length).toBe(1);
    expect(completedNotes[0].pitch).toBe(96);
    expect(completedNotes[0].durationSeconds).toBe(0.05);
  });
});
