import { useUi, closeChart } from "vStore/ui";
import { useSelected, setSection, setSelected } from "vStore/selected";
import dynamic from "next/dynamic";
import styles from "./admin.module.css";

import { Virtuoso } from "react-virtuoso";

const Jasmin = dynamic(() => import("./jasmin"), {
  loading: () => (
    <div
      style="display:flex;
      padding:20px;
      flex-direction:column;
      max-height:100%;
      overflow;hidden;
      "
    >
      <b style="text-align:center;">{"Loading Jasmin Models..."}</b>
      <img style="height:100px;object-fit:contain;" src="/loading.gif" />
      <img style="height:420px;object-fit:contain;" src="/lj_logo.png" />
    </div>
  ),
  ssr: true,
});
// import Jasmin from "./jasmin";
import AssetsDisplay from "./assetsDisplay";
import { useEffect, useLayoutEffect } from "preact/hooks";
import gsap from "gsap";
export default function MainList() {
  const { chart } = useUi();
  const { section } = useSelected();
  useLayoutEffect(async () => {
    // await gsap.to("viewport", { duration: 0.1, opacity: 0 });
    // await gsap.to("viewport", { duration: 0.1, opacity: 1 });
  }, [section]);
  return (
    <>
      {!chart && (
        <div
          onClick={(e) => {
            chart && e.stopPropagation();
            chart && e.preventDefault();
            closeChart();
          }}
          style={`position:relative;${chart ? "filter:blur(10px);" : ""}
display:flex;
flex-direction:column;
align-content:stretch;
align-items:stretch;
flex:1;
overflow:hidden;
margin:auto;
          min-width: min(100%,1000px);
          max-width: min(100%,1000px);
`}
        >
          {false && (
            <button
              style="z-index:100;position:absolute;bottom:5px;right:10px;"
              onClick={() => {
                document.getElementById("viewport").scrollTo(0, 0);
              }}
            >
              UP
            </button>
          )}

          {section == "jasmin" ? <Jasmin /> : <AssetsDisplay />}
        </div>
      )}
    </>
  );
}
