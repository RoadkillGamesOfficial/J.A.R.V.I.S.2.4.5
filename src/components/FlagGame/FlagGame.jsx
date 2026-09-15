import React, { useState } from 'react';
import styles from './FlagGame.module.scss';

const FlagGame = () => {
  const [revealed, setRevealed] = useState(false);
  const [currentFlag, setCurrentFlag] = useState({
    image: 'https://flagcdn.com/w320/us.png',
    country: 'United States'
  });

  const flags = [
    { image: 'https://flagcdn.com/w320/us.png', country: 'United States' },
    { image: 'https://flagcdn.com/w320/ca.png', country: 'Canada' },
    { image: 'https://flagcdn.com/w320/gb.png', country: 'United Kingdom' },
    { image: 'https://flagcdn.com/w320/fr.png', country: 'France' },
    { image: 'https://flagcdn.com/w320/de.png', country: 'Germany' }
  ];

  const revealAnswer = () => setRevealed(true);
  const nextFlag = () => {
    const randomIndex = Math.floor(Math.random() * flags.length);
    setCurrentFlag(flags[randomIndex]);
    setRevealed(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>▲</span>
        <h3>TERRITORY IDENTIFICATION</h3>
      </div>
      <div className={styles.main}>
        <div className={styles.flagContainer}>
          <img
          src={currentFlag.image}
          alt="Country Flag"
            className={revealed ? styles.revealed : styles.blurred}
        />
          {revealed && (
            <div className={styles.countryName}>{currentFlag.country}</div>
          )}
      </div>
      </div>
      <div className={styles.actions}>
        <button
          onClick={revealAnswer}
          disabled={revealed}
          className={styles.actionBtn}
        >
          REVEAL
        </button>
        <button
          onClick={nextFlag}
          className={styles.actionBtn}
        >
          NEXT TARGET
        </button>
    </div>
    </div>
  );
};

export default FlagGame;