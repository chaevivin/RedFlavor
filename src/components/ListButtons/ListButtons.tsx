import React from 'react';
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { IoPause } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
import { useAppDispatch } from '../../hook/reduxHook';
import { nextClicked, prevClicked } from '../../reducers/nowPlayingSlice';
import { pauseClicked, playClicked } from '../../reducers/musicSlice';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: calc(751px / 3.5);
  height: calc(751px / 3.5);
  top: 51%;
  left: 15.1%;
`

const PrevButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 14%;
  left: 46.5%;
  background: transparent;
  border: none;
  color: #a2e796;
  transform: rotate(-90deg);
  font-size: 1.1rem;
  padding: 0;
  display: flex;
`

const NextButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  transform: rotate(90deg);
  font-size: 1.1rem;
  position: absolute;
  color: #a2e796;
  top: 72%;
  left: 46.5%;
  display: flex;
`

const PauseButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  font-size: 1.1rem;
  position: absolute;
  color: #a2e796;
  top: 43%;
  left: 16%;
`

const PlayButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  font-size: 1.1rem;
  position: absolute;
  color: #a2e796;
  top: 43%;
  left: 77%;
`

export default function ListButtons() {
  const dispatch = useAppDispatch();

  // 플레이리스트 이전 노래 버튼
  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(prevClicked());
  };

  // 플레이리스트 다음 노래 버튼
  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(nextClicked());
  };

  // 플레이리스트 노래 멈춤 버튼
  const handlePauseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(pauseClicked());
  };

  // 플레이리스트 노래 시작 버튼
  const handlePlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(playClicked());
  };

  return (
    <Container>
      <PrevButton
        onClick={(e) => handlePrevClick(e)}
      >
        <TbPlayerTrackNextFilled />
      </PrevButton>
      <NextButton
        onClick={(e) => handleNextClick(e)}
      >
        <TbPlayerTrackNextFilled />
      </NextButton>
      <PauseButton
        onClick={(e) => handlePauseClick(e)}
      >
        <IoPause />
      </PauseButton>
      <PlayButton
        onClick={(e) => handlePlayClick(e)}
      >
        <IoMdPlay />
      </PlayButton>
    </Container>
  );
}

