export default class FrequencyUtils {
  static getFrequencyFromPitch(pitch: number): number {
    return 440 * Math.pow(2, (pitch - 69) / 12);
  }

  static getPitchFromFrequency(frequency: number): number {
    let pitch = 69 + 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(pitch);
  }
}
