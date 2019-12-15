
import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip


    var width = 800
    var height = 800
    var margin = {top:0, left:0, bottom:0, right:0 }
    var chartWidth = width - (margin.left+margin.right)
    var chartHeight = height - (margin.top+margin.bottom)
    var svg = d3.select('#chart-6')
    .append('svg')
    .attr('height', height)
    .attr('width',width)
    // var chartLayer = svg.append("g").classed("chartLayer", true)

    d3.json(require('../data/dummydata2.json'))
     .then(ready)
    .catch(err => console.log('Failed on', err))


    function ready(json) {
      var data = {
        nodes:json.nodes,
        links:json.links        
      }

      data.nodes[0].color = "red";
    

      const tip = d3
        .tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
           return `${d.label}`
           })
   
       svg.call(tip)

      var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.index }))
      .force("collide",d3.forceCollide( function(d){return d.r + 8 }).iterations(16) )
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
      .attr("stroke", "black")

      var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(data.nodes)
      .enter().append("circle")
      .attr("cx", chartWidth / 2)
      .attr("cy", chartHeight / 2)
      .attr("r", function(d){  return d.r })
      .attr("fill", function(d){  
        return d.color })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));    


      var ticked = function() {
        data.nodes[0].fx = chartWidth / 2;
        data.nodes[0].fy = chartHeight/2;

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
    

        // Update our scale
    
        // if (svgWidth < 400) {
        //   xAxis.ticks(2)
        // } else if (svgWidth < 550) {
        //   xAxis.ticks(4)
        // } else {
        //   xAxis.ticks(null)
        // }
    
        // console.log(newHeight, 'newheight')
        xPositionScale.range([0, newWidth])
        yPositionScale.range([newHeight, 0])
    
    
        
    
        // svg.select('.x-axis').call(xAxis)
        // svg.select('.y-axis').call(yAxis)
        // // Update things you draw
    
        svg
          .selectAll('nodes')
          .attr("cx", newWidth / 2)
          .attr("cy", newHeight / 2)
    
    

      var ticked = function() {
        data.nodes[0].fx = newWidth / 2;
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
