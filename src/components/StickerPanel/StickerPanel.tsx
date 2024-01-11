import { useQuery } from '@tanstack/react-query';
import ImgStorage from '../../api/getImgStorage';
import { fabric } from 'fabric';
import { useAppSelector } from '../../hook/reduxHook';

interface StickerPanelProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

export default function StickerPanel({ fabricCanvasRef }: StickerPanelProps) {
  const storage = new ImgStorage();
  const { isLoading, isError, data: stickerList } = useQuery({
    queryKey: ['stickerList'], 
    queryFn: async () => { 
        const result = await storage.getImages('photocard/photocardDetail/sticker');
        return result;
    },
    staleTime: 10000,
  });

  const handleAddClick = (url: string) => {
    if (fabricCanvasRef.current) {
      try {
        fabric.Image.fromURL(url, (img) => {
          img.set({ left: 100, top: 100, scaleX: 0.3, scaleY: 0.3, selectable: true });
          fabricCanvasRef.current?.add(img);
          fabricCanvasRef.current?.renderAll();
        })
      } catch (error) {
        console.log('sticker panel handleAddClick error ' + error);
      }
    }
  }

  if (isLoading) {
    return <p>Loading... Please wait.</p>;
  }

  if (isError) {
    return <p>Sticker Panel Error</p>;
  }

  if (!stickerList) {
    return <p>No sticker data available</p>;
  }

  return (
    <article>
      {stickerList.map((url, index) => (
        <button key={index} onClick={() => handleAddClick(url)}>
          <img key={index} src={url} alt={`sticker list ${index}`} />
        </button>
      ))}
    </article>
  );
}

