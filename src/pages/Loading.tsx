import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import GetImgStorage from '../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const upIcon = keyframes`
  0% {
    transform: translate(0, -1rem);
  }

  100% {
    transform: translate(0);
  }
`

const Background = styled.section`
  background-color: #fff3f9;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const WaterMelonIcon = styled.img<{ $active: any }>`
  width: calc(100% / 19);
  position: absolute;
  left: 44%;
  top: 30%;
  ${(p) => p.$active && css`
    animation-name: ${upIcon};
    animation-delay: 1s;
    animation-duration: 0.5s;
    animation-timing-function: linear;
  `}
`

const PineappleIcon = styled.img<{ $active: any }>`
  width: calc(100% / 20);
  position: absolute;
  right: 42%;
  top: 34%;
  ${(p) => p.$active && css`
    animation-name: ${upIcon};
    animation-delay: 1.5s;
    animation-duration: 0.5s;
    animation-timing-function: linear;
  `}
`

const OrangeIcon = styled.img<{ $active: any }>`
  width: calc(100% / 19);
  position: absolute;
  left: 44%;
  top: 38%;
  ${(p) => p.$active && css`
    animation-name: ${upIcon};
    animation-delay: 2s;
    animation-duration: 0.5s;
    animation-timing-function: linear;
  `}
`

const KiwiIcon = styled.img<{ $active: any }>`
  width: calc(100% / 19);
  position: absolute;
  right: 42%;
  top: 41.8%;
  ${(p) => p.$active && css`
    animation-name: ${upIcon};
    animation-delay: 2.5s;
    animation-duration: 0.5s;
    animation-timing-function: linear;
  `}
`

const GrapeIcon = styled.img<{ $active: any }>`
  width: calc(100% / 19);
  position: absolute;
  left: 44%;
  top: 45%;
  ${(p) => p.$active && css`
    animation-name: ${upIcon};
    animation-delay: 3s;
    animation-duration: 0.5s;
    animation-timing-function: linear;
  `}
`

const BookIcon = styled.img`
  width: calc(100% / 4.5);
  margin: 1rem;
  position: absolute;
  top: 47%;
  left: 36%;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 62.5%;
  left: 5%;
`

const LoadingImg = styled.img`
  width: calc(100% / 4);
  margin-right: 0.8rem;
`

const LoadingDot = styled.img<{ $active: any; $second: string }>`
  width: calc(100% / 38);
  margin-right: 0.5rem;
  ${(p) => p.$active && css`
    animation-name: ${upIcon};
    animation-delay: ${p.$second};
    animation-duration: 0.5s;
    animation-timing-function: linear;
  `}
`

export default function Loading() {
  const storage = new GetImgStorage();
  const { data: loading } = useQuery({
    queryKey: ['loading'],
    queryFn: async () => {
      const result = await storage.getImages('loading');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (loading) {
      storage.preloadImgs(loading);
    }
  }, [loading]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/myroom");
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <>
      {loading &&
        <Background>
          <WaterMelonIcon src={loading[2]} $active />
          <PineappleIcon src={loading[3]} $active />
          <OrangeIcon src={loading[4]} $active />
          <KiwiIcon src={loading[5]} $active />
          <GrapeIcon src={loading[6]} $active />
          <BookIcon src={loading[0]} />
          <LoadingContainer>
            <LoadingImg src={loading[7]} />
            <LoadingDot src={loading[1]} $active $second={'2s'} />
            <LoadingDot src={loading[1]} $active $second={'3s'} />
            <LoadingDot src={loading[1]} $active $second={'4s'} />
          </LoadingContainer>
        </Background>
      }
    </>
  );
}

