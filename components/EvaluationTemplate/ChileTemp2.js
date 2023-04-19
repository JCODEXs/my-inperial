import { useState } from "preact/hooks";
import { useJasmin } from "vStore/jasmin";
import { useLogin } from "vStore/login";
import {
  useAssets,
  addModel2Template,
  deleteModelFromTemplate,
} from "vStore/assets";
// import { useSelected } from 'vStore/selected';
export default function ChileTemp2({ template }) {
  const { allModels, activePerformers } = useJasmin();
  const { templates } = useAssets();
  // const { selected: templateID } = useSelected();
  // const template = templates.find((template) => template._id == templateID);
  const samePeriodTemplates = templates.filter(
    (tmp) => tmp.period?.period == template?.period.period
  );
  const { user } = useLogin();
  // const [selected, setSelected] = useState([]);
  // const {Modules}=useModules();
  const amountChangeHandler = (event) => {
    setAmount(parseInt(event.target.value));
    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // });
  };
  return (
    <div style="">
      <h4>MODELOS</h4>
      <div style="display: flex; flex-direction: column; justify-content: center ;">
        {/* <h2> selecciona plantilla </h2> */}
        {/* {templates.map((temp) => JSON.stringify(temp, null, 2))} */}
        <div style="display: flex; flex-direction: row;">
          {/* <div>{Modules}&&{Modules.map((item)=>{
              return <div style="display:flex;justify-content:space-between; margin:.5rem; border:solid 1px silver; padding:0.7rem" >
                <div style="margin:1rem;align-items:flex-begin; ">{item.category}</div>
                <div style="max-width:25rem;">{item.items.map((item)=>{
              return <div>{item}</div>
            })}</div>
            <input  type='checkbox'></input>
              </div>
            })}
            </div> */}
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center ;">
          {/* <h2> selecciona las modelos</h2> */}
          <div style="display:flex;" className="new-Module__control">
            <label style="min-width:200px;">
              {/* Numero de modelos en Plantilla */}
            </label>
            {/* <input */}
            {/*   type="number" */}
            {/*   min="1" */}
            {/*   step="1" */}
            {/*   value={amount} */}
            {/*   onChange={amountChangeHandler} */}
            {/*   class="quantity" */}
            {/* /> */}
          </div>
          <div
            style="
		    background:rgba(30,30,30,0.8);
		    padding:10px;
		    border-radius:10px;
		    border:2px solid rgba(100,100,100,0.6);
		    "
          >
            <b> SELECCIONADAS</b>
            <div
              style="

		      display:flex;
		      flex-wrap:wrap;
		      justify-content:center;
		      gap:10px;
		      "
            >
              {template.performers?.map((performer) => {
                const isLocked = Object.keys(performer).length > 2;
                return (
                  <div
                    style={`${isLocked && "opacity:0.6;pointer-events:none;"}`}
                    key={performer.screenName}
                    class="modelSelected"
                    onClick={(e) => {
                      if (!isLocked) {
                        e.target.style.pointerEvents = "none";
                        e.target.style.opacity = 0.2;
                        deleteModelFromTemplate(
                          template._id,
                          performer.screenName
                        );
                      }
                    }}
                  >
                    {/* {JSON.stringify(model)} */}
                    {
                      allPerformers.find(
                        (_performer) =>
                          _performer.screenName == performer.screenName
                      )?.displayName
                    }
                    {isLocked && <div style="float:right;">📝</div>}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style="padding:10px;
		    margin-top:10px;
		    border-radius:10px;
		    border:2px solid rgba(100,100,100,0.6);
		    "
          >
            <b style="padding:10px;">DISPONIBLES</b>
            <div
              style="
		      display:flex;
		      flex-wrap:wrap;
		      justify-content:center;
		      gap:10px;
		      "
            >
              {activeScreenNames
                .filter(
                  (model) =>
                    !template.models?.some(
                      (mdl) => mdl.screenName == model.screenName
                    )
                )
                .map((model) => {
                  const isLocked = samePeriodTemplates.some((tmp) =>
                    tmp.models?.some(
                      (mdl) => mdl.screenName == model.screenName
                    )
                  );

                  return (
                    <div
                      style={`${
                        isLocked && "opacity:0.2;pointer-events:none;"
                      }`}
                      key={model.screenName}
                      onClick={(e) => {
                        if (!isLocked) {
                          e.target.style.pointerEvents = "none";
                          e.target.style.opacity = 0.3;
                          addModel2Template(template._id, model.screenName);
                        }
                      }}
                      class="modelSelect"
                    >
                      {model.displayName}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
