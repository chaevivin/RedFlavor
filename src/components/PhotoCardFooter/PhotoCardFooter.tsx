import React from 'react';
import { useAppDispatch } from '../../hook/reduxHook';
import { showExample } from '../../reducers/exampleSlice';
import { openPanel } from '../../reducers/panelSlice';
import styled from 'styled-components';
import { PiSmileySticker } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";

interface PhotoCardFooterProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  width: 315px;
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
  font-size: 1.1rem;
  line-height: 2.5rem;
  cursor: pointer;
`

export default function PhotoCardFooter({ fabricCanvasRef }: PhotoCardFooterProps) {
  const dispatch = useAppDispatch();

  const handlePanelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(openPanel());
  };

  const handleExampleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(showExample());
  };

  const handleResetClick = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      // background img는 빼고 삭제
      canvas.remove(...canvas.getObjects().concat());
      canvas.renderAll();
    }
  };

  return (
    <Footer>
      <Container>
        <Button
          onClick={(e) => handlePanelClick(e)}
        >
          
          <PiSmileySticker color='#ffa7ba' size='1.5rem' />
          꾸미기
        </Button>
        <Button
          onClick={(e) => handleExampleClick(e)}
        >
          <IoSearchOutline color='#ffa7ba' size='1.5rem' />
          예시
        </Button>
      </Container>
      <Button
        onClick={() => handleResetClick()}
      >
        <GrPowerReset color='#ffa7ba' size='1.6rem' />
        초기화
      </Button>
    </Footer>
  );
}

