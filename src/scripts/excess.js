import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 20, left:50, right: 0, bottom: 70 }

const height = 600 - margin.top - margin.bottom
const width = 600 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(['January', 'February', 'March', 'April', 'May', 'June', 'July'])
  .paddingInner(1)
  .paddingOuter(.5)



  var y = d3.scaleLinear()
    .domain([2100,5500])
    .range([height, 0])
  

Promise.all([
  d3.csv(require('/data/boxplot_data.csv')),
  d3.csv(require('/data/covid_vs_not.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))


  function ready([datapoints, datapoints2]) {


    svg
    .selectAll("vertLines")
    .data(datapoints)
    .enter()
    .append("line")
    .attr('class', 'vertLines')

      .attr("x1", function(d){return(x(d.month))})
      .attr("x2", function(d){return(x(d.month))})
      .attr("y1", function(d){return(y(d.min))})
      .attr("y2", function(d){return(y(d.max))})
      .attr("stroke", "#F5793A")
      .style("width", 40)

      var boxWidth = 20
      svg
        .selectAll("boxes")
        .data(datapoints)
        .enter()
        .append("rect")
        .attr('class', 'boxes')

            .attr("x", function(d){return(x(d.month)-boxWidth/2)})
            .attr("y", function(d){return(y(d.q3))})
            .attr("height", function(d){return(y(d.q1)-y(d.q3))})
            .attr("width", boxWidth )
            .attr("stroke", "#F5793A")
            .style("fill", "#F5793A")

            svg
    .selectAll("medianLines")
    .data(datapoints)
    .enter()
    .append("line")
    .attr('class', 'medianLines')
      .attr("x1", function(d){return(x(d.month)-boxWidth/2) })
      .attr("x2", function(d){return(x(d.month)+boxWidth/2) })
      .attr("y1", function(d){return(y(d.q2))})
      .attr("y2", function(d){return(y(d.q2))})
      .attr("stroke", "black")
      .style("width", 80)

      const xAxis = d3
      .axisBottom(x)
      .tickSize(height)
      .ticks(5)
  
      svg
      .append('g')
      .attr('class', 'axis x-axis')
      .call(xAxis)
      .lower()
  
 

      d3.select('.y-axis .domain').remove()
  
      d3.select('.x-axis .domain').remove()
  
      svg.selectAll('circle')
      .data(datapoints2)
      .enter()
      .append('circle')
      .attr('class', 'circle-points')
      .attr('r', 5)
      .attr('cx', d => x(d['month']))
      .attr('cy', d => y( d['total_deaths']))
      .style('fill', '#03254c')  
      .attr('opacity', 0.55)
 


      d3.select('#toggle').on('click', () => {
        svg.selectAll('.circle-points')
        .transition( )
        .duration(1000)
        .ease(d3.easeElastic)
        .attr('cx', d => x(d['month']))
      .attr('cy', d => y( d['total_deaths']))
      .style('fill', '#03254c')  
      .attr('opacity', 0.55)
      


      })

      d3.select('#toggle3').on('click', () => {
        svg.selectAll('.circle-points')
        .transition( )
        .duration(1500)
        .ease(d3.easeElastic)
        .attr('cx', d => x(d['month']))
      .attr('cy', d => y( d['not_covid']))
      .style('fill', '#03254c')  
      .attr('opacity', 0.55)
      
      


      })


      function render() {
        const svgContainer = svg.node().closest('div')
        const svgWidth = svgContainer.offsetWidth
        // Do you want it to be full height? Pick one of the two below
        // margin = { top: 100, left: 100, right: 50, bottom: 50 }

        const svgHeight = height + margin.top + margin.bottom
        // const svgHeight = window.innerHeight
    
        const actualSvg = d3.select(svg.node().closest('svg'))
        actualSvg.attr('width', svgWidth).attr('height', svgHeight)
    
        const newWidth = svgWidth - margin.left - margin.right
        const newHeight = svgHeight - margin.top - margin.bottom

        svg.select('y-axis').remove()

        
        const yAxis = d3
        .axisLeft(y)
        .tickSize(-newWidth)
        .ticks(5)
        // .tickFormat(d => (d === 80 ? '80 years' : d))
    
      svg
        .append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis)
        .lower()

        x.range([0,newWidth])

           svg.selectAll('.vertLines')
           .attr("x1", function(d){return(x(d.month))})
           .attr("x2", function(d){return(x(d.month))})
           .attr("y1", function(d){return(y(d.min))})
           .attr("y2", function(d){return(y(d.max))})
           
           
           svg.selectAll('.boxes')
           .attr("x", function(d){return(x(d.month)-boxWidth/2)})

           
           
           svg.selectAll('.medianLines').attr("x1", function(d){return(x(d.month)-boxWidth/2) })
           .attr("x2", function(d){return(x(d.month)+boxWidth/2) })

           svg.selectAll('.circle-points')  .attr('cx', d => x(d['month']))

      svg.select('.x-axis').call(xAxis)

      d3.select('.y-axis .domain').remove()
  
      d3.select('.x-axis .domain').remove()

      d3.select('#toggle').on('click', () => {
        svg.selectAll('.circle-points')
        .transition( )
        .duration(1000)
        .ease(d3.easeElastic)
        .attr('cx', d => x(d['month']))
      .attr('cy', d => y( d['total_deaths']))
      .style('fill', '#03254c')  
      .attr('opacity', 0.55)
      


      })

      d3.select('#toggle3').on('click', () => {
        svg.selectAll('.circle-points')
        .transition( )
        .duration(1500)
        .ease(d3.easeElastic)
        .attr('cx', d => x(d['month']))
      .attr('cy', d => y( d['not_covid']))
      .style('fill', '#03254c')  
      .attr('opacity', 0.55)
      
   

      })

      }
      window.addEventListener('resize', render)

    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render()
    }