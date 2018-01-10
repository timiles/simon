import { AnalyserInterface } from './AnalyserInterface';

export default class FrequencyDataAnalyser implements AnalyserInterface {
    node: AnalyserNode;

    static getFrequencyFromData(dataArray: Float32Array, sampleRate: number, fftSize: number) {
        /*
        This algorithm works as follows:
        - dataArray contains amplitudes; sampleRate/fftSize = the frequency increase at each index of the array.
        - Each significant peak in amplitude will be a resonating frequency, including harmonics of the pitch.
        - Assume that the first significant peak is the true pitch, and use that index to deduce the frequency.
        */

        // this value seems to work so far
        const significantAmplitudeChange = 20;

        // initialise with the first index
        let minAmplitude = dataArray[0];
        let maxAmplitude = dataArray[0];
        let indexOfMaxAmplitude = -1;

        for (let i = 1; i < dataArray.length; i++) {
            let amplitude = dataArray[i];

            if (amplitude < minAmplitude) {
                minAmplitude = amplitude;
            }

            if ((amplitude > maxAmplitude) &&
                (amplitude - minAmplitude > significantAmplitudeChange)) {
                // we're significantly above the min so far - so start tracking the index
                maxAmplitude = amplitude;
                indexOfMaxAmplitude = i;
            }

            if ((indexOfMaxAmplitude > -1) &&
                (maxAmplitude - amplitude > significantAmplitudeChange)) {
                // if we had found a max already, we're now significantly below - get frequency from max index
                return indexOfMaxAmplitude * sampleRate / fftSize;
            }
        }

        return 0;
    }

    constructor(private audioContext: AudioContext) {
        this.node = audioContext.createAnalyser();
        this.node.fftSize = 4096;
    }

    getNode(): AnalyserNode {
        return this.node;
    }

    getFrequency(): number {
        const dataArray = new Float32Array(this.node.frequencyBinCount);
        this.node.getFloatFrequencyData(dataArray);
        return FrequencyDataAnalyser.getFrequencyFromData(dataArray, this.audioContext.sampleRate, this.node.fftSize);
    }
}