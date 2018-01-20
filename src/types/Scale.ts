export default class Scale {
    static notes = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];

    constructor(
        public name: string,
        public semitoneIntervals: Array<number>) {
    }

    getPitchesRelativeToRoot(): Array<number> {
        const pitches = new Array<number>();

        // start with root itself
        let pitch = 0;
        pitches.push(pitch);

        // don't go all the way to the top, all the scales (so far) come back to root
        for (let i = 0; i < this.semitoneIntervals.length - 1; i++) {
            // increment pitch by intervals
            pitch += this.semitoneIntervals[i];
            pitches.push(pitch);
        }

        return pitches;
    }

    getNotes(): Array<string> {
        // assume Root maps to C
        return this.getPitchesRelativeToRoot().map(x => Scale.notes[x]);
    }
}