import { proxy, useSnapshot } from "valtio";
import axios from "axios";
import { toast } from "react-toastify";
import { setSection } from "vStore/selected";
import { destroyReal } from "vStore/assets";
const initialState = {
  user: { isLoggedIn: false },
  userValid: false,
  passValid: false,
  mailValid: false,
  email: "",
  pass: "",
  fetchingUser: false,
  loading: false,
};
const state = proxy(initialState);
// derive(
//   {
//     feedback: (get) =>
//       get(state).fetchingUser
//         ? "👤⏳"
//         : !get(state).userValid
//         ? get(state).mailValid
//           ? "👤❌"
//           : "..."
//         : get(state).passValid
//         ? "Intenta ingresar"
//         : "👤✔️ > 🔑",
//     logEnabled: (get) => get(state).userValid && get(state).passValid,
//   },
//   { proxy: state }
// );
export const resetLogin = () => {
  state.loading = false;
  state.userValid = false;
  state.passValid = false;
  state.mailValid = false;
  state.email = "";
  state.pass = "";
  state.fetchingUser = false;
};
let userTout;
// export const
//         $(this).on("keypress", function (e) {
//             if (e.keyCode === 13)
//             {
//                 var nextElement = $('[tabindex="' + (this.tabIndex + 1) + '"]');
//                 if (nextElement.length) {
//                     $('[tabindex="' + (this.tabIndex + 1) + '"]').focus();
//                     e.preventDefault();
//                 } else
//                     $('[tabindex="1"]').focus();
//             }
//         });
//
//
export const overwriteAuth = (jsonuser) => {
  const user = JSON.parse(jsonuser);
  setSection(master() ? "users" : "jasmin");
  state.user = user;
};
export const checkUser = (username) => {
  clearTimeout(userTout);
  state.feedback = "...";
  state.mailValid = /^[A-Z-1-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username);
  state.logEnabled = state.passValid && state.userValid;
  state.userValid = false;
  userTout = setTimeout(async () => {
    if (state.mailValid) {
      state.email = username;
      await checkEmail();
    } else {
      await checkModel(username);
    }
  }, 200);
};
export const master = () =>
  state.user?.log?.auth == "admin" || state.user?.log?.auth == "dev";
export const onUserInput = (e) => {
  checkUser(e.target.value);
};
export const onPassInput = (e) => {
  state.passValid = e.target.value.length > 5;
  state.logEnabled = state.passValid && state.userValid;
  state.feedback = "...";
  if (state.passValid) {
    state.pass = e.target.value;
    state.feedback = "Intenta ingresar";
  }
};
export const setUser = (user) => {
  // console.log("state: ", state);
  // console.log("valtio state pre user: ", user);
  state.user = user ? { isLoggedIn: true, ...user } : { isLoggedIn: false };
  user && (state.originalUser = user);
  // console.log("valtio state user: ", state.user);
  // console.log("valtio state test: ", state.test);
};
export const checkEmail = async () => {
  console.log("checking email");
  state.fetchingUser = true;
  const res = await axios.post("/api/auth/checkEmail", { email: state.email });
  state.fetchingUser = false;
  state.userValid = res.data.user ? true : false;
  state.logEnabled = state.passValid && state.userValid;
};
export const checkModel = async (model) => {
  console.log("checking email");
  state.fetchingUser = true;
  const res = await axios.post("/api/auth/checkModel", { model });
  res.data.user && (state.email = res.data.user.info.email);
  state.fetchingUser = false;
  state.userValid = res.data.user ? true : false;
  state.logEnabled = state.passValid && state.userValid;
};
export const logIn = async (router) => {
  console.log("theEmail", state.email);
  let res;
  try {
    state.loading = true;
    res = await axios.post("/api/auth/login", {
      email: state.email,
      pass: state.pass,
    });
  } catch (e) {
    alert(res);
  }
  const { user } = res.data;
  state.logEnabled = user ? true : false;
  // alert(user);
  setUser(user);
  if (user) {
    router.push("/admin");
  } else {
    state.loading = false;
    alert("FALLO LOGIN");
    // toast.error(`Log In ha fallado`, {
    //   theme: 'dark',
    // });
  }
  // !user && (state.feedback = '🚫❌');
};
export const checkCredentials = async (onSuccess) => {
  console.log("theEmail", state.email);
  let res;
  try {
    state.loading = true;
    res = await axios.post("/api/auth/checkCredentials", {
      email: state.email,
      pass: state.pass,
    });
  } catch (e) {
    alert(res);
  }
  const { user } = res.data;
  state.logEnabled = user ? true : false;
  if (user) {
    onSuccess();
  } else {
    state.loading = false;
    alert("FALLO LA FIRMA. Probablemente la contraseña es errada.");
    // toast.error(`Falló la firma`, {
    //   theme: 'dark',
    // });
    state.feedback = "🚫❌";
  }
};
export const register = async (user) => {
  user = {
    info: { email: "" },
    log: { pass: "" },
  };
  const res = await axios.post("/api/auth/register", user);
  state.user = res.data.user
    ? { isLoggedIn: true, ...res.data.user }
    : { isLoggedIn: false };
};
export const logOut = async (router) => {
  destroyReal();
  router.push("/login");
  const res = await axios.post("/api/auth/logOut");
  setUser(undefined);
  toast.dismiss();
  // toast.success(`Sesion terminada`, {
  //   theme: 'dark',
  // });
};
export default state;
export const useLogin = () => useSnapshot(state);
