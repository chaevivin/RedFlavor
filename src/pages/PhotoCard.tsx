import React from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';
import styles from './PhotoCard.module.css';
import PhotoCardFooter from '../components/PhotoCardFooter/PhotoCardFooter';
import { useAppSelector } from '../hook/reduxHook';
import { selectExample } from '../reducers/exampleSlice';
import PhotoCardExample from '../components/PhotoCardExample/PhotoCardExample';
import { selectPanel } from '../reducers/panelSlice';
import PhotoCardPanel from '../components/PhotoCardPanel/PhotoCardPanel';

export default function PhotoCard() {
  const navigate = useNavigate();
  const showExample = useAppSelector(selectExample);
  const openPanel = useAppSelector(selectPanel);

  return (
    <section>
      {openPanel || (
        <>
          <Back navigate={navigate} />
          <h1>포토카드 꾸미기</h1>
          <button>저장</button>
        </>
      )}
      {showExample && <PhotoCardExample />}
      <img 
        src="/img/joy.png" 
        alt="joy" 
        className={styles.img} 
      />
      {openPanel || <PhotoCardFooter />}
      {openPanel && <PhotoCardPanel />}
    </section>
  );
}

