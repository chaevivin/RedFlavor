import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hook/reduxHook';
import { selectColorValue } from '../../reducers/changeColorSlice';
import { selectBrushTypeValue } from '../../reducers/brushTypeSlice';
import { selectEraserValue } from '../../reducers/changeEraserSlice';
import { selectPanelValue } from '../../reducers/choosePanelSlice';
import styled from 'styled-components';
import { memberValue } from '../../reducers/memberSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import { fabric } from "fabric";

interface PhotoCardImgProps {
  saveTargetRef: React.MutableRefObject<HTMLElement | null>;
  clearCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const PhotocardSection = styled.section`
  margin-bottom: 1.5rem;
`

const Photocard = styled.canvas`
  width: calc(1081px / 3);
  height: calc(1667px / 3);
`

export default function PhotoCardImg({ saveTargetRef, clearCanvasRef, fabricCanvasRef }: PhotoCardImgProps) {
  const nowColor = useAppSelector(selectColorValue);
  const nowBrush = useAppSelector(selectBrushTypeValue);
  const nowSize = useAppSelector(selectEraserValue);
  const panel = useAppSelector(selectPanelValue);

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
      height: 555,
      width: 360,
      backgroundColor: backgroundColor,
      backgroundImage: imgurl,
    });

    setCanvas(newCanvas);
  }, []);

  // Brush 패널일때만 drawingMode = true
  useEffect(() => {
    if (canvas) {
      if (panel === 'brush') {
        canvas.isDrawingMode = true;
        canvas.renderAll();
        setCanvas(canvas);
      } else {
        canvas.isDrawingMode = false;
        canvas.renderAll();
        setCanvas(canvas);
      }
    }
  }, [canvas, panel])

  // 캔버스 배경색, 배경 이미지 변경
  useEffect(() => {
    if (canvas && imgurl) {
      canvas.setBackgroundColor(backgroundColor, canvas.renderAll.bind(canvas));
      canvas.setBackgroundImage(imgurl, canvas.renderAll.bind(canvas), {
        scaleX: 0.35,
        scaleY: 0.35
      });
    }
  }, [backgroundColor, canvas, imgurl]);

  // 브러쉬 색 변경
  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.color = nowColor;
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

  // const setRefs = (el: HTMLCanvasElement | fabric.Canvas) => {
  //   saveTargetRef.current = el;
  //   canvasRef.current = el;
  // };

  return (
    <PhotocardSection>
      <Photocard id='canvas' />
    </PhotocardSection>
  );
}

