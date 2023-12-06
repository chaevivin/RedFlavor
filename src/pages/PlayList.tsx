import React from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';
import TrackList from '../components/TrackList/TrackList';
import ListButtons from '../components/ListButtons/ListButtons';
import { useAppSelector } from '../hook/reduxHook';
import { nowValue } from '../reducers/nowPlayingSlice';
import LikeMusic from '../components/LikeMusic/LikeMusic';
import Frequency from '../components/Frequency/Frequency';
import styles from './PlayList.module.css';
import ProgressBar from '../components/ProgressBar/ProgressBar';

export default function PlayList() {
  const navigate = useNavigate();
  const nowPlaying = useAppSelector(nowValue);

  return (
    <div>
      <Back navigate={navigate} />
      <p>♬TRACK 0{nowPlaying}</p>
      <div className={styles.frequency}>
        <Frequency /><Frequency /><Frequency /><Frequency /><Frequency />
        <Frequency /><Frequency /><Frequency /><Frequency /><Frequency />
      </div>
      <ProgressBar />
      <LikeMusic />
      <TrackList />
      <ListButtons />
    </div>
  );
}

