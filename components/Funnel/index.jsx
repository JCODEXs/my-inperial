import React, { createRef, useEffect, useRef, useState } from 'react';
// import { Sortable, MultiDrag, AutoScroll } from 'sortablejs';
// import { useUsers } from 'vStore/user';
import { useNewFunnel, initialAssign, makeItReal } from 'vStore/funnel';
import Stage from './Stage';
import { useAssets } from 'vStore/assets';
export default function Funnel() {
  const { users } = useAssets();
  const { stages } = useNewFunnel();
  useEffect(() => {
    // makeItReal();
  }, []);
  useEffect(() => {
    initialAssign();
  }, [users]);
  return (
    <div
      style="
        display: flex;
        overflow-x: scroll;
	    margin:auto;
	    height:100%;
      "
    >
      {users &&
        stages?.map((value, index) => {
          return <Stage stage={value} index={index} />;
        })}
    </div>
  );
}
