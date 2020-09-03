import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 130, left: 100, right: 50, bottom: 50 }
const height = 500 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

//tier one

svg.append('text').text('850,000 people have applied for unemployment benefits').attr('alignment-baseline', 'middle').attr('y',-105).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)
svg.append('text').text('since the start of the pandemic.').attr('alignment-baseline', 'middle').attr('y',-85).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)

svg.append('text').text("If you were one of them on August 15, this is what you'd have to look forward to.").attr('alignment-baseline', 'middle').attr('y',-55).attr('font-size', '15px').attr('font-weight', 5).attr('x', 0)

svg.append('text').text('0').attr('alignment-baseline', 'middle').attr('y',-35).attr('font-size', '20px').attr('font-weight', 5).attr('x', -90).attr('class', 'wait')
svg.append('text').text('Weeks').attr('alignment-baseline', 'middle').attr('y',-15).attr('font-size', '20px').attr('font-weight', 5).attr('x', -90)


svg.append('text').text("Claims Processing").attr('alignment-baseline', 'middle').attr('y',height/5).attr('font-size', '10px').attr('font-weight', 5).attr('x', -90)
svg.append('text').text("Adjudications").attr('alignment-baseline', 'middle').attr('y',2*height/5).attr('font-size', '10px').attr('font-weight', 5).attr('x', -90)
svg.append('text').text("Referee Section").attr('alignment-baseline', 'middle').attr('y',3*height/5).attr('font-size', '10px').attr('font-weight', 5).attr('x', -90)
svg.append('text').text("Board of Review").attr('alignment-baseline', 'middle').attr('y',4*height/5).attr('font-size', '10px').attr('font-weight', 5).attr('x', -90)


var i;
for (i = 0; i < 60; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', -30)
    .attr('cx', 10*i)
    .attr('r', 5)
    .attr('opacity', '0.5')

}

var i;
for (i = 0; i < 60; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', -20)
    .attr('cx', 10*i)
    .attr('r', 5)
    .attr('opacity', '0.5')

}

var i;
for (i = 0; i < 60; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', -10)
    .attr('cx', 10*i)
    .attr('r', 5)
    .attr('opacity', '0.5')

}

  var i;
    for (i = 0; i < 60; i++) {
        svg
        .append('circle')
        .attr('class', 'bubble')
        .attr('cy', 0)
        .attr('cx', 10*i)
        .attr('r', 5)
        .attr('opacity', '0.5')

}


//tier two
var i;
for (i = 0; i < 20; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', height/5)
    .attr('cx', 50+10*i)
    .attr('r', 5)
    .attr('opacity', '0.5')

}

//tier three
var i;
for (i = 0; i < 20; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 2*height/5)
    .attr('cx', 50+10*i)
    .attr('r', 5)
    .attr('opacity', '0.5')

}

//tier four
var i;
for (i = 0; i < 20; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 3*height/5)
    .attr('cx', 50+10*i)
    .attr('r', 5)
    .attr('opacity', '0.5')

}

//tier five
var i;
for (i = 0; i < 20; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 4*height/5)
    .attr('cx', 50+10*i)
    .attr('r', 5)
    .attr('opacity', '0.5')

}

//tier 6
var i;
for (i = 0; i < 20; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', height)
    .attr('cx', 50+10*i)
    .attr('r', 5)
    .attr('opacity', '0.5')

}

  d3.select('#toggle').on('click', () => {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 0)
    .attr('cx', 0)
    .attr('r', 5)
    .attr('opacity', '0.5')
    .transition()
    .duration(1000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', height/5)
    .attr('cx', 0)
    .attr('fill', 'blue')
    .transition()
    .duration(1000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', 2*height/5)
    .attr('cx', 0)
    .attr('fill', 'blue')
    .transition()
    .duration(2000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', 3*height/5)
    .attr('cx', 0)
    .attr('fill', 'blue')
    .transition()
    .duration(2000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', 4*height/5)
    .attr('cx', 0)
    .attr('fill', 'blue')
    .transition()
    .duration(2000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', height)
    .attr('cx', 0)
    .attr('fill', 'blue')


    svg.select('.wait')
    .text('1')
    .transition()
    .duration(1000)
    .text('1')
    .transition()
    .duration(1000)
    .text('3-4')
    .transition()
    .duration(2000)
    .text('10-12')
    .transition()
    .duration(2000)
    .text('& More')
    .transition()
    .duration(2000)
      })