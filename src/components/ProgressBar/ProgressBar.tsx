import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../hook/reduxHook';
import { musicValue } from '../../reducers/musicSlice';
import { nowValue } from '../../reducers/nowPlayingSlice';
import styled from 'styled-components';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';

const Background = styled.div<{ $imgurl: string | undefined }>`
  
background-image: url(${p => p.$imgurl});
  background-size: contain;
  width: calc(767px / 3);
  height: calc(39px / 3);
  position: relative;
`

const Now = styled.div<{ $imgurl: string | undefined; $progress: number }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  left: calc(${p => p.$progress}%);
  width: calc(88px / 3);
  height: calc(39px / 3);
  transition: left 1s linear;
  position: absolute;
`

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const music = useAppSelector(musicValue);
  const now = useAppSelector(nowValue);

  const storage = new GetImgStorage();
  const { data: progressList } = useQuery({
    queryKey: ['progressList'],
    queryFn: async () => {
      const result = await storage.getImages(`playlist/progressBar`);
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  // 3분동안 0.5초마다 currentTime이 1씩 증가
  useEffect(() => {
    if (music) {
      const timer = setTimeout(() => {
        setCurrentTime((prev) => {
          if (prev + 1 > 180) {
            return prev;
          }
          return prev + 1;
        });
      }, 500);
  
      return () => clearTimeout(timer);
    }
  }, [currentTime, music]);

  // 1초마다 프로그레스바 이동
  useEffect(() => {
    if (music) {
      const calculatedProgress = (currentTime / 180) * 100;
      setProgress(calculatedProgress);
    }
  }, [currentTime, music]);
  
  // 현재 플레이 되고 있는 음악이 바뀌면 currentTime, progress 0으로 초기화
  useEffect(() => {
    setCurrentTime(0);
    setProgress(0);
  }, [now]);

  return (
    <>
      {progressList &&
        <Background $imgurl={progressList[1]}>
          <Now $imgurl={progressList[2]} $progress={progress}>
          </Now>
      </Background>
      }
    </>
  );
}

