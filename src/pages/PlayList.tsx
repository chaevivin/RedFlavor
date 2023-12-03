import React from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';
import TrackList from '../components/TrackList/TrackList';
import ListButtons from '../components/ListButtons/ListButtons';

export default function PlayList() {
  const navigate = useNavigate();

  return (
    <div>
      <Back navigate={navigate} />
      <TrackList />
      <ListButtons />
    </div>
  );
}

