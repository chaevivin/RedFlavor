import React, { useEffect, useRef, useState } from 'react';
import styles from './Frequency.module.css';
import { useAppSelector } from '../../hook/reduxHook';
import { musicValue } from './../../reducers/musicSlice';

export default function Frequency() {
  const [randomInt, setRandomInt] = useState(0);
  const array = useRef<number[]>([]);
  const music = useAppSelector(musicValue);

  useEffect(() => {
    if (music) {
      const timer = setInterval(() => {
        setRandomInt(Math.floor(Math.random() * 7) + 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }
  }, [music]);

  useEffect(() => {
    if (music) {
      // randomInt 길이의 배열 생성해서 array에 할당
      array.current = Array.from({ length: randomInt }); 
    }
  }, [randomInt, music]);

  return (
    <div className={styles.container}>
      {/* randomInt 개수만큼 반복 */}
      {array.current.map((_, index) => (
        <div key={index} className={styles.frequency}></div>
      ))}
    </div>
  );
}

