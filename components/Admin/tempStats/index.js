import { useState, useEffect, useLayoutEffect, useRef } from "preact/hooks";
import {
  useJasmin,
  setTimezone,
  requestStats,
  requestGlobal,
} from "vStore/jasmin";
import currency from "currency.js";
import moment from "moment";
// const sections = ["earnings", "workTime", "averageEarningPerHour"];
import dynamic from "next/dynamic";
const MainChart = dynamic(() => import("./mainChart"), {
  loading: () => "Loading",
  ssr: false,
});
// import MainChart from "./mainChart";
import CustomChart from "./customChart";
const years = ["2023", "2022", "2021", "2020", "2019", "2018"];
export default function TempStats({}) {
  const { stats, availableStats, resumedStats, timezone } = useJasmin();
  const [selectedPeriod, setSelectedPeriod] = useState("2023-01-04");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [type, setType] = useState("daily");
  const [selectedModel, setSelectedModel] = useState("all");
  const [source, setSource] = useState("earnings");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const adapt = (source) => {
    var adapted = [];
    Object.entries(source).forEach(([chunk, chunkStats]) =>
      chunkStats[timezone]?.forEach((modelStats) => {
        const found = adapted.find(
          (modelData) => modelData.screenName == modelStats.screenName
        );
        if (!found) {
          adapted.push({
            screenName: modelStats.screenName,
            displayName: modelStats.displayName,
            chunks: { [chunk]: modelStats.total },
          });
        } else {
          found.chunks[chunk] = modelStats.total;
        }
        // console.log("modelStats.total: ", modelStats.total);
      })
    );
    return [Object.keys(source), adapted];
  };
  const adaptData = {
    daily: () => stats[selectedPeriod] && adapt(stats[selectedPeriod]),
    global: () =>
      resumedStats[selectedYear] && adapt(resumedStats[selectedYear]),
    custom: () => {
      return [];
    },
  };
  const actualStats =
    type == "global"
      ? resumedStats && resumedStats[selectedYear]
      : stats && stats[selectedPeriod];
  useEffect(() => {
    //   alert(type);
    // alert(selectedPeriod);
    setData(adaptData[type]());
    // if (stats[selectedPeriod]) {
    //   data.current = [];
    // }
  }, [type, stats[selectedPeriod], resumedStats[selectedYear], timezone]);
  useEffect(async () => {
    setLoading(true);
    await requestStats(selectedPeriod);
    setLoading(false);
    // setData(adaptData[type]());
  }, [selectedPeriod]);
  useEffect(async () => {
    setLoading(true);
    await requestGlobal(selectedYear);
    setLoading(false);
    // setData(adaptData[type]());
  }, [selectedYear]);
  //  alert("render");
  return (
    <div style="overflow-y:scroll;height:100%;max-height:100%;">
      <div
        style="
        z-index:1000;
        position:sticky;
        top:0px;
        background:rgb(10,10,10);
        padding:5px;
        font-weigth:1000;
        display:flex;
        flex-wrap:wrap;
        gap:10px;
        border-bottom: 2px solid rgb(100,100,100);"
      >
        <select
          value={type}
          onChange={(e) => {
            //    alert("change");
            setType(e.target.value);
          }}
        >
          <option value="global">GLOBAL</option>
          <option value="daily">DIARIO</option>
          {false && <option value="custom">CUSTOM</option>}
        </select>
        <select
          value={selectedModel}
          onChange={(e) => {
            setSelectedModel(e.target.value);
          }}
        >
          <option value="all">ESTUDIO</option>
          {data &&
            data[1]?.map((model) => (
              <option
                // onMouseOver={(e) => {
                //   setSelectedModel(model.screenName);
                // }}
                value={model.screenName}
              >
                {model.displayName}
              </option>
            ))}
        </select>
        <button
          disabled={selectedModel == "all"}
          class={selectedModel == "all" && "disabled"}
          onClick={() => setSelectedModel("all")}
        >
          ESTUDIO
        </button>
        {type == "daily" && availableStats && (
          <>
            <select onChange={(e) => setSelectedPeriod(e.target.value)}>
              {[...availableStats]
                .sort((a, b) => moment(b) - moment(a))
                .map((period) => (
                  <option value={period}>{period}</option>
                ))}
            </select>
            {loading && "LOADING"}
          </>
        )}
        {type == "global" && (
          <>
            <select onChange={(e) => setSelectedYear(e.target.value)}>
              {[...years]
                .sort((a, b) => moment(b) - moment(a))
                .map((year) => (
                  <option value={year}>{year}</option>
                ))}
            </select>
            {loading && "LOADING"}
          </>
        )}
        <div style="flex:1;"></div>
        <div style="float:right;display:flex;gap:5px;padding:0px;justify-content:right;">
          <button
            disabled={source == "earnings"}
            class={source == "earnings" && "tab_selected"}
            onClick={() => setSource("earnings")}
          >
            💵
          </button>
          <button
            disabled={source == "workTime"}
            class={source == "workTime" && "tab_selected"}
            onClick={() => setSource("workTime")}
          >
            ⏱️
          </button>
          <button
            disabled={source == "averageEarningPerHour"}
            class={source == "averageEarningPerHour" && "tab_selected"}
            onClick={() => setSource("averageEarningPerHour")}
          >
            promed
          </button>
        </div>
      </div>
      {false && (
        <pre>
          {JSON.stringify(
            //Object.keys(stats)
            data[1],
            null,
            2
          )}
        </pre>
      )}
      {type == "global" || type == "daily" ? (
        <MainChart
          type={type}
          data={data}
          selectedModel={selectedModel}
          source={source}
          setSelectedModel={setSelectedModel}
        />
      ) : type == "custom" ? (
        <CustomChart />
      ) : (
        "ERROR"
      )}
      {false && (
        <pre>{JSON.stringify(periodStats.global[timezone], null, 2)}</pre>
      )}
      <div style="padding:10px;"> {timezone == "lx" ? "🇱🇺" : "🇨🇴"}</div>
      <div style="padding:10px;display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin-bottom:20px;">
        {actualStats
          ? Object.entries(actualStats).map(([key, value]) => {
              const totalEarnings = value[timezone]
                .filter(
                  (model) =>
                    selectedModel == "all" || model.screenName == selectedModel
                )
                .reduce(
                  (sum, model) =>
                    sum +
                    parseFloat(
                      isNaN(model.total.earnings.value)
                        ? 0
                        : model.total.earnings.value
                    ),
                  0
                );
              const totalTime = value[timezone].reduce(
                (sum, model) =>
                  sum +
                  (model.total.workTime.value
                    ? parseInt(model.total.workTime.value)
                    : 0),
                0
              );
              return (
                <>
                  {true && (
                    <div
                      style="width:110px;padding:5px;border:2px solid rgb(60,60,60);border-radius:10px;"
                      onClick={() =>
                        setTimezone(timezone == "co" ? "lx" : "co")
                      }
                    >
                      {false && <StatsPeriod />}
                      {key}
                      {true && (
                        <>
                          {true && (
                            <div style="display:flex;">
                              <b style="text-align:right;flex:1;">
                                {currency(totalEarnings, {
                                  precision: 2,
                                }).format()}
                              </b>
                            </div>
                          )}
                          {true && (
                            <div>
                              {`${currency(
                                totalTime > 0
                                  ? totalEarnings / (totalTime / 3600)
                                  : 0,
                                {
                                  precision: 2,
                                }
                              ).format()}
      (${moment.utc(totalTime * 1000).format("DD:HH:mm")})`}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </>
              );
            })
          : "Loading..."}
      </div>
    </div>
  );
}
// {false &&
//   Object.entries(stats).map(([key, period]) => (
//     <div style="background:rgba(10,10,10);border: 2px solid rgb(40,40,40);padding:10px;margin:5px;border-radius:10px;">
//       <h4>{key}</h4>
//       <div> {timezone == "lx" ? "🇱🇺" : "🇨🇴"}</div>
//       <div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;">
//         {true &&
//           Object.entries(period.days).map(([key, value]) => {
//             const totalEarnings = value[timezone].reduce(
//               (sum, model) =>
//                 sum +
//                 parseFloat(
//                   isNaN(model.total.earnings.value)
//                     ? 0
//                     : model.total.earnings.value
//                 ),
//               0
//             );
//             const totalTime = value[timezone].reduce(
//               (sum, model) =>
//                 sum +
//                 (model.total.workTime.value
//                   ? parseInt(model.total.workTime.value)
//                   : 0),
//               0
//             );
//             return (
//               <>
//                 {true && (
//                   <div
//                     style="width:110px;padding:5px;border:2px solid rgb(60,60,60);border-radius:10px;"
//                     onClick={() =>
//                       setTimezone(timezone == "co" ? "lx" : "co")
//                     }
//                   >
//                     {false && <StatsPeriod />}
//                     {key}
//                     {true && (
//                       <>
//                         {true && (
//                           <div style="display:flex;">
//                             <b style="text-align:right;flex:1;">
//                               {currency(totalEarnings, {
//                                 precision: 2,
//                               }).format()}
//                             </b>
//                           </div>
//                         )}
//                         {true && (
//                           <div>
//                             {`${currency(
//                               totalTime > 0
//                                 ? totalEarnings / (totalTime / 3600)
//                                 : 0,
//                               {
//                                 precision: 2,
//                               }
//                             ).format()}
// (${moment.utc(totalTime * 1000).format("DD:HH:mm")})`}
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 )}
//               </>
//             );
//           })}
//       </div>
//     </div>
//   ))}
