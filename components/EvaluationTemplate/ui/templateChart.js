import { useLayoutEffect, useRef } from "preact/hooks";
import { attachChart, refreshChart } from "components/Stats/template";
export default function TempMainChart({
  type,
  data,
  selectedModel,
  source,
  setSelectedModel,
}) {
  const chart = useRef();
  useLayoutEffect(() => {
    console.log(data);
    chart.current = attachChart(
      "mainChart",
      data,
      // stats[selectedPeriod],
      selectedModel,
      source,
      (e) => {
        //console.log(e,data);
        setSelectedModel(
          data.find((model) => e.seriesName == model?.displayName)?.screenName
        );
      },
      (e) => {
         console.log(e);
        setSelectedModel("");
      }
    );
  }, []);
  useLayoutEffect(() => {
 //console.log(chart)
    refreshChart(chart.current, data, selectedModel, source);
    // }
  }, [data, selectedModel, source]);
  return (
    <div
      id="mainChart"
      style={`width:100%;min-height:500px;max-height:500px;`}
    />
  );
}
