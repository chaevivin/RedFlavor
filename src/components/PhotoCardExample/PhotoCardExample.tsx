import React from 'react';
import { useAppDispatch } from '../../hook/reduxHook';
import { closeExample } from '../../reducers/exampleSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const Background = styled.section`
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  width: 100vw;
  height: 100vh;
`

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CloseButton = styled.button<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: calc(55px / 3);
  height: calc(55px / 3);
  transform: translate(170px, 0);
  margin-bottom: 0.5rem;
`

const ExampleImg = styled.img`
  width: calc(964px / 3);
`

export default function PhotoCardExample() {
  const dispatch = useAppDispatch();

  const handleXClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closeExample());
  };

  const storage = new GetImgStorage();
  const { data: example } = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      const result = await storage.getImages('photocard/photocardMain/example');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  return (
    <>
      {example &&
        <Background>
          <Container>
            <CloseButton
              onClick={(e) => handleXClick(e)}
              $imgurl={example[1]}
            />
            <ExampleImg src={example[0]} alt="photocard example" />
          </Container>
      </Background>
      }
    </>
  );
}

