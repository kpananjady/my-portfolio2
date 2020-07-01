import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 100, left: 50, right: 50, bottom: 50 }
const height = 600 - margin.top - margin.bottom
const width = 800 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 300])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 120])
  .range([height, 0])

const radiusScale = d3
  .scaleSqrt()
  .domain([0, 150])
  .range([2, 15])

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return `Name: <span style='color:grey'>${d['Provider Name_x']}</span>`
  })

  const tip2 = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return `Name: <span style='color:grey'>${d['Provider Name_x']}, ${d['Staff Total Suspected COVID-19']} </span>`
  })  

svg.call(tip)
svg.call(tip2)

const ticks_x = [100, 200,300]
const ticks_y = [20,40,60,80,100,120]


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
d3.csv(require('../data/NH.csv')).then(ready)

function ready(datapoints) {

svg.append('text').attr('class', 'graph_name').text('Confirmed cases in 192 CT Nursing Homess').attr('alignment-baseline', 'middle').attr('y',-55).attr('font-size', '30px').attr('font-weight', 5)

  console.log('Data read in:', datapoints)

  ticks_x.forEach(draw)
  ticks_y.forEach(draw_2)
//   svg
//     .append('line')
//     .attr('x1', xPositionScale(0))
//     .attr('y1', yPositionScale(0))
//     .attr('x2', xPositionScale(0.5))
//     .attr('y2', yPositionScale(0.5))
//     .attr('stroke-width', 2)
//     .attr('stroke', 'grey')
//     .attr('stroke-dasharray', '5,5')

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'n_homes')
    .attr('r', d => radiusScale(d['Staff Total Confirmed COVID-19']))
    .attr('cx', d => xPositionScale(d['Average Daily Count of All Employees']))
    .attr('cy', d => yPositionScale( d['Staff Total Confirmed COVID-19']))
    .attr('fill', 'darkblue')
    .attr('opacity', 0.25)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

    d3.select('#toggle').on('click', () => {

        svg.select('.graph_name').text('Confirmed Cases from 192 CT Nursing Homes')
        svg.selectAll('.n_homes')
        .transition()
        .duration(1500)
        .ease(d3.easeElastic)
        .attr('r', d => radiusScale(d['Staff Total Confirmed COVID-19']))
        .attr('cx', d => xPositionScale(d['Average Daily Count of All Employees']))
        .attr('cy', d => yPositionScale( d['Staff Total Confirmed COVID-19']))
    })


    d3.select('#toggle2').on('click', () => {
        svg.select('.graph_name').text('Suspected Cases from 192 CT Nursing Homes')
        svg.selectAll('.n_homes')
        .transition()
        .duration(1500)
        .ease(d3.easeElastic)
        .attr('r', d => radiusScale(d['Staff Total Suspected COVID-19']))
        .attr('cx', d => xPositionScale(d['Average Daily Count of All Employees']))
        .attr('cy', d => yPositionScale( d['Staff Total Suspected COVID-19']))
        .on('mouseover', tip2.show)
        .on('mouseout', tip2.hide)
    })

  svg
    .append('text')
    .text('Average Daily Count of Employees')
    .style('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('dy', height+35)
    .attr('font-size', '14px')
    .attr('font-weight', 5)

  svg
    .append('text')
    .text('Cases')
    .style('text-anchor', 'middle')
    .attr('x', 0)
    .attr('dy', height/2-10)
    .attr('dx', -30)
    .attr('font-size', '14px')
    .attr('font-weight', 5)

  const yAxis = d3.axisLeft(yPositionScale).ticks(4)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .attr('color', 'grey')

    .call(yAxis)

  const xAxis = d3.axisBottom(xPositionScale).ticks(4)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('color', 'grey')
    .call(xAxis)


//   function make_x_gridlines() {
//     return d3.axisBottom(x).ticks(5)
//   }

//   // gridlines in y axis function
//   function make_y_gridlines() {
//     return d3.axisLeft(y).ticks(5)
//   }

//   svg
//     .append('g')
//     .attr('class', 'grid')
//     .attr('transform', 'translate(0,' + height + ')')
//     .call(
//       make_x_gridlines()
//         .tickSize(-height)
//         .tickFormat('')
//     )

  // add the Y gridlines
//   svg
//     .append('g')
//     .attr('class', 'grid')
//     .call(
//       make_y_gridlines()
//         .tickSize(-width)
//         .tickFormat('')
//     )
}
