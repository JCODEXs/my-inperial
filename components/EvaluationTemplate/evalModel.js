import { useJasmin } from "vStore/jasmin";
import { useState, useLayoutEffect } from "preact/hooks";
import { editModelEvaluationField, useAssets } from "vStore/assets";
import TemplateHeader from "./templateHeader";
import TemplateFooter from "./templateFooter";
import StatsList from "./statsList";
import GoalsHeader from "./goalsHeaders";
// import Module from "components/EvaluationTemplate/module";
import moment from "moment";
import { useEffect } from "react";
export default function EvalModel({ template }) {
  const { performers, periods, allModels } = useJasmin();
  const { users } = useAssets();
  const [selectedModel, setSelectedModel] = useState(
    template.models && template.models[0]?.screenName
  );
  const [totalSales, setTotalSales] = useState();
  const [available, setAvailable] = useState(
    moment(template.period.startDate).isBefore(moment("2023-01-05")) && true
  );
  const [modelsStats, setModelsStats] = useState([]);
  const [goals, setGoals] = useState();
  const totalDays =
    moment(template.period.endDate).diff(template.period.startDate, "days") + 1;
  const [isMonitor, setIsMonitor] = useState(true);
  var days = [...new Array(totalDays)].map((n, index) =>
    moment(template.period.startDate)
      .add(index + 1, "days")
      .format("YYYY-MM-DD")
  );
  let selectedModelEvaluation;

  useEffect(() => {
    //isMonitor && (days = days.filter((day) => moment().isSame(day, "day")));
    selectedModelEvaluation = template.models?.find(
      (model) => model.screenName == selectedModel
    );
    setGoals(
      template.models &&
        template?.models?.filter(
          (stats) => stats.screenName == selectedModel
        )[0]?.goals
    );
    //console.log(template?.models.filter((stats)=>stats.screenName==selectedModel)[0].goals)
    ModelDailySales = modelsStats.filter(
      (stats) => stats.screenName == selectedModel
    )[0]?.chunks; //["2023-01-04"][1].sent[0].count//.chunk.day[0].earnings.value
    // console.log(ModelDailySales)
  }, [selectedModel]);

  const getModelsStats = (modelsStatsD) => {
    setModelsStats(modelsStatsD);
  };
  useEffect(() => {
    setTotalSales(
      modelsStats.filter((stats) => stats.screenName == selectedModel)[0]
        ?.chunks[days[days.length - 1]][2]
    );
  }, [modelsStats, selectedModel]);
  console.log(totalSales);
  return (
    <div style="max-width:100%;min-width:403px">
      {/* <pre>{JSON.stringify(model,null,2)}</pre> */}
      <div style="font-size:3vw">{template.name}</div>
      {template.models?.length > 0 ? (
        <>
          <div style="font-size:1rem;">Seleccionar Modelo</div>
          <select
            style="margin:5px;padding:.3rem; "
            placeholder="Seleccionar Modelo"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {template.models?.map((model) => {
              const displayName = allModels.find(
                (mdl) => mdl.screenName == model.screenName
              )?.displayName;
              return (
                <option
                  style="padding:.3rem;font-size:1rem;width:10rem; "
                  value={model.screenName}
                >
                  {displayName}
                </option>
              );
            })}
          </select>
        </>
      ) : (
        "No hay modelos asociadas a esta plantilla"
      )}
      <StatsList template={template} getStats={getModelsStats} show={false} />
      <GoalsHeader goals={goals} totalSales={totalSales} />
      {false && <TemplateHeader stats={model} />}
      <div
        style="
        display:flex;
        overflow-x:auto;margin-top:20px;position:relative;
        filter: drop-shadow(0 0 0.75rem black);
        border:solid silver 1px;"
      >
        <div style="background:rgb(20,20,20); ">
          <div style="display:flex; border:1px solid gray;height:20px;min-height:20px;">
            <div
              style="
                          padding: 3px;
                          display: flex;
                          alignItems: center;
                          gap:5rem;
                          position:sticky;left:0px;
                          background:rgba(10,10,10);
                          border-right:1px solid gray;
                      width:200px;
                      min-width:200px;
                      "
            ></div>
            {days.map((day) => {
              const isToday = moment().isSame(day, "day");
              return (
                <b
                  class="tableCell"
                  style={`color:${
                    isToday ? "lime" : "silver"
                  };min-width:100px;text-align:center;`}
                >
                  {day}
                </b>
              );
            })}
          </div>
          {/* ending */}
          <div style="background:rgba(60,00,15,0.95);padding:3px; width:200px;   min-width:200px;	border:1px solid gray;  position:sticky;left:0px; ">
            Estadisticas
          </div>
          {available && (
            <div style="display:flex; flex-direction:row">
              <div style="background:rgba(40,00,5,0.95);padding:3px;width:200px; min-width:200px;border:1px solid gray;  position:sticky;left:0px">
                Ventas dia
              </div>
              <div style="background:rgba(40,40,45,0.95);padding:3px;border:1px solid gray;display:flex; flex-direction:row">
                {available &&
                  modelsStats &&
                  modelsStats[0] &&
                  modelsStats[0].chunks &&
                  days.map((day) => {
                    const ModelDailySales = modelsStats
                      .filter((stats) => stats.screenName == selectedModel)[0]
                      ?.chunks[day][0]?.earnings?.value.toFixed(2); //.chunk.day[0].earnings.value
                    //  console.log(days,ModelDailySales)
                    return (
                      <div
                        style="min-width:100px;text-align:center;"
                        class="tableCell"
                      >
                        {ModelDailySales === 0 ? "0" : ModelDailySales}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          <div style="display:flex; flex-direction:row">
            <div style="background:rgba(40,00,5,0.95);padding:3px;width:200px; min-width:200px;border:1px solid gray;  position:sticky;left:0px">
              Horas Trabajadas
            </div>
            <div style="background:rgba(40,40,45,0.95);padding:3px;border:1px solid gray;display:flex; flex-direction:row">
              {available &&
                modelsStats &&
                modelsStats[0] &&
                modelsStats[0].chunks &&
                days.map((day) => {
                  const ModelDailyHours = (
                    modelsStats.filter(
                      (stats) => stats.screenName == selectedModel
                    )[0]?.chunks[day][0].workTime?.value / 3600
                  ).toFixed(2); //.chunk.day[0].earnings.value
                  //  console.log(days,ModelDailyHours)
                  return (
                    <div
                      style="min-width:100px;text-align:center;"
                      class="tableCell"
                    >
                      {ModelDailyHours === 0 ? "0" : ModelDailyHours}
                    </div>
                  );
                })}
            </div>
          </div>
          <div style="display:flex; flex-direction:row">
            <div style="background:rgba(40,00,5,0.95);padding:3px;width:200px; min-width:200px;border:1px solid gray;  position:sticky;left:0px">
              Mensajes Enviados
            </div>
            <div style="background:rgba(40,40,45,0.95);padding:3px;border:1px solid gray;display:flex; flex-direction:row">
              {available &&
                modelsStats &&
                modelsStats[0] &&
                modelsStats[0].chunks &&
                days.map((day) => {
                  const ModelDailyMessages = [
                    modelsStats.filter(
                      (stats) => stats.screenName == selectedModel
                    )[0]?.chunks[day][1]?.sent[0]?.count,
                    modelsStats.filter(
                      (stats) => stats.screenName == selectedModel
                    )[0]?.chunks[day][1]?.sent[1]?.count,
                  ]; //.chunk.day[0].earnings.value
                  //  console.log(days,ModelDailyMessages)
                  return (
                    <div
                      style="min-width:100px;text-align:center;"
                      class="tableCell"
                    >
                      ✉️{" "}
                      {ModelDailyMessages[0] == 0 ? "0" : ModelDailyMessages[0]}{" "}
                      📷{" "}
                      {ModelDailyMessages[1] == 0 ? "0" : ModelDailyMessages[1]}
                    </div>
                  );
                })}
            </div>
          </div>
          {template.modules.map((module) => (
            <>
              <div style="background:rgba(5,5,5);font-weight:1000; padding:3px;width:200px;min-width:200px;border:1px solid gray;position:sticky;left:0px; ">
                {module.category}
              </div>
              {module.items.map((item) => (
                <div style="display:flex; border:1px solid gray;align-items: center;">
                  <div
                    style="padding: 3px;
                          display: flex;
                          gap:5rem;
                          position:sticky;left:0px;
                          background:rgba(10,10,10);
                          border-right:1px solid gray;
                           width:200px;
                           min-width:200px; "
                  >
                    <div style="flex:1">{item.label}</div>
                    {/* <div style="text-align:right;">{item.type}</div> */}
                    {/* <div>{item}</div> */}
                  </div>
                  {days.map((day) => {
                    // const isToday = moment().isSame(day, "day");
                    // const isFuture = moment().isBefore(day);
                    const dayEvaluation =
                      selectedModelEvaluation && selectedModelEvaluation[day];
                    // console.log(
                    //   "selectedModelEvaluation: ",
                    //   selectedModelEvaluation
                    // );
                    // console.log("dayEval: ", dayEvaluation);
                    const monitorEval =
                      dayEvaluation && dayEvaluation[selectedMonitor];
                    //  console.log("monitEval: ", monitorEval);
                    return (
                      <div class="tableCell">
                        {true ? (
                          isMonitor ? (
                            item.type == "bool" ? (
                              <input
                                checked={
                                  monitorEval ? monitorEval[item._id] : false
                                }
                                disabled={!selectedModel}
                                type="checkbox"
                                onChange={(e) => {
                                  editModelEvaluationField(
                                    template._id,
                                    selectedModel,
                                    day,
                                    module._id, //change for ID
                                    item._id, //change for ID
                                    e.target.checked
                                  );
                                }}
                              />
                            ) : (
                              <input
                                value={monitorEval ? monitorEval[item._id] : 0}
                                disabled={!selectedModel}
                                style="margin:3px;text-align:center;max-width:60px;"
                                type="numeric"
                                min="0"
                                max="10"
                                onChange={(e) => {
                                  editModelEvaluationField(
                                    template._id,
                                    selectedModel,
                                    day,
                                    module._id,
                                    item._id,
                                    e.target.value
                                  );
                                }}
                              />
                            )
                          ) : (
                            <div>
                              {monitorEval
                                ? monitorEval[item._id].toString()
                                : "-"}
                            </div>
                          )
                        ) : moment().isBefore(day) ? (
                          "-"
                        ) : item.type == "bool" ? (
                          Math.random() > 0.5 ? (
                            <div style={`color:lime;`}>SI</div>
                          ) : (
                            <div style={`color:crimson;`}>NO</div>
                          )
                        ) : (
                          Math.random().toFixed(1)
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              {/* <div style="flex:1;text-align:center;"> 
                <div> 
                  {`${(module.items 
                    .map((item) => monitorEval[item._id]*1) 
                    .reduce((sum, value) => sum + value,0))/module.items.length }  `} 
                </div>  
              </div>  */}
            </>
          ))}
        </div>
      </div>

      {/* <pre>{JSON.stringify(ModelDailySales,null,2)}</pre> */}
      <TemplateFooter />
    </div>
  );
}
