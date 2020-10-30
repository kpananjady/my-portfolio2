
import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 100, left: 50, right: 50, bottom: 0 }

let height = 600 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right


let svg = d3
  .select('#chart-1')
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
  return `${d.properties.NAME10}: ${-1*Math.round(d['difference'])} percentage points`
})


// const colorScale = d3.scaleSequential(d3.interpolate("#B22222","#708090", "#0000e6")).domain([-40,0, 80])

// const colorScale = d3.scaleQuantile().range([d3.interpolate("#B22222","#708090", "#0000e6")]).domain([-40,0, 80])

const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([-40, 40])

svg.call(tip)

Promise.all([
    d3.json(require('/data/ct_towns_simplified.topojson')),
    d3.csv(require('/data/this_is_it_really.csv'))
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
      .attr('fill', function(d){
        var colorVar = 0;
         

        datapoints.forEach(function(r){if (r.Town===d.properties.NAME10){
          // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
          colorVar = colorScale(r['difference'])
          d['difference'] = r['difference']

        }
      })  
  
        return colorVar

      })  
      .attr('stroke', 'white')  
      .on('mouseover', function(d){
        tip.show.call(this, d)
        // d3.select(this).attr('stroke', 'black').attr('opacity','0.5')
    })

    svg.append('text').attr('id', 'box1-text').text('40').attr('x',width-220).attr('y', height-200).attr('font-size', 10)
    svg.append('text').attr('id', 'box4-text').text('-40').attr('x',width-55).attr('y', height-200).attr('font-size', 10)

  svg.append('text').attr('id', 'box4-text').text('80').attr('x',width-55).attr('y', height-200).attr('font-size', 10)
  svg.append('text').attr('id', 'under-box-text').attr('x',width-200).attr('y', height-180).attr('font-size', 10)


  svg.append('rect').attr('id', 'box1').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', height-200).attr('fill', colorScale(-40))
  svg.append('rect').attr('id', 'box2').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', height-200).attr('fill', colorScale(-20))
  svg.append('rect').attr('id', 'box3').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', height-200).attr('fill', colorScale(0))
  svg.append('rect').attr('id', 'box4').attr('width', 25).attr('height', 5).attr('x',width-75).attr('y', height-200).attr('fill', colorScale(20))
  svg.append('rect').attr('id', 'box5').attr('width', 25).attr('height', 5).attr('x',width-55).attr('y', height-200).attr('fill', colorScale(40))


     

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


      svg.select('#box1-text').attr('x',newWidth-150).attr('font-size', 10)
      svg.select('#box4-text').attr('x',newWidth-40).attr('font-size', 10)
      svg.select('#under-box-text').text('Trump V/L: Percentage Points').attr('x',newWidth-150).attr('font-size', 10)

      svg.select('#box1').attr('x', newWidth-150)
      svg.select('#box2').attr('x', newWidth-125)
      svg.select('#box3').attr('x', newWidth-100)
      svg.select('#box4').attr('x', newWidth-75)
      svg.select('#box5').attr('x', newWidth-50)
      svg.select('#box6').attr('x', newWidth-25)


        if (newWidth > 500) {

            console.log(newWidth, 'newWidth 1')
            projection
            .scale(newWidth*20)
            .center([-72.68, 40.9])
            .translate([(newWidth) / 2, (newHeight)/2]);

            svg.selectAll('.towns')
        .attr('d', path)


    
        
  
          } else if (newWidth > 487){
  
          
  
            projection
          .scale(newWidth*26)
          .center([-72.68, 41])
  
          .translate([(newWidth) / 2, (newHeight)/2]);

          svg.selectAll('.towns')
        .attr('d', path)

       
          } else if (newWidth >370) {

            console.log(newWidth, 'newWidth 3')
            projection
            .center([-72.68, 41])
            .scale(newWidth*30)
            .translate([(newWidth) / 2, (newHeight)/2]);

            svg.selectAll('.towns')
        .attr('d', path)


          }
          else if (newWidth > 250) {
  
            console.log(newWidth, 'newWidth 3')
            projection
            .center([-72.68, 41])
            .scale(newWidth*28)
            .translate([(newWidth) / 2, (newHeight)/2]);

            svg.selectAll('.towns')
        .attr('d', path)


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
          }
          
    }
    window.addEventListener('resize', render)

    // And now that the page has loaded, let's just try
    // to do it once before the page has resized
    render()
  }
