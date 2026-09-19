import { React, useEffect } from 'react';
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

  // Trigger speech synthesis once when the component mounts
  useEffect(() => {
    const speakWeather = () => {
      const high = Math.round(WeatherData.temperature_max);
      const low = Math.round(WeatherData.temperature_min);
      const wind = Math.round(WeatherData.wind_speed_max);

      const phrase = `Welcome back, sir. The high today is ${high} degrees, and the low is ${low} degrees, with winds up to ${wind} miles per hour.`;
      const jarvis = new SpeechSynthesisUtterance(phrase);

      // Get all available voices from the browser
      const voices = window.speechSynthesis.getVoices();

      const jarvisVoice = voices.find(v => v.name.includes('Ryan (Natural)') && v.lang.startsWith('en-GB')) || // Edge Natural
                          voices.find(v => v.name.includes('Oliver') && v.lang.startsWith('en-GB')) ||         // Elegant macOS voice
                          voices.find(v => v.name.includes('Google') && v.lang.startsWith('en-GB') && v.name.toLowerCase().includes('male')) || // Google UK Male
                          voices.find(v => v.lang.startsWith('en-GB')); // Fallback to any British voice

      if (jarvisVoice) {
        jarvis.voice = jarvisVoice;
      }

      // Fine-tune natural pacing
      jarvis.rate = 0.95;  // Slightly slower than default makes it sound much less robotic
      jarvis.pitch = 0.5;  // Drops the pitch for that deeper tone

      window.speechSynthesis.speak(jarvis);
    };

    // Chrome/Edge load voices asynchronously. We must wait for them to load.
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = speakWeather;
    }

    // Trigger immediately if voices are already cached/cached by browser
    if (window.speechSynthesis.getVoices().length > 0) {
      speakWeather();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>◈</span>
        <h3>ISLA VISTA TELEMETRY</h3>
      </div>
      <div className={styles.main}>
        <div className={styles.temps}>
          <div className={styles.tempBlock}>
            <span className={styles.tempLabel}>MAX</span>
            <span className={styles.temp}>
              {Math.round(WeatherData.temperature_max)}<span>°F</span>
            </span>
          </div>
          <div className={styles.tempBlock}>
            <span className={styles.tempLabel}>MIN</span>
            <span className={styles.temp}>
              {Math.round(WeatherData.temperature_min)}<span>°F</span>
            </span>
          </div>
        </div>
        <div className={styles.condition}>Max Chance of Rain: {WeatherData.max_chance_rain}%</div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <label>WIND</label>
          <span className={styles.value}>{Math.round(WeatherData.wind_speed_max)}MPH</span>
        </div>
        <div className={styles.stat}>
          <label>UV INDEX</label>
          <span className={styles.value}>{Math.round(WeatherData.uv_index_max)}</span>
        </div>
        <div className={styles.stat}>
          <label>SUNSET</label>
          <span className={styles.value}>{sunsetTimeString}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherHub;