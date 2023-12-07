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
      <Frequency start={0} /><Frequency start={1} /><Frequency start={2} />
        <Frequency start={3} /><Frequency start={4} /><Frequency start={5} />
        <Frequency start={6} /><Frequency start={7} /><Frequency start={8} /><Frequency start={9} />
      </div>
      <ProgressBar />
      <LikeMusic />
      <TrackList />
      <ListButtons />
    </div>
  );
}

