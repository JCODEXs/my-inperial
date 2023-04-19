import { useAssets, getFollowsByRoom } from "vStore/assets";
import FollowInfo from "../RoomFollow/followInfo";
// import { useOverlays } from "vStore/overlays";
export default function RoomOccupation({ data, onFollowClick }) {
  const { roomFollow } = useAssets();
  const { actualFollow, lastFollow } = getFollowsByRoom(data._id, roomFollow);
  return (
    <div
      style="
      display:flex;
      flex-direction:column;
      padding:10px;
      gap:10px;"
    >
      {/* <pre>{JSON.stringify(filteredFollows,null,2)}</pre> */}
      <div style="display:flex;flex:1;align-items:center;">
        <div style="display:flex;flex-direction:column;align-items:flex-start;margin-right:0.2rem">
          <div
            style={`text-align:left; width: 200px; background:${
              actualFollow ? "rgba(60,5,30)" : "rgba(5,50,40)"
            };gap:0.3rem;border-radius:5px;padding: 0.2rem;
             font-size:120%; margin:0.1rem;`}
          >
            {`🚪 ${data.info.name} ${actualFollow ? "OCUPADA" : "DISPONIBLE"}`}
          </div>
        </div>
        {/* <img
      style="max-height:100%;max-width:110px;transform-origin:center right;transition:all 0.1s ease-in-out;"
      src="/room1.png"
    /> */}
      </div>
      {(actualFollow || lastFollow) && (
        <div
          class={`actualFollow ${onFollowClick && "actualFollowHover"}`}
          style="
          filter: drop-shadow(0 0 0.3rem black);
          border:2px solid rgba(20,20,20,1);
          border-radius:10px;"
          onClick={(e) => {
            typeof onFollowClick === "function" && onFollowClick(e);
          }}
        >
          <FollowInfo follow={actualFollow || lastFollow} />
        </div>
      )}
      {false && (
        <div
          style="align-items:center;
        display:flex;
        flex:1;
        gap: 10px;
        flex-wrap: wrap;
        align-content: center;
        justify-content: flex-end;
        flex-direction: row;
        margin-bottom:5px"
        >
          {false && (
            <div
              style="
            color:rgba(40,20,50,2);
            display:flex;
            flex-direction:column;
            flex:1;gap:10px;font-size:0.8rem; 
            padding:0.5rem"
            >
              {data.inventory.find((item) => item.name === "sabanas")
                ? "SABANAS LIMPIAS"
                : "ARREGLAR HABITACION"}
              {/* <div>{`Capacidad ${RoomFollow.info?.locations} personas`}</div> */}
              {/* <div>{`Precio normal $ ${RoomFollow.info.defaultPrice}`}</div> */}
            </div>
          )}
          {false && (
            <div
              style="
			    display:flex;
          font-size:80%;
          flex-direction:row;
          flex-wrap:wrap;
          gap:5px;
			    align-items:center;
          padding:5px;
          "
            >
              {data.inventory?.map((item) => {
                return (
                  <div
                    style="
			    border-radius:5px;
			    background:rgba(10,10,30,0.8);
                  padding:5px;
                "
                  >
                    {item.name}
                    <div>{item._id}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
//const {roomFollow}=useAssets();
// const rooms=roomFollow.find((room)=>{
//     room.roomNumber=="208"})
//console.log("roomfollower")
// const { time } = useTime();
// const dateOptions = {
//   weekday: "short",
//   year: "numeric",
//   month: "short",
//   day: "numeric",
//   hour: "2-digit",
//   minute: "2-digit",
// };
// const shortSDate = data.occupied?.times?.start
//   ? new Date(data.occupied?.times?.start).toLocaleDateString(
//       "es-ES",
//       dateOptions
//     )
//   : "Pendiente";
// const shortFDate = data.occupied?.times?.finish
//   ? new Date(data.occupied?.times?.finish).toLocaleDateString(
//       "es-ES",
//       dateOptions
//     )
//   : "Pendiente";
// const sessionTime = !data.occupied?.times?.finish
//   ? !data.occupied?.times?.start
//     ? "Pendiente"
//     : moment.utc(time.diff(data.occupied?.times?.start)).format("HH:mm:ss")
//   : Number.parseFloat(
//       (new Date(data.occupied?.times?.finish).getTime() -
//         new Date(data.occupied?.times?.start).getTime()) /
//         60000
//     ).toFixed(1);
// if (sessionTime > 60) {
//   var sessionHours = (sessionTime / 60).toFixed(0);
//   var sessionMinutes = (sessionHours % 60).toFixed(1);
// } else {
//   sessionHours = 0;
//   sessionMinutes = sessionTime;
// }
