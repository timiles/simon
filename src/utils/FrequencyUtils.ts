export default class FrequencyUtils {
  static getFrequencyFromPitch(pitch: number): number {
    return 440 * Math.pow(2, (pitch - 69) / 12);
  }

  static getPitchFromFrequency(frequency: number, rounded: boolean = true): number {
    if (frequency === -1) {
      return 0;
    }

    let pitch = 69 + 12 * (Math.log(frequency / 440) / Math.log(2));
    if (rounded) {
      return Math.round(pitch);
    }
    return pitch;
  }
}
