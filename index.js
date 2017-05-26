/*
  barChart1 - basically from the d3 tutorials lol
*/
const barChartData = [5, 10, 21, 34, 45];
d3.select('#barChart1')
  .selectAll('div') // selects all divs inside the barchart (for dynamic data rendering)
    .data(barChartData) // appends data
  .enter().append("div") // 3 main "selections", enter, update and exit
    .style("width", function(d) { return d * 10 + "px"; }) // callbacks are invoked with the data passed through
    .text(function(d) { return d; }) // callbacks are invoked with the data passed through
