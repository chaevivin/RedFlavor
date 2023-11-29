import React from 'react';
import styles from './MyRoomModal.module.css';
import { closeModal } from './../../reducers/modalSlice';
import { useAppDispatch } from '../../hook/reduxHook';
import { memberUpdated } from '../../reducers/memberSlice';


export default function MyRoomModal() {
  const dispatch = useAppDispatch();

  const handleXClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  const handleMemeberClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    dispatch(memberUpdated(e.currentTarget.value));
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
      <div>
        <button onClick={(e) => handleMemeberClick(e)} value='irene'>아이린</button>
        <button onClick={(e) => handleMemeberClick(e)} value='seulgi'>슬기</button>
        <button onClick={(e) => handleMemeberClick(e)} value='wendy'>웬디</button>
        <button onClick={(e) => handleMemeberClick(e)} value='joy'>조이</button>
        <button onClick={(e) => handleMemeberClick(e)} value='yeri'>예리</button>
      </div>
    </div>
  );
}

