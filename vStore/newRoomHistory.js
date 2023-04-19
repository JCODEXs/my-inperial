import axios from "axios";
import { proxy, useSnapshot, subscribe } from "valtio";
import { derive } from "valtio/utils";
import { DBRef, ObjectId } from "bson";
import AssetsState, { addRoom } from "./assets";
const state = proxy({
  roomId: null,
  validationStates: {},
  info: { name: null, isPrivate: null },
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
    console.log(room);
    console.log(get(state).roomId);
    const changed =
      JSON.stringify(room?.info) !== JSON.stringify(get(state).info);
    console.log("changed:", changed);
    return !(
      changed &&
      get(state).info.name?.length >= 2 &&
      get(state).info.locations > 0 &&
      get(state).info.defaultPrice >= 0
    );
  },
};
derive(derived, {
  proxy: state,
});
export default state;
export const useNewRoomHistory = () => useSnapshot(state);
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

export const add = async () => {
  const result = await axios.post("/api/rooms", {
    data: {
      info: state.info,
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
// const room = AssetsState.rooms.find((room) => room._id == state.roomId);
export const getRoomOcupation = async (
  room_id,
  model,
  startDate,
  endDate,
  dayOfWeek
) => {
  console.log("roomhistory", room_id, model, startDate, endDate, dayOfWeek);
  const result = await axios.post("/api/roomdaysOcupation", {
    room_id,
    model,
    startDate,
    endDate,
    dayOfWeek,
  });
  const response = result.data;
  console.log("roomhistory2", result);
  return response;
};

const onFinishTyping = (callBack) => {
  self.validationTimeout = setTimeout(callBack, 500);
};
