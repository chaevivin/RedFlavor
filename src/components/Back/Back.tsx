import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
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
  /* position: absolute;
  top: 8%;
  left: 7%; */
  padding: 0;
`

export default function Back(props: BackProps) {
  const location = useLocation();
  const goToMain = useNavigate();

  const handleBackClick = () => {
    if (location.pathname === '/myroom') {
      goToMain("/main");
    } else {
      props.navigate(-1);
    }
  }

  return (
    <BackButton $buttoncolor={props.color} onClick={handleBackClick}>
      <IoIosArrowBack />
    </BackButton>
  );
}

