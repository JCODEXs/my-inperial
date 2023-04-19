import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import { useEffect } from "react";
import { useLogin, logOut } from "vStore/login";
import "react-toastify/dist/ReactToastify.css";
import styles from "./admin.module.css";
import Chat from "components/Chat";
localStorage.log = "true";
// import { uploadRoom } from "vStore/newRoom";
import Overlays from "./overlays";
import MainMenu from "./mainMenu.js";
import MainList from "./mainList.js";
import SideSection from "./sideSection.js";
import TopBar from "./topBar.js";
import TestReal from "./testReal.js";
import { ToastContainer, toast } from "react-toastify";
import { autoCreateModelsUser } from "vStore/assets";
export default function Admin({}) {
  // const [temp, setTemp] = useState(false);
  // const [href, setHref] = useState("https://www.livejasmin.com/en/girls/#!");
  // const assets = {};
  // const section = 'nada';
  // const del = useRef();
  // const [deleteShown, setDeleteShown] = useState(false);
  // const assets = useAssets();
  const { user } = useLogin();
  // useEffect(async () => {
  //   // requestJasmin();
  //   if (user.log.auth == "admin") {
  //     requestGlobal();
  //     // requestStats("2023-01-04");
  //   }
  // }, []);
  // const model = live.find((model) => model.displayName == selected);
  // const upperValidation =
  //   router.query.section == 'stats' ||
  //   router.query.section == 'calendar' ||
  //   router.query.section == 'wall';
  // useEffect(() => {
  //   if (chart) {
  //     router.push(`/admin?section=${toggle}`, undefined, {
  //       shallow: true,
  //     });
  //   }
  // }, [toggle]);
  // useEffect(() => {
  //   if (!upperValidation) {
  //     chart && closeChart();
  //     router.query.section && setSection(router.query.section);
  //   } else {
  //     if (!chart) {
  //       openChart();
  //     }
  //     main.current?.close();
  //     setToggle(router.query.section);
  //   }
  //   // The counter changed!
  // }, [router.query.section]);
  // useEffect(() => {
  //   // setSection(router.query.modal);
  //   if (!router.query.modal) {
  //     main.ref?.current.close();
  //     neo.ref?.current.close();
  //   } else {
  //     if (router.query.modal == 'new') {
  //       neo.ref?.current.open();
  //     } else if (router.query.modal == 'main') {
  //       main.ref?.current.open();
  //     }
  //     if (
  //       router.query.section == 'users' &&
  //       router.query.modal == 'main' &&
  //       router.query.id
  //     ) {
  //       setSelected(router.query.id);
  //     }
  //   }
  //   // The counter changed!
  // }, [router.query.modal]);
  // ussssssLayoutEffect(() => {
  //   requestGlobal();
  // }, []);
  useEffect(() => {
    // alert(router.query.section);
    // if (router.query.section != 'stats' && router.query.section != 'calendar') {
    //   setSection(router.query.section);
    // }
    // gsap.registerPlugin(Draggable);
    // Draggable.create('#viewport', {
    //   type: 'scroll',
    //   inertia: true,
    //   allowEventDefault: true,
    //   minimumMovement: 15,
    //   dragClickables: true,
    //   onPress: closeChart,
    // });
    // var isec = 0;
    // let auto;
    // setInterval(() => {
    //   // auto = setSection(Object.keys(sectionsUI)[isec]);
    //   if (isec == Object.keys(sectionsUI).length - 1) {
    //     isec = 0;
    //   } else {
    //     isec++;
    //   }
    // }, 3000);
    // gsap.to("#viewport", { delay: 0, duration: 1, opacity: 1 });
    // gsap.to('#title', { delay: 2.5, duration: 0.8, scale: '1', y: 0, x: 0 });V
    // gsap.to('#headMenu', {
    //   delay: 3,
    //   padding: '5px',
    //   duration: 0.5,
    //   background: 'black',
    //   minHeight: '5%',
    // });
    // return () => {
    //   clearInterval(auto);
    // };
  }, []);
  // useEffect(() => {
  //   if (chart) {
  //     router.push(`/admin?section=${toggle}`, undefined, {
  //       shallow: true,
  //     });
  //   } else if (!upperValidation) {
  //     router.push(`/admin?section=${section}`, undefined, {
  //       shallow: true,
  //     });
  //   }
  // }, [chart]);
  //
  //
  //
  //
  //
  useEffect(async () => {
    // autoCreateModelsUser();
  }, []);
  return (
    user?.info && (
      <div
        class={styles.main}
        style="
  box-shadow: 0 0 0 2px rgba(40, 40, 40, 0.8);
margin:auto;
          min-width: min(100%,1400px);
          max-width: min(100%,1400px);
        "
      >
        {false && user.log.auth == "dev" && <TestReal />}
        <ToastContainer position="bottom-left" autoClose={3000} />
        <TopBar />
        <Overlays />
        <MainMenu />
        <MainList />
        <SideSection />
        {false && <Chat />}
      </div>
    )
  );
}
// <button
//   style={{ float: "right" }}
//   onClick={(e) => {
//     e.stopPropagation();
//     setToggle("template");
//     openChart();
//   }}
// >
//   TEM
// </button>
// <button
//   style={{ float: "right" }}
//   onClick={(e) => {
//     e.stopPropagation();
//     setToggle("funnel");
//     openChart();
//   }}
// >
//   FUN
// </button>
// <button
//   style={{ float: "right" }}
//   onClick={(e) => {
//     e.stopPropagation();
//     setToggle("calendar");
//     openChart();
//   }}
// >
//   🗓️
// </button>
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// {false && (
//   <div
//     style="
//     position:absolute;
//     top:0px;
//     left:0px;
//     background:rgba(10,10,10,0.4);
//     backdrop-filter:blur(5px);
//     z-index:9900;
//     width:100vw;
//     height:100vh;
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     flex-direction:column;
//     gap:10px;
//     "
//   >
//     <img style="height:60px;" src="loading.gif" />
//     {"Un momento porfavor, preparando datos de LiveJasmin"}
//   </div>
// )}
