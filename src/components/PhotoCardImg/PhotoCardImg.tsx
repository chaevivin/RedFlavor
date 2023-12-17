import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fabric } from "fabric";
import { useAppSelector } from '../../hook/reduxHook';
import { selectColorValue } from '../../reducers/changeColorSlice';

export default function PhotoCardImg() {
  const nowColor = useAppSelector(selectColorValue);
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [brushColor, setBrushColor] = useState<string>(nowColor);

  useLayoutEffect(() => {
    canvasRef.current = initCanvas();
    canvasRef.current.freeDrawingBrush.color = brushColor;

    return () => {
      // 캔버스 요소 지우고 모든 이벤트 리스너 제거
      if (canvasRef.current) {
        canvasRef.current.dispose();
      }
    };
  }, []);

  const initCanvas = () => (
    canvasRef.current = new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      isDrawingMode: true,
      backgroundImage: '/img/joy.png',
    })
  );

  // useEffect(() => {
  //   if (canvas) {
  //     const brush = canvas.freeDrawingBrush;
  //     brush.color = nowColor;
  //     brush.width = 5;
  //     brush.shadow = new fabric.Shadow({
  //       blur: 10,
  //       offsetX: 0,
  //       offsetY: 0,
  //       affectStroke: true,
  //       color: nowColor
  //     });
  //   }
  // }, [nowColor, canvas]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.freeDrawingBrush.color = brushColor;
    }
  }, [brushColor]);

  useEffect(() => {
    setBrushColor(nowColor);
  }, [nowColor]);
  
  return (
    <section>
      <canvas id='canvas' />
    </section>
  );
}

