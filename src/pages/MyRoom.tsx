import React, { useEffect, useState } from 'react';
import Character from '../components/Character/Character';
import SpeechBubble from '../components/SpeechBubble/SpeechBubble';
import StatusBar from '../components/StatusBar/StatusBar';
import HeartBar from '../components/HeartBar/HeartBar';
import MyRoomModal from '../components/MyRoomModal/MyRoomModal';
import { IoMenu } from "react-icons/io5";
import { modalValue, openModal } from '../reducers/modalSlice';
import { useAppDispatch, useAppSelector } from '../hook/reduxHook';
import Back from '../components/Back/Back';
import { useNavigate } from 'react-router-dom';
import GetImgStorage from '../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled, { css, keyframes } from 'styled-components';

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

const Background = styled.section<{ $imgurl: string | undefined }>`
  height: 100dvh;
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  top: 100%;
  left: 0;
  z-index: 1;
  @media( orientation: portrait ){
    transform: rotate(-90deg);
    transform-origin: top left;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100dvh;
    height: 100dvw;
  }
`

const ModalBackground = styled.div<{ $modalState: boolean }>`
  ${(p) =>
    p.$modalState &&
    css`
      background-color: rgba(14, 14, 14, 0.68);
      height: 100dvh;

      @media( orientation: portrait ){
        background-color: rgba(14, 14, 14, 0.68);
        height: 100dvw;
      }
  `}
`

const BackButton = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: calc(100% / 25);
  height: calc(100% / 14);
  position: absolute;
  top: 3%;
  left: 5%;
  z-index: -1;
`

const MenuButton = styled.button<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: calc(206px / 2.2);
  height: calc(103px / 2.2);
  position: absolute;
  right: 0;
  top: 0;
  padding: 0;
  z-index: -1;
`

const MenuContainer = styled.div`
  text-align: left;
  padding-top: 0.5rem;
  padding-left: 0.7rem;
`

const MenuHelp = styled.img`
  width: calc(197px / 2.3);
  animation-name: ${blinkText};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  margin-top: 1rem;
`

export default function MyRoom() {
  const modalState = useAppSelector(modalValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [buttonVisible, setButtonVisible] = useState(true);

  const storage = new GetImgStorage();
  const { data: myroomBackground } = useQuery({
    queryKey: ['myroomBackground'],
    queryFn: async () => {
      const result = await storage.getImages('myroom/main/background');
      return result;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (myroomBackground) {
      storage.preloadImgs(myroomBackground);
    }
  }, [myroomBackground]);
  
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(openModal());
    setButtonVisible(false);
  };

  return (
    <>
      {myroomBackground &&
        <Background $imgurl={myroomBackground[1]}>
          <ModalBackground $modalState={modalState}>
            <BackButton $imgurl={myroomBackground[0]}>
              <Back navigate={navigate} color={'#46101d'} />
            </BackButton>
            <Character />
            <SpeechBubble />
            <HeartBar />
            <StatusBar />
            <MenuButton 
              onClick={(e) => handleMenuClick(e)}
              $imgurl={myroomBackground[2]}
            >
              <MenuContainer>
                <IoMenu color='#46101d' size='1.5rem' />
              </MenuContainer>
              {buttonVisible ? <MenuHelp src={myroomBackground[3]} alt='menu help' /> : ''}
            </MenuButton>
          </ModalBackground>
          {modalState ? <MyRoomModal /> : ''}
        </Background>
      }
    </>
    
  );
}

