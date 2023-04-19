import { useState, useRef } from "preact/hooks";
import { useAssets, getFollowsByRoom } from "vStore/assets";
import Overlay from "components/Overlay";
import NewSession from "components/RoomFollow/newSession";
import FullRoomFollow from "components/RoomFollow/fullRoomFollow";
import FollowInfo from "components/RoomFollow/followInfo";
import RoomOccupation from "components/newRoom/RoomOccupation";
import styles from "./admin.module.css";
export default function RoomsFull({ data }) {
  const [filter, setFilter] = useState("all");
  const [selectedFollow, setSelectedFollow] = useState();
  const { users, roomFollow } = useAssets();
  // const [flinch, setFlinch] = useState(false);
  const { filteredFollows, actualFollow, lastFollow } = getFollowsByRoom(
    data._id,
    roomFollow
  );
  const ol = useRef();
  const ol2 = useRef();
  return (
    <div style="min-height:100%;max-height: 100%; overflow-x:hidden;display:flex;flex-direction:column;">
      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
      <Overlay title="NUEVA SESION" ref={ol}>
        <NewSession
          defaultRoom={data}
          onFinish={(follow) => {
            //setFollow([]);
            ol.current?.close();
            setSelectedFollow(follow);
            ol2.current.open();
            //neo.ref.current.close();
          }}
        />
      </Overlay>
      <Overlay title="SEGUIMIENTO SESION" ref={ol2}>
        {selectedFollow && (
          <FullRoomFollow
            follow={selectedFollow}
            // onFlinch={() => setFlinch(Math.random(2))}
            onFinish={() => ol2.current.close()}
          />
        )}
      </Overlay>
      <div style="background:rgba(20,20,20,0.6);backdrop-filter:blur(10px);">
        <RoomOccupation
          data={data}
          onFollowClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedFollow(actualFollow);
            ol2.current.open();
          }}
        />
        <div style="z-index:1000;border-bottom:2px solid rgb(40,40,40);padding:5px;">
          <div style="display:flex;gap:10px;">
            <button
              class={actualFollow && "disabled"}
              disabled={actualFollow}
              onClick={() => {
                ol?.current.open();
              }}
            >
              (+) SEGUIMIENTO
            </button>
            {/* <div style="flex:1;"> */}
            {/*   <div>{'ORDENAR POR'}</div> */}
            {/*   <select style="width:100%;"> */}
            {/*     <option>Inicio estadia</option> */}
            {/*     <option>Fin estadia</option> */}
            {/*     {/1* <option>USUARIO</option> *1/} */}
            {/*   </select> */}
            {/* </div> */}
            {false && (
              <div style="flex:1;">
                <select
                  style="width:100%;"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="actual">Actualmente Activos</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style="flex:1;width:100%">
        <div
          style="
          position:sticky;
          top:0px;padding:5px;
          background:rgb(10,10,10);
          border-bottom:2px solid rgb(40,40,40);
          "
        >
          OTROS SEGUIMIENTOS
        </div>
        {filteredFollows
          ?.filter(
            (follow) => follow._id !== (actualFollow?._id || lastFollow?._id)
          )
          .sort(
            (a, b) =>
              new Date(
                b.status ? b.status[b.status.length - 1].utc : b.creation.utc
              ) -
              new Date(
                a.status ? a.status[a.status.length - 1].utc : a.creation.utc
              )
          )
          .map((follow) => {
            return (
              <div
                style="width:100%;"
                class={styles.asset}
                onClick={() => {
                  setSelectedFollow(follow);
                  ol2.current.open();
                }}
              >
                <FollowInfo follow={follow} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
//   <div style="flex:1;overflow-y:auto;">
//     {data?.stays?.length > 0 ? (
//       [...data.stays]
//         .sort((a, b) => (b.range[0] < a.range[0] ? -1 : 1))
//         .map((stay) => {
//           const fromStart = moment(stay.range[0]).diff(
//             moment().format("YYYY-MM-DD"),
//             "days"
//           );
//           const toEnd = moment(stay.range[1]).diff(
//             moment().format("YYYY-MM-DD"),
//             "days"
//           );
//           if (
//             filter == "all" ||
//             (filter == "actual" && fromStart <= 0 && toEnd >= 0)
//           ) {
//             const user = users.find((user) => user._id == stay.user);
//             return (
//               <div style="gap:5px;display:flex;flex-direction:column;padding:5px;border-bottom:solid 2px rgb(20,20,20);">
//                 {/* {JSON.stringify(user?.userInfo.name)} */}
//                 <div>
//                   <UserInfo user={user} see={true} />
//                   {/* <button>{'VER USUARIO'}</button> */}
//                 </div>
//                 <div class="group">
//                   <AssetDisplay
//                     asset={stay}
//                     section={"stay"}
//                     controls={true}
//                   >
//                     <StayInfo stay={stay} />
//                   </AssetDisplay>
//                 </div>
//                 {/* {stay.user} */}
//                 {/* {user.userInfo} */}
//                 {/* <pre> STAY {JSON.stringify(stay, null, 2)}</pre> */}
//               </div>
//             );
//           }
//         })
//     ) : (
//       <div
//         style="align-items:center;display:flex;flex:1;gap: 10px;
// flex-wrap: wrap;
// align-content: center;
// justify-content: flex-start;
// flex-direction: row;"
//       >
//         {false &&
//           data.inventory &&
//           data.inventory.map((item) => {
//             return (
//               <div
//                 style="
//    background:rgba(10,10,30,0.8);
//    display:flex;
//       font-size:1.2rem
//       flex-direction:row;
//       flex-wrap:wrap;
//       gap:5px;
//    padding:7px;
//    border-radius:5px;
//    align-items:center;"
//               >
//                 {item.name}
//               </div>
//             );
//           })}
//       </div>
//     )}
//   </div>
//   {/* <pre> {JSON.stringify(filteredFollows, null, 2)}</pre> */}
