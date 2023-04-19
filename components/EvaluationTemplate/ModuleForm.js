import next from "next";
import index from "pages";
import { useState } from "react";
import { addTemplate, useAssets } from "vStore/assets";
import { useJasmin } from "vStore/jasmin";
import { useOverlays } from "vStore/overlays";
//import { proxy, useSnapshot } from 'valtio';
////import Module from './module';
//const initialState = [];
//const ModuleBulk = proxy(initialState);
import moment from "moment";
import { useEffect } from "preact/hooks";
export default function ModuleForm({}) {
  const {neo}=useOverlays()
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [Bulk, setBulk] = useState([]);
  const { templates } = useAssets(); // const [userInput, setUserInput] = useState({
  const { periods } = useJasmin(); // const [userInput, setUserInput] = useState({
    const [modules, setModules] = useState([]);
  const [checked, setChecked] = useState([]);
  const [newModule, setNewModule] = useState(false);
  const [name, setName] = useState("");
  const [period, setPeriod] = useState();
  useEffect(()=>{
    var modul = [];
  templates?.forEach(
    (template) => template.modules?.length > 0 && modul.push(...template.modules)
  );
  const module = modul.reduce((acc, cur) => {
    const found = acc.some(module => 
      module.category === cur.category && 
      module.items.length === cur.items.length 
      &&       module.items.every((item, i) => item.value === cur.items[i].value
      )
    );
    if (!found) {
      acc.push(cur);
    }
    return acc;
  }, []);
  setModules(module)
  },[templates])
  // const [userInput, setUserInput] = useState({
  //   EnteredCategory: '',
  //   enteredAmount: '',
  //   enteredItem: '',
  // });
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList.push(JSON.parse(event.target.value));
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   EnteredCategory: event.target.value,
    // });
    // setUserInput((prevState) => {
    //   return { ...prevState, EnteredCategory: event.target.value };
    // });
  };
  const amountChangeHandler = (event) => {
    setAmount(parseInt(event.target.value));
    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // });
  };
  const ItemChangeHandler = (event) => {
    event.preventDefault();
    if(event.target.value!=""){
    setItem(event.target.value)};
    // setUserInput({
    //   ...userInput,
    //   enteredItem: event.target.value,
    // });
  };
  const createBulk = (e) => {
    e.preventDefault();
    if (item.length > 0) {
      setBulk((prevState) => [...prevState, { label: item }]);
      setItem("");
    }
  };
  const submit = (event) => {
    event.preventDefault();
    addTemplate({ name, period, modules: checked });
    neo.ref.current.close()
    // for (let i = 0; i < checked.length; i++) {
    //     ModuleBulk = [...ModuleBulk, modules[i]];
    //     console.log(
    //       'i of selected modules',
    //       checked[i],
    //       checked.length,
    //       ModuleBulk
    //     );
    //   }
    // }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setModules((prevState) => {
      return [...prevState, { category: category, items: Bulk }];
    });
    setBulk([]);
    setCategory("");
    // const ModuleData = {
    //  category: category,
    //  Item: new Item(item),
    // };
    // // props.onSaveModuleData(ModuleData);
    // setEnteredCategory('');
    // setEnteredAmount('');
    // setEnteredItem('');
    // console.log('modulos',Modules[3].category, Modules[3].items)
    // alert('Funcionalidad no disponible aún');
  };
  return (
    <div style="max-height:100%;display:flex;flex-direction:column;overflow-y:scroll;">
      
      <div style="display:flex;border-bottom:2px solid silver;align-items:center;gap:5px;padding:5px;flex-wrap:wrap">
        <label style="padding:.3rem;font-size:1.4rem;width:8rem; ">Nueva Plantilla</label>
        <input
          style="flex:1;"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de planilla "
        />
        {/* <div>Periodo</div> */}
        <select
          onChange={(e) => {
            setPeriod(JSON.parse(e.target.value));
          }}
        >
          <option>Periodo</option>
          {[...periods]
            .sort((a, b) => moment(b.period) - moment(a.period))
            .map((period) => (
              <option value={JSON.stringify(period)}>{period.period}</option>
            ))}
        </select>
      </div>
      <form
        style="position:relative;border-bottom:solid 2px rgba(100,100,100,0.8);padding:10px;"
        onClick={() => !newModule && setNewModule(true)}
        onSubmit={submitHandler}
      >
        <b> (+) 📋 Nuevo Modulo  </b>
        {newModule && (
          <div class="new-Module__controls">
            <button
              style="position:absolute;top:5px;right:5px;"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setNewModule(false);
              }}
            >
              X
            </button>
            <div
              style="display:flex;padding:5px;gap:5px;"
              className="new-Module__control"
            >
              {/* <label style="width:200px;min-width:200px;">Category</label> */}
              <input
                type="text"
                value={category}
                onChange={categoryChangeHandler}
                placeholder=" Categoria"
              />
            </div>
            <div
              style="display:flex;padding:5px;gap:5px;flex-wrap: wrap"
              class="new-Module__control"
            >
              {/* <label style=" width:200px; min-width:200px;">Item </label> */}
              <input type="text" value={item} onChange={ItemChangeHandler} placeholder=" Criterio" />
              <button onClick={createBulk}  disabled={
                  !(
                    category ||
                     item
                   
                  )
                }
                class={
                  !(
                    category ||
                    item  
                    ) && "disabled"
                }>  Agregar</button>
            </div>
            <div
              style="
		    background:rgba(40,40,40,0.8);
		    display:flex;
        flex-direction:column;
		    margin-top:1.2rem;
		    align-content:center;
		    padding:0.7rem;
		    border-radius:10px;
		    "
              class="new-Module__control"
            >
              <div style="min-width:150px;align-content:center">
                {/* <pre>{JSON.stringify(checked,null,2)}</pre>  */}
                <div style="display:flex;font-size:1.2rem;;margin:0.1rem ">📋{category}</div> 
               <div style="display:flex;flex-direction:column;gap:5px;">
                {Bulk.map((item, index) => {
                  return (
                    <div
                      style="
			    background:rgba(10,10,10,0.8);
			    display:flex;gap:5px;
			    padding:5px;
			    border-radius:10px;
			    align-items:center;"
                    >
                      <div style="flex:1;">{item.label}</div>
                      <select
                        value={item.type}
                        onChange={(e) =>{
                          e.preventDefault();
                          setBulk(prev => {
                            return prev.map((item, i) => {
                              if (i === index) {
                                return { ...item, type: e.target.value };
                              }
                              return item;
                            });
                          }
                          )
                          }
                        }
                      >
                        <option>Selecionar</option>
                        <option value="bool">Bool</option>
                        <option value="float">Float</option>
                      </select>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setBulk((prev) => prev.filter((i) => i !== item));
                        }}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div> </div>
             
            </div>
            <div
              style="display:flex; justify-content:center;padding:10px;"
              class="new-Module__actions"
            >
              {/* <button style="margin-left:auto;">Clear</button> */}
              <button
                disabled={
                  !(
                    category &&
                     Bulk.length > 0 &&
                    Bulk.every((item) => item.type?.length > 0)
                  )
                }
                class={
                  !(
                    category &&
                     Bulk.length > 0 &&
                    Bulk.every((item) => item.type?.length > 0)
                  ) && "disabled"
                }
                style="margin-left:auto;"
                type="submit"
              >
                Crear 📋
              </button>
            </div>
          </div>
        )}
      </form>
      <form
        onScroll={() => setNewModule(false)}
        style="flex:1;overflow-y:scroll;"
        onSubmit={submit}
      > <div style=" margin-left:1rem;padding:0.4rem;font-size:0.7rem; width:90%; background:rgb(70,70,70,0.5)">  "Primero elimine criterios del modulo usando ❌. seleccione los modulos para la nueva planilla pinchando ◻️ "</div>
        <div
          style="display:flex;flex-wrap:wrap;flex-direction:column-reverse;"
          class="new-Module__king"
        >
          {modules.map((module, moduleIndex) => {
            return (
              <div
                key={module.moduleIndex}
                style="
			display:flex;
			border-bottom:solid 1px silver;
			padding:0.7rem; flex-wrap:wrap;"
              >    <input
              value={JSON.stringify(module)}
              type="checkbox"
              onChange={handleCheck}
            ></input>

                <div style="width:100px;margin:1rem;font-size:1.1rem;">📋 {module.category}  </div>
              
                <div style="flex:1;">
                  {module.items?.map((item,itemIndex) => {
                    return (
                      <div style="display:flex;">
                         <button 
                        style="padding:0.5rem;font-size:0.7rem; max-height:1rem;margin-right:0.5rem ;max-width: 0.5 rem; display:flex; align-items:center;justify-content: center"
                        onClick={(e) => {
                          e.preventDefault();
                          setModules(prev => {
                            return prev.map((module, i) => {
                              if (i === moduleIndex) {
                                return { ...module, items: module.items.filter((item, j) => j !== itemIndex) };
                              }
                              return module;
                            });
                          });
                          
                          
                        }}
                      >
                        <div style="width:0.3rem;font-size:0.3rem">❌</div>
                      </button>
                        <div style="display:flex;align-items: center ;width:10rem">
                          <div style="font-size:0.9rem;margin-right:0.8rem;width:10rem"> {item.label}</div>
                          <div style="font-size:0.7rem;color:rgb(80,30,220,0.8)">  {item.type}</div>
                        </div>
                       
                      </div>
                    );
                  })}
                </div>
                <div style="display:flex; flex-direction: row; align-items: center">
              
                    <button style="max-height: 3rem"
                          onClick={(e) => {
                            e.preventDefault();
                            setModules((prev) => prev.filter((module,i) => i !== moduleIndex));
                          }}
                        >
                          🗑
                        </button>
                
                </div>
              </div>
            );
          })}
        </div>
        <div
          style="display:flex; justify-content:center;padding:10px;"
          className="new-Module__actions"
        >
          <button
            disabled={!(name && checked.length > 0 && period)}
            class={!(name && checked.length > 0&&period) && "disabled"}
            style="margin-left:auto;"
            type="submit"
          >
            Generar Planilla
          </button>
        </div>
      </form>
      
     </div>
  );
}
export const useModules = () => useSnapshot(ModuleBulk);
