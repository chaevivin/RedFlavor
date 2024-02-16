import React, { useEffect, useState } from "react";
import GetImgStorage from "../../api/getImgStorage";
import { useQuery } from "@tanstack/react-query";
import styled, { keyframes } from "styled-components";

const blinkText = keyframes`
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0.3;
  }
  60% {
    opacity: 1;
  }
`;

const StatusContainer = styled.div`
  position: absolute;
  top: 8.8%;
  right: 15.1%;
`

const StatusBackground = styled.form<{ $imgurl: string | undefined }>`
  background-image: url(${(p) => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(391px / 3);
  height: calc(86px / 3);
  display: flex;
  justify-content: center;
  z-index: -1;
`;

const StatusText = styled.input`
  width: 86%;
  font-size: 0.7rem;
  background: transparent;
  border: none;
  font-family: "소야꼬마9";
  color: #451821;
  padding-top: 0.2rem;
`;

const StatusHelp = styled.img`
  width: calc(197px / 2.3);
  z-index: -1;
  animation-name: ${blinkText};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  margin-top: 0.3rem;
  margin-left: 1.5rem;
`;

export default function StatusBar() {
  const [status, setStatus] = useState<string>("텍스트를 입력해 보세요.");
  const [buttonVisible, setButtonVisible] = useState(true);

  const storage = new GetImgStorage();
  const { data: myroomStatus } = useQuery({
    queryKey: ["myroomStatus"],
    queryFn: async () => {
      const result = await storage.getImages("myroom/main/status");
      return result;
    },
    staleTime: 10000,
  });

  useEffect(() => {
    if (myroomStatus) {
      storage.preloadImgs(myroomStatus);
    }
  }, [myroomStatus]);

  const handleStatusFocus = () => {
    setStatus("");
    setButtonVisible(false);
  };

  const handleStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStatus((e.target as HTMLButtonElement).value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      {myroomStatus && (
        <StatusContainer>
          <StatusBackground $imgurl={myroomStatus[0]}>
            <StatusText
              type="text"
              value={status}
              onFocus={() => handleStatusFocus()}
              onChange={(e) => handleStatusChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              maxLength={15}
            />
          </StatusBackground>
          {buttonVisible ? (
            <StatusHelp src={myroomStatus[1]} alt="status help" />
          ) : (
            ""
          )}
        </StatusContainer>
      )}
    </>
  );
}
