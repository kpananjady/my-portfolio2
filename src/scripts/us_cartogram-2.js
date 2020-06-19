import * as d3 from 'd3'
import * as topojson from 'topojson'

let margin = { top: 0, left: 70, right: 20, bottom: 0 }

let height = 600 - margin.top - margin.bottom

let width = 1600 - margin.left - margin.right

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



// const colorScale = d3
//   .scaleOrdinal()
//   .domain(['hydroelectric','coal','natural gas','nuclear','petroleum', 'pumped storage','geothermal','biomass','wind','other','solar' ])
//   .range([
//     '#a6cee3',
//     '#1f78b4',
//     '#b2df8a',
//     '#fb9a99',
//     '#e31a1c',
//     '#fdbf6f',
//     '#cab2d6',
//     '#6a3d9a',
//     '#ffff99',
//     'grey'
//   ])

 var radius = d3.scaleSqrt().domain([0,7000]).range([0, 70]).clamp(true)
// var randomizer = d3.randomNormal(0.5, 0.2)
 var color = d3.scaleLinear()




Promise.all([
  d3.json(require('/data/us.json')),
  d3.csv(require('/data/state_buyouts.csv')),
  d3.csv(require('/data/color_buyouts.csv'))
]).then(ready)
.catch(err => console.log('Failed on', err))


function ready([json,buyouts,colors]) {
//   console.log('What is our data?')
//    console.log(json, buyouts)
   
//    nodes = topojson.feature(json, json.objects.states).features;
svg.append('circle').attr('r', 10).attr('fill', 'brown').attr('cx', -10).attr('cy',10)
svg.append('text').text('<1990').attr('x', 6).attr('y',15)

svg.append('circle').attr('r', 10).attr('fill', 'red').attr('cx', -10).attr('cy',40)
svg.append('text').text('<2000').attr('x', 6).attr('y',45)

svg.append('circle').attr('r', 10).attr('fill', 'yellow').attr('cx', -10).attr('cy',70)
svg.append('text').text('<2010').attr('x', 6).attr('y',75)

svg.append('circle').attr('r', 10).attr('fill', 'orange').attr('cx', -10).attr('cy',100)   
svg.append('text').text('<2017').attr('x', 6).attr('y',105)

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



   console.log(topojson.feature(json, json.objects.states).features, 'nodes')
//   console.log(topojson.neighbors(json.objects.states.geometries), 'neighbors')

  var nodes = topojson.feature(json, json.objects.states).features
  var neighbors = topojson.neighbors(json.objects.states.geometries)

  nodes.forEach(function(node, i) {

    var centroid = d3.geoPath().centroid(node);

    node.x0 = centroid[0];
    node.y0 = centroid[1];

    cleanUpGeometry(node);

  });
//   const nested = d3
//     .nest()
//     .key(d => d.PrimSource)
//     .entries(powerplants)

 var states2 = svg
    .selectAll('path')
    .data(nodes)
    .enter()
    .append('path')
    .attr('class', 'state')
    .attr('d', function(d){
        // console.log(d.id, 'data')
        return path
    })
    .attr('fill', 'grey')

    simulate();

    function simulate() {


        var colorVar = 'blue' 
        var buyoutVar = 0 
        nodes.forEach(function(node) {
            // console.log(node.id, 'node')
            buyouts.forEach(function(b){if (b.state===node.id){
                //console.log(b.buyouts, 'b')
                buyoutVar = b.buyouts
            }
        })

        colors.forEach(function(b){if (b.State===node.id){
            colorVar = b.color
            // console.log(colorVar, 'colorVar')

            }
        })
        // console.log(buyoutVar, 'buyoutVar')
          node.x = node.x0;
          node.y = node.y0;
          node.r = radius(buyoutVar);
        });
    
        color.domain(d3.extent(nodes, d => d.r));
    
        var links = d3.merge(neighbors.map(function(neighborSet, i) {
          return neighborSet.filter(j => nodes[j]).map(function(j) {
            return {source: i, target: j, distance: nodes[i].r + nodes[j].r + 3};
          });
        }));
    
        var simulation = d3.forceSimulation(nodes)
            .force("cx", d3.forceX().x(d => width / 2).strength(0.02))
            .force("cy", d3.forceY().y(d => height / 2).strength(0.02))
            .force("link", d3.forceLink(links).distance(d => d.distance))
            .force("x", d3.forceX().x(d => d.x).strength(0.1))
            .force("y", d3.forceY().y(d => d.y).strength(0.1))
            .force("collide", d3.forceCollide().strength(0.8).radius(d => d.r + 3))
            .stop();
    
        while (simulation.alpha() > 0.1) {
          simulation.tick();
        }
    
        nodes.forEach(function(node){
          var circle = pseudocircle(node),
              closestPoints = node.rings.slice(1).map(function(ring){
                var i = d3.scan(circle.map(point => distance(point, ring.centroid)));
                return ring.map(() => circle[i]);
              }),
              interpolator = d3.interpolateArray(node.rings, [circle, ...closestPoints]);
    
          node.interpolator = function(t){
            var str = pathString(interpolator(t));
            // Prevent some fill-rule flickering for MultiPolygons
            if (t > 0.99) {
              return str.split("Z")[0] + "Z";
            }
            return str;
          };
        });
    
        states2
          .sort((a, b) => b.r - a.r)
          .transition()
          .delay(1000)
          .duration(1500)
          .attrTween("d", node => node.interpolator)
          .attr('stroke', 'none')

          .attr("fill", function(d){
            //   console.log(d.id,'node.id')
              colorVar = 'brown'
              colors.forEach(function(b){
                  if (b.State===d.id){
                    colorVar = b.color
                // console.log(colorVar, 'colorVar')
                    }
                })
              return colorVar
          })
          .transition()
            .delay(1000)
            .attrTween("d", node => t => node.interpolator(1 - t))
            .attr("fill", "#ccc")
            .on("end", (d, i) => i || simulate());
    
      }
    
  
    
    function pseudocircle(node) {
      return node.rings[0].map(function(point){
        var angle = node.startingAngle - 2 * Math.PI * (point.along / node.perimeter);
        return [
          Math.cos(angle) * node.r + node.x,
          Math.sin(angle) * node.r + node.y
        ];
      });
    }
       
    // svg.selectAll('legend-label').data(nodes)
    // .enter()
    // .append('text')
    // .attr('class', 'legend-label')
    // .text(d=>d.id)
    // .attr('x', 100)
    // .attr('y',400)
   
}

