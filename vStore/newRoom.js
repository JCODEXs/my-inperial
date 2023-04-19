import axios from "axios";
import { proxy, useSnapshot, subscribe } from "valtio";
import { derive } from "valtio/utils";
import { DBRef, ObjectId } from "bson";
import AssetsState, { addRoom } from "./assets";
const state = proxy({
  roomId: null,
  validationStates: {},
  info: { name: null, isPrivate: null },
  inventory: [],
  //occupied: {},
});
const init = () => {
  ["name"].forEach((value) => {
    state.validationStates[value] = { valid: false, stateText: "" };
  });
  console.log(state);
};
init();
const derived = {
  disabled: (get) => {
    const room = AssetsState.rooms?.find(
      (room) => room._id == get(state).roomId
    );
    // console.log(room);
    // console.log(get(state).roomId);
    const changed =
      JSON.stringify(room?.inventory) !== JSON.stringify(get(state).inventory);
    console.log("changed:", changed);
    return !(
      (
        changed &&
        get(state).info.name?.length >= 2 &&
        get(state).inventory.length > 0
      )
      //&&
      // get(state).info.defaultPrice >= 0
    );
  },
};
derive(derived, {
  proxy: state,
});
export default state;
export const useNewRoom = () => useSnapshot(state);
const refactorNameSurname = (inputText) => {
  inputText = inputText.replace(/  +/g, " ");
  inputText = inputText.replace(/[^a-zA-Z ]+/, "");
  var splitStr = inputText.toLowerCase().split(" ");
  splitStr = splitStr.slice(0, 2);
  for (var i = 0; i < splitStr.length; i++) {
    if (splitStr[i].length > 10) {
      splitStr[i] = splitStr[i].slice(0, 10);
    }
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};
export const validateName = (e) => {
  onFinishTyping(() => {
    const valid = e.target.value.length >= 2;
    if (valid) {
      state.info.name = e.target.value;
      setValidationStatus("name", true, "Valid name");
    } else {
      state.info.name = null;
      setValidationStatus("name", false, "Name is too short");
    }
  });
};
export const addItem = (item) => {
  if (state.inventory) {
    state.inventory = [...state.inventory, item];
  } else {
    state.inventory = [item];
    console.log(state.inventory)
  }
};
export const deleteItem = (item) => {
  state.inventory = state.inventory.filter((i) => i.name !== item);
  console.log(state);
};
export const validatePrice = (e) => {
  const inputText = e.target.value;
  // e.target.value = state.info.price;
  const valid = e.target.value && e.target.value >= 0;
  onFinishTyping(() => {
    if (valid) {
      state.info.defaultPrice = e.target.value;
      setValidationStatus("defaultPrice", true, "Valid price");
    } else {
      state.info.defaultPrice = null;
      setValidationStatus("defaultPrice", false, "Name is too short");
    }
  });
};
export const uploadRoom = (roomId) => {
  state.roomId = roomId;
  const room = AssetsState.rooms.find((room) => room._id == roomId);
  state.info = room ? { ...room.info } : {};
  state.inventory = room?.inventory;
  console.log("upload", state);
};
export const add = async () => {
  const result = await axios.post("/api/rooms", {
    data: {
      info: state.info,
      inventory: state.inventory,
    },
    
  });
  console.log(result);
  const { response, data } = result.data;
  console.log("theData", data, " result", result);
  addRoom({
    _id: ObjectId(response.insertedId),
    ...data,
  });
  // addRoom({
  //   _id: ObjectId(result.data.insertedId),
  //   info: state.info,
  // });
};
function diffInventory(prevInv, newInv) {
  const added = newInv.filter((item) => !prevInv.includes(item));
  const removed = prevInv.filter((item) => !newInv.includes(item));
  return { added, removed };
}

export const edit = async (occupied, setId) => {
  const room = {};
  if (setId) {
    state.roomId = setId;
    room = AssetsState.rooms?.find((room) => room._id == state.roomId);
    state.info = room.info;
    state.inventory = room.inventory;
    state.occupied = occupied;
  } else {
    room = AssetsState.rooms.find((room) => room._id == state.roomId);
    state.info = room.info;
    state.inventory = state.inventory;
    //state.occupied = room.occupied;
    console.log("aja", room._id, state.inventory);
  }
  //console.log("aja", state, room);
  //const { added, removed } = diffInventory(room.inventory, state.inventory);
  const result = await axios.put("/api/editRoom", {
    roomId: state.roomId,
    info: state.info,
    prevInfo: { info: room.info, creation: room.creation },
    inventory: state.inventory,
    //roomInventory: room.inventory,
    //added: added,
    //removed: removed,
    //occupied: state.occupied,
  });
  const { response, info } = result.data;
  room.info = info;
  room.inventory = state.inventory;
  room.occupied = state.occupied;
  console.log("state", response);
  // addUser({
  //   _id: ObjectId(response.insertedId),
  //   ...data,
  // });
  // toast.success(`Usuario editado`, {
  //   theme: 'dark',
  // });
};
export const setField = (field, value) => {
  state.info[field] = value;
};
const onFinishTyping = (callBack) => {
  self.validationTimeout = setTimeout(callBack, 500);
};
export const setValidationStatus = (id, validStatus, validationText) => {
  state.validationStates[id] = {
    valid: validStatus,
    stateText: validationText,
  };
};
