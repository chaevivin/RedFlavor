import React from 'react';
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { IoPause } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
import { useAppDispatch } from '../../hook/reduxHook';
import { nextClicked, prevClicked } from '../../reducers/nowPlayingSlice';

export default function ListButtons() {
  const dispatch = useAppDispatch();

  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(prevClicked());
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(nextClicked());
  };

  const handlePauseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handlePlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <button
        onClick={(e) => handlePrevClick(e)}
      >
        <TbPlayerTrackNextFilled />
      </button>
      <button
        onClick={(e) => handleNextClick(e)}
      >
        <TbPlayerTrackNextFilled />
      </button>
      <button
        onClick={(e) => handlePauseClick(e)}
      >
        <IoPause />
      </button>
      <button
        onClick={(e) => handlePlayClick(e)}
      >
        <IoMdPlay />
      </button>
    </div>
  );
}

