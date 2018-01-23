import * as React from 'react';
import './Main.css';
import NotePlayer from '../utils/NotePlayer';
import Note from '../types/Note';
import NoteListener from '../utils/NoteListener';
import Instrument from '../types/Instrument';
import InstrumentsDataSource from '../data/InstrumentsDataSource';
import ScalesDataSource from '../data/ScalesDataSource';
import Scale from '../types/Scale';
import Simon from '../Simon';

export interface State {
  isGameStarted: boolean;
  isNoteListenerInitialised: boolean;
  isNoteListenerStarted: boolean;
  simonsNotes: Array<Note>;
  playersNotes: Array<Note>;
}

class Main extends React.Component<object, State> {
  private audioContext: AudioContext;
  private noteListener: NoteListener;
  private currentInstrument: Instrument;
  private currentKey: number;
  private currentScale: Scale;

  constructor(props: object) {
    super(props);

    this.currentInstrument = InstrumentsDataSource.all[0];
    this.currentScale = ScalesDataSource.all[0];
    this.state = {
      isGameStarted: false,
      isNoteListenerInitialised: false,
      isNoteListenerStarted: false,
      simonsNotes: new Array<Note>(),
      playersNotes: new Array<Note>()
    };

    // create only one AudioContext in the app - browser has max 6
    // tslint:disable-next-line: no-any - TODO: include typing for AudioContext?
    this.audioContext = new (window as any).AudioContext();
    this.noteListener = new NoteListener(this.audioContext);
    this.noteListener.initialise().then(() => {
      this.setState({ isNoteListenerInitialised: true });
    }).catch((reason) => {
      if (reason === 'PermissionDeniedError') {
        alert('Please allow access to microphone and reload the page.');
      } else {
        alert('An error occurred.');
      }
    });
  }

  startGame(): void {
    const pitchesInScale = this.currentScale.getPitchesRelativeToRoot();
    const rootPitch = this.currentInstrument.getFirstCTransposed() + this.currentKey;
    const simon = new Simon(pitchesInScale, rootPitch);
    const simonsNotes = simon.say();
    this.setState(
      {
        isGameStarted: true,
        simonsNotes: simonsNotes,
        playersNotes: new Array<Note>()
      },
      () => this.playSimonsNotes());
  }

  playSimonsNotes(): void {
    this.noteListener.stop();
    const notePlayer = new NotePlayer(this.audioContext);
    let elapsedSeconds = 0;
    for (let note of this.state.simonsNotes) {
      notePlayer.play(note, elapsedSeconds);
      elapsedSeconds += note.durationSeconds;
    }
    setTimeout(() => this.startListening(), (elapsedSeconds + 1) * 1000);
  }

  startListening(): void {
    this.noteListener.start();
    this.noteListener.onNoteCompleted((n) => {
      if (n.pitch > 0 && n.durationSeconds >= .5) {
        let notes = this.state.playersNotes;
        if (notes.length === 0 || notes[notes.length - 1].pitch !== n.pitch) {
          notes.push(n);
          this.setState({ playersNotes: notes });

          if (notes.length === this.state.simonsNotes.length) {
            // stop listening
            this.noteListener.stop(false);
            this.setState({ isNoteListenerStarted: false });

            let isCorrect = true;
            for (let i = 0; i < notes.length; i++) {
              if (notes[i].pitch !== this.state.simonsNotes[i].pitch) {
                isCorrect = false;
                break;
              }
            }
            if (isCorrect) {
              // TODO: indicate success
              this.startGame();
            } else {
              // wipe it out and start again
              this.setState({ playersNotes: new Array<Note>() });
              this.playSimonsNotes();
            }
          }
        }
      }
    });
    this.setState({ isNoteListenerStarted: true });
  }

  render() {
    let simonsNoteSpans = [];
    for (let i = 0; i < this.state.simonsNotes.length; i++) {
      simonsNoteSpans.push(<span key={'simonsNotes_' + i}>{this.state.simonsNotes[i].pitch}, </span>);
    }
    let playersNoteSpans = [];
    for (let i = 0; i < this.state.playersNotes.length; i++) {
      playersNoteSpans.push(<span key={'playersNotes_' + i}>{this.state.playersNotes[i].pitch}, </span>);
    }
    return (
      <div>
        <div>
          Pick an instrument:
          <select onChange={e => this.handleInstrumentChange(e)}>
            {InstrumentsDataSource.all.map((x, i) => <option key={'instruments_' + i}>{x.name}</option>)}
          </select>
        </div>
        <div>
          Pick a key:
          <select onChange={e => this.handleKeyChange(e)}>
            {Scale.notes.map((x, i) => <option key={'keys_' + i}>{x}</option>)}
          </select>
        </div>
        <div>
          Pick a scale:
          <select onChange={e => this.handleScaleChange(e)}>
            {ScalesDataSource.all.map((x, i) => <option key={'scales_' + i}>{x.name}</option>)}
          </select>
        </div>
        <button
          disabled={!this.state.isNoteListenerInitialised || this.state.isGameStarted}
          onClick={() => this.startGame()}
        >
          Start!
        </button>
        <div>
          Listening:
          {this.state.isNoteListenerStarted ? 'ON' : 'OFF'}
        </div>
        <div>
          <h3>Simon's notes:</h3>
          {simonsNoteSpans}
        </div>
        <div>
          <h3>Your notes:</h3>
          {playersNoteSpans}
        </div>
      </div>
    );
  }

  private handleInstrumentChange(e: React.FormEvent<HTMLSelectElement>): void {
    this.currentInstrument = InstrumentsDataSource.all[e.currentTarget.selectedIndex];
  }

  private handleKeyChange(e: React.FormEvent<HTMLSelectElement>): void {
    this.currentKey = e.currentTarget.selectedIndex;
  }

  private handleScaleChange(e: React.FormEvent<HTMLSelectElement>): void {
    this.currentScale = ScalesDataSource.all[e.currentTarget.selectedIndex];
  }
}

export default Main;
