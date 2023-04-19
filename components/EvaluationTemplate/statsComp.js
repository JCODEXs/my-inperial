import { useJasmin, requestStats, requestTemplateStats } from "vStore/jasmin";
import { useEffect, useState } from "react";
import adapt from "components/utilities/adaptData.js";
export default function ForShow(info) {
  const { allPerformers } = useJasmin();
  const models =
    info?.info?.models &&
    info?.info?.models
      ?.map((obj) => obj.screenName)
      .reduce((acc, curr) => acc + curr);
  const [selectedModel, setSelectedModel] = useState(models);
  // const actualModel=info?.info?.models[0]?.screenName;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState();
  const { templateStats, stats } = useJasmin();
  // const [allPerformersStats,setAllModelStats]=useState()
  const [days, setDays] = useState();
  const [actualStats, setActualStats] = useState();
  useEffect(async () => {
    setIsLoading(true);
    await requestStats(info?.info?.period?.period);
    await requestTemplateStats(info?.info?.period?.period, models);
    setIsLoading(false);
  }, [info?.id, models]);
  console.log(templateStats);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!stats[info?.info?.period?.period]) {
    return <div>No data available for this period.</div>;
  }
  useEffect(() => {
    const [availableDays, selectedModelStats] = adapt(
      stats[info?.info?.period?.period],
      selectedModel
    );
    setDays(availableDays);
    setSelectedDay(availableDays);
    setActualStats(selectedModelStats);
  }, [info, selectedModel]);
  const allModelStats =
    selectedDay &&
    selectedDay.map((day) => (
      <div>
        {day}
        {actualStats.map((actualModel) => (
          <div class="model-description" style=";padding:0.15rem">
            <div style="padding:12px 5px; font-size:85%; line-height:100%; text-align:right; display: flex; flex-direction: row;flex-wrap:wrap;padding:0.1rem;background: rgba(30, 30, 30, 0.5); border: 2px solid rgb(20, 20, 20); border-radius: 10px;">
              <div style="padding:0.1rem;display:flex; flex-direction:column; width:20%; vertical-align:top;min-width:150px">
                {/* <b>Modelo</b><br></br> */}
                <b title="name">{actualModel?.displayName ?? "modelo"}</b>
              </div>
              <div style="display:inline-block; width:20%; vertical-align:top;;min-width:150px">
                <b>Ganancias dia</b>
                <br></br>
                {actualModel?.chunks[day]?.earnings?.value.toFixed(2)}
              </div>
              <div style="display:inline-block; width:20%; vertical-align:top;;min-width:150px">
                <b>Tiempo en linea</b>
                <br></br>
                <b>
                  {(actualModel?.chunks[day]?.workTime?.value / 3600).toFixed(
                    2
                  )}
                </b>{" "}
              </div>
              <div style="display:inline-block; width:20%; vertical-align:top;;min-width:150px">
                <b>Ganancias promedio</b>
                <br></br>
                {actualModel.chunks[day]?.averageEarningPerHour?.value.toFixed(
                  2
                )}
              </div>
            </div>
          </div>
        ))}{" "}
      </div>
    ));
  return (
    <div class="model-description">
      <select
        style="margin:5px;padding:.3rem; "
        placeholder="Seleccionar Modelo"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        {info?.info.models?.map((model) => {
          const displayName = allPerformers.find(
            (mdl) => mdl.screenName == model.screenName
          )?.displayName;
          return (
            <option
              style="padding:.3rem;font-size:1rem;width:10rem;"
              value={model.screenName}
            >
              {displayName}
            </option>
          );
        })}
      </select>
      <select
        style="margin:5px;padding:.3rem;"
        placeholder="Day"
        value={selectedDay}
        onChange={(e) => setSelectedDay([e.target.value])}
      >
        {days &&
          days.map((selectedDay) => {
            return (
              <option
                style="padding:.3rem;font-size:1rem;width:10rem; "
                value={selectedDay}
              >
                {selectedDay}
              </option>
            );
          })}
      </select>
      {!isLoading && <div style="font-size:0.9rem">{allModelStats}</div>}
    </div>
  );
}
