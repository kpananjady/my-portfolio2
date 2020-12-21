import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 0, left: 20, right: 20, bottom: 0 }

let height = 150 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

const colorScale = d3.scaleSequential(d3.interpolateOranges).domain([0, 5])

let svg = d3
  .select('#chart-0')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  ready()

  function ready(dummydata) {
    svg.append('text').attr('class', 'title').text('CT COVID Vaccine: State Estimates').attr('alignment-baseline', 'middle').attr('y',25).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)
    svg.append('text').attr('class', 'title').text('vs Federal Allocations').attr('alignment-baseline', 'middle').attr('y',50).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)
    svg.append('text').attr('class', 'sub-title').text("The blue bars represent the first doses that state expects to get and").attr('alignment-baseline', 'middle').attr('y',75).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)
    svg.append('text').attr('class', 'sub-title').text('the orange bars represent those allocated to Connecticut.').attr('alignment-baseline', 'middle').attr('y',95).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)

    svg.append('text').attr('class', 'sub-title').text('Pfizer').attr('alignment-baseline', 'middle').attr('y',125).attr('font-size', '10px').attr('font-weight', 5).attr('x', 0)
    svg.append('text').attr('class', 'sub-title').text('Moderna').attr('alignment-baseline', 'middle').attr('y',125).attr('font-size', '10px').attr('font-weight', 5).attr('x', 70)
    svg.append('text').attr('class', 'sub-title').text('Total Estimated').attr('alignment-baseline', 'middle').attr('y',125).attr('font-size', '10px').attr('font-weight', 5).attr('x', 165)

svg.append('circle').attr('cx',-10).attr('cy', 125).attr('r', 5).attr('fill','#DE3163')
svg.append('circle').attr('cx',60).attr('cy', 125).attr('r',5).attr('fill','#FFBF00')
svg.append('circle').attr('cx',155).attr('cy', 125).attr('r',5).attr('fill','#6495ED')


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

          console.log('here')
            svg.selectAll('.title').attr('font-size', '20px')
            svg.selectAll('.sub-title').attr('font-size', '15px')
        
  
          } else if (newWidth > 450){
  
            svg.selectAll('.title').attr('font-size', '15px')
            svg.selectAll('.sub-title').attr('font-size', '10px')
         

          }
          
          else if (newWidth > 250) {

            svg.selectAll('.title').attr('font-size', '12px')
            svg.selectAll('.sub-title').attr('font-size', '9px')

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