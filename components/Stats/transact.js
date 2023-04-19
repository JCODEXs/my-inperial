import * as echarts from 'echarts';
import ecStat from 'echarts-stat';
let myChart, option, assets;
{
  /*                   <div style="flex:1;"> {trans.screenName}</div> */
}
{
  /*                   <div style="font-size:160%;">${trans.amount}</div> */
}
{
  /*                 </div> */
}
{
  /*                 <div style="flex:1;"> */
}
{
  /*                   <div> {trans.time}</div> */
}
{
  /*                   <div> {moment(trans.time).fromNow()}</div> */
}
{
  /*                 </div> */
}
{
  /*                 <div style="flex:1;"> */
}
{
  /*                   <div>{trans.domain}</div> */
}
{
  /*                   <div style=""> {trans.pretence}</div> */
}
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
const source = () => {
  var val = 0;
  return [...assets]
    .sort((a, b) => a.time.localeCompare(b.time))
    .map((asset, index) => {
      const newVal = val + asset.amount;
      const ret = [new Date(asset.time), newVal];
      val = newVal;
      return ret;
    });
};
export const attachChart = (assetsRef) => {
  assets = assetsRef;
  var chartDom = document.getElementById('transac');
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
      text: 'Ultimas Transacciones',
      subtext: 'Live Jasmin',
      sublink: 'https://github.com/ecomfe/echarts-stat',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    dataZoom: [
      {
        type: 'inside',
      },
      {
        type: 'slider',
      },
    ],
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
