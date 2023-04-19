import { useJasmin } from "vStore/jasmin";
import {
  useAssets,
  getAsset,
  addRoomTemplate,
  getFollowsByRoom,
} from "vStore/assets";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import FollowForm from "./followForm";
export default function NewSession({ defaultRoom, onFinish = () => {} }) {
  const { activePerformers } = useJasmin();
  const { rooms, roomFollow } = useAssets();
  const [model, setModel] = useState();
  const [room, setRoom] = useState(defaultRoom);
  // const [items, setItems] = useState([]);
  const followForm = useRef();
  // const items = followForm.current?.items;
  // let items;
  // useEffect(() => {
  //   items = followForm.current?.items;
  // }, [followForm.current]);
  const foundRoom = {};
  const inSessionModels = roomFollow
    ?.filter(
      (value) => !value.status?.find((status) => status.key == "reviewFinish")
    )
    .map((value) => value.model); //["AlisonDurand", "AllisonLogan"];
  let models = activePerformers?.filter(
    (model) => !inSessionModels?.includes(model.screenName)
  );
  const inSessionRooms = rooms
    ?.filter((_room) => {
      const { actualFollow } = getFollowsByRoom(_room._id, roomFollow);
      return actualFollow;
    })
    ?.map((value) => value._id);
  let availableRooms = rooms?.filter(
    (room) => !inSessionRooms?.includes(room._id)
  );
  useEffect(() => {
    setRoom(defaultRoom);
  }, [defaultRoom]);
  const setRValue = (e) => {
    e.preventDefault();
    // if (e.target.style.opacity == 0.3) {
    //   e.target.style.opacity = 0.9;
    // } else {
    //   e.target.style.opacity = 0.3;
    // }
    //console.log("room", e.target.textContent);
    if (e.target.textContent == "") {
      // foundRoom = getAsset("rooms"V,);
      foundRoom = rooms.find((room) => room.info.name == e.target.value);
      console.log("room", foundRoom, e.target.getAttribute("data-value"));
      setRoom(foundRoom);
    } else {
      foundRoom = rooms.find(
        (room) => room._id == e.target.getAttribute("name")
      );
      setRoom(foundRoom);
    }
    // set([]);
    // console.log("este", follow);
  };
  const setMValue = (e) => {
    // console.log("target value", e.target.value);
    if (e.target.textContent == "") {
      const found = models.find((model) => model.displayName == e.target.value);
      setModel(found);
    } else {
      const found = models.find(
        (model) => model.screenName == e.target.getAttribute("name")
      );
      setModel(found);
    }
  };
  return (
    <div
      style="
      max-height:100%;
min-height:100%;
      overflow-y:scroll;overflow-x:hidden;"
    >
      Crear seguimiento
      <div
        style="position:sticky;
        background:rgba(20,20,20,0.6);
        top:0px;
        display:flex;
        flex-direction:row;
        padding:10px;
        flex-wrap: wrap;
        justify-content:space-around;
		    border-bottom:2px solid rgba(100,100,100,0.6);
        backdrop-filter:blur(10px);
        z-index:10;
        "
      >
        <div>
          <div style="display:flex; flex-direction:column; max-width:8rem"></div>
          <input
            onChange={setMValue}
            value={model?.displayName}
            list="model"
            placeholder="buscar modelo"
          ></input>
          <datalist id="model" style={{ width: "100%" }}>
            {models?.map((model) => {
              return (
                <option
                  value={model.displayName}
                >{` ${model.displayName}`}</option>
              );
            })}
          </datalist>
        </div>
        <div style="display:flex; flex-direction:column; max-width:6rem">
          <input
            onChange={setRValue}
            value={room?.info?.name}
            list="room"
            placeholder="# Cuarto"
          ></input>
          <datalist id="room" style={" display: none; width: 100% "}>
            {availableRooms?.map((room) => {
              return (
                <option
                  key={room._id}
                  value={room.info.name}
                >{` ${room.info.name}`}</option>
              );
            })}
          </datalist>
        </div>
      </div>
      <div
        style="padding:10px;
		    margin-top:10px;
        width:100%;
		    "
      >
        <b style="padding:5px;"> </b>
        <div
          style="
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        gap:10px;
        "
        >
          {availableRooms?.length > 0
            ? availableRooms?.map((_room) => {
                // const classes = ["roomSelect"];
                // if (room === _room._id) {
                //   classes.push("hover");
                // }
                return (
                  <button
                    class={room?._id == _room._id && "tab_selected"}
                    key={_room.info.name}
                    name={_room._id}
                    onClick={setRValue}
                  >
                    🚪 {_room.info.name}
                  </button>
                );
              })
            : "No hay habitaciones disoponibles"}
        </div>
      </div>
      <div
        style="padding:10px;
		    margin-top:10px;
		    border-top:2px solid rgba(100,100,100,0.6);
		    border-bottom:2px solid rgba(100,100,100,0.6);
		    "
      >
        <b style="padding:20px;"></b>
        <div
          style="
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        gap:10px;
          max-width:100%;
        "
        >
          {models?.map((_model) => {
            // const classes = ["modelSelect"];
            // if (model?._id === Model?._id) {
            //   classes.push("hover");
            // }
            return (
              <button
                class={model == _model && "tab_selected"}
                key={_model.screenName}
                name={_model.screenName}
                onClick={setMValue}
              >
                {_model.displayName}
              </button>
            );
          })}
        </div>
      </div>
      {room && model && (
        <FollowForm
          ref={followForm}
          follow={{ room: room._id, model: model.screenName }}
          onFinish={onFinish}
        />
      )}
    </div>
  );
}
// {/* <div
//           style="display:flex:flex-direction:column;padding:0.7rem;align-items:stretch;
// background-color: rgb(65, 62, 62);
// 		  "
//         >
//           <div for="Seletion"></div>
//
//           <input
//             style="background-color: rgb(42, 41, 41); min-height: 8rem;"
//             type="text"
//             name="Notas"
//             id="Notas"
//           />
//         </div> */}
//   <div style=" border:2px solid rgba(100,100,100,0.6) margin-rigth:0.5rem; ">
//     <label for="Pc">Pc</label>
//     <Toggle
//       name="Pc"
//       id="Pc"
//       onClick={setValue}
//       state={"Pc" === toggleStates[2]}
//     />
//   </div>
//   <div style=" border:2px solid rgba(100,100,100,0.6) margin-rigth:0.5rem; ">
//     <label for="Cama">Cama</label>
//     <Toggle
//       name="Cama"
//       id="Cama"
//       onClick={setValue}
//       state={"Cama" === toggleStates[3]}
//     />
//   </div>
//   <div style=" border:2px solid rgba(100,100,100,0.6) margin:0.5rem; display:block;  justify-content:center">
//     <label for="Juego de Sabanas"> Sabanas</label>
//     <Toggle
//       name="Sabanas"
//       id="Sabanas"
//       onClick={setValue}
//       style="position:centered"
//       state={"Sabanas" === toggleStates[4]}
//     />
//   </div>
//   <div style=" border:2px solid rgba(100,100,100,0.6) margin-rigth:0.5rem; ">
//     <label for="Lamparas">Lamparas</label>
//     <Toggle
//       name="Lamparas"
//       id="Lamparas"
//       onClick={setValue}
//       state={"Lamparas" === toggleStates[5]}
//     />
//   </div>
//   <div style=" border:2px solid rgba(100,100,100,0.6) margin-rigth:0.5rem; ">
//     <label for="Camara">Camara</label>
//     <Toggle
//       name="Camara"
//       id="Camara"
//       onClick={setValue}
//       state={"Camara" === toggleStates[6]}
//     />
//   </div>
// </div>
