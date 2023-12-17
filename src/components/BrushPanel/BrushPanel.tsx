import React from 'react';
import { useAppDispatch } from '../../hook/reduxHook';
import { changeColor } from '../../reducers/changeColorSlice';

export default function BrushPanel() {
  const dispatch = useAppDispatch();

  const handleColorClick = (e: React.MouseEvent<HTMLButtonElement>, color: string) => {
    e.preventDefault();
    dispatch(changeColor(color));
  };

  return (
    <section>
      <button
        onClick={(e) => handleColorClick(e, 'green')}
      >
        green
      </button>
      <button
        onClick={(e) => handleColorClick(e, 'pink')}
      >
        pink
      </button>
      <button
        onClick={(e) => handleColorClick(e, 'orange')}
      >
        orange
      </button>
    </section>
  );
}

