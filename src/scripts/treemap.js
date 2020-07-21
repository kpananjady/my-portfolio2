import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 250, left: 70, right: 70, bottom: 50 }
const height = 650 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


  d3.csv(require('../data/dummydata2_treemap.csv')).then(ready)

  var yPositionScale = d3.scaleLinear()
            .range([0, 0.4*width])
            .domain([0, 25]);


  function ready(data) {

    svg.append('text').attr('class', 'school_name').text('Hover on the schools below!').attr('alignment-baseline', 'middle').attr('y',-190).attr('font-size', '30px').attr('font-weight', 5).attr('x', -50)
    svg.append('text').attr('class', 'sub').text('11,000 students | approx. 199 million').attr('alignment-baseline', 'middle').attr('y',-150).attr('font-size', '20px').attr('font-weight', 5).attr('x', 0)

    svg.append('text').attr('class', 'label_1').text('% International Students').attr('x', width/35).attr('y',-65).attr('font-weight', 5)
    svg.append('text').attr('class', 'label_2').text('Ugrad-Grad Breakdown') .attr("x", 0.4*width+100).attr('y',-65).attr('font-weight', 5)



    svg
         .append('rect')
         .attr('class', 'bar_5_town_100')
         .attr("y",-50
         )
         .attr("height", 20)
         .attr("x", width/35)
         .attr("width",0.4*width)
         .attr('fill', 'lightgrey')
         .attr('rx',10)
         .attr('ry',10)

         svg
         .append('rect')
         .attr('class', 'bar_5')
         .attr("y",-50
         )
         .attr("height", 20)
         .attr("x", width/35)
         .attr("width",0)
         .attr('fill', '#69b3a2')
         .attr('rx',10)
         .attr('ry',10)

         svg
         .append('rect')
         .attr('class', 'bar_6_town_100')
         .attr("y",-50)
         .attr("height", 20)
         .attr("x", 0.4*width +width/2 +width/10)
         .attr("width",0.4*width)
         .attr('fill', 'lightgrey')
         .attr('rx',10)
         .attr('ry',10)
 
         svg
         .append('rect')
         .attr('class', 'bar_6')
         .attr("y",-50)
         .attr("height", 20)
         .attr("x", 0.4*width +width/2 +width/10)
         .attr("width",0)
         .attr('fill', '#69b3a2')
         .attr('rx',10)
         .attr('ry',10)
      
         svg.append('text').attr('id', 'percent').text('25%').attr('y',-37).attr('x', yPositionScale(25)-15).attr('font-weight', 5).attr('font-size',13)




    var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
    root.sum(function(d) { return +d.value })   


    d3.treemap()
        .size([width, height])
        .padding(4)
        (root)

    console.log(root.leaves())

    svg
    .selectAll("rect-tree")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr('class', 'treemap')
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0;})
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "none")
      .style("fill", "#69b3a2")
      .on('mouseover', function(d){
        d3.select(this).attr('opacity','0.5')
          svg.select('.school_name').text(d.data.name)
          var revenue = +d.data.Grad_revenue + +d.data.Ugrad_revenue
          svg.select('.sub').text(d.data.value + ' students | $'+ revenue)
          svg.select('.bar_5') .transition()
            .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(+d.data.percent))

      }
      )
      .on('mouseout',function(d){
        d3.select(this).attr('opacity','1')

      })
      
      d3.select('#toggle').on('click', () => {
        root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
    root.sum(function(d) { return +d.value })   

    d3.treemap()
        .size([width, height])
        .padding(4)
        (root)

    svg.selectAll('.treemap').remove()
    
    
        svg
    .selectAll("rect-tree")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr('class', 'treemap')
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0;})
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "none")
      .style("fill", "#69b3a2")
      .on('mouseover', function(d){
        d3.select(this).attr('opacity','0.5')
          svg.select('.school_name').text(d.data.name)
          var revenue = +d.data.Grad_revenue + +d.data.Ugrad_revenue
          svg.select('.sub').text(d.data.value + ' students | $'+ revenue)

      }
      )
      .on('mouseout',function(d){
        d3.select(this).attr('opacity','1')

      })


      })



      d3.select('#toggle2').on('click', () => {
        root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
    root.sum(function(d) { return (+d.Grad_revenue + +d.Ugrad_revenue)/2 })   

    d3.treemap()
        .size([width, height])
        .padding(4)
        (root)

    svg.selectAll('.treemap').remove()
    
    
        svg
    .selectAll("rect-tree")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr('class', 'treemap')
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0;})
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "none")
      .style("fill", "#69b3a2")
      .on('mouseover', function(d){
        d3.select(this).attr('opacity','0.5')
        svg.select('.school_name').text(d.data.name)
        var revenue = +d.data.Grad_revenue + +d.data.Ugrad_revenue
        svg.select('.sub').text(d.data.value + ' students | $'+ revenue)

    }
      )
      .on('mouseout',function(d){
        d3.select(this).attr('opacity','1')

      })


      })


    // function wrap(text, width) {
    //     text.each(function() {
    //       let text = d3.select(this),
    //         words = text.text().split(/\s+/).reverse(),
    //         word,
    //         line = [],
    //         lineNumber = 0,
    //         lineHeight = 1.1, // ems
    //         x = text.attr("x"),
    //         y = text.attr("y"),
    //         dy = 1.1,
    //         tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    //       while (word = words.pop()) {
    //         line.push(word);
    //         tspan.text(line.join(" "));
    //         if (tspan.node().getComputedTextLength() > width) {
    //           line.pop();
    //           tspan.text(line.join(" "));
    //           line = [word];
    //           tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
    //         }
    //       }
    //     });
    //   }

      function render() {
        const svgContainer = svg.node().closest('div')
        const svgWidth = svgContainer.offsetWidth
        // Do you want it to be full height? Pick one of the two below
        const svgHeight = height + margin.top + margin.bottom
        // const svgHeight = window.innerHeight
    
        const actualSvg = d3.select(svg.node().closest('svg'))
        actualSvg.attr('width', svgWidth).attr('height', svgHeight)
    
        const newWidth = svgWidth - margin.left - margin.right

        yPositionScale.range([0,0.4*newWidth])

        svg.select('#percent').attr('x', yPositionScale(25)-15)


        svg.select('.bar_5_town_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
        svg.select('.bar_5').attr("x", newWidth/35).attr('width', 0)
        svg.select('.label_1').attr('x', newWidth/35).text('% Intl')

   
        // bar_6    
   
           svg.select('.bar_6_town_100').attr("x",0.4*newWidth+100).attr('width', 0.4*newWidth)
           svg.select('.bar_6').attr("x", 0.4*newWidth+100).attr('width', 0)
           svg.select('.label_2').attr('x', 0.4*newWidth+100).text('Ugrad-Grad')


     root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
    root.sum(function(d) { return +d.value })   


        d3.treemap()
        .size([newWidth, height])
        .padding(4)
        (root)

        console.log(root.leaves()[0].parent,'2')

        svg.selectAll('.treemap').remove()
    
    
        svg
    .selectAll("rect-tree")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr('class', 'treemap')
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0;})
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "none")
      .style("fill", "#69b3a2")
      .on('mouseover', function(d){
        d3.select(this).attr('opacity','0.5')
        svg.select('.school_name').text(d.data.name)
        var revenue = +d.data.Grad_revenue + +d.data.Ugrad_revenue
        svg.select('.sub').text(d.data.value + ' students | $'+ revenue)

        svg.select('.bar_5') .transition()
            .duration(700).ease(d3.easeElastic).attr('width', yPositionScale(+d.data.percent))
        
    }
      )
      .on('mouseout',function(d){
        d3.select(this).attr('opacity','1')

      })
    
      if (newWidth>450){
        svg.select('.school_name').attr('font-size', '25px')
        }
    
    
      if (newWidth<450){
      svg.select('.school_name').attr('font-size', '20px')

      svg.select('.school_name').attr('font-size', '20px')

        svg.select('.bar_5_town_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
        svg.select('.bar_5').attr("x", newWidth/35).attr('width', 0)
        svg.select('.label_1').attr('x', newWidth/35).text('% Intl')

   
        // bar_6    
   
           svg.select('.bar_6_town_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
           svg.select('.bar_6').attr("x", 0.4*newWidth+600).attr('width', 0)
           svg.select('.label_2').attr('x', 0.4*newWidth+60).text('Ugrad-Grad')
      }
    
      if (newWidth<250){
        svg.select('.school_name').attr('font-size', '15px')

        svg.select('.bar_5_town_100').attr('width', 0.4*newWidth).attr("x", newWidth/35)
        svg.select('.bar_5').attr("x", newWidth/35).attr('width', 0)
        svg.select('.label_1').attr('x', newWidth/35).text('% Intl')

   
        // bar_6    
   
           svg.select('.bar_6_town_100').attr("x",0.4*newWidth+60).attr('width', 0.4*newWidth)
           svg.select('.bar_6').attr("x", 0.4*newWidth+600).attr('width', 0)
           svg.select('.label_2').attr('x', 0.4*newWidth+60).text('Ugrad-Grad')
      }

      d3.select('#toggle').on('click', () => {
        root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
    root.sum(function(d) { return +d.value })   

    d3.treemap()
        .size([newWidth, height])
        .padding(4)
        (root)

    svg.selectAll('.treemap').remove()
    
    
        svg
    .selectAll("rect-tree")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr('class', 'treemap')
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0;})
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "none")
      .style("fill", "#69b3a2")
      .on('mouseover', function(d){
        d3.select(this).attr('opacity','0.5')
        svg.select('.school_name').text(d.data.name)
        var revenue = +d.data.Grad_revenue + +d.data.Ugrad_revenue
        svg.select('.sub').text(d.data.value + ' students | $'+ revenue)

    }
      )
      .on('mouseout',function(d){
        d3.select(this).attr('opacity','1')

      })


      })



      d3.select('#toggle2').on('click', () => {
        root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
    root.sum(function(d) { return (+d.Grad_revenue + +d.Ugrad_revenue)/2 })   

    d3.treemap()
        .size([newWidth, height])
        .padding(4)
        (root)

    svg.selectAll('.treemap').remove()
    
    
        svg
    .selectAll("rect-tree")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr('class', 'treemap')
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0;})
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "none")
      .style("fill", "#69b3a2")
      .on('mouseover', function(d){
        d3.select(this).attr('opacity','0.5')
        svg.select('.school_name').text(d.data.name)
        var revenue = +d.data.Grad_revenue + +d.data.Ugrad_revenue
        svg.select('.sub').text(d.data.value + ' students | $'+ revenue)

    }
      )
      .on('mouseout',function(d){
        d3.select(this).attr('opacity','1')

      })


      })


      }
      window.addEventListener('resize', render)

      // And now that the page has loaded, let's just try
      // to do it once before the page has resized
      render()
  }