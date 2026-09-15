import React, { useState } from 'react';
import BootSequence from './components/BootSequence/BootSequence';
import WeatherHub from './components/WeatherHub/WeatherHub';
import FlagGame from './components/FlagGame/FlagGame';
import FitnessMatrix from './components/FitnessMatrix/FitnessMatrix';
import CognitiveCryptogram from './components/CognitiveCryptogram/CognitiveCryptogram';
import './App.scss';

const App = () => {
  const [bootComplete, setBootComplete] = useState(false);

  const handleBootComplete = () => {
    setBootComplete(true);
  };

  return (
    <div className="app">
      {!bootComplete ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <div className="dashboard">
          <h1>J.A.R.V.I.S. 2.4.5</h1>
          <div className="dashboard-grid">
            <WeatherHub />
            <FlagGame />
            <FitnessMatrix />
            <CognitiveCryptogram />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
