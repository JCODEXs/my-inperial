import { useJasmin } from "vStore/jasmin";
import { useAssets, addRoomTemplate } from "vStore/assets";
import { useLogin } from "vStore/login";
import { useState } from "preact/hooks";
import Toggle from "components/Toggle";
//import { useSnapshot } from "valtio";
//import SearchList from "./SearchComponent";
export default function RoomFollow() {
  const { activePerformers } = useJasmin();
  const { user } = useLogin();
  const { roomFollow } = useAssets();
  const [performer, setPerformer] = useState();
  const [follow, setFollow] = useState([]);
  const monitor = user.info.name;
  console.log(roomFollow);
  const setValue = (e) => {
    const value = e.target.name;
    // e.target.type === "button" ? e.target.checked : e.target.value;
    setFollow((prev) => [...prev, value]);
  };
  const setMValue = (e) => {
    console.log("target value", e.target.value);
    const found = activePerformers.find(
      (performer) => performer.displayName == e.target.value
    );
    if (found) {
      alert("test");
      setPerformer(found);
      console.log(JSON.stringify(e.target.value));
    } else {
      setPerformer(null);
    }
  };
  const followRoom = (e) => {
    e.preventDefault();
    addRoomTemplate(follow, monitor, performer);
  };
  return (
    <div style="border-radius:10px;margin-bottom:100px;">
      <h1> Seguimiento Room</h1>
      <form onSubmit={followRoom}>
        <div style="display:flex;gap:20px;padding:0.5rem;">
          <label for="monitor">monitor</label>
          <div> {user.info.name}</div>
        </div>
        <input
          onChange={setMValue}
          value={performer?.displayName}
          list="model"
          placeholder="Type model Name"
        >
          Modelo
        </input>
        <datalist id="model" style={{ width: "100%" }}>
          {activePerformers.map((performer) => {
            return (
              <option
                value={performer.displayName}
              >{` ${performer.screenName}`}</option>
            );
          })}
        </datalist>
        <div style="display:flex; flex-direction: row; padding-left: 5rem; justify-content: space-between;flex-wrap: wrap; background-color: rgb(29, 26, 26);">
          <div style=" border:2px solid rgba(100,100,100,0.6); ">
            <label for="Tv">Tv</label>
            <Toggle />
            <input type="button" name="tv" id="tv" onChange={setValue} />
          </div>
        </div>
        <button type="submit" onClick={followRoom}>
          FollowRoom
        </button>
      </form>
    </div>
  );
}
