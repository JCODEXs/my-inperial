import { useRef, useState } from "preact/hooks";
import { useAssets, addElement } from "vStore/assets";
import { useSelected } from "vStore/selected";
export default function notes() {
  const [note, setNote] = useState("");
  const textarea = useRef();
  const { users } = useAssets();
  const { selected: userID } = useSelected();
  const user = users.find((user) => user._id == userID);
  const disabled = !(note.length > 10);
  return (
    <div style="padding:5px;max-height:100%;display:flex;flex-direction:column;overflow:hidden;gap:5px;">
      <div>
        <b style="">AÑADIR NOTA</b>
        <div style="float:right;">
          {disabled && "La nota debe ser mas larga"}
        </div>
      </div>
      <div style="display:flex;position:relative; ">
        <textarea
          style="padding:5px;flex:1;min-height:100px;max-height:300px;"
          rows="4"
          ref={textarea}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div>
        <button
          style="float:right;"
          class={disabled && "disabled"}
          disabled={disabled}
          onClick={() => {
            // alert(selectedItem._id);
            // alert(qty);
            textarea.current.value.length > 10 &&
              addElement("notes", user._id, {
                // ref: selectedItem._id,
                info: textarea.current.value.trim(),
              });
          }}
        >
          AGREGAR
        </button>
      </div>
    </div>
  );
}
export function noteElem(note, edit) {
  const textarea = useRef();
  return (
    <div style="display:flex;">
      {edit ? (
        <textarea
          defaultValue={note.info}
          style="padding:5px;flex:1;min-height:100px;max-height:300px;"
          rows="4"
          ref={textarea}
        />
      ) : (
        <pre style="flex:1;background:rgba(10,10,10,0.6);border-radius:5px;padding:5px;border:2px solid rgba(40,40,40,0.6);">
          {note.info}
        </pre>
      )}
    </div>
  );
}
