import React from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';

export default function PlayList() {
  const navigate = useNavigate();

  return (
    <div>
      <Back navigate={navigate} />
      <h1>PlayList</h1>
    </div>
  );
}

