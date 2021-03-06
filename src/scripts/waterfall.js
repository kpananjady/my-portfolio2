import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = {
  top: 30,
  right: 50,
  bottom: 30,
  left: 50
}

const width = 700 - margin.left - margin.right
const height =420 - margin.top - margin.bottom

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3.scaleBand().range([0, width])

const yPositionScale = d3
  .scaleLinear()
  // .domain([0, 85])
  .range([height/2, 50])


const parseTime = d3.timeParse('%Y-%m-%d')

// var tick = new Date()





  Promise.all([
    //   d3.csv('data/waterfall_dummy_data.csv'),
      d3.csv(require('/data/waterfall_dummy_data.csv')),
      d3.csv(require('/data/water_dummy_data_2.csv'))
    
    ]).then(ready)
      .catch(err => console.log('Failed on', err))

      const tip = d3
      .tip()
      .attr('class', 'd3-tip d3-tip-scrolly')
      .style('pointer-events', 'none')
      .offset([-10, 0])
      .html(function(d) {
      
        return `${parseFloat(d['value']).toFixed(2)}% of ${d['sentenced']} <br>
         sentenced inmates` 
        // (d3.max(dates).getMonth()+1) + "-" + d3.max(dates).getDate()
      })
      
      svg.call(tip)
function ready([datapoints, datapoints_30]) {

    var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b");
var parseDate = d3.timeParse("%m/%d/%y");

var startDate = new Date("2020-03-02"),
    endDate = new Date("2020-11-02");

//     var margin = {top:30, right:20, bottom:30, left:50},
//     width = 700 - margin.left - margin.right,
//     height = 100 - margin.top - margin.bottom;

// var svg_2 = d3.select("#vis")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom) 

    var moving = false;
var currentValue = 0;
var targetValue = 200;

var playButton = d3.select("#play-button");
    
var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + 10 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          currentValue = d3.event.x;
          update(x.invert(currentValue)); 
        })
    );

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text_label")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDate(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")  
    .attr("class", "label")
    .attr("text-anchor", "middle")
    // .text(formatDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")")
    
var timer;
    playButton
    .on("click", function() {
    var button = d3.select(this);
    if (button.text() == "Pause") {
      moving = false;
      clearInterval(timer);
    //   timer = 0;
      button.text("Play");
    } else {
      moving = true;
      timer = setInterval(step, 1000);
      button.text("Pause");
    }
    console.log("Slider moving: " + moving);
  })

  function step() {
    update(x.invert(currentValue));
    currentValue = currentValue + (targetValue/8);
    if (currentValue > targetValue) {
      moving = false;
      currentValue = 0;
      clearInterval(timer);
    //   timer = 0;
      playButton.text("Play");
      console.log("Slider moving: " + moving);
    }
  }

  function update(h) {
    // update position and text of label according to slider scale

    // tick = h
    console.log(h)
    handle.attr("cx", x(h));
    label
      .attr("x", x(h))
      .text(formatDate(h));
  
    updateBars()
    // filter data set and redraw plot
    // var newData = dataset.filter(function(d) {
    //   return d.date < h;
    // })
    // drawPlot(newData);
  }


  function updateBars() {
    // update position and text of label according to slider scale

    // tick = h

    // console.log('here I am')
    d3.selectAll('.bars').remove()

    svg.selectAll('.nonsese').data(datapoints.filter(function(d){ return parseTime(d.date).getMonth() ===  x.invert(currentValue).getMonth()}))
    .enter()
    .append('rect')
    .attr('class','bars')
    .attr("y", function(d) { return yPositionScale( Math.max(d.start, d.end) ); })
    .attr("height", function(d) { return Math.abs( yPositionScale(d.start) - yPositionScale(d.end) ); })
    .attr("width", xPositionScale.bandwidth()-20)
    .attr('x', d=>xPositionScale(d.name))
    .attr('fill', function(d){
      if (d.name =='Net Change') {
        return '#ff6600'
    }
      if (d.value > 0){
          return '#FED000'
      } if (d.value < 0){
          return 'darkred'
      } 
  
  }).attr('opacity', 0.7)
    .on('mouseover', function(d){
      // d3.select(this).attr('r', 6)
      // d.value = d.Hosp_Avg
      tip.show.call(this, d)
  
  })
  .on('mouseout', function(d){
    // d3.select(this).attr('r', 3)
    tip.hide.call(this, d)
  
  })
svg
.append('g')
.attr('transform', 'translate(' + 0 + ',' +200+ ')')
.selectAll('.nonsese2')
.data(datapoints_30.filter(function(d){ return parseTime(d.date).getMonth() ===  x.invert(currentValue).getMonth()}))
.enter()
.append('rect')
.attr('class','bars')
.attr("y", function(d) { return yPositionScale( Math.max(d.start, d.end) ); })
.attr("height", function(d) { return Math.abs( yPositionScale(d.start) - yPositionScale(d.end) ); })
.attr("width", xPositionScale.bandwidth()-20)
.attr('x', d=>xPositionScale(d.name))
.attr('fill', function(d){
  if (d.name =='Net Change') {
    return '#ff6600'
}
    if (d.value > 0){
        return '#FED000'
    } if (d.value < 0){
        return 'darkred'
    } 

}).attr('opacity', 0.7)
.on('mouseover', function(d){
  // d3.select(this).attr('r', 6)
  // d.value = d.Hosp_Avg
  tip.show.call(this, d)

})
.on('mouseout', function(d){
// d3.select(this).attr('r', 3)
tip.hide.call(this, d)

})
    // filter data set and redraw plot
    // var newData = dataset.filter(function(d) {
    //   return d.date < h;
    // })
    // drawPlot(newData);
  }



//   function store(h) {
//     // update position and text of label according to slider scale
//     var storedH = h
//     return storedH
//     // filter data set and redraw plot
//     // var newData = dataset.filter(function(d) {
//     //   return d.date < h;
//     // })
//     // drawPlot(newData);
//   }
//   console.log(tick)

console.log(x.invert(currentValue), 'check this out')


  




xPositionScale.domain(datapoints.map(function(d) { return d.name; }))
yPositionScale.domain([-15, 10])

const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    // .tickFormat(d3.timeFormat('%b %d'))
    // .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%50)}));

  

    svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(' + 0 + ',' +20+ ')')
    .call(xAxis)
    .lower()


    svg
    .append('g')
    .attr('class', 'axis x-axis-2')
    .attr('transform', 'translate(' + 0 + ',' +-170+ ')')
    // .paddingInner(1)
    // .style("text-anchor", "middle")
    .call(xAxis)
    .lower()


const yAxis = d3
.axisLeft(yPositionScale)
.tickSize(-width)
.ticks(5)
// .tickFormat(d => (d === 80 ? '80 years' : d))

svg
.append('g')
.attr('class', 'axis y-axis')
.call(yAxis)
.lower()



d3.select('.y-axis .domain').remove()
d3.select('.x-axis .domain').remove()
d3.select('.x-axis-2 .domain').remove()



svg
.append('g')
.attr('transform', 'translate(' + 0 + ',' +200+ ')')
.attr('class', 'axis y-axis-2')
.call(yAxis)
.lower()

d3.select('.y-axis-2 .domain').remove()


svg.append('text').text('2020').attr('x', -20).attr('y',20)

svg.append('text').text('2019').attr('x', -20).attr('y',height/2+50)
// var cumulative = 0;
// for (var i = 0; i < datapoints.length; i++) {
//     datapoints[i].start = cumulative;
//   cumulative += datapoints[i].value;
//   datapoints[i].end = cumulative;
//   date = datapoints[i].date
//   datapoints[i].class = ( datapoints[i].value >= 0 ) ? 'positive' : 'negative'
// }
// datapoints.push({
//   name: 'Total',
//   end: cumulative,
//   start: 0,
//   class: 'total',
//   date: date
// });


// console.log(getFilteredData(datapoints, x.invert(currentValue)), 'yo')



function render() {
  const svgContainer = svg.node().closest('div')
  const svgWidth = svgContainer.offsetWidth
  // Do you want it to be full height? Pick one of the two below
  const svgHeight = height + margin.top + margin.bottom
  // const svgHeight = window.innerHeight

  const actualSvg = d3.select(svg.node().closest('svg'))
  actualSvg.attr('width', svgWidth).attr('height', svgHeight)

  const newWidth = svgWidth - margin.left - margin.right
  // const newHeight = svgHeight - margin.top - margin.bottom

  // Update our scale
  xPositionScale.range([0, newWidth])
  svg.select('.x-axis').call(xAxis)
  d3.select('.x-axis .domain').remove()
  // yPositionScale.range([newHeight, 0])

  svg.select('.x-axis-2').call(xAxis)
  d3.select('.x-axis-2 .domain').remove()

  svg
  .selectAll('.bars')
  .attr('x', d => {
    return xPositionScale(d.name)
  })
  .attr("width", xPositionScale.bandwidth()-20)
}

// svg
// .selectAll('.bars')
// .attr('mouseover',
// function(d){
// // d3.select(this).attr('r', 3)
// tip.show.call(this, d)
// })
// .attr('mouseout',function(d){
// // d3.select(this).attr('r', 3)
// tip.hide.call(this, d)

// })

  window.addEventListener('resize', render)
    
  //   // And now that the page has loaded, let's just try
  //   // to do it once before the page has resized
    render()
}