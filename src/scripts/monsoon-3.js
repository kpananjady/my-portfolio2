import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 30, left: 300, right: 30, bottom: 30 }
const height = 400 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-3')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.csv(require('../data/aug.csv'))
  .then(ready)
  .catch(err => {
    console.log(err)
  })

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return `${d.rainfall} <span style='color:grey'>${d.year}</span>`
  })
  .style('background-color', 'black')

svg.call(tip)

const xPositionScale = d3.scaleLinear().range([0, width])
const yPositionScale = d3.scaleLinear().range([height, 0])

const listDrought = [
  1873,
  1877,
  1899,
  1901,
  1904,
  1905,
  1911,
  1918,
  1920,
  1941,
  1951,
  1965,
  1966,
  1968,
  1972,
  1974,
  1979,
  1982,
  1985,
  1986,
  1987,
  2002,
  2004,
  2009,
  2014,
  2015
]

function draw(value) {
  svg
    .append('line') // attach a line
    .style('stroke', 'red') // colour the line
    .style('stroke-dasharray', '3, 3')
    .attr('stroke-width', 3)
    .attr('x1', xPositionScale(value)) // x position of the first end of the line
    .attr('y1', height) // y position of the first end of the line
    .attr('x2', xPositionScale(value)) // x position of the second end of the line
    .attr('y2', 0)
}
function ready(datapoints) {
  const rain = datapoints.map(function(d) {
    return +d.rainfall
  })

  const year = datapoints.map(function(d) {
    return +d.year
  })

  const maxR = d3.max(rain)
  const minR = d3.min(rain)
  const minY = d3.min(year)
  const maxY = d3.max(year)
  xPositionScale.domain([minY - 10, maxY])
  yPositionScale.domain([minR - 10, maxR])

  listDrought.forEach(draw)
  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', function(d) {
      return xPositionScale(+d.year)
    })
    .attr('cy', function(d) {
      return yPositionScale(+d.rainfall)
    })
    .attr('fill', 'blue')
    .attr('stroke', 'blue')
    .attr('opacity', 0.5)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  svg
    .append('text')
    .text('Below average August rainfall and drought years in India')
    .style('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('dy', -10)
  const xAxis = d3
    .axisBottom(xPositionScale)
    .ticks(10)
    .tickFormat(d3.format('d'))

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .call(g => svg.select('.domain').remove())
}
