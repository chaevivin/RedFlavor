import React, { useState } from 'react';
import styles from './StatusBar.module.css';

export default function StatusBar() {
  const [status, setStatus] = useState<string>('텍스트를 입력해 보세요.');

  const handleStatusFocus = () => {
    setStatus('');
  };

  const handleStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStatus((e.target as HTMLButtonElement).value);
  }

  return (
    <form>
      <input 
        className={styles.statusbar}
        type='text'
        value={status}
        onFocus={() => handleStatusFocus()}
        onChange={(e) => handleStatusChange(e)}
      />
    </form>
    
  );
}

