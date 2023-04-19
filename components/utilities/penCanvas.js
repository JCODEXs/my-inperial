import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { updateSignature, removeSignature } from "vStore/submit";
export default function PenCanvas() {
  const [trimmedDataURL, setTrimmedDataURL] = useState(false);
  let sigPad = {};
  const clear = () => {
    sigPad.clear();
    removeSignature();
    setTrimmedDataURL(false);
  };
  const trim = () => {
    if (!sigPad.isEmpty()) {
      setTrimmedDataURL(true);
      sigPad.getTrimmedCanvas().toBlob((blob) => {
        const fileObj = new File([blob], "signature.png", {
          lastModified: Date.now(),
          type: "image/png",
        });
        updateSignature(fileObj);
      }, "image/png");
    } else {
      alert("Firma vacia");
    }
  };
  return (
    <div
      style="overscroll-behaviour:none;width: 100%; height: 200 ;background:rgb(20,20,20,0.8) ; border:2px solid rgba(100,100,100,0.4);border-radius:6px"
      onMouseEnter={() => {}}
    >
      <div style="font-size:1.2rem; padding:4px">
        {!trimmedDataURL ? "Firmar" : "Firmado"}
      </div>
      <SignatureCanvas
        penColor="silver"
        canvasProps={{
          width: 1000,
          height: 200,
          velocityFilterWeight: 0.5,
          throttle: 50,
        }}
        ref={(ref) => {
          sigPad = ref;
        }}
      />
      <div style="display:flex; justify-content:flex-end; padding:3px;margin:3px;gap:20px;">
        <button onClick={clear}>Borrar</button>
        <button onClick={trim}>Aceptar</button>
      </div>
    </div>
  );
}
