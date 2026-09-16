import React, { useState, useEffect } from 'react';
import { fetchCountryMap, getRandomFlagData } from '../../sources/FlagGameSource';
import styles from './FlagGame.module.scss';

const FlagGame = () => {
  const [revealed, setRevealed] = useState(false);
  const [countryMap, setCountryMap] = useState({});
  const [currentFlag, setCurrentFlag] = useState({ image: '', country: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call the asynchronous source function
    fetchCountryMap()
      .then((data) => {
        setCountryMap(data);
        // Extract random item matching the shape { image, country }
        const randomFlag = getRandomFlagData(data);
        setCurrentFlag(randomFlag);
        setLoading(false);
      })
      .catch((err) => {
        // Fallback loading error screen management
        setLoading(false);
      });
  }, []);

  const handleNextFlag = () => {
    const randomFlag = getRandomFlagData(countryMap);
    setCurrentFlag(randomFlag);
    setRevealed(false);
  };

  const revealAnswer = () => setRevealed(true);

  if (loading) return <div>Loading territories...</div>;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>▲</span>
        <h3>TERRITORY IDENTIFICATION</h3>
      </div>
      <div className={styles.main}>
        <div className={styles.flagContainer}>
          {currentFlag.image && (
            <img
              src={currentFlag.image}
              alt="Country Flag"
              className={revealed ? styles.revealed : styles.blurred}
            />
          )}
          {revealed && (
            <div className={styles.countryName}>{currentFlag.country}</div>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={revealAnswer} disabled={revealed} className={styles.actionBtn}>
          REVEAL
        </button>
        <button onClick={handleNextFlag} className={styles.actionBtn}>
          NEXT TARGET
        </button>
      </div>
    </div>
  );
};

export default FlagGame;