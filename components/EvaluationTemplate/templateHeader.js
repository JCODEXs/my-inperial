// import { random } from "gsap";
import { useRef, useState, useEffect } from "react";
import { useJasmin } from "vStore/jasmin";
import { setModelGoals } from "vStore/assets";

export default function TemplateHeader( {template}) {
  const { allModels,live} = useJasmin();
    const [state, setState] = useState([
      {
        title: "VENTAS FINALES",
      value: 5,
      type: "number",
     
  
    },
    {
      title: " TOTAL HORAS",
      value: 80,
      type: "number",
     
    },
  
    {
      title: "SUBS AL FAN CLUB",
      value: 4,
      type: "number",
    
    },
    {
      title: "PROMEDIO",
      value: 10,
      type: "text",
    
    },
  
    {
      title: "1 HORA MIEMBRO",
      value: 1,
      type: "text",
  
    },
    {
      title: "2h EN  EN VIVO",
      value: 2,
      type: "text",
    
    },
    // {
    //   title: "CUENTA NUEVA",
    //   value: "off",
    //   type: "checkbox",
    
    // },
    {
      title: "APLICA BONO",
      value: "off",
      type: "checkbox",
     
    },
  ]);
  const [actualModel,setActualModel]=useState("")
   const [selectedModel, setSelectedModel] = useState(template?.models[0]?.screenName);
  const RefState = useRef(state);
  const model = live.find((model) => model.screenName == selectedModel);
  const modelIndex = template.models.findIndex(
    (model) => model.screenName == selectedModel
  );
  const initialGoals=template?.models[modelIndex]?.goals;
  //console.log(initialGoals)
  const handelSetGoals=()=>{
    // const goals = Object.assign({}, ...state.map((goal) => {
    //   return {[goal.title]: goal.value};//
    // }));
    const goals = state.reduce((acc, goal) => {
      acc[goal.title] = goal.value;
      return acc;
    }, {});

    // const goals= state.map((goal)=>{
    //  return  {[goal.title ]: goal.value}//{title: goal.title, value: goal.value }//{[goal.title ]: goal.value}
    // })
    setModelGoals(template._id,selectedModel,goals)
  }
 
  useEffect(() => {
    // setActualModel(model?.stats?.screenName)
          let headers = [
        {
          title: "VENTAS FINALES",
          value:initialGoals? initialGoals["VENTAS FINALES"]:"",
          type: "number",
          target: model?.stats?.co?.total?.earnings?.value.toFixed(1),
              },
        {
          title: " TOTAL HORAS",
          value:initialGoals? initialGoals[" TOTAL HORAS"]:"",
          type: "number",
          target:(model?.stats?.co?.total?.workTime?.value/3600).toFixed(1),
        },
        {
          title: "SUBS AL FAN CLUB",
          value:initialGoals? initialGoals["SUBS AL FAN CLUB"]:"",
          type: "number",
          target:model?.stats?.co?.vipShowKpi?.userCount?.value
        },
        {
          title: "PROMEDIO",
          value:initialGoals? initialGoals["PROMEDIO"]:"",
          type: "text",
          target:model?.stats?.co?.total?.averageEarningPerHour?.value.toFixed(2)
        },
        {
          title: "1 HORA MIEMBRO",
          value:initialGoals? initialGoals["1 HORA MIEMBRO"]:"",
          type: "text",
          target:(model?.stats?.co?.workingTime?.member?.value/3600).toFixed(1)
        },
        {
          title: "2h EN  EN VIVO",
          value:initialGoals? initialGoals["2h EN  EN VIVO"]:"",
          type: "text",
          target:(model?.stats?.co?.workingTime?.free?.value/3600).toFixed(1)
        },
        // {
        //   title: "CUENTA NUEVA",
        //   value: state[6].value,
        //   type: "checkbox",
        //   target:model?.stats?.status=="active"// check
        // },
        {
          title: "APLICA BONO",
          value:initialGoals? initialGoals["APLICA BONO"]:"",
          type: "checkbox",
          target:true
        },
      ];
      setState(headers);
      
    //setGainingEntries("gainingEntries")
    //console.log("com",state)
  }, [template._id,actualModel,model]);

  return (
    <div>
      <div> 🏆 Metas  
    </div>
      <select 
            style="margin:5px;padding:.3rem;min-width:200px "
            placeholder="Seleccionar Modelo"
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
          <div style="margin-left:1rem">
        {/* {`   ♢Valor actual   ♛ Meta    "US Dollars " `} */}
        {`     ♛ Meta    "US Dollars " `}
      </div>
            {/* <pre>{JSON.stringify(template.models,null,2)}</pre> */}
      <div style="margin:0.7rem;border-radius:0.5rem;min-height:22rem; max-height:55rem;display:flex;flex-direction:column;border:1px solid silver;flex-wrap:wrap;align-content:flex-start;align-items:flex-end;justify-content: space-evenly">
        {state.map((header, index) => (
          <div
          key={header.title}
          style="display:flex;align-items:center;gap:5px;padding:2px;flex-wrap:wrap;justify-content:center"
          >
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;flex">
              <div style="padding:0.3rem;font-size:1rem;width:10rem; ">{header.title}</div>
              <div style="color: rgb(160,20,40,0.9);width:7rem; font-size:1rem;margin-right:1.70rem">
                {header.value === "on"
                  ? "si"
                  : header.value === "off"
                  ? "no"
                  : ` ${header.value}♛ `}
                   {/* {header.value === "on"
                  ? "si"
                  : header.value === "off"
                  ? "no"
                  : ` ♢${header.target}/ ${header.value}♛ `} */}
              </div>
            </div>
              
                <input
                  style="margin-right:0.7rem; font-size:1rem;width:3.5rem"
                  value={RefState[index]?.value}
                  type={header.type}
                  onChange={(e) => {
                    e.preventDefault();
                    if (header.type == "checkbox") {
                      setState(prevState => {
                        const newState = prevState.map((item, idx) => {
                          if (idx === index) {
                            return {
                              ...item,
                              value: item.value === "on" ? "off" : "on",
                            };
                          }
                          return item;
                        });
                        return newState;
                      });
            
                    } else {
                      setState(prevState => {
                        const newState = prevState.map((item, idx) => {
                          if (idx === index) {
                            return {
                              ...item,
                              value: e.target.value,
                            };
                          }
                          return item;
                        });
                        return newState;
                      });
            
                    }
                  }}
                ></input>
              
          </div>
        ))}
        <button onClick={handelSetGoals}> Establecer Metas</button>
      </div>
      {/* <pre>{JSON.stringify(state,null,2pre> */}
      {/* <pre>{JSON.stringify(model,null,2) }</pre> */}
    </div>
  );
}
