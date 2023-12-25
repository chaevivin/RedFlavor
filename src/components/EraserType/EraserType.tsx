import React from 'react';
import { useAppDispatch } from '../../hook/reduxHook';
import { changeEraser } from '../../reducers/changeEraserSlice';

export default function EraserType() {
  const dispatch = useAppDispatch();

  const handleEraserClick = (e: React.MouseEvent<HTMLButtonElement>, size: number) => {
    e.preventDefault();
    dispatch(changeEraser(size));
  };

  return (
    <section>
      <button
        onClick={(e) => handleEraserClick(e, 10)}
      >
        small
      </button>
      <button
        onClick={(e) => handleEraserClick(e, 15)}
      >
        medium
      </button>
      <button
        onClick={(e) => handleEraserClick(e, 20)}
      >
        large
      </button>
    </section>
  );
}

