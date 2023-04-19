import { proxy, useSnapshot, subscribe } from "valtio";
// import * as awarenessProtocol from 'y-protocols/awareness.js';
import * as Y from "yjs";
// import { WebsocketProvider } from 'y-websocket';
import { WebrtcProvider } from "y-webrtc";
import { bindProxyAndYMap } from "valtio-yjs";
import LoginState from "vStore/login";
// import EventEmitter from 'events';
const state = proxy({
  online: [],
});
export const makeChatReal = (user) => {
  console.log("makingChatReal");
  const ydoc = new Y.Doc();
  new WebrtcProvider(
    "imperial-test-chat9",
    ydoc
    // {
    //   signaling: ['wss://signaling.yjs.dev'],
    // }
    //  {
    //     filterBcConns: false,,
    //     awareness: new awarenessProtocol.Awareness(ydoc),
    // }
  );
  // state.emmiter.on('sup', (subscribe) => toast.success(`🪄 Nueva magia creada`, {
  //     theme: 'dark'
  // }));
  // create a Y map
  const ymap = ydoc.getMap("mychat");
  //bindProxyAndYMap(state, ymap);
  console.log(user);
  putOnline(user);
};

export const putOnline = (user) => {
  // alert("putonline");
  // state.online = [...new Set([...state.online, LoginState.user._id])];
  state.online.push(user?._id);
};

export const dechat = () => {
  state.online = state.online.filter((onl) => onl !== LoginState.user._id);
};

export const useChat = () => useSnapshot(state);
export default state;
