import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 300, left: 100, right: 50, bottom: 50 }
const height = 650 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right


const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.csv(require('../data/commuter.csv')).then(ready)

  const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-20, 0])
  .html(function(d) {
    return `${d['Difference']}k`
  })

  svg.call(tip)

  function ready(datapoints) {


    const yPositionScale = d3.scaleBand()
    .domain(datapoints.map(function(d) { return d['Month/Year']; }))
    .range([ 0, height]);
  
  
    const xPositionScale = d3.scaleLinear()
    .range([0,width ])
    .domain([1.550,1.900])


    function draw(value) {


        svg
          .append('line') // attach a line
          .attr('class', 'x_lines')
          .style('stroke', 'lightgrey') // colour the line
          .style('stroke-dasharray', '1, 1')
          .attr('stroke-width', 3)
          .attr('x1', xPositionScale(value)) // x position of the first end of the line
          .attr('y1', height) // y position of the first end of the line
          .attr('x2', xPositionScale(value)) // x position of the second end of the line
          .attr('y2', 0)
          .lower()
      }
      
    
    const ticks_x = [1.650,1.700,1.750, 1.800,1.850]

    ticks_x.forEach(draw)


console.log(datapoints, 'this is the data')

svg.append('text').attr('class', 'graph_name').text('Connecticut residents working out of state').attr('alignment-baseline', 'middle').attr('y',-245).attr('x',-90).attr('font-size', '25px').attr('font-weight', 5)
svg.append('text').attr('class', 'graph_name').text('has surged dramatically since 2013').attr('alignment-baseline', 'middle').attr('y',-215).attr('x',-90).attr('font-size', '25px').attr('font-weight', 5)

svg.append('text').attr('class', 'graph_sub').text('The Labor Department doesn’t report, specifically, how many Connecticut').attr('alignment-baseline', 'middle').attr('y',-170).attr('x',-90).attr('font-size', '15px').attr('font-weight', 5)
svg.append('text').attr('class', 'graph_sub').text('residents work out of state, but there still is a way to demonstrate').attr('alignment-baseline', 'middle').attr('y',-150).attr('x',-90).attr('font-size', '15px').attr('font-weight', 5)
svg.append('text').attr('class', 'graph_sub').text('that number has been growing for years.').attr('alignment-baseline', 'middle').attr('y',-130).attr('x',-90).attr('font-size', '15px').attr('font-weight', 5)




svg.append('text').attr('class', 'graph_sub').text('The difference between the dots shows total employment among').attr('alignment-baseline', 'middle').attr('y',-90).attr('x',-90).attr('font-size', '15px').attr('font-weight', 5)
svg.append('text').attr('class', 'graph_sub').text('Connecticut residents far exceeds the total number of people').attr('alignment-baseline', 'middle').attr('y',-70).attr('x',-90).attr('font-size', '15px').attr('font-weight', 5)
svg.append('text').attr('class', 'graph_sub').text('working here — many of whom come from neighboring states.').attr('alignment-baseline', 'middle').attr('y',-50).attr('x',-90).attr('font-size', '15px').attr('font-weight', 5)

svg.append('circle').attr('cx', -90).attr('cy', 70).attr('r', 5)    .style("fill", "#4C4082")

svg.append('text').attr('x', -80).attr('y', 14).attr('r', 5).text('CT residents').attr('font-size', '10px').attr('font-weight', 5)
svg.append('text').attr('x', -80).attr('y', 23).attr('r', 5).text('employed').attr('font-size', '10px').attr('font-weight', 5)
svg.append('text').attr('x', -80).attr('y', 33).attr('r', 5).text('(millions)').attr('font-size', '10px').attr('font-weight', 5)

svg.append('circle').attr('cx', -90).attr('cy', 20).attr('r', 5).style("fill", "#C0C0C0")
svg.append('rect').attr('x', -90).attr('y', 20).attr('r', 5).style("fill", "#C0C0C0")
svg.append('text').attr('x', -80).attr('y', 63).attr('r', 5).text('People working').attr('font-size', '10px').attr('font-weight', 5)
svg.append('text').attr('x', -80).attr('y', 73).attr('r', 5).text('in CT').attr('font-size', '10px').attr('font-weight', 5)
svg.append('text').attr('x', -80).attr('y', 83).attr('r', 5).text('(millions)').attr('font-size', '10px').attr('font-weight', 5)




svg.selectAll("mycircle1")
.data(datapoints)
.enter()
.append("circle")
.attr('class', 'my_circle1')

  .attr("cx", function(d) { 

    return xPositionScale(parseFloat(d['Connecticut residents employed']))
})
  .attr("cy", function(d) { return yPositionScale(d['Month/Year'])+yPositionScale.bandwidth()/2; })
  .attr("r", "6")
  .style("fill", "#C0C0C0")

  svg.selectAll("mycircle2")
  .data(datapoints)
  .enter()
  .append("circle")
  .attr('class', 'my_circle2')
    .attr("cx", function(d) { 

      return xPositionScale(parseFloat(d['People working in Connecticut']))
  })
    .attr("cy", function(d) { return yPositionScale(d['Month/Year'])+yPositionScale.bandwidth()/2; })
    .attr("r", "6")
    .style("fill", "#4C4082")


    // const markerBoxWidth = 10;
    // const markerBoxHeight = 10;
    // const refX = markerBoxWidth / 2;
    // const refY = markerBoxHeight / 2;
    // const markerWidth = markerBoxWidth / 2;
    // const markerHeight = markerBoxHeight / 2;
    // const arrowPoints = [[0, 0], [0, 10], [10, 5]]
    // svg
    // .append('defs')
    // .append('marker')
    // .attr('id', 'arrow')
    // .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
    // .attr('refX', refX)
    // .attr('refY', refY)
    // .attr('markerWidth', markerBoxWidth)
    // .attr('markerHeight', markerBoxHeight)
    // .attr('orient', 'auto-start-reverse')
    // .append('path')
    // .attr('d', d3.line()(arrowPoints))
    // .attr('stroke', 'lightblue')
    // .attr('fill', 'lightblue');

    // svg
    // .append('defs')
    // .append('marker')
    // .attr('id', 'arrow2')
    // .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
    // .attr('refX', refX)
    // .attr('refY', refY)
    // .attr('markerWidth', markerBoxWidth)
    // .attr('markerHeight', markerBoxHeight)
    // .attr('orient', 'auto-start-reverse')
    // .append('path')
    // .attr('d', d3.line()(arrowPoints))
    // .attr('stroke', 'pink')
    // .attr('fill', 'pink');



    svg.selectAll("myline")
    .data(datapoints)
    .enter()
    .append("line")
    .attr('class', 'my_line')
      .attr("x2",   function(d) { return xPositionScale(d['Connecticut residents employed'])} )
      .attr("x1", function(d) { return xPositionScale(d['People working in Connecticut']) })
      .attr("y1", function(d) { return yPositionScale(d['Month/Year'])+yPositionScale.bandwidth()/2; })
      .attr("y2", function(d) { return yPositionScale(d['Month/Year'])+yPositionScale.bandwidth()/2; })
      .attr("stroke", 'grey')
      .attr("stroke-width", "12px")
      .attr('opacity', 0.2)
      .on('mouseover', tip.show)
      .on('click', tip.show)
      .on('mouseout', tip.hide)
      .lower()
    //   .attr("marker-start", function(d){
    //     if (d.month==='January'){
    //         return "url(#arrow)"
    //     } if (d.month==='February'){
    //         return "url(#arrow)"
  
    //     } if (d.month==='June'){
    //         return "url(#arrow)"
  
    //     }
        
    //     else {
    //         return "url(#arrow2)"
  
    //     }
        
    //     })
    //   .lower()

    svg
    .selectAll('month-text')
    .data(datapoints)
    .enter()
    .append('text')
    .attr('y', function(d){return yPositionScale(d['Month/Year'])+yPositionScale.bandwidth()/2})
    .attr('x', 0)
    .text(d => d['Month/Year'])
    .attr('font-size', '12px').attr('font-weight', 5)


    svg
    .append('text')
    .attr('id', 'tick1')
    .attr('x', xPositionScale(1.650))
    .attr('y', height+20)
    .text('1.650')
    .attr('font-size', '12px').attr('font-weight', 5)
    .style("text-anchor", "middle")

    svg
    .append('text')
    .attr('id', 'tick2')
    .attr('x', xPositionScale(1.700))
    .attr('y', height+20)
    .text('1.700')
    .attr('font-size', '12px').attr('font-weight', 5)
    .style("text-anchor", "middle")

    svg
    .append('text')
    .attr('id', 'tick3')
    .attr('x', xPositionScale(1.750))
    .attr('y', height+20)
    .text('1.750')
    .attr('font-size', '12px').attr('font-weight', 5)
    .style("text-anchor", "middle")


    svg
    .append('text')
    .attr('id', 'tick4')
    .attr('x', xPositionScale(1.800))
    .attr('y', height+20)
    .text('1.800')
    .attr('font-size', '12px').attr('font-weight', 5)
    .style("text-anchor", "middle")

    svg
    .append('text')
    .attr('id', 'tick5')
    .attr('x', xPositionScale(1.850))
    .attr('y', height+20)
    .text('1.850')
    .attr('font-size', '12px').attr('font-weight', 5)
    .style("text-anchor", "middle")

    // svg
    // .append('text')
    // .attr('x', xPositionScale(100000))
    // .attr('y', height)
    // .text('100000')
    // .attr('font-size', '12px').attr('font-weight', 5)
    // .style("text-anchor", "middle")


// const yAxis = d3.axisLeft(yPositionScale).ticks(4)
// svg
//   .append('g')
//   .attr('class', 'axis y-axis')
//   .attr('color', 'grey')
//   .call(yAxis)

// var xAxis = d3.axisBottom(xPositionScale).ticks(4)
// svg
//   .append('g')
//   .attr('class', 'axis x-axis')
//   .attr('transform', 'translate(0,' + height + ')')
//   .attr('color', 'grey')
//   .call(xAxis)


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

    xPositionScale.range([20,newWidth])

    svg.selectAll('.x_lines').remove()

    function draw(value) {


        svg
          .append('line') // attach a line
          .attr('class', 'x_lines')
          .style('stroke', 'lightgrey') // colour the line
          .style('stroke-dasharray', '1, 1')
          .attr('stroke-width', 3)
          .attr('x1', xPositionScale(value)) // x position of the first end of the line
          .attr('y1', height) // y position of the first end of the line
          .attr('x2', xPositionScale(value)) // x position of the second end of the line
          .attr('y2', 0)
          .lower()
      }
      
    
    const ticks_x = [1.650,1.700,1.750, 1.800,1.850]

    ticks_x.forEach(draw)
    console.log(xPositionScale(1650))

    svg.selectAll(".my_circle1").attr("cx", function(d) { 
      return xPositionScale(parseFloat(d['Connecticut residents employed']))
  })

    svg.selectAll(".my_circle2")
    .attr("cx", function(d) { 
      return xPositionScale(parseFloat(d['People working in Connecticut']))
  })
// //   .attr("cx", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })
 
    svg.selectAll(".my_line") 
    .attr("x2",   function(d) { return xPositionScale(d['Connecticut residents employed'])} )
      .attr("x1", function(d) { return xPositionScale(d['People working in Connecticut']) })
      .attr("y1", function(d) { return yPositionScale(d['Month/Year'])+yPositionScale.bandwidth()/2; })
      .attr("y2", function(d) { return yPositionScale(d['Month/Year'])+yPositionScale.bandwidth()/2; })

      svg.select('#tick1')  .attr('x', xPositionScale(1.650)).text('1.650')
      svg.select('#tick2')  .attr('x', xPositionScale(1.700)).text('1.700')
      svg.select('#tick3')  .attr('x', xPositionScale(1.750)).text('1.750')
      svg.select('#tick4')  .attr('x', xPositionScale(1.800)).text('1.800')
      svg.select('#tick5')  .attr('x', xPositionScale(1.850)).text('1.850')

//   if (newWidth>450){
//     svg.select('.graph_name').text('Vaccinations rise in June after pandemic plummet')
//     }


  if (newWidth<450){

    svg.selectAll('.graph_name').attr('alignment-baseline', 'middle').attr('font-size', '20px').attr('font-weight', 5)
    
    svg.selectAll('.graph_sub').attr('alignment-baseline', 'middle').attr('font-size', '10px').attr('font-weight', 5)
   
  }

  if (newWidth<250){


    svg.select('#tick1')  .attr('x', xPositionScale(1.650)).text('1.65')
    svg.select('#tick2')  .attr('x', xPositionScale(1.700)).text('1.70')
    svg.select('#tick3')  .attr('x', xPositionScale(1.750)).text('1.75')
    svg.select('#tick4')  .attr('x', xPositionScale(1.800)).text('1.80')
    svg.select('#tick5')  .attr('x', xPositionScale(1.850)).text('1.85')

    svg.selectAll('.graph_name').attr('alignment-baseline', 'middle').attr('font-size', '17px').attr('font-weight', 5)
    
    svg.selectAll('.graph_sub').attr('alignment-baseline', 'middle').attr('font-size', '10px').attr('font-weight', 5)
//     svg.select('.graph_name').attr('font-size', '14px')
//     svg.select('.graph_sub').text('DPH doses supplied to medical providers, 2020 v 2019').attr('font-size', '10px')

//     xPositionScale.domain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'])

//     svg.selectAll(".my_circle").attr("cx", function(d) { return xPositionScale(d.month2)+xPositionScale.bandwidth()/2; })

//     //   svg.selectAll(".mycircle2")
//     //   .attr("cx", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })
     
//     svg.selectAll(".my_line").attr("x1", function(d) { return xPositionScale(d.month2)+xPositionScale.bandwidth()/2; })
//     .attr("x2", function(d) { return xPositionScale(d.month2)+xPositionScale.bandwidth()/2; })

//     xPositionScale.range([0,newWidth])
//     xAxis = d3.axisBottom(xPositionScale).ticks(4)
//     svg.select('.x-axis').call(xAxis)
    }

}
window.addEventListener('resize', render)

// // And now that the page has loaded, let's just try
// // to do it once before the page has resized
// render()
  }