import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 150, left: 100, right: 50, bottom: 50 }
const height = 650 - margin.top - margin.bottom
const width = 800 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


//   var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
//   color = d3.scaleOrdinal().range([
// "#1f77b4","#ff7f0e"
// ,"#2ca02c"
// ,"#d62728"
// ,"#9467bd"
// ,"#8c564b"
// ,"#e377c2"
// ,"#7f7f7f"
// ,"#bcbd22"
// ,"#17becf"
//   ]),
//   format = d3.format(",d");

// var treemap = d3.treemap()
//   .tile(d3.treemapResquarify)
//   .size([width, height])
//   .round(true)
//   .paddingInner(1);

  d3.csv(require('../data/dummydata2_treemap.csv')).then(ready)

// function sumByCount(d) {
//     return d.children ? 0 : 1;
//   }
  
//   function sumBySize(d) {
//     return d.size;
//   }
  

//   d3.json(require('../data/dummydata_treemap.json')).then(ready)

  function ready(data) {


    svg.append('text').attr('class', 'town_name').text('Hover on the schools below!').attr('alignment-baseline', 'middle').attr('y',-110).attr('font-size', '30px').attr('font-weight', 5)


//     var root = d3.hierarchy(data)
//       .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
//       .sum(sumBySize)
//       .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

//   treemap(root);

//   var cell = svg.selectAll("g")
//     .data(root.leaves())
//     .enter().append("g")
//       .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

//   cell.append("rect")
//       .attr("id", function(d) { return d.data.id; })
//       .attr("width", function(d) { return d.x1 - d.x0; })
//       .attr("height", function(d) { return d.y1 - d.y0; })
//       .attr("fill", function(d) { return color(d.parent.data.id); });

//   cell.append("clipPath")
//       .attr("id", function(d) { return "clip-" + d.data.id; })
//     .append("use")
//       .attr("xlink:href", function(d) { return "#" + d.data.id; });

//   cell.append("text")
//       .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
//     .selectAll("tspan")
//       .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
//     .enter().append("tspan")
//       .attr("x", 4)
//       .attr("y", function(d, i) { return 13 + i * 10; })
//       .text(function(d) { return d; });

//   cell.append("title")
//       .text(function(d) { return d.data.id + "\n" + format(d.value); });

//   d3.selectAll("input")
//       .data([sumBySize, sumByCount], function(d) { return d ? d.name : this.value; })
//       .on("change", changed);

//   var timeout = d3.timeout(function() {
//     d3.select("input[value=\"sumByCount\"]")
//         .property("checked", true)
//         .dispatch("change");
//   }, 2000);

//   function changed(sum) {
//     timeout.stop();

//     treemap(root.sum(sum));

//     cell.transition()
//         .duration(750)
//         .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
//       .select("rect")
//         .attr("width", function(d) { return d.x1 - d.x0; })
//         .attr("height", function(d) { return d.y1 - d.y0; });
//   }


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
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0;})
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "none")
      .style("fill", "#69b3a2")
      .on('mouseover', function(d){
        d3.select(this).attr('opacity','0.5')
          svg.select('.town_name').text(d.data.name)
      }
      )
      .on('mouseout',function(d){
        d3.select(this).attr('opacity','1')

      })

      d3.select('#toggle').on('click', () => {
        d3.select(this).attr('fill','grey')

        svg.selectAll('.towns').attr('fill', function(d){
          var colorVar=0 
            housing.forEach(function(r){if (r.Town===d.properties.NAME10){
            colorVar = colorScale(r['Percent Affordable'])
          }
      }) 
          return colorVar 
        })
      })

  // and to add the text labels
//   svg
//     .selectAll("text-name")
//     .data(root.leaves())
//     .enter()
//     .append("text")
//       .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
//       .attr("y", function(d){ return d.y0-10})    // +20 to adjust position (lower)
//       .text(function(d){ return d.data.name})
//       .attr("font-size", "15px")
//       .attr("fill", "white")
//       .call(wrap, 20);

    function wrap(text, width) {
        text.each(function() {
          let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 1.1,
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }
  }