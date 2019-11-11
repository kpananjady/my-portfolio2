import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 2800 - margin.top - margin.bottom
let width = 1500 - margin.left - margin.right

let container = d3.select('#chart-6')

let svg = d3
  .select('#chart-6')
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
    const states = topojson.feature(json, json.objects.us_states)
    //console.log(states, 'states')
  
    const nested = d3
      .nest()
      .key(d => d.PrimSource)
      .entries(powerplants)

      svg
    .selectAll('.player-data')
    .data(nested)
    .enter()
    .append('g')
    .each(function(d, i) {
        const container = d3.select(this)
        container.attr('transform', `translate(${200},${200})`)

        
      if (i === 2) {
        container.attr('transform', `translate(${700},${200})`)
      }

      if (i === 3) {
        container.attr('transform', `translate(${200},${600})`)
      }

      if (i === 4) {
        container.attr('transform', `translate(${700},${600})`)
      }

      if (i === 5) {
        container.attr('transform', `translate(${200},${1000})`)
      }

      if (i === 6) {
        container.attr('transform', `translate(${700},${1000})`)
      }

      if (i === 7) {
        container.attr('transform', `translate(${200},${1400})`)
      }

    // //   if (i === 7) {
    // //     container.attr('transform', `translate(${600},${200})`)
    // //   }

      if (i === 8) {
        container.attr('transform', `translate(${700},${1400})`)
      }

      if (i === 9) {
        container.attr('transform', `translate(${200},${1800})`)
      }

      if (i === 10) {
        container.attr('transform', `translate(${700},${1800})`)
      }

      if (i === 1) {
        container.attr('transform', `translate(${200},${2200})`)
      }

      container.raise().append('text').text(d.key.charAt(0).toUpperCase() + d.key.slice(1)).attr('x', 400).attr('y',100)

          container
          .selectAll('path')
          .data(states.features)
          .enter()
          .append('path')
          .attr('class', 'state')
          .attr('d', path)
          .attr('fill', 'grey')
          //.lower()

          container
      .selectAll('power_circle')
      .data(d.values)
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
    })

}
