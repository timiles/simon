import Scale from '../types/Scale';
import ScalesDataSource from './ScalesDataSource';

describe('ScalesDataSource', () => {

    let scales: Array<Scale>;

    beforeEach(() => {
        scales = ScalesDataSource.all;
    });

    it('should get all scales as expected', () => {
        const expected = [
            ['Iodian', 'C', 'D', 'E', 'F', 'G', 'A', 'B'],
            ['Dorian', 'C', 'D', 'E♭', 'F', 'G', 'A', 'B♭'],
            ['Phrygian', 'C', 'C♯', 'E♭', 'F', 'G', 'A♭', 'B♭'],
            ['Lydian', 'C', 'D', 'E', 'F♯', 'G', 'A', 'B'],
            ['Mixolydian', 'C', 'D', 'E', 'F', 'G', 'A', 'B♭'],
            ['Aeolian', 'C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭'],
            ['Locrian', 'C', 'C♯', 'E♭', 'F', 'F♯', 'A♭', 'B♭'],
        ];
        expected.forEach(s => {
            const scale = scales.filter(x => x.name.indexOf(s[0]) >= 0)[0];
            expect(scale).toBeDefined();
            expect(scale.getNotes()).toEqual(s.slice(1));
        });
    });
});