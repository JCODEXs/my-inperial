import * as echarts from 'echarts';
import ecStat from 'echarts-stat';
let myChart, option, assets;
export const refreshChart = (assetsRef) => {
  if (myChart && assetsRef) {
    assets = assetsRef;
    const sales = [];
    console.log('tassets: ', assets);
    assets.forEach((asset) => {
      asset.adq && sales.push(...asset?.adq);
    });
    console.log(sales);
    const data = source();
    option.dataset = data?.length
      ? [
          {
            source: data,
          },
        ]
      : [{ source: [] }];
    //alert(option.dataset[0].source);
    option.series = [
      {
        name: 'Transacciones',
        type: 'line',
        datasetIndex: 0,
        symbolSize: 7,
      },
    ];
    if (data?.length) {
      option.dataset[1] = {
        transform: {
          type: 'ecStat:histogram',
          // config: {
          //   method: 'exponential',
          //   // 'end' by default
          //   // formulaOn: 'start'
          // },
        },
      };
      option.series[1] = {
        name: 'histogram',
        type: 'bar',
        barWidth: '99.3%',
        label: {
          show: true,
          position: 'top',
        },
        datasetIndex: 1,
      };
      myChart.setOption(option);
    } else {
      myChart.clear();
      //  alert(splice);
      //option.dataset = [];
      // option.series = [];
    }
    //  ];
    //myChart.clear();
    //  alert(data.length);admin
    //  myChart.clear();
  }
};
const source = () =>
  assets.map((asset, index) => {
    return [new Date(asset.creation.utc), index + 1];
  });
export const attachChart = (assetsRef) => {
  assets = assetsRef;
  var chartDom = document.getElementById('chart_visits');
  myChart = echarts.init(chartDom, 'dark');
  const resizeObserver = new ResizeObserver((entries) => {
    myChart.resize();
  });
  resizeObserver.observe(chartDom);
  // See https://github.com/ecomfe/echarts-stat
  //echarts.registerTransform(ecStat.transform.regression);
  echarts.registerTransform(ecStat.transform.histogram);
  option = {
    title: {
      text: 'Usuarios Creados',
      subtext: 'Casa de Adry',
      sublink: 'https://github.com/ecomfe/echarts-stat',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'time',
      scale: true,
      // min: 'dataMin',
      // max: 'dataMax',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      minInterval: 1,
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
  };
  refreshChart(assetsRef);
};
