import { useLayoutEffect, useRef } from "preact/hooks";
import { attachChart, refreshChart } from "components/Stats/general";
import { useJasmin } from "vStore/jasmin";
export default function PeriodsChart({ timezone, selectedModel, source }) {
  const { stats } = useJasmin();
  const chart = useRef();
  useLayoutEffect(() => {
    chart.current = attachChart(
      {},
      "periodsChart",
      [],
      // Object.keys(stats[selectedPeriod].days),
      selectedModel,
      source,
      (e) => {
        console.log(e);
        setSelectedModel(
          data.current.find((model) => e.seriesName == model.displayName)
            .screenName
        );
      },
      (e) => {
        console.log(e);
        setSelectedModel("all");
      }
    );
  }, []);
  // useLayoutEffect(async () => {
  //   await requestStats(selectedPeriod);
  // }, [selectedPeriod]);
  // useLayoutEffect(() => {
  //   if (stats[selectedPeriod]) {
  //     data.current = [];
  //     Object.entries(stats[selectedPeriod].days).forEach(([day, dayStats]) =>
  //       dayStats[timezone].forEach((modelStats) => {
  //         const found = data.current.find(
  //           (modelData) => modelData.screenName == modelStats.screenName
  //         );
  //         if (!found) {
  //           data.current.push({
  //             screenName: modelStats.screenName,
  //             displayName: modelStats.displayName,
  //             days: { [day]: modelStats.total },
  //           });
  //         } else {
  //           found.days[day] = modelStats.total;
  //         }
  //         console.log("modelStats.total: ", modelStats.total);
  //       })
  //     );
  //     // alert(selectedModel);
  //     refreshChart(
  //       chart.current,
  //       data.current,
  //       Object.keys(stats[selectedPeriod].days),
  //       selectedModel,
  //       source
  //     );
  //   }
  // }, [stats[selectedPeriod], timezone, selectedModel, source]);
  return <div id="periodsChart" style="width:100%;height:500px;" />;
}
