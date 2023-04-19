// import axios from 'axios';
// import { ObjectId } from 'bson';
import { proxy, useSnapshot, subscribe } from 'valtio';
// import userState from './user';
import { derive } from 'valtio/utils';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { bindProxyAndYMap } from 'valtio-yjs';
import AssetsState from './assets';
// bind them
const state = proxy({
  stages: [
    {
      title: 'Asignar Entrevista',
      users: [],
    },
    { title: 'Asistencia Entrevista', users: [] },
    { title: 'Evaluación', users: [] },
    { title: 'Capacitaciones', users: [] },
    { title: 'Prueba Transmision', users: [] },
    { title: 'Fotografía', users: [] },
  ],
});
export const makeItReal = () => {
  const ydoc = new Y.Doc();

  const websocketProvider = new WebsocketProvider(
    'ws://localhost:1234',
    'funnel',
    ydoc
  );
  // create a Y map
  const ymap = ydoc.getMap('mymap');
  bindProxyAndYMap(state, ymap);
};
export const initialAssign = () => {
  state.stages[0].users = AssetsState.users.map((value) => {
    return { _id: value._id, info: value.info };
  });
};
export const getStageList = (index) => {
  return state.stages[index];
};
export const setStages = (stages) => {
  stages.forEach((element) => {
    element.users = userState.users.filter((value) =>
      element.users.includes(value._id)
    );
    // console.log(state.stages[index].users.length);
  });

  state.stages = stages;
};
export const setStageList = (index, elements) => {
  state.stages[index].users = elements.map((value) =>
    AssetsState.users.find((user) => user._id == value)
  );
  console.log(state.stages[index].users.length);
};
export const useNewFunnel = () => useSnapshot(state);

export default state;
