import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 500 - margin.top - margin.bottom

let width = 900 - margin.left - margin.right

let svg = d3
  .select('#chart-4b')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const colorScale = d3
  .scaleThreshold()
  .domain([-100, 0, 100])
  .range(['#c94a38', '#e67950', '#b2d16d', '#7cb564', '#479050'])

const opacityScale = d3.scaleLinear().domain([0,38000]).range([0,1])  

const projection = d3.geoAlbersUsa().scale(600)
// const graticule = d3.geoGraticule()
const path = d3.geoPath().projection(projection)

d3.json(require('/data/counties_with_election_data.topojson'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(json) {
  // console.log('What is our data?')
  //  console.log(json)

 const counties = topojson.feature(json, json.objects.us_counties)
  //console.log(states, 'states')
  svg
    .selectAll('path')
    .data(counties.features)
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr('d', path)
    .attr('fill', function(d){
        // console.log(d.properties.trump, 'trum')
        // console.log(d.properties.trump/ (d.properties.clinton + d.properties.trump))
        let trump_pct = d.properties.trump/ (d.properties.clinton + d.properties.trump)
        let clinton_pct = d.properties.clinton/ (d.properties.clinton + d.properties.trump)
        if (trump_pct > clinton_pct){
            return colorScale(trump_pct*100)
        } else {
            return colorScale(-clinton_pct*100)
        }
    })
   //     return 'none'
    // .attr('stroke', 'black')
    // .attr('stroke-width', 0.2)
    .attr('opacity', function(d){
      //  console.log('total', (d.properties.clinton + d.properties.trump))
        return  opacityScale(d.properties.clinton + d.properties.trump)
    })

  // svg
  //   .append('path')
  //   .datum(graticule())
  //   .attr('d', path)
  //   .attr('stroke', 'grey')
  //   .attr('fill', 'none')

//   svg
//     .selectAll('text')
//     .data(states.features)
//     .enter()
//     .append('text')
//     .text(function(d) {
//       return d.properties.postal
//     })
//     .attr('transform', function(d) {
//       // console.log(d)
//       // console.log(path.centroid(d))
//       return `translate(${path.centroid(d)})`
//     })
//     .attr('text-anchor', 'middle')
//     .attr('alignment-baseline', 'middle')
//     .attr('font-size', 10)
}

