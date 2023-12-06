import React from 'react';
import styles from './MyRoomModal.module.css';
import { closeModal } from './../../reducers/modalSlice';
import { useAppDispatch } from '../../hook/reduxHook';
import { memberUpdated } from '../../reducers/memberSlice';

const members = ['irene', 'seulgi', 'wendy', 'joy', 'yeri'];

export default function MyRoomModal() {
  const dispatch = useAppDispatch();

  const handleXClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  const handleMemberClick = (value: string) => {
    dispatch(memberUpdated(value));
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
        {members.map((member) => (
          <button
            key={member}
            onClick={() => handleMemberClick(member)}
          >
            {member}
          </button>
        ))}
      </div>
    </div>
  );
}

