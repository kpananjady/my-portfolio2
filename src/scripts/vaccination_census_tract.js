import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 150, left: 50, right: 50, bottom: 200 }

let height = 800 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

var centered;
var active;


let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  const projection = d3.geoMercator()
  .scale(width*17)
            .center([-72.68, 41.5])
            .translate([(width) / 2, (height)/2]);
const path = d3.geoPath().projection(projection)

const tip = d3
.tip()
.attr('class', 'd3-tip d3-tip-scrolly')
.style('pointer-events', 'none')
.offset([-10, 0])
.html(function(d) {
  return `${d.properties.NAME10}`
})

const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([30, 100])
const colorScale1 = d3.scaleSequential(d3.interpolateOranges).domain([0, 50])

const colorScale2 =  d3.scaleSequential(d3.interpolateBlues).domain([0, 1000000])

svg.call(tip)

function click(d) {

    if (active === d) return reset();
   svg.selectAll(".active").classed("active", false);
   d3.select("#"+d.properties.name).classed("active", active = d); // changed selection to id
   
   var b = path.bounds(d);

   svg.transition().duration(750).attr("transform",
       "translate(" + projection.translate() + ")"
       + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
       + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
}

function reset() {  

    svg.selectAll(".active").classed("active", active = false);
    svg.transition().duration(750).attr("transform", "");
}

 
Promise.all([
    d3.json(require('/data/ct_towns_simplified.topojson')),
    d3.json(require('/data/tracts_ct.topojson')),
    d3.csv(require('/data/tract_map_dec_2017.csv')),
    d3.csv(require('/data/income_acs.csv')),
    d3.csv(require('/data/race_acs.csv')),
    d3.csv(require('/data/income_acs_2.csv')),
    d3.csv(require('/data/vaxx_rate.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))


  function ready([json2, json, internet, income, race, income2, vaxx]) {

    const income_values = income2.map(d => d.B19301_001E)
    var income_array = d3.timeDays(d3.min(income_values), d3.max(income_values))
    income_array.push(d3.max(income_values))
    
    // console.log(dates_array[dates_array.length-1], 'this')
    
    
    //xPositionScale.domain(dates_array)
    colorScale2.domain([0,d3.max(income_values)])
    // svg.append('text').attr('class', 'title').text('See how internet access compares in your town').attr('alignment-baseline', 'middle').attr('y',-90).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)
    // svg.append('text').attr('class', 'sub-title').text('How many households in every 1,000 have good connections').attr('alignment-baseline', 'middle').attr('y',-65).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)


    
    const tract = topojson.feature(json, json.objects.tracts_ct)

      const towns = topojson.feature(json2, json2.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84)

      var tracts = svg
      .selectAll('path-tract')
      .data(tract.features)
      .enter()
      .append('path')
      .attr('class', 'tracts')
      .attr('d', path)
      .attr('fill', function(d){
        // console.log(d.properties.geoid)
        var color = 0
        vaxx.forEach(function(r){if (r.GEOID10===d.properties.geoid){
            color = colorScale(r.Cov_16Plus)
            }
        })

          return color
      })  
      .attr('stroke', 'none')  
      .attr('opacity', 0.7)

      var towns2 = svg
      .selectAll('path-town')
      .data(towns.features)
      .enter()
      .append('path')
      .attr('class', 'towns')
      .attr('d', path)
      .style('fill', 'white')  
      .attr('stroke', 'white')  
      .attr('stroke-width', 1)  
      .attr('opacity',0.3)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
    //   .on('click', function (d) { click(d); })

    var zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on('zoom', function() {
        svg.selectAll('path')
         .attr('transform', d3.event.transform);
});

svg.call(zoom);


d3.select('#toggle3').on('click', () => {
  svg.selectAll('.tracts')    .attr('fill', function(d){
    // console.log(d.properties.geoid)
    var color = 0
    vaxx.forEach(function(r){if (r.GEOID10===d.properties.geoid){
        color = colorScale(r.Cov_16Plus)
        }
    })
    return color

  })

})
      
d3.select('#toggle').on('click', () => {
  svg.selectAll('.tracts').attr('fill', function(d){
    // console.log(d.properties.geoid)
    var color = 0
    income2.forEach(function(r){if (r.GEO_ID===d.properties.geoid){
      //  color = colorScale2(r.S1901_C01_012E)
   //   B19301_001E
          color = colorScale2(r.B19301_001E)

        }
    })
    return color

  })



  
})

d3.select('#toggle2').on('click.blahblah', () => {
  // console.log('the code is here')
  svg.selectAll('.title').text("This title has changed when I have clicked it").attr('alignment-baseline', 'middle').attr('y',45).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)

  svg.selectAll('.tracts').attr('fill', function(d){
    // console.log(d.properties.geoid)
    var color = 0
    race.forEach(function(r){if (r.GEO_ID===d.properties.geoid){
        // console.log(r.DP05_0077PE)
        color = colorScale1(100-r.DP05_0077PE)
        }
    })
    return color

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

      

        if (newWidth > 500) {

            svg.selectAll('.title').attr('font-size', '20px')
            svg.selectAll('.sub-title').attr('font-size', '15px')


            console.log(newWidth, 'newWidth 1')
            projection
            .scale(newWidth*25)
            .center([-72.68, 41])
            .translate([(newWidth) / 2, (newHeight)/2]);

            svg.selectAll('.towns')
        .attr('d', path)


        svg.selectAll('.tracts')
        .attr('d', path)

        
  
          } else if (newWidth > 450){
  

            projection
          .scale(newWidth*20)
          .center([-72.68, 41])
  
          .translate([(newWidth) / 2, (newHeight)/2]);

          svg.selectAll('.towns')
        .attr('d', path)

        svg.selectAll('.tracts')
        .attr('d', path)


          } else if (newWidth > 350) {

            svg.selectAll('.title').attr('font-size', '15px')
            svg.selectAll('.sub-title').attr('font-size', '10px')
  
            console.log(newWidth, 'newWidth 3')
            projection
            .center([-72.68, 40.7])
            .scale(newWidth*28)
            .translate([(newWidth) / 2, (newHeight)/2]);

            svg.selectAll('.towns')
        .attr('d', path)

        svg.selectAll('.tracts')
        .attr('d', path)

          }
          
          else if (newWidth > 250) {

            svg.selectAll('.title').attr('font-size', '15px')
            svg.selectAll('.sub-title').attr('font-size', '10px')
  
            console.log(newWidth, 'newWidth 3')
            projection
            .center([-72.68, 40.3])
            .scale(newWidth*28)
            .translate([(newWidth) / 2, (newHeight)/2]);

            svg.selectAll('.towns')
        .attr('d', path)

        svg.selectAll('.tracts')
        .attr('d', path)


          }
          
          
          else {

  
            
            projection
            .scale(svgWidth*25)
            .center([-72.4, 40.4])
            .translate([(svgWidth) / 2, (svgHeight)/2]);

            svg.selectAll('.towns')
        .attr('d', path)

        svg.selectAll('.tracts')
        .attr('d', path)

          }  

          
    }
    window.addEventListener('resize', render)

    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render()
  }