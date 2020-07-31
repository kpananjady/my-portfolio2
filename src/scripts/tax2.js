import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

var margin = { top: 300, left: 100, right: 50, bottom: 50 }
const height = 550 - margin.top - margin.bottom
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
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()  .range([height, 0])

  const line = d3
  .line()
  .x(function(d) {
    return xPositionScale(d['Fiscal Year'])
  })
  .y(function(d) {
    return yPositionScale(d['Inflation adj'])
  })

const radiusScale = d3
  .scaleSqrt()
  .domain([0, 120])
  .range([2, 15])

	const tip = d3
	.tip()
	.attr('class', 'd3-tip')
	.offset([-20, 35])
	.html(function(d) {
		return `${d['Fiscal Year']}`
	})

svg.call(tip)    


d3.csv(require('../data/Inflation_adjusted.csv')).then(ready)


function ready(datapoints) {

    xPositionScale.domain(d3.extent(datapoints, function(d) { return d['Fiscal Year'] }));
// yPositionScale.domain(d3.extent(datapoints, function(d) { return d['Inflation adj'] }));
yPositionScale.domain([0,4700000000])

svg.append('text').attr('class', 'graph_name').text('A Fiscal Rollercoaster').attr('alignment-baseline', 'middle').attr('y',-275).attr('x',0).attr('font-size', '25px').attr('font-weight', 5)

svg.append('text').attr('class', 'sub_name').text('Though most state income tax receipts come from paycheck withholding,').attr('alignment-baseline', 'middle').attr('y',-220).attr('x',0).attr('font-size', '20px').attr('font-weight', 5)
svg.append('text').attr('class', 'sub_name').text('about one-third come from quarterly filings tied heavily to capital gains').attr('alignment-baseline', 'middle').attr('y',-190).attr('x',0).attr('font-size', '20px').attr('font-weight', 5)
svg.append('text').attr('class', 'sub_name').text('and other investment earnings. One of the most volatile revenue sources, ').attr('alignment-baseline', 'middle').attr('y',-160).attr('x',0).attr('font-size', '20px').attr('font-weight', 5)
svg.append('text').attr('class', 'sub_name').text('these quarterly filings typically surge or plunge by double-digit percentages,').attr('alignment-baseline', 'middle').attr('y',-130).attr('x',0).attr('font-size', '20px').attr('font-weight', 5)
svg.append('text').attr('class', 'sub_name').text('but rarely remain flat.').attr('alignment-baseline', 'middle').attr('y',-100).attr('x',0).attr('font-size', '20px').attr('font-weight', 5)

// Though most state income tax receipts come from paycheck withholding, about one-third come from quarterly filings tied heavily to capital gains and other investment earnings. One of the most volatile revenue sources, these quarterly filings typically surge or plunge by double-digit percentages, but rarely remain flat.

	console.log('Data read in:', datapoints)
	
  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'revenue')
    .attr('r', 5)
    .attr('cx', d => xPositionScale(d['Fiscal Year']))
    .attr('cy', d => yPositionScale( d['Inflation adj']))
    .attr('fill', 'darkblue')
    .attr('opacity', 0.25)
    
    svg.append('path')
    .datum(datapoints)
    .attr('class', 'path_next')
    .attr('d', function(d) {
      return line(d)
    })
    .attr('stroke', 'darkblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('opacity',0.5)


  svg
    .append('text')
    .text('Revenue')
    .style('text-anchor', 'middle')
    .attr('x', 0)
    .attr('dy', height/2)
    .attr('dx', -40)
    .attr('font-size', '14px')
    .attr('font-weight', 5)

  const yAxis = d3.axisLeft(yPositionScale).ticks(4)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .attr('color', 'grey')

    .call(yAxis)

  var xAxis = d3.axisBottom(xPositionScale).ticks(15).tickFormat(d3.format("d"))
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('color', 'grey')
		.call(xAxis)
		.selectAll("text")	
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", function(d) {
				return "rotate(-35)" 
				});

	


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

        svg.selectAll('.revenue').attr('cx', d => xPositionScale(d['Fiscal Year']))
				svg.select('.path_next').attr('d', function(d) {
					return line(d)
				})
       
       xAxis = d3.axisBottom(xPositionScale).ticks(15).tickFormat(d3.format("d"))
			 svg.select('.x-axis').call(xAxis)
			 
			 svg.select('.graph_name').attr('font-size', '15px')
        svg.selectAll('.sub_name').attr('font-size', '10px')
		

       if (newWidth < 200){

        svg.select('.graph_name').attr('font-size', '20px')
        svg.selectAll('.sub_name').attr('font-size', '10px')

			

             
       
    }

    }
    window.addEventListener('resize', render)

    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render()
}
