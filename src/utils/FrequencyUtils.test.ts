import FrequencyUtils from './FrequencyUtils';

describe('FrequencyUtils', () => {
  it('should convert pitch 69 to 440Hz', () => {
    expect(FrequencyUtils.getFrequencyFromPitch(69)).toBe(440);
  });

  it('should convert 440Hz to pitch 69', () => {
    expect(FrequencyUtils.getPitchFromFrequency(440)).toBe(69);
  });
});
