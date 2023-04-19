import * as echarts from 'echarts';

export const attachPieTime = (data) => {
  var chartDom = document.getElementById('pietime');
  var myChart = echarts.init(chartDom, 'dark');
  var option;

  const resizeObserver = new ResizeObserver((entries) => {
    myChart.resize();
  });
  resizeObserver.observe(chartDom);
  option = {
    title: {
      text: 'Distribucion de tiempo',
      subtext: '',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    // },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: Object.entries(data)
          .filter(([key, value]) => value.value > 0)
          .map(([key, value]) => ({
            value: value.value,
            name: key,
          })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  //assets = assetsRef;
  //var chartDom = document.getElementById('chart_visits');
  //myChart = echarts.init(chartDom, 'dark');
  //const resizeObserver = new ResizeObserver((entries) => {
  //  myChart.resize();
  //});
  //resizeObserver.observe(chartDom);
  //// See https://github.com/ecomfe/echarts-stat
  ////echarts.registerTransform(ecStat.transform.regression);
  //echarts.registerTransform(ecStat.transform.histogram);
  //option = {
  //  title: {
  //    text: 'Usuarios Creados',
  //    subtext: 'Casa de Adry',
  //    sublink: 'https://github.com/ecomfe/echarts-stat',
  //    left: 'center',
  //  },
  //  tooltip: {
  //    trigger: 'axis',
  //    axisPointer: {
  //      type: 'cross',
  //    },
  //  },
  //  xAxis: {
  //    type: 'time',
  //    scale: true,
  //    // min: 'dataMin',
  //    // max: 'dataMax',
  //    splitLine: {
  //      lineStyle: {
  //        type: 'dashed',
  //      },
  //    },
  //  },
  //  yAxis: {
  //    minInterval: 1,
  //    splitLine: {
  //      lineStyle: {
  //        type: 'dashed',
  //      },
  //    },
  //  },
  //};
  //refreshChart(assetsRef);
  option && myChart.setOption(option);
};
