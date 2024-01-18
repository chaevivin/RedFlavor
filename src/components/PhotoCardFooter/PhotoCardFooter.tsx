import React from 'react';
import { useAppDispatch } from '../../hook/reduxHook';
import { showExample } from '../../reducers/exampleSlice';
import { openPanel } from '../../reducers/panelSlice';
import styled from 'styled-components';
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";

interface PhotoCardFooterProps {
  clearCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  width: calc(1081px / 3);
`

const Container = styled.div`
  display: flex;
`

const Button = styled.button`
  font-family: "소야꼬마9";
  color: #fef4f6;
  text-shadow: -1.5px 0 #ffa7ba, 0 1.5px #ffa7ba, 1.5px 0 #ffa7ba, 0 -1.5px #ffa7ba;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 2rem;
  cursor: pointer;
`

const clearCanvas = (canvas: fabric.Canvas) => {
  // const context = canvas.getContext('2d');

  // if (context) {
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  // }
};

export default function PhotoCardFooter({ clearCanvasRef }: PhotoCardFooterProps) {
  const dispatch = useAppDispatch();

  const handlePanelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(openPanel());
  };

  const handleExampleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(showExample());
  };

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const canvas = clearCanvasRef.current;

    if (canvas) {
      clearCanvas(canvas);
    }
  };

  return (
    <Footer>
      <Container>
        <Button
          onClick={(e) => handlePanelClick(e)}
        >
          <RiEmojiStickerLine color='#ffa7ba' size='1.4rem'/>
          꾸미기
        </Button>
        <Button
          onClick={(e) => handleExampleClick(e)}
        >
          <IoSearchOutline color='#ffa7ba' size='1.4rem' />
          예시
        </Button>
      </Container>
      <Button
        onClick={(e) => handleResetClick(e)}
      >
        <GrPowerReset color='#ffa7ba' size='1.4rem' />
        초기화
      </Button>
    </Footer>
  );
}

