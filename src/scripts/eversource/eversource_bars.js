import * as d3 from 'd3'

const margin = {
  top: 30,
  right: 120,
  bottom: 30,
  left: 50
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

const xPositionScale = d3.scaleLinear().range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 85])
  .range([height, 0])

const parseTime = d3.timeParse('%d-%b-%y %I:%M %p')

Promise.all([
    d3.csv(require('/data/eversource.csv')),
    d3.csv(require('/data/30_days.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))


function ready([datapoints, datapoints_30]) {
  // Sort the countries from low to high
    
  var dateVar;
  datapoints.forEach(d => {

    if (d.Day !== ''){
        dateVar = d.Day
     }

    var timeVar; 
    timeVar = dateVar +' ' +d.Time
    d.datetime = parseTime(timeVar)
  })


  datapoints.forEach(d => {
    d.Total = (+d['Total Website Page Views'].replace(',','') + +d['Total Outage Map Events'].replace(',','') + +d['Mobile App Events'].replace(',','') + +d['In-Bound Calls'].replace(',','') + +d['In-Bound Text Messages'].replace(',',''))/1000
    console.log(d.Total)
  })
const dates = datapoints.map(d => d.datetime)

xPositionScale.domain(d3.extent(dates))
yPositionScale.domain([0,1200])

svg
.append('line') // attach a line
.attr('class', 'y_lines')
.style('stroke', 'red') // colour the line
.attr('stroke-width', 1)
.attr('x1', width) // x position of the first end of the line
.attr('y1', yPositionScale(350)) // y position of the first end of the line
.attr('x2', 0) // x position of the second end of the line
.attr('y2', yPositionScale(350))

     
  svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .lower()

    .attr('class', 'rect_all')
    .attr('width', 3)
    .attr('x', d => {
        return xPositionScale(d.datetime)
      })
      .attr('y', d => {
        return yPositionScale(d.Total)
      })
    .attr('height', d => {
      return height - yPositionScale(d.Total)
    })
    .attr('fill', 'lightgrey')
    .transition()
    .duration(1000)
    .attr('fill', '#ffb347')


svg.append('text').text('Contacts').attr('y',height/2-30).attr('font-size', '10px').attr('font-weight', 5).attr('x', -50)
svg.append('text').text('(1000s)').attr('y',height/2-20).attr('font-size', '10px').attr('font-weight', 5).attr('x', -50)

    

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
    // const newHeight = svgHeight - margin.top - margin.bottom

    // Update our scale
    xPositionScale.range([0, newWidth])
    d3.select('.x-axis').remove()
    d3.select('.y-axis').remove()

    // yPositionScale.range([newHeight, 0])

    // Update things you draw

    // Update axes
    var xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%b %d'))
    .ticks(6)

    svg
    .append('g')
    .attr('class', 'axis x-axis')
    .call(xAxis)
    .lower()

  const yAxis = d3
    .axisLeft(yPositionScale)
    .tickSize(-newWidth)
    .ticks(5)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
    .lower()


    if (newWidth < 300){
    xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%d'))
    .ticks(6)
    }


     svg.select('.x-axis').call(xAxis)
    svg
      .select('.y-axis')
      .transition()
      .call(yAxis)

      svg
      .select('.y_lines')
      .attr('x1', newWidth) // x position of the first end of the line

    svg
      .selectAll('rect')
      .attr('width', 2)
      .attr('height', d => {
        return height - yPositionScale(d.Total)
      })
      .attr('x', d => {
        return xPositionScale(d.datetime)
      })
      .attr('y', d => {
        return yPositionScale(d.Total)
      })
      .attr('fill', 'lightgrey')
      .transition()
      .duration(1000)
      .attr('fill', function(d){
          if (d.Total>350){
                return '#ffb347'
          } else {
              return 'lightgrey'
          }
      })

    // svg.select('#label-1').attr('x', newWidth * 0.75)
    // //  .attr('y', newHeight + 15)

    // svg.select('#label-2').attr('x', newWidth * 0.25)
    //   .attr('y', newHeight + 15)
    d3.select('.x-axis .domain').remove()

    d3.select('.y-axis .domain').remove()
  }

  // When the window resizes, run the function
  // that redraws everything
  window.addEventListener('resize', render)

  // And now that the page has loaded, let's just try
  // to do it once before the page has resized
  render()
}
