import * as echarts from 'echarts';

export const attachPie = (transactions) => {
  // alert(transactions.length);
  var chartDom = document.getElementById('pie');
  var myChart = echarts.init(chartDom, 'dark');
  var option;

  const resizeObserver = new ResizeObserver((entries) => {
    myChart.resize();
  });
  resizeObserver.observe(chartDom);

  const transactionsByDomain = transactions.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.domain]) {
      acc[value.domain] = [];
    }

    // Grouping
    acc[value.domain].push(value);

    return acc;
  }, {});
  console.log(JSON.stringify(transactionsByDomain, null, 2));

  option = {
    title: {
      text: 'TRANSACCIONES POR ORIGEN',
      subtext: '',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    // legend: {
    //   orient: 'horizontal',
    //   top: 'bottom',
    // },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: Object.entries(transactionsByDomain).map(([key, value]) => {
          return {
            value: value.reduce((a, b) => a.amount + b.amount),
            name: key,
          };
        }),
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
