import React, { useState } from 'react';
import Character from '../components/Character/Character';
import styles from './MyRoom.module.css';
import SpeechBubble from '../components/SpeechBubble/SpeechBubble';
import StatusBar from '../components/StatusBar/StatusBar';
import HeartBar from '../components/HeartBar/HeartBar';
import MyRoomModal from '../components/MyRoomModal/MyRoomModal';
import { IoMenu } from "react-icons/io5";

export default function MyRoom() {
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMenuClicked((prev) => !prev);
    console.log(menuClicked);
  };

  return (
    <div className={styles.background}>
      <Character />
      <SpeechBubble />
      <HeartBar />
      <StatusBar />
      <button 
        onClick={(e) => handleMenuClick(e)}
        className={styles.button}
      >
        <IoMenu />
      </button>
      {menuClicked ? <MyRoomModal /> : ''}
    </div>
  );
}

