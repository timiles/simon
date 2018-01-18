export default class Instrument {

    constructor(
        public name: string,
        public minPitch: number,
        public maxPitch: number,
        private transpositionFromConcertPitch: number = 0) {
    }

    getFirstCTransposed(): number {
        // probably no instrument will be this low but it's a starting point
        const pitchOfC = 12;
        let transposedC = pitchOfC + this.transpositionFromConcertPitch;
        // go up octaves until we get a C-pitch in range of the instrument
        while (transposedC < this.minPitch) {
            transposedC += 12;
        }
        return transposedC;
    }
}