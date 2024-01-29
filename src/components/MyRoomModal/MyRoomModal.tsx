import React, { useEffect } from 'react';
import { closeModal } from './../../reducers/modalSlice';
import { useAppDispatch } from '../../hook/reduxHook';
import { memberUpdated } from '../../reducers/memberSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const members = ['irene', 'seulgi', 'wendy', 'joy', 'yeri'];

const ModalBackground = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  width: calc(484px / 3);
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
  top: 0;

  /* 세로 모드 */
  @media (orientation: portrait) {
    height: 100vw;
  }
  /* 가로 모드 */
  @media (orientation: landscape) {
      height: 100vh;
  }
`

const OffModalButton = styled.button<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  position: absolute;
  right: 7%;
  top: 4%;
  color: #b08087;
  padding: 0 4.7px;
`

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75%;
  position: absolute;
  left: 53%;
  top: 15%;
`

const MemberButton = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 0;
  margin-bottom: 0.8rem;
`

const MemberImg = styled.img`
  width: calc(114px / 3);
  height: calc(125px / 3);
`

export default function MyRoomModal() {
  const dispatch = useAppDispatch();

  const storage = new GetImgStorage();
  const { data: myroomModal } = useQuery({
    queryKey: ['myroomModal'],
    queryFn: async () => {
      const result = await storage.getImages('myroom/main/modal');
      return result;
    },
    staleTime: 10000
  });

  useEffect(() => {
    if (myroomModal) {
      storage.preloadImgs(myroomModal);
    }
  }, [myroomModal]);

  const handleXClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  const handleMemberClick = (value: string) => {
    dispatch(memberUpdated(value));
    dispatch(closeModal());
  };

  return (
    <>
      {myroomModal &&
        <ModalBackground $imgurl={myroomModal[0]}>
          <OffModalButton 
            onClick={(e) => handleXClick(e)}
            $imgurl={myroomModal[1]}
          >
              x
          </OffModalButton>
          <MemberContainer>
            {members.map((member, index) => (
              <MemberButton
                key={member}
                onClick={() => handleMemberClick(member)}
              >
                <MemberImg src={myroomModal[index + 2]} />
              </MemberButton>
            ))}
          </MemberContainer>
        </ModalBackground>
      }
    </>
  );
}

