import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook';
import { nowValue } from '../../reducers/nowPlayingSlice';
import { likeClicked, likeValue } from '../../reducers/likeSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const LikeButton = styled.button<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(143px / 3);
  height: calc(95px / 3);
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const LikeImg = styled.img`
  width: calc(83px / 3);
  height: calc(67px / 3);
`

export default function LikeMusic() {
  const dispatch = useAppDispatch();
  const nowPlaying = useAppSelector(nowValue);
  const likedState = useAppSelector(likeValue);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  const storage = new GetImgStorage();
  const { data: like } = useQuery({
    queryKey: ['like'],
    queryFn: async () => {
      const result = await storage.getImages(`playlist/like`);
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  // 하트 버튼을 클릭하면 현재 플레이되고 있는 노래 번호의 liked 값이
  // true -> false
  // false -> true로 변화
  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(likeClicked(nowPlaying));
    console.log(likedState);
  };

  // liked 값이 true이면 분홍색 하트, false이면 빈 하트
  useEffect(() => {
    if (like) {
      likedState.forEach((state) => {
        if (nowPlaying === state.num) {
          state.liked ? setImgSrc(like[1]) : setImgSrc(like[0]);
        }
      });
    }
  }, [nowPlaying, likedState, like]);

  return (
    <>
      {like &&
        <LikeButton
          onClick={(e) => handleLikeClick(e)}
          $imgurl={like[2]}
        >
          <LikeImg src={imgSrc} alt='heart' />
        </LikeButton>
      }
    </>
  );
}

