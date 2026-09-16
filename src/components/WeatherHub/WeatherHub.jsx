import React from 'react';
import styles from './WeatherHub.module.scss';
import { WeatherData } from '../../sources/WeatherDataSource';

const WeatherHub = () => {
  // Format the time safely to avoid crashing if sunset is missing
  const todaySunset = WeatherData.sunset?.[0];
  const sunsetTimeString = todaySunset instanceof Date 
    ? todaySunset.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'America/Los_Angeles' // <--- Explicitly pins formatting to Isla Vista
      })
    : 'N/A';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>◈</span>
        <h3>ISLA VISTA TELEMETRY</h3>
      </div>
      <div className={styles.main}>
        <div className={styles.temp}>
          Max: {Math.round(WeatherData.temperature_max)}<span>°F</span> | 
          Min: {Math.round(WeatherData.temperature_min)}<span>°F</span>
        </div>
        <div className={styles.condition}>Max Chance of Rain: {WeatherData.max_chance_rain}%</div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <label>WIND</label>
          <value>{Math.round(WeatherData.wind_speed_max)}MPH</value>
        </div>
        <div className={styles.stat}>
          <label>UV INDEX</label>
          <value>{Math.round(WeatherData.uv_index_max)}</value>
        </div>
        <div className={styles.stat}>
          <label>SUNSET</label>
          <value>{sunsetTimeString}</value>
        </div>
      </div>
    </div>
  );
};

export default WeatherHub;