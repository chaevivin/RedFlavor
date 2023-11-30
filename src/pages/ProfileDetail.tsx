import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Back from '../components/Back/Back';

export default function ProfileDetail() {
  const navigate = useNavigate();
  const { profileId } = useParams();

  return (
    <div>
      <Back navigate={navigate} />
      <h1>ProfileDetail {profileId}</h1>
    </div>
  );
}

