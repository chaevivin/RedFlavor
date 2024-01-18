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
  left: 43%;
  top: 26%;
  ${(p) => p.$active && css`
    animation: ${upIcon} 1s linear(0 0%, 0 2.27%, 0.02 4.53%, 0.04 6.8%, 0.06 9.07%, 0.1 11.33%, 0.14 13.6%, 0.25 18.15%, 0.39 22.7%, 0.56 27.25%, 0.77 31.8%, 1 36.35%, 0.89 40.9%, 0.85 43.18%, 0.81 45.45%, 0.79 47.72%, 0.77 50%, 0.75 52.27%, 0.75 54.55%, 0.75 56.82%, 0.77 59.1%, 0.79 61.38%, 0.81 63.65%, 0.85 65.93%, 0.89 68.2%, 1 72.7%, 0.97 74.98%, 0.95 77.25%, 0.94 79.53%, 0.94 81.8%, 0.94 84.08%, 0.95 86.35%, 0.97 88.63%, 1 90.9%, 0.99 93.18%, 0.98 95.45%, 0.99 97.73%, 1 100%) 2s ;
  `}
`

const PineappleIcon = styled.img<{ $active: any }>`
  width: calc(100% / 20);
  position: absolute;
  right: 43.8%;
  top: 29.5%;
  ${(p) => p.$active && css`
    animation: ${upIcon} 1s linear(0 0%, 0 2.27%, 0.02 4.53%, 0.04 6.8%, 0.06 9.07%, 0.1 11.33%, 0.14 13.6%, 0.25 18.15%, 0.39 22.7%, 0.56 27.25%, 0.77 31.8%, 1 36.35%, 0.89 40.9%, 0.85 43.18%, 0.81 45.45%, 0.79 47.72%, 0.77 50%, 0.75 52.27%, 0.75 54.55%, 0.75 56.82%, 0.77 59.1%, 0.79 61.38%, 0.81 63.65%, 0.85 65.93%, 0.89 68.2%, 1 72.7%, 0.97 74.98%, 0.95 77.25%, 0.94 79.53%, 0.94 81.8%, 0.94 84.08%, 0.95 86.35%, 0.97 88.63%, 1 90.9%, 0.99 93.18%, 0.98 95.45%, 0.99 97.73%, 1 100%) 3s;
  `}
`

const OrangeIcon = styled.img<{ $active: any }>`
  width: calc(100% / 19);
  position: absolute;
  left: 43%;
  top: 33%;
  ${(p) => p.$active && css`
    animation: ${upIcon} 1s linear(0 0%, 0 2.27%, 0.02 4.53%, 0.04 6.8%, 0.06 9.07%, 0.1 11.33%, 0.14 13.6%, 0.25 18.15%, 0.39 22.7%, 0.56 27.25%, 0.77 31.8%, 1 36.35%, 0.89 40.9%, 0.85 43.18%, 0.81 45.45%, 0.79 47.72%, 0.77 50%, 0.75 52.27%, 0.75 54.55%, 0.75 56.82%, 0.77 59.1%, 0.79 61.38%, 0.81 63.65%, 0.85 65.93%, 0.89 68.2%, 1 72.7%, 0.97 74.98%, 0.95 77.25%, 0.94 79.53%, 0.94 81.8%, 0.94 84.08%, 0.95 86.35%, 0.97 88.63%, 1 90.9%, 0.99 93.18%, 0.98 95.45%, 0.99 97.73%, 1 100%) 4s;
  `}
`

const KiwiIcon = styled.img<{ $active: any }>`
  width: calc(100% / 19);
  position: absolute;
  right: 43.8%;
  top: 36.5%;
  ${(p) => p.$active && css`
    animation: ${upIcon} 1s linear(0 0%, 0 2.27%, 0.02 4.53%, 0.04 6.8%, 0.06 9.07%, 0.1 11.33%, 0.14 13.6%, 0.25 18.15%, 0.39 22.7%, 0.56 27.25%, 0.77 31.8%, 1 36.35%, 0.89 40.9%, 0.85 43.18%, 0.81 45.45%, 0.79 47.72%, 0.77 50%, 0.75 52.27%, 0.75 54.55%, 0.75 56.82%, 0.77 59.1%, 0.79 61.38%, 0.81 63.65%, 0.85 65.93%, 0.89 68.2%, 1 72.7%, 0.97 74.98%, 0.95 77.25%, 0.94 79.53%, 0.94 81.8%, 0.94 84.08%, 0.95 86.35%, 0.97 88.63%, 1 90.9%, 0.99 93.18%, 0.98 95.45%, 0.99 97.73%, 1 100%) 5s;
  `}
`

const GrapeIcon = styled.img<{ $active: any }>`
  width: calc(100% / 19);
  position: absolute;
  left: 43%;
  top: 40%;
  ${(p) => p.$active && css`
    animation: ${upIcon} 1s linear(0 0%, 0 2.27%, 0.02 4.53%, 0.04 6.8%, 0.06 9.07%, 0.1 11.33%, 0.14 13.6%, 0.25 18.15%, 0.39 22.7%, 0.56 27.25%, 0.77 31.8%, 1 36.35%, 0.89 40.9%, 0.85 43.18%, 0.81 45.45%, 0.79 47.72%, 0.77 50%, 0.75 52.27%, 0.75 54.55%, 0.75 56.82%, 0.77 59.1%, 0.79 61.38%, 0.81 63.65%, 0.85 65.93%, 0.89 68.2%, 1 72.7%, 0.97 74.98%, 0.95 77.25%, 0.94 79.53%, 0.94 81.8%, 0.94 84.08%, 0.95 86.35%, 0.97 88.63%, 1 90.9%, 0.99 93.18%, 0.98 95.45%, 0.99 97.73%, 1 100%) 6s;
  `}
`

const BookIcon = styled.img`
  width: calc(100% / 4.5);
  margin: 1rem;
`

const LoadingImg = styled.img`
  width: calc(100% / 2.3);
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

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/myroom");
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const preloadImages = async () => {
    await Promise.all(
      loading?.map(
        (url) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = url;
            image.onload = resolve;
          })
      ) || []
    );
  };

  useEffect(() => {
    if (loading) {
      preloadImages();
    }
  }, [loading]);

  return (
    <>
      {loading &&
        <Background>
          <WaterMelonIcon src={loading[1]} $active />
          <PineappleIcon src={loading[2]} $active />
          <OrangeIcon src={loading[3]} $active />
          <KiwiIcon src={loading[4]} $active />
          <GrapeIcon src={loading[5]} $active />
          <BookIcon src={loading[0]} />
          <LoadingImg src={loading[6]} />
        </Background>
      }
    </>
  );
}
