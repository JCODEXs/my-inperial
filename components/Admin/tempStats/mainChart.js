import { useLayoutEffect, useRef } from "preact/hooks";
import { attachChart, refreshChart } from "components/Stats/general";
export default function MainChart({
  type,
  data,
  selectedModel,
  source,
  setSelectedModel,
}) {
  const chart = useRef();
  useLayoutEffect(() => {
    // export const attachChart = (
    //   assetsRef,
    //   id,
    //   days,
    //   selectedModel,
    //   source,
    //   onClick,
    //   onClick2
    // ) => {
    chart.current = attachChart(
      "mainChart",
      data,
      // stats[selectedPeriod],
      selectedModel,
      source,
      (e) => {
        // console.log(e);
        setSelectedModel(
          data[1].find((model) => e.seriesName == model.displayName).screenName
        );
      },
      (e) => {
        // console.log(e);
        setSelectedModel("all");
      }
    );
  }, []);
  useLayoutEffect(() => {
    // if (stats[selectedPeriod]) {
    //   data.current = [];
    //   Object.entries(stats[selectedPeriod].days).forEach(([day, dayStats]) =>
    //     dayStats[timezone].forEach((modelStats) => {
    //       const found = data.current.find(
    //         (modelData) => modelData.screenName == modelStats.screenName
    //       );
    //       if (!found) {
    //         data.current.push({
    //           screenName: modelStats.screenName,
    //           displayName: modelStats.displayName,
    //           days: { [day]: modelStats.total },
    //         });
    //       } else {
    //         found.days[day] = modelStats.total;
    //       }
    //       console.log("modelStats.total: ", modelStats.total);
    //     })
    //   );
    //   // alert(selectedModel);
    //   //

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
