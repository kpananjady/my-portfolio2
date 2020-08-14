import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

var margin = { top: 200, left: 100, right: 50, bottom: 50 }
const height = 500 - margin.top - margin.bottom
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
  .domain([0, 100])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([height, 0])
  
  
    const xPositionScale2 = d3.scaleLinear()
    .range([0,width*0.4-25])
    .domain([15,50])

const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-20, 0])
  .html(function(d) {
    return `${d['NM']}`
  })

  
svg.call(tip)


const ticks_y = [20,40,60,80,100]


function draw_2(value) {
  svg
    .append('line') // attach a line
    .attr('class', 'y_lines')
    .style('stroke', 'lightgrey') // colour the line
    .style('stroke-dasharray', '2, 2')
    .attr('stroke-width', 2)
    .attr('x1', width) // x position of the first end of the line
    .attr('y1', yPositionScale(value)) // y position of the first end of the line
    .attr('x2', 0) // x position of the second end of the line
    .attr('y2', yPositionScale(value))
}
d3.csv(require('../data/voting_ct.csv')).then(ready)

function ready(datapoints) {

svg.append('text').attr('class', 'graph_name').text('Dems report higher turnout, absentee ballot use').attr('alignment-baseline', 'middle').attr('y',-175).attr('x',-58).attr('font-size', '20px').attr('font-weight', 5)

svg.append('text').attr('class', 'sub').text('Absentee Ballots').attr('alignment-baseline', 'middle').attr('y',-135).attr('x',0.4*width+55).attr('font-size', '15px').attr('font-weight', 5)
svg.append('text').attr('class', 'sub').text("Turnout '20 v '16").attr('alignment-baseline', 'middle').attr('y',-135).attr('x',0).attr('font-size', '15px').attr('font-weight', 5)


svg.append('text').attr('class', 'graph_name').text('2020: 28.53%').attr('alignment-baseline', 'center').attr('y',-100).attr('x',-50).attr('font-size', '10px').attr('font-weight', 5)
svg.append('text').attr('class', 'graph_name').text('2020:20.09%').attr('alignment-baseline', 'left').attr('y',-60).attr('x',-50).attr('font-size', '10px').attr('font-weight', 5)

svg.append('circle').attr('id', 'dot_plot1').attr('r', 6).attr('cy',-100).attr('cx', xPositionScale2(43.1)).attr('fill', 'lightgrey')
svg.append('circle').attr('id', 'dot_plot2').attr('r', 6).attr('cy',-100).attr('cx', xPositionScale2(28.53)).attr('fill', 'black')
svg.append('text').attr('id', 'dot_plot1_text').text('43.1%').attr('y',-100).attr('x', xPositionScale2(43.1)+7).attr('font-size', '10px').attr('font-weight', 5)

svg
.append("line")
.attr('id', 'my_line1')
  .attr("x2",   function(d) { return xPositionScale2(43.1)} )
  .attr("x1", function(d) { return xPositionScale2(28.53) })
  .attr("y1", function(d) { return -100 })
  .attr("y2", function(d) { return -100 })
  .attr("stroke", 'darkblue')
  .attr("stroke-width", "5px")
  .attr('opacity', 0.2)


svg.append('circle').attr('id', 'dot_plot3').attr('r', 6).attr('cy',-60).attr('cx', xPositionScale2(47.2)).attr('fill', 'lightgrey')
svg.append('circle').attr('id', 'dot_plot4').attr('r', 6).attr('cy',-60).attr('cx', xPositionScale2(20.09)).attr('fill', 'black')
svg.append('text').attr('id', 'dot_plot2_text').text('47.2%').attr('y',-60).attr('x', xPositionScale2(47.2)+7).attr('font-size', '10px').attr('font-weight', 5)

svg
.append("line")
.attr('id', 'my_line2')
  .attr("x2",   function(d) { return xPositionScale2(47.2)} )
  .attr("x1", function(d) { return xPositionScale2(20.09) })
  .attr("y1", function(d) { return -60 })
  .attr("y2", function(d) { return -60 })
  .attr("stroke", 'red')
  .attr("stroke-width", "5px")
  .attr('opacity', 0.2)

svg
         .append('rect')
         .attr('class', 'bar_2_town_100')
         .attr("y",-105
         )
         .attr("height", 15)
         .attr("x",0.4*width+65)
         .attr("width",0.4*width)
         .attr('fill', 'darkblue')
         .attr('rx',10)
         .attr('ry',10)
         .attr('opacity', 0.25)

         svg
         .append('rect')
         .attr('class', 'bar_2')
         .attr("y",-105
         )
         .attr("height", 15)
         .attr("x",0.4*width+65)
         .attr("width",62/100*0.4*width)
         .attr('fill', 'darkblue')
         .attr('rx',10)
         .attr('ry',10)
         .attr('opacity', 0.25)

         svg.append('text').attr('class', 'label').text('62%').attr('alignment-baseline', 'middle').attr('y',-97).attr('x',2*0.4*width+30).attr('font-size', '10px').attr('font-weight', 5)
         svg.append('text').attr('class', 'label').text('41%').attr('alignment-baseline', 'middle').attr('y',-57).attr('x',2*0.4*width+30).attr('font-size', '10px').attr('font-weight', 5)

   
         svg
         .append('rect')
         .attr('class', 'bar_2_state_100')
         .attr("y",-65)
         .attr("height", 15)
         .attr("x", 0.4*width+65)
         .attr("width",0.4*width)
         .attr('fill', 'red')
         .attr('rx',10)
         .attr('ry',10)
         .attr('opacity', 0.25)


         svg
         .append('rect')
         .attr('class', 'bar_2_state')
         .attr("y",-65)
         .attr("height", 15)
         .attr("x", 0.4*width+65)
         .attr("width",41/100*0.4*width)
         .attr('fill', 'red')
         .attr('rx',10)
         .attr('ry',10)
         .attr('opacity', 0.25)


  console.log('Data read in:', datapoints)

//   ticks_x.forEach(draw)
  ticks_y.forEach(draw_2)


  svg
    .append('line') // attach a line
    .attr('id', 'line_100')
    .style('stroke', 'lightgrey') // colour the line
    .style('stroke-dasharray', '2, 2')
    .attr('stroke-width', 2)
    .attr('x1', xPositionScale(100)) // x position of the first end of the line
    .attr('y1', height) // y position of the first end of the line
    .attr('x2', xPositionScale(100)) // x position of the second end of the line
    .attr('y2', 0)

    svg
    .append('line') // attach a line
    .attr('id', 'line_50')
    .style('stroke', 'lightgrey') // colour the line
    .style('stroke-dasharray', '2, 2')
    .attr('stroke-width', 2)
    .attr('x1', xPositionScale(200)) // x position of the first end of the line
    .attr('y1', height) // y position of the first end of the line
    .attr('x2', xPositionScale(200)) // x position of the second end of the line
    .attr('y2', 0)

    // svg
    // .append('line') // attach a line
    // .attr('id', 'line_300')
    // .style('stroke', 'lightgrey') // colour the line
    // .style('stroke-dasharray', '2, 2')
    // .attr('stroke-width', 2)
    // .attr('x1', xPositionScale(300)) // x position of the first end of the line
    // .attr('y1', height) // y position of the first end of the line
    // .attr('x2', xPositionScale(300)) // x position of the second end of the line
    // .attr('y2', 0)

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'n_homes')
    .attr('r', 5)
    .attr('cx', d => xPositionScale(d['Absentee_Received_Dems']))
    .attr('cy', d => yPositionScale( d['Turnout_Dems']))
    .attr('fill', 'darkblue')
    .attr('opacity', 0.25)
    .on('mouseover', function(d){
        tip.show.call(this, d)

        d3.select(this).attr('stroke', 'black')
    })
    .on('mouseout', function(d){
        d3.select(this).attr('stroke', 'none')
        tip.hide})
    .style("display", function(d) { return d['Turnout_Dems'] == 0 ? "none" : null; })

    d3.select('#toggle').on('click', () => {

        svg.selectAll('.n_homes')
        .transition()
        .duration(2500)
        .attr('r', 5)        
        .attr('cx', d => xPositionScale(d['Absentee_Received_Dems']))
        .attr('cy', d => yPositionScale( d['Turnout_Dems']))
        .attr('fill', 'darkblue')
        .style("display", function(d) { return d['Turnout_Dems'] == 0 ? "none" : null; })

    })


    d3.select('#toggle2').on('click', () => {
        svg.selectAll('.n_homes')
        .attr('r', 5)
        .transition()
        .duration(2500)
        .attr('cx', d => xPositionScale(d['Absentee_Received_Rep']))
        .attr('cy', d => yPositionScale( d['Turnout_Rep']))
        .attr('fill', 'red')
        .style("display", function(d) { return d['Turnout_Rep'] == 0 ? "none" : null; })


    })

   
  svg
    .append('text')
    .attr('id', 'x_label')
    .text('Absentee Ballots')
    .style('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('dy', height+35)
    .attr('font-size', '14px')
    .attr('font-weight', 5)

  svg
    .append('text')
    .text('Turnout')
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
        xPositionScale2.range([0,0.4*newWidth-25])

      svg.select('#my_line1')
        .attr("x2",   function(d) { return xPositionScale2(43.1)} )
        .attr("x1", function(d) { return xPositionScale2(28.53) })


      svg.select('#my_line2')
      .attr("x2",   function(d) { return xPositionScale2(47.2)} )
      .attr("x1", function(d) { return xPositionScale2(20.09) })

        svg.select('#dot_plot1').attr('cx', xPositionScale2(43.1))
        svg.select('#dot_plot2').attr('cx', xPositionScale2(28.53))
        svg.select('#dot_plot3').attr('cx', xPositionScale2(47.2))
        svg.select('#dot_plot4').attr('cy',-60).attr('cx', xPositionScale2(20.09))

        svg.select('#dot_plot2_text').attr('x', xPositionScale2(47.2)+7).attr('font-size', '10px').attr('font-weight', 5)
        svg.select('#dot_plot1_text').attr('x', xPositionScale2(43.1)+7).attr('font-size', '10px').attr('font-weight', 5)

        svg.select('.sub').attr('x',0.4*newWidth+55 )

        svg.selectAll('.label').attr("x",2*0.4*newWidth+30)

        svg.select('.bar_2_state_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
        svg.select('.bar_2_town_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
        svg.select('.bar_2_state').attr("x", 0.4*newWidth+60).attr('width', (41/100)*0.4*newWidth)
        svg.select('.bar_2').attr("x", 0.4*newWidth+60).attr('width', (62/100)*0.4*newWidth)

        svg.selectAll('.n_homes').attr('cx', d => xPositionScale(d['Absentee_Received_Dems']))
        svg.selectAll('.y_lines').attr('x1', newWidth) // x position of the first end of the line
        svg.select('y-axis').attr('x',-50)
       
        svg.select('#line_100')
        .attr('x1', xPositionScale(100)) // x position of the first end of the line
       .attr('x2', xPositionScale(100)) // x position of the second end of the line

        svg.select('#line_50')
        .attr('x1', xPositionScale(50)) // x position of the first end of the line
       .attr('x2', xPositionScale(50))
    //     svg.select('#line_300')
    //     .attr('x1', xPositionScale(300)) // x position of the first end of the line
    //    .attr('x2', xPositionScale(300))

        svg.select('#x_label').attr('x', newWidth/2)

       xAxis = d3.axisBottom(xPositionScale).ticks(4)
       svg.select('.x-axis').call(xAxis)



       if (newWidth < 200){
        console.log(newWidth)

        svg.select('.graph_name').attr('x', -5)


        

       }
      

    }
    window.addEventListener('resize', render)

    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render()
}
