import React, { useEffect } from 'react';
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
  width: calc(1170px / 3);
  height: calc(666px / 3);
  display: flex;
  justify-content: center;
  align-items: center;
`

const PanelInner = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  width: calc(1016px / 3);
  height: calc(508px / 3);
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
  width: calc(68px / 3);
  height: calc(492px / 3);
  position: absolute;

  ${p => 
    p.$left ?
    css`
      left: 1.3%;
      top: 0.9%;
    ` :
    css`
      right: 1.3%;
      top: 0.9%;
    `
  }
`

export default function PhotoCardPanel({ fabricCanvasRef }: PhotoCardPanelProps) {
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
                >
                  ◀
                </MoveButton>
                {panel && (() => {
                  switch (panel) {
                    case 'member':
                      return <MemberPanel />;
                    case 'frame':
                      return <FramePanel />;
                    case 'sticker':
                      return <StickerPanel fabricCanvasRef={fabricCanvasRef} />;
                    case 'brush':
                      return <BrushPanel />;
                    default:
                      return <ErrorPage />;
                  }
                })()}
                <MoveButton 
                  $imgurl={panelBox[1]}
                  $left={false}
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

