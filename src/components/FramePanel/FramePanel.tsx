import React, { useEffect, useState } from 'react';
import GetImgStorage from '../../api/getImgStorage';
import { useQueries } from '@tanstack/react-query';
import styled, { css } from 'styled-components';
import { fabric } from 'fabric';

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
`

const FrameButton = styled.button<{ $imgurl: string | undefined; $backClicked: boolean }>`
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 50px;

  ${p => 
    p.$backClicked &&
      css`
        border: solid 2px #d7899f;
        border-radius: 5px;
      `
  }
`

export default function FramePanel({ currentPage, fabricCanvasRef, backgroundImgRef }: FramePanelProps) {
  const [backClicked, setBackClicked] = useState<boolean[]>(backClickedValue);

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

  // 요소가 8개 이상이면 다음 페이지로 (페이지네이션)
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const currentImages = frameIcon?.slice(startIndex, endIndex);

  // function deleteObject(eventData: MouseEvent, transform: fabric.Transform) {
  //   const canvas = transform.target.canvas;
  //   canvas?.remove(transform.target);
  //   canvas?.requestRenderAll();
  //   return true;
  // }

  // frame 버튼 누르면 배경 바뀌거나 프레임 
  const handleAddClick = (index: number) => {
    setBackClicked((prev) => prev.map((v, i) => (i === index ? !v : false)));

    if (fabricCanvasRef.current && backgroundImgRef.current && frameBackground) {
      // frame 추가
      // if (index === 0 || index === 1) {    
      //   try {
      //     const url = frameBackground[index + 2];
      //     const canvas = fabricCanvasRef.current;
      //     fabric.Image.fromURL(url, (img) => {
      //       img.set({ left: 0, top: 0, scaleX: 0.335, scaleY: 0.335, selectable: false });
      //       newImg.cornerColor = 'blue';
      //       newImg.cornerSize = 10;
      //       newImg.cornerStyle = 'circle';
      //       newImg.controls.deleteControl = new fabric.Control({
      //         x: 0.5,
      //         y: -0.5,
      //         offsetY: -16,
      //         offsetX: 16,
      //         cursorStyle: 'pointer',
      //         mouseUpHandler: deleteObject,
      //       });
      //       setSelectedImage((prev) => [...prev, img]);
      //       canvas?.add(img);
      //       canvas?.renderAll();
      //     });
      //   } catch (error) {
      //     console.log('frame panel frame error ' + error);
      //   }
      // }

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
          {currentImages?.map((url, index) => (
            <li key={index}>
              <FrameButton 
                $imgurl={url}
                onClick={() => handleAddClick(index)}
                $backClicked={backClicked[index]}
              >
              </FrameButton>
            </li>
          ))}
        </FrameContainer>
      }
    </>
  );
}

