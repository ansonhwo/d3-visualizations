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
    xScale.domain([0, d3.max(data, d => d.value)]);
    console.log(data)
    chart.attr('height', barHeight * data.length);

    // Set up bars - only need enter hook atm
    const bar = chart.selectAll('g')
      .data(data)
      .enter().append('g')
        .attr('transform', (d, i) => `translate(0, ${i*barHeight})`);

    bar.append('rect')
      .attr('width', d => xScale(d.value))
      .attr('height', barHeight - 1);

    // We need to manually position text as its not an actual text property, just a svg text element
    bar.append('text')
      .attr('x', d => xScale(d.value) - 20)
      .attr('y', barHeight / 2)
      .attr('dy', ".35em") // Sets the text offset
      .text(d => d.value);
  })
})();
/*
  barChart3
  - set width height
  - set scale (range and domain)
  - select chart and initialize with width and height
*/
(function() {
  const width = 960,
        height = 500;

  const yScale = d3.scaleLinear().range([height, 0]); // We switch height and width because of how SVG defines coordinate positions

  const chart = d3.select('#barChart3')
    .attr('width', width)
    .attr('height', height);

  d3.csv('./fakeData/barChart3.csv', d => { d.frequency = +d.frequency; return d}, (error, data) => {
    console.log(data)
    yScale.domain([0, d3.max(data, d => d.frequency)]);

    const barWidth = width / data.length;

    // Create group elements for svg
    const bar = chart.selectAll('g')
        .data(data)
      .enter().append('g')
        .attr('transform', (d, i) => `translate(${i*(barWidth)},0)`);

    // Create rectangles based on the data

    bar.append('rect')
        .attr('y', d => yScale(d.frequency)) // maps the y frequency based on the data
        .attr('height', d => height - yScale(d.frequency)) // because svg y axis goes from top to bottom
        .attr('width', barWidth - 1)

    bar.append('text')
        .attr('x', barWidth / 2)
        .attr('y', d => yScale(d.frequency) + 3)
        .attr('dy', '0.75em')
        .text(d => d.letter)

  });
})();
