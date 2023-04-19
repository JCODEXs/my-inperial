import React from "react";
export default function TimeFormat({ type, time }) {
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const shortDate = time
    ? new Date(time).toLocaleDateString("es-ES", dateOptions)
    : "Pendiente";

  return type == "start" ? (
    <div style="display:flex;margin:5px"> {`⏳ ${shortDate}`}</div>
  ) : (
    <div style="margin:5px">{`⌛️ ${shortDate}`}</div>
  );
}
