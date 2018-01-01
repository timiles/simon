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
});
