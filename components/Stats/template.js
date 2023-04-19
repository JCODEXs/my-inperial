import * as echarts from "echarts";
import currency from "currency.js";
import moment from "moment";
let option;
export const refreshChart = (chart, data, selectedModel, source) => {
  var app = {};
  app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
  }

  if (chart && data) {
    if (data[0]?.length) {
      option.toolbox= {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
         // dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }};

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
        barGap: 0,
        label: {
          show: selectedModel !== "",
          fontSize: 14,
          position: "top",
          rotate: 75,
  align: 'left',
  verticalAlign: 'middle',
    distance: 10,

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
       // selectedModel == "" ||  model.screenName == selectedModel

          source!="cumulative" ? Object.entries(model.chunks).map(
                ([chunk,chunkStats]) => chunkStats[0][source]?.value.toFixed(2)
                // source == "earnings"
                //   ? dayStats[source].value.toFixed(1)
                //   : source == "workingTime" ?
                //     dayStats[source].value.toFixed(1)
              ):Object.entries(model.chunks).map(
                ([chunk,chunkStats]) => chunkStats[2][source][0]?.toFixed(2))
            ,
      }));
     // console.log(option)
     
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
    legend: { show: true },
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
