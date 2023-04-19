import EvalModel from "./evalModel";
import ManageModels from "./manageModels";
import { useState } from "preact/hooks";
import moment from "moment";
import StatsList from "./statsList";
import TemplateHeader from "./templateHeader";
export default function Choose({ template }) {
  const [choose, setChoose] = useState("eval");
  return (
    <div
      class="templateView"
      style="max-height:100%;height:100%;overflow-y:scroll;"
    >
      <div style="border-bottom:2px solid rgb(60,60,60);padding:5px;background:rgba(20,20,20,0.6);z-index:10;position:sticky;top:0px;display:flex;gap:10px;margin-bottom:10px;backdrop-filter:blur(10px);">
        <button
          class={choose == "gestion" && "tab_selected"}
          onClick={() => setChoose("gestion")}
        >
          🗄
        </button>
        <button
          class={choose == "eval" && "tab_selected"}
          onClick={() => setChoose("eval")}
        >
          📋
        </button>
        <button
          class={choose == "goals" && "tab_selected"}
          onClick={() => setChoose("goals")}
        >
          🏆
        </button>
        <button
          class={choose == "stats" && "tab_selected"}
          onClick={() => setChoose("stats")}
        >
          📊
        </button>
      </div>
      <div>
        {`${template.period.period} [${
          moment().isBetween(template.period.startDate, template.period.endDate)
            ? "Periodo Actual"
            : moment().isBefore(template.period.startDate)
            ? "Periodo Pasado"
            : "Periodo Futuro"
        }]`}
      </div>
      {(() => {
        switch (choose) {
          case "eval":
            return <EvalModel template={template} />;
          case "gestion":
            return <ManageModels template={template} />;
          case "stats":
            return (
              <StatsList template={template} getStats={() => {}} show={true} />
            );
          case "goals":
            return <TemplateHeader template={template} />;
        }
      })()}

      {/* <img
        height={1000}
        width={800}
        src="/pre.jpeg"
        style={{ transform: "rotate(90deg)" }}
      ></img> */}
    </div>
  );
}
