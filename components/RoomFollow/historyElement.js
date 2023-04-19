import { useJasmin } from "vStore/jasmin";
import { useTime } from "vStore/time";
import { useAssets, roomFollowStates } from "vStore/assets";
import Gallery from "components/Admin/FullPress/gallery";
import moment from "moment";
const dateOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
export default function HistoryElement({ status, setPic = () => {} }) {
  const { users } = useAssets();
  const { allPerformers } = useJasmin();
  const user = users.find((user) => user._id == status.by);
  const performer = allPerformers?.find(
    (performer) => performer.screenName == status.by
  );
  return (
    <div style="padding:10px;">
      <div
        style="display:flex;flex-wrap:wrap;padding:10px;gap:10px;
justify-content:space-evenly;
        "
      >
        <div> {roomFollowStates[status.key]?.label}</div>
        <div>
          {`por ${
            status.responsible == "model"
              ? performer.displayName
              : `${user?.info.name} ${user.info.surname}`
          }`}
        </div>
        <Elapsed utc={status.utc} />
      </div>
      <div
        style="
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        gap:10px;
        font-size:80%;
        margin-bottom:10px;"
      >
        {status.items?.map((item) => (
          <div
            style={`border-radius:5px;padding:5px;background:${
              item.isFine ? "rgba(0,60,10,0.6)" : "rgba(60,0,10,0.6)"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
      <Gallery
        media={status.media}
        action={(e, pic) => {
          e.preventDefault();
          e.stopPropagation();
          setPic(pic);
        }}
      />
      {status.note}
    </div>
  );
}
function Elapsed({ utc }) {
  const { time } = useTime();
  return (
    <>
      <div>{new Date(utc).toLocaleDateString("es-ES", dateOptions)}</div>
      <div>{moment(utc).from(time)}</div>
    </>
  );
}
