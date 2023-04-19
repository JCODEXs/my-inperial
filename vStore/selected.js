// import { ObjectId } from 'bson';
import { proxy, useSnapshot, ref } from "valtio";
import gsap from "gsap";
const state = proxy({
  selected: undefined,
  section: "users",
  toggle: "stats",
});
export const setToggle = (toggle) => {
  state.toggle = toggle;
};
export const setSelected = (selected) => {
  state.selected = selected;
};
export const setSection = async (section) => {
  await gsap.to("#viewport", { duration: 0.1, opacity: 0 });
  state.section = section;
  await gsap.to("#viewport", { duration: 0.1, opacity: 1 });
};
export default state;
//-----------------------------------------------------------------
export const useSelected = () => useSnapshot(state);
// export const useChannels = () => snap().channels;
// export const useUsers = () => snap().users;
// export const relatedUsers = () => snap().relatedUsers;
// export const useProducts = () => snap().products;
