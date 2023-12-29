import React from 'react';
import { useAppDispatch } from '../../hook/reduxHook';
import { memberUpdated } from '../../reducers/memberSlice';

const members = ['irene', 'seulgi', 'wendy', 'joy', 'yeri'];

export default function MemberPanel() {
  const dispatch = useAppDispatch();

  const handleMemberClick = (value: string) => {
    dispatch(memberUpdated(value));
  };

  return (
    <section>
      {members.map((member) => (
        <button
          key={member}
          onClick={() => handleMemberClick(member)}
        >
          {member}
        </button>
      ))}
    </section>
  );
}

