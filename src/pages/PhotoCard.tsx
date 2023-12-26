import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';
import PhotoCardFooter from '../components/PhotoCardFooter/PhotoCardFooter';
import { useAppSelector } from '../hook/reduxHook';
import { selectExample } from '../reducers/exampleSlice';
import PhotoCardExample from '../components/PhotoCardExample/PhotoCardExample';
import { selectPanel } from '../reducers/panelSlice';
import PhotoCardPanel from '../components/PhotoCardPanel/PhotoCardPanel';
import PhotoCardImg from '../components/PhotoCardImg/PhotoCardImg';
import PhotoCardSave from '../components/PhotoCardSave/PhotoCardSave';

export default function PhotoCard() {
  const navigate = useNavigate();
  const showExample = useAppSelector(selectExample);
  const openPanel = useAppSelector(selectPanel);

  const saveTargetRef = useRef<HTMLElement | null>(null);
  console.log(saveTargetRef.current);

  return (
    <section>
      {openPanel || (
        <>
          <Back navigate={navigate} />
          <h1>포토카드 꾸미기</h1>
          <PhotoCardSave saveTargetRef={saveTargetRef} />
        </>
      )}
      <PhotoCardImg saveTargetRef={saveTargetRef} />
      {showExample && <PhotoCardExample />}
      {openPanel || <PhotoCardFooter />}
      {openPanel && <PhotoCardPanel />}
    </section>
  );
}

