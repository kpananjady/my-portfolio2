import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 50 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([30,100])
const colorScale1 = d3.scaleSequential(d3.interpolateOranges).domain([0, 100])

const colorScale2 =  d3.scaleSequential(d3.interpolateBlues).domain([0, 1000000])


let svg = d3
  .select('#chart-3')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  const projection = d3.geoMercator()
  .scale(width*17)
            .center([-72.68, 41.5])
            .translate([(width) / 2, (height)/2]);

Promise.all([
    d3.json(require('/data/ct_towns_simplified.topojson')),
    d3.json(require('/data/tracts_ct.topojson')),
    d3.csv(require('/data/tract_map_dec_2017.csv')),
    d3.csv(require('/data/income_acs.csv')),
    d3.csv(require('/data/race_acs.csv')),
    d3.csv(require('/data/income_acs_2.csv')),


  ]).then(ready)
  .catch(err => console.log('Failed on', err))


  function ready([json2, json, internet, income, race, income2]) {

    svg.append('text').attr('id', 'box1-text').text('30%').attr('x',width-220).attr('y', height-10).attr('font-size', 10)
    svg.append('text').attr('id', 'box4-text').text('100%').attr('x',width-95).attr('y', height-10).attr('font-size', 10)

    svg.append('rect').attr('id', 'box0').attr('width', 25).attr('height', 5).attr('x',width-175).attr('y', height-10).attr('fill', colorScale(30)).attr('opacity',0.7)
    svg.append('rect').attr('id', 'box1').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', height-10).attr('fill', colorScale(45)).attr('opacity',0.7)
    svg.append('rect').attr('id', 'box2').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', height-10).attr('fill', colorScale(60)).attr('opacity',0.7)
   
    svg.append('rect').attr('id', 'box3').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', height-10).attr('fill', colorScale(75)).attr('opacity',0.7)
    svg.append('rect').attr('id', 'box4').attr('width', 25).attr('height', 5).attr('x',width-75).attr('y', height-10).attr('fill', colorScale(100)).attr('opacity',0.7)

    svg.append('rect').attr('id', 'box0-m').attr('width', 25).attr('height', 5).attr('x',width-175).attr('y', height-10).style('fill', 'white').attr('opacity',0.3)
    svg.append('rect').attr('id', 'box1-m').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', height-10).style('fill', 'white').attr('opacity',0.3)
    svg.append('rect').attr('id', 'box2-m').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', height-10).style('fill', 'white').attr('opacity',0.3)
    svg.append('rect').attr('id', 'box3-m').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', height-10).style('fill', 'white').attr('opacity',0.3)
    svg.append('rect').attr('id', 'box4-m').attr('width', 25).attr('height', 5).attr('x',width-75).attr('y', height-10).style('fill', 'white').attr('opacity',0.3)

    d3.select('#toggle').on('click', () => {
        //income
        svg.select('#box0').attr('fill', colorScale(0)).attr('opacity',0.7)
        svg.select('#box1').attr('fill', colorScale(0)).attr('opacity',0.7)
        svg.select('#box2').attr('fill', colorScale(0)).attr('opacity',0.7)
        svg.select('#box3').attr('fill', colorScale(0)).attr('opacity',0.7)
        svg.select('#box4').attr('fill', colorScale(0)).attr('opacity',0.7)
       })

    d3.select('#toggle2').on('click.blahblah2', () => {
        //race
        svg.select('#box0').attr('fill', colorScale(0)).attr('opacity',0.7)
        svg.select('#box1').attr('fill', colorScale(0)).attr('opacity',0.7)
        svg.select('#box2').attr('fill', colorScale(0)).attr('opacity',0.7)
        svg.select('#box3').attr('fill', colorScale(0)).attr('opacity',0.7)
        svg.select('#box4').attr('fill', colorScale(0)).attr('opacity',0.7)

    })
      
    d3.select('#toggle3').on('click', () => {

        svg.append('#box1-text').text('30%')
        svg.append('#box4-text').text('100%')

        svg.select('#box0').attr('fill', colorScale(30)).attr('opacity',0.7)
        svg.select('#box1').attr('fill', colorScale(45)).attr('opacity',0.7)
        svg.select('#box2').attr('fill', colorScale(60)).attr('opacity',0.7)
        svg.select('#box3').attr('fill', colorScale(75)).attr('opacity',0.7)
        svg.select('#box4').attr('fill', colorScale(100)).attr('opacity',0.7)
        //vaccination rate
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

                svg.select('#box1-text').text('30%').attr('x',newWidth-175).attr('y', height-10).attr('font-size', 10)
                svg.select('#box4-text').text('100%').attr('x',newWidth-75).attr('y', height-10).attr('font-size', 10)
        
                svg.select('#box0').attr('x', newWidth-175)
                svg.select('#box1').attr('x', newWidth-150)
                svg.select('#box2').attr('x', newWidth-125)
                svg.select('#box3').attr('x', newWidth-100)
                svg.select('#box4').attr('x', newWidth-75)
        
                svg.select('#box0-m').attr('x', newWidth-175)
                svg.select('#box1-m').attr('x', newWidth-150)
                svg.select('#box2-m').attr('x', newWidth-125)
                svg.select('#box3-m').attr('x', newWidth-100)
                svg.select('#box4-m').attr('x', newWidth-75)

            }
        window.addEventListener('resize', render)

// And now that the page has loaded, let's just try
// to do it once before the page has resized
    render()
}