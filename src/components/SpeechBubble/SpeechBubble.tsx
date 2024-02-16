import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';

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

const BubbleContainer = styled.div`
  
`

const BubbleBtn = styled.button`
  position: absolute;
  top: 23.5%;
  left: 51%;
  width: calc(229px / 2.2);
  height: calc(139px / 2.2);
  display: flex;
  justify-content: flex-start;
  background: transparent;
  border: none;
  z-index: -1;
`

const BubbleImg = styled.img`
  height: calc(100% / 1.2);
`

const BubbleHelp = styled.img`
  width: calc(197px / 2.3);
  z-index: -1;
  animation-name: ${blinkText};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  position: absolute;
  top: 17%;
  left: 51.4%;
`

export default function SpeechBubble() {
  const [num, setNum] = useState<number>(0);
  const [buttonVisible, setButtonVisible] = useState(true);

  const storage = new GetImgStorage();
  const { data: myroomBubble } = useQuery({
    queryKey: ['myroomBubble'],
    queryFn: async () => {
      const result = await storage.getImages('myroom/main/bubble');
      return result;
    },
    staleTime: 10000
  });

  useEffect(() => {
    if (myroomBubble) {
      storage.preloadImgs(myroomBubble);
    }
  }, [myroomBubble]);

  const handleBubbleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    num < 5 ? setNum((prev) => prev + 1) : setNum(0);
    setButtonVisible(false);
  };

  return (
    <>
      {myroomBubble &&
        <BubbleContainer>
          {buttonVisible ? <BubbleHelp src={myroomBubble[6]} alt='bubble help' /> : ''}
          <BubbleBtn
            onClick={(e) => handleBubbleClick(e)}
          >
            <BubbleImg src={myroomBubble[num]}></BubbleImg>
          </BubbleBtn>
        </BubbleContainer>
      }
    </>
  );
}

