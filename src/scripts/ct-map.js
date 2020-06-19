import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 150, left: 150, right: 150, bottom: 150 }

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
    .center([-72.6, 41.8])
    .scale(16500)
    .translate([(width) / 2, (height)/2]);
const path = d3.geoPath().projection(projection)

var yPositionScale = d3.scaleLinear()
            .range([0, 0.4*width])
            .domain([0, 100]);


const colorScale = d3.scaleOrdinal()
.domain(['Exempt', 'Non-Exempt'])
.range(["#E97A", "#dcdcdc"])


const colorScale2 = d3.scaleSequential(d3.interpolateViridis).domain([0, 774340.5])


d3.json('data/Town_Boundary_Index_Map.geojson', function(err, data){
  var geojson = geo2rect.compute(data);
});

Promise.all([
    d3.json(require('/data/Town_Boundary_Index_Map.geojson')),
    d3.json(require('/data/ct_towns_simplified.topojson')),
    d3.csv(require('/data/race_by_town_ct.csv')),
    d3.csv(require('/data/affordable_housing.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))




function ready([json, json2, race, housing]) {
    
    const towns = topojson.feature(json2, json2.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84)
    console.log(towns, 'towns')
    // console.log(boroughs.features)
    // const districts = topojson.feature(json2, json2.objects.school_districts)

         svg.append('text').attr('class', 'town_name').text('Hover on towns to see how they compare').attr('alignment-baseline', 'middle').attr('y',-120).attr('font-size', '30px').attr('font-weight', 5)
         svg.append('text').attr('class', 'race_black').text('Race black').attr('x', 20).attr('y',40).attr('font-weight', 5)

         svg.append('text').attr('class', 'race_hispanic').text('Race Hispanic').attr('x', 20).attr('y',-65).attr('font-weight', 5)
         svg.append('text').attr('class', 'affordable_housing').text('Affordable Housing').attr('x', 20).attr('y',145).attr('font-weight', 5)

         svg.append('circle').attr('r', 6).attr('fill', colorScale('Exempt')).attr('cx', 3*width/4).attr('cy',height-100)

         svg.append('circle').attr('r', 6).attr('fill', colorScale('Non-Exempt')).attr('cx', width/2).attr('cy',height-100)



         svg
         .append('rect')
         .attr('class', 'bar_hispanic_town_100')
         .attr("y",-55
         )
         .attr("height", 20)
         .attr("x", 20)
         .attr('rx',10)
         .attr("width",0.4*width)
         .attr('fill', '#E9967A')

         svg
         .append('rect')
         .attr('class', 'bar_hispanic')
         .attr("y",-55
         )
         .attr("height", 20)
         .attr("x", 20)
         .attr("width",0)
         .attr('fill', '#B22222')
         .attr('rx',10)
         .attr('ry',10)
         
   
         svg
         .append('rect')
         .attr('class', 'bar_hispanic_state_100')
         .attr("y",-15)
         .attr("height", 20)
         .attr("x", 20)
         .attr("width",0.4*width)
         .attr('fill', 'lightgrey')
         .attr('rx',10)
         .attr('ry',10)

         svg
         .append('rect')
         .attr('class', 'bar_hispanic_state')
         .attr("y",-15)
         .attr("height", 20)
         .attr("x", 20)
         .attr("width",yPositionScale(16))
         .attr('fill', 'grey')
         .attr('rx',10)
         .attr('ry',10)



         svg
         .append('rect')
         .attr('class', 'bar_2_town_100')
         .attr("y",-55
         )
         .attr("height", 20)
         .attr("x",0.4*width+35)
         .attr("width",0.4*width)
         .attr('fill', '#E9967A')
         .attr('rx',10)
         .attr('ry',10)
   
         svg
         .append('rect')
         .attr('class', 'bar_2_state_100')
         .attr("y",-15)
         .attr("height", 20)
         .attr("x", 0.4*width+35)
         .attr("width",0.4*width)
         .attr('fill', 'lightgrey')
         .attr('rx',10)
         .attr('ry',10)

         svg
         .append('rect')
         .attr('class', 'bar_4_town_100')
         .attr("y",45
         )
         .attr("height", 20)
         .attr("x", 0.4*width+35)
         .attr("width",0.4*width)
         .attr('fill', '#E9967A')
         .attr('rx',10)
         .attr('ry',10)

         svg
         .append('rect')
         .attr('class', 'bar_4_state_100')
         .attr("y",85
         )
         .attr("height", 20)
         .attr("x", 0.4*width + 35)
         .attr("width",0.4*width)
         .attr('fill', 'lightgrey')
         .attr('rx',10)
         .attr('ry',10)
        

         svg
         .append('rect')
         .attr('class', 'bar_black_town_100')
         .attr("y",45
         )
         .attr("height", 20)
         .attr("x", 20)
         .attr("width",0.4*width)
         .attr('fill', '#E9967A')
         .attr('rx',10)
         .attr('ry',10)
   
         svg
         .append('rect')
         .attr('class', 'bar_black')
         .attr("y",45)
         .attr("height", 20)
         .attr("x", 20)
         .attr("width",0)
         .attr('fill', '#B22222')
         .attr('rx',10)
         .attr('ry',10)
         
         svg
         .append('rect')
         .attr('class', 'bar_race_state_100')
         .attr("y",85
         )
         .attr("height", 20)
         .attr("x", 20)
         .attr("width",0.4*width)
         .attr('fill', 'lightgrey')
         .attr('rx',10)
         .attr('ry',10)


         svg
         .append('rect')
         .attr('class', 'bar_race_state')
         .attr("y",85
         )
         .attr("height", 20)
         .attr("x", 20)
         .attr("width",yPositionScale(10))
         .attr('fill', 'grey')
         .attr('rx',10)
         .attr('ry',10)


         svg
         .append('rect')
         .attr('class', 'bar_affordable_town_100')
         .attr("y",150
         )
         .attr("height", 20)
         .attr("x", 20)
         .attr("width",0.4*width)
         .attr('fill', '#E9967A')
         .attr('rx',10)
         .attr('ry',10)

         svg
         .append('rect')
         .attr('class', 'bar_affordable_town')
         .attr("y",150
         )
         .attr("height", 20)
         .attr("x", 20)
         .attr("width",0)
         .attr('fill', '#B22222')
         .attr('rx',10)
         .attr('ry',10)

         

         svg
         .append('rect')
         .attr('class', 'bar_3_state_100')
         .attr("y",190
         )
         .attr("height", 20)
         .attr("x", 20)
         .attr("width",0.4*width)
         .attr('fill', 'lightgrey')
         .attr('rx',10)
         .attr('ry',10)
   
         svg
         .append('rect')
         .attr('class', 'bar_5_state_100')
         .attr("y",190)
         .attr("height", 20)
         .attr("x", 0.4*width +35)
         .attr("width",0.4*width)
         .attr('fill', 'lightgrey')
         .attr('rx',10)
         .attr('ry',10)

         svg
         .append('rect')
         .attr('class', 'bar_5_town_100')
         .attr("y",150)
         .attr("height", 20)
         .attr("x", 0.4*width +35)
         .attr("width",0.4*width)
         .attr('fill', '#E9967A')
         .attr('rx',10)
         .attr('ry',10)

   

   
        //  svg
        //  .append('rect')
        //  .attr('class', 'something_else')
        //  .attr("y",85)
        //  .attr("height", 20)
        //  .attr("x", 0.4*width)
        //  .attr("width",5)
        //  .attr('fill', 'lightblue');
         
// d.properties.Name works if you want to use json

      var towns2 = svg
      .selectAll('path-town')
      .data(towns.features)
      .enter()
      .append('path')
      .attr('class', 'towns')
      .attr('d', path)
      .attr('fill', function(d){
        var colorVar = 0;
        housing.forEach(function(r){if (r.Town===d.properties.NAME10){
          console.log(r['Status'])
            colorVar = colorScale(r['Status'])
            }
        })      
  
        return colorVar

    })
      .attr('stroke', 'white')
      .on('mouseover', function(d) {
        d3.select(this).attr('opacity', '0.5')

          svg.select('.town_name').text(d.properties.NAME10)
          race.forEach(function(r){if (r.Name_to_join===d.properties.NAME10){
            svg.select('.race_black').text('% Black' + " " + r['Black alone'])
            svg.select('.bar_black') .transition()
            .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(r['Black alone']))

            console.log(r['Hispanic'])
            svg.select('.race').text('% Black' + " " + r['Black alone'])
            svg.select('.race_hispanic').text('% Hispanic' + " " + r['Hispanic'])

            svg.select('.bar_hispanic') .transition()
            .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(r['Hispanic']))

            }

        })

        housing.forEach(function(r){if (r.Town===d.properties.NAME10){
          svg.select('.affordable_housing').text('% Affordable' + " " + r['Percent Affordable'])
          svg.select('.bar_affordable_town')
          .transition()
          .duration(700)
          .ease(d3.easeElastic).attr('width', yPositionScale(r['Percent Affordable']))

        }
      })
    }).on('mouseout', function(d){
      d3.select(this).attr('opacity', '1')
    })
      .raise()

      d3.select('#toggle').on('click', () => {
        svg.selectAll('.towns').attr('fill', 'black')
      })
    }