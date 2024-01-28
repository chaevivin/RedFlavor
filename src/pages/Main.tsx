import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import GetImgStorage from '../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled, { css } from 'styled-components';

const Background = styled.section<{ $imgurl: string | undefined }>`
  height: 100vh;
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`

const Logo = styled.img`
  width: 247px;
  margin-bottom: 1rem;
`

const Container = styled.div`
	position: absolute;
  top: 27%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Buttons = styled.div`
  position: absolute;
  top: 64%;
  left: 52%;
  transform: translate(-50%, -47%);
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

const LinkButton = React.memo(styled(Link)<{ $imgurl: string | undefined; $playlist: boolean }>`
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
  margin: 1.2rem 0;
  font-size: 1.5rem;

  ${p =>
    p.$playlist &&
      css`
        font-size: 1.6rem;
      `
  }
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
          </Container>
          <Buttons>
            <ButtonContainer>
              <CheckBox src={mainList[6]}></CheckBox>
              <LinkButton $imgurl={mainList[2]} $playlist={false} to='/profile'>프로필 보기</LinkButton>
            </ButtonContainer>
            <ButtonContainer>
              <CheckBox src={mainList[6]}></CheckBox>
              <LinkButton $imgurl={mainList[3]} $playlist={false} to='/photocard'>포토카드 꾸미기</LinkButton>
            </ButtonContainer>
            <ButtonContainer>
              <CheckBox src={mainList[6]}></CheckBox>
              <LinkButton $imgurl={mainList[4]} $playlist={false} to='/loading'>마이룸</LinkButton>
            </ButtonContainer>
            <ButtonContainer>
              <CheckBox src={mainList[6]}></CheckBox>
              <LinkButton $imgurl={mainList[5]} $playlist={true} to='/playlist'>playlist</LinkButton>
            </ButtonContainer>
          </Buttons>
        </Background>
      }
    </>
  );
}

