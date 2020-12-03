import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = {
  top: 30,
  right: 50,
  bottom: 30,
  left: 120
}

const width = 700 - margin.left - margin.right
const height = 900 - margin.top - margin.bottom

const svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3.scaleBand().range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .range([50, 0])

const colorScale = d3
  .scaleOrdinal()
  .range([
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69'
  ])


const parseTime = d3.timeParse('%m/%d/%Y')
// const parseTime = d3.timeParse('%m/%d/%Y')

// Promise.all([
//     "https://test-uploading-file.s3.amazonaws.com/county_hosps_test.csv",
//     ]
//     .map(function(url) {
//       return fetch(url).then(function(response) {
//         return response.ok ? response.text() : Promise.reject(response.status);
//       }).then(function(text) {
//         return d3.csvParse(text);
//       });
//     })).then(ready)
//     .catch(err => console.log('Failed on', err))

d3.csv(require('/data/county_rate.csv')).then(ready)

// Promise.all([
//     "https://test-uploading-file.s3.amazonaws.com/county_hosps.csv",
//     ]
//     .map(function(url) {
//       return fetch(url).then(function(response) {
//         return response.ok ? response.text() : Promise.reject(response.status);
//       }).then(function(text) {
//         return d3.csvParse(text);
//       });
//     })).then(ready)
//     .catch(err => console.log('Failed on', err))

    const tip = d3
    .tip()
    .attr('class', 'd3-tip d3-tip-scrolly')
    .style('pointer-events', 'none')
    .offset([-10, 0])
    .html(function(d) {
    
      return `Rate: ${parseFloat(100*d['value']).toFixed(2)}%<br>
      ${parseTime(d['Timeframe']).getMonth()+1}/${parseTime(d['Timeframe']).getDate()}/${parseTime(d['Timeframe']).getFullYear()}` 
      // (d3.max(dates).getMonth()+1) + "-" + d3.max(dates).getDate()
    })
    
    svg.call(tip)

function ready(datapoints) {
  // Sort the countries from low to high


  datapoints.forEach(d => {

    // console.log((d["Timeframe"]))
    d.datetime = parseTime(d["Timeframe"])
  })





const dates = datapoints.map(d => d.datetime)



var dates_array = d3.timeDays(d3.min(dates), d3.max(dates))
dates_array.push(d3.max(dates))

// console.log(dates_array[dates_array.length-1], 'this')

const hosps = datapoints.map(d => +d['Percent Positivity in prior 14 days']*100)

xPositionScale.domain(dates_array)
yPositionScale.domain([0,d3.max(hosps)+5])

const arrayNames =[]
var nested = d3.nest()
      .key(k => k['County'])
      .entries(datapoints);

   nested.forEach(function(d){

    arrayNames.push(d.key)
   })
   console.log(nested)

   console.log(arrayNames)
    const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(50)
    .tickFormat(d3.timeFormat('%b %d'))
    .tickValues([d3.min(dates),d3.max(dates)]);

    svg
    .selectAll('.player-data')
    .data(nested)
    .enter()
    .append('g')
    .each(function(d, i) {

        const county = d;
        const  arrayHosps = []
        // console.log(county.values['hospitalization'], 'finding the maximum')

        // const countyName;
        // county.values.forEach(function(d){
        //     arrayHosps.push(d['hospitalization'])
        //     // const countyName = d['County']
        // })
        // console.log(Math.max.apply(null, arrayHosps), 'all of em')
        // const maxValue = Math.max.apply(null, arrayHosps)
        // console.log(county.values[0]['County'], 'here I am')
        const container = d3.select(this)

        console.log(county.values[0]['County'], 'countyName')
   
    
    
container        .append('g')
        .attr('class', 'axis x-axis')
        .call(xAxis)
        .lower()
    
      const yAxis = d3
        .axisLeft(yPositionScale)
        .tickSize(-width)
        .ticks(5)
        
    
        container        .append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis)
        .lower()
    
    
        
    
        d3.select('.y-axis .domain').remove()
        d3.select('.x-axis .domain').remove()

        container
        .selectAll('text_label')
    .data(county)
    .enter()
    .append('text').attr('font-size', '15px').attr('font-weight', 5)
    .text(function(d){
       
        return d
    })
    .attr('x',-80)    .attr('y',25)


        container
        .selectAll('rect')
    .data(county.values)
    .enter()
    .append('rect')
    .attr('class', 'rect_all')
    .attr('id', function(d){
        return `url_${d['Timeframe']}`
    })
    .attr('width', xPositionScale.bandwidth())
    .attr('height', d => {
        // console.log('here')
        // console.log(d['Percent Positivity in prior 14 days'], 'hsosp')
      return 50 - yPositionScale(100*d['Percent Positivity in prior 14 days'])
    })
    .attr('x', d => {
      return xPositionScale(d.datetime)
    })
    .attr('y', d => {
      return yPositionScale(100*d['Percent Positivity in prior 14 days'])
    })
    .attr('fill', function(d){

        if (d['Test Positivity Classification - 14 days']=="Yellow"){
            return '#FED000'
        }
        else {
            return d['Test Positivity Classification - 14 days']
        }
    })
     .attr('opacity',0.7)
.on('mouseover', function(d){
    d3.select(this).attr('opacity',1)
    d.value = d['Percent Positivity in prior 14 days']
    // d.pct = 100*d['hospitalization']/maxValue
    tip.show.call(this, d)

})
.on('mouseout', function(d){
  d3.select(this).attr('opacity',0.7)
  tip.hide.call(this, d)

})
    // .lower()


        
      container.attr('transform', `translate(${0},${0})`)
      if (county.values[0]['County'] === 'Windham') {
      container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('Windham')
    .attr('x',-80)    .attr('y',25)
}

      if (county.values[0]['County'] === 'Fairfield') {
        container.attr('transform', `translate(${0},${75})`)
        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('Fairfield')
    .attr('x',-80)    .attr('y',25)
      }
      if (county.values[0]['County'] === 'Hartford') {
        container.attr('transform', `translate(${0},${150})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('Hartford')
    .attr('x',-80)    .attr('y',25)
      }

      if (county.values[0]['County'] === 'Litchfield') {
        container.attr('transform', `translate(${0},${225})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('Litchfield')
    .attr('x',-80)    .attr('y',25)
      }

      if (county.values[0]['County'] === 'Tolland') {
        container.attr('transform', `translate(${0},${300})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('Tolland')
    .attr('x',-80)    .attr('y',25)
      }

      if (county.values[0]['County'] === 'New Haven') {
        container.attr('transform', `translate(${0},${375})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('New Haven')
    .attr('x',-80)    .attr('y',25)
      }

      if (county.values[0]['County'] === 'New London') {
        container.attr('transform', `translate(${0},${450})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('New London')
    .attr('x',-80)    .attr('y',25)
      }

      if (county.values[0]['County'] === 'Middlesex') {
        container.attr('transform', `translate(${0},${525})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('Middlesex')
    .attr('x',-80)    .attr('y',25)
      }

    //   const county = d

    //   console.log(county, 'County')

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
        // const newHeight = svgHeight - margin.top - margin.bottom
    
        // Update our scale
        xPositionScale.range([0, newWidth])
        // yPositionScale.range([newHeight, 0])
    
    //     // Update things you draw
   
    
    //     // Update axes
         d3.selectAll('.x-axis').call(xAxis)
         d3.selectAll('.x-axis .domain').remove()
    
         svg
         .selectAll('rect')
         .attr('x', d => {
           return xPositionScale(d.datetime)
         })

    }

      window.addEventListener('resize', render)
    
    //   // And now that the page has loaded, let's just try
    //   // to do it once before the page has resized
      render()
}