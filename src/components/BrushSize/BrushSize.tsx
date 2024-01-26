import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hook/reduxHook';
import { changeSize } from '../../reducers/changeSizeSlice';

const BrushSizeContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const SizeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const SizeIcon = styled.div<{ $size: number }>`
  background-color: #ffa7ba;
  border: none;
  border-radius: 50%;
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
`

export default function BrushSize() {
  const dispatch = useAppDispatch();

  const handleSizeClick = (size: number) => {
    dispatch(changeSize(size));
  };

  return (
    <BrushSizeContainer>
      <SizeButton
        onClick={() => handleSizeClick(6)}
      >
        <SizeIcon $size={6}></SizeIcon>
      </SizeButton>
      <SizeButton
        onClick={() => handleSizeClick(11)}
      >
        <SizeIcon $size={11}></SizeIcon>
      </SizeButton>
      <SizeButton
        onClick={() => handleSizeClick(15)}
      >
        <SizeIcon $size={15}></SizeIcon>
      </SizeButton>
    </BrushSizeContainer>
  );
}

