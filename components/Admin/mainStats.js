import { useEffect } from "preact/hooks";
import { useJasmin } from "vStore/jasmin";
import {
  attachChart as attachTrans,
  refreshChart as refreshTrans,
} from "components/Stats/transact";
import { attachChart, refreshChart } from "components/Stats/Visits";
import { attachPie } from "components/Stats/Pie";
import { attachMeta } from "components/Stats/meta";
export default function MainStats({}) {
  const { periods, transactions, live } = useJasmin();
  useEffect(
    () => {
      // if (searchResult.length > 0) {
      // if (toggle == '') {
      //   // assets?.users.length > 0 &&
      //   // attachChart([]);
      // } else if (toggle == 'stats') {
      // alert('attach');
      attachPie(transactions);
      // alert();
      attachMeta(live.map((model) => model.screenName).slice(0, 100));
      attachTrans(transactions);
      // attachDynamic('dynamic', 'Sede Principal', 100, 60);
      // attachDynamic('dynamic2', 'Sede Chile', 62, 30);
      // }
    },
    [
      //searchResult,
      ////	assets?.users?.length > 0,
      //toggle,
    ]
  );
  useEffect(() => {
    transactions.length > 0 && refreshTrans(transactions);
  }, [
    transactions,
    //	assets?.users?.length > 0,
  ]);
  return (
    <div style="display:flex;flex-direction:column;overflow:hidden;gap:0px;max-height:100%;max-width:1000px;width:100%;margin:auto;">
      <div style="position:sticky;top:0px;z-index;100;padding:10px;border-bottom: solid 2px rgba(60,60,60);width:100%;display:flex;gap:20px;">
        PERIOD
        <select>
          {periods.map((period) => (
            <option>
              <div> {period.period}</div>
              <div> TEST</div>
            </option>
          ))}
        </select>
      </div>
      <div
        style="
	      flex:1;
	      overflow-y:scroll;
display:flex;flex-direction:row;flex-wrap:wrap;
	      "
      >
        // <div style="z-index:0;width:100%;min-height:300px" id="transac" />
        //{" "}
        <div style="  width:100%; min-width:min(500px,100%);  border-radius:0px;flex:1;overflow:hidden;">
          //{" "}
          <div style="flex:1;min-height:500px;min-width:100%;" id="meta"></div>
          //{" "}
        </div>
        {false && (
          <div style=" min-width:100%;max-width:100%; display:flex;flex-wrap:wrap; border-radius:0px;flex:1;overflow:hidden;">
            <div
              id="dynamic"
              style="height:500px;
		  max-width:min(500px,100%);
		  flex:1;"
            ></div>
            <div
              id="dynamic2"
              style="height:500px;
		  max-width:min(500px,100%);
		flex:1;"
            ></div>
          </div>
        )}
        <div style="  min-width:min(100%,500px);border-radius:0px;flex:1;overflow:hidden;">
          <div id="pie" style="min-height:500px;flex:1;"></div>
        </div>
      </div>
    </div>
  );
}
