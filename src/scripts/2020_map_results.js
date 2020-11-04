
import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 100, left: 50, right: 50, bottom: 0 }

let height = 600 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([-10, 10])

let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  const projection = d3.geoMercator()
  .scale(width*17)
            .center([-72.68, 41.1])
            .translate([(width) / 2, (height)/2]);
const path = d3.geoPath().projection(projection)

const tip = d3
.tip()
.attr('class', 'd3-tip d3-tip-scrolly')
.style('pointer-events', 'none')
.offset([-10, 0])
.html(function(d) {

  var i=1;

  var string_return = `${d.properties.newName}<br>`

  for (i=1; i < d.properties[0] + 1; i++){
    if (d.properties[i].includes('Democratic')){
      string_return = string_return +`<span style='color:lightgrey'>${d.properties[i]},  <span style='color:lightblue'>${d.properties[`${i}_pct`]}% <br>`

    } else if (d.properties[i].includes('Republican')){
      string_return = string_return +`<span style='color:lightgrey'>${d.properties[i]},  <span style='color:pink'>${d.properties[`${i}_pct`]}% <br>`

    }else if (d.properties[i].includes('Working')){
      string_return = string_return +`<span style='color:lightgrey'>${d.properties[i]},  <span style='color:lightblue'>${d.properties[`${i}_pct`]}% <br>`

    }else if (d.properties[i].includes('Trump')){
      string_return = string_return +`<span style='color:lightgrey'>${d.properties[i]},  <span style='color:pink'>${d.properties[`${i}_pct`]}% <br>`

    }else if (d.properties[i].includes('Biden')){
      string_return = string_return +`<span style='color:lightgrey'>${d.properties[i]},  <span style='color:lightblue'>${d.properties[`${i}_pct`]}% <br>`

    }
    else {
    string_return = string_return +`<span style='color:lightgrey'>${d.properties[i]},  <span style='color:#FFE4B5'>${d.properties[`${i}_pct`]}% <br>`
    }

  }

 return string_return  

})




svg.call(tip)

Promise.all([
    d3.json(require('/data/ct_towns_simplified.topojson')),
    d3.csv(require('/data/this_is_it_really.csv')),
    d3.json(require('/data/ct_congressional_districts.json')),
    d3.json(require('/data/ct_house_districts.json')),
    d3.json(require('/data/ct_state_senate.json')),
    d3.csv(require('/data/datapoints_options.csv')),
    d3.csv(require('/data/election_2020/us_house.csv')),
    d3.csv(require('/data/election_2020/ct_state_senate.csv')),
    d3.csv(require('/data/election_2020/ct_state_house.csv')),
    d3.csv(require('/data/election_2020/presidential.csv')),
    d3.csv(require('/data/election_2020/pres_turnout.csv'))


  ]).then(ready)
  .catch(err => console.log('Failed on', err))

  function ready([json2, datapoints, d2, d_house, d_senate, datapoints3, us_house_data, ct_state_senate, ct_state_house, presidential, turnout]) {

    const towns = topojson.feature(json2, json2.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84)

    var towns2 = svg
    .selectAll('path-town')
    .data(towns.features)
    .enter()
    .append('path')
    .attr('class', 'path-town')
    .attr('d', path)
    // .attr('fill', 'grey')  
    .attr('fill', function(d){            


      var dem_vote = 0;
      var rep_vote=0;
      presidential.forEach( function(r) {if (r['Town Name']===d.properties.NAME10){


        if (r['variable'].includes("Biden")){
          console.log('dems')
          console.log((100*r['value']/r['Vote Totals']).toFixed(2))
          dem_vote = dem_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
        } else if (r['variable'].includes("Trump")){
          rep_vote = rep_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
        }
        // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))
       }


      }) 

      console.log(dem_vote)
      console.log(parseFloat(dem_vote)-parseFloat(rep_vote))
      return colorScale(parseFloat(dem_vote)-parseFloat(rep_vote))

    })
    .attr('stroke', 'white')  
    .on('mouseover', function(d){
      var counter = 0

      presidential.forEach( function(r) {if (r['Town Name']===d.properties.NAME10){
        counter = counter +1 
        // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))
  
        d.properties[counter] = r['variable']
        d.properties[`${counter}_pct`]=(100*r['value']/r['Vote Totals']).toFixed(2)
        console.log(d.properties[`${counter}_pct`])
        // d.properties.fid[counter] = r['value']
        // console.log(d.properties[counter] )
        // console.log(d.properties[1])
       }
      })
      d.properties[0] = counter

      turnout.forEach(function(r) {if (r['Town']===d.properties.NAME10){

        if (r['Total Precincts'] != 0){
        d.properties.newName = d.properties.NAME10 + ': ' + r['Reported'] + ' of ' + r['Total Precincts'] + ' reporting'
        } else {
          d.properties.newName = d.properties.NAME10 

        }
      }
      })
      tip.show.call(this, d)
  
      // d3.select(this).attr('stroke', 'white').attr('opacity','0.5')
  })
  .on('click', function(d){
    var counter = 0

    presidential.forEach( function(r) {if (r['Town Name']===d.properties.NAME10){
      counter = counter +1 
      // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))

      d.properties[counter] = r['variable']
      d.properties[`${counter}_pct`]=(100*r['value']/r['Vote Totals']).toFixed(2)
      console.log(d.properties[`${counter}_pct`])
      // d.properties.fid[counter] = r['value']
      // console.log(d.properties[counter] )
      // console.log(d.properties[1])
     }
    })
    d.properties[0] = counter

    turnout.forEach(function(r) {if (r['Town']===d.properties.NAME10){

      if (r['Total Precincts'] != 0){
      d.properties.newName = d.properties.NAME10 + ': ' + r['Reported'] + ' of ' + r['Total Precincts'] + ' reporting'
      } else {
        d.properties.newName = d.properties.NAME10 

      }
    }
    })
    tip.show.call(this, d)

    // d3.select(this).attr('stroke', 'white').attr('opacity','0.5')
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
        .text(function (d) { return d.race; }) // text showed in the menu
        .attr("value", function (d) { return d.race; })
    
    
    
        function update(selectedGroup) {

          if (selectedGroup==='Presidential Election'){

            svg.selectAll('.path-town').remove()

                
    var towns2 = svg
    .selectAll('path-town')
    .data(towns.features)
    .enter()
    .append('path')
    .attr('class', 'path-town')
    .attr('d', path)
    // .attr('fill', 'grey')  
       .attr('fill', function(d){            


      var dem_vote = 0;
      var rep_vote=0;
      presidential.forEach( function(r) {if (r['Town Name']===d.properties.NAME10){


        if (r['variable'].includes("Biden")){
          console.log('Biden')
          console.log('dems')
          console.log((100*r['value']/r['Vote Totals']).toFixed(2))
          dem_vote = dem_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
        } else if (r['variable'].includes("Trump")){
          rep_vote = rep_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
        }
        // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))
       }


      }) 

      console.log(dem_vote)
      console.log(parseFloat(dem_vote)-parseFloat(rep_vote))
      return colorScale(parseFloat(dem_vote)-parseFloat(rep_vote), 'colorScale')

    })
    .attr('stroke', 'white')  
    .on('mouseover', function(d){
      var counter = 0

      presidential.forEach( function(r) {if (r['Town Name']===d.properties.NAME10){
        counter = counter +1 
        // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))
  
        d.properties[counter] = r['variable']
        d.properties[`${counter}_pct`]=(100*r['value']/r['Vote Totals']).toFixed(2)
        console.log(d.properties[`${counter}_pct`])
        // d.properties.fid[counter] = r['value']
        // console.log(d.properties[counter] )
        // console.log(d.properties[1])
       }
      })
      d.properties[0] = counter

      turnout.forEach(function(r) {if (r['Town']===d.properties.NAME10){

        if (r['Total Precincts'] != 0){
        d.properties.newName = d.properties.NAME10 + ': ' + r['Reported'] + ' of ' + r['Total Precincts'] + ' reporting'
        } else {
          d.properties.newName = d.properties.NAME10 

        }
      }
      })
      tip.show.call(this, d)
  
      // d3.select(this).attr('stroke', 'white').attr('opacity','0.5')
  })
  .on('click', function(d){
    var counter = 0

    presidential.forEach( function(r) {if (r['Town Name']===d.properties.NAME10){
      counter = counter +1 
      // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))

      d.properties[counter] = r['variable']
      d.properties[`${counter}_pct`]=(100*r['value']/r['Vote Totals']).toFixed(2)
      console.log(d.properties[`${counter}_pct`])
      // d.properties.fid[counter] = r['value']
      // console.log(d.properties[counter] )
      // console.log(d.properties[1])
     }
    })
    d.properties[0] = counter

    turnout.forEach(function(r) {if (r['Town']===d.properties.NAME10){

      if (r['Total Precincts'] != 0){
      d.properties.newName = d.properties.NAME10 + ': ' + r['Reported'] + ' of ' + r['Total Precincts'] + ' reporting'
      } else {
        d.properties.newName = d.properties.NAME10 

      }
    }
    })
    tip.show.call(this, d)

    // d3.select(this).attr('stroke', 'white').attr('opacity','0.5')
})

          } else if (selectedGroup==='State Senate'){

            svg.selectAll('.path-town').remove()


      var senate_seats = svg
      .selectAll('path-town')
      .data(d_senate.features)
      .enter()
      .append('path')
      .attr('class', 'path-town')
      .attr('d', path)
      .attr('fill','grey')
    //   .attr('fill', function(d){            
    //     if (parseFloat(d.properties.name)<10){
    //       var name_and_number = "State Senator 0" + d.properties.name
    //       } else {
    //         var name_and_number = "State Senator " + d.properties.name
    //         }
  

    //   var dem_vote = 0;
    //   var rep_vote=0;
    //   ct_state_senate.forEach( function(r) {if (r['Office Name']===name_and_number){


    //     if (r['variable'].includes("Democratic")){
    //       console.log('dems')
    //       console.log((100*r['value']/r['Vote Totals']).toFixed(2))
    //       dem_vote = dem_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
    //     } else if (r['variable'].includes("Working")){
    //       dem_vote = dem_vote + (100*r['value']/r['Vote Totals']).toFixed(2)

    //     } else if (r['variable'].includes("Republican")){
    //       rep_vote = rep_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
    //     }
    //     // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))
    //    }


    //   }) 

    //   console.log(dem_vote)
    //   console.log(parseFloat(dem_vote)-parseFloat(rep_vote))
    //   return colorScale(parseFloat(dem_vote)-parseFloat(rep_vote))

    // })
    .attr('stroke', 'white')  
    .on('mouseover', function(d){

      console.log(d)
      if (parseFloat(d.properties.name)<10){
        var name_and_number = "State Senator 0" + d.properties.name
        } else {
          var name_and_number = "State Senator " + d.properties.name
          }

    console.log(name_and_number)

  
    var counter = 0
    ct_state_senate.forEach( function(r) {if (r['Office Name']===name_and_number){
      counter = counter +1 
      // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))

      d.properties[counter] = r['variable']
      d.properties[`${counter}_pct`]=(100*r['value']/r['Vote Totals']).toFixed(2)
      console.log(d.properties[`${counter}_pct`])
      // d.properties.fid[counter] = r['value']
      // console.log(d.properties[counter] )
      // console.log(d.properties[1])
     }
    })
    d.properties[0] = counter
    d.properties.newName = name_and_number
    tip.show.call(this, d)


    })
    .on('click', function(d){

      console.log(d)
      if (parseFloat(d.properties.name)<10){
        var name_and_number = "State Senator 0" + d.properties.name
        } else {
          var name_and_number = "State Senator " + d.properties.name
          }

    console.log(name_and_number)

  
    var counter = 0
    ct_state_senate.forEach( function(r) {if (r['Office Name']===name_and_number){
      counter = counter +1 
      // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))

      d.properties[counter] = r['variable']
      d.properties[`${counter}_pct`]=(100*r['value']/r['Vote Totals']).toFixed(2)
      console.log(d.properties[`${counter}_pct`])
      // d.properties.fid[counter] = r['value']
      // console.log(d.properties[counter] )
      // console.log(d.properties[1])
     }
    })
    d.properties[0] = counter
    d.properties.newName = name_and_number
    tip.show.call(this, d)


    })

          } else if (selectedGroup==='State House'){

            svg.selectAll('.path-town').remove()

            var house_seats = svg
            .selectAll('path-town')
            .data(d_house.features)
            .enter()
            .append('path')
            .attr('class', 'path-town')
            .attr('d', path)
            .attr('fill','grey')
          //   .attr('fill', function(d){            
          //     if (parseFloat(d.properties.name)<10){
          //       var name_and_number = "State Representative 0" + d.properties.name
          //       } else {
          //         var name_and_number = "State Representative " + d.properties.name
          //         }

          //   var dem_vote = 0;
          //   var rep_vote=0;
          //   ct_state_house.forEach( function(r) {if (r['Office Name']===name_and_number){
      
      
          //     if (r['variable'].includes("Democratic")){
          //       console.log('dems')
          //       console.log((100*r['value']/r['Vote Totals']).toFixed(2))
          //       dem_vote = dem_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
          //     } else if (r['variable'].includes("Working")){
          //       dem_vote = dem_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
      
          //     } else if (r['variable'].includes("Republican")){
          //       rep_vote = rep_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
          //     }
          //     // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))
          //    }
      
      
          //   })     
            
          //   console.log(dem_vote)
          //   console.log(parseFloat(dem_vote)-parseFloat(rep_vote))
          //   return colorScale(parseFloat(dem_vote)-parseFloat(rep_vote))
          // }) 
          .attr('stroke', 'white')  
          .on('mouseover', function(d){

            console.log(d)
            if (parseFloat(d.properties.name)<10){
              var name_and_number = "State Representative 0" + d.properties.name
              } else {
                var name_and_number = "State Representative " + d.properties.name
                }
      
      
        
          var counter = 0
          ct_state_house.forEach( function(r) {if (r['Office Name']===name_and_number){
            counter = counter +1 
            // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))
      
            d.properties[counter] = r['variable']
            d.properties[`${counter}_pct`]=(100*r['value']/r['Vote Totals']).toFixed(2)
            console.log(d.properties[`${counter}_pct`])
            // d.properties.fid[counter] = r['value']
            // console.log(d.properties[counter] )
            // console.log(d.properties[1])
           }
          })
          d.properties[0] = counter
          d.properties.newName = name_and_number
          d.properties.fid = d.properties.name
          tip.show.call(this, d)
              // d3.select(this).attr('stroke', 'white').attr('opacity','0.5')
          })
          .on('click', function(d){

            console.log(d)
            if (parseFloat(d.properties.name)<10){
              var name_and_number = "State Representative 0" + d.properties.name
              } else {
                var name_and_number = "State Representative " + d.properties.name
                }
      
      
        
          var counter = 0
          ct_state_house.forEach( function(r) {if (r['Office Name']===name_and_number){
            counter = counter +1 
            // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))
      
            d.properties[counter] = r['variable']
            d.properties[`${counter}_pct`]=(100*r['value']/r['Vote Totals']).toFixed(2)
            console.log(d.properties[`${counter}_pct`])
            // d.properties.fid[counter] = r['value']
            // console.log(d.properties[counter] )
            // console.log(d.properties[1])
           }
          })
          d.properties[0] = counter
          d.properties.newName = name_and_number
          d.properties.fid = d.properties.name
          tip.show.call(this, d)
              // d3.select(this).attr('stroke', 'white').attr('opacity','0.5')
          })

          } else if (selectedGroup==='U.S. House'){

            svg.selectAll('.path-town').remove()


                  var cong_districts = svg
      .selectAll('path-town')
      .data(d2.features)
      .enter()
      .append('path')
      .attr('class', 'path-town')
      .attr('d', path) 
    .attr('stroke', 'white')  
    .on('mouseover', function(d){

        var name_and_number = "Representative in Congress 0" + d.properties.fid

        console.log(name_and_number)

      
        var counter = 0
        us_house_data.forEach( function(r) {if (r['Office Name']===name_and_number){
          counter = counter +1 
          // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))

          d.properties[counter] = r['variable']
          d.properties[`${counter}_pct`]=(100*r['value']/r['Vote Totals']).toFixed(2)
          console.log(d.properties[`${counter}_pct`])
          // d.properties.fid[counter] = r['value']
          // console.log(d.properties[counter] )
          // console.log(d.properties[1])
         }
        })
        d.properties[0] = counter
        d.properties.newName = name_and_number

        d.properties.name = d.properties.fid
        tip.show.call(this, d)

        // d3.select(this).attr('stroke', 'white').attr('opacity','0.5')
    })
    .on('click', function(d){

      var name_and_number = "Representative in Congress 0" + d.properties.fid

      console.log(name_and_number)

    
      var counter = 0
      us_house_data.forEach( function(r) {if (r['Office Name']===name_and_number){
        counter = counter +1 
        // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))

        d.properties[counter] = r['variable']
        d.properties[`${counter}_pct`]=(100*r['value']/r['Vote Totals']).toFixed(2)
        console.log(d.properties[`${counter}_pct`])
        // d.properties.fid[counter] = r['value']
        // console.log(d.properties[counter] )
        // console.log(d.properties[1])
       }
      })
      d.properties[0] = counter
      d.properties.newName = name_and_number

      d.properties.name = d.properties.fid
      tip.show.call(this, d)

      // d3.select(this).attr('stroke', 'white').attr('opacity','0.5')
  })
  .attr('fill','grey')
    // .attr('fill', function(d){
    //   var name_and_number = "Representative in Congress 0" + d.properties.fid

    //   var dem_vote = 0;
    //   var rep_vote=0;
    //   us_house_data.forEach( function(r) {if (r['Office Name']===name_and_number){


    //     if (r['variable'].includes("Democratic")){
    //       console.log('dems')
    //       console.log((100*r['value']/r['Vote Totals']).toFixed(2))
    //       dem_vote = dem_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
    //     } else if (r['variable'].includes("Working")){
    //       dem_vote = dem_vote + (100*r['value']/r['Vote Totals']).toFixed(2)

    //     } else if (r['variable'].includes("Republican")){
    //       rep_vote = rep_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
    //     }
    //     // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))
    //    }


    //   })     
      
    //   console.log(dem_vote)
    //   console.log(parseFloat(dem_vote)-parseFloat(rep_vote))
    //   return colorScale(parseFloat(dem_vote)-parseFloat(rep_vote))
    // }) 

          }

    }
    
  

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



      if (newWidth > 500) {

          console.log(newWidth, 'newWidth 1')
          projection
          .scale(newWidth*20)
          .center([-72.68, 40.9])
          .translate([(newWidth) / 2, (newHeight)/2]);

          svg.selectAll('.path-town')
      .attr('d', path)


  
      

        } else if (newWidth > 487){

        

          projection
        .scale(newWidth*26)
        .center([-72.68, 41])

        .translate([(newWidth) / 2, (newHeight)/2]);

        svg.selectAll('.path-town')
      .attr('d', path)

     
        } else if (newWidth >370) {

          console.log(newWidth, 'newWidth 3')
          projection
          .center([-72.68, 41])
          .scale(newWidth*30)
          .translate([(newWidth) / 2, (newHeight)/2]);

          svg.selectAll('.path-town')
      .attr('d', path)


        }
        else if (newWidth > 250) {

          console.log(newWidth, 'newWidth 3')
          projection
          .center([-72.68, 40.5])
          .scale(newWidth*28)
          .translate([(newWidth) / 2, (newHeight)/2]);

          svg.selectAll('.path-town')
      .attr('d', path)


        }
        else {
          console.log(newWidth, 'newWidth 4')


          svg.select('.school_name').attr('font-size', '15px')
          
          projection
          .scale(svgWidth*25)
          .center([-72.4, 40.4])
          .translate([(svgWidth) / 2, (svgHeight)/2]);

          svg.selectAll('.path-town')
      .attr('d', path)
        }
        
  }
  window.addEventListener('resize', render)

  // And now that the page has loaded, let's just try
  // to do it once before the page has resized
  render()
    // console.log(data_moused_over)
    // svg.select("#changing_percentage_2").text('In this town, X% of people like you returned their ballots.')
    // data_moused_over.forEach(function(r){  
    //   console.log(selectedGroup)
    //   console.log(r['DT MAILED '])
    //   if (selectedGroup===r['DT MAILED ']){
    //     console.log('matched')
    //     svg.select("#changing_percentage_2").text('In this town, ' + Math.round(r['percentage'])+'% of people like you returned their ballots.')
    // } 
  // })
    }