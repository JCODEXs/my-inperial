
import {useJasmin,requestTemplateStats } from "vStore/jasmin"
import {useEffect,useState} from "react"
import adapt from "components/utilities/adaptData.js"
import  TempMainChart from "components/EvaluationTemplate/ui/templateChart.js"
import moment from "moment/moment"
export default function StatsList({template,getStats,show}){
    const {allModels,templateStats } = useJasmin();
    let models =  template?.models?.map(obj => obj.screenName).reduce((acc, curr) => acc + curr);
    const [selectedModel,setSelectedModel]=useState(models)
     const [isLoading,setIsLoading]=useState(false);
    const [selectedDay, setSelectedDay]=useState()
    const [source, setSource] = useState("earnings");
       // const [allModelsStats,setAllModelStats]=useState()
    const [days,setDays]=useState()
    const [actualStats,setActualStats]=useState()
  
   // console.log("model",models,template?.models)
    
             useEffect(async()=>{
            setIsLoading(true)
            models =  template?.models?.map(obj => obj.screenName).reduce((acc, curr) => acc + curr);
            await(requestTemplateStats(template?.period?.period,models))
            setIsLoading(false)
          //  console.log(models)
        },[template?.period?.period,models])

        //   return <div>No data available for this period.</div>;
        
    
    // console.log(templateStats,template)
    console.log(actualStats)
if (isLoading) {
  return <div>Loading...</div>;
}


if(templateStats && templateStats[template?.period?.period]){

    useEffect(()=>{
        const [availableDays,selectedModelStats]= adapt(templateStats[template?.period?.period],selectedModel)
        // acomulativeStats=selectedModelStats[0]?.chunks?.reduce((acc, day) => {
        //            const earningsValue = day[0].earnings.value || 0; // handle undefined value
        
        //   return acc + earningsValue;
        // }, 0).toFixed(2);
        setDays(availableDays)
      //  console.log("mia",acomulativeStats,selectedModelStats[0])
        setSelectedDay(availableDays)
        setActualStats(selectedModelStats)
        getStats(selectedModelStats)
     
    },[template,selectedModel])
}



  const allModelStats=selectedDay &&
  selectedDay.map((day)=>
  <div>{day}
     {actualStats.map((actualModel)=>{
      const duration = moment.duration(actualModel.chunks[day][2].cumulative[1] * 1000);
      const totalHours = Math.floor(duration.asHours());
      const minutes = duration.minutes();
      const formattedTime = `${totalHours}:${minutes.toString().padStart(2, '0')}`;
       return   (<div class="model-description"style=";padding:0.15rem">
           <div style="padding:12px 5px; font-size:85%; line-height:100%; text-align:right; display: flex; flex-direction: row;flex-wrap:wrap;padding:0.1rem;background: rgba(30, 30, 30, 0.5); border: 2px solid rgb(20, 20, 20); border-radius: 10px;">
         <div style="padding:0.1rem;display:flex; flex-direction:column; width:20%; vertical-align:top;min-width:150px">
      <b title="name" >{actualModel?.displayName??"modelo"}</b>
     </div>
         <div style="display:inline-block; width:20%; vertical-align:top;;min-width:150px">
     <b>Ganancias dia</b><br></br>{actualModel?.chunks[day][0]?.earnings?.value.toFixed(2)}</div>
         <div style="display:inline-block; width:20%; vertical-align:top;;min-width:150px"> 
     <b>Tiempo en linea</b><br></br><b>{moment.utc((actualModel?.chunks[day][0]?.workTime?.value)*1000).format("HH:mm")}</b> </div> 
         <div style="display:inline-block; width:20%; vertical-align:top;;min-width:150px">
     <b>Ganancias promedio</b><br></br>{actualModel.chunks[day][0]?.averageEarningPerHour?.value.toFixed(2)}</div>
     <div style="display:inline-block; width:20%; vertical-align:top;;min-width:150px">
     <b>Ganancias acomuladas</b><br></br>{actualModel.chunks[day][2].cumulative[0]?.toFixed(2)}</div>
     <div style="display:inline-block; width:20%; vertical-align:top;;min-width:150px">
     <b>Tiempo acomulado</b><br></br>{formattedTime}</div>
     </div></div>)
})} </div>)


return (
  
  (show && <div class="model-description">
  { !isLoading && <TempMainChart
            type={"daily"}
            data={[days,actualStats]}
            selectedModel={selectedModel}
            source={source}
            setSelectedModel={()=>{}}
          />}
        <div style="flex:1;">
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
          <button
            disabled={source == "cumulative"}
            class={source == "cumulative" && "tab_selected"}
            onClick={() => setSource("cumulative")}
          >
            📶
          </button>
        </div>
        </div>
<select 
            style="margin:5px;padding:.3rem;min-width:150px "
            placeholder=" Modelo"
                        value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {template?.models?.map((model) => {
              const displayName = allModels.find(
                (mdl) => mdl.screenName == model.screenName
              )?.displayName;
              return <option style="padding:.3rem;font-size:1rem;width:10rem;" value={model.screenName}>{displayName}</option>;
            })}
          </select>
          <select 
            style="margin:5px;padding:.3rem;"
            placeholder="Day"
            value={selectedDay}
            onChange={(e) => setSelectedDay([e.target.value])}
          >
          {days &&days.map((selectedDay) => {             
  return <option style="padding:.3rem;font-size:1rem;width:10rem; " value={selectedDay}>{selectedDay}</option>;


        
 
})}
  </select>
  
{/* <pre>{JSON.stringify(availablePeriods,null,2)}</pre> */}
{ !isLoading && <div style="font-size:0.9rem">{(allModelStats)}</div>
}
<pre>{JSON.stringify(actualStats,null,2)}</pre> 
</div>)
)

}