import React, { useState, useEffect } from 'react';
import styles from './BootSequence.module.scss';

const BootSequence = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([
    '> INITIALIZING J.A.R.V.I.S. 2.4.5 CORE...',
    '> LOADING NEURAL NETWORKS...',
    '> CONNECTING TO STARK-NET SATELLITES...'
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + 2;
      });
    }, 40);

    const logList = [
      '> ENCRYPTING BIO-DATA...',
      '> SYNCING ISLA VISTA WEATHER DATA...',
      '> BOOTING FITNESS MATRIX...',
      '> OPTIMIZING HOLOGRAPHIC INTERFACE...',
      '> SYSTEM SECURE. WELCOME HOME.'
    ];

    let i = 0;
    const logTimer = setInterval(() => {
      if (i < logList.length) {
        setLogs(prev => [...prev, logList[i]]);
        i++;
      } else {
        clearInterval(logTimer);
      }
    }, 400);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, [onComplete]);

  return (
    <div className={styles.bootOverlay}>
      <div className={styles.centerContainer}>
        <div className={styles.arcReactor}>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
        </div>
        <div className={styles.loadingInfo}>
          <div className={styles.percentage}>{progress}%</div>
          <div className={styles.barContainer}>
            <div className={styles.bar} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className={styles.terminal}>
          {logs.slice(-5).map((log, i) => (
            <div key={i} className={styles.logLine}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;