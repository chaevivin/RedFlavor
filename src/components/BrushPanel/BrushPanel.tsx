import React from 'react';
import BrushType from '../BrushType/BrushType';
import BrushSize from './../BrushSize/BrushSize';
import styled from 'styled-components';
import UndoRedo from '../UndoRedo/UndoRedo';

interface BrushPanelProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const Container = styled.div`
  display: flex;
`

export default function BrushPanel({ fabricCanvasRef }: BrushPanelProps) {
  return (
    <section> 
      <Container>
        <UndoRedo fabricCanvasRef={fabricCanvasRef} />
        <BrushSize />
      </Container>
      <BrushType />
    </section>
  );
}

