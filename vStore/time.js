import { proxy, useSnapshot, subscribe } from 'valtio';
import moment from 'moment-timezone';
import 'moment/locale/es';
moment.locale('es');
const lx = 'Europe/Luxembourg';
const state = proxy({
  time: moment(),
  timeLx: moment().tz(lx),
});
export default state;
export const updateTime = () => {
  setInterval(() => {
    state.time = moment();
    state.timeLx = moment().tz(lx);
  }, 2000);
};
updateTime();
export const useTime = () => useSnapshot(state);
