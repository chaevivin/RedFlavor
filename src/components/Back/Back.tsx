import React from 'react';
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
  font-size: 1.3rem;
  position: absolute;
  top: 8%;
  left: 7%;
  padding: 0;
`

export default function Back(props: BackProps) {
  return (
    <BackButton $buttoncolor={props.color}>
      <IoIosArrowBack 
        onClick={() => {props.navigate(-1)}}
      />
    </BackButton>
  );
}

