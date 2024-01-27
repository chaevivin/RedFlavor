import React, { useEffect, useState } from 'react';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const StatusBackground = styled.form<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(391px / 3);
  height: calc(86px / 3);
  position: absolute;
  top: 8.9%;
  right: 16%;
  z-index: -1;
`

const StatusText = styled.input`
  width: 86%;
  position: absolute;
  top: 22%;
  left: 6%;
  right: 0;
  font-size: 0.7rem;
  background: transparent;
  border: none;
  font-family: '소야꼬마9';
`

export default function StatusBar() {
  const [status, setStatus] = useState<string>('텍스트를 입력해 보세요.');

  const storage = new GetImgStorage();
  const { data: myroomStatus } = useQuery({
    queryKey: ['myroomStatus'],
    queryFn: async () => {
      const result = await storage.getImages('myroom/main/status');
      return result;
    },
    staleTime: 10000
  });

  useEffect(() => {
    if (myroomStatus) {
      storage.preloadImgs(myroomStatus);
    }
  }, [myroomStatus]);

  const handleStatusFocus = () => {
    setStatus('');
  };

  const handleStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStatus((e.target as HTMLButtonElement).value);
  }

  return (
    <>
      {myroomStatus &&
        <StatusBackground $imgurl={myroomStatus[0]}>
          <StatusText
            type='text'
            value={status}
            onFocus={() => handleStatusFocus()}
            onChange={(e) => handleStatusChange(e)}
            maxLength={15}
          />
        </StatusBackground>
      }
    </>
  );
}

