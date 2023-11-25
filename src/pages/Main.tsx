import React from 'react';
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <h1>Main</h1>
      <Link to='/profile'>프로필 보기</Link>
      <Link to='/photocard'>포토카드 꾸미기</Link>
      <Link to='/myroom'>마이룸</Link>
      <Link to='/playlist'>playlist</Link>
    </div>
  );
}

