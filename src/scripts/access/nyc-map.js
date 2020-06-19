import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 0, left: 150, right: 500, bottom: 300 }

let height = 1000 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


const projection = d3.geoMercator()
    .center([-73.94, 40.70])
    .scale(60000)
    .translate([(width) / 2, (height)/2]);
const path = d3.geoPath().projection(projection)

const colorScale = d3.scaleSequential(d3.interpolateSpectral).domain([0, 10])



const tip = d3
.tip()
.attr('class', 'd3-tip d3-tip-scrolly')
.html(function(d) {
  return `<span style='color:white'>${d.SchoolName} <span style='color:grey'>${d.Rating}</span>`
})
.style('background-color', 'black')
.style('pointer-events', 'none')
.offset([-10, 0])

svg.call(tip)
let toolTipElement = d3.select(".d3-tip-scrolly")
d3.select("#chart-1").append(d => toolTipElement.node())

Promise.all([
  d3.json(require('/data/nyc-borough.topojson')),
  d3.json(require('/data/districts.topojson')),
  d3.csv(require('/data/School-NYC-Accessibility-geolocated.csv'))
]).then(ready)
.catch(err => console.log('Failed on', err))

function ready([json,json2, schools]) {

  console.log(json)
    const boroughs = topojson.feature(json, json.objects.boroughs)
    console.log(boroughs.features)
    const districts = topojson.feature(json2, json2.objects.school_districts)


      svg
      .selectAll('path-borough')
      .data(boroughs.features)
      .enter()
      .append('path')
      .attr('class', 'city-boroughs')
      .attr('d', path)
      .attr('fill', 'lightgrey')
      .attr('stroke', 'white')
      .raise()
      
      svg.append('circle').attr('r', 6).attr('fill', colorScale(10)).attr('cx', 1).attr('cy',25)
      svg.append('text').text('10').attr('x', 20).attr('y',30)

      svg.append('circle').attr('r', 6).attr('fill', colorScale(8)).attr('cx', 1).attr('cy',55)
      svg.append('text').text('8').attr('x', 20).attr('y',60)

      svg.append('circle').attr('r',6).attr('fill',  colorScale(6)).attr('cx', 1).attr('cy',85)
      svg.append('text').text('6').attr('x', 20).attr('y',90)

      svg.append('circle').attr('r', 6).attr('fill',  colorScale(4)).attr('cx', 1).attr('cy',115)
      svg.append('text').text('4').attr('x', 20).attr('y',120)

      svg.append('circle').attr('r', 6).attr('fill',  colorScale(2)).attr('cx', 1).attr('cy',145)
      svg.append('text').text('2').attr('x', 20).attr('y',150)

      svg.append('circle').attr('r', 6).attr('fill',  colorScale(0)).attr('cx', 1).attr('cy',175)
      svg.append('text').text('0').attr('x', 20).attr('y',180)



      svg
      .selectAll('.circle-school')
      .data(schools)
      .enter()
      .append('circle')
      .attr('class', 'circle-school')
      .attr('r', 2.5)
      .attr('opacity',0.5)
      .attr('transform', function(d) {
        const coords = [d.Lng, d.Lat]
        return `translate(${projection(coords)})`
      })
      .attr('fill', function(d){
        return colorScale(d.Rating)
      })
      .on('mouseover', function(d) {
        // show the tooltip
        tip.show.call(this, d)
      
        let coords = this.getBoundingClientRect()
        let y = coords.y + (coords.height / 2)
        // console.log(coords.width)
        let x = (coords.width) 
        //console.log(coords)
      
        d3.select(".d3-tip-scrolly")
          .style('top', y + 'px')
          .style('left', x + 'px')
      })
      .on('mouseout', tip.hide)
          .on('mouseout',
              tip.hide )

       d3.select('#step-one')
        .on('stepin', function(d){
      
      
        d3.selectAll('.city-districts').remove()
        d3.selectAll('.city-boroughs').remove()

        svg
        .selectAll('path-borough')
        .data(boroughs.features)
        .enter()
        .append('path')
        .attr('class', 'city-boroughs')
        .attr('d', path)
        .attr('fill', 'lightgrey')
        .attr('stroke', 'white')
        .lower()
      
        svg.selectAll('.circle-school')
      .attr('fill', function(d){
        return colorScale(d.Rating)
      })
        })
        .on('stepout', function(d){
      
        })

        d3.select('#step-test')
        .on('stepin', function(d){


          d3.selectAll('.city-districts').remove()
          d3.selectAll('.city-boroughs').remove()

           svg.selectAll('path-district')
      .data(districts.features)
      .enter()
      .append('path')
      .attr('class', 'city-districts')
      .attr('d', path)
      .attr('fill', 'lightgrey')
      .attr('stroke', 'white')
      .lower()

      svg.selectAll('.circle-school')
      .attr('fill', function(d){
        return colorScale(d.Rating)
      })

        })
        .on('stepout', function(d){

        })

        d3.select('#step-75')
        .on('stepin', function(d){

           svg.selectAll('.circle-school')
      .attr('fill', function(d){
        console.log(d.School_DBN.startsWith('75'))
        if(d.School_DBN.startsWith(7)){
          console.log(d.School_DBN)
          return colorScale(d.Rating)
        } else {
          return 'lightgrey'
        }
      })
      

        })
        .on('stepout', function(d){
          svg.selectAll('.circle-school')
      .attr('fill', function(d){
        return colorScale(d.Rating)
      })
        })
  
        function render() {
          const svgContainer = svg.node().closest('div')
          const svgWidth = svgContainer.offsetWidth
          // Do you want it to be full height? Pick one of the two below
          // const svgHeight = height + margin.top + margin.bottom
          const svgHeight = window.innerHeight
      
          const actualSvg = d3.select(svg.node().closest('svg'))
          actualSvg.attr('width', svgWidth).attr('height', svgHeight)
      
          const newWidth = svgWidth - margin.left - margin.right
          const newHeight = svgHeight - margin.top - margin.bottom
      

          // Update our scale
          const projection = d3.geoMercator()
                        .center([-73.94, 40.70])
                        .scale(70000)
                        .translate([(newWidth) / 2, (newHeight)/2]);
          // console.log(newHeight, 'newheight')
          const path = d3.geoPath().projection(projection)

      
          // Update axes
          svg
            .select('.circle-school')
            .attr('transform', function(d) {
              const coords = [d.Lng, d.Lat]
              return `translate(${projection(coords)})`
            })      

          svg
          .selectAll('path-borough')  
          .attr('d', path)

          svg
          .selectAll('path-district')  
          .attr('d', path)

        }
      

        window.addEventListener('resize', render)

        // And now that the page has loaded, let's just try
        // to do it once before the page has resized
        render()
  }