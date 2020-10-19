import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 160, left: 150, right: 150, bottom: 0 }

let height = 800 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right




let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const projection = d3.geoMercator()
    .center([-72.68, 41.7])
    .scale(width*20)
    .translate([(width) / 2, (height)/2]);
const path = d3.geoPath().projection(projection)

var yPositionScale = d3.scaleLinear()
            .range([0, 0.4*width])
            .domain([0, 100]);

      const xPositionScale = d3
            .scaleLinear()
            .domain([0, 300])
            .range([-10, width])
          
          const yPositionScale2 = d3
            .scaleLinear()
            .domain([0, 120])
            .range([height, 0])
           

var yPriceScale = d3.scaleLinear()
.range([0, 0.4*width])
.domain([100000, 1700000]);

const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0, 100])
const colorScale2 = d3.scaleSequential(d3.interpolateGreens).domain([0, 70])


const tip = d3
.tip()
.attr('class', 'd3-tip d3-tip-scrolly')
.style('pointer-events', 'none')
.offset([-10, 0])
.html(function(d) {
  return `${d.SchoolName}`
})


svg.call(tip)

d3.json('data/Town_Boundary_Index_Map.geojson', function(err, data){
  var geojson = geo2rect.compute(data);
});

Promise.all([
    d3.json(require('/data/Town_Boundary_Index_Map.geojson')),
    d3.json(require('/data/ct_towns_simplified.topojson')),
    d3.csv(require('/data/race_by_town_ct.csv')),
    d3.csv(require('/data/affordable_housing.csv')),
    d3.csv(require('/data/2018_ACS_Housing - Sheet1.csv')),
    d3.csv(require('/data/Median_Sales_Prices_by_Year_and_Municipality.csv')),
    d3.csv(require('/data/for_viz_regvoters.csv')),
    d3.csv(require('/data/homeless.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))




function ready([json, json2, race, housing, single_family, single_family_sales, voters, datapoints3]) {
    const line = d3
    .line()
    .x(function(d) {
      return xPositionScale(d['Year'])
    })
    .y(function(d) {
      return yPositionScale(d['Pop'])
    })

  var colorCurr = 0
    
    const towns = topojson.feature(json2, json2.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84)

// towns
         svg.append('text').attr('class', 'town_name').text('Hover on the towns below!').attr('alignment-baseline', 'middle').attr('y',-130).attr('font-size', '30px').attr('font-weight', 5)
       
         svg.append('text').attr('class', 'housing_stock').text('HOUSING STOCK: TOWN vs STATE AVERAGES').attr('x', width/35).attr('y',-90).attr('font-weight', 5)
         svg.append('text').attr('class', 'demo').text('DEMOGRAPHICS: TOWN vs STATE AVERAGES').attr('x', width/35).attr('y',125).attr('font-weight', 5)


         svg.append('text').attr('class', 'label_1').text('% Single Family Homes').attr('x', width/35).attr('y',-65).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_3').text('% Government Subsidized').attr('x', width/35).attr('y',30).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_5').text('% Black').attr('x', width/35).attr('y',155).attr('font-weight', 5)

         svg.append('text').attr('class', 'label_2').text('Median Sale Price').attr('x', 0.4*width+35).attr('y',-65).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_4').text('% Section 8 etc').attr('x', 0.4*width+35).attr('y',30).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_6').text('% Hispanic').attr('x', 0.4*width+35).attr('y',155).attr('font-weight', 5)
         
         svg
         .selectAll('circle-points')
         .data(datapoints3)
         .enter()
         .append('circle')
         .attr('class', 'circle-points')
         .attr('r', 5)
         .attr('cx', d => xPositionScale(d['Year']))
         .attr('cy', d => yPositionScale2( d['Pop']))
         .style('fill', '#8B0000')  .attr('opacity', 0.55)
       

         svg.append('path')
         .datum(datapoints3)
         .attr('class', 'path_next')
         .attr('d', function(d) {
             return line(d)
         })
         .attr('stroke', '#ffc17b')
         .attr('stroke-width', 2)
         .attr('fill', 'none')
         .attr('opacity',0.5)


         var towns2 = svg
      .selectAll('path-town')
      .data(towns.features)
      .enter()
      .append('path')
      .attr('class', 'towns')
      .attr('d', path)
      .attr('fill', function(d){
        var colorVar = 0;

        

        voters.forEach(function(r){
            if (r.Town===d.properties.NAME10){
          // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
          colorVar = colorScale(parseFloat(r['Reg_Voters'])/1000)

        }
      })  
  
        return colorVar

    //   svg.



    })
      .attr('stroke', 'lightgrey')
      .on('mouseover', function(d) {

        colorCurr = d3.select(this).style('fill')
        d3.select(this).attr('fill', 'lightgrey').attr('opacity','0.5')
        svg.select('.town_name').text(d.properties.NAME10)

        // svg.select('.town_name').text(d.properties.NAME10)


      })
    .on('mouseout', function(d){
        d3.select(this).attr('fill', colorCurr).attr('opacity','1')
      })

      d3.select('#toggle').on('click', () => {
        svg.selectAll('.towns').attr('fill', function(d){

                  var colorVar=0 


                  voters.forEach(function(r){
                    if (r.Town===d.properties.NAME10){
                  // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
                  console.log( colorScale(parseFloat(r['Reg_Voters'])/10000))
                  colorVar = colorScale(parseFloat(r['Reg_Voters'])/1000)
        
                }
              })  

                return colorVar
            })

      })

      d3.select('#toggle2').on('click', () => {
        svg.selectAll('.towns').attr('fill', function(d){
        var colorVar=0 


        voters.forEach(function(r){
          if (r.Town===d.properties.NAME10){
        // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
        console.log(100*parseFloat(r['Total ABs Processed'])/parseFloat(r['Reg_Voters']))
        colorVar = colorScale2(100*parseFloat(r['Total ABs Processed'])/parseFloat(r['Reg_Voters']))

      }
})

      return colorVar
    })  

    })


    }
