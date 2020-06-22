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
    .center([-72.68, 41.95])
    .scale(width*20)
    .translate([(width) / 2, (height)/2]);
const path = d3.geoPath().projection(projection)

var yPositionScale = d3.scaleLinear()
            .range([0, 0.4*width])
            .domain([0, 100]);





const colorScale = d3.scaleSequential(d3.interpolateOranges).domain([0, 100])


d3.json('data/Town_Boundary_Index_Map.geojson', function(err, data){
  var geojson = geo2rect.compute(data);
});

Promise.all([
    d3.json(require('/data/Town_Boundary_Index_Map.geojson')),
    d3.json(require('/data/ct_towns_simplified.topojson')),
    d3.csv(require('/data/race_by_town_ct.csv')),
    d3.csv(require('/data/affordable_housing.csv')),
    d3.csv(require('/data/2018_ACS_Housing - Sheet1.csv')),
    d3.csv(require('/data/Median_Sales_Prices_by_Year_and_Municipality.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))




function ready([json, json2, race, housing, single_family, single_family_sales]) {
    
    const towns = topojson.feature(json2, json2.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84)
    console.log(towns, 'towns')

// towns
         svg.append('text').attr('class', 'town_name').text('Hover on the towns below!').attr('alignment-baseline', 'middle').attr('y',-140).attr('font-size', '30px').attr('font-weight', 5)
       
         svg.append('text').attr('class', 'housing_stock').text('HOUSING STOCK: TOWN vs STATE AVERAGES').attr('x', width/35).attr('y',-90).attr('font-weight', 5)
         svg.append('text').attr('class', 'housing_stock').text('DEMOGRAPHICS: TOWN vs STATE AVERAGES').attr('x', width/35).attr('y',130).attr('font-weight', 5)


         svg.append('text').attr('class', 'label_1').text('% Single Family Homes').attr('x', width/35).attr('y',-65).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_3').text('% Government Assisted').attr('x', width/35).attr('y',30).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_5').text('% Black').attr('x', width/35).attr('y',155).attr('font-weight', 5)

         svg.append('text').attr('class', 'label_2').text('Median Sale Price').attr('x', 0.4*width+35).attr('y',-65).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_4').text('% Deed Restricted').attr('x', 0.4*width+35).attr('y',30).attr('font-weight', 5)
         svg.append('text').attr('class', 'label_6').text('% Hispanic').attr('x', 0.4*width+35).attr('y',155).attr('font-weight', 5)


        //  svg.append('circle').attr('r', 6).attr('fill', colorScale('Exempt')).attr('cx', 3*width/4).attr('cy',height-100)

        //  svg.append('circle').attr('r', 6).attr('fill', colorScale('Non-Exempt')).attr('cx', width/2).attr('cy',height-100)

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
         .attr('fill', '#E9967A')

         svg
         .append('rect')
         .attr('class', 'bar_1')
         .attr("y",-55
         )
         .attr("height", 20)
         .attr("x", width/35)
         .attr("width",0)
         .attr('fill', '#B22222')
         .attr('rx',10)
         .attr('ry',10)
         
   
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
         .attr("width",yPositionScale(90))
         .attr('fill', 'grey')
         .attr('rx',10)
         .attr('ry',10)

//bar_2

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
         .attr('class', 'bar_2')
         .attr("y",-55
         )
         .attr("height", 20)
         .attr("x",0.4*width+35)
         .attr("width",0)
         .attr('fill', '#B22222')
         .attr('rx',10)
         .attr('ry',10)
   
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
         .attr("width",yPositionScale(90))
         .attr('fill', 'grey')
         .attr('rx',10)
         .attr('ry',10)

//bar_4         
         svg
         .append('rect')
         .attr('class', 'bar_4_town_100')
         .attr("y",40
         )
         .attr("height", 20)
         .attr("x", 0.4*width+35)
         .attr("width",0.4*width)
         .attr('fill', '#E9967A')
         .attr('rx',10)
         .attr('ry',10)

         svg
         .append('rect')
         .attr('class', 'bar_4')
         .attr("y",40
         )
         .attr("height", 20)
         .attr("x",0.4*width+35)
         .attr("width",0)
         .attr('fill', '#B22222')
         .attr('rx',10)
         .attr('ry',10)

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
         .attr("width",yPositionScale(90))
         .attr('fill', 'grey')
         .attr('rx',10)
         .attr('ry',10)


        
//bar_3
         svg
         .append('rect')
         .attr('class', 'bar_3_town_100')
         .attr("y",40
         )
         .attr("height", 20)
         .attr("x", width/35)
         .attr("width",0.4*width)
         .attr('fill', '#E9967A')
         .attr('rx',10)
         .attr('ry',10)
   
         svg
         .append('rect')
         .attr('class', 'bar_3')
         .attr("y",40)
         .attr("height", 20)
         .attr("x", width/35)
         .attr("width",0)
         .attr('fill', '#B22222')
         .attr('rx',10)
         .attr('ry',10)
         
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
         .attr("width",yPositionScale(90))
         .attr('fill', 'grey')
         .attr('rx',10)
         .attr('ry',10)

//bar_5

         svg
         .append('rect')
         .attr('class', 'bar_5_town_100')
         .attr("y",165
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
         .attr("y",165
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
         .attr("y",195
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
         .attr("y",195
         )
         .attr("height", 20)
         .attr("x",width/35)
         .attr("width",yPositionScale(10))
         .attr('fill', 'grey')
         .attr('rx',10)
         .attr('ry',10)

//bar_6   
         svg
         .append('rect')
         .attr('class', 'bar_6_state_100')
         .attr("y",195)
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
        .attr("y",165)
        .attr("height", 20)
        .attr("x", 0.4*width +35)
        .attr("width",0.4*width)
        .attr('fill', '#E9967A')
        .attr('rx',10)
        .attr('ry',10)

        svg
        .append('rect')
        .attr('class', 'bar_6')
        .attr("y",165)
        .attr("height", 20)
        .attr("x", 0.4*width +35)
        .attr("width",0)
        .attr('fill', '#B22222')
        .attr('rx',10)
        .attr('ry',10)

      

         svg
         .append('rect')
         .attr('class', 'bar_6_state')
         .attr("y",195)
         .attr("height", 20)
         .attr("x", 0.4*width+35)
         .attr("width",yPositionScale(16))
         .attr('fill', 'grey')
         .attr('rx',10)
         .attr('ry',10)

   
         
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
         

        race.forEach(function(r){if (r.Name_to_join===d.properties.NAME10){
          // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
          colorVar = colorScale(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))

        }
      })  
  
        return colorVar

    })
      .attr('stroke', 'lightgrey')
      .on('mouseover', function(d) {
        d3.select(this).attr('opacity', '0.5')

          svg.select('.town_name').text(d.properties.NAME10)
          race.forEach(function(r){if (r.Name_to_join===d.properties.NAME10){
// black            
            svg.select('.label_5').text('% Black' + " " + r['Black alone'])
            svg.select('.bar_5') .transition()
            .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(r['Black alone']))

// hispanic
            svg.select('.label_6').text('% Hispanic' + " " + r['Hispanic'])

            svg.select('.bar_6') .transition()
            .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(r['Hispanic']))

            }

        })
// affordable
      //   housing.forEach(function(r){if (r.Town===d.properties.NAME10){
      //     svg.select('.label_5').text('% Affordable' + " " + r['Percent Affordable'])
      //     svg.select('.bar_5')
      //     .transition()
      //     .duration(700)
      //     .ease(d3.easeElastic).attr('width', yPositionScale(r['Percent Affordable']))

      //   }
      // })
    }).on('mouseout', function(d){
      d3.select(this).attr('opacity', '1')
    })
    .on('click', function(d) {
      d3.select(this).attr('opacity', '0.5')

        svg.select('.town_name').text(d.properties.NAME10)
        race.forEach(function(r){if (r.Name_to_join===d.properties.NAME10){
// black            
          svg.select('.label_5').text('% Black' + " " + r['Black alone'])
          svg.select('.bar_5') .transition()
          .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(r['Black alone']))

// hispanic
          svg.select('.label_6').text('% Hispanic' + " " + r['Hispanic'])

          svg.select('.bar_6') .transition()
          .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(r['Hispanic']))

          }

      })
// affordable
    //   housing.forEach(function(r){if (r.Town===d.properties.NAME10){
    //     svg.select('.label_5').text('% Affordable' + " " + r['Percent Affordable'])
    //     svg.select('.bar_5')
    //     .transition()
    //     .duration(700)
    //     .ease(d3.easeElastic).attr('width', yPositionScale(r['Percent Affordable']))

    //   }
    // })
  })
      .raise()


      // housing.forEach(function(r){if (r.Town===d.properties.NAME10){
      //   console.log(r['Status'])
      //     colorVar = colorScale(r['Percent Affordable'])
      //     }
      // }) 
      d3.select('#toggle').on('click', () => {
        d3.select('#toggle').attr('fill', 'grey')
        svg.selectAll('.towns').attr('fill', function(d){
          var colorVar=0 
            housing.forEach(function(r){if (r.Town===d.properties.NAME10){
            colorVar = colorScale(r['Percent Affordable'])
          }
      }) 
          return colorVar 
        })
      })

      d3.select('#toggle2').on('click', () => {
        svg.selectAll('.towns').attr('fill', function(d){
          var colorVar=0 
          race.forEach(function(r){if (r.Name_to_join===d.properties.NAME10){
            // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
            colorVar = colorScale(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
  
          }
        })  
          return colorVar 
        })
      })


// resize function
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


        svg.selectAll('.housing_stock').attr('x', newWidth/35)

        // labels

      svg.select('.label_1').attr('x', newWidth/35)
        svg.select('.label_3').attr('x', newWidth/35)
      svg.select('.label_5').attr('x', newWidth/35)

      svg.select('.label_2').attr('x', 0.4*newWidth+60)
        svg.select('.label_4').attr('x', 0.4*newWidth+60)
        svg.select('.label_6').attr('x', 0.4*newWidth+60)
     
     // bar_1  
     svg.select('.bar_1_town_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
     svg.select('.bar_1_state_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
     svg.select('.bar_1_state').attr("x", newWidth/35).attr('width', yPositionScale(90))
     svg.select('.bar_1').attr("x", newWidth/35)
     
     // bar_2    

     svg.select('.bar_2_state_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
     svg.select('.bar_2_town_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
     svg.select('.bar_2_state').attr("x", 0.4*newWidth+60).attr('width', yPositionScale(90))
     svg.select('.bar_2').attr("x", 0.4*newWidth+60)

     // bar_3  
     
     
     svg.select('.bar_3_town_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
     svg.select('.bar_3_state_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
     svg.select('.bar_3').attr("x", newWidth/35)
     svg.select('.bar_3_state').attr("x", newWidth/35).attr('width', yPositionScale(90))

     // bar_4    


     svg.select('.bar_4_town_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
     svg.select('.bar_4_state_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
     svg.select('.bar_4_state').attr("x", 0.4*newWidth+60).attr('width', yPositionScale(90))
     svg.select('.bar_4').attr("x", 0.4*newWidth+60)

     // bar_5    

     svg.select('.bar_5_town_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
     svg.select('.bar_5_state_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
     svg.select('.bar_5').attr("x", newWidth/35)
     svg.select('.bar_5_state').attr("x", newWidth/35).attr('width', yPositionScale(10))

     // bar_6    

        svg.select('.bar_6_town_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
        svg.select('.bar_6_state_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
        svg.select('.bar_6_state').attr("x", 0.4*newWidth+60).attr('width', yPositionScale(16))
        svg.select('.bar_6').attr("x", 0.4*newWidth+60)
        

      // projection 

        if (newWidth > 500) {

          console.log(newWidth, 'newWidth 1')
        projection
        .scale(newWidth*20)
        .translate([(newWidth) / 2, (newHeight)/2]);

        } else if (newWidth > 450){
          console.log(newWidth, 'newWidth 2')

          projection
        .scale(newWidth*20)
        .translate([(newWidth) / 2, (newHeight)/2]);
        }
        
        else {

          console.log(newWidth, 'newWidth 3')
          projection
          .scale(newWidth*30)
          .translate([(newWidth) / 2, (newHeight)/2]);
        }
        
        svg.selectAll('.towns')
        .attr('d', path)
 
        svg.select('.towns')
        .on('mouseover', function(d) {

          svg.select('.town_name').text(d.properties.NAME10)


          race.forEach(function(r){if (r.Name_to_join===d.properties.NAME10){
            svg.select('.bar_5') .transition()
            .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(r['Black alone']))

            svg.select('.bar_6') .transition()
            .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(r['Hispanic']))

            }
          //   housing.forEach(function(r){if (r.Town===d.properties.NAME10){
          //     svg.select('.bar_5_town')
          //     .transition()
          //     .duration(700)
          //     .ease(d3.easeElastic).attr('width', yPositionScale(r['Percent Affordable']))
    
          //   }
          // })

          })

        })
      }
      window.addEventListener('resize', render)

      // And now that the page has loaded, let's just try
      // to do it once before the page has resized
      render()
    }