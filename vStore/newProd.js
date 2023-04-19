import axios from "axios";
import { proxy, useSnapshot, subscribe } from "valtio";
import { derive } from "valtio/utils";
import { DBRef, ObjectId } from "bson";
import AssetsState, { addProduct } from "./assets";
// import CartState from './cart';
const state = proxy({
  prodId: null,
  validationStates: {},
  info: {
    price: null,
    name: null,
  },
});
const fields = {
  name: {},
  price: {},
  stock: {
    valid: (e, value) => value > 0,
  },
};
const init = () => {
  ["name", "price", "stock"].forEach((value) => {
    state.validationStates[value] = { valid: false, stateText: "" };
  });
  console.log(state);
};
init();
const derived = {
  disabled: (get) => {
    const prod = AssetsState.shop?.find(
      (prod) => prod._id == get(state).prodId
    );
    console.log(prod);
    const changed =
      JSON.stringify(prod?.info) !== JSON.stringify(get(state).info);
    console.log("changed:", changed);
    return !(
      changed &&
      get(state).info.name?.length >= 5 &&
      get(state).info.price > 100
    );
  },
};
derive(derived, {
  proxy: state,
});
export default state;
export const setField = (field, value) => {
  state.info[field] = value;
};
export const add = async () => {
  state.info.name = state.info.name.trim();
  const result = await axios.post("/api/shop", {
    data: {
      info: state.info,
    },
  });
  const { response, data } = result.data;
  console.log("theData", data, " result", result);
  addProduct({
    _id: ObjectId(response.insertedId),
    ...data,
  });
};
export const edit = async () => {
  state.info.name = state.info.name.trim();
  const prod = AssetsState.shop.find((prod) => prod._id == state.prodId);
  const result = await axios.put("/api/editProd", {
    prodId: state.prodId,
    info: state.info,
    prevInfo: { info: prod.info, creation: prod.creation },
  });
  const { response, info } = result.data;
  prod.info = info;
  // addUser({
  //   _id: ObjectId(response.insertedId),
  //   ...data,
  // });
  // toast.success(`Usuario editado`, {
  //   theme: 'dark',
  // });
};
export const uploadProd = (prodId) => {
  state.prodId = prodId;
  const prod = AssetsState.shop.find((prod) => prod._id == prodId);
  state.info = prod ? { ...prod.info } : {};
};
export const useNewProduct = () => useSnapshot(state);
const refactorName = (inputText) => {
  // inputText = inputText.replace(/  +/g, ' ');
  // inputText = inputText.replace(/[^a-zA-Z ]+/, '');
  var splitStr = inputText.toLowerCase().split(" ");
  splitStr = splitStr.slice(0, 5);
  for (var i = 0; i < splitStr.length; i++) {
    if (splitStr[i].length > 15) {
      splitStr[i] = splitStr[i].slice(0, 10);
    }
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};
export const validateName = (e) => {
  onFinishTyping(() => {
    const valid = e.target.value.length > 5;
    if (valid) {
      state.info.name = refactorName(e.target.value);
      setValidationStatus("name", true, "Valid name");
    } else {
      state.info.name = null;
      setValidationStatus("name", false, "Name is too short");
    }
  });
};
export const validatePrice = (e) => {
  const inputText = e.target.value;
  // e.target.value = state.info.price;
  const valid = e.target.value.length > 2;
  onFinishTyping(() => {
    if (valid) {
      state.info.price = parseFloat(e.target.value);
      setValidationStatus("price", true, "Valid price");
    } else {
      state.info.price = null;
      setValidationStatus("price", false, "Name is too short");
    }
  });
};
export const validate = (e, field) => {
  onFinishTyping(() => {
    if (fields[field].valid(e, e.target.value)) {
      setValidationStatus(field, true, fields[field].validMssg);
    } else {
      state.info.name = null;
      setValidationStatus(field, false, fields[field].invalidMssg);
    }
  });
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
