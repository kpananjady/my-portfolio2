import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 200, left: 100, right: 0, bottom: 50 }
const height = 650 - margin.top - margin.bottom
const width = 800 - margin.left - margin.right


const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.csv(require('../data/deliquencies.csv')).then(ready)

  const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-20, 0])
  .html(function(d) {
    return `${(d['Connecticut DQ Rate']-d['National DQ Rate']).toFixed(2)}%`
  })

  svg.call(tip)




  function ready(datapoints) {



    const xPositionScale = d3.scaleBand()
    .domain(datapoints.map(function(d) { return d['Month']; }))
    .range([ 20, width]);
  
  
    const yPositionScale = d3.scaleLinear()
    .range([height,0 ])
    .domain([0,10])


    const line = d3
    .line()
    .x(function(d) {
      return xPositionScale((d['Month']))+ xPositionScale.bandwidth()/2;
    })
    .y(function(d) {
      return yPositionScale(d['Connecticut DQ Rate'])
    })


    const line2 = d3
    .line()
    .x(function(d) {
      return xPositionScale((d['Month']))+ xPositionScale.bandwidth()/2;
    })
    .y(function(d) {
      return yPositionScale(d['National DQ Rate'])
    })


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
        
      
    
    const ticks_x = [2,4,6,8,10]

    ticks_x.forEach(draw_2)


console.log(datapoints, 'this is the data')

svg.append('text').attr('class', 'graph_name').text('Connecticut delinquences spike during pandemic,').attr('alignment-baseline', 'middle').attr('y',-150).attr('x',-90).attr('font-size', '25px').attr('font-weight', 5)
svg.append('text').attr('class', 'graph_name').text('outpace national average').attr('alignment-baseline', 'middle').attr('y',-120).attr('x',-90).attr('font-size', '25px').attr('font-weight', 5)

svg.append('text').attr('class', 'graph_sub').text("CT's mortgage delinquency rate has historically been higher than the").attr('alignment-baseline', 'middle').attr('y',-90).attr('x',-90).attr('font-size', '15px').attr('font-weight', 5)
svg.append('text').attr('class', 'graph_sub').text('national average. But the gulf between the two has widened in the ').attr('alignment-baseline', 'middle').attr('y',-70).attr('x',-90).attr('font-size', '15px').attr('font-weight', 5)
svg.append('text').attr('class', 'graph_sub').text('past few months.').attr('alignment-baseline', 'middle').attr('y',-50).attr('x',-90).attr('font-size', '15px').attr('font-weight', 5)





svg.append('circle').attr('cx', -90).attr('cy', 70).attr('r', 5)    .style("fill", "#C0C0C0")

svg.append('text').attr('x', -80).attr('y', 14).attr('r', 5).text('CT mortage').attr('font-size', '10px').attr('font-weight', 5)
svg.append('text').attr('x', -80).attr('y', 23).attr('r', 5).text('delinquency').attr('font-size', '10px').attr('font-weight', 5)
svg.append('text').attr('x', -80).attr('y', 33).attr('r', 5).text('rate').attr('font-size', '10px').attr('font-weight', 5)

svg.append('circle').attr('cx', -90).attr('cy', 20).attr('r', 5).style("fill", "#4C4082")
svg.append('rect').attr('x', -90).attr('y', 20).attr('r', 5).style("fill", "#C0C0C0")
svg.append('text').attr('x', -80).attr('y', 63).attr('r', 5).text('National').attr('font-size', '10px').attr('font-weight', 5)
svg.append('text').attr('x', -80).attr('y', 73).attr('r', 5).text('morgage').attr('font-size', '10px').attr('font-weight', 5)
svg.append('text').attr('x', -80).attr('y', 83).attr('r', 5).text('delinquency').attr('font-size', '10px').attr('font-weight', 5)
svg.append('text').attr('x', -80).attr('y', 93).attr('r', 5).text('rate').attr('font-size', '10px').attr('font-weight', 5)


svg.append('path')
.datum(datapoints)
.attr('class', 'path_next_1')
.attr('d', function(d) {
    return line(d)
})
.attr('stroke', 'darkblue')
.attr('stroke-width', 3)
.attr('fill', 'none')
.attr('opacity',0.25)
.lower()


// svg.append("path")
// .datum(datapoints)
// .attr("fill", "#69b3a2")
// .attr("fill-opacity", .3)
// .attr("stroke", "none")
// .attr("d", d3.area()
//   .x(function(d) { return xPositionScale(d.Month) })
//   .y0( height -50)
//   .y1(function(d) { return yPositionScale(d['Connecticut DQ Rate']) })
//   )

svg.append('path')
.datum(datapoints)
.attr('class', 'path_next_2')
.attr('d', function(d) {
    return line2(d)
})
.attr('stroke', '#C0C0C0')
.attr('stroke-width', 3)
.attr('fill', 'none')
.attr('opacity',0.25)
.lower()

svg.selectAll("mycircle1")
.data(datapoints)
.enter()
.append("circle")
.attr('class', 'my_circle1')

  .attr("cx", function(d) { 

    return xPositionScale((d['Month']))+ xPositionScale.bandwidth()/2;
})
  .attr("cy", function(d) { return yPositionScale(d['Connecticut DQ Rate']) })
  .attr("r", "6")
  .style("fill", "#4C4082")

  svg.selectAll("mycircle2")
  .data(datapoints)
  .enter()
  .append("circle")
  .attr('class', 'my_circle2')
    .attr("cx", function(d) { 

      return xPositionScale((d['Month']))+xPositionScale.bandwidth()/2;
  })
    .attr("cy", function(d) { return yPositionScale(d['National DQ Rate'])  })
    .attr("r", "6")
    .style("fill", "#C0C0C0")


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
      .attr("x2",   function(d) { return xPositionScale(d['Month'])+xPositionScale.bandwidth()/2}) 
      .attr("x1", function(d) { return xPositionScale(d['Month'])+xPositionScale.bandwidth()/2})
      .attr("y1", function(d) { return yPositionScale(d['National DQ Rate']) })
      .attr("y2", function(d) { return yPositionScale(d['Connecticut DQ Rate']) })
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

    // svg
    // .selectAll('month-text')
    // .data(datapoints)
    // .enter()
    // .append('text')
    // .attr('y', function(d){return yPositionScale(d['Month'])+yPositionScale.bandwidth()/2})
    // .attr('x', 0)
    // .text(d => d['Month'])
    // .attr('font-size', '12px').attr('font-weight', 5)


    svg
    .append('text')
    .attr('id', 'tick1')
    .attr('x', 0)
    .attr('y', yPositionScale(2))
    .text('2')
    .attr('font-size', '12px').attr('font-weight', 5)
    .style("text-anchor", "middle")


    svg
    .append('text')
    .attr('id', 'tick2')
    .attr('x', 0)
    .attr('y', yPositionScale(4))
    .text('4')
    .attr('font-size', '12px').attr('font-weight', 5)
    .style("text-anchor", "middle")

    svg
    .append('text')
    .attr('id', 'tick3')
    .attr('x', 0)
    .attr('y', yPositionScale(6))
    .text('6')
    .attr('font-size', '12px').attr('font-weight', 5)
    .style("text-anchor", "middle")


    svg
    .append('text')
    .attr('id', 'tick4')
    .attr('x', 0)
    .attr('y', yPositionScale(8))
    .text('8')
    .attr('font-size', '12px').attr('font-weight', 5)
    .style("text-anchor", "middle")


    svg
    .append('text')
    .attr('id', 'tick4')
    .attr('x', 0)
    .attr('y', yPositionScale(10))
    .text('10')
    .attr('font-size', '12px').attr('font-weight', 5)
    .style("text-anchor", "middle")
    // svg

    svg
    .selectAll('month-text')
    .data(datapoints)
    .enter()
    .append('text')
    .attr('class', 'month-text')
    .attr('y', height-40)
    .attr('x', function(d){return xPositionScale(d['Month'])+xPositionScale.bandwidth()/2})
    .text(d => d['Mon'])
    .attr('font-size', '12px').attr('font-weight', 5)
  

    // .append('text')
    // .attr('id', 'tick2')
    // .attr('x', xPositionScale(4))
    // .attr('y', height+20)
    // .text('4')
    // .attr('font-size', '12px').attr('font-weight', 5)
    // .style("text-anchor", "middle")

    // svg
    // .append('text')
    // .attr('id', 'tick3')
    // .attr('x', xPositionScale(6))
    // .attr('y', height+20)
    // .text('6')
    // .attr('font-size', '12px').attr('font-weight', 5)
    // .style("text-anchor", "middle")


    // svg
    // .append('text')
    // .attr('id', 'tick4')
    // .attr('x', xPositionScale(8))
    // .attr('y', height+20)
    // .text('8')
    // .attr('font-size', '12px').attr('font-weight', 5)
    // .style("text-anchor", "middle")

    // svg
    // .append('text')
    // .attr('id', 'tick5')
    // .attr('x', xPositionScale(10))
    // .attr('y', height+20)
    // .text('10')
    // .attr('font-size', '12px').attr('font-weight', 5)
    // .style("text-anchor", "middle")

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

    svg
    .selectAll('.month-text')
    .attr('x', function(d){return xPositionScale(d['Month'])+xPositionScale.bandwidth()/2})

    svg.select('.path_next_1').attr('d', function(d) {
        return line(d)
    })

    svg.select('.path_next_2').attr('d', function(d) {
        return line2(d)
    })
//     function draw(value) {


//         svg
//           .append('line') // attach a line
//           .attr('class', 'x_lines')
//           .style('stroke', 'lightgrey') // colour the line
//           .style('stroke-dasharray', '1, 1')
//           .attr('stroke-width', 3)
//           .attr('x1', xPositionScale(value)) // x position of the first end of the line
//           .attr('y1', height) // y position of the first end of the line
//           .attr('x2', xPositionScale(value)) // x position of the second end of the line
//           .attr('y2', 0)
//           .lower()
//       }
      
    
//       const ticks_x = [0,2,4,6,8]
//     ticks_x.forEach(draw)
//     console.log(xPositionScale(1650))

    svg.selectAll(".my_circle1").attr("cx", function(d) { 
      return xPositionScale((d['Month']))+xPositionScale.bandwidth()/2
  })

    svg.selectAll(".my_circle2")
    .attr("cx", function(d) { 
      return xPositionScale((d['Month']))+xPositionScale.bandwidth()/2
  })
// // //   .attr("cx", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })
 
    svg.selectAll(".my_line") 
    .attr("x2",   function(d) { return xPositionScale(d['Month'])+xPositionScale.bandwidth()/2}) 
    .attr("x1", function(d) { return xPositionScale(d['Month'])+xPositionScale.bandwidth()/2})
    .attr("y1", function(d) { return yPositionScale(d['National DQ Rate']) })
    .attr("y2", function(d) { return yPositionScale(d['Connecticut DQ Rate']) })
//       svg.select('#tick1')  .attr('x', xPositionScale(1.650))
//       svg.select('#tick2')  .attr('x', xPositionScale(1.700))
//       svg.select('#tick3')  .attr('x', xPositionScale(1.750))
//       svg.select('#tick4')  .attr('x', xPositionScale(1.800))
//       svg.select('#tick5')  .attr('x', xPositionScale(1.850))

// //   if (newWidth>450){
// //     svg.select('.graph_name').text('Vaccinations rise in June after pandemic plummet')
// //     }


//   if (newWidth<450){

//     svg.selectAll('.graph_name').attr('alignment-baseline', 'middle').attr('font-size', '20px').attr('font-weight', 5)
    
//     svg.selectAll('.graph_sub').attr('alignment-baseline', 'middle').attr('font-size', '10px').attr('font-weight', 5)
   
//   }

//   if (newWidth<250){


//     svg.selectAll('.graph_name').attr('alignment-baseline', 'middle').attr('font-size', '17px').attr('font-weight', 5)
    
//     svg.selectAll('.graph_sub').attr('alignment-baseline', 'middle').attr('font-size', '10px').attr('font-weight', 5)
// //     svg.select('.graph_name').attr('font-size', '14px')
// //     svg.select('.graph_sub').text('DPH doses supplied to medical providers, 2020 v 2019').attr('font-size', '10px')

// //     xPositionScale.domain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'])

// //     svg.selectAll(".my_circle").attr("cx", function(d) { return xPositionScale(d.month2)+xPositionScale.bandwidth()/2; })

// //     //   svg.selectAll(".mycircle2")
// //     //   .attr("cx", function(d) { return xPositionScale(d.month)+xPositionScale.bandwidth()/2; })
     
// //     svg.selectAll(".my_line").attr("x1", function(d) { return xPositionScale(d.month2)+xPositionScale.bandwidth()/2; })
// //     .attr("x2", function(d) { return xPositionScale(d.month2)+xPositionScale.bandwidth()/2; })

// //     xPositionScale.range([0,newWidth])
// //     xAxis = d3.axisBottom(xPositionScale).ticks(4)
// //     svg.select('.x-axis').call(xAxis)
//     }

}
window.addEventListener('resize', render)

// And now that the page has loaded, let's just try
// to do it once before the page has resized
render()
  }