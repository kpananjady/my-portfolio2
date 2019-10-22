import * as d3 from 'd3'

const margin = { top: 30, left: 30, right: 30, bottom: 30 }
const height = 400 - margin.top - margin.bottom
const width = 1000 - margin.left - margin.right

const svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`)

d3.csv(require('/data/time-breakdown-all.csv'))
  .then(ready)
  .catch(err => console.log('Failed with', err))

const radius = 100

const pie = d3.pie().value(function(d) {
  return d.minutes
})

const arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(radius)

const labelArc = d3
  .arc()
  .innerRadius(radius + 10)
  .outerRadius(radius + 10)

const circleScale = d3.scalePoint().range([-width / 3, width / 3])

function ready(datapoints) {
  const names = datapoints.map(d => d.project)
  circleScale.domain(names)
  const nested = d3
    .nest()
    .key(function(d) {
      return d.project
    })
    .entries(datapoints)

  const colorScale = d3.scaleOrdinal().range(['pink', 'cyan', 'magenta'])

  console.log(nested, 'nested')

  svg
    .selectAll('.projects')
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

      container.append('circle').attr('r', 10)

      container
        .selectAll('.path')
        .data(pie(d.values))
        .enter()
        .append('path')
        .attr('d', function(d) {
          console.log(d, 'what')

          return arc(d)
        })
        .attr('fill', function(d) {
          console.log(d.data, 'wha')
          return colorScale(d.data.task)
        })

      container
        .append('text')
        .text(d.key)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('y', height / 2 - 10)
        .attr('x', d => circleScale(d))
    })
}
