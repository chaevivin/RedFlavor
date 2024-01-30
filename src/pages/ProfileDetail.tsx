import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Back from '../components/Back/Back';
import GetImgStorage from '../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../api/firebase';

interface stateType {
  [x: string]: any;
}

const Background = styled.section<{ $imgurl: string | undefined }>`
  height: 100dvh;
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InnerBackground = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(1136px / 3.5);
  height: calc(2040px / 3.5);
  text-align: center;
`

const TitleHeart = styled.span<{ $color: string }>`
  font-size: 0.7rem;
  color: ${p => p.$color};
  text-shadow: -1px 0 #ffffff, 0 1px #ffffff, 1px 0 #ffffff, 0 -1px #ffffff;
`

const Title = styled.p<{ $color: string }>`
  font-size: 1.1rem;
  color: ${p => p.$color};
  text-shadow: -1.3px 0 #ffffff, 0 1.3px #ffffff, 1.3px 0 #ffffff, 0 -1.3px #ffffff;
  margin: 4.6rem 0 1rem 0;
`

const ProfileImg = styled.img`
  width: calc(706px / 3.5);
  margin-bottom: 0.4rem;
`

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ItemTitle = styled.p`
  font-family: '소야쌀9';
  font-size: 1rem;
  margin: 0;
  color: #ffffff;
  text-shadow: -1.5px 0 #5d404f, 0 1.5px #5d404f, 1.5px 0 #5d404f, 0 -1.5px #5d404f;
`

const SymbolContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.5rem;
`

const SymbolImg = styled.img`
  width: calc(168px / 3.5);
  margin-bottom: 0.4rem;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileDescription = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(509px / 3.5);
  height: calc(362px / 3.5);
  line-height: 1.2rem;
`

const Description = styled.p`
  color: #5d404f;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: calc(362px / 3.5);
  font-size: 0.75rem;
  padding: 0 0.5rem;
`

export default function ProfileDetail() {
  const navigate = useNavigate();
  const { profileId } = useParams();

  const [profile, setProfile] = useState<stateType>();

  const storage = new GetImgStorage();
  const { data: detailList } = useQuery({
    queryKey: ['detailList', profileId],
    queryFn: async () => {
      const result = await storage.getImages(`profile/profileDetail/${profileId}`);
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  const getProfile = useMemo(() => async () => {
    const docRef = doc(database, 'profile', `${profileId}`);
    const q = await getDoc(docRef);
    const data = q.data();
    setProfile(data);
  }, [profileId]);

  useEffect(() => {
    getProfile();
  }, [getProfile, profileId]);
  
  useEffect(() => {
    if (detailList) {
      storage.preloadImgs([detailList?.[1], detailList?.[3], detailList?.[0], detailList?.[4], detailList?.[5], detailList?.[2]]);
    }
  }, [detailList]);

  return (
    <>
      {detailList &&
        profile &&
          <Background $imgurl={detailList[1]}>
            <Back navigate={navigate} color={profile.backColor} />
            <InnerBackground $imgurl={detailList[3]}>
              <Title $color={profile.color}>
                <TitleHeart $color={profile.color}>♥♥</TitleHeart>
                  {profile.title}
                <TitleHeart $color={profile.color}>♥♥</TitleHeart>
              </Title>
              <ProfileImg src={detailList[0]}></ProfileImg>
              <DetailContainer>
                <SymbolContainer>
                  <ItemTitle>symbol</ItemTitle>
                  <SymbolImg src={detailList[4]}></SymbolImg>
                  <SymbolImg src={detailList[5]}></SymbolImg>
                </SymbolContainer>
                <ProfileContainer>
                  <ItemTitle>profile</ItemTitle>
                  <ProfileDescription $imgurl={detailList[2]}>
                    <Description>
                      생일 : {profile.birthday} <br/>
                      mbti : {profile.mbti} <br/>
                      포지션 : {profile.position} <br/>
                      별명 : {profile.nickname}
                    </Description>
                  </ProfileDescription>
                </ProfileContainer>
              </DetailContainer>
            </InnerBackground>
          </Background>
      }
    </>
  );
}

