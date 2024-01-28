import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '../../hook/reduxHook';
import { changeColor } from '../../reducers/changeColorSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled, { css } from 'styled-components';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { database } from '../../api/firebase';

interface stateType {
  [x: string]: any;
}

const brushClickedValue: boolean[] = Array.from({ length: 10 }, () => false);

const BrushContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 0;
`

const ButtonContainer = styled.li<{ $clicked: boolean }>`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
  border: solid 2px transparent;

  ${p => 
    p.$clicked &&
      css`
        border: solid 2px #d7899f;
        border-radius: 5px;
      `
  }
`

const BrushButton = styled.button<{ $imgurl: string | undefined }>`
  background-image: url(${p => p.$imgurl});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: calc(119px / 3);
  height: calc(113px / 3);
  padding: 0
`

export default function BrushType() {
  const dispatch = useAppDispatch();
  const [clicked, setClicked] = useState<boolean[]>(brushClickedValue);
  const [colorList, setColorList] = useState<stateType>();

  const storage = new GetImgStorage();
  const { data: brushList } = useQuery({
    queryKey: ['brushList'],
    queryFn: async () => {
      const result = await storage.getImages('photocard/photocardDetail/brushPanel');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60
  });

  useEffect(() => {
    if (brushList) {
      storage.preloadImgs(brushList);
    }
  }, [brushList]);

  const getColorList = useMemo(() => async () => {
    const q = await getDocs(query(collection(database, "brushColors"), orderBy("brushNum")));
    const data = q.docs.map((doc) => ({
      ...doc.data()
    }));
    setColorList(data);
  }, []);

  useEffect(() => {
    getColorList();
  }, [getColorList]);

  const handleColorClick = (index: number, colors: any) => {
    setClicked((prev) => prev.map((v, i) => (i === index ? !v : false)));
    dispatch(changeColor(colors));
  };

  return (
    <>
      {brushList && colorList && (
        <BrushContainer>
          {brushList.map((url, index) => (
            <ButtonContainer 
              key={index}
              $clicked={clicked[index]}
            >
              <BrushButton
                $imgurl={url}
                onClick={() => handleColorClick(index, colorList[index])}
              >
              </BrushButton>
            </ButtonContainer>
          ))}
        </BrushContainer>
      )}
    </>
  );
}

