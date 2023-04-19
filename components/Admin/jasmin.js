import { useJasmin, evalSearch, setTimezone } from "vStore/jasmin";
import { useLogin } from "vStore/login";
import { useSelected, setSelected } from "vStore/selected";
import { useOverlays } from "vStore/overlays";
import { useState, useLayoutEffect, useEffect } from "preact/hooks";
import moment from "moment";
import currency from "currency.js";
import Gallery from "./FullJasmin/gallery";
import ModelInfo from "components/modelInfo";
import { Virtuoso } from "react-virtuoso";
// const ModelInfo = dynamic(() => import("components/modelInfo"), {
//   loading: () => <p>Loading</p>,
//   // ssr: false,
// });
// const Gallery = dynamic(() => import("./FullJasmin/gallery"), {
//   loading: () => <p>Loading</p>,
//   // ssr: false,
// });
const statusPoints = { active: 999, inactive: 500, closed: 100 };
export default function Jasmin() {
  const { lastPerformersState, performers, timezone } = useJasmin();
  const { main } = useOverlays();
  const { user } = useLogin();
  const [type, setType] = useState("models");
  const evalPoints = (performer) => {
    const performerState = lastPerformersState.find(
      (performerState) => performer.screenName == performerState.screenName
    )?.state;
    return (
      (!performerState || performerState == "offline"
        ? 0
        : performerState == "private"
        ? 2000000
        : performerState == "vip-show"
        ? 1000000
        : 500000) +
      (performer.report?.performerStatus
        ? statusPoints[performer.reports.performerStatus]
        : 0) +
      (performer.mediaAmount > 0 ? performer.mediaAmount + 2000 : 0) +
      (performer.reports[timezone]
        ? parseFloat(performer.reports[timezone].total.earnings.value) * 1000
        : 0)
    );
  };
  useEffect(() => {
    //  performers?.length > 0 && evalSearch();
  }, [performers?.length > 0]);
  const totalEarnings = performers?.reduce(
    (sum, performer) =>
      sum +
      (performer.reports
        ? parseFloat(
            isNaN(performer.reports[timezone]?.total?.earnings.value)
              ? 0
              : performer.reports[timezone]?.total?.earnings.value
          )
        : 0),
    0
  );
  const totalTime = performers?.reduce(
    (sum, performer) =>
      sum +
      (performer.stats
        ? performer.reports[timezone]?.total?.workTime.value
          ? parseInt(performer.reports[timezone]?.total.workTime.value)
          : 0
        : 0),
    0
  );
  return (
    // <div
    //   style="
    //  overflow:hidden;
    //  background:rgb(100,0,20);
    //  min-height:100%;
    //  "
    // >
    //
    //
    <>
      <div
        style="
	      z-index:200;
	      border-bottom:solid 3px rgba(60,40,40,0.6);
        background:rgba(60,0,20,1);
	      // padding-left:20px;
      width:100%;
        max-width:100%;
        overflow:hidden;
         filter: drop-shadow(0 0 0.5rem black);
	      "
      >
        <div
          style="padding:5px;
          padding-left:10px;
	      display:flex;
	      align-items:center;
	      gap:20px;
          "
        >
          {/* <pre> {JSON.stringify(periods, null, 3)}</pre> */}
          {/* <select> */}
          {/*   {' '} */}
          {/*   {periods.map((period) => ( */}
          {/*     <option> */}
          {/*       <div> {period.period}</div> */}
          {/*       <div> TEST</div> */}
          {/*     </option> */}
          {/*   ))} */}
          {/* </select> */}
          <div style="font-size:120%;">LJ</div>
          {false && (
            <select style="font-size:120%; font-weight:600;">
              <option>LJ</option>
              <option>StreamMate</option>
            </select>
          )}
          {type == "models" ? (
            user.log.auth !== "model" && (
              <div style="display:flex;flex-direction:column;flex:1;align-items:center;">
                <div>
                  {
                    performers?.filter(
                      (performer) =>
                        performer.reports?.performerState == "active"
                    ).length
                  }
                  {" active"}
                </div>
                <div>
                  {
                    lastPerformersState.filter(
                      (lastPerformerState) =>
                        lastPerformerState.performerState &&
                        lastPerformerState.performerState !== "offline"
                    ).length
                  }
                  {" online"}
                </div>
                {/* <div> */}
                {/*   { */}
                {/*     searchResult.filter( */}
                {/*       (model) => model.item.stats?.performerState == 'inactive' */}
                {/*     ).length */}
                {/*   } */}
                {/* </div> */}
              </div>
            )
          ) : (
            <div style="flex:1;">TRANSACCIONES</div>
          )}
          {user.log.auth !== "model" && (
            <div
              style="width:110px;padding:5px;"
              onClick={() => setTimezone(timezone == "co" ? "lx" : "co")}
            >
              <div style="display:flex;">
                <div> {timezone == "lx" ? "🇱🇺" : "🇨🇴"}</div>
                <b style="text-align:right;flex:1;">
                  {currency(totalEarnings, {
                    precision: 2,
                  }).format()}
                </b>
              </div>
              {false && totalTime}
              <div>
                {`${currency(
                  totalTime > 0 ? totalEarnings / (totalTime / 3600) : 0,
                  {
                    precision: 2,
                  }
                ).format()}
            (${moment.utc(totalTime * 1000).format("DD:HH:mm")})`}
              </div>
            </div>
          )}
        </div>
      </div>
      <Virtuoso
        id="viewport"
        style={{
          position: "relative",
          flex: 1,
          overflowY: "scroll",
          overflowX: "hidden",
          overscrollBehaviorY: "none",
          margin: "auto",
          minWidth: "min(100%,1000px)",
          maxWidth: "min(100%,1000px)",
          borderLeft: "2px solid rgba(40,40,40,0.5)",
          borderRight: "2px solid rgba(40,40,40,0.5)",
        }}
        data={[...performers]
          .filter((model) =>
            user.log.auth == "model"
              ? model.screenName == user.model.jasmin
              : model.reports?.performerState == "active"
          )
          .sort(
            (a, b) =>
              // (b.item.state == 'online' ? 99999999 : 0) -
              evalPoints(b) - evalPoints(a)
          )}
        itemContent={(index, item) => (
          <div
            key={item.screenName}
            class="model"
            style="  
                background:rgb(60,0,20,0.95);
                display:flex;
                flex-direction:column;
	      border-bottom:solid 3px rgba(60,40,40,0.8);
                min-height:50px;"
            onClick={() => {
              setSelected(item.screenName);
              main.ref.current.open();
            }}
          >
            {/* {evalPoints(item.item)} */}
            <ModelInfo model={item} timezone={timezone} />
            <Gallery stories={item.stories} />
            {/* <pre>{JSON.stringify(modelStories, null, 2)}</pre> */}
          </div>
        )}
      />
    </>
  );
}
// {
//   type == "trans" ? (
//     <>
//       <div style="">
//         {searchTrans.slice(0, batchTrans).map((res) => {
//           const trans = res.item;
//           const model = performers.find(
//             (md) => md.screenName == trans.screenName
//           );
//           return (
//             <div
//               style="
//    border-bottom:3px solid rgba(20,20,20,0.8);
// 	align-items:center;display:flex;
// 	flex-wrap:wrap;
// 	gap:10px;padding:10px;
// 	"
//             >
//               <div style="display:flex;flex-direction:column;font-weight:600;flex:1;">
//                 <div style="flex:1;"> {model?.displayName}</div>
//                 <div style="flex:1;font-size:70%;"> {trans.screenName}</div>
//                 <div style="font-size:160%;">${trans.amount}</div>
//               </div>
//               <div style="flex:1;text-align:right;">
//                 <div> {trans.time}</div>
//                 <div> {moment(trans.time).fromNow()}</div>
//               </div>
//               <div style="display:block;gap:10px;flex:1;min-width:200px;text-align:right;">
//                 <div style="flex:1;">{trans.domain}</div>
//                 <div style="flex:1;"> {trans.pretence}</div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   ) : (
