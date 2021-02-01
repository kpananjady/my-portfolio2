import * as d3 from 'd3'
import * as topojson from 'topojson'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

let margin = { top: 150, left: 50, right: 50, bottom: 0 }

let height = 600 - margin.top - margin.bottom

let width = 1000 - margin.left - margin.right

var centered;


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
.offset([-10, -10])
.html(function(d) {
  return `${d.properties.NAME10} : ${d.percent}% <br>
  ${d['First doses administered ']} first doses`
})

const colorScale = 

// d3.scaleQuantile()
// .domain([0, 70])
// .range([['white', 'orange']])
d3.scaleSequential(d3.interpolateOranges).domain([0, 70])



svg.call(tip)

Promise.all([
    d3.json(require('/data/ct_towns_simplified.topojson')),
    d3.json(require('/data/tracts_ct.topojson')),
    d3.csv(require('/data/vaccination_clinics.csv')),
    d3.csv(require('/data/vaccination_geo.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))


  function ready([json2, json, clinics, geo]) {

    // svg.append('text').attr('class', 'title').text('See how internet access compares in your town').attr('alignment-baseline', 'middle').attr('y',-90).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)
    // svg.append('text').attr('class', 'sub-title').text('How many households in every 1,000 have good connections').attr('alignment-baseline', 'middle').attr('y',-65).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)


    svg.append('text').attr('id', 'box1-text').text('0').attr('x',width-220).attr('y', height-200).attr('font-size', 10)
      svg.append('text').attr('id', 'box4-text').text('>800').attr('x',width-95).attr('y', height-200).attr('font-size', 10)

      svg.append('rect').attr('id', 'box0').attr('width', 25).attr('height', 5).attr('x',width-175).attr('y', height-200).attr('fill', colorScale(0))
      svg.append('rect').attr('id', 'box1').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', height-200).attr('fill', colorScale(10))
      svg.append('rect').attr('id', 'box2').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', height-200).attr('fill', colorScale(20))
      svg.append('rect').attr('id', 'box3').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', height-200).attr('fill', colorScale(40))
      svg.append('rect').attr('id', 'box4').attr('width', 25).attr('height', 5).attr('x',width-75).attr('y', height-200).attr('fill', colorScale(50))


    const tract = topojson.feature(json, json.objects.tracts_ct)

      const towns = topojson.feature(json2, json2.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84)

    //   function clicked(d) {
    //     var x, y, k;

    //     console.log('here')
      
    //     if (d && centered !== d) {
    //       var centroid = path.centroid(d);
    //       x = centroid[0];
    //       y = centroid[1];
    //       k = 4;
    //       centered = d;
    //     } else {
    //       x = width / 2;
    //       y = height / 2;
    //       k = 1;
    //       centered = null;
    //     }
      
    //     svg.selectAll("path")
    //         .classed("active", centered && function(d) { 
    //             console.log(centered,'centered')
    //             return d === centered; 
    //         });
      
    //     svg.transition()
    //         .duration(750)
    //         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
    //         .style("stroke-width", 1.5 / k + "px");
    //   }

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
            color = colorScale(r.pcat_10x1)
            }
        })

          return color
      })  
    //   .attr('stroke', 'none')  
    //   .attr('opacity', 0.7)

      var towns2 = svg
      .selectAll('path-town')
      .data(towns.features)
      .enter()
      .append('path')
      .attr('class', 'towns')
      .attr('d',path)
      .style('fill', function(d){            

        var returnVar = '0'
    
        geo.forEach( function(r) {if (r['Town']===d.properties.NAME10){
  
  
        //   if (r['variable'].includes("Biden")){
            // console.log('dems')
            // console.log((100*r['value']/r['Vote Totals']).toFixed(2))
            // dem_vote = dem_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
            // console.log(colorScale(parseFloat(r['%_75_Plus'])), 'color')
            d['percent'] = r['%_75_Plus']
            d['First doses administered '] = r['First doses administered ']

            returnVar = parseFloat(r['%_75_Plus'])

        //   } else if (r['variable'].includes("Trump")){
            // rep_vote = rep_vote + (100*r['value']/r['Vote Totals']).toFixed(2)
        //   }
          // console.log(r['variable'], Math.round(100*r['value']/r['Vote Totals']))
       }
  
  
        }) 

        if (d.properties.NAME10=='Canaan'){
            return 'lightgrey'
        }

        if (d.properties.NAME10=='North Canaan'){
            return 'lightgrey'
        }
  
        // console.log(dem_vote)
        // console.log(parseFloat(dem_vote)-parseFloat(rep_vote))
       return colorScale(returnVar)

       
    })  
    //   .attr('stroke', 'white')  
    //   .attr('stroke-width', 1)  
      .attr('opacity',0.8)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
    //   .on('click', clicked)

    var varClicked = 0
    d3.select('#toggle').on('click', () => {
        varClicked = 1
        svg
      .selectAll('.circle-school')
      .data(clinics)
      .enter()
      .append('circle')
      .attr('class', 'circle-school')
      .attr('r', 2.5)
      .attr('opacity',0.7)
      .attr('transform', function(d) {
        const coords = [d.lat, d.lng]
        return `translate(${projection(coords)})`
      })
      .attr('fill', function(d){
        return 'black'
      })

      })

      d3.select('#toggle2').on('click', () => {
        varClicked = 0

        svg      .selectAll('.circle-school').remove()
       

      })

      
    //   .on('mouseover', function(d) {
    //     // show the tooltip
    //     tip.show.call(this, d)
      
    //     let coords = this.getBoundingClientRect()
    //     let y = coords.y + (coords.height / 2)
    //     // console.log(coords.width)
    //     let x = (coords.width) 
    //     //console.log(coords)
      
    //     d3.select(".d3-tip-scrolly")
    //       .style('top', y + 'px')
    //       .style('left', x + 'px')
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

        svg.select('#box1-text').text('0%').attr('x',newWidth-175).attr('y', height-200).attr('font-size', 10)
        svg.select('#box4-text').text('50%').attr('x',newWidth-75).attr('y', height-200).attr('font-size', 10)

        svg.select('#box0').attr('x', newWidth-175)
        svg.select('#box1').attr('x', newWidth-150)
        svg.select('#box2').attr('x', newWidth-125)
        svg.select('#box3').attr('x', newWidth-100)
        svg.select('#box4').attr('x', newWidth-75)

      

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

        if (varClicked ==1){
           svg
      .selectAll('.circle-school').attr('transform', function(d) {
        const coords = [d.lat, d.lng]
        return `translate(${projection(coords)})`
      
      })
    }
        
  
          } else if (newWidth > 450){
  

            projection
          .scale(newWidth*20)
          .center([-72.68, 41])
  
          .translate([(newWidth) / 2, (newHeight)/2]);

          svg.selectAll('.towns')
        .attr('d', path)

        svg.selectAll('.tracts')
        .attr('d', path)

        if (varClicked ==1){  svg
        .selectAll('.circle-school').attr('transform', function(d) {
          const coords = [d.lat, d.lng]
          return `translate(${projection(coords)})`
        })
    }   

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

        if (varClicked ==1){
        svg
        .selectAll('.circle-school').attr('transform', function(d) {
          const coords = [d.lat, d.lng]
          return `translate(${projection(coords)})`
        })
    }
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

        svg.select('#box1-text').text('0').attr('x',newWidth-175).attr('y', height-400).attr('font-size', 10)
        svg.select('#box4-text').text('>=800').attr('x',newWidth-75).attr('y', height-400).attr('font-size', 10)


        svg.select('#box0').attr('y', height-400)
        svg.select('#box1').attr('y', height-400)
        svg.select('#box2').attr('y', height-400)
        svg.select('#box3').attr('y', height-400)
        svg.select('#box4').attr('y', height-400)

        if (varClicked ==1){
        svg
        .selectAll('.circle-school').attr('transform', function(d) {
          const coords = [d.lat, d.lng]
          return `translate(${projection(coords)})`
        })
    } 
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