// graphs canvasjs
$(function () {
	var chart = new CanvasJS.Chart('chartContainer', {
    exportEnabled: true,
    title: {
      text: 'Gaming Consoles Sold in 2012'
    },
    legend: {
      maxWidth: 350,
      itemWidth: 120
    },
    data: [
      {
        type: 'pie',
        showInLegend: true,
        dataPoints: [
          {
            y: 4181563
          },
          {
            y: 2175498
          }
        ]
      }
    ]
  });
  chart.render();
});
