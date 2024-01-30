import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import GetImgStorage from '../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled, { css } from 'styled-components';

const Background = styled.section<{ $imgurl: string | undefined }>`
  height: 100dvh;
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Logo = styled.img`
  width: calc(738px / 3.5);
  margin-bottom: 1rem;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const CheckBox = styled.img`
  width: calc(67px / 3.5);
  margin-right: 1.3rem;
`

const LinkButton = React.memo(styled(Link)<{ $imgurl: string | undefined; $playlist: boolean }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
  width: calc(694px / 3.5);
  height: calc(197px / 3.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  margin: 1.2rem 0;
  margin-right: 2rem;
  font-size: 1.2rem;

  ${p =>
    p.$playlist &&
      css`
        font-size: 1.3rem;
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
          <Logo src={mainList[7]}></Logo>
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
        </Background>
      }
    </>
  );
}

