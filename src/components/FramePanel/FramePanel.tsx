import React, { useEffect, useState } from 'react';
import GetImgStorage from '../../api/getImgStorage';
import { useQueries } from '@tanstack/react-query';
import styled, { css } from 'styled-components';
import { fabric } from 'fabric';
import { FaCheck } from "react-icons/fa6";

interface FramePanelProps {
  currentPage: number;
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  backgroundImgRef: React.MutableRefObject<HTMLDivElement | null>;
}

const backClickedValue: boolean[] = Array.from({ length: 7 }, () => false);
const backgroundColor = ['#ffa0d4', '#fcf199', '#99c8fc', '#aafc99', '#cd99fc'];

const FrameContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  margin-bottom: 10px;
`

const FrameButton = styled.button<{ $imgurl: string | undefined; $clicked: boolean }>`
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: calc(150px / 3.5);
  height: calc(150px / 3.5);
  position: relative;

  ${p => 
    p.$clicked &&
      css`
        border: solid 2px #d7899f;
        border-radius: 5px;
      `
  }
`

const FrameCheck = styled.div<{ $clicked: boolean }>`
  ${p => 
    p.$clicked &&
      css`
        position: absolute;
        width: calc(150px / 3.5);
        height: calc(150px / 3.5);
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        color: #d7899f;
        font-size: 1.1rem;
      `
  }
`

export default function FramePanel({ currentPage, fabricCanvasRef, backgroundImgRef }: FramePanelProps) {
  const [clicked, setClicked] = useState<boolean[]>(backClickedValue);
  
  const storage = new GetImgStorage();
  const queryResults = useQueries({
    queries: [
      { queryKey: ['frameIcon'],
        queryFn: async () => {
          const result = await storage.getImages('photocard/photocardDetail/framePanel/icon');
          return result;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60
      },
      { queryKey: ['frameBackground'],
        queryFn: async () => {
          const result = await storage.getImages('photocard/photocardDetail/framePanel/background');
          return result;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60
      }
    ]
  });

  const [ frameIcon, frameBackground ] = queryResults.map((result) => result.data);

  useEffect(() => {
    if (frameIcon && frameBackground) {
      storage.preloadImgs(frameIcon);  
      storage.preloadImgs(frameBackground); 
    }
  }, [frameIcon, frameBackground]);

  // frame 버튼 누르면 배경 바뀌거나 프레임 
  const handleAddClick = (index: number) => {
    setClicked((prev) => prev.map((v, i) => (i === index ? !v : false)));

    if (fabricCanvasRef.current && backgroundImgRef.current && frameBackground) {
      // backgroundImg 변경
      if (index === 0 || index === 1) {    
        try {
          const url = frameBackground[index];
          backgroundImgRef.current.style.backgroundImage = `url(${url})`;
          backgroundImgRef.current.style.backgroundSize = 'cover';
          backgroundImgRef.current.style.backgroundRepeat = 'no-repeat';
        } catch (error) {
          console.log('frame panel background img error ' + error);
        }
      }

      // backgroundColor 변경
      else {
        try{
          backgroundImgRef.current.style.backgroundColor = backgroundColor[index - 2];
          backgroundImgRef.current.style.backgroundImage = '';
        } catch (error) {
          console.log('frame panel background color error ' + error);
        }
      }
    }
  };

  return (
    <>
      {frameIcon &&
        <FrameContainer>
          {frameIcon?.map((url, index) => (
            <li key={index} style={{ position: 'relative' }}>
              <FrameButton 
                $imgurl={url}
                onClick={() => handleAddClick(index)}
                $clicked={clicked[index]}
              >
              </FrameButton>
              <FrameCheck $clicked={clicked[index]}>
                {clicked[index] && <FaCheck />}
              </FrameCheck>
            </li>
          ))}
        </FrameContainer>
      }
    </>
  );
}

