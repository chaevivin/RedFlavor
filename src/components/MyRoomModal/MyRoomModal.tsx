import React from 'react';
import styles from './MyRoomModal.module.css';
import { closeModal } from './../../reducers/modalSlice';
import { useAppDispatch } from '../../hook/reduxHook';

export default function MyRoomModal() {
  const dispatch = useAppDispatch();

  const handleXClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  return (
    <div className={styles.modal}>
      <span>Modal</span>
      <button 
        className={styles.button}
        onClick={(e) => handleXClick(e)}
      >
        x
      </button>
    </div>
  );
}

