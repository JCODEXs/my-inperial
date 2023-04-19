import ValidationInput from "components/validationInput";
import {
  useNewRoom,
  validateName,
  add,
  edit,
  addItem,
  deleteItem,
} from "vStore/newRoom";
import { useOverlays } from "vStore/overlays";
import { addRoomElement } from "vStore/assets";
import { useState } from "preact/hooks";
import { DBRef, ObjectId } from "bson";
import { nanoid, customAlphabet } from "nanoid";
const NewRoom = ({ onSuccess = () => {} }) => {
  const { roomId, validationStates, info, disabled, inventory } = useNewRoom();
  const { neo } = useOverlays();
  const [item, setItem] = useState("");
  const [code, setCode] = useState("");
  const [object, setObject] = useState({});
  const nano = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);
  // const createBulk = (e) => {
  //   e.preventDefault();
  //   if (item.length > 0) {
  //     setBulk((prevState) => [...prevState, item]);
  //     setItem("");
  //   }
  // };
  const codeChangeHandler = (event) => {
    event.preventDefault();
    setCode(event.target.value);
  };
  const ItemChangeHandler = (event) => {
    event.preventDefault();
    setItem(event.target.value);
  };
  const objectHandler = () => {
    setObject({
      id: nano(),
      serial: code,
      name: item,
      Owner: "admin@Imperial.com",
    });
    addItem({
      id: nano(),
      serial: code,
      name: item,
      Owner: "admin@Imperial.com",
    });
    console.log(code, item);
    setCode("");
    setItem("");
  };
  return (
    <div
      style="padding:10px;max-height: 100%; height: 100%;
    padding: 10px;
    overflow-y: scroll;"
    >
      {/* <pre>{JSON.stringify(object,null,2)}</pre>
      <pre>{JSON.stringify(inventory,null,2)}</pre> */}
      <div style="display:flex;flex-direction:column;align-items: flex-start; margin-bottom:5px;">
        <div> {roomId ? "" : "Crear "}</div>
        🚪
        <div style="max-width:5rem">
          <ValidationInput
            style="width:4rem"
            type="text"
            //   label={"# CUARTO"}
            value={info.name}
            state={validationStates["name"].state}
            onChange={validateName}
            placeholder="Cuarto #"
          />
        </div>
        <div style="margin:0.1rem;display:flex:flex-direction:column">
          <div> 🛠 </div>
          <div
            style="display:flex;padding:5px;gap:5px;flex-direction:column"
            //class="new-Module__control"
          >
            <input
              style="max-width:8rem"
              placeholder="Agragar objeto"
              type="text"
              value={item}
              onChange={ItemChangeHandler}
            />
            {false && (
              <input
                style="max-width:7rem"
                placeholder="# _id "
                type="number"
                value={code}
                onChange={codeChangeHandler}
              />
            )}
            <button
              class={item.length < 2 && "disabled"}
              disabled={item.length < 2}
              style="font-size:0.8rem; max-width:5rem"
              onClick={objectHandler}
            >
              ⚒ Agregar
            </button>
          </div>
        </div>
        <div style=" align-items:flex-end; display:flex;flex-direction:column;gap:5px;padding:0.8rem">
          <div style="margin-bottom:0.5rem"> 📋 </div>
          {inventory &&
            inventory.map((item) => {
              return (
                <div
                  style="
			    background:rgba(10,10,10,0.8);
			    display:flex;gap:5px;
          flex-direction:row;
          flex-wrap:wrap;
          padding:10px;
			    border-radius:10px;
			    align-items:center;
          justify-content:flex-end;"
                >
                  <div style="flex:1;">{item.name}</div>
                  <div style="margin:0.8rem;font-size:0.7rem;color:rgb(30,30,150,0.9)">
                    id:{item.id}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteItem(item.name);
                      console.log("delete", item);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
        <button
          style="margin-top:10px;"
          disabled={disabled}
          class={disabled && "disabled"}
          onClick={async () => {
            //           alert('Bro');
            neo.ref.current.close();
            !roomId ? await add() : await edit();
            // onSuccess();
          }}
        >
          {roomId ? "EDITAR" : "CREAR"}
        </button>
      </div>
      {/* <pre>{JSON.stringify(inventory, 2, null)}</pre> */}
    </div>
  );
};
export default NewRoom;
