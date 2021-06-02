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

  d3.csv(require('../data/NH.csv')).then(ready)

  function ready(dummydata) {
    svg.append('text').attr('class', 'title').text("Vaccination rates by Census tract for the 16+ population").attr('alignment-baseline', 'middle').attr('y',45).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)

//    svg.append('text').attr('class', 'title').text('See how internet access compares in your town').attr('alignment-baseline', 'middle').attr('y',45).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)
    // svg.append('text').attr('class', 'sub-title').text('Households per 1,000 with good connections for passive online learning:').attr('alignment-baseline', 'middle').attr('y',75).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)
    svg.append('text').attr('class', 'sub-title').text('Overlay vaccination rates for those 16+ in Connecticut with Census data on').attr('alignment-baseline', 'middle').attr('y',75).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)
    svg.append('text').attr('class', 'sub-title').text('income and race. Scroll with two fingers to zoom in on your town.').attr('alignment-baseline', 'middle').attr('y',95).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)


    d3.select('#toggle2').on('click.blahblah2', () => {
      console.log('the code is here')
      svg.select('.title').text("I'm changing the text by clicking on it!1")
      })
    
      d3.select('#toggle3').on('click', () => {

        console.log('the code is here')

        })
    // svg.append('text').attr('id', 'box1-text').text('0').attr('x',width-220).attr('y', 100).attr('font-size', 10)
    // svg.append('text').attr('id', 'box4-text').text('>800').attr('x',width-95).attr('y', 100).attr('font-size', 10)

    // svg.append('rect').attr('id', 'box0').attr('width', 25).attr('height', 5).attr('x',width-175).attr('y', 100).attr('fill', colorScale(0)).attr('opacity',0.7)
    // svg.append('rect').attr('id', 'box1').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', 100).attr('fill', colorScale(1)).attr('opacity',0.7)
    // svg.append('rect').attr('id', 'box2').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', 100).attr('fill', colorScale(2)).attr('opacity',0.7)
    // svg.append('rect').attr('id', 'box3').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', 100).attr('fill', colorScale(4)).attr('opacity',0.7)
    // svg.append('rect').attr('id', 'box4').attr('width', 25).attr('height', 5).attr('x',width-75).attr('y', 100).attr('fill', colorScale(5)).attr('opacity',0.7)

    // svg.append('rect').attr('id', 'box0-m').attr('width', 25).attr('height', 5).attr('x',width-175).attr('y', 100).style('fill', 'white').attr('opacity',0.4)
    // svg.append('rect').attr('id', 'box1-m').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', 100).style('fill', 'white').attr('opacity',0.4)
    // svg.append('rect').attr('id', 'box2-m').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', 100).style('fill', 'white').attr('opacity',0.4)
    // svg.append('rect').attr('id', 'box3-m').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', 100).style('fill', 'white').attr('opacity',0.4)
    // svg.append('rect').attr('id', 'box4-m').attr('width', 25).attr('height', 5).attr('x',width-75).attr('y', 100).style('fill', 'white').attr('opacity',0.4)

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
  
            svg.selectAll('.title').attr('font-size', '15px')
            svg.selectAll('.sub-title').attr('font-size', '10px')
         

          }
          else if (newWidth > 350) {

            svg.selectAll('.title').attr('font-size', '10px')
            svg.selectAll('.sub-title').attr('font-size', '7px')

          }
          
          else if (newWidth > 250) {

            svg.selectAll('.title').attr('font-size', '12px').text('CT vaccination rates dip in cities')
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