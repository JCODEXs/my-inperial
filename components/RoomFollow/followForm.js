import React, { useImperativeHandle, useState, useEffect, useRef } from "react";
import Toggle from "components/Toggle";
import UploadFiles from "components/Submit/UploadFiles";
import Signature from "./signature";
import {
  getAsset,
  roomFollowStates,
  addRoomTemplate,
  modifyRoomFollow,
} from "vStore/assets";
import { useOverlays } from "vStore/overlays";
import { setSelected, useSelected } from "vStore/selected";
import { useSubmit } from "vStore/submit";
import { useJasmin } from "vStore/jasmin";
import { useLogin } from "vStore/login";
import PenCanvas from "components/utilities/penCanvas";
import Overlay from "components/Overlay";
const FollowForm = React.forwardRef(function FollowForm(
  { follow, onFinish = () => {} },
  ref
) {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(false);
  const { neo, main } = useOverlays();
  const { section } = useSelected();
  const { newSubmission } = useSubmit();
  const { allModels } = useJasmin();
  const { user, originalUser } = useLogin();
  var note = "";
  const ol = useRef();
  const room = getAsset("rooms", follow.room);
  const actualStatus =
    follow?.status && follow.status[follow.status.length - 1];
  const nextKey = actualStatus
    ? roomFollowStates[actualStatus?.key]?.next
    : "requestStart";
  const nextStatus = roomFollowStates[nextKey];
  const setValue = (e, name) => {
    setItems((prev) => {
      var newState = [...prev];
      const elem = newState.find((item) => item.id == name.id);
      elem.isFine = e;
      return newState;
    });
  };
  const submitStatus = async () => {
    nextKey == "requestStart" &&
      (follow = await addRoomTemplate(items, follow.model, follow.room));
    await modifyRoomFollow(
      follow._id,
      nextKey,
      nextStatus?.responsible == "model" ? follow.model : follow.creation.by,
      items,
      nextStatus?.responsible,
      note
    );
    if (section == "roomFollow") {
      neo.ref.current.close();
      setSelected(follow._id);
      main.ref.current.open();
    } else {
      onFinish(follow);
    }
  };
  useImperativeHandle(ref, () => ({
    items,
    getItems() {
      return items;
    },
    test() {
      alert("test");
    },
  }));
  useEffect(() => {
    setItems(room?.inventory ? [...room.inventory] : []);
  }, [room?._id]);
  // border-top:2px solid silver;
  const uploadEnabled =
    nextStatus?.responsible == "monitor" ||
    (nextStatus?.responsible == "model" && items?.some((item) => !item.isFine));
  const buttonDisabled =
    (uploadEnabled &&
      newSubmission.filter((media) => !media.isSignature).length < 1) ||
    (nextStatus?.responsible == "model" &&
      !newSubmission.some((media) => media.isSignature));
  const model = allModels.find((model) => model.screenName == follow.model);
  return (
    actualStatus?.key !== "reviewFinish" && (
      <>
        <Overlay ref={ol}>
          <Signature
            model={model.displayName}
            onSuccess={async () => {
              ol.current?.close();
              await submitStatus();
            }}
          />
        </Overlay>
        <div
          style="position:sticky;top:0px;padding:10px;background:rgba(5,5,5);z-index:10;
            border-bottom:2px solid rgba(60,60,60);
            "
        >
          {nextStatus?.responsible == "monitor"
            ? "TURNO DEL MONITOR"
            : "TURNO DE LA MODELO"}
        </div>
        {!loading ? (
          (user.log.auth !== "model" || nextStatus?.responsible == "model") && (
            <>
              <div
                style="margin-top:10px;
        display:flex;
        flex-wrap:wrap;
        align-content:stretch;
        padding-left: 1rem;
        justify-content: space-around;
        flex-wrap: wrap; 
            max-width:100%;padding: 5px;
        "
              >
                {items?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style=" 
                        "
                    >
                      <div>{item.name}</div>
                      <Toggle
                        name={item}
                        state={item.isFine}
                        onClick={setValue}
                      />
                    </div>
                  );
                })}
              </div>
              <div style="text-align:center;">
                {items?.some((item) => !item.isFine)
                  ? "Se presentan novedades, inconvenientes con ciertos items"
                  : "Items OK"}
              </div>
              <div style="padding:10px;display:flex;flex-direction:column;gap:10px;">
                <textarea
                  onChange={(e) => (note = e.target.value)}
                  style={{
                    flex: 1,
                    color: "silver",
                    background: "rgb(10,10,10)",
                    borderRadius: "5px",
                    marginTop: "50px",
                    minHeight: "70px",
                    maxHeight: "140px",
                  }}
                  placeholder={"AÑADIR NOTA"}
                />
                {uploadEnabled && <UploadFiles retriveUpload={false} />}
                {nextStatus?.responsible == "model" && <PenCanvas />}
              </div>
              <div
                style=" margin-top:60px;background: rgb(20,20,20,1);
                position:sticky;
                bottom: 0px;
        justify-content:space-around;
                display:flex;
                gap:1rem;padding:10px;flex-wrap:wrap;
            border-top:2px solid rgba(60,60,60);

                  "
              >
                <button
                  disabled={buttonDisabled}
                  class={buttonDisabled && "disabled"}
                  onClick={async (e) => {
                    setLoading(true);
                    e.target.disabled = true;
                    e.target.class = "disabled";
                    if (
                      nextStatus?.responsible == "model" &&
                      originalUser.log.auth !== "model"
                    ) {
                      ol.current.open();
                    } else {
                      await submitStatus();
                    }
                    e.target.disabled = false;
                    e.target.class = "";
                    setLoading(false);
                  }}
                  style="font-size:18px;padding:3px;background:rgba(40,110,20,0.8);"
                >
                  {nextStatus?.actionLabel}
                </button>
              </div>
            </>
          )
        ) : (
          <div style="padding:20px;">CARGANDO...</div>
        )}
      </>
    )
  );
});
export default FollowForm;
