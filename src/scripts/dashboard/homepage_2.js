
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
  return `${d.properties.NAME}: ${Math.round(d['difference'])} <br>
  hospitalizations per 100k`
})


// const colorScale = d3.scaleSequential(d3.interpolate("#B22222","#708090", "#0000e6")).domain([-40,0, 80])

// const colorScale = d3.scaleQuantile().range([d3.interpolate("#B22222","#708090", "#0000e6")]).domain([-40,0, 80])

const colorScale = d3.scaleSequential(d3.interpolateOranges).domain([0, 100])

svg.call(tip)


Promise.all([
    "https://test-uploading-file.s3.amazonaws.com/county_hosps.csv",
    ]
    .map(function(url) {
      return fetch(url).then(function(response) {
        return response.ok ? response.text() : Promise.reject(response.status);
      }).then(function(text) {
        return d3.csvParse(text);
      });
    })).then(ready)
    .catch(err => console.log('Failed on', err))

  function ready([datapoints]) {

    // svg.append('text').attr('class', 'school_name').text('Biden outpaces Trump in fundraising').attr('alignment-baseline', 'middle').attr('y',-50).attr('font-size', '25px').attr('font-weight', 5).attr('x', 0)
    var json2;
    json2 = [{"type":"Topology","transform":{"scale":[0.001765973231065926,0.001245282128958586],"translate":[-73.72800337305297,40.9851110032158]},"arcs":[[[714,481],[32,14]],[[746,495],[47,3],[50,87]],[[843,585],[46,-45],[6,8],[48,-12],[61,-14],[55,7],[39,-3]],[[1098,526],[0,-35],[0,0],[-2,-41],[-3,-103],[-24,-4],[2,-47],[-14,-27],[-14,13],[-40,-5],[-37,-11],[-41,-2],[-23,-12],[-38,13],[-19,-12],[-32,-16],[-27,-2]],[[786,235],[-20,79],[-33,38],[72,10],[-9,66],[-61,5],[-21,48]],[[553,477],[21,20],[0,19],[96,12],[22,4],[22,-51]],[[786,235],[-5,0],[-21,-13],[-11,14],[-38,-7],[-35,-13]],[[676,216],[-45,60],[-23,88],[-14,-4],[-38,-8],[1,60],[-3,37],[-1,28]],[[119,547],[7,126],[10,182],[145,-4],[59,-2],[42,-2],[25,-1]],[[407,846],[-11,-58],[80,5],[-11,-41],[-24,-92],[-38,-7],[10,-69],[9,-58]],[[422,526],[-43,-27],[-60,-40],[5,-33],[-27,-6],[-28,3],[-37,-5],[4,-30]],[[236,388],[-74,18],[-37,141],[-6,0]],[[422,526],[25,3],[-4,-70],[57,-10],[53,28]],[[676,216],[-7,-3],[-29,15],[-32,-3],[0,0],[-20,-15],[-40,-4],[-15,19],[-54,-18],[-12,5],[-18,8],[-20,-14],[-8,-6],[-1,-1],[-19,-21],[-34,-10],[-12,-25]],[[355,143],[-12,13],[20,60],[0,18],[11,20],[-27,25],[-18,28],[-21,20],[-13,23],[-51,22],[-8,16]],[[407,846],[5,0],[87,-1],[21,-31],[20,3],[4,0],[18,27],[72,-4],[45,3],[11,-1]],[[690,842],[9,-69],[-11,-2],[-2,-60],[11,-8],[19,-92],[31,-93],[-1,-23]],[[843,585],[47,32],[-35,66],[1,98],[37,1],[29,0],[-1,56]],[[921,838],[65,-1],[58,-2],[47,-1],[1,-13],[4,-161],[2,-66],[0,0],[0,-68]],[[690,842],[63,-1],[46,0],[67,-2],[36,-1],[19,0]],[[104,306],[1,7],[0,1],[0,1],[3,51],[4,69],[6,92],[1,20]],[[355,143],[-4,-8],[-13,-5],[-24,5],[-17,4],[-33,-33],[-5,0],[-15,-3],[-19,-3],[-24,-5],[11,-14],[-19,-22],[-20,-9],[-26,3],[-27,-10],[-26,-18],[-19,0],[-35,-25],[0,0],[-1,15],[0,11],[-39,67],[18,12],[121,78],[-39,66],[4,57]]],"objects":{"cb_2015_connecticut_county_20m":{"type":"GeometryCollection","geometries":[{"arcs":[[0,1,2,3,4]],"type":"Polygon","properties":{"STATEFP":"09","COUNTYFP":"011","COUNTYNS":"00212799","AFFGEOID":"0500000US09011","GEOID":"09011","NAME":"New London","LSAD":"06","ALAND":1722641876,"AWATER":276619712}},{"arcs":[[5,-5,6,7]],"type":"Polygon","properties":{"STATEFP":"09","COUNTYFP":"007","COUNTYNS":"00212797","AFFGEOID":"0500000US09007","GEOID":"09007","NAME":"Middlesex","LSAD":"06","ALAND":956491412,"AWATER":180679144}},{"arcs":[[8,9,10,11]],"type":"Polygon","properties":{"STATEFP":"09","COUNTYFP":"005","COUNTYNS":"00212796","AFFGEOID":"0500000US09005","GEOID":"09005","NAME":"Litchfield","LSAD":"06","ALAND":2384262297,"AWATER":62138320}},{"arcs":[[12,-8,13,14,-11]],"type":"Polygon","properties":{"STATEFP":"09","COUNTYFP":"009","COUNTYNS":"00212798","AFFGEOID":"0500000US09009","GEOID":"09009","NAME":"New Haven","LSAD":"06","ALAND":1565645638,"AWATER":667096946}},{"arcs":[[15,16,-1,-6,-13,-10]],"type":"Polygon","properties":{"STATEFP":"09","COUNTYFP":"003","COUNTYNS":"00212338","AFFGEOID":"0500000US09003","GEOID":"09003","NAME":"Hartford","LSAD":"06","ALAND":1903947639,"AWATER":40133958}},{"arcs":[[17,18,-3]],"type":"Polygon","properties":{"STATEFP":"09","COUNTYFP":"015","COUNTYNS":"00212801","AFFGEOID":"0500000US09015","GEOID":"09015","NAME":"Windham","LSAD":"06","ALAND":1328185576,"AWATER":21767064}},{"arcs":[[19,-18,-2,-17]],"type":"Polygon","properties":{"STATEFP":"09","COUNTYFP":"013","COUNTYNS":"00212668","AFFGEOID":"0500000US09013","GEOID":"09013","NAME":"Tolland","LSAD":"06","ALAND":1062613133,"AWATER":17533745}},{"arcs":[[20,-12,-15,21]],"type":"Polygon","properties":{"STATEFP":"09","COUNTYFP":"001","COUNTYNS":"00212794","AFFGEOID":"0500000US09001","GEOID":"09001","NAME":"Fairfield","LSAD":"06","ALAND":1618664455,"AWATER":548955210}}]}}}]
    var newArray =[];
    // console.log(datapoints[datapoints.length-8])

    newArray.push(datapoints[datapoints.length-8])
    newArray.push(datapoints[datapoints.length-7])
    newArray.push(datapoints[datapoints.length-6])
    newArray.push(datapoints[datapoints.length-5])
    newArray.push(datapoints[datapoints.length-4])
    newArray.push(datapoints[datapoints.length-3])
    newArray.push(datapoints[datapoints.length-2])
    newArray.push(datapoints[datapoints.length-1])

    console.log(newArray)
    const towns = topojson.feature(json2[0], json2[0].objects.cb_2015_connecticut_county_20m)
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
         
        console.log(d)

        newArray.forEach(function(r){if (r.County===d.properties.NAME){
          // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
          colorVar = colorScale(r['Pop_Adjusted'])
          d['difference'] = r['Pop_Adjusted']

        }
      })  
  
        return colorVar

      })  
      .attr('stroke', 'white')  
      .on('mouseover', function(d){
        tip.show.call(this, d)
        // d3.select(this).attr('stroke', 'black').attr('opacity','0.5')
    })  .on('mouseout', function(d){
        tip.hide.call(this, d)
        // d3.select(this).attr('stroke', 'black').attr('opacity','0.5')
    })

    svg.append('text').attr('id', 'box1-text').text('0').attr('x',width-220).attr('y', height-250).attr('font-size', 10)
    svg.append('text').attr('id', 'box4-text').text('100').attr('x',width-55).attr('y', height-250).attr('font-size', 10)

//   svg.append('text').attr('id', 'box4-text').text('80').attr('x',width-55).attr('y', height-200).attr('font-size', 10)
  svg.append('text').attr('id', 'under-box-text').attr('x',width-200).attr('y', height-230).attr('font-size', 10)


  svg.append('rect').attr('id', 'box1').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', height-250).attr('fill', colorScale(0))
  svg.append('rect').attr('id', 'box2').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', height-250).attr('fill', colorScale(25))
  svg.append('rect').attr('id', 'box3').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', height-250).attr('fill', colorScale(50))
  svg.append('rect').attr('id', 'box4').attr('width', 25).attr('height', 5).attr('x',width-75).attr('y', height-250).attr('fill', colorScale(75))
  svg.append('rect').attr('id', 'box5').attr('width', 25).attr('height', 5).attr('x',width-55).attr('y', height-250).attr('fill', colorScale(100))


     

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
      svg.select('#under-box-text').text('Hospitalization rate per 100K').attr('x',newWidth-150).attr('font-size', 10)

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
