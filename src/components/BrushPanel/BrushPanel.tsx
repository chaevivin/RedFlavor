import React from 'react';
import BrushType from '../BrushType/BrushType';
import EraserType from '../EraserType/EraserType';
import { useAppDispatch } from '../../hook/reduxHook';
import { brushType } from '../../reducers/brushTypeSlice';
import { startEdit } from '../../reducers/isEditableSlice';

export default function BrushPanel() {
  const dispatch = useAppDispatch();

  const handleBrushTypeClick = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault();
    dispatch(brushType(type));
    dispatch(startEdit());
  };
  

  return (
    <section> 
      <button
        onClick={(e) => handleBrushTypeClick(e, 'brush')}
      >
        브러쉬
      </button>
      <button
        onClick={(e) => handleBrushTypeClick(e, 'eraser')}
      >
        지우개
      </button>
      <BrushType />
      <EraserType />
    </section>
  );
}

