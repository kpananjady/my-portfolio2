import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import d3Annotation from 'd3-svg-annotation'
d3.tip = d3Tip

const margin = { top: 30, left: 30, right: 30, bottom: 30 }
const height = 150 - margin.top - margin.bottom
const width = 680 - margin.left - margin.right

console.log('Building chart 3')

const svg = d3
  .select('#chart-00')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scalePoint()
  .domain(['White', 'Black', 'Asian', 'Hispanic'])
  .range([0, width])
  .padding(0.25)

const radiusScale = d3
  .scaleSqrt()
  .domain([0, 1.5])
  .range([2, 20])

const radiusScale2 = d3
  .scaleSqrt()
  .domain([0, 344734])
  .range([2, 40])

const colorScale = d3
  .scaleOrdinal()
  .range(['lightblue', 'lightgrey', 'lightblue', 'lightblue'])

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return `Stop rate: <span style='color:grey'>${d.rate}</span>`
  })

svg.call(tip)

d3.csv(require('../data/sankey_race.csv'))
  .then(ready)
  .catch(err => {
    console.log(err)
  })

function ready(datapoints) {
  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .attr('cy', height / 2)
    .attr('r', d => radiusScale2(d.stops))
    .transition()
    .duration(2000)
    .ease(d3.easeCircle)
    .attr('r', d => radiusScale(d.rate))
    .attr('cx', d => xPositionScale(d.race))
    .attr('fill', d => colorScale(d.race))

  //  .attr('stroke', 'black')
  // .attr('opacity', 0.75)
  svg
    .selectAll('text')
    .data(datapoints)
    .enter()
    .append('text')
    .attr('x', d => xPositionScale(d.race))
    .attr('y', height)

    .text(d => d.race)
    .attr('fill', 'grey')
    .style('text-anchor', 'middle')
    .attr('font-size', '12px')
}
