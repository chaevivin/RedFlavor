import React, { useState } from 'react';
import Character from '../components/Character/Character';
import styles from './MyRoom.module.css';
import SpeechBubble from '../components/SpeechBubble/SpeechBubble';
import StatusBar from '../components/StatusBar/StatusBar';
import HeartBar from '../components/HeartBar/HeartBar';
import MyRoomModal from '../components/MyRoomModal/MyRoomModal';
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { modalValue, openModal } from '../reducers/modalSlice';

export default function MyRoom() {
  const modalState = useSelector(modalValue);
  const dispatch = useDispatch();
  
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

