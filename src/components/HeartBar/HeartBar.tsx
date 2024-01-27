import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook';
import { heartGauge, heartReset, heartValue } from '../../reducers/heartSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { memberValue } from '../../reducers/memberSlice';

const HeartBox = styled.div<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(100% / 6.5);
  height: calc(100% / 13);
  position: absolute;
  top: 8.8%;
  left: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`

const HeartImg = styled.img`
  width: calc(100% / 6.7);
  margin: 0.1rem;
`

export default function HeartBar() {
  const heartNum = useAppSelector(heartValue);
  const heartRefs = useRef<HTMLImageElement[]>([]);
  const memberUpdated = useAppSelector(memberValue);
  const dispatch = useAppDispatch();

  const storage = new GetImgStorage();
  const { data: myroomHeart } = useQuery({
    queryKey: ['myroomHeart'],
    queryFn: async () => {
      const result = await storage.getImages('myroom/main/heart');
      return result;
    },
    staleTime: 10000
  });

  useEffect(() => {
    if (myroomHeart) {
      storage.preloadImgs(myroomHeart);
    }
  }, [myroomHeart]);

  useEffect(() => {
    if (myroomHeart) {
      heartRefs.current.forEach((heartRef) => {
        const id = parseInt(heartRef.id);
        if (id === heartNum) {
          heartRef.src = myroomHeart[1];
        }
      });
    }
  }, [heartNum, myroomHeart]);

  // modal에서 멤버 변경하면 heart state = 0
  useEffect(() => {
    if (myroomHeart) {
      heartRefs.current.forEach((heartRef) => {
        heartRef.src = myroomHeart[0];
      });
      dispatch(heartReset());
    }
  }, [memberUpdated]);

  return (
    <>
      {myroomHeart &&
        <HeartBox $imgurl={myroomHeart[2]}>
          {[1, 2, 3, 4, 5].map((v) => (
            <HeartImg 
              ref={(ref) => (ref && (heartRefs.current[v - 1] = ref))}
              key={v}
              id={`${v}`}
              alt='heart'
              src={myroomHeart[0]}
            />
          ))}
        </HeartBox>
      }
    </>
  );
}


