import React, { useEffect, useState } from 'react';
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
  height: 100dvh;
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
`

const LoadingImg = styled.img`
  margin-right: 0.8rem;
`

const LoadingDot = styled.img<{ $active: any; $second: string }>`
  margin-right: 0.5rem;
  ${(p) => p.$active && css`
    animation-name: ${upIcon};
    animation-delay: ${p.$second};
    animation-duration: 0.5s;
    animation-timing-function: linear;
  `}
`

export default function Loading() {
  const [loading, setLoading] = useState<string[]>([]);
  const getLoadingImgs = (name: string) => {
    const imgsrc = `https://red-flavor-diary.imgix.net/loading/loading_${name}.png?w=0.28&q=100`;
    if (!loading.includes(imgsrc)) {
      setLoading((prev) => [...prev, imgsrc]);
    }
    return imgsrc;
  };

  const storage = new GetImgStorage();
  useEffect(() => {
    if (loading.length > 0) {
      storage.preloadImgs(loading);
    }
  }, [loading]);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/myroom");
    }, 4500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      {loading &&
        <Background>
          <WaterMelonIcon src={getLoadingImgs('icon1')} $active />
          <PineappleIcon src={getLoadingImgs('icon2')} $active />
          <OrangeIcon src={getLoadingImgs('icon3')} $active />
          <KiwiIcon src={getLoadingImgs('icon4')} $active />
          <GrapeIcon src={getLoadingImgs('icon5')} $active />
          <BookIcon src={getLoadingImgs('diary')} />
          <LoadingContainer>
            <LoadingImg src={getLoadingImgs('text')} />
            <LoadingDot src={getLoadingImgs('dot')} $active $second={'1.5s'} />
            <LoadingDot src={getLoadingImgs('dot')} $active $second={'2.5s'} />
            <LoadingDot src={getLoadingImgs('dot')} $active $second={'3.5s'} />
          </LoadingContainer>
        </Background>
      }
    </>
  );
}

