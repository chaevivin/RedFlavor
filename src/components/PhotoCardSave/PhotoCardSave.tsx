import html2canvas from 'html2canvas';
import React, { useEffect } from 'react';
import { saveAs } from 'file-saver';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

interface PhotoCardSaveProps {
  saveTargetRef: React.MutableRefObject<HTMLElement | null>;
}

const SaveButton = styled.button<{ $imgurl: string | undefined }>`
  font-family: "소야꼬마9";
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #fff8f9;
  text-shadow: -1.5px 0 #f3a9ba, 0 1.5px #f3a9ba, 1.5px 0 #f3a9ba, 0 -1.5px #f3a9ba;
  width: calc(157px / 3);
  height: calc(93px / 3);
  padding: 0;
`

export default function PhotoCardSave({ saveTargetRef }: PhotoCardSaveProps) {

  const handleSaveImg = async () => {
    console.log(saveTargetRef.current);
    if (saveTargetRef.current) {
      try {
        const canvas = await html2canvas(saveTargetRef.current, { useCORS: true });
        canvas.toBlob((blob) => {
          if (blob !== null) {
            saveAs(blob, 'redFlavor.png');
          }
        });
      } catch (error) {
        console.error("Error converting element to image: ", error);
      }
    }
  };

  const storage = new GetImgStorage();
  const { data: saveButton } = useQuery({
    queryKey: ['saveButton'],
    queryFn: async () => {
      const result = await storage.getImages('photocard/photocardMain/save');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (saveButton) {
      storage.preloadImgs(saveButton);
    }
  }, [saveButton]);

  return (
    <>
      {saveButton &&
        <SaveButton
          onClick={handleSaveImg}
          $imgurl={saveButton[0]}
        >
          저장
        </SaveButton>
      }
    </>
  );
}

