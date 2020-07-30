import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

var margin = { top: 100, left: 200, right: 50, bottom: 50 }
const height = 300 - margin.top - margin.bottom
const width = 900 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var div = d3.select(".g-chart").append("div")   
      .attr("class", "tooltip")               
      .style("opacity", 0);   

      const tip = d3
      .tip()
      .attr('class', 'd3-tip')
      .offset([-20, 35])
      .html(function(d) {
        return `${d['Fiscal Year']}`
      })
    
svg.call(tip)     

  var xPositionScale = d3.scaleLinear()
  .range([0, width]);

  var xAxis = d3.axisBottom()
  .scale(xPositionScale)
  .tickPadding(8)
  .ticks(8)
  .tickFormat(function(d) { return Math.round(d * 1/1000000) +'M'}) 


  d3.csv(require('../data/Inflation_adjusted.csv')).then(ready)

  function ready(datapoints) {


    svg.append('text').attr('class', 'title').text('There is an element of income tax that is highly volatile').attr('alignment-baseline', 'middle').attr('y',-70).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)
    svg.append('text').attr('class', 'sub-title').text('After adjusting for inflation, this is how capital gains — — ').attr('alignment-baseline', 'middle').attr('y',-30).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)
    svg.append('text').attr('class', 'sub-title').text('have varied over the past 15 years.').attr('alignment-baseline', 'middle').attr('y',-10).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)

    datapoints.forEach(function(d) {
    d['Inflation adj'] = +d['Inflation adj'];
  });
  var maxX = d3.max(datapoints, function(d) { return d['Inflation adj']; });

  

  xPositionScale.domain(d3.extent(datapoints, function(d) { return d['Inflation adj'] }));

  var xAxisGroup = svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);  


  var drawstrips = svg.selectAll("line.percent")
    .data(datapoints)
    .enter()
    .append("line")
    .attr("class", "percentline")
    .attr("x1", function(d,i) { return xPositionScale(d['Inflation adj'] ); }) 
    .attr("x2", function(d) { return xPositionScale(d['Inflation adj'] ); })  
    .attr("y1", 50)
    .attr("y2", 100)
    .style("stroke", "#cc0000")
    .style("stroke-width", 2)
    .on("mouseover", 
    function(d) {
      d3.select(this)
        .transition().duration(100)
        .attr("y1", 0)
        .style("stroke-width", 3)
        .style("opacity", 1);
    tip.show.call(this, d)

      
    }
    )
    .on("mouseout", function(d) {
      d3.select(this)
        .transition().duration(100)
        .attr("y1", 50)
        .style("stroke-width", 2)
        .style("opacity", 0.4);

      tip.hide
    })    
    .style("opacity", 0)
    .transition()
    .duration(0)
    .delay(function(_, i) {
      return i * 300
    })
    .style("opacity",0.4)    
    

}