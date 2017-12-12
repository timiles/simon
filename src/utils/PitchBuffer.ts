import { EventEmitter } from 'events';
import Note from '../Note';

class TimestampedPitch {
    startTime: number;
    pitch: number;

    constructor(startTime: number, pitch: number) {
        this.startTime = startTime;
        this.pitch = pitch;
    }
}

export default class PitchBuffer extends EventEmitter {
    private buf: Array<TimestampedPitch>;

    constructor(private minimumNoteDurationSeconds: number = .05) {
        super();
        this.buf = new Array<TimestampedPitch>();
    }

    push(currentTime: number, pitch: number) {

        if (this.buf.length > 0) {
            if (Math.abs(pitch - this.buf[this.buf.length - 1].pitch) >= 1) {

                let sumOfPitches = 0;
                for (let i = 0; i < this.buf.length; i++) {
                    sumOfPitches += this.buf[i].pitch;
                }

                const averagePitch = Math.round(sumOfPitches / this.buf.length);
                const duration = currentTime - this.buf[0].startTime;

                const n = new Note(averagePitch, Number(duration.toFixed(2)));
                if (duration >= this.minimumNoteDurationSeconds) {
                    this.emit('onNoteCompleted', n);
                }
                this.buf = new Array<TimestampedPitch>();
            }
        }

        this.buf.push(new TimestampedPitch(currentTime, pitch));
    }

    flush() {
        const lastTime = this.buf[this.buf.length - 1].startTime;
        this.push(lastTime + this.minimumNoteDurationSeconds, 0);
    }
}