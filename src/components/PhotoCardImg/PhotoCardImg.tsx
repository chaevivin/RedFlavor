import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppSelector } from '../../hook/reduxHook';
import { selectColorValue } from '../../reducers/changeColorSlice';
import { selectPanelValue } from '../../reducers/choosePanelSlice';
import styled from 'styled-components';
import { memberValue } from '../../reducers/memberSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import { fabric } from "fabric";
import { selectSizeValue } from '../../reducers/changeSizeSlice';
import { selectPanel } from '../../reducers/panelSlice';

interface PhotoCardImgProps {
  saveTargetRef: React.MutableRefObject<HTMLElement | null>;
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  backgroundImgRef: React.MutableRefObject<HTMLDivElement | null>;
}

const PhotocardSection = styled.section`
  margin-top: 0.5rem;
  margin-bottom: 2.5rem;
  position: relative;
`

const Container = styled.div`
  position: absolute;
`

const Photocard = styled.canvas`
  width: 315px;
  height: 445.5px;
`

const PhotocardBackground = styled.div<{ $color: string }>`
  width: 315px;
  height: 445.5px;
  background-color: ${p => p.$color};
`

export default function PhotoCardImg({ saveTargetRef, fabricCanvasRef, backgroundImgRef }: PhotoCardImgProps) {
  const nowColor = useAppSelector(selectColorValue);
  const nowSize = useAppSelector(selectSizeValue);
  const nowPanel = useAppSelector(selectPanelValue);
  const openPanel = useAppSelector(selectPanel);

  // 멤버 변경 시 이미지, 배경색 변경
  const storage = new GetImgStorage();
  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const result = await storage.getImages('photocard/photocardMain/members');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (members) {
      storage.preloadImgs(members);
    }
  }, [members]);

  const nowMember = useAppSelector(memberValue);
  const [imgurl, setImgurl] = useState<string | undefined>(members?.[0]);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffa0d4');

  useEffect(() => {
    if (members) {
      switch (nowMember) {
        case 'irene':
          setImgurl(members[0]);
          setBackgroundColor('#ffa0d4');
          break;
        case 'seulgi':
          setImgurl(members[2]);
          setBackgroundColor('#fcf199');
          break;
        case 'wendy':
          setImgurl(members[3]);
          setBackgroundColor('#99c8fc');
          break;
        case 'joy':
          setImgurl(members[1]);
          setBackgroundColor('#aafc99');
          break;
        case 'yeri':
          setImgurl(members[4]);
          setBackgroundColor('#cd99fc');
          break;
      }
    }
  }, [members, nowMember]);

  // const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>();

  // 캔버스 초기화
  useLayoutEffect(() => {
    const newCanvas = new fabric.Canvas('canvas', {
      width: 315,
      height: 445.5,
      backgroundImage: imgurl,
      preserveObjectStacking: true,
    });
    setCanvas(newCanvas);
  }, []);

  // panel이 sticker일 때만 selectable = false
  // 멤버 변경
  useEffect(() => {
    if (canvas && imgurl) {
      fabricCanvasRef.current = canvas;
      canvas.setBackgroundImage(imgurl, canvas.renderAll.bind(canvas), {
        scaleX: 0.3,
        scaleY: 0.3,
        crossOrigin: 'anonymous'
      });

      const objects = canvas.getObjects();
      for (const obj of objects) {
        obj.selectable = openPanel && nowPanel === 'sticker';
        obj.setCoords();
      }
      canvas.renderAll();
    }
  }, [canvas, fabricCanvasRef, imgurl, nowPanel, openPanel]);

  // Brush 패널일때만 drawingMode = true
  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = nowPanel === 'brush';
      canvas.renderAll();
      setCanvas(canvas);
    }
  }, [canvas, nowPanel]);

  // 브러쉬 색, 사이즈 변경
  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.color = nowColor.color;
      canvas.freeDrawingBrush.width = nowSize;
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 10,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: nowColor.outline
      });
      canvas.renderAll();
    }
  }, [canvas, nowColor, nowSize]);


  return (
    <PhotocardSection ref={saveTargetRef}>
      <Container>
        <Photocard id='canvas' />
      </Container>
      <PhotocardBackground $color={backgroundColor} ref={backgroundImgRef}></PhotocardBackground>
    </PhotocardSection>
  );
}

