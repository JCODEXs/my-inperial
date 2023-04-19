import { proxy, useSnapshot, subscribe } from 'valtio';
import * as awarenessProtocol from 'y-protocols/awareness.js';
import * as Y from 'yjs';
// import { WebsocketProvider } from 'y-websocket';
import { WebrtcProvider } from 'y-webrtc';
import { bindProxyAndYMap } from 'valtio-yjs';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoginState from './login';
import moment from 'moment';
let provider;
const state = proxy({
  templates: [],
});
// subscribe(state.message, () => events.emit('sup', ''));
// subscribe(state.users, () => {
//   populateRooms();
// });
export const addTemplate = (template) => {
  state.templates.push(template);
};
export const useTemplates = () => useSnapshot(state);
export default state;
