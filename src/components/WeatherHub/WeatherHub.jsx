import React from 'react';
import styles from './WeatherHub.module.scss';

const WeatherHub = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>◈</span>
        <h3>ISLA VISTA TELEMETRY</h3>
      </div>
      <div className={styles.main}>
        <div className={styles.temp}>
          68<span>°F</span>
        </div>
        <div className={styles.condition}>PARTLY CLOUDY</div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <label>WIND</label>
          <value>12 MPH</value>
        </div>
        <div className={styles.stat}>
          <label>UV INDEX</label>
          <value>LOW 2</value>
        </div>
        <div className={styles.stat}>
          <label>HUMIDITY</label>
          <value>64%</value>
        </div>
      </div>
    </div>
  );
};

export default WeatherHub;