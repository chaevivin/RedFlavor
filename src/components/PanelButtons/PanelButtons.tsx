import React from 'react';
import { FaCheck } from "react-icons/fa6";
import { useAppDispatch } from '../../hook/reduxHook';
import { closePanel } from '../../reducers/panelSlice';
import styles from './PanelButtons.module.css';
import { choosePanel } from '../../reducers/choosePanelSlice';

export default function PanelButtons() {
  const dispatch = useAppDispatch();

  const handleMemberClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(choosePanel('member'));
  };

  const handleFrameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(choosePanel('frame'));
  };

  const handleStickerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(choosePanel('sticker'));
  };

  const handleBrushClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(choosePanel('brush'));
  };

  const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closePanel());
  };

  return (
    <section>
      <button
        onClick={(e) => handleMemberClick(e)}
      >
        멤버
      </button>
      <button
        onClick={(e) => handleFrameClick(e)}
      >
        프레임
      </button>
      <button
        onClick={(e) => handleStickerClick(e)}
      >
        스티커
      </button>
      <button
        onClick={(e) => handleBrushClick(e)}
      >
        브러쉬
      </button>
      <button
        onClick={(e) => handleCompleteClick(e)}
      >
        <FaCheck className={styles.check} />
      </button>
    </section>
  );
}

