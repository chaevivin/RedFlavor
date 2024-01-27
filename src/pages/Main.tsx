import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import GetImgStorage from '../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const Background = styled.section<{ $imgurl: string | undefined }>`
  height: 100vh;
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`

const Logo = styled.img`
  width: 213px;
  margin-bottom: 1.6rem;
`

const Container = styled.div`
	position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const CheckBox = styled.img`
  width: calc(65px / 3);
  height: calc(67px / 3);
  position: absolute;
  left: -2.7rem;
`

const LinkButton = React.memo(styled(Link)<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
  width: calc(694px / 3);
  height: calc(197px / 3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  margin: 1.4rem 0;
  font-size: 1.5rem;
`)

export default function Main() {
  const storage = new GetImgStorage();
  const { data: mainList } = useQuery({
    queryKey: ['mainList'],
    queryFn: async () => {
      const result = await storage.getImages('main');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (mainList){
      storage.preloadImgs(mainList);
    }
  }, [mainList]);

  return (
    <>
      {mainList &&
        <Background $imgurl={mainList[0]}>
          <Container>
            <Logo src={mainList[7]}></Logo>
            <ButtonContainer>
              <CheckBox src={mainList[6]}></CheckBox>
              <LinkButton $imgurl={mainList[2]} to='/profile'>프로필 보기</LinkButton>
            </ButtonContainer>
            <ButtonContainer>
              <CheckBox src={mainList[6]}></CheckBox>
              <LinkButton $imgurl={mainList[3]} to='/photocard'>포토카드 꾸미기</LinkButton>
            </ButtonContainer>
            <ButtonContainer>
              <CheckBox src={mainList[6]}></CheckBox>
              <LinkButton $imgurl={mainList[4]} to='/loading'>마이룸</LinkButton>
            </ButtonContainer>
            <ButtonContainer>
              <CheckBox src={mainList[6]}></CheckBox>
              <LinkButton $imgurl={mainList[5]} to='/playlist'>playlist</LinkButton>
            </ButtonContainer>
          </Container>
        </Background>
      }
    </>
  );
}

