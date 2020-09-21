import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip



var margin = { top: 0, left: 0, right: 0, bottom: 0 }
const height = 600 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right


const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

 
                
                svg.append("rect").attr("width",350).attr("height",500).attr("x",0).attr("y",100).attr('fill', '#fff1e0')
            

                svg.append("defs")
                .append("g")
                .attr("id","iconCustom")
                .append("path")
                .attr('d',"M166.63,305.22c-2,0-2.39-1-.77-2.14l1.09-1.69c3.53-5.47,2.4-13.09-2.51-17s-11.75-2.68-15.28,2.8-2.4,13.09,2.51,17l.5.4c.58.35-.62.63-2.68.63s-3.75,4.5-3.75,10v7.43c0,5.5,1.12,10,2.48,10s2.47,2.72,2.47,6.05,1.51,6.06,3.37,6.06,3.37-2.73,3.37-6.06.33-6.05.74-6.05.75,2.72.75,6.05,1.51,6.06,3.35,6.06,3.36-2.73,3.36-6.06,1.07-6.05,2.37-6.05,2.37-4.5,2.37-10v-7.43C170.37,309.72,168.69,305.22,166.63,305.22Z" )



                
            //specify the number of columns and rows for pictogram layout
            var numCols = 10;
            var numRows = 6;
            
            //padding for the grid
            var xPadding =0;
            var yPadding = 0;
            
            //horizontal and vertical spacing between the icons
            var hBuffer = 80;
            var wBuffer = 30;
            
            //generate a d3 range for the total number of required elements
            var myIndex=d3.range(numCols*numRows);

            const xPositionScale = d3
            .scaleLinear()
            .domain([0, 300])
            .range([0, width])
          
          const yPositionScale = d3
            .scaleLinear()
            .domain([0, 120])
            .range([height, 0])
            var trianglePoints = xPositionScale(0) + ' ' + yPositionScale(100) +' ' + xPositionScale(150) + ' ' + yPositionScale(100) + ' ' + xPositionScale(75) + ' ' + yPositionScale(120) + ' ' + xPositionScale(0) + ' ' + yPositionScale(100);

            console.log(trianglePoints);

svg.append('polyline')
    .attr('points', trianglePoints)
    .style('stroke', '#8B0000')
    .style('fill', '#8B0000')


       

            //create group element and create an svg <use> element for each icon
            svg
                .selectAll("use")
                .data(myIndex)
                .enter()
                .append("use")
                    .attr("xlink:href","#iconCustom")
                    .attr("id",function(d)    {
                        return "icon"+d;
                    })
                    .attr("x",function(d) {

                        
                        var remainder=d % numCols;//calculates the x position (column number) using modulus
                        return xPadding+(remainder*wBuffer)-120;//apply the buffer and return value
                    })
                      .attr("y",function(d) {
                        
                        var whole=Math.floor(d/numCols)//calculates the y position (row number)
                        return yPadding+(whole*hBuffer)-160;//apply the buffer and return the value
                    })
                    .classed("iconPlain",true);


                    d3.select('#toggle').on('click', () => {

                        svg.append("text")
                        .attr("id","txtValue")
                        .attr("x",160)
                        .attr("y",90)
                        .text("Year")
                        .transition()
                        .duration(1000)
                        .ease(d3.easeElastic)
                        .text('2011')
                        .transition()
                        .duration(1000)
                        .ease(d3.easeElastic)
                        .text('2020');

                        d3.selectAll("use")
                        .transition().duration(1000)
                        .ease(d3.easeElastic)
                        .attr("class",function(d,i){
                            if (d<23)  {
                                return "iconSelected";
                            }    else    {
                                return "iconPlain";
                            }
                        })
                        .transition().duration(1000)
                        .ease(d3.easeElastic)
                        .attr("class",function(d,i){
                            if (d<61)  {
                                return "iconSelected";
                            }    else    {
                                return "iconPlain";
                            }
                        });

                    })
 
                     
            //create a jquery slider to control the pictogram         
            