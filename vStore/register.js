import axios from "axios";
import { proxy, useSnapshot, subscribe } from "valtio";
import { derive } from "valtio/utils";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { DBRef, ObjectId } from "bson";
import AssetsState, { addUser } from "./assets";
import { toast } from "react-toastify";
// let cities = [];
const state = proxy({
  exists: true,
  user: { info: {} },
  validationStates: {},
  countries: [],
  regState: 0,
  userId: null,
  // names: undefined,
  // surnames: undefined,
  // document: undefined,
  // cell: undefined,
  // country: undefined,
  // city: undefined,
  // phone: undefined,
  // birthday: undefined,
});
const init = () => {
  [
    "name",
    "surname",
    "username",
    "email",
    "cell",
    // 'birthday',
    "pass",
    "passConfirm",
    "document",
  ].forEach((value) => {
    state.validationStates[value] = { valid: false, stateText: "" };
  });
  console.log(state);
};
init();
export const initCities = () => {
  // cities = require('cities.json');
};
const derived = {
  // cities: (get) => {
  //   return ['Cali', 'Bogota', 'Pasto'];
  //   // return cities.filter((city) => city.country == get(state).info.country);
  // },
  regDisabled: (get) => {
    return !get(state).user.info.name || !get(state).user.info.surname;
  },
};
derive(derived, {
  proxy: state,
});
export default state;
export const setCountry = (country) => {
  state.user.info.country = country;
};
export const setCity = (city) => {
  state.user.info.city = city;
};

export const setDocType = (documentType) => {
  state.user.info.documentType = documentType;
};
export const setMotive = (motive) => {
  state.user.info.motive = motive;
};
export const setField = (field, value) => {
  state.user.info[field] = value;
};
export const register = async () => {
  const result = await axios.post("/api/users", {
    data: {
      info: state.user.info,
    },
  });
  const { response, data } = result.data;
  console.log("theData", data, " result", result);
  addUser({
    _id: ObjectId(response.insertedId),
    ...data,
  });
  toast.success(`Nuevo usuario creado`, {
    theme: "dark",
  });
};
export const useRegister = () => useSnapshot(state);
// export const generateOrder = async () => {
//   const order = state;
//   delete order.exists;
//   delete order.cities;
//   order.lines = CartState.lines;
//   const result = await axios.post('/api/orders', {
//     data: order,
//     refs: {
//       channels: [
//         { ref: DBRef('channels', ObjectId(ChannelState.channel._id)) },
//       ],
//     },
//   });
//   // console.log('Success',result)
//   alert(result.data.acknowledged ? 'DONE' : 'ERROR');
// };
// subscribe(state, () => {
// Object.keys(derived).forEach((key)=>state)
// localStorage.setItem(
//   'checkout',
//   JSON.stringify(state, (key, value) => {
//     if (!derived[key]) {
//       return value;
//     }
//     // else return the value itself
//   })
// );
// });
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
  const inputText = e.target.value;
  state.user.info.name = refactorNameSurname(inputText);
  e.target.value = state.user.info.namesss;
  onFinishTyping(() => {
    const valid = e.target.value.length >= 3;
    if (valid) {
      setValidationStatus("name", true, "Valid name");
    } else {
      state.user.info.name = null;
      setValidationStatus("name", false, "Name is too short");
    }
  });
};
export const validateSurname = (e) => {
  var inputText = e.target.value;
  e.target.value = refactorNameSurname(inputText);
  onFinishTyping(() => {
    const valid = e.target.value.length >= 2;
    if (valid) {
      setValidationStatus("surname", true, "Valid surname");
      state.user.info.surname = e.target.value;
    } else {
      setValidationStatus("surname", false, "Surname is too short");
      state.user.info.surname = null;
    }
  });
};
export const validateBirthDay = (e) => {
  if (e.target.value) {
    state.user.info.birthday = e.target.value;
    setValidationStatus("birthday", true, "Valid Date");
  } else {
    state.user.info.birthday = null;
    setValidationStatus("birthday", false, "Invalid Date");
  }
};
export const validateCell2 = (value, data) => {
  onFinishTyping(() => {
    var rawNumber = value.replace(/[^0-9]+/g, "");
    var reqLen = 20;
    rawNumber = rawNumber.slice(
      data.dialCode.length,
      data.dialCode.length + reqLen
    );
    var number = data.dialCode + " - " + rawNumber;
    number = "+" + number;
    const phoneNumber = parsePhoneNumberFromString(number);
    const valid =
      rawNumber.length > 5 && phoneNumber != undefined && phoneNumber.isValid();
    if (valid) {
      setValidationStatus("cell", true, "Valid number");
      state.user.info.cell = number;
    } else {
      setValidationStatus("cell", false, "Invalid number");
      state.user.info.cell = null;
    }
  });
};
// const onFinishTyping = (callBack) => {
//   self.validationTimeout = setTimeout(callBack, 500);
// };
const onFinishTyping = (callBack) => {
  self.validationTimeout = setTimeout(callBack, 500);
};
export const validateEmail = async (e) => {
  clearTimeout(self.validationTimeout);
  console.log("hey");
  e.target.value = e.target.value.replace(/\s/g, "");
  const inputText = e.target.value;
  onFinishTyping(async () => {
    if (inputText !== "") {
      const valid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        inputText
      );
      if (valid) {
        setValidationStatus("email", false, "This email is not valid");
        state.user.info.email = null;
        state.exists = false;
      } else {
        state.user.info.email = inputText;
        // dispatch(checkEmail);
        console.log("axio");
        // var response = await axios.post('/api/auth/checkEmail', {
        //   email: self.email,
        // });
        // response = response.data;
        setValidationStatus("email", true, "Valid email");
        if (true || response.user) {
          state.exists = true;
          //Temp Bypass
          setValidationStatus("pass", true, "Valid Password");
        } else {
          setExists(false);
        }
      }
    } else {
      setValidationStatus("email", null, "Ingresa un correo");
    }
  });
};
export const validateDocument = (e) => {
  const inputText = e.target.value;
  const valid = inputText.length >= 5;
  // && /(?=.*[A-Z])(?=.*[a-z])(?=.*[@#\$&])/.test(inputText);
  if (valid) {
    state.user.info.document = e.target.value;
    setValidationStatus("document", true, "Valid Document");
  } else {
    state.user.info.document = null;
    setValidationStatus("document", false, "Invalid document");
  }
};
const validatePass = (e) => {
  const inputText = e.target.value;
  const valid = inputText.length >= 5;
  // && /(?=.*[A-Z])(?=.*[a-z])(?=.*[@#\$&])/.test(inputText);
  if (valid) {
    self.pass = e.target.value;
    setValidationStatus("pass", true, "Valid Password");
  } else {
    self.pass = null;
    setValidationStatus(
      "pass",
      false,
      "Invalid format you need at least one @#$& lowercase and uppercase"
    );
  }
};
// const verifyPass = (e) => {
//   const valid = self.pass === e.target.value;
//   if (valid) {
//     self.passVerify = e.target.value;
//     setValidationStatus("passConfirm", true, "Match");
//   } else {
//     self.passVerify = null;
//     setValidationStatus("passConfirm", false, "Not matching");
//   }
// };
// const goNext = () => {
//   // if (regState == 0) {
//   if (exists) {
//     !isManaged ? logIn(self.email) : onAuth();
//   } else {
//     const user = {
//       info: {
//         name: self.name,
//         surname: self.surname,
//         email: self.email,
//         cell: self.cell,
//         birthday: self.birthday,
//       },
//       regDate: new Date(),
//       log: { pass: self.pass },
//     };
//     register(user);
//   }
// };
export const uploadUser = (userId) => {
  state.userId = userId;
  const user = AssetsState.users.find((user) => user._id == userId);
  state.user = user ? { ...user } : {};
};
export const edit = async () => {
  const result = await axios.put("/api/editUser", {
    userId: state.userId,
    info: state.user.info,
  });
  const { response, info } = result.data;
  const user = AssetsState.users.find((user) => user._id == state.userId);
  user.info = info;
  toast.success(`Usuario editado`, {
    theme: "dark",
  });
};
export const setValidationStatus = (id, validStatus, validationText) => {
  state.validationStates[id] = {
    valid: validStatus,
    stateText: validationText,
  };
};
