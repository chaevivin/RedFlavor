import React from 'react';
import styles from './Character.module.css';
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook';
import { heartGauge } from '../../reducers/heartSlice';
import { memberValue } from '../../reducers/memberSlice';

export default function Character() {
  const dispatch = useAppDispatch();
  const member = useAppSelector(memberValue);

  const handleCharClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(heartGauge());
  };

  return (
    <button 
      className={styles.character}
      onClick={(e) => handleCharClick(e)}
    >
      {member}
    </button>
  );
}

