import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 160, left: 150, right: 150, bottom: 0 }

let height = 800 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

var data_moused_over = 0;



let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const projection = d3.geoMercator()
    .center([-72.68, 41.8])
    .scale(width*17)
    .translate([(width) / 2, (height)/2]);

const path = d3.geoPath().projection(projection)

var yPositionScale = d3.scaleLinear()
            .range([0, 0.4*width])
            .domain([0, 100]);

            const xPositionScale = d3
            .scaleLinear()
            .domain([1,5])
            .range([50, width/2])
            var yPositionScale2 = d3.scaleLinear()
            .range([0, 0.4*width])
            .domain([0, 25]);
           

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
  return `${d.percentage}, ${d.date}`
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
    d3.csv(require('/data/dummydata_percentage.csv')),
    d3.json(require('/data/dummydata_percentage.json'))

  ]).then(ready)
  .catch(err => console.log('Failed on', err))




function ready([json, json2, race, housing, single_family, single_family_sales, voters, datapoints3, datapoints4]) {
  
  svg.append('text').attr('font-weight', 5).attr('font-size',13).text('In ths town, X% of people whose ballots were processed on ').attr('x', 70).attr(
    'y', 220
  ).attr('id', 'changing_percentage')
  svg.append('text').attr('font-weight', 5).attr('font-size',13).text('have successfully returned their ballots.').attr('x', 70).attr(
    'y', 235
  )
  // bar_1

  svg
  .append('rect')
  .attr('class', 'bar_1_town_100')
  .attr("y",-55
  )
  .attr("height", 20)
  .attr("x", width/35)
  .attr('rx',10)
  .attr("width",0.4*width)
  .attr('fill', 'green')
  .attr('opacity', 0.5)


  svg
  .append('rect')
  .attr('class', 'bar_1')
  .attr("y",-55
  )
  .attr("height", 20)
  .attr("x", width/35)
  .attr("width",0)
  .attr('fill', 'green')
  .attr('rx',10)
  .attr('ry',10)
  .attr('opacity', 0.5)

  

  svg
  .append('rect')
  .attr('class', 'bar_1_state_100')
  .attr("y",-25)
  .attr("height", 20)
  .attr("x", width/35)
  .attr("width",0.4*width)
  .attr('fill', 'lightgrey')
  .attr('rx',10)
  .attr('ry',10)

  svg
  .append('rect')
  .attr('class', 'bar_1_state')
  .attr("y",-25)
  .attr("height", 20)
  .attr("x", width/35)
  .attr("width",yPositionScale(64.4))
  .attr('fill', 'grey')
  .attr('rx',10)
  .attr('ry',10)

 svg.append('text').attr('id', 'median-sf').text('64.4').attr('y',-11).attr('x', yPositionScale(80)).attr('font-weight', 5).attr('font-size',13)

//bar_2

  svg
  .append('rect')
  .attr('class', 'bar_2_town_100')
  .attr("y",-55
  )
  .attr("height", 20)
  .attr("x",0.4*width+35)
  .attr("width",0.4*width)
  .attr('fill', 'green')
  .attr('rx',10)
  .attr('ry',10)
  .attr('opacity', 0.5)

  svg
  .append('rect')
  .attr('class', 'bar_2')
  .attr("y",-55
  )
  .attr("height", 20)
  .attr("x",0.4*width+35)
  .attr("width",0)
  .attr('fill', 'green')
  .attr('rx',10)
  .attr('ry',10)
  .attr('opacity', 0.5)

  svg
  .append('rect')
  .attr('class', 'bar_2_state_100')
  .attr("y",-25)
  .attr("height", 20)
  .attr("x", 0.4*width+35)
  .attr("width",0.4*width)
  .attr('fill', 'lightgrey')
  .attr('rx',10)
  .attr('ry',10)


  svg
  .append('rect')
  .attr('class', 'bar_2_state')
  .attr("y",-25)
  .attr("height", 20)
  .attr("x", 0.4*width+35)
  .attr("width",yPriceScale(253241))
  .attr('fill', 'grey')
  .attr('rx',10)
  .attr('ry',10)

  svg.append('text').attr('id', 'median-price').text('253K').attr('y',-11).attr('x', yPositionScale(80)+(0.4*width)+35).attr('font-weight', 5).attr('font-size',13)

//bar_4         
  svg
  .append('rect')
  .attr('class', 'bar_4_town_100')
  .attr("y",40
  )
  .attr("height", 20)
  .attr("x", 0.4*width+35)
  .attr("width",0.4*width)
  .attr('fill', 'darkblue')
  .attr('rx',10)
  .attr('ry',10)
  .attr('opacity', 0.5)

  svg
  .append('rect')
  .attr('class', 'bar_4')
  .attr("y",40
  )
  .attr("height", 20)
  .attr("x",0.4*width+35)
  .attr("width",0)
  .attr('fill', 'darkblue')
  .attr('rx',10)
  .attr('ry',10)
  .attr('opacity', 0.5)

  svg
  .append('rect')
  .attr('class', 'bar_4_state_100')
  .attr("y",70
  )
  .attr("height", 20)
  .attr("x", 0.4*width + 35)
  .attr("width",0.4*width)
  .attr('fill', 'lightgrey')
  .attr('rx',10)
  .attr('ry',10)


  svg
  .append('rect')
  .attr('class', 'bar_4_state')
  .attr("y",70)
  .attr("height", 20)
  .attr("x", 0.4*width+35)
  .attr("width",yPositionScale2(0.21))
  .attr('fill', 'grey')
  .attr('rx',10)
  .attr('ry',10)

  svg.append('text').attr('id', 'median-voucher').text('0.21').attr('y',85).attr('x', yPositionScale2(20)+(0.4*width)+35).attr('font-weight', 5).attr('font-size',13)

 
//bar_3
  svg
  .append('rect')
  .attr('class', 'bar_3_town_100')
  .attr("y",40
  )
  .attr("height", 20)
  .attr("x", width/35)
  .attr("width",0.4*width)
  .attr('fill', 'darkblue')
  .attr('rx',10)
  .attr('ry',10)
  .attr('opacity', 0.5)


  svg
  .append('rect')
  .attr('class', 'bar_3')
  .attr("y",40)
  .attr("height", 20)
  .attr("x", width/35)
  .attr("width",0)
  .attr('fill', 'darkblue')
  .attr('rx',10)
  .attr('ry',10)
  .attr('opacity', 0.5)

  
  svg
  .append('rect')
  .attr('class', 'bar_3_state_100')
  .attr("y",70
  )
  .attr("height", 20)
  .attr("x", width/35)
  .attr("width",0.4*width)
  .attr('fill', 'lightgrey')
  .attr('rx',10)
  .attr('ry',10)


  svg
  .append('rect')
  .attr('class', 'bar_3_state')
  .attr("y",70
  )
  .attr("height", 20)
  .attr("x",width/35)
  .attr("width",yPositionScale2(2.2))
  .attr('fill', 'grey')
  .attr('rx',10)
  .attr('ry',10)


  svg.append('text').attr('id', 'median-sub').text('2.2').attr('y',85).attr('x', yPositionScale2(20)).attr('font-weight', 5).attr('font-size',13)


//bar_5

  svg
  .append('rect')
  .attr('class', 'bar_5_town_100')
  .attr("y",130
  )
  .attr("height", 20)
  .attr("x", width/35)
  .attr("width",0.4*width)
  .attr('fill', '#E9967A')
  .attr('rx',10)
  .attr('ry',10)

  svg
  .append('rect')
  .attr('class', 'bar_5')
  .attr("y",130
  )
  .attr("height", 20)
  .attr("x", width/35)
  .attr("width",0)
  .attr('fill', '#B22222')
  .attr('rx',10)
  .attr('ry',10)

  svg
  .append('rect')
  .attr('class', 'bar_5_state_100')
  .attr("y",160
  )
  .attr("height", 20)
  .attr("x", 20)
  .attr("width",0.4*width)
  .attr('fill', 'lightgrey')
  .attr('rx',10)
  .attr('ry',10)

  svg
  .append('rect')
  .attr('class', 'bar_5_state')
  .attr("y",160
  )
  .attr("height", 20)
  .attr("x",width/35)
  .attr("width",yPositionScale(10))
  .attr('fill', 'grey')
  .attr('rx',10)
  .attr('ry',10)

  svg.append('text').attr('id', 'median-black').text('10').attr('y',175).attr('x', yPositionScale(80)).attr('font-weight', 5).attr('font-size',13)


//bar_6   
  svg
  .append('rect')
  .attr('class', 'bar_6_state_100')
  .attr("y",160)
  .attr("height", 20)
  .attr("x", 0.4*width +35)
  .attr("width",0.4*width)
  .attr('fill', 'lightgrey')
  .attr('rx',10)
  .attr('ry',10)

 //  svg
 //  .append('rect')
 //  .attr('class', 'bar_6')
 //  .attr("y",180
 //  )
 //  .attr("height", 20)
 //  .attr("x",0.4*width+35)
 //  .attr("width",0)
 //  .attr('fill', '#B22222')
 //  .attr('rx',10)
 //  .attr('ry',10)

 svg
 .append('rect')
 .attr('class', 'bar_6_town_100')
 .attr("y",130)
 .attr("height", 20)
 .attr("x", 0.4*width +35)
 .attr("width",0.4*width)
 .attr('fill', '#E9967A')
 .attr('rx',10)
 .attr('ry',10)

 svg
 .append('rect')
 .attr('class', 'bar_6')
 .attr("y",130)
 .attr("height", 20)
 .attr("x", 0.4*width +35)
 .attr("width",0)
 .attr('fill', '#B22222')
 .attr('rx',10)
 .attr('ry',10)



  svg
  .append('rect')
  .attr('class', 'bar_6_state')
  .attr("y",160)
  .attr("height", 20)
  .attr("x", 0.4*width+35)
  .attr("width",yPositionScale(16))
  .attr('fill', 'grey')
  .attr('rx',10)
  .attr('ry',10)

  svg.append('text').attr('id', 'median-hisp').text('16').attr('y',175).attr('x', yPositionScale(80)+35).attr('font-weight', 5).attr('font-size',13)


//   var index = 0; 

//   for (index = 0; index < datapoints4[0].length; index++) { 

//     console.log(datapoints4[0][index]['name']); 

// }


  const line = d3
    .line()
    .x(function(d) {
      return xPositionScale(d['date'])
    })
    .y(function(d) {
      return yPositionScale2(d['percentage'])
    })

  var colorCurr = 0
    
    const towns = topojson.feature(json2, json2.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84)


// towns
         svg.append('text').attr('class', 'town_name').text('Click on the towns below!').attr('alignment-baseline', 'middle').attr('y',-130).attr('font-size', '30px').attr('font-weight', 5)
       
         svg.append('text').attr('class', 'housing_stock').text('ABSENTEE VOTING: TOWN vs STATE AVERAGES').attr('x', width/35).attr('y',-90).attr('font-weight', 5)


         svg.append('text').attr('class', 'label_1').text('All Voters: AB applied').attr('x', width/35).attr('y',-65).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_3').text('Democrats: AB applied').attr('x', width/35).attr('y',30).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_5').text('Republicans: AB Applied').attr('x', width/35).attr('y',120).attr('font-weight', 5)

         svg.append('text').attr('class', 'label_2').text('AB received').attr('x', 0.4*width+35).attr('y',-65).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_4').text('AB received').attr('x', 0.4*width+35).attr('y',30).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_6').text('AB received').attr('x', 0.4*width+35).attr('y',120).attr('font-weight', 5)
         

        //   return yPositionScale2(d['percentage'])})
        //  .style('fill', '#8B0000')  
        //  .attr('opacity', 0.55)
        //  .on('mouseover', tip.show)




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
        d3.select(this).attr('fill', 'black').attr('opacity','0.5')
      })
      .on('click', function(d) {

      
        svg.select('.town_name').text(d.properties.NAME10)




        race.forEach(function(r){if (r.Name_to_join===d.properties.NAME10){

          svg.select('.label_5').text('R: % Applied' + " " + r['Black alone'])
          svg.select('.bar_5') .transition()
          .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(r['Black alone']))

// hispanic
          svg.select('.label_6').text('R: % Voted' + " " + r['Hispanic'])

          svg.select('.bar_6') .transition()
          .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(r['Hispanic']))

          }

      })

      single_family.forEach(function(r){if (r.NAME===d.properties.NAME10){

        var totalUnits = parseFloat(r['DP04_0007E'].replace( new RegExp(',','g'),'')) + parseFloat(r['DP04_0008E'].replace( new RegExp(',','g'),''))
        var percentage = 100*totalUnits/parseFloat(r['DP04_0006E'].replace( new RegExp(',','g'),''))

        svg.select('.label_1').text('% Applied' + " " + Math.round(percentage))

        svg.select('.bar_1') .transition()
          .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(Math.round(percentage)))

          }

    })

      single_family_sales.forEach(function(r){if (r.Municipality===d.properties.NAME10){
        svg.select('.label_2').text('% Voted:' + " $" + r['2019'])

        svg.select('.bar_2') .transition()
        .duration(700).ease(d3.easeElastic).attr('width', yPriceScale(r['2019'].replace('$','').replace( new RegExp(',','g'),'')))


      }
    })

      housing.forEach(function(r){if (r.Town===d.properties.NAME10){


        svg.select('.label_3').text("D: % Applied" + " " + Math.round(100*parseFloat(r['Government Assisted'].replace( new RegExp(',','g'),''))/parseFloat(r['Total Housing Units 2010 Census'].replace( new RegExp(',','g'),''))))
        svg.select('.bar_3')
        .transition()
        .duration(700)
        .ease(d3.easeElastic).attr('width', yPositionScale2(100*parseFloat(r['Government Assisted'].replace( new RegExp(',','g'),''))/parseFloat(r['Total Housing Units 2010 Census'].replace( new RegExp(',','g'),''))))

        svg.select('.label_4').text("D: % Voted" + " " + Math.round(100*parseFloat(r['Tenant Rental Assistance'].replace( new RegExp(',','g'),''))/parseFloat(r['Total Housing Units 2010 Census'].replace( new RegExp(',','g'),''))))
        svg.select('.bar_4')
        .transition()
        .duration(700)
        .ease(d3.easeElastic).attr('width', yPositionScale2(100*parseFloat(r['Tenant Rental Assistance'].replace( new RegExp(',','g'),''))/parseFloat(r['Total Housing Units 2010 Census'].replace( new RegExp(',','g'),''))))

      }
    })
        // svg.select('.town_name').text(d.properties.NAME10)


   
        datapoints4.forEach(function(r){

          if (r['name']===d.properties.NAME10){
            data_moused_over = (r['data'])
            console.log(data_moused_over)
        }
      })


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

                  colorVar = colorScale(parseFloat(r['Reg_Voters'])/1000)
        
                }
              })  

                return colorVar
            })

      })

      d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

    d3.select("#selectButton")
    .selectAll('myOptions')
     .data(datapoints3)
    .enter()
    .append('option')
    .text(function (d) { return d.date; }) // text showed in the menu
    .attr("value", function (d) { return d.date; })



    function update(selectedGroup) {
      console.log(data_moused_over)

      data_moused_over.forEach()
      
      if (selectedGroup === '10-3'){
        svg.select("#changing_percentage").text(selectedGroup + '')
      }
      // Create new data with the selection?
      // var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

      // // Give these new data to update line
      // line
      //     .datum(dataFilter)
      //     .transition()
      //     .duration(1000)
      //     .attr("d", d3.line()
      //       .x(function(d) { return x(+d.time) })
      //       .y(function(d) { return y(+d.value) })
      //     )
      //     .attr("stroke", function(d){ return myColor(selectedGroup) })
    }


    function getText( obj ) {
      return obj.textContent ? obj.textContent : obj.innerText;
  }

    d3.select("#selectButton").on("change", function(d) {
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value")
      // run the updateChart function with this selected option

      update(selectedOption)
  })

      d3.select('#toggle2').on('click', () => {
        svg.selectAll('.towns').attr('fill', function(d){
        var colorVar=0 


        voters.forEach(function(r){
          if (r.Town===d.properties.NAME10){
        // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
        colorVar = colorScale2(100*parseFloat(r['Total ABs Processed'])/parseFloat(r['Reg_Voters']))

      }
})

      return colorVar
    })  

    })



    function render() {
      const svgContainer = svg.node().closest('div')
      const svgWidth = svgContainer.offsetWidth
      // Do you want it to be full height? Pick one of the two below
      const svgHeight = height + margin.top + margin.bottom
      // const svgHeight = window.innerHeight
  
      const actualSvg = d3.select(svg.node().closest('svg'))
      actualSvg.attr('width', svgWidth).attr('height', svgHeight)
  
      const newWidth = svgWidth - margin.left - margin.right
      const newHeight = svgHeight - margin.top - margin.bottom


      yPositionScale.range([0,0.4*newWidth])
      yPositionScale2.range([0,0.4*newWidth])
      yPriceScale.range([0,0.4*newWidth])

      svg.selectAll('.housing_stock').attr('x', newWidth/35)

      // labels

      svg.select('.town_name').text('Click on the map!')
     
       svg.select('.housing_stock').text('ABSENTEE BALLOTS: TOWN VS STATE').attr('x', svgWidth/35).attr('y',-90).attr('font-weight', 5)
       svg.select('.demo').text('DEMOGRAPHICS: TOWN vs STATE').attr('x', width/35).attr('y',125).attr('font-weight', 5)
      svg.select('#median-sf').attr('x', yPositionScale(80))
      svg.select('#median-price').attr('x', yPositionScale(80)+0.4*newWidth+35)
      svg.select('#median-sub').attr('x', yPositionScale(80))
      svg.select('#median-voucher').attr('x', yPositionScale(80)+0.4*newWidth+35)
      svg.select('#median-black').attr('x', yPositionScale(80))
      svg.select('#median-hisp').attr('x', yPositionScale(80)+0.4*newWidth+35)


    svg.select('.label_1').attr('x', newWidth/35).text('% AB App Received')
      svg.select('.label_3').attr('x', newWidth/35).text('D: % AB App Received')
    svg.select('.label_5').attr('x', newWidth/35).text('R: % AB App Received')

    svg.select('.label_2').attr('x', 0.4*newWidth+60).text('% AB Received')
      svg.select('.label_4').attr('x', 0.4*newWidth+60).text('D: % AB Received')
      svg.select('.label_6').attr('x', 0.4*newWidth+60).text('R: % AB Received')
   
   // bar_1  
   svg.select('.bar_1_town_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
   svg.select('.bar_1_state_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
   svg.select('.bar_1_state').attr("x", newWidth/35).attr('width', yPositionScale(64.4))
   svg.select('.bar_1').attr("x", newWidth/35).attr('width', 0)
   
   // bar_2    

   svg.select('.bar_2_state_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
   svg.select('.bar_2_town_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
   svg.select('.bar_2_state').attr("x", 0.4*newWidth+60).attr('width', yPriceScale(253241))
   svg.select('.bar_2').attr("x", 0.4*newWidth+60).attr('width', 0)

   // bar_3  
   
   
   svg.select('.bar_3_town_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
   svg.select('.bar_3_state_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
   svg.select('.bar_3').attr("x", newWidth/35).attr('width', 0)
   svg.select('.bar_3_state').attr("x", newWidth/35).attr('width', yPositionScale2(2.2))

   // bar_4    


   svg.select('.bar_4_town_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
   svg.select('.bar_4_state_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
   svg.select('.bar_4_state').attr("x", 0.4*newWidth+60).attr('width', yPositionScale2(0.21))
   svg.select('.bar_4').attr("x", 0.4*newWidth+60).attr('width', 0)

   // bar_5    

   svg.select('.bar_5_town_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
   svg.select('.bar_5_state_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
   svg.select('.bar_5').attr("x", newWidth/35).attr('width', 0)
   svg.select('.bar_5_state').attr("x", newWidth/35).attr('width', yPositionScale(10))

   // bar_6    

      svg.select('.bar_6_town_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
      svg.select('.bar_6_state_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
      svg.select('.bar_6_state').attr("x", 0.4*newWidth+60).attr('width', yPositionScale(16))
      svg.select('.bar_6').attr("x", 0.4*newWidth+60).attr('width', 0)
      
      svg.select('#box1-text').text('0').attr('x',newWidth-150).attr('y', height-150).attr('font-size', 10)
      svg.select('#box4-text').text('100').attr('x',newWidth-65).attr('y', height-150).attr('font-size', 10)

      svg.select('#box1').attr('x', newWidth-150)
      svg.select('#box2').attr('x', newWidth-125)
      svg.select('#box3').attr('x', newWidth-100)
      svg.select('#box4').attr('x', newWidth-75)

    }


    window.addEventListener('resize', render)

    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render()
    }
