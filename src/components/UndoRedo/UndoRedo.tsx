import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { fabric } from "fabric";
import { useAppSelector } from '../../hook/reduxHook';
import { selectPanelValue } from '../../reducers/choosePanelSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';

interface UndoRedoProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const UndoRedoContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
`

const UndoRedoButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: black;
`

const UndoRedoIcon = styled.img<{ $redo: boolean }>`
  width: 1rem;
  
  ${p => 
    p.$redo &&
      css`
        transform: scaleX(-1);
      `
  }
`


export default function UndoRedo({ fabricCanvasRef }: UndoRedoProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [history, setHistory] = useState<fabric.Object[] | undefined>([]);
  const [disabledUndo, setDisabledUndo] = useState(false);
  const [disabledRedo, setDisabledRedo] = useState(false);

  const nowPanel = useAppSelector(selectPanelValue);

  const storage = new GetImgStorage();
  const { data: undoRedoButtons } = useQuery({
    queryKey: ['undoRedoButtons'],
    queryFn: async () => {
      const result = await storage.getImages('photocard/photocardDetail/undoRedo');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60
  });

  useEffect(() => {
    if (undoRedoButtons) {
      storage.preloadImgs(undoRedoButtons);
    }
  }, [undoRedoButtons]);

  const saveHistory = () => {
    if (!isLocked) {
      setHistory([]);
    }
    setIsLocked(false);
  };

  // panel이 brush일때만 history 저장
  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      canvas.on('object:added', saveHistory);
      canvas.on('object:modified', saveHistory);
      canvas.on('object:removed', saveHistory);
    }
  }, [fabricCanvasRef]);

  // Undo 클릭하면 canvas._object에 있는 마지막 객체 setHistory에 저장
  const handleUndoClick = () => {
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
  };

  // Redo 클릭하면 history state의 마지막 canvas에 추가
  const handleRedoClick = () => {
    if (fabricCanvasRef.current && history) {
      const canvas = fabricCanvasRef.current;
      if (history.length > 0) {
        setIsLocked(true);
        canvas.add(history[history.length - 1]);
        const newHistory = history.slice(0, -1);
        setHistory(newHistory);
      }
    }
  };

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
    <>
      {undoRedoButtons &&
        <UndoRedoContainer>
          <UndoRedoButton
            onClick={() => handleUndoClick()}
          >
            <UndoRedoIcon src={disabledUndo ? undoRedoButtons[1] : undoRedoButtons[0]} $redo={false} />
          </UndoRedoButton>
          <UndoRedoButton
            onClick={() => handleRedoClick()}
          >
            <UndoRedoIcon src={disabledRedo ? undoRedoButtons[1] : undoRedoButtons[0]} $redo={true} />
          </UndoRedoButton>
        </UndoRedoContainer>
      }
    </>
  );
}

