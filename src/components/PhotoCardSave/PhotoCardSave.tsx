import html2canvas from 'html2canvas';
import React from 'react';
import { saveAs } from 'file-saver';

interface PhotoCardSaveProps {
  saveTargetRef: React.MutableRefObject<HTMLElement | null>;
}

export default function PhotoCardSave({ saveTargetRef }: PhotoCardSaveProps) {

  const handleSaveImg = async () => {
    console.log(saveTargetRef.current);
    if (saveTargetRef.current) {
      try {
        const canvas = await html2canvas(saveTargetRef.current);
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

  return (
    <section>
      <button
        onClick={handleSaveImg}
      >
        저장
      </button>
    </section>
  );
}

