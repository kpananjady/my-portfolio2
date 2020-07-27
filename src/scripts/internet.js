import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 100, left: 50, right: 50, bottom: 0 }

let height = 650 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

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

const colorScale = d3.scaleSequential(d3.interpolateOranges).domain([0, 5])

svg.call(tip)

Promise.all([
    d3.json(require('/data/ct_towns_simplified.topojson')),
    d3.json(require('/data/tracts_ct.topojson')),
    d3.csv(require('/data/tract_map_dec_2017.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))


  function ready([json2, json, internet]) {

    // svg.append('text').attr('class', 'title').text('See how internet access compares in your town').attr('alignment-baseline', 'middle').attr('y',-90).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)
    // svg.append('text').attr('class', 'sub-title').text('How many households in every 1,000 have good connections').attr('alignment-baseline', 'middle').attr('y',-65).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)


    svg.append('text').attr('id', 'box1-text').text('0').attr('x',width-220).attr('y', height-300).attr('font-size', 10)
      svg.append('text').attr('id', 'box4-text').text('>800').attr('x',width-95).attr('y', height-300).attr('font-size', 10)

      svg.append('rect').attr('id', 'box0').attr('width', 25).attr('height', 5).attr('x',width-175).attr('y', height-300).attr('fill', colorScale(0)).attr('opacity',0.4)
      svg.append('rect').attr('id', 'box1').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', height-300).attr('fill', colorScale(1)).attr('opacity',0.4)
      svg.append('rect').attr('id', 'box2').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', height-300).attr('fill', colorScale(2)).attr('opacity',0.4)
      svg.append('rect').attr('id', 'box3').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', height-300).attr('fill', colorScale(4)).attr('opacity',0.4)
      svg.append('rect').attr('id', 'box4').attr('width', 25).attr('height', 5).attr('x',width-75).attr('y', height-300).attr('fill', colorScale(5)).attr('opacity',0.4)

      svg.append('rect').attr('id', 'box0-m').attr('width', 25).attr('height', 5).attr('x',width-175).attr('y', height-300).style('fill', 'grey').attr('opacity',0.2)
      svg.append('rect').attr('id', 'box1-m').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', height-300).style('fill', 'grey').attr('opacity',0.2)
      svg.append('rect').attr('id', 'box2-m').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', height-300).style('fill', 'grey').attr('opacity',0.2)
      svg.append('rect').attr('id', 'box3-m').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', height-300).style('fill', 'grey').attr('opacity',0.2)
      svg.append('rect').attr('id', 'box4-m').attr('width', 25).attr('height', 5).attr('x',width-75).attr('y', height-300).style('fill', 'grey').attr('opacity',0.2)
    const tract = topojson.feature(json, json.objects.tracts_ct)
      console.log(tract, 'towns')

      const towns = topojson.feature(json2, json2.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84)
      console.log(towns, 'towns')


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
        internet.forEach(function(r){if (r.tractcode===d.properties.geoid){
            console.log(colorScale(r.pcat_10x1))
            color = colorScale(r.pcat_10x1)
            }
        })

          return color
      })  
      .attr('stroke', 'white')  
      .attr('opacity', 0.4)

      var towns2 = svg
      .selectAll('path-town')
      .data(towns.features)
      .enter()
      .append('path')
      .attr('class', 'towns')
      .attr('d', path)
      .style('fill', 'grey')  
      .attr('stroke', 'white')  
      .attr('opacity',0.3)
      .on('mouseover', tip.show)
      .on('click', tip.show)


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

        svg.select('#box1-text').text('0').attr('x',newWidth-175).attr('y', height-300).attr('font-size', 10)
        svg.select('#box4-text').text('>=800').attr('x',newWidth-75).attr('y', height-300).attr('font-size', 10)

        svg.select('#box0').attr('x', newWidth-175)
        svg.select('#box1').attr('x', newWidth-150)
        svg.select('#box2').attr('x', newWidth-125)
        svg.select('#box3').attr('x', newWidth-100)
        svg.select('#box4').attr('x', newWidth-75)

        svg.select('#box0-m').attr('x', newWidth-175)
        svg.select('#box1-m').attr('x', newWidth-150)
        svg.select('#box2-m').attr('x', newWidth-125)
        svg.select('#box3-m').attr('x', newWidth-100)
        svg.select('#box4-m').attr('x', newWidth-75)

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
  
            svg.selectAll('.title').attr('font-size', '15px')
            svg.selectAll('.sub-title').attr('font-size', '10px')

            projection
          .scale(newWidth*0)
          .center([-72.68, 41])
  
          .translate([(newWidth) / 2, (newHeight)/2]);

          svg.selectAll('.towns')
        .attr('d', path)

        svg.selectAll('.tracts')
        .attr('d', path)


          } else if (newWidth > 250) {

            svg.selectAll('.title').attr('font-size', '15px')
            svg.selectAll('.sub-title').attr('font-size', '10px')
  
            console.log(newWidth, 'newWidth 3')
            projection
            .center([-72.68, 41])
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