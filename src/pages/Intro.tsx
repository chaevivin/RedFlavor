import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("main");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>Intro</h1>
    </div>
  );
}

