import moment from "moment/moment"
export default function GoalsHeader({goals,totalSales}){
 console.log(totalSales)
return (
<div>   
{`   ♢Valor actual   ♛ Meta    "US Dollars " `}
<div style="border:1px solid silver;border-radius:0.5rem; margin:0.7rem">
<div style="margin:0.7rem"> 🏆 Metas  </div>
<div style="margin:0.7rem;display:flex;flex-wrap:wrap;align-content:flex-start;align-items:flex-end;justify-content: space-evenly" >
    {goals && Object.keys(goals).map((goalkey) => (
      <div
      key={goalkey}
      style="display:flex;align-items:center;gap:5px;padding:2px;flex-wrap:wrap;justify-content:center"
      >
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;flex">
          <div style="padding:0.3rem;font-size:1rem;">{goalkey}</div>
          <div style="color: rgb(160,20,40,0.9);font-size:1rem;margin-right:1.10rem">
            {goals[goalkey] === "on"
              ? "si"
              : goals[goalkey] === "off"
              ? "no"
              : goalkey==="VENTAS FINALES"
              ? totalSales !== undefined ? `♢${totalSales.cumulative[0]?.toFixed(1)} /${goals[goalkey]}♛ `:  `/${goals[goalkey]}♛ `
              : goalkey===" TOTAL HORAS"
              ? totalSales !== undefined ? `♢${(totalSales.cumulative[1]/3600).toFixed(1)} /${goals[goalkey]}♛`:  `/${goals[goalkey]}♛ `
              : `/${goals[goalkey]}♛`
            }
          </div>
        </div>
        </div>))}
</div>
</div>
      </div>
    )}
