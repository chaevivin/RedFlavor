import React from 'react';
import styles from './Character.module.css';
import { useAppDispatch } from '../../hook/reduxHook';
import { heartGauge } from '../../reducers/heartSlice';

export default function Character() {
  const dispatch = useAppDispatch();

  const handleCharClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(heartGauge());
  };

  return (
    <button 
      className={styles.character}
      onClick={(e) => handleCharClick(e)}
    >
      character
    </button>
  );
}

