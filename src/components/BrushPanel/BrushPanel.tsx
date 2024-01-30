import React from 'react';
import BrushType from '../BrushType/BrushType';
import styled from 'styled-components';
import UndoRedo from '../UndoRedo/UndoRedo';
import BrushSize from '../BrushSize/BrushSize';

interface BrushPanelProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const BrushSection= styled.section`
  height: 150px;
  width: 230px;
`

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0.9rem 0 0.5rem 0;
`

export default function BrushPanel({ fabricCanvasRef }: BrushPanelProps) {
  return (
    <BrushSection> 
      <Container>
        <UndoRedo fabricCanvasRef={fabricCanvasRef} />
        <BrushSize />
      </Container>
      <BrushType />
    </BrushSection>
  );
}

