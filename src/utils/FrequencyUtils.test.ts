import FrequencyUtils from './FrequencyUtils';

describe('FrequencyUtils', () => {
  it('should convert pitch 69 to 440Hz', () => {
    expect(FrequencyUtils.getFrequencyFromPitch(69)).toBe(440);
  });

  it('should convert 440Hz to pitch 69 with rounding', () => {
    expect(FrequencyUtils.getPitchFromFrequency(440)).toBe(69);
  });

  it('should convert 440Hz to pitch 69 without rounding', () => {
    expect(FrequencyUtils.getPitchFromFrequency(440, false)).toBe(69);
  });

  it('should convert 441Hz to pitch 69 with rounding', () => {
    expect(FrequencyUtils.getPitchFromFrequency(441)).toBe(69);
  });

  it('should convert 441Hz to pitch 69.0393... without rounding', () => {
    expect(FrequencyUtils.getPitchFromFrequency(441, false)).toBe(69.03930158439434);
  });

  it('should convert 0Hz to pitch 0', () => {
    expect(FrequencyUtils.getPitchFromFrequency(0)).toBe(0);
  });

  it('should calculate RMS', () => {
    const values = new Float32Array([2, 10, 5, -2, -4, 1]);
    const rms = FrequencyUtils.calculateRootMeanSquare(values);
    expect(rms).toBe(5);
  });

  it('should get correlation of 1 with repeated amplitudes at offset', () => {
    const values = new Float32Array([-1, 2, 5, 2, -1, 2, 5, 2]);
    const correlation = FrequencyUtils.calculateCorrelation(values, 4);
    expect(correlation).toBe(1);
  });

  it('should get correlation of ~0.95 with similar amplitudes at offset', () => {
    const values = new Float32Array([-1, 2, 5, 2, -1.1, 2.1, 4.9, 1.9]);
    const correlation = FrequencyUtils.calculateCorrelation(values, 4);
    expect(correlation).toBe(0.9500000178813934);
  });
});
