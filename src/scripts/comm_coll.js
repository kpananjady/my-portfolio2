import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 100, left: 50, right: 50, bottom: 50 }
const height = 550 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right


const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


  function get_colors(n) {
    var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c",
    "#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6",
    "#6a3d9a"];
    
     return colors[ n % colors.length];}


  d3.csv(require('../data/enrollment_cc.csv')).then(ready)

  const tip = d3
  .tip()
  .attr('class', 'd3-tip')
  .offset([-20, 0])
  .html(function(d) {
    return `${d['Difference']}k`
  })

  svg.call(tip)

  const yPositionScale = d3.scaleLinear()
  .range([height,0 ])
  .domain([0,60000])


  const xPositionScale = d3.scaleLinear()
  .range([0,width ])
  .domain([2010,2020])

  function ready(datapoints) {


    const line1 = d3
    .line()
    .x(function(d) {
      return xPositionScale(d['Year'])
    })
    .y(function(d) {
      return yPositionScale(d['total'])
    })


    svg.append("path")
    .datum(datapoints)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", function(d) {
        return line1(d)
    }
      )

      const line2 = d3
      .line()
      .x(function(d) {
        return xPositionScale(d['Year'])
      })
      .y(function(d) {
        return yPositionScale(d['White total'])
      })

      svg.append("path")
      .datum(datapoints)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", function(d) {
          return line2(d)
      }
        )

      svg.selectAll('my_circle')
    .data(datapoints)
    .enter()
    .append("circle")
    .attr("fill", "steelblue")
    .attr('r', 5)
    .attr('cx', function(d){
        return xPositionScale(d.Year)
     
    })
    .attr('cy',function(d,i){
        return yPositionScale(d.total)
    
    })

    

  }