import { useJasmin } from "vStore/jasmin";
import MinModule from "./MiniModule";
import moment from "moment/moment";
export default function TrackingSheets({ data }) {
  const { allModels } = useJasmin();

  return (
    <div style="padding:10px;">
      {/* <pre>{JSON.stringify(data?.period,null,2)}</pre> */}
      <div
        style="display:flex; gap:10px; flex-wrap:wrap;
        justify-content:space-between"
      >
        <b style="flex:1;font-size:1.1rem"> 🗂{data?.name}</b>
        <b style="font-size:0.85rem">
          from:{data?.period?.period} to:{" "}
          {moment(data?.period?.endDate).format("YYYY-MM-DD")}
        </b>
        {/* <div>
            {`${data.period?.period} [${
              moment().isBetween(data.period.startDate, data.period.endDate)
                ? "ACTUAL"
                : moment().isBefore(data.period.startDate)
                ? "FUTURO"
                : "PASADO"
            }]`}
          </div> */}
      </div>
      <div
        style="
        display:flex;
        gap:5px;
        margin-top:10px;
        flex-wrap:wrap;
        justify-content:space-between;
        "
      >
        <div>
          <div
            style="
        display:flex;
        gap:5px;
        flex-wrap:wrap;
        align-items:flex-start;
        margin-top:10px;
        justify-content:flex-start;
        flex-direction:column;"
          >
            {`${data.modules?.length} ${
              data.modules?.length > 1 ? "modulos" : "modulo"
            }`}
          </div>
          <MinModule module={data?.modules} />
        </div>

        <div
          style="
        display:flex;
        flex-wrap:wrap;
        align-items:flex-end;
        flex-direction:column;
          min-width:120px;
        
          "
        >
          <div style="display:flex;flex-wrap:wrap; padding:5px; margin:10px; justify-content:flex-end; ">
            {`${data.models?.length ?? "0"} ${
              data.models?.length
                ? data.models?.length > 1
                  ? "Modelos"
                  : "Modelo"
                : "Modelos"
            }`}
          </div>
          <div
            style="
        display:flex;
        flex-wrap:wrap;
        padding:0.3rem;
        align-items:flex-end;
        justify-content:center;
        max-width:460px;
        border: 2px solid rgb(20, 20, 20); border-radius: 10px;;
        "
          >
            {data?.models
              ? data.models?.map((model) => {
                  const isLocked = Object.keys(model).length > 2;
                  const displayName = allPerformers.find(
                    (mdl) => mdl.screenName == model.screenName
                  )?.displayName;
                  return (
                    <div
                      style="border:1px solid rgba(60,60,60,0.6);
            border-radius:5px;
            background:rgb(20,20,20);
            margin:0.2rem;
            padding:5px;
            font-size:85%;
              gap:5px;"
                    >
                      {displayName ? (
                        displayName
                      ) : (
                        <div style="color:red;">No Encontrada</div>
                      )}
                      {isLocked && <div style="float:right;">📝</div>}
                    </div>
                  );
                })
              : "No hay modelos asociadas"}
          </div>
          {/* <pre>{JSON.stringify(template, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}
