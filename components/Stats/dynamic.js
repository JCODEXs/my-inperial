import * as echarts from 'echarts';
export const attachDynamic = (id, titulo, repulsion, edgeLength) => {
  var chartDom = document.getElementById(id);
  var myChart = echarts.init(chartDom, 'dark');
  var option;

  const resizeObserver = new ResizeObserver((entries) => {
    myChart.resize();
  });
  resizeObserver.observe(chartDom);
  const data = [
    {
      fixed: true,
      x: myChart.getWidth() / 2,
      y: myChart.getHeight() / 2,
      symbolSize: 20,
      id: '-1',
    },
  ];
  const edges = [];
  option = {
    title: {
      text: titulo,
      subtext: 'Sistema de fidelización',
      left: 'center',
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        animation: false,
        data: data,
        force: {
          // initLayout: 'circular'
          // gravity: 1,
          repulsion,
          edgeLength,
        },
        edges: edges,
      },
    ],
  };
  setInterval(function () {
    data.push({
      id: data.length + '',
    });
    var source = Math.round((data.length - 1) * Math.random());
    var target = Math.round((data.length - 1) * Math.random());
    if (source !== target) {
      edges.push({
        source: source,
        target: target,
      });
    }
    myChart.setOption({
      series: [
        {
          roam: true,
          data: data,
          edges: edges,
        },
      ],
    });
    // console.log('nodes: ' + data.length);
    // console.log('links: ' + data.length);
  }, 2000 + Math.random() * 2000);

  option && myChart.setOption(option);
};
