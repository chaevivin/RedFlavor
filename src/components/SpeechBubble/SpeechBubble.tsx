import React, { useEffect, useState } from 'react';
import styles from './SpeechBubble.module.css';

const textArr: string[] = ['안녕', '졸려', '배고파'];

export default function SpeechBubble() {
  const [num, setNum] = useState<number>(0);
  const [text, setText] = useState<string>(textArr[num]);

  const handleBubbleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    num < 2 ? setNum((prev) => prev + 1) : setNum((prev) => prev - 2);
  };

  useEffect(() => {
    setText(textArr[num]);
  }, [num]);

  return (
    <button 
      className={styles.bubble}
      onClick={(e) => handleBubbleClick(e)}
    >
      {text}
    </button>
  );
}

