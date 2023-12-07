import React, { useEffect, useRef, useState } from 'react';
import styles from './Frequency.module.css';
import { useAppSelector } from '../../hook/reduxHook';
import { musicValue } from './../../reducers/musicSlice';

const sequence = [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1];

export default function Frequency({ start }: { start: number }) {
  const [randomInt, setRandomInt] = useState(0);
  const array = useRef<number[]>([]);
  const music = useAppSelector(musicValue);

  useEffect(() => {
    let currentIndex = start;

    if (music) {
      const timer = setInterval(() => {
        setRandomInt(sequence[currentIndex]);
        currentIndex = (currentIndex + 1) % sequence.length;
      }, 200);
  
      return () => clearInterval(timer);
    }
  }, [music, start]);

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

