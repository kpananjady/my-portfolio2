import * as d3 from 'd3'

const margin = { top: 20, left: 0, right: 0, bottom: 0 }
const height = 400 - margin.top - margin.bottom
const width = 400 - margin.left - margin.right

const svg = d3
  .select('#chart-6')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`)

d3.csv(require('/data/ratings.csv'))
  .then(ready)
  .catch(err => console.log('Failed with', err))

const categories = ['Food', 'Service', 'Atmosphere', 'Price', 'Trendiness']

const bands = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

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
  .domain(categories)
  .range([0, Math.PI * 2])

const radius = 150

// If I sell 0 houses, I have a radius of 0
// If I sell 70 houses, I have a radius of... radius? 150
const radiusScale = d3
  .scaleLinear()
  .domain([0, 5])
  .range([0, radius])

const line = d3
  .radialLine()
  .angle(d => angleScale(d.category))
  .radius(d => radiusScale(d.score))

function ready(datapoints) {
  datapoints.push(datapoints[0])
  svg
    .append('path')
    .datum(datapoints)
    .attr('d', line)
    .attr('fill', 'lightpink')
    .attr('opacity', 0.5)
    .attr('stroke', 'black')

  bands.forEach(draw)
  svg
    .append('circle')
    .attr('r', 3)
    .attr('cx', 0)
    .attr('cy', 0)

  svg
    .selectAll('.radius-line')
    .data(angleScale.domain())
    .enter()
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', -radius)
    .attr('stroke', 'grey')
    .style('stroke-dasharray', '3, 3')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale(d)}rad)`
    })

  svg
    .selectAll('.label')
    .data(datapoints)
    .enter()
    .append('text')
    .text(d => d.category)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale(d.category)}rad)`
    })
    .attr('y', -radius - 10)
}
