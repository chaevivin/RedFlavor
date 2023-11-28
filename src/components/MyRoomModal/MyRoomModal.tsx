import React from 'react';
import styles from './MyRoomModal.module.css';

export default function MyRoomModal() {
  return (
    <div className={styles.modal}>
      <span>Modal</span>
      <button className={styles.button}>x</button>
    </div>
  );
}

