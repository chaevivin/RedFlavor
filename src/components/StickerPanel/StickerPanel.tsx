import { useQueries, useQuery } from '@tanstack/react-query';
import { fabric } from 'fabric';
import GetImgStorage from '../../api/getImgStorage';
import { useEffect } from 'react';
import styled from 'styled-components';

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
`

const StickerButton = styled.button<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
`

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

  function deleteObject(eventData: MouseEvent, transform: fabric.Transform) {
    const canvas = transform.target.canvas;
    canvas?.remove(transform.target);
    canvas?.requestRenderAll();
    return true;
  }

  const handleAddClick = (index: number) => {
    if (fabricCanvasRef.current && stickerList && frameList) {
      if (index === 0 || index === 1) {
        try {
          const url = frameList[index];
          fabric.Image.fromURL(url, (img) => {
            const newImg = img.set({ left: 0, top: 0, scaleX: 0.335, scaleY: 0.335, selectable: true });
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
          });
        } catch (error) {
          console.log('sticker panel frame handleAddClick error ' + error);
        }
      } else {
        try {
          const url = stickerList[index];
          fabric.Image.fromURL(url, (img) => {
            const newImg = img.set({ left: 100, top: 100, scaleX: 0.3, scaleY: 0.3, selectable: true });
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
          });
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
              >
              </StickerButton>
            </li>
          ))}
        </StickerContainer>
      }
    </>
  );
}

