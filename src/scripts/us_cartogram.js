import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 500 - margin.top - margin.bottom

let width = 900 - margin.left - margin.right

let svg = d3
  .select('#chart-4a')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const colorScale = d3
  .scaleOrdinal()
  .range([
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5'
  ])

const opacityScale = d3.scaleLinear().domain([0,38000]).range([0,1])  

const projection = d3.geoAlbersUsa().scale(600)
// const graticule = d3.geoGraticule()
const path = d3.geoPath().projection(projection)

d3.json(require('/data/counties_with_election_data.topojson'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(json) {


    var neighbors = topojson.neighbors(json.objects.us_counties.geometries),
      nodes = topojson.feature(json, json.objects.us_counties).features;
    console.log(nodes, 'nodes')
  nodes.forEach(function(node, i) {

    var centroid = d3.geoPath().centroid(node);

    node.x0 = centroid[0];
    node.y0 = centroid[1];

    cleanUpGeometry(node);

  });

  function cleanUpGeometry(node) {

    node.rings = (node.geometry.type === "Polygon" ? [node.geometry.coordinates] : node.geometry.coordinates);
  
    node.rings = node.rings.map(function(polygon){
      polygon[0].area = d3.polygonArea(polygon[0]);
      polygon[0].centroid = d3.polygonCentroid(polygon[0]);
      return polygon[0];
    });
  
    node.rings.sort((a, b) => b.area - a.area);
  
    node.perimeter = d3.polygonLength(node.rings[0]);
  
    // Optional step, but makes for more circular circles
    bisect(node.rings[0], node.perimeter / 72);
  
    node.rings[0].reduce(function(prev, point){
      point.along = prev ? prev.along + distance(point, prev) : 0;
      node.perimeter = point.along;
      return point;
    }, null);
  
    node.startingAngle = Math.atan2(node.rings[0][0][1] - node.y0, node.rings[0][0][0] - node.x0);
  
  }

  function bisect(ring, maxSegmentLength) {
    for (var i = 0; i < ring.length; i++) {
      var a = ring[i], b = i === ring.length - 1 ? ring[0] : ring[i + 1];
  
      while (distance(a, b) > maxSegmentLength) {
        b = midpoint(a, b);
        ring.splice(i + 1, 0, b);
      }
    }
  }
  
  function distance(a, b) {
    return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
  }
  
  function midpoint(a, b) {
    return [a[0] + (b[0] - a[0]) * 0.5, a[1] + (b[1] - a[1]) * 0.5];
  }
  
  function pathString(d) {
    return (d.rings || d).map(ring => "M" + ring.join("L") + "Z").join(" ");
  }
  

//   console.log('What is our data?')
//    console.log(json)

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
        if (trump_pct > 0.50){
            return 'maroon'
        } else {
            return 'green'
        }
    })
   //     return 'none'
    .attr('stroke', 'black')
    .attr('stroke-width', 0.2)
    .attr('opacity', function(d){
        console.log('total', (d.properties.clinton + d.properties.trump))
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

