import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 100, left: 100, right: 50, bottom: 50 }
const height = 500 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')




  d3.csv(require('../data/vaccination_doses.csv')).then(ready)

  function ready(datapoints) {


    const xPositionScale = d3.scaleBand()
    .domain(datapoints.map(function(d) { return d.month; }))
    .range([ 0, width]);
  
  
    const yPositionScale = d3.scaleLinear()
    .range([height,0 ])
    .domain([0,100000])

console.log(datapoints, 'this is the data')

svg.append('text').attr('class', 'graph_name').text('Vaccinations rise in June after pandemic downtick').attr('alignment-baseline', 'middle').attr('y',-75).attr('x',-90).attr('font-size', '25px').attr('font-weight', 5)
svg.append('text').attr('class', 'graph_name').text('Department of Public Health doses supplied to doctors, 2019 v 2020').attr('alignment-baseline', 'middle').attr('y',-40).attr('x',-80).attr('font-size', '15px').attr('font-weight', 5)
svg.append('circle').attr('cx', -90).attr('cy', 50).attr('r', 5)    .style("fill", "#4C4082")

svg.append('text').attr('x', -80).attr('y', 53).attr('r', 5).text('2020').attr('font-size', '10px').attr('font-weight', 5)

svg.append('text').attr('x', -80).attr('y', 23).attr('r', 5).text('2019').attr('font-size', '10px').attr('font-weight', 5)
svg.append('circle').attr('cx', -90).attr('cy', 20).attr('r', 5).style("fill", "#C0C0C0")



svg.selectAll("mycircle1")
.data(datapoints)
.enter()
.append("circle")
.attr('class', 'my_circle')

  .attr("cy", function(d) { 

    return yPositionScale(parseFloat(d['2019']))
})
  .attr("cx", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })
  .attr("r", "6")
  .style("fill", "#C0C0C0")

  svg.selectAll("mycircle2")
  .data(datapoints)
  .enter()
  .append("circle")
  .attr('class', 'my_circle')
    .attr("cy", function(d) { 

      return yPositionScale(parseFloat(d['2020']))
  })
    .attr("cx", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })
    .attr("r", "6")
    .style("fill", "#4C4082")


    const markerBoxWidth = 10;
    const markerBoxHeight = 10;
    const refX = markerBoxWidth / 2;
    const refY = markerBoxHeight / 2;
    const markerWidth = markerBoxWidth / 2;
    const markerHeight = markerBoxHeight / 2;
    const arrowPoints = [[0, 0], [0, 10], [10, 5]]
    svg
    .append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
    .attr('refX', refX)
    .attr('refY', refY)
    .attr('markerWidth', markerBoxWidth)
    .attr('markerHeight', markerBoxHeight)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', d3.line()(arrowPoints))
    .attr('stroke', 'lightblue')
    .attr('fill', 'lightblue');

    svg
    .append('defs')
    .append('marker')
    .attr('id', 'arrow2')
    .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
    .attr('refX', refX)
    .attr('refY', refY)
    .attr('markerWidth', markerBoxWidth)
    .attr('markerHeight', markerBoxHeight)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', d3.line()(arrowPoints))
    .attr('stroke', 'pink')
    .attr('fill', 'pink');



    svg.selectAll("myline")
    .data(datapoints)
    .enter()
    .append("line")
    .attr('class', 'my_line')
      .attr("y1", function(d) { 
          if (d.month==='January'){
          return yPositionScale(d['2020'])+10 
      } if (d.month==='February'){
        return yPositionScale(d['2020'])

      } if (d.month==='June'){
        return yPositionScale(d['2020'])+10 

      }
      
      else {
        return yPositionScale(d['2020'])-10

      }
        })
      .attr("y2", function(d) { return yPositionScale(d['2019']) })
      .attr("x1", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })
      .attr("x2", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })
      .attr("stroke", function(d){
        if (d.month==='January'){
            return 'lightblue'
        } if (d.month==='February'){
            return 'lightblue'
  
        } if (d.month==='June'){
            return 'lightblue'
  
        }
        
        else {
            return 'pink'
  
        }
      })
      .attr("stroke-width", "1px")
      .attr("marker-start", function(d){
        if (d.month==='January'){
            return "url(#arrow)"
        } if (d.month==='February'){
            return "url(#arrow)"
  
        } if (d.month==='June'){
            return "url(#arrow)"
  
        }
        
        else {
            return "url(#arrow2)"
  
        }
        
        })
      .lower()



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
    xAxis = d3.axisBottom(xPositionScale).ticks(4)
    svg.select('.x-axis').call(xAxis)

    svg.selectAll(".my_circle").attr("cx", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })

//   svg.selectAll(".mycircle2")
//   .attr("cx", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })
 
  svg.selectAll(".my_line") .attr("x1", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })
  .attr("x2", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })


}
window.addEventListener('resize', render)

// And now that the page has loaded, let's just try
// to do it once before the page has resized
render()
  }


