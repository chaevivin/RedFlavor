import React from 'react';
import { useAppDispatch } from '../../hook/reduxHook';
import { closeExample } from '../../reducers/exampleSlice';

export default function PhotoCardExample() {
  const dispatch = useAppDispatch();

  const handleXClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(closeExample());
  };

  return (
    <section>
      <button
        onClick={(e) => handleXClick(e)}
      >
        X
      </button>
      <img src="/img/joy.png" alt="photocard example" />
    </section>
  );
}

