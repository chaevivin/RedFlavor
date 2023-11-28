import React from 'react';
import styles from './MyRoomModal.module.css';
import { closeModal, modalState, modalValue } from './../../reducers/modalSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function MyRoomModal() {
  const modalState = useSelector(modalValue);
  const dispatch = useDispatch();

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

