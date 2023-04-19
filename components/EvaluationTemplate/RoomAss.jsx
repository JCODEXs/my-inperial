import ValidationInput from "components/validationInput";

import {
  useNewRoomAss,
  setField,
  validateName,
  add,
  edit,
  validatePrice,
} from "vStore/newRoomAss";
import { useOverlays } from "vStore/overlays";

const NewRoomAss = ({ onSuccess = () => {} }) => {
  const { roomId, validationStates, info, disabled } = useNewRoomAss();
  const { neo } = useOverlays();
  const { isPrivate } = info;
  return (
    <div style="padding:10px;">
      <b style="margin-bottom:40px;">
        <h2> {roomId ? "Editar habitacion" : "Crear nueva habitacion"}</h2>
      </b>
      <div>
        <ValidationInput
          type="text"
          label={"NAME"}
          value={info.name}
          state={validationStates["name"].state}
          onChange={validateName}
          placeholder="Miguel"
        />
        <div style="">
          <div>PERSONAS</div>
          <input
            value={info.locations}
            style="width:97%;"
            type="number"
            min="1"
            onChange={(e) => setField("locations", e.target.value)}
          />
        </div>
        <div style="margin-top:10px;">
          <div>TIPO</div>
          <div style="display:flex;gap:10px;">
            <button
              style="margin:0px;"
              class={isPrivate && "tab_selected"}
              onClick={() => {
                setField("isPrivate", true);
              }}
            >
              PRIVADA
            </button>
            <button
              style="margin:0px;"
              class={!isPrivate && "tab_selected"}
              onClick={() => {
                setField("isPrivate", false);
              }}
            >
              COMPARTIDA
            </button>
          </div>
        </div>
        <ValidationInput
          value={info.defaultPrice}
          type="number"
          label={"PRECIO POR DEFECTO"}
          state={validationStates["defaultPrice"]}
          onChange={validatePrice}
          min="0"
          step="100"
          placeholder="25000"
        />
        <button
          style="margin-top:20px;"
          disabled={disabled}
          class={disabled && "disabled"}
          onClick={async () => {
            //           alert('Bro');
            neo.ref.current.close();
            !roomId ? await add() : await edit();
            // onSuccess()
          }}
        >
          {roomId ? "EDITAR" : "CREAR"}
        </button>
      </div>
    </div>
  );
};
export default NewRoomAss;
