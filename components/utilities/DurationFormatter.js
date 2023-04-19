import React from "react";
import moment from "moment";
import { useTime } from "vStore/time";

const DurationFormatter = (props) => {
  const { time } = useTime();

  function formatTimeDifference(startDate, finishDate) {
    let timeDifference =
      new Date(finishDate).getTime() - new Date(startDate).getTime();
    let hours = Math.floor(timeDifference / (1000 * 60 * 60));
    timeDifference -= hours * (1000 * 60 * 60);
    let minutes = Math.floor(timeDifference / (1000 * 60));
    timeDifference -= minutes * (1000 * 60);
    let seconds = Math.floor(timeDifference / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const sessionTime = !props.finishDate
    ? !props.startDate
      ? "Pendiente"
      : moment.utc(time.diff(props.startDate)).format("HH:mm:ss")
    : formatTimeDifference(props.startDate, props.finishDate);

  let sessionHours = 0;
  let sessionMinutes = 0;

  if (sessionTime > 60) {
    sessionHours = (sessionTime / 60).toFixed(0);
    sessionMinutes = (sessionHours % 60).toFixed(1);
  } else {
    sessionMinutes = sessionTime;
  }

  return (
    <div style={{ margin: "5px" }}>
      {`⏱ 
    ${sessionHours > 0 ? sessionHours : ""} 
    ${sessionHours > 0 ? "H :" : ""} ${sessionMinutes} `}
    </div>
  );
};

export default DurationFormatter;
