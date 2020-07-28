import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 0, left: 20, right: 20, bottom: 0 }

let height = 150 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

let svg = d3
  .select('#chart-0')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


    svg.append('text').attr('class', 'title').text('See how internet access compares in your town').attr('alignment-baseline', 'middle').attr('y',65).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)
    svg.append('text').attr('class', 'sub-title').text('How many households in every 1,000 have good connections').attr('alignment-baseline', 'middle').attr('y',95).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)