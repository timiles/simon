import TimeDomainDataAnalyser from './TimeDomainDataAnalyser';

describe('TimeDomainDataAnalyser', () => {
    it('should calculate RMS', () => {
        const values = new Float32Array([2, 10, 5, -2, -4, 1]);
        const rms = TimeDomainDataAnalyser.calculateRootMeanSquare(values);
        expect(rms).toBe(5);
    });

    it('should get correlation of 1 with repeated amplitudes at offset', () => {
        const values = new Float32Array([-1, 2, 5, 2, -1, 2, 5, 2]);
        const correlation = TimeDomainDataAnalyser.calculateCorrelation(values, 4);
        expect(correlation).toBe(1);
    });

    it('should get correlation of ~0.95 with similar amplitudes at offset', () => {
        const values = new Float32Array([-1, 2, 5, 2, -1.1, 2.1, 4.9, 1.9]);
        const correlation = TimeDomainDataAnalyser.calculateCorrelation(values, 4);
        expect(correlation).toBe(0.9500000178813934);
    });
});