import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 130, left: 100, right: 150, bottom: 100 }
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

svg.append('text').text('835,000 people have applied for unemployment benefits').attr('alignment-baseline', 'middle').attr('y',-105).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0).attr('class', 'title').attr('id', 'hed')
svg.append('text').text('since the start of the pandemic.').attr('alignment-baseline', 'middle').attr('y',-85).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0).attr('class', 'title').attr('id', 'hed')

svg.append('text').text("We don't know how many have been approved. But some 26,000 were ").attr('alignment-baseline', 'middle').attr('y',-45).attr('font-size', '15px').attr('font-weight', 5).attr('x', 0).attr('class', 'title').attr('id', 'subhed')
svg.append('text').text("waiting in various steps of the process in mid-August.").attr('alignment-baseline', 'middle').attr('y',-25).attr('font-size', '15px').attr('font-weight', 5).attr('x', 0).attr('class', 'title').attr('id', 'subhed')


svg.append('text').text("If you applied last month, here's the backlog you'd face.").attr('alignment-baseline', 'middle').attr('y',10).attr('font-size', '15px').attr('font-weight', 5).attr('x', 0).attr('id', 'subhed')

svg.append('text').text('0').attr('alignment-baseline', 'middle').attr('y',0).attr('font-size', '20px').attr('font-weight', 5).attr('x', -75).attr('class', 'wait').attr('fill', '#072F5F').attr('opacity', 0.5)
svg.append('text').text('Weeks').attr('alignment-baseline', 'middle').attr('y',20).attr('font-size', '20px').attr('font-weight', 5).attr('x', -80).attr('class', 'wait2')


svg.append('text').text("The Dept of Labor processes your claim.").attr('alignment-baseline', 'middle').attr('y',height/5-30).attr('font-size', '12px').attr('font-weight', 5).attr('x', 45).attr('class','steps step_name').attr('id','step_1')

svg.append('text').text("If they need more info, you'll need to wait for a hearing date.").attr('alignment-baseline', 'middle').attr('y',2*height/5-30).attr('font-size', '12px').attr('font-weight', 5).attr('x', 45).attr('x', 45).attr('class','steps step_name').attr('id','step_2')

svg.append('text').text("Appealing: Part 1").attr('alignment-baseline', 'middle').attr('y',3*height/5-30).attr('font-size', '12px').attr('font-weight', 5).attr('x', 45).attr('x', 45).attr('class','steps step_name').attr('id','step_3')

svg.append('text').text("Appealing: Part 2").attr('alignment-baseline', 'middle').attr('y',4*height/5-30).attr('font-size', '12px').attr('font-weight', 5).attr('x', 45).attr('x', 45).attr('class','steps step_name').attr('id','step_4')

svg.append('text').text("You receive your final decision.").attr('alignment-baseline', 'middle').attr('y',height-30).attr('font-size', '12px').attr('font-weight', 5).attr('x', 45).attr('x', 45).attr('class','steps step_name').attr('id','step_5')

// key

svg.append('text').text('160 applications').attr('alignment-baseline', 'middle').attr('y',height+30).attr('font-size', '10px').attr('font-weight', 5).attr('x', -75)
// svg.append('text').text('Unknown').attr('alignment-baseline', 'middle').attr('y',height+40).attr('font-size', '10px').attr('font-weight', 5).attr('x', -75)
svg.append('text').text('Your application').attr('alignment-baseline', 'middle').attr('y',height+50).attr('font-size', '10px').attr('font-weight', 5).attr('x', -75)
// svg.append('text').text('300 applications').attr('alignment-baseline', 'middle').attr('y',height+60).attr('font-size', '10px').attr('font-weight', 5).attr('x', -75)

svg.append('circle').attr('cy',height+30).attr('font-weight', 5).attr('cx', -85).attr('r', 5).attr('opacity', 0.5)    .attr('fill', '#c24e00')

// svg.append('circle').attr('cy',height+40).attr('font-weight', 5).attr('cx', -85).attr('r', 5).attr('opacity', 0.5).attr('fill', 'white').attr('stroke', 'grey')
svg.append('circle').attr('cy',height+50).attr('font-weight', 5).attr('cx', -85).attr('r', 5).attr('opacity', 0.5).attr('fill','#072F5F')
// svg.append('circle').attr('cy',height+60).attr('cx', -85).attr('r', 2).attr('opacity', 0.5)



function draw(width_var, radius_2, margin_var){


//tier two

var balls_needed= 41 ;

var capacity = width_var/(radius_2*2);

var rows = Math.ceil(balls_needed / capacity);
var row_last = balls_needed - (rows-1)*capacity


if (rows===1){
    var i;
    for (i = 0; i < balls_needed; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', height/5)
    .attr('cx', margin_var+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')
    .attr('fill', '#c24e00')
    }
 } else {

    var counter;
    for (counter = 0; counter < rows-1; counter++) {

        var i;
        for (i = 0; i < capacity; i++) {
        svg
        .append('circle')
        .attr('class', 'bubble')
        .attr('cy', height/5+(10*(counter)))
        .attr('cx', margin_var+radius_2*2*i)
        .attr('r', radius_2)
        .attr('opacity', '0.5')
        .attr('fill', '#c24e00')
        }
    }

    var i;
    for (i = 0; i < row_last; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', height/5+(10*(counter)))
    .attr('cx', margin_var+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')
    .attr('fill', '#c24e00')
    }
    
 }
//tier three

var balls_needed= 100 ;

var capacity = width_var/(radius_2*2);

var rows = Math.ceil(balls_needed / capacity);
var row_last = balls_needed - (rows-1)*capacity


console.log(rows, capacity, balls_needed, row_last)
// console.log(width_var/(radius_2*2))
var rows = balls_needed/(width_var/(radius_2*2));

if (rows===1){
    var i;
    for (i = 0; i < balls_needed; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 2*height/5)
    .attr('cx', margin_var+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')
    .attr('fill', '#c24e00')
    }
 } else {

    var counter;
    for (counter = 0; counter < rows-1; counter++) {

        var i;
        for (i = 0; i < capacity; i++) {
        svg
        .append('circle')
        .attr('class', 'bubble')
        .attr('cy', 2*height/5+(10*(counter)))
        .attr('cx', margin_var+radius_2*2*i)
        .attr('r', radius_2)
        .attr('opacity', '0.5')
        .attr('fill', '#c24e00')
        }
    }

    var i;
    for (i = 0; i < row_last; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 2*height/5+(10*(counter)))
    .attr('cx', margin_var+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')
    .attr('fill', '#c24e00')
    }
    
 }

//tier four
var i;
for (i = 0; i < 22; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 3*height/5)
    .attr('cx', margin_var+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')
    .attr('fill', '#072F5F')
    .attr('fill', '#c24e00')

}

//tier five
var i;
for (i = 0; i < 2; i++) {
    svg
    .append('circle')
    .attr('class', 'bubble')
    .attr('cy', 4*height/5)
    .attr('cx', margin_var+radius_2*2*i)
    .attr('r', radius_2)
    .attr('opacity', '0.5')
    .attr('fill', '#c24e00')

}

//tier 6
// var i;
// for (i = 0; i < 2; i++) {
//     svg
//     .append('circle')
//     .attr('class', 'bubble')
//     .attr('cy', height)
//     .attr('cx', margin_var+radius_2*2*i)
//     .attr('r', radius_2)
//     .attr('opacity', '0.5')
//     .attr('fill', '#c24e00')


//     }

}

draw(width, 5,50)

var radius = 5;

  d3.select('#toggle').on('click', () => {

    svg.select('.fall_ball').remove()

    svg
    .append('circle')
    .attr('class', 'fall_ball')
    .attr('cy', 0)
    .attr('cx', 0)
    .attr('r', 2)
    .attr('opacity', '0.5')
    .transition()
    .duration(1000)
    .ease(d3.easeElastic)
    .attr('r', radius)
    .attr('cy', height/5)
    .attr('cx', 0)
    .attr('stroke', '#072F5F')
    .attr('fill', '#072F5F')
    .transition()
    .duration(3000)
    .ease(d3.easeBounce)
    .attr('r', radius)
    .attr('cy', 2*height/5)
    .attr('cx', 0)
    .attr('stroke', '#072F5F')
 .transition()
    .duration(12000)
    .ease(d3.easeBounce)
    .attr('r', radius)
    .attr('cy', 3*height/5)
    .attr('cx', 0)
    .attr('stroke', '#072F5F')

    .transition()
    .duration(10000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', 4*height/5)
    .attr('cx', 0)
    .attr('stroke', '#072F5F')
    .attr('fill', '#072F5F')

    .transition()
    .duration(6000)
    .ease(d3.easeBounce)
    .attr('r', 5)
    .attr('cy', height-25)
    .attr('cx', 0)
    .attr('stroke', '#072F5F')
    .attr('fill', '#072F5F')



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
    .attr('y', height-25)

      })


      function render() {
        const svgContainer = svg.node().closest('div')
        const svgWidth = svgContainer.offsetWidth
        // Do you want it to be full height? Pick one of the two below
        const svgHeight = height + margin.top + margin.bottom
        // const svgHeight = window.innerHeight
    
        const actualSvg = d3.select(svg.node().closest('svg'))
        actualSvg.attr('width', svgWidth).attr('height', svgHeight)
    
        const newWidth = svgWidth - margin.left - margin.right
        const newHeight = svgHeight - margin.top - margin.bottom

        const width_purp = newWidth+ margin.right -50

        svg.selectAll('circle').remove()
        console.log(newWidth)
        svg.select('#step_1_sub').remove()
        svg.select('#step_2_sub').remove()
        svg.select('#step_3_sub').remove()
        svg.select('#step_4_sub').remove()
        svg.select('#step_5_sub').remove()

svg.append('text').text("After your employer is given 5-7 days to respond, the agency looks at your application.").attr('alignment-baseline', 'middle').attr('y',height/5-15).attr('font-size', '10px').attr('font-weight', 5).attr('x', 45).attr('x', 45).attr('class','steps').attr('id','step_1_sub')

svg.append('text').text("1 in 50 people who applied are stuck on the adjudication step of the process.").attr('alignment-baseline', 'middle').attr('y',2*height/5-15).attr('font-size', '10px').attr('font-weight', 5).attr('x', 45).attr('x', 45).attr('class','steps').attr('id','step_2_sub')

svg.append('text').text("The Appeals Division has two parts; the lower one is called the Referee Section.").attr('alignment-baseline', 'middle').attr('y',3*height/5-15).attr('font-size', '10px').attr('font-weight', 5).attr('x', 45).attr('x', 45).attr('class','steps').attr('id','step_3_sub')

svg.append('text').text("The Referee Section's decisions can be overturned by the Board of Review.").attr('alignment-baseline', 'middle').attr('y',4*height/5-15).attr('font-size', '10px').attr('font-weight', 5).attr('x', 45).attr('x', 45).attr('class','steps').attr('id','step_4_sub')

svg.append('text').text("If you have a hearing and go through the entire appeal process, it takes over 6 months.").attr('alignment-baseline', 'middle').attr('y',height-15).attr('font-size', '10px').attr('font-weight', 5).attr('x', 45).attr('x', 45).attr('class','steps').attr('id','step_5_sub')

        
        svg.append('circle').attr('cy',height+30).attr('font-weight', 5).attr('cx', -85).attr('r', 5).attr('opacity', 0.5)    .attr('fill', '#c24e00')
        
        // svg.append('circle').attr('cy',height+40).attr('font-weight', 5).attr('cx', -85).attr('r', 5).attr('opacity', 0.5).attr('fill', 'white').attr('stroke', 'grey')
        svg.append('circle').attr('cy',height+50).attr('font-weight', 5).attr('cx', -85).attr('r', 5).attr('opacity', 0.5).attr('fill','#072F5F')
        // svg.append('circle').attr('cy',height+60).attr('cx', -85).attr('r', 2).attr('opacity', 0.5)
        


        if (newWidth >  355) {
            draw(width, 5,50)
            svg.selectAll('#hed').attr('font-size', '20px')
            svg.selectAll('#subhed').attr('font-size', '15px')

  
          } else if (newWidth > 300){
  
            draw(width_purp, 5,30)

            svg.selectAll('.steps').attr('x', 30)
            svg.selectAll('.title').attr('x', 0)
            svg.selectAll('#hed').attr('font-size', '17px')
            svg.selectAll('#subhed').attr('font-size', '12px')
            radius = 5;

          }
          
          else if (newWidth > 250) {
            draw(width_purp, 5,20)

            svg.selectAll('.steps').attr('x', 20)
            svg.selectAll('.title').attr('x', -50)


            svg.selectAll('#hed').attr('font-size', '15px')
            svg.selectAll('#subhed').attr('font-size', '10px')
            svg.selectAll('.step_name').attr('font-size', '10px')
            radius = 5;


        
          }  else if (newWidth > 200) {
            draw(width_purp, 4,20)

            svg.selectAll('.steps').attr('x', 20)
            svg.selectAll('.title').attr('x', -50)
            svg.selectAll('#hed').attr('font-size', '15px')
            svg.selectAll('#subhed').attr('font-size', '10px')

            //

            svg.select('#step_1_sub').attr('font-size', '9px').text('This is after your employer is given 5-7 days to respond.')
            svg.select('#step_2_sub').attr('font-size', '9px')
            svg.select('#step_3_sub').attr('font-size', '9px')
            svg.select('#step_4_sub').attr('font-size', '9px')
            svg.select('#step_5_sub').remove()
            radius = 4;

        
          }
          
          
          else {
            draw(width_purp, 3,20)

            svg.selectAll('.steps').attr('x', 20)
            svg.selectAll('.title').attr('x', -100)
            svg.selectAll('#hed').attr('font-size', '15px')
            svg.selectAll('#subhed').attr('font-size', '10px')

            svg.selectAll('#hed').attr('font-size', '12px')
            svg.selectAll('#subhed').attr('font-size', '9px')


            svg.select('#step_1').attr('font-size', '10px')
            svg.select('#step_2').attr('font-size', '10px').text('Getting a hearing if they need more info.')
            svg.select('#step_3').attr('font-size', '10px')
            svg.select('#step_4').attr('font-size', '10px')
            svg.select('#step_5').attr('font-size', '10px')

            svg.select('#step_1_sub').remove()
            svg.select('#step_2_sub').remove()
            svg.select('#step_3_sub').remove()
            svg.select('#step_4_sub').remove()
            svg.select('#step_5_sub').remove()

            radius = 3;

          }
          

      }
        window.addEventListener('resize', render)

        // And now that the page has loaded, let's just try
        // to do it once before the page has resized
        render()