import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook';
import { nowValue } from '../../reducers/nowPlayingSlice';
import { likeClicked, likeValue } from '../../reducers/likeSlice';

export default function LikeMusic() {
  const dispatch = useAppDispatch();
  const nowPlaying = useAppSelector(nowValue);
  const likedState = useAppSelector(likeValue);
  const [imgSrc, setImgSrc] = useState<string>('img/black.png');

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(likeClicked(nowPlaying));
    console.log(likedState);
  };

  useEffect(() => {
    likedState.forEach((state) => {
      if (nowPlaying === state.num) {
        state.liked ? setImgSrc('img/pink.png') : setImgSrc('img/black.png');
      }
    });
  }, [nowPlaying, likedState]);

  return (
    <button
      onClick={(e) => handleLikeClick(e)}
    >
      <img src={imgSrc} alt='black heart' />
    </button>
  );
}

