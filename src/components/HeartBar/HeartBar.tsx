import React, { useEffect } from 'react';
import styles from './HeartBar.module.css';
import { useAppSelector } from '../../hook/reduxHook';
import { heartValue } from '../../reducers/heartSlice';

export default function HeartBar() {
  const heartNum = useAppSelector(heartValue);

  useEffect(() => {
    document.getElementById(`${heartNum}`)?.setAttribute('src', '/img/pink.png');
  }, [heartNum]);

  return (
    <div className={styles.heartbar}>
      {[1, 2, 3, 4, 5].map((v) => (
        <img 
          key={v}
          id={`${v}`}
          className={styles.heart}
          alt='black heart'
          src='/img/black.png'
        />
      ))}
    </div>
  );
}


