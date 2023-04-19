import { useJasmin } from "vStore/jasmin";
import { useTime } from "vStore/time";
import moment from "moment";
export default function ModelOnline({ performer }) {
  const { lastPerformersState } = useJasmin();
  const { time } = useTime();
  const modelState = lastPerformersState?.find(
    (state) => state.screenName == performer.screenName
  );
  const statusColor =
    modelState?.state == "private"
      ? "red"
      : modelState?.state == "vip-show"
      ? "orange"
      : modelState?.state == "member-chat"
      ? "purple"
      : modelState?.state == "free-chat"
      ? "blue"
      : "black";
  const borderColor =
    modelState?.state && modelState.state !== "offline"
      ? statusColor
      : "transparent";
  return (
    <div
      style="
	      display:flex;
	      flex-direction:column;
	      align-items:center;
	      text-align:center;
	      width:50px;
          border-radius:5px;
// border:1px solid rgba(60,60,60);
	    min-width:80px;
	      gap:5px;"
    >
      <div style="font-size:80%;">
        {true && (
          <div style="">
            {modelState?.state == "vip-show"
              ? !modelState?.time
                ? "vip???"
                : time.diff(modelState?.time, "minutes") >= 5
                ? "vip-show"
                : "pre-vip"
              : modelState?.state}
          </div>
        )}
        <div style="">
          {modelState?.time &&
            moment.utc(time.diff(modelState.time)).format("HH:mm:ss")}
        </div>
      </div>
      <div
        style={`
	  border:1px solid palegoldenrod;
	  border-radius:50%;
	  width:20px;
	  height:20px;
	  background:${statusColor};
          filter: drop-shadow(0 0 0.45rem ${borderColor}) brightness(1.5) contrast(62%);
		`}
      ></div>
      <div style="font-size:75%;">{model.stats?.status}</div>
    </div>
  );
}
