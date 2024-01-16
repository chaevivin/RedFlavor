import React, { useEffect } from 'react';
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
import styled, { css } from 'styled-components';

const Background = styled.section<{ $imgurl: string | undefined }>`
  height: 100vh;
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  z-index: 1;
  @media( orientation: portrait ){
    transform: rotate(-90deg);
    transform-origin: top left;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100vh;
    height: 100vw;
  }
`

const ModalBackground = styled.div<{ $modalState: boolean }>`
  ${(p) =>
    p.$modalState &&
    css`
      background-color: rgba(0, 0, 0, 0.4);
      height: 100vh;
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
  top: 7%;
  left: 3%;
  z-index: -1;
`

const MenuButton = styled.button<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: calc(100% / 13);
  height: calc(100% / 12);
  position: absolute;
  right: 0;
  top: 0;
  padding: 0;
  z-index: -1;
`

export default function MyRoom() {
  const modalState = useAppSelector(modalValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const preloadImages = async (imageUrls: string[] | undefined) => {
    await Promise.all(
      imageUrls?.map(
        (url) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = url;
            image.onload = resolve;
          })
      ) || []
    );
  };

  useEffect(() => {
    if (myroomBackground) {
      preloadImages(myroomBackground);
    }
  }, [myroomBackground]);
  
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(openModal());
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
              <IoMenu color='#46101d' size='1.5rem' />
            </MenuButton>
          </ModalBackground>
          {modalState ? <MyRoomModal /> : ''}
        </Background>
      }
    </>
    
  );
}

