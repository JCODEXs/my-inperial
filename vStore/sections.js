import All from "components/Admin/elements/all";
import AdqPay, { adqPayElem } from "components/Admin/elements/adqPay";
import Stay, { stayElem } from "components/Admin/elements/stay";
import Notes, { noteElem } from "components/Admin/elements/notes";
import RegisterForm from "components/registerForm";
import NewRoom from "components/newRoom";
import RoomOccupation from "components/newRoom/RoomOccupation";
// import NewMarker from 'components/newMarker';
import NewProduct from "components/newProduct";
import UsersFull from "components/Admin/usersFull";
import UserInfo from "components/Admin/userInfo";
// import WallBoard from 'components/Admin/wallboard';
import Days from "components/Admin/days";
import FullJasmin from "components/Admin/FullJasmin";
// import SuperEditor from 'components/Admin/fullJasmin';
import RoomsFull from "components/Admin/roomsFull";
import Funnel from "components/Funnel";
import ModuleForm from "components/EvaluationTemplate/ModuleForm";
import Choose from "components/EvaluationTemplate/choose";
import { useAssets } from "vStore/assets";
import { useJasmin } from "vStore/jasmin";
import { useLogin } from "vStore/login";
import TrakingSheets from "components/EvaluationTemplate/trackingSheets";
import NewSession from "components/RoomFollow/newSession";
import FullRoomFollow from "components/RoomFollow/fullRoomFollow";
import FullPress from "components/Admin/FullPress";
import Gallery from "components/Admin/FullPress/gallery";
import rehypeRaw from "rehype-raw";
// import dynamic from 'next/dynamic';
// import Funnel from './Funnel';
// const MainStats = dynamic(() => import("components/Admin/mainStats"), {
//   loading: () => "Loading...",
//   ssr: false,
// });
import dynamic from "next/dynamic";
// const SuperEditor = dynamic(() => import("components/SuperEditor"), {
//   loading: () => <p>An editor is loading</p>,
//   ssr: false,
// });
import SuperEditor from "components/SuperEditor";
const TempStats = dynamic(() => import("components/Admin/tempStats"), {
  loading: () => "Loading...",
  ssr: true,
});
import ReactMarkdown from "react-markdown";
import FollowInfo from "components/RoomFollow/followInfo";
import { useOverlays } from "./overlays";
import { toggleBlur, useUi } from "./ui";
import { master } from "vStore/login";
export const sideSections = [
  {
    name: "stats",
    elem: <TempStats />,
    // <MainStats />,a
  },
  {
    name: "calendar",
    elem: <Days />,
  },
  { name: "funnel", elem: <Funnel /> },
  // {
  //   name: 'stats',
  //   elem: (
  //     <div
  //       id="chart_visits"
  //       style={{
  //         position: 'absolute',
  //         left: '50%',
  //         transform: 'translateX(-50%)',
  //         minHeight: '62vh',
  //         height: '100%',
  //         maxHeight: '100%',
  //         width: '100%',
  //         maxWidth: '800px',
  //         margin: 'auto',
  //       }}
  //     />
  //   ),
  // },
];
export const sections = {
  all: {
    label: "💠 TODO",
    content: (data) => <All user={data} />,
  },
  adq: {
    label: "🛍️  COMPRAS",
    content: (data) => <AdqPay type="adq" user={data} />,
    elem: adqPayElem,
    background: "#001F1A",
  },
  pay: {
    label: "💵 PAGOS",
    content: (data) => <AdqPay type="pay" user={data} />,
    elem: adqPayElem,
    background: "#21214a",
  },
  stay: {
    label: "🛌 ESTADIAS",
    content: (data) => <Stay user={data} />,
    elem: stayElem,
    background: "rgb(20,20,20)",
  },
  notes: {
    label: "📝 NOTAS",
    content: (data) => <Notes user={data} />,
    elem: noteElem,
    background: " #585345",
  },
  // checkout: {
  //   elem: (data) => <div>CHECKOUT</div>,
  //   background: 'black',
  // },
};
{
  /* <UsersFull data={data} /> */
}
export const sectionsUI = {
  jasmin: {
    label: "💃",
    title: () => {
      const { blurred } = useUi();
      return (
        <>
          {"JASMIN MODEL"}
          <button
            style="margin-left:15px;"
            class={!blurred && "tab_selected"}
            onClick={(e) => {
              e.stopPropagation();
              toggleBlur();
            }}
          >
            🕶️
          </button>
        </>
      );
    },
    form: <RegisterForm />,
    ui: (data) => <div style="flex:1;">{/* <UserInfo user={data} /> */}</div>,
    fullUI: (data) => data && <FullJasmin model={data} />,
    permission: ["admin", "model", "monitor"],
  },
  users: {
    label: "👥",
    title: "USUARIOS",
    form: <RegisterForm />,
    ui: (data) => (
      <div style="flex:1;">
        <UserInfo user={data} />
      </div>
    ),
    fullUI: (data) => data && <UsersFull />,
    permission: ["dev", "admin"],
  },
  rooms: {
    label: "🚪",
    title: "HABITACIONES",
    form: (
      <NewRoom
        onSuccess={() => {
          overlayNew.current.close();
        }}
      />
    ),
    ui: (data) => <RoomOccupation data={data} />,
    fullUI: (data) => {
      return data && <RoomsFull data={data} />;
    },
    permission: ["dev", "admin", "monitor"],
  },
  roomFollow: {
    label: "🛌",
    title: "Seguimiento Cuartos",
    form: <NewSession />,
    ui: (data) => <FollowInfo follow={data} />,
    fullUI: (data) => {
      const { main } = useOverlays();
      return (
        data && (
          <FullRoomFollow
            follow={data}
            onFinish={() => main.ref.current.close()}
          />
        )
      );
    },
    permission: ["admin", "dev", , "model"], //, "monitor"
  },
  shop: {
    disabled: true,
    label: "🛍",
    title: "PRODUCTOS",
    form: (
      <div style="padding:5px;">
        <NewProduct
          onSuccess={() => {
            overlayNew.current.close();
          }}
        />
      </div>
    ),
    ui: (data) => (
      <div style="flex:1;padding:10px;">
        <div>{data.info.name}</div>
        <div>$ {data.info.price}</div>
      </div>
    ),
    fullUI: (data) => (
      <div style="padding:10px;">
        <h2>VISTA NO DISPONIBLE</h2>
        <div>Información sobre el producto</div>
      </div>
    ),
    permission: ["admin"],
  },
  templates: {
    label: "🗃",
    title: "Registros",
    form: <ModuleForm />,
    ui: (data) => <TrakingSheets data={data} />,
    fullUI: (data) => data && <Choose template={data} />,
    permission: ["admin"],
  },
  news: {
    label: "📣",
    title: "NOTICIAS",
    form: <SuperEditor />,
    ui: (data) => {
      const { users } = useAssets();
      const { allPerformers } = useJasmin();
      const { user } = useLogin();
      return (
        <>
          {data.pinned && (
            <div style="position:absolute;top:0px;right:0px;z-index:10;transform:scale(100%);">
              📌
            </div>
          )}
          <div
            style="
          display:flex;
          flex-direction:column;
          width:100%;
          max-width:100%;
          max-height:400px;
          min-height:400px;
          overflow:hidden;
            position:relative;
          "
          >
            <div
              style="
            position:absolute;
            bottom:0px;
            left:0px;
            width:100%;
          max-width:100%;
            background:
            linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(10,10,10,0) 100%);            
            height:100px;
            display:flex;
            align-items:flex-end;
            justify-content:center;
            color:palegoldenrod;padding:10px;
            font-size:80%;
          z-index:2;
            "
            >
              VER MÁS
            </div>
            <div
              style="display:flex;flex-direction:column;
            padding:5px;
            border-bottom:1px solid rgba(40,40,40,0.6);
	    filter: drop-shadow(0 0 0.3rem black);
            "
            >
              <b
                style="
              font-size:140%;
            "
              >
                {data.title}
              </b>
              {master() && (
                <div
                  style="
		      display:flex;
		      flex-wrap:wrap;
		      justify-content:center;
		      gap:5px;
		      "
                >
                  {users
                    .filter((user) =>
                      data.toShare?.some((shared) => shared == user._id)
                    )
                    .map((user) => (
                      <div
                        class="userShared"
                        key={user._id}
                        style="
                "
                      >
                        {user.model
                          ? `💃 ${
                              allModels.find(
                                (model) => user.model.jasmin == model.screenName
                              )?.displayName
                            }`
                          : `🕴️ ${user.info.name}  ${user.info.surname}`}
                      </div>
                    ))}
                </div>
              )}
            </div>
            {data.media.length > 0 && <Gallery media={data.media} />}
            <div
              style="position:relative;
            padding:10px;
            border-top:1px solid rgba(40,40,40,0.6);            "
            >
              <div style="position:absolute;">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  children={data.press}
                />
              </div>
            </div>
          </div>
        </>
      );
    },
    fullUI: (data) => data && <FullPress data={data} />,
    permission: ["admin", "model", "monitor"],
  },
};
// places: {
//   label: '📍',
//   title: 'LUGARES',
//   form: (
//     <NewMarker
//       onSuccess={() => {
//         overlayNew.current.close();
//       }}
//     />
//   ),
//   ui: (data) => (
//     <div style="flex:1;">
//       <div>
//         📍
//         {data.info.name}
//         <div> {data.tags}</div>
//         <div> {data.info.descript}</div>
//         <div>{data.info.geo}</div>
//       </div>
//     </div>
//   ),
//   fullUI: (data) => (
//     <div style="padding:10px;">
//       <h2>VISTA PREVIA NO DISPONIBLE PARA ESTE DEMO</h2>
//       <div>
//         Aquí verás los productos y sus precios, podrás editar y gestionar el
//         'stock'
//       </div>
//     </div>
//   ),
// },
