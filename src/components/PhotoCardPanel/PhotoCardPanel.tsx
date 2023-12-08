import React from 'react';
import { FaCheck } from "react-icons/fa6";
import { useAppDispatch } from '../../hook/reduxHook';
import { closePanel } from '../../reducers/panelSlice';
import styles from './PhotoCardPanel.module.css';

export default function PhotoCardPanel() {
  const dispatch = useAppDispatch();

  const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closePanel());
  };

  return (
    <section>
      <h3>panel</h3>
      <button
        onClick={(e) => handleCompleteClick(e)}
      >
        <FaCheck className={styles.check} />
      </button>
    </section>
  );
}

