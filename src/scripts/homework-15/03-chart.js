import * as d3 from 'd3'

const margin = { top: 10, left: 10, right: 10, bottom: 10 }

const height = 480 - margin.top - margin.bottom

const width = 480 - margin.left - margin.right

const svg = d3
  .select('#chart-3')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

let radius = width / 2

const radiusScale = d3
  .scaleLinear()
  .domain([10, 100])
  .range([40, radius])

const angleScale = d3
  .scalePoint()
  .domain([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
    'Blah'
  ])
  .range([0, Math.PI * 2])

const line = d3
  .radialArea()
  .outerRadius(function(d) {
    return radiusScale(d.high_temp)
  })
  .innerRadius(function(d) {
    return radiusScale(d.low_temp)
  })
  .angle(function(d) {
    return angleScale(d.month_name)
  })

d3.csv(require('/data/all-temps.csv'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(datapoints) {
  const container = svg
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

  datapoints.forEach(d => {
    d.high_temp = +d.high_temp
    d.low_temp = +d.low_temp
  })

  // Filter it so I'm only looking at NYC datapoints
  const nycDatapoints = datapoints.filter(d => d.city === 'NYC')
  nycDatapoints.push(nycDatapoints[0])

  const limaDatapoints = datapoints.filter(d => d.city === 'Lima')
  limaDatapoints.push(limaDatapoints[0])

  const tusconDatapoints = datapoints.filter(d => d.city === 'Tuscon')
  tusconDatapoints.push(tusconDatapoints[0])

  const sDatapoints = datapoints.filter(d => d.city === 'Stockholm')
  sDatapoints.push(sDatapoints[0])

  const bDatapoints = datapoints.filter(d => d.city === 'Beijing')
  bDatapoints.push(bDatapoints[0])

  const mDatapoints = datapoints.filter(d => d.city === 'Melbourne')
  mDatapoints.push(mDatapoints[0])

  container
    .append('path')
    .attr('class', 'temp')
    .datum(nycDatapoints)
    .attr('d', line)
    .attr('fill', 'none')
  // .attr('opacity', 0.75)

  container
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('class', 'city-name')
    .attr('font-size', 30)
    .attr('font-weight', 700)
    .attr('alignment-baseline', 'middle')

  d3.select('#nyc').on('stepin', function() {
    // .style('visibility', 'hidden')

    container
      .select('.temp')
      .attr('fill', 'green')
      .attr('opacity', 0.75)

    container.select('text').text('NYC')
  })
  // .on('stepout', function() {
  //   console.log('leaving nyc')
  //   container.append('text').text('Yo')
  //   container.selectAll('.city-name').attr('fill', 'red')
  //   container.select('.nyc-name').style('visibility', 'hidden')
  // })

  d3.select('#beijing').on('stepin', function() {
    container
      .select('.temp')
      .datum(bDatapoints)
      .attr('d', line)
      .attr('fill', 'purple')
      .attr('opacity', 0.75)

    container.select('text').text('Beijing')
  })

  // d3.select('#stockholm').on('stepin', function() {
  //   container
  //     .select('.temp')
  //     .datum(sDatapoints)
  //     .attr('d', line)
  //     .attr('fill', 'blue')
  //     .attr('opacity', 0.75)

  //   container.select('text').text('Stockholm')
  // })
  d3.select('#stockholm').on('stepin', function() {
    container
      .select('.temp')
      .datum(sDatapoints)
      .attr('d', line)
      .attr('fill', 'salmon')
      .attr('opacity', 0.75)

    container.select('text').text('Stockholm')
  })

  d3.select('#lima').on('stepin', function() {
    container
      .select('.temp')
      .datum(limaDatapoints)
      .attr('d', line)
      .attr('fill', 'orange')
      .attr('opacity', 0.75)

    container.select('text').text('Lima')
  })
  // .on('stepout', function() {
  //   container.select('.city-name').remove()
  //   container.select('.temp').remove()
  // })

  d3.select('#tuscon').on('stepin', function() {
    container
      .select('.temp')
      .datum(tusconDatapoints)
      .attr('d', line)
      .attr('fill', 'red')
      .attr('opacity', 0.75)

    container.select('text').text('Tuscon')
  })

  const circleBands = [20, 30, 40, 50, 60, 70, 80, 90]
  const textBands = [30, 50, 70, 90]

  container
    .selectAll('.bands')
    .data(circleBands)
    .enter()
    .append('circle')
    .attr('class', 'bands')
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', function(d) {
      return radiusScale(d)
    })
    .lower()

  container
    .selectAll('.temp-notes')
    .data(textBands)
    .enter()
    .append('text')
    .attr('class', 'temp-notes')
    .attr('x', 0)
    .attr('y', d => -radiusScale(d))
    .attr('dy', -2)
    .text(d => d + '°')
    .attr('text-anchor', 'middle')
    .attr('font-size', 8)

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

    // console.log(newHeight, 'newheight')

    radius = newWidth / 2

    radiusScale.range([40, radius])
    // Update axes

    container.selectAll('.bands').attr('r', function(d) {
      return radiusScale(d)
    })

    container.select('.temp').attr('d', line)

    // container.select('text').text('Lima')
    //   .attr('y', newHeight + 15)

    //  d3.select('.y-axis .domain').remove()
  }

  // When the window resizes, run the function
  // that redraws everything
  window.addEventListener('resize', render)

  // And now that the page has loaded, let's just try
  // to do it once before the page has resized
  render()
}
