import Scale from '../types/Scale';

export default class ScalesDataSource {

    static all = ScalesDataSource.getAll();

    private static getAll(): Array<Scale> {
        const majorSemitoneIntervals = [2, 2, 1, 2, 2, 2, 1];
        const scales = [
            new Scale('Major / Iodian mode', majorSemitoneIntervals),
            new Scale('Dorian mode', ScalesDataSource.rotate(majorSemitoneIntervals, 1)),
            new Scale('Phrygian mode', ScalesDataSource.rotate(majorSemitoneIntervals, 2)),
            new Scale('Lydian mode', ScalesDataSource.rotate(majorSemitoneIntervals, 3)),
            new Scale('Mixolydian mode', ScalesDataSource.rotate(majorSemitoneIntervals, 4)),
            new Scale('Aeolian mode', ScalesDataSource.rotate(majorSemitoneIntervals, 5)),
            new Scale('Locrian mode', ScalesDataSource.rotate(majorSemitoneIntervals, 6))
        ];
        return scales;
    }

    private static rotate(array: Array<number>, index: number) {
        const clone = array.slice(0);
        const cutElements = clone.splice(index);
        // clone now contains elements from 0..index-1, cutElements has the rest, so:
        cutElements.push(...clone);
        return cutElements;
    }
}