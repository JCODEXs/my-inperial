import currency from "currency.js";
import {
  useJasmin,
  setTimezone,
  toggleStatsSection,
  statsSections,
} from "vStore/jasmin";
import { useState, useEffect, useRef } from "preact/hooks";
import gsap from "gsap";
import moment from "moment";
import ModelOnline from "./modelOnline";
import ModelName from "./modelName";
export default function ModelInfo({ model }) {
  const { timezone, statsSection } = useJasmin();
  const earnings = useRef();
  useEffect(async () => {
    // await gsap.to(earnings.current, {
    //   duration: 0.2,
    //   color: "lime",
    // });
    // gsap.to(earnings.current, {
    //   duration: 0.2,
    //   color: "silver",
    // });
  }, [model.stats]);
  const stats = model.stats[timezone];
  const include = new Set([
    "free",
    "member",
    "private",
    "vip_show",
    "pre_vip_show",
    "other",
  ]);
  const dontInclude = new Set([
    "scheduled_show",
    "freemium_tip",
    "battle_tip",
    "hot_show_surprise",
  ]);
  const mssnDetails = (data) => {
    return (
      <div
        style="
        display:flex;
        gap:5px;
        background:rgba(100,100,100,0.2);
        padding:2px;
        border-radius:6px;
        border:1px solid rgba(100,100,100,0.4);
        "
      >
        <div style="flex:1;">
          {data.type == "text" ? "💬" : data.type == "image" ? "🖼️" : "🎞️"}
        </div>
        <div style="flex:1;width:20px;">{data.count}</div>
        <div style="flex:1;">
          {currency(data.price, {
            precision: 2,
          }).format()}
        </div>
      </div>
    );
  };
  // export const statsSections = [
  //   "workingTime",
  //   "messengerDetails",
  //   "vipShowKpi",
  //   "earnings"
  // ];
  const StatsSection = () => {
    if (stats[statsSections[statsSection].name]) {
      switch (statsSections[statsSection].name) {
        case "workingTime":
          return stats?.workingTime
            ? Object.entries(
                Object.fromEntries(
                  Object.entries(stats?.workingTime).filter(([key, value]) =>
                    include.has(key)
                  )
                )
              ).map(([key, wT]) => (
                <div
                  style={`text-align:center;
opacity:${wT.value > 0 ? "1" : "0.3"};
                          `}
                >
                  <div>{key}</div>
                  <div>{moment.utc(wT.value * 1000).format("HH:mm")}</div>
                </div>
              ))
            : "Estadisticas no disponibles aún";
        case "messengerDetails":
          return (
            <div style="width:90%;">
              <div style="display:flex;gap:5px;">
                <div style="width:70px;">Enviados</div>
                <div style="display:flex;gap:5px;">
                  {stats.messengerDetails?.sent.map((data) =>
                    mssnDetails(data)
                  )}
                </div>
              </div>
              <div style="margin-top:5px;display:flex;gap:5px;">
                <div style="width:70px;">Recibidos</div>
                <div style="display:flex;gap:5px;">
                  {stats.messengerDetails?.received.map((data) =>
                    mssnDetails(data)
                  )}
                </div>
              </div>
            </div>
          );
        case "vipShowKpi":
          return (
            stats.vipShowKpi &&
            Object.entries(stats.vipShowKpi)?.map(
              ([key, value]) =>
                key !== "averages" && (
                  <div
                    style={`text-align:center;
opacity:${value.value > 0 ? "1" : "0.3"};
                          `}
                  >
                    <div>{key}</div>
                    <div>{value.value}</div>
                  </div>
                )
            )
          );
        case "earnings":
          return (
            stats?.earnings &&
            Object.entries(
              Object.fromEntries(
                Object.entries(stats?.earnings)?.filter(
                  ([key, value]) => !dontInclude.has(key)
                )
              )
            ).map(([key, wT]) => (
              <div
                style={`text-align:center;
opacity:${wT.value > 0 ? "1" : "0.3"};
                          `}
              >
                <div>{key}</div>
                <div>
                  {currency(wT.value, {
                    precision: 2,
                  }).format()}
                </div>
              </div>
            ))
          );
      }
    } else {
      return "Estadisticas no disponibles aún";
    }
  };
  return (
    <div
      style={`
	    z-index:20;
	    background:${
        model.stats?.status == "active"
          ? "rgba(60,0,20,0.8)"
          : "rgba(20,20,20,0.8)"
      };
	    border-bottom:3px solid rgba(20,20,20,0.8);
	    align-items:center;
	    padding:5px;
	    min-height:30px;
	    filter: drop-shadow(0 0 0.5rem black);
overflow-x:hidden;
	    `}
    >
      <div
        style={`
	    align-items:center;
	    min-height:30px;
	    display:flex;gap:15px;
	    filter: drop-shadow(0 0 0.5rem black);
	    `}
      >
        <ModelOnline model={model} />
        <ModelName displayName={model.displayName} id={model.id} />
        {/*
          <div
            style="flex:1;font-size:80%;       
    white-space: nowrap;
            "
          >{`${model.screenName} `}</div>
<div style="flex:1;">{`a.k.a. ${item.item.screenName} `}</div> */}
        <div
          ref={earnings}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTimezone(timezone == "co" ? "lx" : "co");
          }}
          style="position:relative;display:flex;flex-direction:column;align-items:right;
	      border:solid 2px rgba(100,100,100,0.3);padding:10px;border-radius:10px;"
        >
          <div style="position:absolute;top:5px;left:5px;">
            {timezone == "lx" ? "🇱🇺" : "🇨🇴"}
          </div>
          <b style="flex:1;text-align:right;">{`${currency(
            stats?.total?.earnings.value,
            {
              precision: 2,
            }
          ).format()} `}</b>
          <div style="display:flex;gap:10px;">
            <div style="width:65px;text-align:right;">
              {currency(stats?.total?.averageEarningPerHour.value, {
                precision: 2,
              }).format()}
            </div>
            <div style="flex:1;text-align:right;">{`(${moment
              .utc(stats?.total?.workTime.value * 1000)
              .format("HH:mm")})`}</div>
          </div>
          {/* <div style="display:flex;flex:1;justify-content:right;"> */}
          {/*   {[...Array(Math.floor(Math.random() * 5))].map(() => ( */}
          {/*     <div> ⭐ </div> */}
          {/*   ))} */}
          {/* </div> */}
          {/* <img */}
          {/*   style="height:10px;width:10px;transform:scale(2);padding:5px;" */}
          {/*   src="/wapp.png" */}
          {/* /> */}
        </div>
      </div>
      <div
        style="position:relative;
          border: solid 2px rgba(100,100,100,0.3);
          border-radius:5px;
          margin-top:15px;
          padding:5px;
        padding-top:10px;
        "
      >
        <div style="position:absolute;top:-8px;font-size:80%;font-weight:600;">{`${statsSections[statsSection].icon} ${statsSections[statsSection].name}`}</div>
        <div
          style="
          font-size:85%;
          display:flex;
        min-height:30px;
          flex-wrap:wrap;
          justify-content:space-evenly;
        align-items:center;
          gap:10px;
        "
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleStatsSection();
          }}
        >
          {stats ? StatsSection() : "No hay estadisticas disponibles"}
        </div>
      </div>
      {false && <pre>{JSON.stringify(stats, null, 2)}</pre>}
    </div>
  );
}
