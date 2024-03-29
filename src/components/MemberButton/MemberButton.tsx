import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MemberButtonProps {
  name: string;
  nameUrl: string | undefined;
  imgUrl: string | undefined;
  width: number;
}

const MemberProfileButton = styled.button`
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin-bottom: 0.4rem;
`

const Name = styled.img`
  width: calc(154px / 3.5);
  margin-bottom: 0.3rem;
`

const Character = styled.img<{ $imgwidth: number }>`
  width: calc(${p => p.$imgwidth}px / 3.5);
`

export default function MemberButton({ name, nameUrl, imgUrl, width }: MemberButtonProps) {
  const navigate = useNavigate();

  const preloadImage = (url: string | undefined) => {
    if (url) {
      const image = new Image();
      image.src = url;
    }
  };
  
  useEffect(() => {
    preloadImage(nameUrl);
    preloadImage(imgUrl);
  }, [nameUrl, imgUrl]);

  const handleClick = () => {
    navigate(`/profile/${name}`);
  }

  return (
    <MemberProfileButton onClick={handleClick}>
      <Name src={nameUrl} ></Name>
      <Character src={imgUrl} $imgwidth={width} />
    </MemberProfileButton>
  );
}

