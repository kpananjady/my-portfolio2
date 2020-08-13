import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 0, left: 0, right: 50, bottom: 100 }
const height = 450 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

var cellSize = calcCellSize(width, height, 13, 8);

// console.log(cellSize, 'cellsize')
var gridData = gridData(16, 11, cellSize);
// console.log(gridData, 'gridData')
const colorScale = d3.scaleSequential(d3.interpolateOranges).domain([0, 800])

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


var gridMap = svg.append("g")
    .attr("class", "gridmap")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var grid = svg.append("g")
    .attr("class", "gridlines")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var row = grid.selectAll(".row")
    .data(gridData)
    .enter()
    .append("g")
    .attr("class", "row");

var column = row.selectAll(".cell")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", function(d) { return d.width; })
    .attr("height", function(d) { return d.height; })
    .style("fill", "none")
    .style("stroke", "lightgrey")
    .lower()

function gridData(ncol, nrow, cellsize) {
    var gridData = [];
    var xpos = 1;  // starting xpos and ypos at 1 so the stroke will show when we make the grid below 
    var ypos = 1;
  
    // calculate width and height of the cell based on width and height of the canvas
    var cellSize = cellsize;
  
    // iterate for rows
    for (var row = 0; row < nrow; row++) {
      gridData.push([]);
      
      // iterate for cells/columns inside each row
      for (var col = 0; col < ncol; col++) {
        gridData[row].push({
          x: xpos,
          y: ypos,
          width: cellSize,
          height: cellSize
        });
        
        // increment x position (moving over by 50)
        xpos += cellSize;
      }
      
      // reset x position after a row is complete
      xpos = 1;
      // increment y position (moving down by 50)
      ypos += cellSize;
    }
    return gridData;
  }

function calcCellSize(w, h, ncol, nrow) {
    // leave tiny space in margins
    var gridWidth  = w - 4;
    var gridHeight = h - 25;
    var cellSize;
  
    // calculate size of cells in columns across
    var colWidth = Math.floor(gridWidth / ncol);
    // calculate size of cells in rows down
    var rowWidth = Math.floor(gridHeight / nrow);
  
    // take the smaller of the calculated cell sizes
    if (colWidth <= rowWidth) {
      cellSize = colWidth;
    } else {
      cellSize = rowWidth;
    }
    return cellSize;
  }

  Promise.all([
    d3.csv(require('/data/square_counties.csv')),
    d3.csv(require('/data/Covid_complaints.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))


  const tip = d3
.tip()
.attr('class', 'd3-tip')
.offset([-20, 0])
.html(function(d) {
  return `${(d['state'])}`
})

svg.call(tip)


  function ready([states_data,datapoints]) {
    svg.append('rect').attr('id', 'box00').attr('width', 25).attr('height', 5).attr('x',width-200).attr('y', height+50).attr('fill', colorScale(0)).attr('opacity',1)
    svg.append('rect').attr('id', 'box0').attr('width', 25).attr('height', 5).attr('x',width-175).attr('y', height+50).attr('fill', colorScale(200)).attr('opacity',1)
    svg.append('rect').attr('id', 'box1').attr('width', 25).attr('height', 5).attr('x',width-150).attr('y', height+50).attr('fill', colorScale(400)).attr('opacity',1)
    svg.append('rect').attr('id', 'box2').attr('width', 25).attr('height', 5).attr('x',width-125).attr('y', height+50).attr('fill', colorScale(600)).attr('opacity',1)
    svg.append('rect').attr('id', 'box3').attr('width', 25).attr('height', 5).attr('x',width-100).attr('y', height+50).attr('fill', colorScale(800)).attr('opacity',1)

    svg.append('text').attr('id', 'box1-text').text('0').attr('x',width-200).attr('y', height+45).attr('font-size', 10)

    svg.append('text').attr('id', 'box4-text').text('800+').attr('x',width-95).attr('y', height+45).attr('font-size', 10)

     var states = gridMap.selectAll(".state")
      .data(states_data, function(d) { return d.code })

    //   console.log(states, 'states')

      states.enter()
        .append("rect")
        .attr('class', 'state_boxes')
          .attr("id", function(d) { return "state " + d.code; })
          .attr("x", function(d) { return (d.col - 1) * cellSize; })
          .attr("y", function(d) { return (d.row - 1) * cellSize; })
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr('fill', 'lightgrey')
          .attr('fill', function(d){


            var colorVar = 'lightgrey';

        //     datapoints.forEach(function(r){if (r.State==="Minnesota"){
        //         console.log(r['Total Complaints'], 'r')
        //     }
        // }) 

        
            // console.log()
            datapoints.forEach(function(r){if (r.State===d.state){
 
          // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
                // console.log(r)
            d['Total Complaints'] = +r['Total Complaints']
            colorVar = colorScale(r['Total Complaints'])
        }
      })  

  
        return colorVar

          })
          .attr('stroke', 'white')
          .on('mouseover', tip.show)
          .on('click', tip.show)
          .on('mouseout', tip.hide)



          var labels = gridMap.selectAll(".label")
        .data(states_data, function(d) { return d.code; })

    // add state labels
    labels.enter()
        .append("text")
        .attr('class', 'state_label')
          .attr("id", function(d) { return "label " + d.code; })
          .attr("x", function(d) {
            return ((d.col - 1) * cellSize) + (cellSize / 2);
          })
          .attr("y", function(d) {
            return ((d.row - 1) * cellSize) + (cellSize /2 + 5);
          })
          .text(function(d) { return d.code; })
          .style("text-anchor", "middle").attr('font-size', '15px').attr('font-weight', 5)
          .attr('fill', function(d){
              if (d.code ==='NY'){
                  return "white"
              } else {
                  return 'black'
              }
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

            svg.selectAll('.state_boxes').remove()
            svg.selectAll('.state_label').remove()


            function gridData(ncol, nrow, cellsize) {
                var gridData = [];
                var xpos = 1;  // starting xpos and ypos at 1 so the stroke will show when we make the grid below 
                var ypos = 1;
              
                // calculate width and height of the cell based on width and height of the canvas
                var cellSize = cellsize;
              
                // iterate for rows
                for (var row = 0; row < nrow; row++) {
                  gridData.push([]);
                  
                  // iterate for cells/columns inside each row
                  for (var col = 0; col < ncol; col++) {
                    gridData[row].push({
                      x: xpos,
                      y: ypos,
                      width: cellSize,
                      height: cellSize
                    });
                    
                    // increment x position (moving over by 50)
                    xpos += cellSize;
                  }
                  
                  // reset x position after a row is complete
                  xpos = 1;
                  // increment y position (moving down by 50)
                  ypos += cellSize;
                }
                return gridData;
              }
            
            function calcCellSize(w, h, ncol, nrow) {
                // leave tiny space in margins
                var gridWidth  = w - 4;
                var gridHeight = h - 25;
                var cellSize;
              
                // calculate size of cells in columns across
                var colWidth = Math.floor(gridWidth / ncol);
                // calculate size of cells in rows down
                var rowWidth = Math.floor(gridHeight / nrow);
              
                // take the smaller of the calculated cell sizes
                if (colWidth <= rowWidth) {
                  cellSize = colWidth;
                } else {
                  cellSize = rowWidth;
                }
                return cellSize;
              }

            var cellSize = calcCellSize(newWidth, height, 13, 8);

// console.log(cellSize, 'cellsize')
var gridData = gridData(16, 11, cellSize);
// console.log(gridData, 'gridData')
var states = gridMap.selectAll(".state")
.data(states_data, function(d) { return d.code })

//   console.log(states, 'states')

states.enter()
  .append("rect")
  .attr('class', 'state_boxes')
    .attr("id", function(d) { return "state " + d.code; })
    .attr("x", function(d) { return (d.col - 1) * cellSize; })
    .attr("y", function(d) { return (d.row - 1) * cellSize; })
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr('fill', 'lightgrey')
    .attr('fill', function(d){


      var colorVar = 'lightgrey';

      datapoints.forEach(function(r){if (r.State==="Minnesota"){
          console.log(r['Total Complaints'], 'r')
      }
  }) 

  
      // console.log()
      datapoints.forEach(function(r){if (r.State===d.state){

    // console.log(parseFloat(r['Hispanic'])+parseFloat(r['Black alone']))
          // console.log(r)
      d['Total Complaints'] = +r['Total Complaints']
      colorVar = colorScale(r['Total Complaints'])
  }
})  


  return colorVar

    })
    .attr('stroke', 'white')
    .on('mouseover', tip.show)
    .on('click', tip.show)
    .on('mouseout', tip.hide)

    labels.enter()
    .append("text")
    .attr('class', 'state_label')
      .attr("id", function(d) { return "label " + d.code; })
      .attr("x", function(d) {
        return ((d.col - 1) * cellSize) + (cellSize / 2);
      })
      .attr("y", function(d) {
        return ((d.row - 1) * cellSize) + (cellSize /2 + 5);
      })
      .text(function(d) { return d.code; })
      .style("text-anchor", "middle").attr('font-size', function(d){
          if (newWidth<400){
              return '10px'
          } else {
              return '15px'
          }
      }).attr('font-weight', 5)
      .attr('fill', function(d){
        if (d.code ==='NY'){
            return "white"
        } else {
            return 'black'
        }
    })


      svg.select('#box1-text').attr('x',newWidth-200)
      svg.select('#box4-text').attr('x',newWidth-95)

      svg.select('#box00').attr('x', newWidth-200).attr('y', height+50)
      svg.select('#box0').attr('x', newWidth-175)
      svg.select('#box1').attr('x', newWidth-150)
      svg.select('#box2').attr('x', newWidth-125)
      svg.select('#box3').attr('x', newWidth-100)
        }
        window.addEventListener('resize', render)
    
        // And now that the page has loaded, let's just try
        // to do it once before the page has resized
        render()
        

  }