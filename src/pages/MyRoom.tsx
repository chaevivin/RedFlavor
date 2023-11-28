import React from 'react';
import Character from '../components/Character/Character';
import styles from './MyRoom.module.css';
import SpeechBubble from '../components/SpeechBubble/SpeechBubble';
import StatusBar from '../components/StatusBar/StatusBar';
import HeartBar from '../components/HeartBar/HeartBar';
import MyRoomModal from '../components/MyRoomModal/MyRoomModal';
import { IoMenu } from "react-icons/io5";
import { modalValue, openModal } from '../reducers/modalSlice';
import { useAppDispatch, useAppSelector } from '../hook/reduxHook';

export default function MyRoom() {
  const modalState = useAppSelector(modalValue);
  const dispatch = useAppDispatch();
  
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(openModal());
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
      {modalState ? <MyRoomModal /> : ''}
    </div>
  );
}

