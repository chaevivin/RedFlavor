import React, { useEffect, useState } from 'react';
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

// chrome violation: setTimeout handler took ...ms 해결
// 핸들러가 await 메서드를 가진 비동기 함수이면 메시지 표시 X
const sleep = (s: number) =>
  new Promise((p) => setTimeout(p, (s * 100) | 0));

const Background = styled.section<{ $imgurl: string | undefined }>`
  height: 100vh;
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`

const InnerBackground = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(1136px / 3);
  height: calc(2040px / 3);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const Title = styled.p<{ $color: string }>`
  font-size: 1.5rem;
  color: ${p => p.$color};
  text-shadow: -1px 0 #ffffff, 0 1px #ffffff, 1px 0 #ffffff, 0 -1px #ffffff;
  margin: 5.3rem 0 1rem 0;     /* 요소 가운데 정렬 직접하려면 margin-left 값 조정하기 */
`

const ProfileImg = styled.img`
  width: calc(706px / 3);
`

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ItemTitle = styled.p`
  font-size: 1.3rem;
  margin: 0;
  color: #ffffff;
  text-shadow: -1px 0 #5d404f, 0 1px #5d404f, 1px 0 #5d404f, 0 -1px #5d404f;
`

const SymbolContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`

const SymbolImg = styled.img`
  width: calc(168px / 3);
  margin-bottom: 0.6rem;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileDescription = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(509px / 3);
  height: calc(362px / 3);
  line-height: 1.3rem;
`

const Description = styled.p`
  color: #5d404f;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: calc(362px / 3);
  font-size: 0.9rem;
`

export default function ProfileDetail() {
  const navigate = useNavigate();
  const { profileId } = useParams();

  const [profile, setProfile] = useState<stateType>();

  const storage = new GetImgStorage();
  const { data: detailList } = useQuery({
    queryKey: ['detailList'],
    queryFn: async () => {
      const result = await storage.getImages(`profile/profileDetail/${profileId}`);
      return result;
    },
    staleTime: 1000
  });

  useEffect(() => {
    async function getProfile () {
      // 이 작업을 많이 해야 한다면 전용 억제 메서드로 변경
      await sleep(1);
      const docRef = doc(database, 'profile', `${profileId}`)
      const q = await getDoc(docRef);
      const data = q.data();
      setProfile(data);
    }
    getProfile();
  }, [profileId]);

  return (
    <>
      {detailList &&
        profile &&
          <Background $imgurl={detailList[1]}>
            <Back navigate={navigate} color={profile.backColor} />
            <InnerBackground $imgurl={detailList[3]}>
              <Title $color={profile.color}>{profile.title}</Title>
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

