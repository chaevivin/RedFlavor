import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { database } from '../../api/firebase';

interface stateType {
  [x: string]: any;
}

export default function TrackList() {
  const [tracklist, setTracklist] = useState<stateType>();

  useEffect(() => {
    async function getTrackList () {
      const q = await getDocs(collection(database, "trackList"));
      const data = q.docs.map((doc) => ({
        ...doc.data()
      }));
      setTracklist(data);
    }
    getTrackList();
  }, [])
  
  return (
    <ul>
      {tracklist && tracklist.map((track: any, idx: any) => (
        <li key={track.title}>
          <span>{idx + 1}. {track.sing} - {track.title}</span>
          <span>{track.length}</span>
        </li>
      ))}
    </ul>
  );
}

