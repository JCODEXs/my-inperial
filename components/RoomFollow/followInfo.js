import TimeFormat from "components/utilities/TimeFormat";
import DurationFormatter from "components/utilities/DurationFormatter";
import { useJasmin } from "vStore/jasmin";
import { useAssets, roomFollowStates } from "vStore/assets";
import Gallery from "components/Admin/FullPress/gallery";
import HistoryElement from "./historyElement";
export default function FollowInfo({ follow, showGallery = true }) {
  const { allModels } = useJasmin();
  const { users, rooms } = useAssets();
  const model = allModels?.find((model) => model.screenName == follow.model);
  const actualStatus = follow.status && follow.status[follow.status.length - 1];
  const createdBy = users.find((user) => user._id == follow.creation.by)?.info;
  const actualStatusCreator = actualStatus
    ? users?.find((user) => user._id == actualStatus?.by)?.info
    : createdBy;
  const startDate = follow.status && follow.status[0].utc;
  const finishDate =
    follow.status &&
    follow.status?.find((status) => status.key == "reviewFinish")?.utc;
  const room = rooms?.find((room) => room._id == follow.room);
  const nextKey = actualStatus
    ? roomFollowStates[actualStatus?.key]?.next
    : "requestStart";
  const nextStatus = roomFollowStates[nextKey];
  return (
    <div style="width:100%;">
      <div style="font-size:160%;padding:10px;">
        {`🛏️ ${follow.id}`} {`🚪 ${room?.info.name}`}
      </div>
      <div
        style="
      display:flex;
        flex-wrap:wrap;
        padding:10px;
      "
      >
        <div style="flex:1;">
          {false && roomFollowStates[actualStatus?.key]?.label}
          <div style="margin:2px">{`🕴 ${createdBy?.name} ${createdBy?.surname}`}</div>
          <div style="margin:2px">{`💃 ${model?.displayName}`}</div>
        </div>
        <div>
          <TimeFormat type={"start"} time={startDate} />
          <TimeFormat type={"finish"} time={finishDate} />
          <DurationFormatter startDate={startDate} finishDate={finishDate} />
        </div>
      </div>
      {showGallery && actualStatus && (
        <div style="margin:10px;background:rgba(20,20,20,0.6);border-radius:10px;">
          <HistoryElement status={actualStatus} />
        </div>
      )}
      <div style="padding:10px;">
        {actualStatus?.key !== "reviewFinish" &&
          (nextStatus?.responsible == "monitor"
            ? "ES TURNO DEL MONITOR"
            : "ES TURNO DE LA MODELO")}
      </div>
    </div>
  );
}
