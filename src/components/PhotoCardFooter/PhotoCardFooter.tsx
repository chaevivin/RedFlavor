import React from 'react';
import { useAppDispatch } from '../../hook/reduxHook';
import { showExample } from '../../reducers/exampleSlice';
import { openPanel } from '../../reducers/panelSlice';

export default function PhotoCardFooter() {
  const dispatch = useAppDispatch();

  const handlePanelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(openPanel());
  };

  const handleExampleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(showExample());
  };

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <footer>
      <button
        onClick={(e) => handlePanelClick(e)}
      >
        꾸미기
      </button>
      <button
        onClick={(e) => handleExampleClick(e)}
      >
        예시
      </button>
      <button
        onClick={(e) => handleResetClick(e)}
      >
        초기화
      </button>
    </footer>
  );
}

