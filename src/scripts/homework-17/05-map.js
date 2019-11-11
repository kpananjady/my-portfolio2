import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 150, right: 0, bottom: 0 }

let height = 600 - margin.top - margin.bottom

let width = 900 - margin.left - margin.right

let svg = d3
  .select('#chart-5')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const projection = d3.geoAlbersUsa().scale(600)
// const graticule = d3.geoGraticule()
const path = d3.geoPath().projection(projection)



const colorScale = d3
  .scaleOrdinal()
  .domain(['hydroelectric','coal','natural gas','nuclear','petroleum', 'pumped storage','geothermal','biomass','wind','other','solar' ])
  .range([
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#cab2d6',
    '#6a3d9a',
    '#ffff99',
    'grey'
  ])

const radiusScale = d3.scaleSqrt().domain([0,10000]).range([0,10])

Promise.all([
  d3.json(require('/data/us_states.topojson')),
  d3.csv(require('/data/powerplants.csv'))
]).then(ready)
.catch(err => console.log('Failed on', err))


function ready([json, powerplants]) {
  console.log('What is our data?')
   console.log(json)

 const states = topojson.feature(json, json.objects.us_states)
  //console.log(states, 'states')

  const nested = d3
    .nest()
    .key(d => d.PrimSource)
    .entries(powerplants)
  svg
    .selectAll('path')
    .data(states.features)
    .enter()
    .append('path')
    .attr('class', 'state')
    .attr('d', path)
    .attr('fill', 'grey')

  // svg
  //   .append('path')
  //   .datum(graticule())
  //   .attr('d', path)
  //   .attr('stroke', 'grey')
  //   .attr('fill', 'none')

  

    svg
      .selectAll('power_circle')
      .data(powerplants)
      .enter()
      .append('circle')
      .attr('r', function(d){
        console.log(d.Total_MW, 'check domain')
        return radiusScale(d.Total_MW)
      })
      .attr('opacity', 0.5)
      .attr('transform', function(d) {
        const coords = [d.Longitude, d.Latitude]
        //   console.log(coords)
        //   console.log(projection(coords))
        return `translate(${projection(coords)})`
      })
      .attr('fill', function(d){
        //console.log(d.city, colorScale(d.population))
        return colorScale(d.PrimSource)
      })

    svg
    .selectAll('text')
    .data(states.features)
    .enter()
    .append('text')
    .text(function(d) {
      return d.properties.postal
    })
    .attr('transform', function(d) {
      // console.log(d)
      // console.log(path.centroid(d))
      return `translate(${path.centroid(d)})`
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('font-size', 10)

    const yPositionScale = d3.scalePoint().domain(['hydroelectric','coal','natural gas','nuclear','petroleum', 'pumped storage','geothermal','biomass','wind','other','solar' ])
    .range([100,height-100])
    svg.selectAll('legend_circle').data(powerplants)
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cy', d=> yPositionScale(d.PrimSource) )
    .attr('cx', 50)
    .attr('fill', d=>colorScale(d.PrimSource) )

    svg.selectAll('legend-label').data(nested)
    .enter()
    .append('text')
    .attr('class', 'legend-label')
    .text(d=>d.key.charAt(0).toUpperCase() + d.key.slice(1))
    .attr('x', 100)
    .attr('y',d=>yPositionScale(d.key))
   
}

