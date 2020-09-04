import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 130, left: 100, right: 150, bottom: 50 }
const height = 650 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

//tier one

svg.append('text').text('835,000 people have applied for unemployment benefits').attr('alignment-baseline', 'middle').attr('y',-105).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)
svg.append('text').text('since the start of the pandemic.').attr('alignment-baseline', 'middle').attr('y',-85).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)

svg.append('text').text("If you were one of them on August 15, here's the backlog you'd face.").attr('alignment-baseline', 'middle').attr('y',-55).attr('font-size', '15px').attr('font-weight', 5).attr('x', 0)

svg.append('text').text('0').attr('alignment-baseline', 'middle').attr('y',-35).attr('font-size', '20px').attr('font-weight', 5).attr('x', -85).attr('class', 'wait').attr('fill', 'blue').attr('opacity', 0.5)
svg.append('text').text('Weeks').attr('alignment-baseline', 'middle').attr('y',-15).attr('font-size', '20px').attr('font-weight', 5).attr('x', -90).attr('class', 'wait2')


svg.append('text').text("The Dept of Labor processes your claim.").attr('alignment-baseline', 'middle').attr('y',height/5-30).attr('font-size', '12px').attr('font-weight', 5).attr('x', 45)
svg.append('text').text("After your employer is given 5-7 days to respond, the agency looks at your application.").attr('alignment-baseline', 'middle').attr('y',height/5-15).attr('font-size', '10px').attr('font-weight', 5).attr('x', 45)

svg.append('text').text("If they decide you need a hearing, you need to wait for a date.").attr('alignment-baseline', 'middle').attr('y',2*height/5-30).attr('font-size', '12px').attr('font-weight', 5).attr('x', 45)
svg.append('text').text("The agency may determine that it needs more information to see if you qualify.").attr('alignment-baseline', 'middle').attr('y',2*height/5-15).attr('font-size', '10px').attr('font-weight', 5).attr('x', 45)

svg.append('text').text("You receive your decision 5-7 days after your hearing.").attr('alignment-baseline', 'middle').attr('y',3*height/5-30).attr('font-size', '12px').attr('font-weight', 5).attr('x', 45)
svg.append('text').text("It is unclear how many people are approved within the state.").attr('alignment-baseline', 'middle').attr('y',3*height/5-15).attr('font-size', '10px').attr('font-weight', 5).attr('x', 45)


svg.append('text').text("Appealing to the Referee Section").attr('alignment-baseline', 'middle').attr('y',4*height/5-30).attr('font-size', '12px').attr('font-weight', 5).attr('x', 45)
svg.append('text').text("If you want to appeal the decision, you appear before the referee section").attr('alignment-baseline', 'middle').attr('y',4*height/5-15).attr('font-size', '10px').attr('font-weight', 5).attr('x', 45)

svg.append('text').text("Appealing to the Board of Review").attr('alignment-baseline', 'middle').attr('y',height-30).attr('font-size', '12px').attr('font-weight', 5).attr('x', 45)
svg.append('text').text("Otherwise, you appear before the Board of Appeals.").attr('alignment-baseline', 'middle').attr('y',height-15).attr('font-size', '10px').attr('font-weight', 5).attr('x', 45)

function draw(width_var, radius_1, radius_2){
var i;
for (i = 0; i < (width_var)/(0.5+radius_1*2); i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', -30)
    .attr('cx', 5*i)
    .attr('r', radius_1)
    .attr('opacity', '0.5')

}

var i;
for (i = 0; i < (width_var)/(0.5+radius_1*2); i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', -20)
    .attr('cx', 5*i)
    .attr('r', radius_1)
    .attr('opacity', '0.5')

}

var i;
for (i = 0; i < (width_var)/(0.5+radius_1*2); i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', -10)
    .attr('cx', 5*i)
    .attr('r', radius_1)
    .attr('opacity', '0.5')

}

  var i;
    for (i = 0; i < (width_var)/(0.5+radius_1*2); i++) {
        svg
        .append('circle')
        .attr('class', 'bubble')
        .attr('cy', 0)
        .attr('cx', 5*i)
        .attr('r', radius_1)
        .attr('opacity', '0.5')

}

var i;
for (i = 0; i < (width_var)/(0.5+radius_1*2); i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 10)
    .attr('cx', 5*i)
    .attr('r', radius_1)
    .attr('opacity', '0.5')

}

var i;
for (i = 0; i < (width_var)/(0.5+radius_1*2); i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 20)
    .attr('cx', 5*i)
    .attr('r', 2)
    .attr('opacity', '0.5')

}


//tier two

var balls_needed= 42;

if (balls_needed < width_var/(radius_2*2)){
    var i;
    for (i = 0; i < 42; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', height/5)
    .attr('cx', 50+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')

    }
}
//tier three

var balls_needed = 100;
console.log(width_var/(radius_2*2))
var rows = balls_needed/(width_var/(radius_2*2));

var i;
for (i = 0; i < width_var/(radius_2*2); i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 2*height/5)
    .attr('cx', 50+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')


}

var i;
for (i = 0; i < width_var/(radius_2*2); i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 2*height/5+10)
    .attr('cx', 50+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')


}

var i;
for (i = 0; i < 10; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 2*height/5+20)
    .attr('cx', 50+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')


}

//tier four
var i;
for (i = 0; i <  width_var/(radius_2*2); i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 3*height/5)
    .attr('cx', 50+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')
    .attr('fill', 'white')
    .attr('stroke', 'grey')

}

//tier five
var i;
for (i = 0; i < 22; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 4*height/5)
    .attr('cx', 50+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')

}

//tier 6
var i;
for (i = 0; i < 2; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', height)
    .attr('cx', 50+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')


    }

}

draw(width, 2,5)

  d3.select('#toggle').on('click', () => {

    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 0)
    .attr('cx', 0)
    .attr('r', 2)
    .attr('opacity', '0.5')
    .transition()
    .duration(1000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', height/5)
    .attr('cx', 0)
    .attr('fill', 'blue')
    .transition()
    .duration(3000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', 2*height/5)
    .attr('cx', 0)
    .attr('fill', 'blue')
    .transition()
    .duration(12000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', 3*height/5)
    .attr('cx', 0)
    .attr('fill', 'blue')
    .transition()
    .duration(10000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', 4*height/5)
    .attr('cx', 0)
    .attr('fill', 'blue')
    .transition()
    .duration(6000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', height)
    .attr('cx', 0)
    .attr('fill', 'blue')


    svg.select('.wait')
    .transition()
    .duration(1000)
    .ease(d3.easeBounce)
    .text('1')
    .attr('y', height/5)
    .transition()
    .duration(3000)
    .ease(d3.easeBounce)

    .text('3')
    .attr('y',2* height/5)

    .transition()
    .duration(12000)
    .ease(d3.easeBounce)


    .text('11')
    .attr('y', 3*height/5)

    .transition()
    .duration(10000)
    .ease(d3.easeBounce)

    .text('21')
    .attr('y',4* height/5)

    .transition()
    .duration(6000)
    .ease(d3.easeBounce)

    .text('27')
    .attr('y', height)

      })