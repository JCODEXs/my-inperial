import styles from "./uploadFiles.module.css";
import { useSubmit, removeThumb } from "vStore/submit";
import { useState } from "preact/hooks";
const Preview = () => {
  const { newSubmission, validSubmission } = useSubmit();
  return (
    <div class={styles.preview}>
      <div
        style={{
          // height: '350px',
          // maxHeight: '350px',
          flex: 1,
          overflow: "hidden",
        }}
      >
        {newSubmission.length > 0 ? (
          <div style="display:flex;gap:5px;max-width:100%;overflow-x:scroll;overflow-y:hidden;">
            {newSubmission
              ?.filter((media) => !media.isSignature)
              .map((media, idx) => (
                <div
                  style="background:black;
              border-radius:10px;
              margin:5px;
              overflow:hidden;
              min-width:300px;,
              "
                  key={idx}
                >
                  {media.file.type.split("/")[0] == "image" ? (
                    <img
                      style={{
                        minWidth: "300px",
                        maxHeight: "200px",
                        flex: 1,
                        overflow: "hidden",
                      }}
                      src={media.preview}
                    />
                  ) : (
                    <video
                      style={{
                        minWidth: "300px",
                        maxHeight: "200px",
                        flex: 1,
                        overflow: "hidden",
                      }}
                      onPlay={(e) => {
                        console.log("vid: ", e);
                        document
                          .querySelectorAll("video")
                          .forEach((vid) => vid !== e.target && vid.pause());
                      }}
                      // preload="auto"
                      loop
                      // autoPlay
                      controls
                      webkit-playsinline="true"
                      playsInline
                      crossOrigin="anonymous"
                      // muted
                    >
                      <source src={media.preview} type={media.file.type} />
                    </video>
                  )}
                  <div style="background:rgb(20,20,20);display:flex;padding:3px;">
                    <div style="flex:1;">{media.file.type}</div>
                    <button onClick={() => removeThumb(idx)}>X</button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div>NO SE HAN AGREGADO ARCHIVOS AÚN</div>
        )}
      </div>
    </div>
  );
};
export default Preview;
