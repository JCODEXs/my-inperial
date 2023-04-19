import { useJasmin } from "vStore/jasmin";
import { useUi } from "vStore/ui";
import { useSelected } from "vStore/selected";
import { useState, useLayoutEffect, useEffect, useRef } from "preact/hooks";
import axios from "axios";
import Resume from "components/Admin/resume";
import { attachPieMoney } from "components/Stats/Piemoney";
import { attachPieTime } from "components/Stats/Pietime";
import { attachPieKpi } from "components/Stats/Piekpi";
import Gallery from "./gallery";
import ModelInfo from "components/modelInfo";
import FullModelStats from "components/Admin/tempStats/fullModelStats";
import moment from "moment";
import gsap from "gsap";
export default function FullJasmin() {
  const [pic, setPic] = useState(undefined);
  const [vip, setVip] = useState(undefined);
  const [report, setReport] = useState(undefined);
  const { selected } = useSelected();
  const { live, periods, timezone } = useJasmin();
  const [period, setPeriod] = useState(periods[periods.length - 1]);
  const [loading, setLoading] = useState(true);
  const { blurred } = useUi();
  const model = live.find((model) => model.screenName == selected);
  const imgRef = useRef();
  useEffect(async () => {
    setPic(undefined);
    // setVip(undefined);
    // setReport(undefined);
  }, [selected]);
  useEffect(async () => {}, [pic]);
  useEffect(async () => {
    setReport(undefined);
    // alert('new Report');
    try {
      setLoading(true);
      const result = await axios.get("/api/vipShows", {
        params: {
          screenName: model.screenName,
          fromDate: period.startDate,
          toDate: period.endDate,
        },
      });
      setLoading(false);
      setVip(result.data.vip);
      setReport(result.data.report);
      console.log("vip: ", result.data);
    } catch (e) {
      // alert('error');
      console.log("err: ", e);
    }
  }, [period, selected]);
  useEffect(async () => {
    if (report) {
      // attachPieMoney(report.earnings);
      // attachPieTime(report.workingTime);
      // attachPieKpi(report.myContentKpi);
    }
  }, [report]);
  return (
    <>
      {model && (
        <div style="max-width:100%;position:relative;display:flex;flex-direction:column;min-height:100%;max-height:100%;overflow:hidden;">
          <ModelInfo model={model} timezone={timezone} />
          <div
            style="
          flex:1;
          position:relative;
          overflow:hidden;
		  "
          >
            {pic && (
              <div
                style="margin:0px;backdrop-filter:blur(8px);
		    overflow:hidden;
		    z-index:9;
		    position:absolute;
		    top:0px;
		    left:0;
		    max-width:100%;
		      max-height:100%;
		      min-height:100%;
		      min-width:100%;
		    display:flex;
		    flex-direction:column;
		    align-items:center;
		    justify-content:center;
		    background:rgba(10,10,10,0.8)
                "
                onCLick={() => {
                  pic.split(".").pop() !== "mp4" && setPic(null);
                }}
              >
                <div
                  style={`
                  background-image:url('footerCorona.png');
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: 50px auto;
display:flex;flex:1;overflow:hidden;
                  ${blurred && "filter:blur(15px);"}`}
                >
                  {pic.split(".").pop() == "mp4" ? (
                    <video
                      src={pic}
                      style="
                      max-height:100%;
                      max-width:100%;"
                      controls
                    />
                  ) : (
                    <img
                      ref={imgRef}
                      onLoad={(e) => {
                        console.log(e);
                        gsap.to(imgRef.current, {
                          opacity: 1,
                          duration: 0.4,
                        });
                      }}
                      style="opacity:0;
                        max-height:100%;
			  max-width:auto;
			  object-fit:contain;
		    border-radius:5px;
		    filter: drop-shadow(0 0 0.5rem : rgba(10,0,10,0.8));
		  "
                      src={pic}
                    />
                  )}
                  <button
                    style="position:absolute;top:5px;right:5px;"
                    onCLick={() => {
                      setPic(null);
                    }}
                  >
                    X
                  </button>
                </div>
                <div
                  style="width:100%;
border-top:3px solid rgb(40,40,40);
                  "
                >
                  <Gallery
                    stories={model.stories}
                    action={async (e, newPic) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (newPic !== pic) {
                        await gsap.to(imgRef.current, {
                          opacity: 0,
                          duration: 0.1,
                        });
                        setPic(newPic);
                      }
                    }}
                  />
                </div>
              </div>
            )}
            <div
              style="
		    position:absolute;
		    top:0px;
		    left:0px;
		    min-height:100%;
		    max-height:100%;
	      min-width:100%;
	      max-width:100%;
	    background:rgba(100,0,20,0.4);
		    overflow-y:scroll;
		    "
            >
              <Gallery
                stories={model.stories}
                action={(e, newPic) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (newPic !== pic) {
                    setPic(newPic);
                  }
                }}
              />
              <div style="padding:10px;">
                <div
                  style="z-index:7;border: solid 1px rgba(100,100,100,0.6);
filter: drop-shadow(0 0 0.75rem black);
	    backdrop-filter:blur(6px);border-radius:10px;padding:5px;position:sticky;background:rgba(20,10,10,0.7);top:5px;display:flex;flex-wrap:wrap; gap:5px;"
                >
                  <select
                    value={period.period}
                    onChange={(e) => {
                      const found = periods.find(
                        (pd) => pd.period == e.target.value
                      );
                      setPeriod(found);
                    }}
                    style="width:201px;border:solid 2px silver;"
                  >
                    {[...periods]
                      .sort((a, b) => moment(b.period) - moment(a.period))
                      .map((period) => (
                        <option value={period.period}>
                          <div> {period.period}</div>
                        </option>
                      ))}
                  </select>
                  <div style="display:flex;flex-wrap:wrap;gap:10px;">
                    <div style="display:flex;gap:10px;">
                      <div style="width:50px;">{`FROM: `} </div>
                      {period.startDate}
                    </div>
                    <div style="display:flex;gap:10px;">
                      <div style="width:50px;">{`TO: `} </div>
                      {period.endDate}
                    </div>
                  </div>
                  {/* <div> {JSON.stringify(period, null, 2)}</div> */}
                  <Resume data={report?.total} />
                </div>
                {report && false && (
                  <div style="padding:10px;">
                    <div>${report.total.earnings.value}</div>
                    <div>${report.total.workTime.value}</div>
                    <div>${report.total.averageEarningPerHour.value}</div>
                  </div>
                )}
              </div>
              {false && (
                <div style="padding:20px;">
                  <h1>VIP</h1>
                  {vip?.map((vipi) => (
                    <div style="padding:10px;">
                      <div>{vipi.createdAt}</div>
                      ago<div>{vipi.createdAt}</div>
                      <div>{vipi.description}</div>
                      <div style="display:flex;gap:10px;">
                        <div>Collected: {vipi.creditCollected}</div>
                        <div>Goal: {vipi.creditGoal}</div>
                      </div>
                      <div>{vipi.status}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

//   {!loading ? (
//     <> { false?<FullModelStats model = { model } /> : "pronto"}</>
// ) : (
// <div style="height:600px">{"LOADING"}</div>
//   )}
