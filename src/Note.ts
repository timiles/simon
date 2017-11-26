export default class Note {
    pitch: number;
    durationSeconds: number;

    constructor(pitch: number, durationSeconds: number) {
        this.pitch = pitch;
        this.durationSeconds = durationSeconds;
    }
}