import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Intro.module.css';

export default function Intro() {
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
      console.log(count);
        if (imgRef.current) {
          imgRef.current.src = `/img/intro_${count}.jpg`;
        }
      }, 1000);

    if (count === 4) {       
      clearInterval(timer);
      navigate("main");
    }

    return () => clearInterval(timer);
  }, [count, navigate]);

  return (
    <article className={styles.container}>
      <img ref={imgRef} alt='Intro Background' src='/img/intro_1.jpg' className={styles.background} />
    </article>
  );
}

