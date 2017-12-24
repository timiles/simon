export default class FrequencyUtils {
  static getFrequencyFromPitch(pitch: number): number {
    return 440 * Math.pow(2, (pitch - 69) / 12);
  }

  static getPitchFromFrequency(frequency: number, rounded: boolean = true): number {
    if (frequency <= 0) {
      return 0;
    }

    let pitch = 69 + 12 * (Math.log(frequency / 440) / Math.log(2));
    if (rounded) {
      return Math.round(pitch);
    }
    return pitch;
  }

  static calculateRootMeanSquare(buffer: Float32Array): number {
    let sumOfSquares = 0;
    for (let i = 0; i < buffer.length; i++) {
      let value = buffer[i];
      sumOfSquares += value * value;
    }
    const meanSquare = sumOfSquares / buffer.length;
    return Math.sqrt(meanSquare);
  }

  static calculateCorrelation(dataArray: Float32Array, offset: number): number {
    let totalPhaseDifferenceAtThisOffset = 0;
    for (let i = 0; i < dataArray.length - offset; i++) {
      totalPhaseDifferenceAtThisOffset += Math.abs(dataArray[i] - dataArray[i + offset]);
    }
    return 1 - (totalPhaseDifferenceAtThisOffset / dataArray.length);
  }

  static getFrequencyFromTimeDomainData(dataArray: Float32Array, sampleRate: number) {
    /*
    This algorithm works as follows:
    - dataArray contains amplitudes frame-by-frame; sampleRate will give us the frame duration.
    - If we can find a good enough correlation between one phase of amplitudes to the next,
    - we can use the time offset between the correlating phases to calculate the frequency of oscillation
    */

    if (FrequencyUtils.calculateRootMeanSquare(dataArray) < 0.01) {
      // not enough signal
      return 0;
    }

    // 0 = no correlation, 1 = perfect correlation
    const minimumAcceptableCorrelation = 0.9;
    // we need at least 2 oscillations to correlate (though we'll most likely find a match long before halfway)
    const maxOffset = Math.floor(dataArray.length / 2);

    let bestOffset = -1;
    let bestCorrelation = 0;
    let correlationAtOffsetBeforeBest = 0;
    let foundAcceptableCorrelation = false;

    // zero offset would correlate precisely onto itself. we skip offset 0
    let previousCorrelation = 1;
    for (let offset = 1; offset < maxOffset; offset++) {
      const correlation = FrequencyUtils.calculateCorrelation(dataArray, offset);

      if (correlation > minimumAcceptableCorrelation && correlation > previousCorrelation) {
        // we're inside an acceptable correlation, but we'll keep tracking it until it gets worse again
        foundAcceptableCorrelation = true;
        if (correlation > bestCorrelation) {
          // store previous best for smoothing later
          correlationAtOffsetBeforeBest = bestCorrelation;
          bestCorrelation = correlation;
          bestOffset = offset;
        }
      } else if (foundAcceptableCorrelation) {
        /*
        Our current correlation has moved away from best -
        now, for better accuracy, we average out the curve around bestCorrelation
        taking the values before & after (current), to find where the approximate maximum really was. 
        */
        let bestFitCorrelation = (correlation - correlationAtOffsetBeforeBest) / bestCorrelation;
        let adjustedBestOffset = bestOffset + 8 * bestFitCorrelation;

        // the frequency of this wave is therefore the sample rate split equally by this time offset:
        return sampleRate / adjustedBestOffset;
      }

      previousCorrelation = correlation;
    }

    // no correlations good enough
    return 0;
  }
}
