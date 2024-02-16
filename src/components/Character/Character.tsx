import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook';
import { heartGauge } from '../../reducers/heartSlice';
import { memberValue } from '../../reducers/memberSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled, { keyframes } from 'styled-components';

const blinkText = keyframes`
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0.3;
  }
  60% {
    opacity: 1;
  }
`

const CharacterButton = styled.button`
  padding: 0;
  width: calc(492px / 3);
  background-color: transparent;
  border: none;
  position: absolute;
  left: 37.5%;
  top: 35%;
  cursor: pointer;
  z-index: -1;
`

const CharacterImg = styled.img`
  width: 100%;
`

const CharacterHelp = styled.img`
  position: absolute;
  width: calc(197px / 2.3);
  top: 44%;
  left: 31.5%;
  z-index: -1;
  animation-name: ${blinkText};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`

export default function Character() {
  const dispatch = useAppDispatch();
  const member = useAppSelector(memberValue);
  const [buttonVisible, setButtonVisible] = useState(true);
  
  const [num, setNum] = useState(0);

  const storage = new GetImgStorage();
  const { data: myroomCharacter } = useQuery({
    queryKey: ['myroomCharacter'],
    queryFn: async () => {
      const result = await storage.getImages('myroom/main/character');
      return result;
    },
    staleTime: 10000
  });

  useEffect(() => {
    switch(member) {
      case 'irene':
        setNum(0);
        break;
      case 'seulgi':
        setNum(2);
        break;
      case 'wendy':
        setNum(3);
        break;
      case 'joy':
        setNum(1);
        break;
      case 'yeri':
      setNum(4);
      break;
    }
  }, [member]);

  const handleCharClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(heartGauge());
    setButtonVisible(false);
  };

  return (
    <>
      {myroomCharacter &&
        <div>
          {buttonVisible ? <CharacterHelp src={myroomCharacter[0]} alt='characnter help' /> : ''}
          <CharacterButton 
            onClick={(e) => handleCharClick(e)}
          >
            <CharacterImg src={myroomCharacter[num + 1]} alt='member' />
          </CharacterButton>
        </div>
      }
    </>
  );
}

