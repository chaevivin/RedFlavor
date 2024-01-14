import React from 'react';
import styles from './Back.module.css';
import { IoIosArrowBack } from "react-icons/io";
import styled from 'styled-components';

interface BackProps {
  navigate: (arg0: number) => void;
  color: string;
}

const BackButton = styled.button<{ $buttoncolor: string }>`
  color: ${p => p.$buttoncolor};
  border: none;
  background: none;
  font-size: 1.7rem;
  position: absolute;
  top: 7%;
  left: 3%;
`

export default function Back(props: BackProps) {
  return (
    <BackButton $buttoncolor={props.color}>
      <IoIosArrowBack 
        className={styles.back}
        onClick={() => {props.navigate(-1)}}
      />
    </BackButton>
  );
}

