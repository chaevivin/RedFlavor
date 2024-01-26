import React, { useCallback, useEffect, useState } from 'react';
import { GrUndo, GrRedo } from "react-icons/gr";
import styled, { css } from 'styled-components';
import { fabric } from "fabric";
import { useAppSelector } from '../../hook/reduxHook';
import { selectPanelValue } from '../../reducers/choosePanelSlice';

interface UndoRedoProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const UndoRedoButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: white;
`

export default function UndoRedo({ fabricCanvasRef }: UndoRedoProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [history, setHistory] = useState<fabric.Object[] | undefined>([]);
  const [disabledUndo, setDisabledUndo] = useState(false);
  const [disabledRedo, setDisabledRedo] = useState(false);

  const nowPanel = useAppSelector(selectPanelValue);

  const saveHistory = () => {
    if (!isLocked) {
      setHistory([]);
    }
    setIsLocked(false);
  };

  // panel이 brush일때만 history 저장
  useEffect(() => {
    if (fabricCanvasRef.current) {
      if (nowPanel === 'brush') {
        const canvas = fabricCanvasRef.current;
        canvas.on('object:added', saveHistory);
        canvas.on('object:modified', saveHistory);
        canvas.on('object:removed', saveHistory);
      }
    }
  }, [fabricCanvasRef]);

  // Undo 클릭하면 canvas._object에 있는 마지막 객체 setHistory에 저장
  const handleUndoClick = useCallback(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      if (canvas._objects.length > 0){
        const poppedObject = canvas._objects.pop();
        setHistory((prev: fabric.Object[] | undefined) => {
          if (prev === undefined) {
            return poppedObject ? [poppedObject] : [];
          }
          return poppedObject ? [...prev, poppedObject] : prev;
        });
        canvas.renderAll();
      }
    }
  }, [fabricCanvasRef]);

  // Redo 클릭하면 history state의 마지막 canvas에 추가
  const handleRedoClick = useCallback(() => {
    if (fabricCanvasRef.current && history) {
      const canvas = fabricCanvasRef.current;
      if (history.length > 0) {
        setIsLocked(true);
        canvas.add(history[history.length - 1]);
        const newHistory = history.slice(0, -1);
        setHistory(newHistory);
      }
    }
  }, [fabricCanvasRef, history]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      if (canvas._objects.length === 0) setDisabledUndo(true); 
      else setDisabledUndo(false);

      if (history?.length === 0) setDisabledRedo(true);
      else setDisabledRedo(false);
    }
  }, [fabricCanvasRef, history]);

  return (
    <div>
      <UndoRedoButton
        onClick={() => handleUndoClick()}
      >
        <GrUndo  
          stroke={disabledUndo ? 'gray' : 'pink'}
          strokeWidth='1.5rem'
        />
      </UndoRedoButton>
      <UndoRedoButton
        onClick={() => handleRedoClick()}
      >
        <GrRedo 
          stroke={disabledRedo ? 'gray' : 'pink'}
          strokeWidth='1.5rem'
        />
      </UndoRedoButton>
    </div>
  );
}

