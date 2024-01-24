import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hook/reduxHook';
import { selectColorValue } from '../../reducers/changeColorSlice';
import { selectBrushTypeValue } from '../../reducers/brushTypeSlice';
import { selectEraserValue } from '../../reducers/changeEraserSlice';
import { selectPanelValue } from '../../reducers/choosePanelSlice';
import styled, { css } from 'styled-components';
import { memberValue } from '../../reducers/memberSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import { fabric } from "fabric";
import { selectPanel } from '../../reducers/panelSlice';

interface PhotoCardImgProps {
  saveTargetRef: React.MutableRefObject<HTMLElement | null>;
  clearCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  backgroundImgRef: React.MutableRefObject<HTMLDivElement | null>;
}

const PhotocardSection = styled.section`
  margin-bottom: 0.7rem;
  position: relative;
`

const Container = styled.div`
  position: absolute;
`

const Photocard = styled.canvas<{ $open: boolean }>`
  width: 360px;
  height: 555px;

  ${p => 
    p.$open &&
    css`
      width: 321px;
      height: 495px;
    `
  }
`

const PhotocardBackground = styled.div<{ $open: boolean; $color: string }>`
  width: 360px;
  height: 555px;
  background-color: ${p => p.$color};

  ${p => 
    p.$open &&
    css`
      width: 321px;
      height: 495px;
    `
  }
`

export default function PhotoCardImg({ saveTargetRef, clearCanvasRef, fabricCanvasRef, backgroundImgRef }: PhotoCardImgProps) {
  const nowColor = useAppSelector(selectColorValue);
  const nowBrush = useAppSelector(selectBrushTypeValue);
  const nowSize = useAppSelector(selectEraserValue);
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
  const [brushColor, setBrushColor] = useState<string>('#ffffff');
  const [canvas, setCanvas] = useState<fabric.Canvas | null>();

  // 캔버스 초기화
  useLayoutEffect(() => {
    const newCanvas = new fabric.Canvas('canvas', {
      backgroundImage: imgurl,
    });
    setCanvas(newCanvas);
  }, []);

  // panel이 sticker일 때만 selectable = false
  // 다은이가 사진 주면 나머지 다 삭제하기
  useEffect(() => {
    if (canvas && imgurl) {
      if (openPanel || nowPanel !== 'sticker') {
        fabricCanvasRef.current = canvas;
        canvas.setDimensions({ width: 321, height: 495 }); 
        const objects = canvas.getObjects();
        for (const i in objects) {
          objects[i].scaleX = 0.335;
          objects[i].scaleY = 0.335;
          objects[i].selectable = true;
          objects[i].setCoords();
        }
        canvas.setBackgroundImage(imgurl, canvas.renderAll.bind(canvas), {
          scaleX: 0.3,
          scaleY: 0.3
        });
        canvas.renderAll();
      } else {
        canvas.setDimensions({ width: 360, height: 555 });
        const objects = canvas.getObjects();
        for (const i in objects) {
          objects[i].set({
            scaleX: 0.38,
            scaleY: 0.38,
            selectable: false
          });
          objects[i].setCoords();
        }
        // canvas.setBackgroundColor(backgroundColor, canvas.renderAll.bind(canvas));
        canvas.setBackgroundImage(imgurl, canvas.renderAll.bind(canvas), {
          scaleX: 0.335,
          scaleY: 0.335
        });
        canvas.renderAll();
      }
    }
  }, [canvas, imgurl, nowPanel, openPanel]);

  // Brush 패널일때만 drawingMode = true
  useEffect(() => {
    if (canvas) {
      if (nowPanel === 'brush') {
        canvas.isDrawingMode = true;
        canvas.renderAll();
        setCanvas(canvas);
      } else {
        canvas.isDrawingMode = false;
        canvas.renderAll();
        setCanvas(canvas);
      }
    }
  }, [canvas, nowPanel]);

  // 브러쉬 색 변경
  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.color = nowColor;
      canvas.freeDrawingBrush.width = 10;
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 10,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: nowColor
      });
      canvas.renderAll();
    }
  }, [canvas, nowColor]);


  return (
    <PhotocardSection>
      <Container>
        <Photocard id='canvas' $open={openPanel} />
      </Container>
      <PhotocardBackground $open={openPanel} $color={backgroundColor} ref={backgroundImgRef}></PhotocardBackground>
    </PhotocardSection>
  );
}

