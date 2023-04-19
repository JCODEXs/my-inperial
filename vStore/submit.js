import { proxy, useSnapshot, ref, subscribe, snapshot } from "valtio";
// import gsap from 'gsap';
import axios from "axios";
import { nanoid, customAlphabet } from "nanoid";
import mime from "mime-types";
// console.log('win', typeof window);
const state = proxy({
  newSubmission: [],
  ref: "",
  testUrl: "",
  loading: false,
  validSubmission: false,
});
export const onRefInput = (e) => {
  state.ref = e.target.value;
};
export const resetSubmit = (assets) => {
  state.newSubmission = [];
};
const toBase64 = async (file) =>
  await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const uploadFile = async (id, submission) => {
  const file = submission.file;
  console.log("the submission: ", submission.file);
  const mimeType = mime.lookup(file.name);
  const fileName = encodeURIComponent(
    mimeType ? file.name : `nft.${file.name.split(".").pop()}`
  );
  // console.log("submission", submission);
  //
  //
  // console.log("si: ", res.data);
  const formData = new FormData();
  //
  //
  formData.append("file", file, `${id}/${fileName}`);
  // Object.entries({ ...fields, file }).forEach(([key, value]) => {
  //   formData.append(key, value);
  //   console.log("form", formData);
  // });
  //
  // {
  //   key: `${id}/${fileName}`,
  //
  //
  const res = await axios.post(
    `/api/upload-url-wasabi`,
    formData,
    // await toBase64(file),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // onUploadProgress: (progressEvent) => {
      //   const totalLength = progressEvent?.lengthComputable
      //     ? progressEvent.total
      //     : progressEvent.target.getResponseHeader("content-length") ||
      //       progressEvent.target.getResponseHeader(
      //         "x-decompressed-content-length"
      //       );
      //   // console.log('onUploadProgress', totalLength);
      //   if (totalLength) {
      //     submission.progress = Math.round(
      //       (progressEvent.loaded * 100) / totalLength
      //     );
      //   }
      //   // console.log('onUploadProgress', submission.progress);
      // },
    }
  );
  alert(res.data);
  state.testUrl = res.data;
  // const { url, fields } = res.data;
  // let upload;
  // try {
  //   upload = await axios.post(url, formData, {
  //     // onUploadProgress: (progressEvent) => {
  //     //   const totalLength = progressEvent?.lengthComputable
  //     //     ? progressEvent.total
  //     //     : progressEvent.target.getResponseHeader("content-length") ||
  //     //       progressEvent.target.getResponseHeader(
  //     //         "x-decompressed-content-length"
  //     //       );
  //     //   // console.log('onUploadProgress', totalLength);
  //     //   if (totalLength) {
  //     //     submission.progress = Math.round(
  //     //       (progressEvent.loaded * 100) / totalLength
  //     //     );
  //     //   }
  //     //   // console.log('onUploadProgress', submission.progress);
  //     // },
  //   });
  // console.log('Uploaded successfully!', upload);
  // } catch (e) {
  //   console.error("Upload failed:", e);
  // }
};
export const uploadFile2 = async (section, folderId, submission, fileId) => {
  const file = submission.file;
  // const mimeType = mime.lookup(file.name);
  // const filename = encodeURIComponent(
  //   mimeType ? file.name : `nft.${file.name.split(".").pop()}`
  // );
  const filename = `${section}_${folderId}_${fileId}.${
    file.type.split("/")[1]
  }`;
  console.log(filename);
  const res = await axios.get(
    `/api/upload-url-wasabi?file=${section}/${folderId}/${filename}`
  );
  console.log("uploadTest: ", res.data, " type: ", file.type);
  const { post, get } = res.data;
  console.log("si");
  let upload;
  try {
    upload = await axios.put(post, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent?.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
            progressEvent.target.getResponseHeader(
              "x-decompressed-content-length"
            );
        // console.log('onUploadProgress', totalLength);
        if (totalLength) {
          submission.progress = Math.round(
            (progressEvent.loaded * 100) / totalLength
          );
        }
        // console.log('onUploadProgress', submission.progress);
      },
    });
    console.log("Uploaded successfully!", upload);
    // state.testUrl = get;
    return {
      type: file.type,
      uri: get,
      location: `${section}/${folderId}/${filename}`,
    };
  } catch (e) {
    alert("FAIL");
    console.error("Upload failed.", e);
  }
};
export const uploadImages = async (id, submission) => {
  const file = submission.file;
  const mimeType = mime.lookup(file.name);
  const filename = encodeURIComponent(
    mimeType ? file.name : `nft.${file.name.split(".").pop()}`
  );
  const res = await axios.get(`/api/upload-url?file=${folderId}/${filename}`);
  const { url, fields } = res.data;
  console.log("si", res.data);
  const formData = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });
  let upload;
  try {
    upload = await axios.post(url, formData, {
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent?.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
            progressEvent.target.getResponseHeader(
              "x-decompressed-content-length"
            );
        // console.log('onUploadProgress', totalLength);
        if (totalLength) {
          submission.progress = Math.round(
            (progressEvent.loaded * 100) / totalLength
          );
        }
        // console.log('onUploadProgress', submission.progress);
      },
    });
    console.log("Uploaded successfully!", upload);
    state.testUrl = get;
  } catch (e) {
    console.error("Upload failed.", e);
  }
};
export const uploadAll = async (section, assetId) => {
  state.loading = true;
  const nano = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);
  // const result = await axios.post("/api/asset", { id, ref: state.ref });
  console.log("SUB: ", state.newSubmission);
  const media = await Promise.all(
    state.newSubmission.map((media) =>
      uploadFile2(section, assetId, media, nano())
    )
  );
  console.log("media: ", media);
  state.loading = false;
  resetSubmit();
  return media.filter((med) => med?.uri);
  //state.assets.push({ ...result2.data, ref: state.ref, selected: false });
};
export const updateSignature = async (files) => {
  // var update = [];
  const file = ref(files);
  // update.push();
  state.newSubmission = [
    { file, preview: URL.createObjectURL(file), isSignature: true },
    ...state.newSubmission.filter((media, _) => !media.isSignature),
  ];
  state.validSubmission = true;
  // console.log(update);
};
export const updateNew = async (files) => {
  // console.log(JSON.stringify(files, null, 2));
  var update = [];
  files.map((item) => {
    const file = ref(item);
    if (file.type.split("/")[0] === "image") {
      update.push({ file, preview: URL.createObjectURL(file) });
      console.log(update);
    } else if (file["type"].split("/")[0] === "video") {
      update.push({ file, preview: URL.createObjectURL(file) });
    }
    // Object.assign(file, {
    //   preview: URL.createObjectURL(file)
    // });
  });
  // setNewSubmission((prev) => {
  //   return { ...prev, ...update };
  // });
  state.newSubmission = [...state.newSubmission, ...update];
  state.validSubmission = true;
  //   Object.keys(state.newSubmission).every(
  //   (key) => state.newSubmission[key].file
  // );
  // alert("doing");
  // console.log(state.newSubmission);
};
export const removeThumb = (idx) => {
  state.newSubmission = state.newSubmission.filter((_, i) => i !== idx);
};
export const removeSignature = () => {
  state.newSubmission = state.newSubmission.filter(
    (media, _) => !media.isSignature
  );
};
subscribe(state, () => {
  //console.log('saving');
  // Object.keys(derived).forEach((key)=>state)
  // const snap = snapshot(state);
  // delete snap.newSubmission;
  // localStorage.setItem('submit', JSON.stringify({assets:state.assets},
  //     (key, value) => {
  //         // Check if key matches the string "pin" or "mob"
  //         // if matched return value "undefined"
  //         console.log('to save ', key, ' value: ', value);
  //          if (savedState[key]) {
  //              console.log('saving ', key);
  //             return value;
  //         }
  //         // else return the value itself
  //     }));
  // console.log(localStorage.getItem('submit'));
});
export default state;
export const useSubmit = () => useSnapshot(state);
