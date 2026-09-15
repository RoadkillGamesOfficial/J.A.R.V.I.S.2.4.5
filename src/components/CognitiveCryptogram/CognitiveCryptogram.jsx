import React, { useState } from 'react';
import styles from './CognitiveCryptogram.module.scss';

const CognitiveCryptogram = () => {
  const [revealed, setRevealed] = useState(false);

  const riddle = {
    question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?',
    answer: 'An echo'
  };

  const toggleSolution = () => {
    setRevealed(!revealed);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>⚡</span>
        <h3>COGNITIVE CRYPTOGRAM</h3>
      </div>
      <div className={styles.main}>
        <div className={styles.riddle}>
          <p>{riddle.question}</p>
        </div>
        <button
          onClick={toggleSolution}
          className={styles.actionBtn}
        >
          {revealed ? 'HIDE SOLUTION' : 'REVEAL SOLUTION'}
        </button>
        {revealed && (
          <div className={styles.solution}>
            <p>{riddle.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CognitiveCryptogram;