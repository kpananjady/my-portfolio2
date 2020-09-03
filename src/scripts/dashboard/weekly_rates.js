import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 100, left: 50, right: 50, bottom: 0 }

let height = 600 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right


const radiusScale = d3
  .scaleSqrt()
  .domain([0, 30])
  .range([2, 10])

let svg = d3
  .select('#chart-4')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  const projection = d3.geoMercator()
  .scale(width*20)
            .center([-72.68, 41.8])
            .translate([(width) / 2, (height)/2]);
const path = d3.geoPath().projection(projection)

const tip = d3
.tip()
.attr('class', 'd3-tip d3-tip-scrolly')
.style('pointer-events', 'none')
.offset([-10, 0])
.html(function(d) {
  return `${d['Town']} : ${d['Weekly rate']}`
})


svg.call(tip)

Promise.all([
    d3.json(require('/data/ct_towns_simplified.topojson')),
    d3.csv(require('/data/COVID-19_cases_in_community_settings_by_town_with_specimen_collection_or_onset_date_in_the_last_7_days.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))

  function ready([json2, datapoints]) {

    // svg.append('text').attr('class', 'school_name').text('Biden outpaces Trump in fundraising').attr('alignment-baseline', 'middle').attr('y',-50).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)

      const towns = topojson.feature(json2, json2.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84)
      console.log(towns, 'towns')


      var towns2 = svg
      .selectAll('path-town')
      .data(towns.features)
      .enter()
      .append('path')
      .attr('class', 'towns')
      .attr('d', path)
      .attr('fill', 'lightgrey')  
      .attr('stroke', 'white')  

      svg.selectAll("circle")
      .data(datapoints)
      .enter()
      .append("circle")
      .attr("class", "bubble bubble-biden")
      .attr("r", function(d){

        // console.log(radiusd['Weekly rate'])
        return radiusScale(+d['Weekly rate'])})
      .attr('fill', 'black')
      // using the map data
      // position a circle for matches in cd array
      .attr("cx", function(d) {
        for (var i = 0; i < towns2.data().length; i++){
           var p = towns2.data()[i];
          if (p.properties.NAME10 === d["Town"]){
              var t = path.centroid(p);
              console.log(t,'t')
              d.x = t[0];
              d.y = t[1];
              return d.x;
          } 
        }
      })
      .attr("cy", function(d){
        return d.y;
      })
      .attr('opacity', 0.5)
      .on('mouseover', tip.show)
      .on('click', tip.show)


    //   d3.select('#toggle').on('click', () => {

    //     svg.selectAll(".bubble")
    //      .attr("r", function(d){
    //       d['Property'] = 'RdlF ='
    //       d['Property_value'] = +d['Rocky_%']
    //      return radiusScale(+d['Rocky_%'] + +d['Uncommitted_%'])
    //     })
    //   .attr('fill', 'black')
    //   // using the map data
    //   // position a circle for matches in cd array
    //   .attr("cx", function(d) {
    //     for (var i = 0; i < towns2.data().length; i++){
    //        var p = towns2.data()[i];
    //       if (p.properties.NAME10 === d["NAME"]){
    //           var t = path.centroid(p);
    //           d.x = t[0];
    //           d.y = t[1];
    //           return d.x;
    //       } 
    //     }
    //   })
    //   .attr("cy", function(d){
    //     return d.y;
    //   })
    //   .attr('opacity', 0.5)
    //   .on('mouseover', tip.show)
    //   .on('click', tip.show)

    //   })


    //   d3.select('#toggle2').on('click', () => {

    //     svg.selectAll(".bubble")
    //   .attr("r", function(d){
    //   console.log(radiusScale(+d['Rocky_%']))

    //   d['Property'] = 'RdlF ='
    //   d['Property_value'] = +d['Rocky_%']

    //   return radiusScale(+d['Rocky_%'])
    //   })
    //   .attr('fill', 'red')
    //   // using the map data
    //   // position a circle for matches in cd array
    //   .attr("cx", function(d) {
    //     for (var i = 0; i < towns2.data().length; i++){
    //        var p = towns2.data()[i];
    //       if (p.properties.NAME10 === d["NAME"]){
    //           var t = path.centroid(p);
    //           d.x = t[0];
    //           d.y = t[1];
    //           return d.x;
    //       } 
    //     }
    //   })
    //   .attr("cy", function(d){
    //     return d.y;
    //   })
    //   .attr('opacity', 0.5)
    //   .on('mouseover', tip.show)
    //   .on('click', tip.show)

    //   })

    //   d3.select('#toggle3').on('click', () => {

    //     svg.selectAll(".bubble")
    //   .attr("r", function(d){ 
    //     d['Property'] = 'Uncommitted ='
    //     d['Property_value'] = +d['Uncommitted_%']

    //     return radiusScale(+d['Uncommitted_%'])})
    //   .attr('fill', 'grey')
    //   // using the map data
    //   // position a circle for matches in cd array
    //   .attr("cx", function(d) {
    //     for (var i = 0; i < towns2.data().length; i++){
    //        var p = towns2.data()[i];
    //       if (p.properties.NAME10 === d["NAME"]){
    //           var t = path.centroid(p);
    //           d.x = t[0];
    //           d.y = t[1];
    //           return d.x;
    //       } 
    //     }
    //   })
    //   .attr("cy", function(d){
    //     return d.y;
    //   })
    //   .attr('opacity', 0.5)
    //   .on('mouseover', tip.show)
    //   .on('click', tip.show)

    //   })

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
            .center([-72.68, 41])
            .translate([(newWidth) / 2, (newHeight)/2]);

            svg.selectAll('.towns')
        .attr('d', path)


        svg.selectAll('.bubble').attr("cx", function(d) {
        for (var i = 0; i < towns2.data().length; i++){
           var p = towns2.data()[i];
          if (p.properties.NAME10 === d["Town"]){
              var t = path.centroid(p);
              d.x = t[0];
              d.y = t[1];
              return d.x;
          } 
        }
      })
      .attr("cy", function(d){
        return d.y;
      })
        
  
          } else if (newWidth > 450){
  
            svg.select('.label_1').text('% Single Family')
            svg.select('.label_3').text('% Govt Subsidized')
            console.log(newWidth, 'newWidth 2')
  
            projection
          .scale(newWidth*26)
          .center([-72.68, 41])
  
          .translate([(newWidth) / 2, (newHeight)/2]);

          svg.selectAll('.towns')
        .attr('d', path)

        svg.selectAll('.bubble').attr("cx", function(d) {
            for (var i = 0; i < towns2.data().length; i++){
               var p = towns2.data()[i];
              if (p.properties.NAME10 === d["Town"]){
                  var t = path.centroid(p);
                  d.x = t[0];
                  d.y = t[1];
                  return d.x;
              } 
            }
          })
          .attr("cy", function(d){
            return d.y;
          })
          }
          
          else if (newWidth > 250) {
  
            console.log(newWidth, 'newWidth 3')
            projection
            .center([-72.68, 41])
            .scale(newWidth*28)
            .translate([(newWidth) / 2, (newHeight)/2]);

            svg.selectAll('.towns')
        .attr('d', path)


        svg.selectAll('.bubble').attr("cx", function(d) {
            for (var i = 0; i < towns2.data().length; i++){
               var p = towns2.data()[i];
              if (p.properties.NAME10 === d["Town"]){
                  var t = path.centroid(p);
                  d.x = t[0];
                  d.y = t[1];
                  return d.x;
              } 
            }
          })
          .attr("cy", function(d){
            return d.y;
          })
          }
          
          
          else {
            console.log(newWidth, 'newWidth 4')

  
            svg.select('.school_name').attr('font-size', '15px')
            
            projection
            .scale(svgWidth*25)
            .center([-72.4, 40.4])
            .translate([(svgWidth) / 2, (svgHeight)/2]);

            svg.selectAll('.towns')
        .attr('d', path)

        svg.selectAll('.bubble').attr("cx", function(d) {
            for (var i = 0; i < towns2.data().length; i++){
               var p = towns2.data()[i];
              if (p.properties.NAME10 === d["Town"]){
                  var t = path.centroid(p);
                  d.x = t[0];
                  d.y = t[1];
                  return d.x;
              } 
            }
          })
          .attr("cy", function(d){
            return d.y;
          })
          }  

          
    }
    window.addEventListener('resize', render)

    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render()
  }