import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook';
import { heartGauge } from '../../reducers/heartSlice';
import { memberValue } from '../../reducers/memberSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const CharacterButton = styled.button`
  padding: 0;
  width: calc(492px / 3);
  background-color: transparent;
  border: none;
  position: absolute;
  left: 40%;
  top: 35%;
  cursor: pointer;
  z-index: -1;
`

const CharacterImg = styled.img`
  width: 100%;
`

export default function Character() {
  const dispatch = useAppDispatch();
  const member = useAppSelector(memberValue);

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
  };

  return (
    <>
      {myroomCharacter &&
        <CharacterButton 
          onClick={(e) => handleCharClick(e)}
        >
          <CharacterImg src={myroomCharacter[num]} alt='member' />
        </CharacterButton>
      }
    </>
  );
}

