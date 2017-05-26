/*
  barChart1 - basically from the d3 tutorials lol
  - uses divs
*/
(function() {
  const barChartData = [5, 10, 21, 34, 45];
  const xScaleBarChart1 = d3.scaleLinear()
                          .domain([0, d3.max(barChartData)])
                          .range([0, 900]); // can use this to modify the width


  d3.select('#barChart1')
    .selectAll('div') // selects all divs inside the barchart (for dynamic data rendering)
      .data(barChartData) // appends data
    .enter().append("div") // 3 main "selections", enter, update and exit
      .style("width", d => `${xScaleBarChart1(d)}px`) // callbacks are invoked with the data passed through
      .text(d => d); // callbacks are invoked with the data passed through
})();
/*
  barChart2
  - uses svg
  - loads data from csv

*/
(function() {
  const typeConverter = d => {
    console.log(d);
    d.value = +d.value;
    return d;
  }
  // Set up base values here
  const width = 900,
        barHeight = 20;

  const xScale = d3.scaleLinear()
                  .range([0, width]);

  // Set up initial chart
  const chart = d3.select('#barChart2')
    .attr('width', width);


  // request here
  d3.csv('./fakeData/barChart2.csv', typeConverter, (error, data) => {
    // Set up data related chart properties
    xScale.domain([0, d3.max(data)]);

    chart.attr('height', barHeight * data.length);

    // Set up bars - only need enter hook atm
    const bar = chart.selectAll('g')
      .data(data)
      .enter().append('g')
        .attr('transform', (d, i) => `translate(0, ${i*barHeight})`);

    bar.append('rect')
      .attr('width', xScale)
      .attr('height', barHeight - 1);

    // We need to manually position text as its not an actual text property, just a svg text element
    bar.append('text')
      .attr('x', d => xScale(d) - 20)
      .attr('y', barHeight / 2)
      .attr('dy', ".35em") // Sets the text offset
      .text(d => d);

  })
})();
