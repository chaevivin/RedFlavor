import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';
import PhotoCardFooter from '../components/PhotoCardFooter/PhotoCardFooter';
import { useAppSelector } from '../hook/reduxHook';
import { selectExample } from '../reducers/exampleSlice';
import PhotoCardExample from '../components/PhotoCardExample/PhotoCardExample';
import { selectPanel } from '../reducers/panelSlice';
import PhotoCardPanel from '../components/PhotoCardPanel/PhotoCardPanel';
import PhotoCardImg from '../components/PhotoCardImg/PhotoCardImg';
import PhotoCardSave from '../components/PhotoCardSave/PhotoCardSave';
import styled, { css } from 'styled-components';
import GetImgStorage from '../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';

const Background = styled.section<{ $open: boolean }>`
  background-color: #fbf8f8;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${(p) =>
    p.$open &&
    css`
      background-color: black;
    `
  }
`

const Container = styled.div`
  display: flex;
  width: calc(1081px / 3);
  justify-content: space-around;
  margin-bottom: 1.8rem;
`

const TitleImg = styled.img`
  width: calc(465px / 3);
`

export default function PhotoCard() {
  const navigate = useNavigate();
  const showExample = useAppSelector(selectExample);
  const openPanel = useAppSelector(selectPanel);

  const saveTargetRef = useRef<HTMLElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const backgroundImgRef = useRef<HTMLDivElement | null>(null);

  const storage = new GetImgStorage();
  const { data: photocardTitle } = useQuery({
    queryKey: ['photocardTitle'],
    queryFn: async () => {
      const result = await storage.getImages('photocard/photocardMain/title');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (photocardTitle) {
      storage.preloadImgs(photocardTitle);
    }
  }, [photocardTitle]);

  return (
    <>
      {photocardTitle &&
        <Background $open={openPanel}>
          {openPanel || (
            <Container>
              <Back navigate={navigate} color='#c4b5b5' />
              <TitleImg src={photocardTitle[0]} alt='photocard title' />
              <PhotoCardSave saveTargetRef={saveTargetRef} />
            </Container>
          )}
          <PhotoCardImg 
            saveTargetRef={saveTargetRef} 
            fabricCanvasRef={fabricCanvasRef}
            backgroundImgRef={backgroundImgRef}
          />
          {showExample && <PhotoCardExample />}
          {openPanel || <PhotoCardFooter fabricCanvasRef={fabricCanvasRef} />}
          {openPanel && <PhotoCardPanel 
            fabricCanvasRef={fabricCanvasRef} 
            backgroundImgRef={backgroundImgRef} />
          }
        </Background>
      }
    </>
  );
}

