import * as d3 from 'd3'

const margin = { top: 30, left: 30, right: 30, bottom: 30 }

const height = 450 - margin.top - margin.bottom

const width = 780 - margin.left - margin.right

const svg = d3
  .select('#chart-5')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`)

d3.csv(require('/data/all-temps.csv'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

const months = [
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
  'Dec'
]

const bands = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
const bands2 = [20, 60, 100]

function draw(value) {
  svg
    .append('circle')
    .attr('r', radiusScale(value))
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', 'none')
    .attr('stroke', 'lightgrey')
}
// I give you a month
// you give me back a number of radians
const angleScale = d3
  .scaleBand()
  .domain(months)
  .range([0, Math.PI * 2])

const radius = 40

const circleScale = d3
  .scalePoint()
  .range([-width / 2, width / 2])
  .padding(0.2)

// If I sell 0 houses, I have a radius of 0
// If I sell 70 houses, I have a radius of... radius? 150
const radiusScale = d3
  .scaleLinear()
  .domain([0, 70])
  .range([0, radius])

const line = d3
  .radialArea()
  .angle(d => angleScale(d.month_name))
  .innerRadius(d => radiusScale(d.low_temp))
  .outerRadius(d => radiusScale(d.high_temp))

function ready(datapoints) {
  datapoints.push(datapoints[0])
  datapoints.push(datapoints[12])
  datapoints.push(datapoints[24])
  datapoints.push(datapoints[36])
  datapoints.push(datapoints[48])
  datapoints.push(datapoints[60])
  const names = datapoints.map(d => d.city)
  circleScale.domain(names)
  const nested = d3
    .nest()
    .key(function(d) {
      return d.city
    })
    .entries(datapoints)

  //  nested[1].push(nested[1].values[0])
  console.log(nested[1].values[0], 'nested1')
  svg
    .selectAll('.cities')
    .data(nested)
    .enter()
    .append('g')
    .attr('transform', function(d) {
      return `translate(${circleScale(d.key)},0)`
    })
    .each(function(d) {
      const container = d3.select(this)

      container
        .append('path')
        .datum(d.values)
        .attr('d', line)
        .attr('fill', 'lightblue')
        .attr('opacity', 0.5)
        .attr('stroke', 'none')

      container
        .selectAll('.band')
        .data(bands)
        .enter()
        .append('circle')
        .attr('fill', 'none')
        .attr('stroke', 'lightgrey')
        .attr('r', function(d) {
          return radiusScale(d)
        })
        .lower()

      // bands.forEach(draw)

      container
        .selectAll('.label')
        .data(bands2)
        .enter()
        .append('text')
        .text(d => d)
        .attr('y', d => -radiusScale(d))
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('font-size', '9px')

      container
        .append('text')
        .datum(d)
        .text(d => d.key)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('font-size', '10px')
        .style('font-weight', '10')
    })

  svg
    .append('text')
    .text('Average temperatures')
    .attr('dy', -150)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('font-size', '20px')
    .style('font-weight', '10')

  svg
    .append('text')
    .text('in cities around the world')
    .attr('dy', -130)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('font-size', '10px')
    .style('font-weight', '10')
}
