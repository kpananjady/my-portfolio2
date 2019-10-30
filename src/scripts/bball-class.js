import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 30, left: 30, right: 30, bottom: 30 }
const height = 200 - margin.top - margin.bottom
const width = 680 - margin.left - margin.right

console.log('Building chart 3')

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create your scales

const xPositionScale = d3
  .scaleLinear()
  .domain([2010, 2019])
  .range([0, width])
const yPositionScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([height, 0])

// Do you need a d3.line function for this? Maybe something similar?

// Import your data file using d3.csv

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return `Loss rate: <span style='color:grey'>${d.rate}</span>`
  })

svg.call(tip)

d3.csv(require('../data/rentention_rate.csv'))
  .then(ready)
  .catch(err => {
    console.log(err)
  })

function ready(datapoints) {
  // Draw your areas

  const line = d3
    .line()
    .x(d => xPositionScale(d.period))
    .y(d => yPositionScale(+d.rate))
  svg
    .append('path')
    .datum(datapoints)
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('opacity', 0.5)
    .attr('d', line)

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', function(d) {
      return xPositionScale(+d.period)
    })
    .attr('cy', function(d) {
      return yPositionScale(+d.rate)
    })
    .attr('fill', 'blue')
    .attr('stroke', 'blue')
    .attr('opacity', 0.5)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  // Add your axes
  const xAxis = d3.axisBottom(xPositionScale).tickFormat(d3.format('d'))
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  const yAxis = d3.axisLeft(yPositionScale)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
}
