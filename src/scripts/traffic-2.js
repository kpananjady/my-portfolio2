import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 50, left: 50, right: 50, bottom: 50 }
const height = 400 - margin.top - margin.bottom
const width = 400 - margin.left - margin.right

const svg = d3
  .select('#chart-02')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 0.5])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 0.5])
  .range([height, 0])

const radiusScale = d3
  .scaleSqrt()
  .domain([250, 5000])
  .range([2, 15])

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return `Number of searches: <span style='color:grey'>${d.both}</span>`
  })

svg.call(tip)

const ticks = [0.1, 0.2, 0.3, 0.4, 0.5]

function draw(value) {
  svg
    .append('line') // attach a line
    .style('stroke', 'lightgrey') // colour the line
    .style('stroke-dasharray', '3, 3')
    .attr('stroke-width', 3)
    .attr('x1', xPositionScale(value)) // x position of the first end of the line
    .attr('y1', height) // y position of the first end of the line
    .attr('x2', xPositionScale(value)) // x position of the second end of the line
    .attr('y2', 0)
}

function draw_2(value) {
  svg
    .append('line') // attach a line
    .style('stroke', 'lightgrey') // colour the line
    .style('stroke-dasharray', '3, 3')
    .attr('stroke-width', 3)
    .attr('x1', width) // x position of the first end of the line
    .attr('y1', yPositionScale(value)) // y position of the first end of the line
    .attr('x2', 0) // x position of the second end of the line
    .attr('y2', yPositionScale(value))
}
d3.csv(require('../data/hit_rates_dept.csv')).then(ready)

function ready(datapoints) {
  console.log('Data read in:', datapoints)

  ticks.forEach(draw)
  ticks.forEach(draw_2)
  svg
    .append('line')
    .attr('x1', xPositionScale(0))
    .attr('y1', yPositionScale(0))
    .attr('x2', xPositionScale(0.5))
    .attr('y2', yPositionScale(0.5))
    .attr('stroke-width', 2)
    .attr('stroke', 'grey')
    .attr('stroke-dasharray', '5,5')

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', d => radiusScale(d.both))
    .attr('cx', d => xPositionScale(d.fre_w))
    .attr('cy', d => yPositionScale(d.freq_b))
    .attr('fill', 'lightblue')
    //  .attr('stroke', 'black')
    // .attr('opacity', 0.75)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

  svg
    .append('text')
    .text('White')
    .style('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('dy', 325)
    .attr('font-size', '12px')

  svg
    .append('text')
    .text('Black')
    .style('text-anchor', 'middle')
    .attr('x', 0)
    .attr('dy', 150)
    .attr('dx', -25)
    .attr('font-size', '12px')

  const yAxis = d3.axisLeft(yPositionScale).ticks(4)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  const xAxis = d3.axisBottom(xPositionScale).ticks(4)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  function make_x_gridlines() {
    return d3.axisBottom(x).ticks(5)
  }

  // gridlines in y axis function
  function make_y_gridlines() {
    return d3.axisLeft(y).ticks(5)
  }

  svg
    .append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(0,' + height + ')')
    .call(
      make_x_gridlines()
        .tickSize(-height)
        .tickFormat('')
    )

  // add the Y gridlines
  svg
    .append('g')
    .attr('class', 'grid')
    .call(
      make_y_gridlines()
        .tickSize(-width)
        .tickFormat('')
    )
}
