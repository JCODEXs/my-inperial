import { useSubmit, updateNew, uploadAll, onRefInput } from "vStore/submit";
// import classnames from "classnames";
import { useDropzone } from "react-dropzone";
import styles from "./uploadFiles.module.css";
import Preview from "./preview.js";

// import { useSubmit } from "vStore/submit";
export default function UploadFiles({ onSubmit }) {
  const { newSubmission, validSubmission, testUrl } = useSubmit();
  const onDragEnter = (event, param2) => {};
  console.log("Drag Enters: ", newSubmission); //event, para2);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: updateNew,
    onDragEnter,
  });
  return (
    <div id="submitPage" align="center" className={styles.submit}>
      <div
        style="margin:5px;padding:20px;display:flex;flex-direction:column;"
        className="baseStyle"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div style="display:flex;gap:20px;align-items:center;justify-content:space-evenly;">
          <div style="flex:1;display:flex;flex-direction:column;gap:10px;align-items:center;">
            <img
              style="height:60px;width:60px;padding:5px;"
              src="/assets/imageIcon.png"
            />
            {newSubmission.filter((media) => !media.isSignature).length > 0 ? (
              <div style="color:#2EFF2E;">Medios seleccionados</div>
            ) : (
              <div>Agrega una imagen o un video</div>
            )}
          </div>
        </div>
        {isDragActive ? (
          <p>Suelta los archivos para agregar</p>
        ) : (
          <p>Arrastra o haz 'click' en el area para agregar archivos</p>
        )}
      </div>
      {<Preview />}
    </div>
  );
}
