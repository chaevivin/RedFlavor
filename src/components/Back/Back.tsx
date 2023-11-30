import React from 'react';
import styles from './Back.module.css';
import { IoIosArrowBack } from "react-icons/io";
import { NavigateFunction } from 'react-router-dom';

export default function Back(props: { navigate: (arg0: number) => void; }) {
  return (
    <div>
      <IoIosArrowBack 
        className={styles.back}
        onClick={() => {props.navigate(-1)}}
      />
    </div>
  );
}

