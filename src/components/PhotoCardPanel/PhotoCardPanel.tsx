import React from 'react';
import styles from './PhotoCardPanel.module.css';
import PanelButtons from '../PanelButtons/PanelButtons';
import { useAppSelector } from '../../hook/reduxHook';
import { selectPanelValue } from '../../reducers/choosePanelSlice';
import MemberPanel from '../MemberPanel/MemberPanel';
import FramePanel from '../FramePanel/FramePanel';
import StickerPanel from '../StickerPanel/StickerPanel';
import BrushPanel from '../BrushPanel/BrushPanel';
import ErrorPage from '../../pages/ErrorPage';

interface PhotoCardPanelProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

export default function PhotoCardPanel({ fabricCanvasRef }: PhotoCardPanelProps) {
  const panel = useAppSelector(selectPanelValue);

  return (
    <section>
      <PanelButtons />
      {panel && (() => {
        switch (panel) {
          case 'member':
            return <MemberPanel />;
          case 'frame':
            return <FramePanel />;
          case 'sticker':
            return <StickerPanel fabricCanvasRef={fabricCanvasRef} />;
          case 'brush':
            return <BrushPanel />;
          default:
            return <ErrorPage />;
        }
      })()}
    </section>
  );
}

