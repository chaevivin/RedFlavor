import React from 'react';
import Character from '../components/Character/Character';
import styles from './MyRoom.module.css';
import SpeechBubble from '../components/SpeechBubble/SpeechBubble';
import StatusBar from '../components/StatusBar/StatusBar';
import HeartBar from '../components/HeartBar/HeartBar';
import MyRoomModal from '../components/MyRoomModal/MyRoomModal';

export default function MyRoom() {
  return (
    <div className={styles.background}>
      <Character />
      <SpeechBubble />
      <HeartBar />
      <StatusBar />
      <MyRoomModal />
    </div>
  );
}

