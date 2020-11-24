import * as d3 from 'd3'

const margin = {
  top: 30,
  right:30,
  bottom: 15,
  left: 150
}

const width = 700 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3.scaleBand().range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, height])

const colorScale = d3
  .scaleOrdinal()
  .range([
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69'
  ])


const parseTime = d3.timeParse('%Y-%m-%d')

Promise.all([
  "https://test-uploading-file.s3.amazonaws.com/df.csv",
  "https://test-uploading-file.s3.amazonaws.com/df_minus_30.csv",
  ]
  .map(function(url) {
    return fetch(url).then(function(response) {
      return response.ok ? response.text() : Promise.reject(response.status);
    }).then(function(text) {
      return d3.csvParse(text);
    });
  })).then(ready)
  .catch(err => console.log('Failed on', err))


function ready([datapoints, datapoints_30]) {

    svg.append('text').attr('x', -150).attr('y', -5).text('CT Population').attr('font-size', '10px').attr('font-weight', 5)

    var ct_pop = [{"0-9":{"0":10.5},"10-19":{"0":12.8},"20-29":{"0":12.9},"30-39":{"0":12.3},"40-49":{"0":12.3},"50-59":{"0":14.4},"60-69":{"0":12.8},"70-79":{"0":7.4},"80":{"0":4.7}}]

    var stackedData = d3.stack()
    .keys(['0-9','10-19','20-29','30-39','40-49','50-59','60-69','70-79','80'])
    (ct_pop)

    var color = d3.scaleOrdinal()
    .domain(['0-9','10-19','20-29','30-39','40-49','50-59','60-69','70-79','80'])
    .range(d3.schemeSet2);

    var area = d3.area()
  .x(function(d) { return -130})
  .y0(function(d) { return yPositionScale(d[0]); })
  .y1(function(d) { return (d[1]); })

// Show the areas
svg
  .data(stackedData)
  .enter()
  .append("path")
    .attr("class", function(d) { return "myArea " + d.key })
    .style("fill", function(d) { return color(d.key); })
    .attr("d", area)

    console.log(stackedData, 'this')
    // .range(["4B4E6D","89a7a7","e3d26f","d65c6c","ff931f","bf0d22","d5cce0","540804","6E75A8"]

    console.log(ct_pop[0])
    svg.append('rect').attr('x', -130).attr('y',0).attr('width', 10).attr('height', yPositionScale(4.7)).attr('fill','#6E75A8' )
    svg.append('rect').attr('x', -130).attr('y', yPositionScale(4.7)).attr('width', 10).attr('height', yPositionScale(7.4)).attr('fill','#540804' )
    svg.append('rect').attr('x', -130).attr('y', yPositionScale(4.7)+yPositionScale(7.4)).attr('width', 10).attr('height', yPositionScale(12.8)).attr('fill','#e5aa70' )
    svg.append('rect').attr('x', -130).attr('y', yPositionScale(4.7)+yPositionScale(7.4)+yPositionScale(12.8)).attr('width', 10).attr('height', yPositionScale(14.4)).attr('fill','#bf0d22' )
    svg.append('rect').attr('x', -130).attr('y', yPositionScale(4.7)+yPositionScale(7.4)+yPositionScale(12.8)+yPositionScale(14.4)).attr('width', 10).attr('height', yPositionScale(12.3)).attr('fill','#ff931f' )
    svg.append('rect').attr('x', -130).attr('y', yPositionScale(4.7)+yPositionScale(7.4)+yPositionScale(12.8)+yPositionScale(14.4)+yPositionScale(12.3)).attr('width', 10).attr('height', yPositionScale(12.3)).attr('fill','#d65c6c' )
    svg.append('rect').attr('x', -130).attr('y', yPositionScale(4.7)+yPositionScale(7.4)+yPositionScale(12.8)+yPositionScale(14.4)+yPositionScale(12.3)+yPositionScale(12.3)).attr('width', 10).attr('height', yPositionScale(12.9)).attr('fill','#e3d26f' )
    svg.append('rect').attr('x', -130).attr('y', yPositionScale(4.7)+yPositionScale(7.4)+yPositionScale(12.8)+yPositionScale(14.4)+yPositionScale(12.3)+yPositionScale(12.3)+yPositionScale(12.9)).attr('width', 10).attr('height', yPositionScale(12.8)).attr('fill','#89a7a7' )
    svg.append('rect').attr('x', -130).attr('y', yPositionScale(4.7)+yPositionScale(7.4)+yPositionScale(12.8)+yPositionScale(14.4)+yPositionScale(12.3)+yPositionScale(12.3)+yPositionScale(12.9)+yPositionScale(12.8)).attr('width', 10).attr('height', yPositionScale(10.5)).attr('fill','#4B4E6D' )

    console.log(ct_pop, 'ct_pop')
    datapoints.forEach(d => {

        d.datetime = parseTime(d["date"])
      })

    const dates = datapoints.map(d => d.datetime)

var tomorrow = new Date();


console.log(d3.max(dates), tomorrow.setDate(d3.max(dates).getDate()+1), 'these')
var dates_array = d3.timeDays(d3.min(dates), tomorrow)
xPositionScale.domain(dates_array)

    var keys = datapoints.columns.slice(12,21)

    console.log(keys,"keys")
    // console.log(keys)
    // color palette
    var color = d3.scaleOrdinal()
      .domain(keys)
    //   .range(d3.schemeSet2)
      .range(["4B4E6D","89a7a7","e3d26f","d65c6c","ff931f","bf0d22","e5aa70","540804","6E75A8"]
      );
  
    // //stack the data?
    var stackedData = d3.stack()
      .keys(keys)
      (datapoints)

    console.log(stackedData)

    const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%b %d'))
    .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%20)}));

  

    svg
    .append('g')
    .attr('class', 'axis x-axis')
    .call(xAxis)
    .lower()

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+40 )
      .text("Time (year)");

  // Add Y axis label:
//   svg.append("text")
//       .attr("text-anchor", "end")
//       .attr("x", 0)
//       .attr("y", -20 )
//       .text("# of baby born")
//       .attr("text-anchor", "start")

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 101])
    .range([ height, 0 ]);
  svg.append("g")
  .attr('class', 'axis y-axis')
    .call(d3.axisLeft(y).ticks(5))

    var clip = svg.append("defs").append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width )
    .attr("height", height )
    .attr("x", 0)
    .attr("y", 0);

// Add brushing
// var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
//     .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
//     .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

// Create the scatter variable: where both the circles and the brush take place
var areaChart = svg.append('g')
  .attr("clip-path", "url(#clip)")

// Area generator
var area = d3.area()
  .x(function(d) { return xPositionScale(d.data.datetime); })
  .y0(function(d) { return y(d[0]); })
  .y1(function(d) { return y(d[1]); })

// Show the areas
areaChart
  .selectAll("mylayers")
  .data(stackedData)
  .enter()
  .append("path")
    .attr("class", function(d) { return "myArea " + d.key })
    .style("fill", function(d) { return color(d.key); })
    .attr("d", area)
    // .attr('opacity',0.6)

// Add the brushing
// areaChart
//   .append("g")
//     .attr("class", "brush")
//     .call(brush);

// var idleTimeout
// function idled() { idleTimeout = null; }

// A function that update the chart for given boundaries
// function updateChart() {

//   extent = d3.event.selection

//   // If no selection, back to initial coordinate. Otherwise, update X axis domain
//   if(!extent){
//     if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
//     x.domain(d3.extent(data, function(d) { return d.year; }))
//   }else{
//     x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
//     areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
//   }

//   // Update axis and area position
//   xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
//   areaChart
//     .selectAll("path")
//     .transition().duration(1000)
//     .attr("d", area)
//   }



  //////////
  // HIGHLIGHT GROUP //
  //////////

  // What to do when one group is hovered
  var highlight = function(d){
    console.log(d)
    // reduce opacity of all groups
    d3.selectAll(".myArea").style("opacity", .1)
    // expect the one that is hovered
    d3.select("."+d).style("opacity", 1)
  }

  // And when it is not hovered anymore
  var noHighlight = function(d){
    d3.selectAll(".myArea").style("opacity", 1)
  }



  //////////
  // LEGEND //
  //////////

  // Add one dot in the legend for each name.
  var size = 20
  svg.selectAll("myrect")
    .data(keys)
    .enter()
    .append("rect")
      .attr("x", 1000)
      .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ return color(d)})
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)

  // Add one dot in the legend for each name.
  svg.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
      .attr("x", -125 + size*1.2)
      .attr("y", function(d,i){ return 320 - i*(size+15) - (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function(d){ return color(d)})
      .text(function(d,i){ 
          if (i===0){
            return 'Age 0-9'
          }
          if (i===1){
            return 'Age 10-19'
          }
          if (i===2){
            return 'Age 20-29'
          }
          if (i===3){
            return 'Age 30-39'
          }
          if (i===4){
            return 'Age 40-49'
          }
          if (i===5){
            return 'Age 50-59'
          }
          if (i===6){
            return 'Age 60-69'
          }
          if (i===7){
            return 'Age 70-79'
          }
          if (i===8){
            return 'Age >=80'
          }
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      .attr('font-size', '15px').attr('font-weight', 100)
      .attr('class','legend')
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight)

      d3.select('.y-axis .domain').remove()

      d3.select('.x-axis .domain').remove()


      function render() {
        const svgContainer = svg.node().closest('div')
        const svgWidth = svgContainer.offsetWidth
        // Do you want it to be full height? Pick one of the two below
        const svgHeight = height + margin.top + margin.bottom
        // const svgHeight = window.innerHeight
    
        const actualSvg = d3.select(svg.node().closest('svg'))
        actualSvg.attr('width', svgWidth).attr('height', svgHeight)
    
        const newWidth = svgWidth - margin.left - margin.right
        const newHeight = svgHeight - margin.top - margin.bottom

        xPositionScale.range([0, newWidth])
        d3.selectAll('.myArea').attr("d", area)

        svg.select('.x-axis').call(xAxis)
        d3.select('.x-axis .domain').remove()

    
    }
    window.addEventListener('resize', render)

    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render()
}