import Note from './types/Note';

export default class Simon {

    private count: number = 5;

    constructor(private pitchesInScale: Array<number>, private rootPitch: number) {
    }

    say(): Array<Note> {
        let notes = new Array<Note>();
        let previousPitch = 0;
        while (notes.length < this.count) {
            const randomPitchInScale = this.pitchesInScale[Math.floor(Math.random() * this.pitchesInScale.length)];
            if (randomPitchInScale !== previousPitch) {
                const note = new Note(randomPitchInScale + this.rootPitch, 1);
                notes.push(note);
                previousPitch = randomPitchInScale;
            }
        }
        return notes;
    }
}