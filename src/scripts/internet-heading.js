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

  d3.csv(require('../data/NH.csv')).then(ready)

  function ready(dummydata) {

    svg.append('text').attr('class', 'title').text('See how internet access compares in your town').attr('alignment-baseline', 'middle').attr('y',65).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)
    svg.append('text').attr('class', 'sub-title').text('How many households in every 1,000 have good connections').attr('alignment-baseline', 'middle').attr('y',95).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)


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

        if (newWidth > 500) {

            svg.selectAll('.title').attr('font-size', '20px')
            svg.selectAll('.sub-title').attr('font-size', '15px')
        
  
          } else if (newWidth > 450){
  
            svg.selectAll('.title').attr('font-size', '16px')
            svg.selectAll('.sub-title').attr('font-size', '11px')
         

          }
          
          else if (newWidth > 250) {

            svg.selectAll('.title').attr('font-size', '15px')
            svg.selectAll('.sub-title').attr('font-size', '10px')

          }
          
          
          else {
         
            svg.selectAll('.title').attr('font-size', '15px')
            svg.selectAll('.sub-title').attr('font-size', '10px')

          }  

    }
    window.addEventListener('resize', render)

    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render()
  }