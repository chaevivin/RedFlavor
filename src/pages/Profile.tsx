import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';
import styled from 'styled-components';
import GetImgStorage from '../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import MemberButton from '../components/MemberButton/MemberButton';

const name: string[] = ['irene', 'seulgi', 'wendy', 'joy', 'yeri'];

const Background = styled.section<{ $imgurl: string | undefined }>`
  height: 100dvh;
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`

const Container = styled.div`
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const TopText = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(890px / 3.5 / 2);
`

const Text = styled.p`
  color: #cdc072;
  font-size: 1rem;
  margin: 0;
`

const InnerBackground = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(890px / 3.5);
  height: calc(1932px / 3.5);
`

const Title = styled.img`
  width: calc(575px / 3.5);
  margin: 2.5rem 0 1.2rem 0;
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 1rem;
`

const BottomLogo = styled.img`
  width: calc(373px / 3);
  margin-top: 1.2rem;
`

export default function Profile() {
  const navigate = useNavigate();

  const storage = new GetImgStorage();
  const { data: profileList } = useQuery({
    queryKey: ['profileList'],
    queryFn: async () => {
      const result = await storage.getImages('profile/profileMain');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
  
  useEffect(() => {
    if (profileList) {
      storage.preloadImgs(profileList);
    }
  }, [profileList]);

  return (
    <>
      {profileList && 
        <Background $imgurl={profileList[0]}>
          <Back navigate={navigate} color={'#cac198'} />
          <Container>
            <TopText>
              <Text>Title.</Text>
              <Text>Date.</Text>
            </TopText>
            <InnerBackground $imgurl={profileList[1]}>
              <Title src={profileList[11]}></Title>
              <ButtonContainer>
                <MemberButton name={name[0]} nameUrl={profileList[5]} imgUrl={profileList[3]} width={237} />
                <MemberButton name={name[1]} nameUrl={profileList[6]} imgUrl={profileList[10]} width={271} />
                <MemberButton name={name[2]} nameUrl={profileList[7]} imgUrl={profileList[12]} width={291} />
                <MemberButton name={name[3]} nameUrl={profileList[8]} imgUrl={profileList[4]} width={271} />
                <MemberButton name={name[4]} nameUrl={profileList[9]} imgUrl={profileList[13]} width={376} />
              </ButtonContainer>
            </InnerBackground>
            <BottomLogo src={profileList[2]}></BottomLogo>
          </Container>
        </Background>
      }
    </>
  );
}

