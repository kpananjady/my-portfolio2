import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import d3Annotation from 'd3-svg-annotation'
d3.tip = d3Tip

const margin = { top: 30, left: 120, right: 30, bottom: 30 }
const height = 300 - margin.top - margin.bottom
const width = 680 - margin.left - margin.right

console.log('Building chart 3')

const svg = d3
  .select('#chart-01')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
const yPositionScale = d3
  .scaleBand()
  .range([0, height])
  .padding(0.25)
const xPositionScale = d3
  .scaleLinear()
  .domain([0, 0.4])
  .range([0, width])
const colorScale = d3
  .scaleOrdinal()
  .range(['lightgrey', 'lightgrey', 'lightgrey', 'lightblue'])

d3.csv(require('../data/hit_rates.csv'))
  .then(ready)
  .catch(err => {
    console.log(err)
  })

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return `Hit rate: <span style='color:grey'>${d.percent}</span>`
  })

svg.call(tip)

const annotations = [
  {
    note: {
      label: 'Longer text to show text wrapping',
      title: 'Minorities have lower hit rates'
    },
    data: {
      Date: '2015-12-14',
      Close: 118
    },
    y: 200,
    x: 100,
    dx: -5,
    dy: 20
  }
]

function ready(datapoints) {
  const counts = datapoints.map(function(d) {
    return +d.percent
  })

  const maxC = d3.max(counts)
  const minC = d3.min(counts)

  const race = datapoints.map(function(d) {
    return d.subject_race
  })

  yPositionScale.domain(race)

  svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('height', yPositionScale.bandwidth())
    .attr('x', 0)
    .attr('y', d => yPositionScale(d.subject_race))
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    //  .attr('width', 0)
    //  .transition()
    //  .ease(d3.easeElastic)
    //  .attr('width', d => yPositionScale(d.percent))
    .attr('width', 0)
    .transition()
    .duration(1000)
    .ease(d3.easeElastic)
    .attr('width', d => xPositionScale(d.percent))
    // .attr('width', d => xPositionScale(d.percent))
    .attr('fill', function(d) {
      return colorScale(d.subject_race)
    })
  //   .on('mouseover', tip.show)
  //   .on('mouseout', tip.hide)

  //  svg
  //  . append('text')
  // .text(
  //  'Rate of success in finding contraband is lower among minorities than whites'
  // )
  // .style('text-anchor', 'middle')
  // .attr('x', width / 2)
  // .attr('dy', -10)

  const xAxis = d3.axisBottom(xPositionScale).ticks(6)

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
