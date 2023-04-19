import { proxy, useSnapshot, ref, subscribe } from "valtio";

const state = proxy({
  maximized: false,
  checkout: {},
  neo: {},
  byDay: {},
  main: {},
  user: {},
});
export const setOverlay = (name, reference) => {
  state[name].ref = ref(reference);
};
export const setCheckoutStay = (stay, isCheckin) => {
  state.checkout.stay = stay;
  state.checkout.isCheckin = isCheckin;
};
export const setDayRoom = (day, room) => {
  state.byDay.day = day;
  state.byDay.room = room;
  state.byDay.ref.current.open();
};
export const setDay = (day) => {
  state.byDay.day = day;
};

export const setRoom = (room) => {
  state.byDay.room = room;
};
export const setMaximized = (value) => {
  state.maximized = value;
};
export default state;
export const useOverlays = () => useSnapshot(state);
