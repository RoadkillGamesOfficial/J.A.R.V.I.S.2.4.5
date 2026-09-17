import React, { useState } from 'react';
import BootSequence from './components/BootSequence/BootSequence';
import WeatherHub from './components/WeatherHub/WeatherHub';
import FlagGame from './components/FlagGame/FlagGame';
import FitnessMatrix from './components/FitnessMatrix/FitnessMatrix';
import ChuckNorrisJoke from './components/ChuckNorrisJoke/ChuckNorrisJoke';
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
            <ChuckNorrisJoke />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
