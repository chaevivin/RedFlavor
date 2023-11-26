import React from 'react';
import styles from './Character.module.css';

export default function Character() {
  const handleCharClick = () => {
    
  };

  return (
    <button 
      className={styles.character}
      onClick={() => handleCharClick()}
    >
      character
    </button>
  );
}

