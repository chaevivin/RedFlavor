import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hook/reduxHook';
import { selectColorValue } from '../../reducers/changeColorSlice';
import { selectBrushTypeValue } from '../../reducers/brushTypeSlice';
import { selectEraserValue } from '../../reducers/changeEraserSlice';
import styles from './PhotoCardImg.module.css';

interface Coordinate {
  x: number;
  y: number;
}

export default function PhotoCardImg() {
  const nowColor = useAppSelector(selectColorValue);
  const nowBrush = useAppSelector(selectBrushTypeValue);
  const nowSize = useAppSelector(selectEraserValue);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState<Coordinate | undefined>(undefined);
  const [isDrawing, setDrawing] = useState<boolean>(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const getCoordinates = (e: MouseEvent): Coordinate | undefined => {   
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop
    };
  };

  const drawLine = (originalPosition: Coordinate, newPosition: Coordinate) => {
    if (!canvasRef.current) return;

    if (ctx) {
      ctx.globalCompositeOperation = nowBrush === 'brush' ? 'lighter' : 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = nowSize;
      ctx.strokeStyle = nowColor;

      ctx.shadowBlur = 5;
      ctx.shadowColor = nowColor;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.beginPath();
      ctx.moveTo(originalPosition.x, originalPosition.y);
      ctx.lineTo(newPosition.x, newPosition.y);
      ctx.closePath();

      ctx.stroke();
    }
  };

  const startDraw = useCallback((e: MouseEvent) => {
    const coordinates = getCoordinates(e);
    if (coordinates) {
      setDrawing(true);
      setPosition(coordinates);
    }
  }, []);

  const draw = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDrawing) {
      const newPosition = getCoordinates(e);
      if (position && newPosition) {
        drawLine(position, newPosition);
        setPosition(newPosition);
      }
    }
  }, [isDrawing, position]);

  const stopDraw = useCallback(() => {
    setDrawing(false);
  }, []);

  // mobile
  const startTouch = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    
    canvas.dispatchEvent(mouseEvent);
  }, []);

  const touch = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });

    canvas.dispatchEvent(mouseEvent);
  }, []);

  const stopTouch = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    setCtx(canvas.getContext('2d'));

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);

    canvas.addEventListener('touchstart', startTouch);
    canvas.addEventListener('touchmove', touch);
    canvas.addEventListener('touchend', stopTouch);

    return () => {
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDraw);
      canvas.addEventListener('mouseleave', stopDraw);

      canvas.removeEventListener('touchstart', startTouch);
      canvas.removeEventListener('touchmove', touch);
      canvas.removeEventListener('touchend', stopTouch);
    };
  }, [draw, startDraw, startTouch, stopDraw, stopTouch, touch]);

  // 지우개
  useEffect(() => {
    if (!canvasRef.current || !ctx) return;

    if (nowBrush === 'eraser') ctx.globalCompositeOperation = "destination-out";
    if (nowBrush === 'brush') ctx.globalCompositeOperation = "lighter";

  }, [nowBrush]);

  // 브러쉬 사이즈 변경
  useEffect(() => {
    if (!canvasRef.current || !ctx) return;
    ctx.lineWidth = nowSize;
  }, [nowSize, ctx]);

  // 브러쉬 색 변경
  useEffect(() => {
    if (!canvasRef.current || !ctx) return;
    ctx.strokeStyle = nowColor;
  }, [nowColor, ctx]);

  // const initCanvas = () => (
  //   canvasRef.current = new fabric.Canvas('canvas', {
  //     height: 500,
  //     width: 500,
  //     isDrawingMode: true,
  //     backgroundImage: '/img/joy.png',
  //   })
  // );

  return (
    <section>
      <canvas ref={canvasRef} width={500} height={500} className={styles.canvas} />
    </section>
  );
}

