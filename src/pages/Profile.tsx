import React from 'react';
import { useNavigate } from 'react-router-dom';

const name: string[] = ['irene', 'seulgi', 'wendy', 'joy', 'yeri'];

export default function Profile() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault();
    navigate(`/profile/${name}`);
  }

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={(e) => handleClick(e, name[0])}>아이린</button>
      <button onClick={(e) => handleClick(e, name[1])}>슬기</button>
      <button onClick={(e) => handleClick(e, name[2])}>웬디</button>
      <button onClick={(e) => handleClick(e, name[3])}>조이</button>
      <button onClick={(e) => handleClick(e, name[4])}>예리</button>
    </div>
  );
}

