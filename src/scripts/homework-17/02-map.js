import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 20, right: 20, bottom: 0 }

let height = 600 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

let svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')



const projection = d3.geoEqualEarth()
//const graticule = d3.geoGraticule()
const path = d3.geoPath().projection(projection)


  Promise.all([
    d3.json(require('/data/world.topojson')),
    d3.csv(require('/data/flights.csv')),
    d3.csv(require('/data/airport-codes-subset.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))
  
  
    function ready([json,cities,airports]) {
      // console.log('What is our data?')
      // console.log(json)
      const countries = topojson.feature(json, json.objects.countries)
      // console.log(countries)

      const dataStore = d3.map()
      airports.forEach(function(d) {
        dataStore.set(d.iata_code, d)
    })
    // console.log(dataStore, 'does this work?')
  
      svg.append('path')  
      .datum({type: 'Sphere'})
      .attr('d', path)
      .attr('fill', 'lightblue')
     // svg.append('rect').attr('height', height).attr('width', width).attr('x', 0).attr('y', 0).style('background-color', 'black')
    
      svg
        .selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)
        .attr('fill', 'white')
.attr('stroke', 'black')

svg
.selectAll('city-circle')
.data(airports)
.enter()
.append('circle')
.attr('r', 3)
.attr('opacity', 0.5)
.attr('transform', function(d) {
  const coords = [d.longitude, d.latitude]
  //   console.log(coords)
  //   console.log(projection(coords))
  return `translate(${projection(coords)})`
})
.attr('fill', function(d){
 // console.log(d.city, colorScale(d.population))
  return 'black'
})
    
    console.log(cities, 'cities')

    cities.forEach(function(d){
      const nyc = [-74, 40]
      let code = d.code
      console.log(d.code)
      console.log(dataStore.get(code).latitude, dataStore.get(code).latitude)
      let destination = [dataStore.get(code).longitude, dataStore.get(code).latitude]
      let coords = [nyc, destination]
      console.log(coords, 'coordinates')
      let geoLine = {
            type: 'LineString',
            coordinates: coords
          }

    svg
    .append('path')
    .datum(geoLine)
    .attr('stroke', 'white')
    .attr('fill', 'none')
    .attr('d', path)


    })
 
    

  

  
     
    }
