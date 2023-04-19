import { proxy, useSnapshot, subscribe } from 'valtio';
import * as awarenessProtocol from 'y-protocols/awareness.js';
import * as Y from 'yjs';
import yws from 'y-websocket';
const { WebsocketProvider } = yws;
// import { WebrtcProvider } from 'y-webrtc';
import { bindProxyAndYMap } from 'valtio-yjs';
import axios from 'axios';
import ws from 'ws';
let provider;
const state = proxy({ test: 0 });
// subscribe(state.message, () => events.emit('sup', ''));
// subscribe(state.users, () => {
//   populateRooms();
// });
export const makeItReal = () => {
  const ydoc = new Y.Doc();
  // const websocketProvider = new WebsocketProvider(
  //   'wss://magia-bless.herokuapp.com:1234',
  //   'submit',
  //   ydoc
  // );
  provider = new WebsocketProvider('ws://localhost:8080', '', ydoc, {
    WebSocketPolyfill: ws,
  });
  // provider = new WebrtcProvider(
  //   'imperial-test-1234567890',
  //   ydoc
  //   // { WebSocketPolyfill: ws }
  //   //  {
  //   //     filterBcConns: false,
  //   //     awareness: new awarenessProtocol.Awareness(ydoc),
  //   // }
  // );
  console.log('provider', provider);
  // state.emmiter.on('sup', (subscribe) => toast.success(`🪄 Nueva magia creada`, {
  //     theme: 'dark'
  // }));
  // create a Y map
  const ymap = ydoc.getMap('mymap');
  bindProxyAndYMap(state, ymap);
};
// makeItReal();
export const useTest = () => useSnapshot(state);
export default state;
