import React, { useState } from 'react';
import styles from './FitnessMatrix.module.scss';

const FitnessMatrix = () => {
  const [fitnessData, setFitnessData] = useState({
    pushups: 0,
    situps: 0,
    squats: 0
  });

  const dailyGoal = 100;

  // SVG ring geometry (r=54 within a 120x120 viewBox). A stroke-dasharray is
  // measured in path units, so dash lengths must be expressed against the
  // circle's circumference (2 * PI * r ~= 339.29) for a 100/100 goal to fill
  // the entire ring instead of only ~29% of it.
  const progressRadius = 54;
  const progressCircumference = 2 * Math.PI * progressRadius;

  const increment = (exercise, amount) => {
    setFitnessData(prev => ({
      ...prev,
      [exercise]: prev[exercise] + amount
    }));
  };

  const calculateProgress = (value) => {
    const clamped = Math.min(value, dailyGoal);
    return (clamped / dailyGoal) * progressCircumference;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>◈</span>
        <h3>FITNESS MATRIX</h3>
      </div>
      <div className={styles.main}>
        {Object.entries(fitnessData).map(([exercise, count]) => (
          <div key={exercise} className={styles.exercise}>
            <div className={styles.progressRing}>
              <svg className={styles.progressRingCircle} width="120" height="120">
                <circle
                  className={styles.progressRingCircleBg}
                  stroke="rgba(0, 209, 255, 0.1)"
                  strokeWidth="10"
                  fill="transparent"
                  r={progressRadius}
                  cx="60"
                  cy="60"
                />
                <circle
                  className={styles.progressRingCircleFg}
                  stroke="#00d1ff"
                  strokeWidth="10"
                  fill="transparent"
                  r={progressRadius}
                  cx="60"
                  cy="60"
                  strokeDasharray={`${calculateProgress(count)} ${progressCircumference}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className={styles.progressText}>
                <span>{count}</span>
                <span>/ {dailyGoal}</span>
              </div>
            </div>
            <div className={styles.exerciseInfo}>
              <h4>{exercise.toUpperCase()}</h4>
              <div className={styles.buttons}>
                <button
                  onClick={() => increment(exercise, 5)}
                  className={styles.actionBtn}
                >
                  +5
                </button>
                <button
                  onClick={() => increment(exercise, 10)}
                  className={styles.actionBtn}
                >
                  +10
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessMatrix;