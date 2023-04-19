import * as echarts from "echarts";
import currency from "currency.js";
import moment from "moment";
let option;
export const refreshChart = (chart, data, selectedModel, source) => {
  if (chart && data) {
    if (data[0]?.length) {
      option.xAxis = {
        type: "category",
        data: data[0],
        axisLabel: { rotate: 55.62 },
      };
      option.yAxis = {
        type: "value",
        axisLabel: {
          formatter: function (value) {
            return source == "workTime"
              ? moment.utc(value * 1000).format("HH:mm")
              : value;
          },
        },
      };
      option.tooltip.valueFormatter = (param) =>
        source == "workTime"
          ? moment.utc(param * 1000).format("HH:mm")
          : currency(param, {
              precision: 2,
            }).format();
      option.series = data[1].map((model) => ({
        name: model.displayName,
        type: "bar",
        stack: "total",
        label: {
          show: selectedModel !== "all",
          position: "top",
          formatter: function (d) {
            if (d.data > 0) {
              return source == "workTime"
                ? moment.utc(d.data * 1000).format("HH:mm")
                : d.data;
            } else {
              return "";
            }
          },
        },
        emphasis: {
          focus: "series",
        },
        data:
          selectedModel == "all" || model.screenName == selectedModel
            ? Object.entries(model.chunks).map(
                ([chunk, chunkStats]) => chunkStats[source].value.toFixed(2)
                // source == "earnings"
                //   ? dayStats[source].value.toFixed(1)
                //   : source == "workingTime" ?
                //     dayStats[source].value.toFixed(1)
              )
            : [],
      }));
      chart.setOption(option);
    } else {
      chart.clear();
    }
  }
};
export const attachChart = (
  id,
  data,
  selectedModel,
  source,
  onClick,
  onClick2
) => {
  var chartDom = document.getElementById(id);
  const chart = echarts.init(chartDom, "dark");
  const resizeObserver = new ResizeObserver((entries) => {
    chart.resize();
  });
  chart.on("click", onClick);
  chart.getZr().on("click", onClick2);
  resizeObserver.observe(chartDom);
  option = {
    tooltip: {
      trigger: "item",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: { show: false },
    grid: {
      top: "15%",
      left: "6%",
      right: "6%",
      bottom: "15%",
      containLabel: true,
    },
    labelLayout: { hideOverlap: true },
    dataZoom: [
      {
        type: "inside",
      },
      {
        type: "slider",
      },
    ],
    yAxis: {
      type: "value",
    },
    series: [],
  };
  refreshChart(chart, data, selectedModel, source);
  return chart;
};
