import React, { useCallback, useEffect, useState } from 'react';
import { GrUndo, GrRedo } from "react-icons/gr";
import styled from 'styled-components';
import { fabric } from "fabric";

interface UndoRedoProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const UndoRedoButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
`

export default function UndoRedo({ fabricCanvasRef }: UndoRedoProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [history, setHistory] = useState<fabric.Object[] | undefined>([]);

  const saveHistory = () => {
    if (!isLocked) {
      setHistory([]);
    }
    setIsLocked(false);
  };

  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      canvas.on('object:added', saveHistory);
      canvas.on('object:modified', saveHistory);
      canvas.on('object:removed', saveHistory);
    }
  }, [fabricCanvasRef]);

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
  }, [fabricCanvasRef, history]);

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

  return (
    <div>
      <UndoRedoButton
        onClick={() => handleUndoClick()}
      >
        <GrUndo />
      </UndoRedoButton>
      <UndoRedoButton
        onClick={() => handleRedoClick()}
      >
        <GrRedo />
      </UndoRedoButton>
    </div>
  );
}

