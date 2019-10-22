import * as d3 from 'd3'

const margin = { top: 30, left: 30, right: 30, bottom: 30 }
const height = 400 - margin.top - margin.bottom
const width = 780 - margin.left - margin.right

const svg = d3
  .select('#chart-3c')
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

const angleScale = d3
  .scaleBand()
  .domain(months)
  .range([0, Math.PI * 2])

const radius = 70

const colorScale = d3
  .scaleLinear()
  .domain([38, 75, 84])
  .range(['lightblue', 'pink'])

// If I sell 0 houses, I have a radius of 0
// If I sell 70 houses, I have a radius of... radius? 150
const radiusScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, radius])

const line = d3
  .radialArea()
  .angle(d => angleScale(d.month_name))
  .outerRadius(d => radiusScale(d.high))
  .innerRadius(d => radiusScale(d.low))

// I've been told to draw a line that's
// the average

const arc = d3
  .arc()
  .innerRadius(d => radiusScale(d.low_temp))
  .outerRadius(d => radiusScale(d.high_temp))
  .startAngle(d => angleScale(d.month_name))
  .endAngle(d => angleScale(d.month_name) + angleScale.bandwidth())

const circleScale = d3
  .scalePoint()
  .range([-width / 2, width / 2])
  .padding(0.2)

function ready(datapoints) {
  const names = datapoints.map(d => d.city)
  circleScale.domain(names)
  const nested = d3
    .nest()
    .key(function(d) {
      return d.city
    })
    .entries(datapoints)
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

      // console.log(pie(nested), 'pie')
      // console.log(pie(d))
      console.log(d.values)
      console.log(d)
      console.log(d.key)

      container
        .selectAll('.polar-bar')
        .data(d.values)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => colorScale(d.high_temp))
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')

      container
        .append('text')
        .text(d => d.key)
        .attr('x', 0)
        .attr('y', radius + 10)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
    })
}
