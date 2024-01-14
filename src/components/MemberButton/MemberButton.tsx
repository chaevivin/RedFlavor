import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MemberButtonProps {
  name: string;
  nameUrl: string | undefined;
  imgUrl: string | undefined;
  width: number;
}

const MemberProfileButton = styled.button`
  cursor: pointer;
  width: 130px;
  background: none;
  border: none;
`

const Name = styled.img`
  width: calc(154px / 3);
`

const Character = styled.img<{ $imgwidth: number }>`
  width: calc(${p => p.$imgwidth}px / 3);
`

export default function MemberButton({ name, nameUrl, imgUrl, width }: MemberButtonProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault();
    navigate(`/profile/${name}`);
  }

  return (
    <MemberProfileButton onClick={(e) => handleClick(e, name)}>
      <Name src={nameUrl} ></Name>
      <Character src={imgUrl} $imgwidth={width}></Character>
    </MemberProfileButton>
  );
}

