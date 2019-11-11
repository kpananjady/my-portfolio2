import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 500 - margin.top - margin.bottom

let width = 900 - margin.left - margin.right

let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const projection = d3.geoMercator()
const graticule = d3.geoGraticule()
const path = d3.geoPath().projection(projection)

const colorScale = d3.scaleSequential(d3.interpolateViridis).domain([0, 774340.5])


Promise.all([
  d3.json(require('/data/world.topojson')),
  d3.csv(require('/data/world-cities.csv'))
]).then(ready)
.catch(err => console.log('Failed on', err))


  function ready([json, cities]) {
    // console.log('What is our data?')
    // console.log(json)
    const countries = topojson.feature(json, json.objects.countries)
    // console.log(countries)

    svg.append('rect').attr('height', height).attr('width', width).attr('x', 0).attr('y', 0).style('background-color', 'black')
  
  
  
    console.log(graticule(), '??')
  
    svg
      .append('path')
      .datum(graticule())
      .attr('d', path)
      .attr('stroke', 'white')
      .attr('fill', 'none')

      svg
      .selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path)
      .attr('fill', 'black')
      .raise()
      


      svg
      .selectAll('circle')
      .data(cities)
      .enter()
      .append('circle')
      .attr('r', 0.75)
     // .attr('opacity', 0.5)
      .attr('transform', function(d) {
        const coords = [d.lng, d.lat]
        //   console.log(coords)
        //   console.log(projection(coords))
        return `translate(${projection(coords)})`
      })
      .attr('fill', function(d){
        //console.log(d.city, colorScale(d.population))
        return colorScale(d.population)
      })
  }