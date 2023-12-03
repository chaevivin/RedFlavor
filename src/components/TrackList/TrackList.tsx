import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { database } from '../../api/firebase';
import { useAppSelector } from '../../hook/reduxHook';
import { nowValue } from '../../reducers/nowPlayingSlice';
import styles from './TrackList.module.css';

interface stateType {
  [x: string]: any;
}

// chrome violation: setTimeout handler took ...ms 해결
// 핸들러가 await 메서드를 가진 비동기 함수이면 메시지 표시 X
const sleep = (s: number) =>
  new Promise((p) => setTimeout(p, (s * 100) | 0));

export default function TrackList() {
  const [tracklist, setTracklist] = useState<stateType>();
  const nowPlaying = useAppSelector(nowValue);

  useEffect(() => {
    async function getTrackList () {
      // 이 작업을 많이 해야 한다면 전용 억제 메서드로 변경
      await sleep(1);
      const q = await getDocs(query(collection(database, "trackList"), orderBy("trackNum")));
      const data = q.docs.map((doc) => ({
        ...doc.data()
      }));
      setTracklist(data);
    }
    getTrackList();
  }, []);

  
  return (
    <ul>
      {tracklist && tracklist.map((track: any) => (
        <li 
          key={track.trackNum}
          className={nowPlaying === track.trackNum ? `${styles.nowPlaying}` : ''}
        >
          <span>{track.trackNum}. {track.sing} - {track.title}</span>
          <span>{track.length}</span>
        </li>
      ))}
    </ul>
  );
}