import React from 'react';
import { useAppDispatch } from '../../hook/reduxHook';
import { showExample } from '../../reducers/exampleSlice';
import { openPanel } from '../../reducers/panelSlice';

interface PhotoCardFooterProps {
  clearCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

const clearCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');

  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
};

export default function PhotoCardFooter({ clearCanvasRef }: PhotoCardFooterProps) {
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

    const canvas = clearCanvasRef.current;

    if (canvas) {
      clearCanvas(canvas);
    }
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

