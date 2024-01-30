import React, { useEffect } from 'react';
import { FaCheck } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook';
import { closePanel } from '../../reducers/panelSlice';
import { choosePanel, selectPanelValue } from '../../reducers/choosePanelSlice';
import styled, { css } from 'styled-components';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';

const ButtonSection = styled.section`
  display: flex;
  justify-content: space-between;
  width: 325px;
`

const ButtonContainer = styled.div`
  margin-right: 2.5rem;
  display: flex;
`

const PanelButton = styled.button<{ $imgurl: string | undefined; $clicked: boolean }>`
  width: calc(196px / 3.5);
  height: calc(106px / 3.5);
  font-family: '소야꼬마9';
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fef4f6;
  text-shadow: -1px 0 #f787a7, 0 1px #f787a7, 1px 0 #f787a7, 0 -1px #f787a7;
  font-size: 0.9rem;
  padding: 0;
  padding-top: 0.2rem;

  ${(p) => 
    p.$clicked &&
    css`
      color: #f787a7;
      text-shadow: -1px 0 #ffeff2, 0 1px #ffeff2, 1px 0 #ffeff2, 0 -1px #ffeff2;
    `
  }
`

const CompleteButton = styled.button`
  background-color: transparent;
  font-size: 1.4rem;
  border: none;
  cursor: pointer;
  color: #f787a7;
`

export default function PanelButtons() {
  const dispatch = useAppDispatch();
  const panel = useAppSelector(selectPanelValue);

  const handleMemberClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(choosePanel('member'));
  };

  const handleFrameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(choosePanel('frame'));
  };

  const handleStickerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(choosePanel('sticker'));
  };

  const handleBrushClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(choosePanel('brush'));
  };

  const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closePanel());
    dispatch(choosePanel('member'));
  };

  const storage = new GetImgStorage();
  const { data: panelButtons } = useQuery({
    queryKey: ['panelButtons'],
    queryFn: async () => {
      const result = await storage.getImages('photocard/photocardDetail/panelButtons');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (panelButtons) {
      storage.preloadImgs(panelButtons);
    }
  }, [panelButtons]);

  return (
    <>
      {panelButtons &&
        <ButtonSection>
          <ButtonContainer>
            <PanelButton
              onClick={(e) => handleMemberClick(e)}
              $imgurl={panel === 'member' ? panelButtons[1] : panelButtons[0]}
              $clicked={panel === 'member'}
            >
              멤버
            </PanelButton>
            <PanelButton
              onClick={(e) => handleFrameClick(e)}
              $imgurl={panel === 'frame' ? panelButtons[1] : panelButtons[0]}
              $clicked={panel === 'frame'}
            >
              배경
            </PanelButton>
            <PanelButton
              onClick={(e) => handleStickerClick(e)}
              $imgurl={panel === 'sticker' ? panelButtons[1] : panelButtons[0]}
              $clicked={panel === 'sticker'}
            >
              스티커
            </PanelButton>
            <PanelButton
              onClick={(e) => handleBrushClick(e)}
              $imgurl={panel === 'brush' ? panelButtons[1] : panelButtons[0]}
              $clicked={panel === 'brush'}
            >
              브러쉬
            </PanelButton>
          </ButtonContainer>
          <CompleteButton
            onClick={(e) => handleCompleteClick(e)}
          >
            <FaCheck stroke='white' strokeWidth='1.7rem' />
          </CompleteButton>
        </ButtonSection>
      }
    </>
  );
}

