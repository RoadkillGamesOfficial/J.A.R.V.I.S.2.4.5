import { useState, useEffect } from 'react'
import ChuckNorrisJokeSource from '../../sources/ChuckNorrisJokeSource'
import styles from './ChuckNorrisJoke.module.scss'

const ChuckNorrisJoke = () => {
  const [joke, setJoke] = useState('Loading...');
  useEffect(() => {
    ChuckNorrisJokeSource().then(setJoke);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>◈</span>
        <h3>NORRIS JOKE</h3>
      </div>
      <div className={styles.main}>
        <div className={styles.riddle}>
          <p>{joke}</p>
        </div>
      </div>
    </div>
  );
}
export default ChuckNorrisJoke;