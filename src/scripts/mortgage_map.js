import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 0, right: 400, bottom: 50 }

let height = 500 - margin.top - margin.bottom
let width = 1000 - margin.left - margin.right


let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')




const colorScale = d3.scaleSequential(d3.interpolateOranges).domain([0, 15])

Promise.all([
  d3.json(require('/data/us_states.topojson')),
  d3.csv(require('/data/States_and_Delinquencies.csv'))
]).then(ready)
.catch(err => console.log('Failed on', err))

function ready([json, mortgages]) {

    svg.append('rect').attr('id', 'box0').attr('width', 25).attr('height', 5).attr('x',width-175).attr('y', height).attr('fill', colorScale(0)).attr('opacity',0.7)
    svg.append('rect').attr('id', 'box1').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', height).attr('fill', colorScale(1)).attr('opacity',0.7)
    svg.append('rect').attr('id', 'box2').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', height).attr('fill', colorScale(2)).attr('opacity',0.7)
    svg.append('rect').attr('id', 'box3').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', height).attr('fill', colorScale(4)).attr('opacity',0.7)
    svg.append('rect').attr('id', 'box4').attr('width', 25).attr('height', 5).attr('x',width-75).attr('y', height).attr('fill', colorScale(5)).attr('opacity',0.7)

    const states = topojson.feature(json, json.objects.us_states)
    console.log(states, 'states')

    var projection = d3.geoAlbersUsa()
          .scale(700).fitSize([width, height], states)
  
          const path = d3.geoPath().projection(projection)

    var color_var = 0

          svg
          .selectAll('path')
          .data(states.features)
          .enter()
          .append('path')
          .attr('class', 'state')
          .attr('d', path)
          .attr('stroke','white')
          .attr('stroke-width',0.5)
          .attr('fill', function(d){
            var color_var = 0
            mortgages.forEach(function(r){if (r.State===d.properties.postal){
                color_var =  colorScale(+r['Del%'])
                console.log(colorScale(+r['Del%']))
            }
        })
        return color_var

          })
        //   //.lower()
        //   function render() {
        //     const svgContainer = svg.node().closest('div')
        //     const svgWidth = svgContainer.offsetWidth
        //     // Do you want it to be full height? Pick one of the two below
        //     const svgHeight = height + margin.top + margin.bottom
        //     // const svgHeight = window.innerHeight
        
        //     const actualSvg = d3.select(svg.node().closest('svg'))
        //     actualSvg.attr('width', svgWidth).attr('height', svgHeight)
        
        //     const newWidth = svgWidth - margin.left - margin.right
        //     const newHeight = svgHeight - margin.top - margin.bottom

        //     // projection
        //     // .scale(700).fitSize([newWidth, newHeight], states)
    
        //     // path = d3.geoPath().projection(projection)

        //     // svg.selectAll('.state').attr('d', path)

        //     svg.select('#box0').attr('x', newWidth-175)
        //     svg.select('#box1').attr('x', newWidth-150)
        //     svg.select('#box2').attr('x', newWidth-125)
        //     svg.select('#box3').attr('x', newWidth-100)
        //     svg.select('#box4').attr('x', newWidth-75)
        // }
        // window.addEventListener('resize', render)
    
        // // And now that the page has loaded, let's just try
        // // to do it once before the page has resized
        // render()
        

}
