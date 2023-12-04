import React from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';
import TrackList from '../components/TrackList/TrackList';
import ListButtons from '../components/ListButtons/ListButtons';
import { useAppSelector } from '../hook/reduxHook';
import { nowValue } from '../reducers/nowPlayingSlice';
import LikeMusic from '../components/LikeMusic/LikeMusic';

export default function PlayList() {
  const navigate = useNavigate();
  const nowPlaying = useAppSelector(nowValue);

  return (
    <div>
      <Back navigate={navigate} />
      <p>♬TRACK 0{nowPlaying}</p>
      <LikeMusic />
      <TrackList />
      <ListButtons />
    </div>
  );
}

