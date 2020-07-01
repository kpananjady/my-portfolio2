import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

var margin = { top: 100, left: 200, right: 50, bottom: 50 }
const height = 600 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

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

  const yPositionScale2 = d3
  .scaleLinear()
  .domain([0, 400])
  .range([height, 0])

const radiusScale = d3
  .scaleSqrt()
  .domain([0, 120])
  .range([2, 15])

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-20, 0])
  .html(function(d) {
    return `${d['Provider Name_x']}`
  })

  const tip2 = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-20, 0])
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
    .attr('class', 'y_lines')
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

svg.append('text').attr('class', 'graph_name').text('Confirmed COVID-19 Cases').attr('alignment-baseline', 'middle').attr('y',-55).attr('x',-150).attr('font-size', '25px').attr('font-weight', 5)

  console.log('Data read in:', datapoints)

//   ticks_x.forEach(draw)
  ticks_y.forEach(draw_2)


  svg
    .append('line') // attach a line
    .attr('id', 'line_100')
    .style('stroke', 'lightgrey') // colour the line
    .style('stroke-dasharray', '3, 3')
    .attr('stroke-width', 3)
    .attr('x1', xPositionScale(100)) // x position of the first end of the line
    .attr('y1', height) // y position of the first end of the line
    .attr('x2', xPositionScale(100)) // x position of the second end of the line
    .attr('y2', 0)

    svg
    .append('line') // attach a line
    .attr('id', 'line_200')
    .style('stroke', 'lightgrey') // colour the line
    .style('stroke-dasharray', '3, 3')
    .attr('stroke-width', 3)
    .attr('x1', xPositionScale(200)) // x position of the first end of the line
    .attr('y1', height) // y position of the first end of the line
    .attr('x2', xPositionScale(200)) // x position of the second end of the line
    .attr('y2', 0)

    svg
    .append('line') // attach a line
    .attr('id', 'line_300')
    .style('stroke', 'lightgrey') // colour the line
    .style('stroke-dasharray', '3, 3')
    .attr('stroke-width', 3)
    .attr('x1', xPositionScale(300)) // x position of the first end of the line
    .attr('y1', height) // y position of the first end of the line
    .attr('x2', xPositionScale(300)) // x position of the second end of the line
    .attr('y2', 0)

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
    .on('click', tip.show)
    .on('mouseout', tip.hide)

    d3.select('#toggle').on('click', () => {

        svg.select('.graph_name').text('Confirmed COVID-19 Cases')
        svg.selectAll('.n_homes')
        .transition()
        .duration(1500)
        .ease(d3.easeElastic)
        .attr('r', d => radiusScale(d['Staff Total Confirmed COVID-19']))
        .attr('cx', d => xPositionScale(d['Average Daily Count of All Employees']))
        .attr('cy', d => yPositionScale( d['Staff Total Confirmed COVID-19']))
    })


    d3.select('#toggle2').on('click', () => {
        svg.select('.graph_name').text('Suspected COVID-19 Cases')
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

    d3.select('#toggle3').on('click', () => {
        svg.select('.graph_name').text('Suspected + Confirmed COVID-19 Cases')
        svg.selectAll('.n_homes')
        .transition()
        .duration(1500)
        .ease(d3.easeElastic)
        .attr('r', d => radiusScale(parseFloat(d['Staff Total Suspected COVID-19'])+parseFloat(d['Staff Total Confirmed COVID-19'])))
        .attr('cx', d => xPositionScale(d['Average Daily Count of All Employees']))
        .attr('cy', function(d){
            var suspected_and_confirmed = parseFloat(d['Staff Total Suspected COVID-19'])+parseFloat(d['Staff Total Confirmed COVID-19'])
            
            return yPositionScale(suspected_and_confirmed)
        })
       
    })

  svg
    .append('text')
    .attr('id', 'x_label')
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

  var xAxis = d3.axisBottom(xPositionScale).ticks(4)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('color', 'grey')
    .call(xAxis)


    function render() {
        const svgContainer = svg.node().closest('div')
        const svgWidth = svgContainer.offsetWidth
        // Do you want it to be full height? Pick one of the two below
        // margin = { top: 100, left: 100, right: 50, bottom: 50 }

        const svgHeight = height + margin.top + margin.bottom
        // const svgHeight = window.innerHeight
    
        const actualSvg = d3.select(svg.node().closest('svg'))
        actualSvg.attr('width', svgWidth).attr('height', svgHeight)
    
        const newWidth = svgWidth - margin.left - margin.right
        const newHeight = svgHeight - margin.top - margin.bottom


        xPositionScale.range([0,newWidth])

        svg.selectAll('.n_homes').attr('cx', d => xPositionScale(d['Average Daily Count of All Employees']))
        svg.selectAll('.y_lines').attr('x1', newWidth) // x position of the first end of the line

       
        svg.select('#line_100')
        .attr('x1', xPositionScale(100)) // x position of the first end of the line
       .attr('x2', xPositionScale(100)) // x position of the second end of the line

        svg.select('#line_200')
        .attr('x1', xPositionScale(200)) // x position of the first end of the line
       .attr('x2', xPositionScale(200))
        svg.select('#line_300')
        .attr('x1', xPositionScale(300)) // x position of the first end of the line
       .attr('x2', xPositionScale(300))

        svg.select('#x_label').attr('x', newWidth/2)

       xAxis = d3.axisBottom(xPositionScale).ticks(4)
       svg.select('.x-axis').call(xAxis)

       d3.select('#toggle3').on('click', () => {
        svg.select('.graph_name').text('Suspected + Confirmed COVID-19')
        svg.selectAll('.n_homes')
        .transition()
        .duration(1500)
        .ease(d3.easeElastic)
        .attr('r', d => radiusScale(parseFloat(d['Staff Total Suspected COVID-19'])+parseFloat(d['Staff Total Confirmed COVID-19'])))
        .attr('cx', d => xPositionScale(d['Average Daily Count of All Employees']))
        .attr('cy', function(d){
            var suspected_and_confirmed = parseFloat(d['Staff Total Suspected COVID-19'])+parseFloat(d['Staff Total Confirmed COVID-19'])
            
            return yPositionScale(suspected_and_confirmed)
        })
       
    })

    }
    window.addEventListener('resize', render)

    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render()
}
