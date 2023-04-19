import { proxy, useSnapshot } from "valtio";
import { derive } from "valtio/utils";
import gsap from "gsap";
import { subscribeKey } from "valtio/utils";
const state = proxy({
  listMode: "list",
  mosaicAvailable: false,
  collapsedMode: false,
  chart: false,
  blurred: true,
  debug: false,
});
derive(
  {
    actualMode: (get) =>
      get(state).mosaicAvailable
        ? get(state).listMode
        : typeof window == "object" && window.innerWidth >= 1500
        ? "mosaic"
        : "list",
  },
  {
    proxy: state,
  }
);
subscribeKey(state, "chart", () =>
  gsap.to("#chart_cont", {
    height: state.chart ? "80vh" : "0px",
    duration: 0.2,
  })
);
export const toggleBlur = () => {
  state.blurred = !state.blurred;
};
export const toggleDebug = () => {
  state.debug = !state.debug;
};
export const toggleChart = () => {
  state.chart = !state.chart;
};
export const closeChart = () => {
  state.chart = false;
};
export const setChart = (chart) => {
  state.chart = chart;
};
export const openChart = () => {
  state.chart = true;
};
const handleResize = () => {
  console.log("resize");
  state.mosaicAvailable =
    window.innerWidth >= 1000 && window.innerWidth <= 2000;
};
if (typeof window == "object") {
  handleResize();
  window.addEventListener("resize", handleResize);
}
export const setMode = (mode) => {
  state.listMode = mode;
};
export default state;
export const useUi = () => useSnapshot(state);
