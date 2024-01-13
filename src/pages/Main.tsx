import React from 'react';
import { Link } from "react-router-dom";
import GetImgStorage from '../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const Background = styled.section<{ $imgurl: string | undefined }>`
  height: 100vh;
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
`

const Logo = styled.img`
  width: calc(738px / 3);
  margin-bottom: 1rem;
`

const Container = styled.div`
	position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
`

const LinkButton = styled(Link)<{ $imgurl: string | undefined }>`
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
  margin: 2.9rem 0;
  font-size: 1.7rem;
`

export default function Main() {
  const storage = new GetImgStorage();
  const { data: mainList } = useQuery({
    queryKey: ['mainList'],
    queryFn: async () => {
      const result = await storage.getImages('main');
      return result;
    },
    staleTime: 10000
  });

  return (
    <Background $imgurl={mainList && mainList[1]}>
      <Container>
        <Logo src={mainList && mainList[7]}></Logo>
        <LinkButton $imgurl={mainList && mainList[2]} to='/profile'>프로필 보기</LinkButton>
        <LinkButton $imgurl={mainList && mainList[3]} to='/photocard'>포토카드 꾸미기</LinkButton>
        <LinkButton $imgurl={mainList && mainList[4]} to='/myroom'>마이룸</LinkButton>
        <LinkButton $imgurl={mainList && mainList[5]} to='/playlist'>playlist</LinkButton>
      </Container>
    </Background>
  );
}

