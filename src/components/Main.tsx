import * as React from 'react';
import './Main.css';
import NotePlayer from '../utils/NotePlayer';
import Note from '../Note';

class Main extends React.Component {
  private audioContext: AudioContext;

  start() {
    if (!this.audioContext) {
      // create only one AudioContext in the app - browser has max 6
      // tslint:disable-next-line: no-any - TODO: include typing for AudioContext?
      this.audioContext = new (window as any).AudioContext();
    }
    const notePlayer = new NotePlayer(this.audioContext);
    notePlayer.play(new Note(96, 1));
  }

  render() {
    return <button onClick={() => this.start()}>Start!</button>;
  }
}

export default Main;
