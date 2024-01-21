import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook';
import { memberUpdated, memberValue } from '../../reducers/memberSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled, { css } from 'styled-components';

const members = ['yeri', 'joy', 'wendy', 'seulgi', 'irene'];
const outlineColors = ['#ecdcfa', '#def9d9', '#deedfc', '#fdf8ce', '#fee0f0'];
const selectedOutlineColors = ['#cd99fc', '#7df964', '#76c7ff', '#f5df2b', '#fe8ccb'];

const MemberContainer = styled.section`
  width: 260px;
  height: 140px;
  display: flex;
  align-items: center;
  flex-wrap: wrap-reverse;
  justify-content: center;
  flex-direction: row-reverse;
`

const MemberButton = styled.button<{ $outlineColor: string; $clicked: boolean }>`
  border-color: ${p => p.$outlineColor};
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;
  cursor: pointer;
  width: 60px;
  height: 60px;
  background-color: white;
  padding: 0;
  margin: 0 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(p) => 
    p.$clicked &&
    css`
      border-width: 3px;
    `
  }
`

const MemberImg = styled.img`
  width: 50px;
  height: 50px;
`

export default function MemberPanel() {
  const dispatch = useAppDispatch();
  const nowMember = useAppSelector(memberValue);

  const handleMemberClick = (value: string) => {
    dispatch(memberUpdated(value));
  };

  const storage = new GetImgStorage();
  const { data: memberPanel } = useQuery({
    queryKey: ['memberPanel'],
    queryFn: async () => {
      const result = await storage.getImages('photocard/photocardDetail/memberPanel');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (memberPanel) {
      storage.preloadImgs(memberPanel);
    }
  }, [memberPanel]);

  return (
    <>
      {memberPanel &&
        <MemberContainer>
          {members.map((member,index) => (
            <MemberButton
              key={member}
              onClick={() => handleMemberClick(member)}
              $outlineColor={member === nowMember ? selectedOutlineColors[index] : outlineColors[index]}
              $clicked={member === nowMember}
            >
              <MemberImg src={memberPanel[4 - index]} />
            </MemberButton>
          ))}
        </MemberContainer>
      }
    </>
  );
}

