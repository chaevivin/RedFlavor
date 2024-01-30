import React, { useEffect, useState } from 'react';
import PanelButtons from '../PanelButtons/PanelButtons';
import { useAppSelector } from '../../hook/reduxHook';
import { selectPanelValue } from '../../reducers/choosePanelSlice';
import MemberPanel from '../MemberPanel/MemberPanel';
import FramePanel from '../FramePanel/FramePanel';
import StickerPanel from '../StickerPanel/StickerPanel';
import BrushPanel from '../BrushPanel/BrushPanel';
import ErrorPage from '../../pages/ErrorPage';
import styled, { css } from 'styled-components';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';

interface PhotoCardPanelProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  backgroundImgRef: React.MutableRefObject<HTMLDivElement | null>;
}

const PanelSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PanelBox = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  width: calc(1170px / 3.5);
  height: calc(666px / 3.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const PanelInner = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  width: calc(1016px / 3.5);
  height: calc(508px / 3.5);
  justify-content: space-around;
  align-items: center;
  position: relative;
`

const MoveButton = styled.button<{ $imgurl: string | undefined; $left: boolean }>`
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #ffffff;
  width: calc(68px / 3.8);
  height: calc(492px / 3.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  ${p => 
    p.$left ?
    css`
      left: 1.1%;
      top: 1.2%;
    ` :
    css`
      right: 1.1%;
      top: 1.6%;
      transform: scaleX(-1);
    `
  }
`

export default function PhotoCardPanel({ fabricCanvasRef, backgroundImgRef }: PhotoCardPanelProps) {
  const panel = useAppSelector(selectPanelValue);

  const storage = new GetImgStorage();
  const { data: panelBox } = useQuery({
    queryKey: ['panelBox'],
    queryFn: async () => {
      const result = await storage.getImages('photocard/photocardDetail/panel');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (panelBox) {
      storage.preloadImgs(panelBox);
    }
  }, [panelBox]);

  // 페이지 이동
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  useEffect(() => {
    switch(panel) {
      case 'frame':
        setTotalItems(9);
        break;
      case 'sticker':
        setTotalItems(27);
        break;
      case 'brush':
        setTotalItems(10);
        break;
    }
  }, [panel]);
  const totalPages = Math.ceil(totalItems / 8);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {panelBox &&
        <PanelSection>
          <PanelButtons />
            <PanelBox $imgurl={panelBox[0]}>
              <PanelInner $imgurl={panel === 'brush' ? panelBox[3] : panelBox[2]}>
                <MoveButton 
                  $imgurl={panelBox[1]}
                  $left={true}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  ◀
                </MoveButton>
                {panel && (() => {
                  switch (panel) {
                    case 'member':
                      return <MemberPanel />;
                    case 'frame':
                      return <FramePanel 
                        currentPage={currentPage} 
                        fabricCanvasRef={fabricCanvasRef} 
                        backgroundImgRef={backgroundImgRef}
                      />;
                    case 'sticker':
                      return <StickerPanel 
                        currentPage={currentPage} 
                        fabricCanvasRef={fabricCanvasRef} 
                      />;
                    case 'brush':
                      return <BrushPanel
                        fabricCanvasRef={fabricCanvasRef}
                      />;
                    default:
                      return <ErrorPage />;
                  }
                })()}
                <MoveButton 
                  $imgurl={panelBox[1]}
                  $left={false}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  ▶
                </MoveButton>
              </PanelInner>
          </PanelBox>
        </PanelSection>
      }
    </>
  );
}

