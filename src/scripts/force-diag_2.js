
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip


    var width = 800
    var height = 500
    var margin = {top:0, left:100, bottom:50, right:0 }
    var chartWidth = width - (margin.left+margin.right)
    var chartHeight = height - (margin.top+margin.bottom)
    var svg = d3.select('#chart-6')
    .append('svg')
    .attr('height', height)
    .attr('width',width)
    // var chartLayer = svg.append("g").classed("chartLayer", true)

    Promise.all([d3.json(require('../data/inmate_death.json')),
    d3.csv(require('../data/inmate_death.csv'))
]).then(ready)
    .catch(err => console.log('Failed on', err))

    var idVar = 'yo'

    function ready([json, csv]) {
      var data = {
        nodes:json.nodes,
        links:json.links,
        triangles:json.triangles        
      }

      svg.append('rect').attr('x',65).attr('y', 50).attr('height',height-20).attr('width', 5).attr('fill', 'grey').attr('opacity',0.2)
      var parseTime = d3.timeParse("%m/%d/%Y");
      console.log(parseTime('01/25/2021'))
      const timeScale = d3.scaleLinear().range([50,height-10]).domain([parseTime('04/01/2020'),parseTime('01/25/2021')])
      svg.selectAll('stuff').data(csv).enter().append('circle').attr('class','names_circ').attr('id',function(d){
        if (d['FIRST NAME']=='RICKEY'){
            return 'RSMITH'
        }  if (d['FIRST NAME']=='DAVID'){
            return 'DSMITH'
        }
        return `${d['LAST NAME']}`}).attr('r', 5).attr('cx',67 ).attr('cy', function(d){ 
          return timeScale(parseTime(d['DATE OF DEATH']))}).attr('stroke','grey').attr('fill','white').on('click', function(d){
            d3.selectAll('#'+idVar).attr('fill','#BEBEBE')
            d3.selectAll('.names').attr('fill','grey')
            d3.selectAll('.names_circ').attr('fill','white')

            console.log('here')
            d3.select(this).attr('fill','black')
            d3.selectAll('#'+`${d3.select(this).attr('id')}`).attr('fill','black')
            idVar = d3.select(this).attr('id')
        })

      data.nodes[0].color = "#800000";
    
      svg.selectAll('stuff').data(csv).enter().append('text').text(d=>d['LAST NAME']).attr('class','names').attr('id',function(d){
        if (d['FIRST NAME']=='RICKEY'){
            return 'RSMITH'
        }  if (d['FIRST NAME']=='DAVID'){
            return 'DSMITH'
        }
        return `${d['LAST NAME']}`}).attr('x',10).attr('y', function(d){ 
        if (d['LAST NAME']=='ALLEN'){
            return timeScale(parseTime(d['DATE OF DEATH']))+20
        } if (d['LAST NAME']=='GORDON'){
            return timeScale(parseTime(d['DATE OF DEATH']))+10
        } if (d['LAST NAME']=='PETTY'){
            return timeScale(parseTime(d['DATE OF DEATH']))-5
        } if (d['LAST NAME']=='DELEON'){
            return timeScale(parseTime(d['DATE OF DEATH']))-7
        } if (d['LAST NAME']=='GENTILE'){
            return timeScale(parseTime(d['DATE OF DEATH']))-5
        } if (d['LAST NAME']=='GREEN-GOVAN'){
            return timeScale(parseTime(d['DATE OF DEATH']))-5
        } if (d['LAST NAME']=='ALLING'){
            return timeScale(parseTime(d['DATE OF DEATH']))+10
        } if (d['LAST NAME']=='HARRELL'){
            return timeScale(parseTime(d['DATE OF DEATH']))+5
        } if (d['LAST NAME']=='ELSTON'){
            return timeScale(parseTime(d['DATE OF DEATH']))+5
        }if (d['LAST NAME']=='DIAZ'){
            return timeScale(parseTime(d['DATE OF DEATH']))-5
        }if (d['LAST NAME']=='VAZQUEZ'){
            return timeScale(parseTime(d['DATE OF DEATH']))+10
        }
            return timeScale(parseTime(d['DATE OF DEATH']))}).attr('font-size',10).attr('fill', 'grey').on('click', function(d){
                d3.selectAll('#'+idVar).attr('fill','#BEBEBE')
                d3.selectAll('.names').attr('fill','grey')
                d3.selectAll('.names_circ').attr('fill','white')

                console.log('here')
                d3.select(this).attr('fill','black')
                d3.selectAll('#'+`${d3.select(this).attr('id')}`).attr('fill','black')
                idVar = d3.select(this).attr('id')
            })


      const radiusScale = d3
      .scaleSqrt()
      .domain([0, 1000])
      .range([10, 25])

      
      const tip = d3
        .tip()
        .attr('class', 'd3-tip')
        .offset([0, 0])
        .html(function(d) {

            if (d.color =='#F5C52C' ){
                return `${d.label} CI<br>
                <div id ='count'> Dec 2020: ${d.r} inmates</div>`

            } if (d.color =='#BEBEBE' ){
                return `${d.label}<br>
                <div id ='count'> RACE: ${d['AGE']}<br>
                AGE: ${d['RACE']}<br>
                 DATE OF DEATH: ${d['DATE OF DEATH']}`

            }
           return `${d.label}`
           })
   
       svg.call(tip)


  
       svg.append('circle').attr('r', 5).attr('fill', '#BEBEBE').attr('cx', 100).attr('cy', height-50)
       svg.append('circle').attr('r', 10).attr('fill', '#F5C52C').attr('cx', 100).attr('cy', height-30)

       svg.append('text').attr('y', height-50).attr('x', 110).text('Inmates deceased due to COVID-19').attr('font-size',10).attr('font-weight', 5)
       svg.append('text').attr('y', height-30).attr('x', 110).text('Prisons sized by Dec population').attr('font-size',10).attr('font-weight', 5)

svg.append("defs").selectAll("marker")
.data(["dominating"])
.enter().append("marker")
.attr('markerUnits', 'userSpaceOnUse')
.attr("id", function (d) {
    return d;
})
.attr("viewBox", "0 -5 10 10")
.attr("refX", 0)
.attr("refY", 0)
.attr("markerWidth", 12)
.attr("markerHeight", 12)
.attr("orient", "auto-start-reverse")
.append("path")
.attr("d", "M0,-5L10,0L0,5")
.attr("fill", "red");

svg.append('text').text('Apr 2020').attr('x',45).attr('y',35).attr('font-size',15).attr('font-weight', 5)

svg.append('text').text('Jan 2021').attr('x',45).attr('y',height+20).attr('font-size',15).attr('font-weight', 5)


      var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.index }))
      .force("collide",d3.forceCollide( function(d){return radiusScale(parseFloat(d.r)) + 8 }).iterations(16) )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
      .velocityDecay(0.4)
      .alphaTarget(0.1);

      var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke", "grey")
    //   .attr('stroke-width', d => {return linkSizeScale(d.count);})
	//   .attr("marker-end", function(d) {
    //       console.log(d)
    //     if(JSON.stringify(d.target) !== JSON.stringify(d.source))
    //        return "url(#dominating)";
    // });

    //   .attr('marker-start', 'url(#triangle)');

      var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(data.nodes)
      .enter().append("circle")
      .attr('id', d=> d.lname)
      .attr("cx", chartWidth / 2)
      .attr("cy", chartHeight / 2)
      .attr("r", function(d){  console.log(d.r)

        csv.forEach(function(r){if (r['LAST NAME'].replace(' ', '')===d['lname']){
            // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
            d['AGE'] =r['AGE']
            d['RACE'] = r['RACE']
            d['DATE OF DEATH'] = r['DATE OF DEATH']
            // colorVar = colorScale(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
  
          }
        })  

    
        
        return radiusScale(parseFloat(d.r)) })
      .attr("fill", function(d){  
        return d.color })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));    


      var ticked = function() {
        data.nodes[0].fx = (chartWidth ) / 2+50;
        data.nodes[0].fy = chartHeight/2;


   

        // data.nodes[1].fx = (chartWidth / 4) + (chartWidth / 4);
        // data.nodes[1].fy = (chartHeight/4) ;

        // data.nodes[2].fx = (chartWidth / 3) ;
        // data.nodes[2].fy = (chartHeight/3) + (chartWidth / 3);

        // data.nodes[5].fx = chartWidth / 2;
        // data.nodes[5].fy = 3 * chartHeight/4;


        // data.nodes[6].fx = chartWidth / 4;
        // data.nodes[6].fy = chartHeight/4;

        // data.nodes[1].fx = chartWidth / 2 + 50;
        // data.nodes[1].fy = chartHeight / 2 + 50;

        // data.nodes[2].fx = chartWidth / 2 + 100;
        // data.nodes[2].fy = chartHeight / 2 + 100;

        // data.nodes[6].fx = chartWidth / 2 - 200;
        // data.nodes[6].fy = chartHeight / 2 - 200;
        link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

        node
          .attr("cx", function(d, i) { return d.x; })
          .attr("cy", function(d, i) { return d.y; });
      }  

      simulation
      .nodes(data.nodes)
      .on("tick", ticked);


      simulation.force("link")
        .links(data.links);    



      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
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
    

        var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.index }))
      .force("collide",d3.forceCollide( function(d){return radiusScale(d.r) + 8 }).iterations(16) )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(newWidth / 2, newHeight / 2))
      .velocityDecay(0.4)
      .alphaTarget(0.1);
        // Update our scale
    
        // if (svgWidth < 400) {
        //   xAxis.ticks(2)
        // } else if (svgWidth < 550) {
        //   xAxis.ticks(4)
        // } else {
        //   xAxis.ticks(null)
        // }
    
        // console.log(newHeight, 'newheight')
        // xPositionScale.range([0, newWidth])
        // yPositionScale.range([newHeight, 0])
    
    
        
    
        // svg.select('.x-axis').call(xAxis)
        // svg.select('.y-axis').call(yAxis)
        // // Update things you draw
    
        svg
          .selectAll('nodes')
          .attr("cx", newWidth / 2)
          .attr("cy", newHeight / 2)
    
    

      var ticked = function() {
        data.nodes[0].fx = (newWidth) / 2+50;
        data.nodes[0].fy = newHeight / 2;

        link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

        node
          .attr("cx", function(d, i) { return d.x; })
          .attr("cy", function(d, i) { return d.y; });
      }  

      simulation
      .nodes(data.nodes)
      .on("tick", ticked);


      simulation.force("link")
        .links(data.links);   
        // svg
        // .select('2017')
        // .attr('x', xPositionScale(parseTime(2017)))
        // .attr('y', -40)
      
        svg
        .selectAll(".nodes")
        // .data(data.nodes)
        .enter().append("circle")
        .attr("cx", chartWidth / 2)
        .attr("cy", chartHeight / 2)
    
  
        // Update axes
    
        //   .attr('y', newHeight + 15)
    
        //  d3.select('.y-axis .domain').remove()
      }
    
      // When the window resizes, run the function
      // that redraws everything
      window.addEventListener('resize', render)
    
      // And now that the page has loaded, let's just try
      // to do it once before the page has resized
      render()
    }
