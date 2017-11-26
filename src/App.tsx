import * as React from 'react';
import './App.css';
import Main from './components/Main';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2>Simon</h2>
        </div>
        <div className="app-container">
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
