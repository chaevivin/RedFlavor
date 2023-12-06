import React, { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';
import { useAppSelector } from '../../hook/reduxHook';
import { musicValue } from '../../reducers/musicSlice';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const music = useAppSelector(musicValue);

  useEffect(() => {
    if (music) {
      const timer = setTimeout(() => {
        setCurrentTime((prev) => {
          if (prev + 1 > 180) {
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
  
      return () => clearTimeout(timer);
    }
  }, [currentTime, music]);

  useEffect(() => {
    if (music) {
      const calculatedProgress = (currentTime / 180) * 100;
      setProgress(calculatedProgress);
    }
  }, [currentTime, music]);

  return (
    <div className={styles.container}>
      <div 
        className={styles.now}
        style={{
          left: `calc(${progress}%)`,
          width: '30px',
          height: '30px',
          backgroundColor: 'blue',
          transition: 'left 1s linear',
          position: 'absolute'
        }}
      >
      </div>
    </div>
  );
}

