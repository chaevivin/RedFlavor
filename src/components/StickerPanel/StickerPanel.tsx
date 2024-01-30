import { useQueries, useQuery } from '@tanstack/react-query';
import { fabric } from 'fabric';
import GetImgStorage from '../../api/getImgStorage';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface StickerPanelProps {
  currentPage: number;
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const StickerContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  margin-bottom: 10px;
`

const StickerButton = styled.button<{ $imgurl: string | undefined; $background: boolean }>`
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: calc(150px / 3.5);
  height: calc(150px / 3.5);

  ${p => 
    p.$background &&
      css`
        background-color: #FCE3E9;
      `
  }
`

// 스티커 삭제
function deleteObject(eventData: MouseEvent, transform: fabric.Transform) {
  const canvas = transform.target.canvas;
  canvas?.remove(transform.target);
  canvas?.requestRenderAll();
  return true;
}

export default function StickerPanel({ currentPage, fabricCanvasRef }: StickerPanelProps) {
  const storage = new GetImgStorage();
  const queryResults = useQueries({
    queries: [
      {
        queryKey: ['stickerList'], 
        queryFn: async () => { 
            const result = await storage.getImages('photocard/photocardDetail/stickerPanel/icon');
            return result;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60
      },
      {
        queryKey: ['frameList'], 
        queryFn: async () => { 
            const result = await storage.getImages('photocard/photocardDetail/stickerPanel/frame');
            return result;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60
      }
    ]
  });

  const [ stickerList, frameList ] = queryResults.map((result) => result.data);

  useEffect(() => {
    if (stickerList && frameList) {
      storage.preloadImgs(stickerList);
      storage.preloadImgs(frameList);
    }
  }, [stickerList, frameList]);

  // 요소가 8개 이상이면 다음 페이지로 (페이지네이션)
  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;
  const currentSticker = stickerList?.slice(startIndex, endIndex);

  // page 변화할 때마다 인덱스 값 추가
  const [addIndex, setAddIndex] = useState(0);
  useEffect(() => {
    switch (currentPage) {
      case 1:
        setAddIndex(0);
        break;
      case 2:
        setAddIndex(8);
        break;
      case 3:
        setAddIndex(16);
        break;
      case 4:
        setAddIndex(24);
        break;
    }
  }, [currentPage]);

  const handleAddClick = (index: number) => {
    if (fabricCanvasRef.current && stickerList && frameList) {
      if (currentPage === 1 && (index === 0 || index === 1)) {
        try {
          const url = frameList[index];
          fabric.Image.fromURL(url, (img) => {
            const newImg = img.set({ left: 0, top: 0, scaleX: 0.3, scaleY: 0.3, selectable: true });
            newImg.borderColor = '#ffffff';
            newImg.cornerSize = 5;
            newImg.controls.deleteControl = new fabric.Control({
              x: 0.5,
              y: -0.5,
              offsetY: -16,
              offsetX: 16,
              cursorStyle: 'pointer',
              mouseUpHandler: deleteObject,
            });
            fabricCanvasRef.current?.add(newImg);
            fabricCanvasRef.current?.renderAll();
          }, {crossOrigin: 'anonymous'});
        } catch (error) {
          console.log('sticker panel frame handleAddClick error ' + error);
        }
      } else {
        try {
          const url = stickerList[index + addIndex];
          fabric.Image.fromURL(url, (img) => {
            const newImg = img.set({ left: 100, top: 100, scaleX: 0.3, scaleY: 0.3, selectable: true });
            newImg.borderColor = '#ffffff';
            newImg.cornerSize = 5;
            newImg.controls.deleteControl = new fabric.Control({
              x: 0.5,
              y: -0.5,
              offsetY: -16,
              offsetX: 16,
              cursorStyle: 'pointer',
              mouseUpHandler: deleteObject,
            });
            fabricCanvasRef.current?.add(newImg);
            fabricCanvasRef.current?.renderAll();
          }, {crossOrigin: 'anonymous'});
        } catch (error) {
          console.log('sticker panel icon handleAddClick error ' + error);
        }
      }
    }
  };

  return (
    <>
      {stickerList &&
        <StickerContainer>
          {currentSticker?.map((url, index) => (
            <li key={index}>
              <StickerButton 
                onClick={() => handleAddClick(index)}
                $imgurl={url}
                $background={currentPage === 2 && index === 1 && true}
              >
              </StickerButton>
            </li>
          ))}
        </StickerContainer>
      }
    </>
  );
}

