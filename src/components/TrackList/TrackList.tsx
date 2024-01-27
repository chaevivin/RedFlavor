import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useMemo, useRef, useState } from 'react';
import { database } from '../../api/firebase';
import { useAppSelector } from '../../hook/reduxHook';
import { nowValue } from '../../reducers/nowPlayingSlice';
import GetImgStorage from '../../api/getImgStorage';
import { useQuery } from '@tanstack/react-query';
import styled, { css } from 'styled-components';
import ListButtons from '../ListButtons/ListButtons';

interface stateType {
  [x: string]: any;
}

const Background = styled.div<{ $imgurl: string | undefined}>`
  background-image: url(${p => p.$imgurl});
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(1088px / 3);
  height: calc(1833px / 3);
  position: relative;
  color: #ffffff;
`

const ListContainer = styled.ul`
  margin: 0;
  position: absolute;
  top: 10%;
  left: 15.5%;
  font-size: 1rem;
  list-style: none;
  width: 245px;
  overflow: scroll;
  height: 170px;
  padding: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`

const List = styled.li<{ $nowPlaying: number; $trackNum: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.3rem 0;
  padding: 0.1rem 0.4rem;

  ${(p) => 
    p.$nowPlaying === p.$trackNum &&
      css`
        background-color: #f48daa;
        text-shadow: -1.5px 0 #da6486, 0 1.5px #da6486, 1.5px 0 #da6486, 0 -1.5px #da6486;
      `
  }
`

export default function TrackList() {
  const [tracklist, setTracklist] = useState<stateType>();
  const nowPlaying = useAppSelector(nowValue);

  // 플레이리스트 목록을 Database에서 받아옴
  const getTracklist = useMemo(() => async () => {
    const q = await getDocs(query(collection(database, "trackList"), orderBy("trackNum")));
      const data = q.docs.map((doc) => ({
        ...doc.data()
      }));
      setTracklist(data);
  }, []);

  useEffect(() => {
    getTracklist();
  }, [getTracklist]);

  const storage = new GetImgStorage();
  const { data: tracks } = useQuery({
    queryKey: ['tracks'],
    queryFn: async () => {
      const result = await storage.getImages('playlist/tracklist');
      return result;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (tracks) {
      storage.preloadImgs(tracks);
    }
  }, [tracks]);
  
  return (
    <>
      {tracks &&
        <Background $imgurl={tracks[0]}>
          <ListContainer>
            {tracklist && tracklist.map((track: any) => (
              <List
                key={track.trackNum}
                $nowPlaying={nowPlaying}
                $trackNum={track.trackNum}
              >
                <span>{track.trackNum}. {track.sing} - {track.title}</span>
                <span>{track.length}</span>
              </List>
            ))}
          </ListContainer>
          <ListButtons />
        </Background>
      }
    </>
  );
}