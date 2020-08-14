import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 120, left: 100, right: 50, bottom: 50 }
const height = 500 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


  var xPositionScale = d3.scaleBand()
  .domain(['Less than $20K','$20K to < $50K','$50K to <$100K','$100K or higher'])
  .range([0,width])
    .padding(0)

    const yPositionScale = d3
    .scaleLinear()
    .domain([0,2000])
    .range([height, 0])

    d3.csv(require('/data/hist_data_2.csv')).then(ready)


    function ready(datapoints)
{

    svg.append('text').attr('class', 'town_name').text('Ocasio’s bond was among the lowest among pre-trail detainees').attr('alignment-baseline', 'middle').attr('y',-100).attr('font-size', '20px').attr('font-weight', 5)


    svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'rect_grey')
    .attr('width', xPositionScale.bandwidth())
    .attr('height', d => {
      return height - yPositionScale(d['People%'])
    })
    .attr('x', d => {
        console.log(xPositionScale(d['Bond Amount']))
      return xPositionScale(d['Bond Amount'])
    })
    .attr('y', d => {
      return yPositionScale(d['People%'])
    })
    .attr('fill', 'lightgrey')
    .attr('opacity',1)

    const yAxis = d3
    .axisLeft(yPositionScale)
    .tickSize(-width)
    .ticks(5)



    svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
    .lower()

    d3.select('.y-axis .domain').remove()

    svg.append('text').text('<$20k').attr('id', 'one').attr('y', height+10).attr('x',xPositionScale('Less than $20K')+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    svg.append('text').text('20k-50k').attr('id', 'two').attr('y', height+10).attr('x',xPositionScale(['$20K to < $50K'])+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    svg.append('text').text('50k-100k').attr('id', 'three').attr('y', height+10).attr('x',xPositionScale('$50K to <$100K')+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    svg.append('text').text('>100k').attr('id', 'four').attr('y', height+10).attr('x',xPositionScale('$100K or higher')+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    
    
    svg.append('text').text('Bond amounts').attr('id','label').attr('y', height+40).attr('x',width/2).attr('font-weight', 5).attr('font-size', 10)

    svg.append('text').text('Pre-trial').attr('y', height/2-20).attr('x',-90).attr('font-weight', 5).attr('font-size', 10)

    svg.append('text').text('Detainees').attr('y', height/2).attr('x',-90).attr('font-weight', 5).attr('font-size', 10)

    function render() {
        const svgContainer = svg.node().closest('div')
        const svgWidth = svgContainer.offsetWidth
        // Do you want it to be full height? Pick one of the two below
        const svgHeight = height + margin.top + margin.bottom
        // const svgHeight = window.innerHeight
    
        const actualSvg = d3.select(svg.node().closest('svg'))
        actualSvg.attr('width', svgWidth).attr('height', svgHeight)
    
        const newWidth = svgWidth - margin.left - margin.right
        // const newHeight = svgHeight - margin.top - margin.bottom
    
        // Update our scale
        xPositionScale.range([0, newWidth])
        // yPositionScale.range([newHeight, 0])
    
        // Update things you draw
    
        // Update axes
        //  svg.select('.x-axis').call(xAxis)
        svg
          .select('.y-axis')
          .transition()
          .call(yAxis)

          svg
          .selectAll('.rect_race')
          .attr('width', xPositionScale.bandwidth())
          .attr('x', d => {
              return xPositionScale(d['Bond Amount'])
            })
    
        svg
          .selectAll('.rect_grey')
          .attr('width', xPositionScale.bandwidth())
          .attr('height', d => {
            return height - yPositionScale(d['People'])
          })
          .attr('x', d => {
            return xPositionScale(d['Bond Amount'])
          })
          .attr('y', d => {
            return yPositionScale(d['People'])
          })
          .attr('fill', 'lightgrey')
         

        d3.select('.y-axis .domain').remove()


        d3.select('#one').attr('x',xPositionScale('Less than $20K')+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
        d3.select('#two').attr('x',xPositionScale(['$20K to < $50K'])+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
        d3.select('#three').attr('x',xPositionScale('$50K to <$100K')+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
        d3.select('#four').attr('x',xPositionScale('$100K or higher')+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
       
        d3.select('#label').attr('x', newWidth/2-20)
      }
    
      // When the window resizes, run the function
      // that redraws everything
      window.addEventListener('resize', render)
    
      // And now that the page has loaded, let's just try
      // to do it once before the page has resized
      render()
}  