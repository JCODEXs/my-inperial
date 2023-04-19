import { useSubmit } from "vStore/submit";
import { useRef, useState, useEffect } from "react";
import Maximized from "components/Admin/FullPress/maximized";
import FilesLoading from "components/Submit/FilesLoading";
import FollowForm from "./followForm";
import FollowInfo from "./followInfo";
import HistoryElement from "./historyElement";
export default function FullRoomFollow({ follow, onFinish = () => {} }) {
  const [pic, setPic] = useState();
  const [media, setMedia] = useState();
  const { loading } = useSubmit();
  const followForm = useRef();
  useEffect(async () => {
    setPic(undefined);
    setMedia(undefined);
  }, [follow]);
  return loading ? (
    <FilesLoading />
  ) : (
    <div
      style="
        position:relative;
        max-width:100%;
        max-height:100%;
        height:100%;
        overflow-y:auto;
        overflow-x:hidden;"
    >
      <FollowInfo follow={follow} showGallery={false} />
      {pic && <Maximized pic={pic} setPic={setPic} media={media} />}
      <div style="border-top:2px solid rgb(60,60,60);">
        {follow.status?.length &&
          follow.status.map((status) => {
            return (
              <div style="border-bottom:2px solid rgb(60,60,60);">
                <HistoryElement
                  status={status}
                  setPic={(pic) => {
                    setMedia(status.media);
                    setPic(pic);
                  }}
                />
              </div>
            );
          })}
      </div>
      <FollowForm ref={followForm} follow={follow} />
    </div>
  );
}
