import { proxy, useSnapshot, subscribe } from "valtio";
// import * as awarenessProtocol from 'y-protocols/awareness.js';
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { WebrtcProvider } from "y-webrtc";
import { bindProxyAndYMap } from "valtio-yjs";
import { toast } from "react-toastify";
import axios from "axios";
import { uploadAll } from "./submit";
import { ObjectId } from "bson";
import { nanoid, customAlphabet } from "nanoid";
import jasminState, {
  requestStats,
  // setResumedStats,
  requestJasmin,
  // incrementBatch,
  requestGlobal,
} from "vStore/jasmin";
import { siganalingServers } from "lib/signaling";
const state = proxy({});
// shop: [],
// users: [],
// rooms: [],
// templates: [],
// roomFollow: [],
// news: [],
let provider;
export const makeItRealTest = (host, port) => {
  provider && destroyReal();
  console.log("makingReal  ", window.location);
  const ydoc = new Y.Doc();
  provider = new WebrtcProvider(
    "qwerty-imperial-08",
    ydoc
    // {
    //   signaling: [
    //     // High reliability:
    //     "wss://signalmaster.yoann.me", // Yoann's SignalMaster server
    //     "wss://y-webrtc-signaling-eu.herokuapp.com", // Y-WebRTC's EU server
    //     "wss://y-webrtc-signaling-us.herokuapp.com", // Y-WebRTC's US server
    //
    //     // Medium reliability:
    //     "wss://peerjs.com/peerserver", // PeerJS server
    //     "wss://appr.tc/ws", // Google's AppRTC server
    //     "wss://janus.conf.meetecho.com/ws", // Janus WebRTC Gateway
    //     "wss://meet.jit.si/xmpp-websocket", // Jitsi Meet server
    //     "wss://global.voxeet.com:443/ws", // Voxeet server
    //     "wss://video.twilio.com/signaling", // Twilio server
    //
    //     // Low reliability:
    //     "wss://socket-io-chat.now.sh/", // Socket.IO chat demo
    //     "wss://ps.pndsn.com/signal/now", // PubNub SIGNAL server
    //     "wss://demo.easyrtc.com:443/", // EasyRTC demo server
    //     "wss://medooze.com:4443/", // Medooze Media Server
    //   ].map(),
    // }
    //  {
    //     filterBcConns: false,,
    //     awareness: new awarenessProtocol.Awareness(ydoc),
    // }
  );
  // provider = new WebsocketProvider(
  //   `${
  //     window.location.protocol == "https:" ? "wss://" + host : "ws://" + host
  //   }:${port}`,
  //   "test-test",
  //   ydoc
  //   // { WebSocketPolyfill:"Websocket" }
  // );
  // provider.shouldConnect = true;
  // If false, the client will not try to reconnect.
  // const awareness = provider.awareness;
  // awareness.setLocalStateField("user", {
  //   // Define a print name that should be displayed
  //   name: "Emmanuelle Charpentier",
  //   // Define a color that should be associated to the user:
  //   color: "#ffb61e", // should be a hex color
  // });
  // console.log("awareness: ", awareness);
  // console.log("awarenesslocal state: ", awareness.getLocalState());
  // create a Y map
  const ymap = ydoc.getMap("mymap");
  bindProxyAndYMap(state, ymap);
  // provider.on("connection-error", (e) => {
  //   console.log("Error connecting to ws", e);
  // });
  // provider.on("status", async (event) => {
  //   console.log("event", event.status);
  //   if (event.status) {
  //     // var promises = [requestJasmin()];
  //     // if (user.log.auth == "admin") {
  //     //   promises.push(...[requestStats("2023-01-04"), requestGlobal("2023")]);
  //     // }
  //     // await Promise.all(promises);
  //     // setTimeout(() => {
  //     //   // setTemp(true);
  //     //   if (user.log.auth == "admin") {
  //     //     toast.success(`Datos totalmente cargados`, {
  //     //       theme: "dark",
  //     //     });
  //     //   }
  //     // }, 100);
  //   }
  //   // NOTE: This is only called when a different browser connects to this client
  //   // Windows of the same browser communicate directly with each other
  //   // Although this behavior might be subject to change.
  //   // It is better not to expect a synced event when using y-webrtc
  // });
};
export const makeItReal = (user, port) => {
  console.log("makingReal  ", window.location);
  const ydoc = new Y.Doc();
  if (true) {
    provider = new WebrtcProvider(
      "qwerty-imperial-00",
      ydoc
      // {
      //   signaling: siganalingServers.map(
      //     (server) =>
      //       `${window.location.protocol == "https:" ? "ws" : "ws"}://${server}`
      //   ),
      //
      //   // [
      //   //   `${window.location.protocol == "https:" ? "wss" : "ws"}://${
      //   //     window.location.hostname
      //   //   }:1234`,
      //   // ],
      // }
      //  {
      //     filterBcConns: false,,
      //     awareness: new awarenessProtocol.Awareness(ydoc),
      // }
    );
  } else {
    provider = new WebsocketProvider(
      `${
        window.location.protocol == "https:"
          ? "wss://imperial.kpm.codes"
          : "ws://localhost"
      }:1234`,
      "test-test",
      ydoc
      // { WebSocketPolyfill:"Websocket" }
    );
    provider.on("status", async (event) => {
      console.log("event", event.status);
      if (event.status) {
        // var promises = [requestJasmin()];
        // if (user.log.auth == "admin") {
        //   promises.push(...[requestStats("2023-01-04"), requestGlobal("2023")]);
        // }
        // await Promise.all(promises);
        // setTimeout(() => {
        //   // setTemp(true);
        //   if (user.log.auth == "admin") {
        //     toast.success(`Datos totalmente cargados`, {
        //       theme: "dark",
        //     });
        //   }
        // }, 100);
      }
      // NOTE: This is only called when a different browser connects to this client
      // Windows of the same browser communicate directly with each other
      // Although this behavior might be subject to change.
      // It is better not to expect a synced event when using y-webrtc
    });
  }
  // provider.shouldConnect = true;
  // If false, the client will not try to reconnect.
  // const awareness = provider.awareness;
  // awareness.setLocalStateField("user", {
  //   // Define a print name that should be displayed
  //   name: "Emmanuelle Charpentier",
  //   // Define a color that should be associated to the user:
  //   color: "#ffb61e", // should be a hex color
  // });
  // console.log("awareness: ", awareness);
  // console.log("awarenesslocal state: ", awareness.getLocalState());
  // create a Y map
  const ymap = ydoc.getMap("mymap");
  bindProxyAndYMap(state, ymap);
  provider.on("connection-error", (e) => {
    console.log("Error connecting to ws", e);
  });
};
export const destroyReal = () => {
  provider && provider.destroy();
};
export const getAsset = (section, _id) =>
  state[section].find((asset) => asset._id == _id);
export const editModelEvaluationField = async (
  templateID,
  screenName,
  day,
  moduleID,
  itemID,
  value
) => {
  // const validateResponse = (response) => {
  //   if (response.status !== 200) {
  //     throw new Error(`Error updating value: ${response.data.message}`);
  //   }
  // };
  //
  const body = {
    templateID,
    screenName,
    day,
    moduleID,
    itemID,
    value,
  };
  try {
    const response = await axios.put("/api/evaluateModel", body, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${req.session.access_token}`
      // }
    });
    //validateResponse(response);
    const template = state.templates.find(
      (template) => template._id == templateID
    );
    const model = template.models.find(
      (model) => model.screenName == screenName
    );
    // template[day][response.data.body.evaluatorID][itemID]=value;
    //model[day][response.data.body.evaluatorID][itemID] = value;
    console.log("response", model);
    console.log(response.data.body);
  } catch (error) {
    console.error(error.message);
  }
};
export const setModelGoals = async (templateID, screenName, value) => {
  // const validateResponse = (response) => {
  //   if (response.status !== 200) {
  //     throw new Error(`Error updating value: ${response.data.message}`);
  //   }
  // };
  //
  const body = {
    templateID,
    screenName,
    value,
  };
  try {
    //console.log(body)
    const response = await axios.put("/api/templateModelGoals", body, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${req.session.access_token}`
      // }
    });
    //validateResponse(response);
    const templateIndex = state.templates.findIndex(
      (template) => template._id == templateID
    );
    const modelIndex = state.templates[templateIndex].models.findIndex(
      (model) => model.screenName == screenName
    );
    // console.log(response.data.body, modelIndex);
    state.templates[templateIndex].models[modelIndex].goals = value;
  } catch (error) {
    console.error(error.message);
  }
};
export const addRoomTemplate = async (items, model, room) => {
  const nano = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);
  const id = nano();
  const result = await axios.post("/api/roomFollow", {
    data: {
      id,
      items,
      model,
      room,
    },
  });
  const { response, data } = result.data;
  const newAsset = {
    _id: ObjectId(response.insertedId),
    ...data,
  };
  state.roomFollow = [...state.roomFollow, newAsset];
  return newAsset;
};
export const modifyRoomFollow = async (
  _id,
  statusKey,
  by,
  items,
  responsible,
  note
) => {
  const asset = state.roomFollow?.find((follow) => follow._id == _id);
  const media = await uploadAll("roomFollow", asset.id);
  const result = await axios.put("/api/editRoomFollow", {
    _id,
    statusKey,
    media: media.map((md) => ({ location: md.location, type: md.type })),
    by,
    items,
    responsible,
    note,
  });
  console.log("editRoomFollow", result.data);
  const { status } = result.data;
  status.media = media;
  !asset.status && (asset.status = []);
  asset.status = [...asset.status, status];
  // alert("done")
};
export const getFollowsByRoom = (roomId, roomFollow) => {
  const filteredFollows = roomFollow?.filter((follow) => follow.room == roomId);
  // alert(filteredFollows.length);
  const actualFollow =
    filteredFollows?.length > 0 &&
    !filteredFollows[filteredFollows.length - 1].status?.find(
      (status) => status.key == "reviewFinish"
    ) &&
    filteredFollows[filteredFollows.length - 1];
  const lastFollow =
    !actualFollow &&
    filteredFollows?.length > 0 &&
    filteredFollows[filteredFollows.length - 1];
  return { actualFollow, filteredFollows, lastFollow };
};
export const addNew = async (title, press, toShare) => {
  const nano = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);
  const id = nano();
  const media = await uploadAll("news", id);
  const result = await axios.post("/api/news", {
    data: {
      title,
      press,
      media: media.map((md) => ({ location: md.location, type: md.type })),
      toShare,
    },
  });
  const { response, data } = result.data;
  state.news = [
    ...state.news,
    {
      _id: ObjectId(response.insertedId),
      ...data,
      media,
    },
  ];
};
export const addTemplate = async (template) => {
  template.modules.forEach((module) => {
    module._id = ObjectId();
    module.items.forEach((item) => (item._id = ObjectId()));
  });
  const result = await axios.post("/api/templates", {
    data: template,
  });
  const { response, data } = result.data;
  state.templates = [
    ...state.templates,
    {
      _id: ObjectId(response.insertedId),
      ...data,
      // modules: template,
    },
  ];
};
export const makeItAdmin = async (
  userId,
  email,
  pass,
  auth,
  screenName = ""
) => {
  await axios.post("api/makeAdmin", {
    userId,
    email,
    pass,
    auth,
    screenName,
  });
  const user = state.users.find((user) => user._id == userId);
  user.info.email = email;
  user.log = { auth };
};
export const autoCreateModelsUser = async () => {
  jasminState.activePerformers.forEach(async (model) => {
    const result = await axios.post("/api/users", {
      data: {
        info: {},
        model: { jasmin: model.screenName },
      },
    });
  });
  state.users
    .filter((user) => user.model)
    .forEach((user) =>
      makeItAdmin(
        user._id,
        undefined,
        "imperialStudio",
        "model",
        user.model.jasmin
      )
    );
};
export const addUser = (user) => {
  state.users = [...state.users, user];
};
export const addRoom = (room) => {
  state.rooms = [...state.rooms, room];
};
export const addProduct = (product) => {
  state.shop = [...state.shop, product];
};
export const setAssets = (assets) => {
  Object.entries(assets).map(([key, value]) => {
    state[key] = [];
    state[key].push(...value);
  });
  // state.rooms = [];
  // state.users = [];
  // state.shop.push(...assets.shop);
  // state.rooms.push(...assets.rooms);
  // state.users.push(...assets.users);
  // populateRooms();
};
export const pinNew = async (id, isPinned) => {
  const result = await axios.put("/api/pinNew", {
    id,
    isPinned,
  });
  // const { respons } = result.data;
  const press = state.news.find((press) => press._id == id);
  press.pinned = isPinned;
  // toast.success(`pin`, {
  //   theme: "dark",
  // });
};
export const toggleSelect = (id) => {
  // const selectedAsset = state.assets.find((asset) => asset.id == id);
  // selectedAsset.selected = !selectedAsset.selected;
};
export const deleteAssets = async () => {
  console.log("was delete");
  state.deleting = true;
  const assets = state.assets
    .filter((asset) => asset.selected)
    .map((asset) => asset.id);
  await axios.delete("api/assets", { data: assets });
  state.assets = [...state.assets.filter((asset) => !asset.selected)];
  state.deleting = false;
};
export const deleteAsset = async (collection, assetId) => {
  if (confirm("Estas seguro de ELIMINAR?")) {
    console.log("collection", collection);
    const result = await axios.delete("api/assets", {
      data: {
        collection: collection,
        assets: [assetId],
      },
    });
    state[collection] = state[collection]?.filter(
      (asset) => asset._id != assetId
    );
    // populateRooms();
    console.log("Delete result: ", result);
    toast.success(`Elemento eliminado`, {
      theme: "dark",
    });
  }
};
export const addRoomElement = async (roomId, newElement) => {
  const { data } = await axios.post(`/api/roomElement`, {
    collection: "inventory",
    roomId,
    element: newElement,
  });
  const { result, element } = data;
  const room = state.rooms.find((room) => room._id == roomId);
  !room[collection] && (room[collection] = []);
  room[collection] = [...room[collection], element];
};
export const addElement = async (collection, userId, newElement) => {
  const { data } = await axios.post(`/api/element`, {
    collection,
    userId,
    element: newElement,
  });
  const { result, element } = data;
  const user = state.users.find((user) => user._id == userId);
  !user[collection] && (user[collection] = []);
  user[collection] = [...user[collection], element];
  // populateRooms();
};
export const addModel2Template = async (templateId, screenName) => {
  const { data } = await axios.post(`/api/templateModel`, {
    templateId,
    screenName,
  });
  const { result, element } = data;
  console.log("element: ", element);
  const template = state.templates.find(
    (template) => template._id == templateId
  );
  !template.models && (template.models = []);
  template.models = [...template.models, element];
};
export const deleteModelFromTemplate = async (templateId, screenName) => {
  const { data } = await axios.delete(`/api/templateModel`, {
    data: {
      templateId,
      screenName,
    },
  });
  const { result, element } = data;
  const template = state.templates.find(
    (template) => template._id == templateId
  );
  template.models = template.models?.filter(
    (mdl) => mdl.screenName != screenName
  );
};
export const updateElement = async (collection, userId, elementId, params) => {
  const { data } = await axios.put(`/api/element`, {
    collection,
    userId,
    elementId,
    params,
  });
  // const { result, element } = data;
  const user = state.users.find((user) => user._id == userId);
  !user[collection] && (user[collection] = []);
  var element = user[collection].find((element) => element._id == elementId);
  Object.entries(params).map(([key, value]) => (element[key] = value));
  // populateRooms();
  return data;
};
export const deleteElement = async (collection, userId, elementId) => {
  if (confirm("Estas seguro de ELIMINAR este elemento?")) {
    const { data } = await axios.delete(`/api/element`, {
      data: {
        collection,
        userId,
        elementId,
      },
    });
    const { result, element } = data;
    // console.log('adq result: ', result, ' adq: ', adq);
    // const found = state.users.find((user) => user._id == userID);
    const user = state.users.find((user) => user._id == userId);
    user[collection] = user[collection]?.filter(
      (elem) => elem._id != elementId
    );
    // populateRooms();
  }
  // !SelectedState.selected.adq && (SelectedState.selected.adq = []);
  // SelectedState.selected.adq.push(adq);
  // found.adq = SelectedState.selected.adq;
  // SelectedState.selected = found;
  // console.log(found.adq);
};
// export const emit = (message) => {
//     // provider.send({mess:'hey'});
//     provider.signalingConns.forEach(conn => {
//         // only subcribe if connection is established, otherwise the conn automatically subscribes to all room
//         if (conn.connected) {
//             state.emmiter.emit('sup');
//             //   if (room.webrtcConns.size < room.provider.maxConns) {
//             //     publishSignalingMessage(conn, room, { type: 'announce', from: room.peerId })
//             //   }
//         }
//     });
// };
export const addAdq = async (userID, newAdq) => {
  const { data } = await axios.post("/api/adq", {
    userId: userID,
    adq: newAdq,
  });
  const { result, adq } = data;
  console.log("adq result: ", result, " adq: ", adq);
  // const found = state.users.find((user) => user._id == userID);
  const user = state.users.find((asset) => asset._id == userID);
  !user.adq && (user.adq = []);
  user.adq = [...user.adq, adq];
  // !SelectedState.selected.adq && (SelectedState.selected.adq = []);
  // SelectedState.selected.adq.push(adq);
  // found.adq = SelectedState.selected.adq;
  // SelectedState.selected = found;
  // console.log(found.adq);
};
export const deleteAdq = async (userId, adqId) => {
  if (confirm("Estas seguro de ELIMINAR esta compra?")) {
    const { data } = await axios.delete("/api/adq", {
      data: {
        userId,
        adqId,
      },
    });
    const user = state.users.find((user) => user._id == userId);
    user.adq = user.adq?.filter((adq) => adq._id != adqId);
    const { result } = data;
  }
};
export const addNote = async (userId, newNote) => {
  const { data } = await axios.post("/api/note", {
    userId: userId,
    note: newNote,
  });
  const { result, note } = data;
  console.log("stay result: ", note);
  const user = state.users.find((user) => user._id == userId);
  !user.notes && (user.notes = []);
  user.notes = [...user.notes, note];
  // found.stay = [...found.stay];
};
export const deleteNote = async (userId, noteId) => {
  if (confirm("Estas seguro de ELIMINAR esta nota?")) {
    const { data } = await axios.delete("/api/note", {
      data: {
        userId,
        noteId,
      },
    });
    const user = state.users.find((user) => user._id == userId);
    user.notes = user.notes?.filter((note) => note._id != noteId);
    const { result } = data;
  }
};
export const addStay = async (userId, newStay) => {
  const { data } = await axios.post("/api/stay", {
    userId: userId,
    stay: newStay,
  });
  const { result, stay } = data;
  console.log("stay result: ", stay);
  const user = state.users.find((user) => user._id == userId);
  !user.stay && (user.stay = []);
  user.stay = [...user.stay, stay];
  // found.stay = [...found.stay];
};
export const roomFollowStates = {
  requestStart: {
    label: "INICIO SOLICITADO",
    responsible: "monitor",
    next: "reviewStart",
    actionLabel: "SOLICITAR INICIO",
  },
  reviewStart: {
    label: "INICIO REVISADO",
    responsible: "model",
    next: "requestFinish",
    actionLabel: "FIRMAR REVISION DE INICIO",
  },
  requestFinish: {
    label: "FINALIZACION SOLICITADA",
    responsible: "monitor",
    next: "reviewFinish",
    actionLabel: "SOLICITAR FIN",
  },
  reviewFinish: {
    label: "FINALIZACION REVISADA",
    responsible: "model",
    actionLabel: "FIRMAR REVISION DE FIN",
  },
};
export const changeUserMedia = async (userId) => {
  const media = await uploadAll("users", userId);
  await axios.put("api/editUserMedia", { media });
  state.users.find((user) => user._id == userId).media = media;
};
export const useAssets = () => useSnapshot(state);
export default state;
