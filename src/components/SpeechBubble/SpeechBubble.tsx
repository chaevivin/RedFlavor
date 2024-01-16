import React, { useState } from 'react';
import styled from 'styled-components';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';

const BubbleBtn = styled.button`
  width: calc(100% / 8);
  height: calc(100% / 6);
  position: absolute;
  top: 25%;
  left: 51.8%;
  background: transparent;
  border: none;
  z-index: -1;
`

const BubbleImg = styled.img`
  height: calc(100% / 1.2);
`

export default function SpeechBubble() {
  const [num, setNum] = useState<number>(0);

  const storage = new GetImgStorage();
  const { data: myroomBubble } = useQuery({
    queryKey: ['myroomBubble'],
    queryFn: async () => {
      const result = await storage.getImages('myroom/main/bubble');
      return result;
    },
    staleTime: 10000
  });

  const handleBubbleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    num < 5 ? setNum((prev) => prev + 1) : setNum(0);
  };

  return (
    <>
      {myroomBubble &&
        <BubbleBtn
          onClick={(e) => handleBubbleClick(e)}
        >
          <BubbleImg src={myroomBubble[num]}></BubbleImg>
        </BubbleBtn>
      }
    </>
  );
}

