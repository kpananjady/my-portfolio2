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


const parseTime = d3.timeParse('%Y-%m-%d')
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

Promise.all([
    d3.csv(require('/data/Initial_Claims_UE.csv')),
    d3.csv(require('/data/Continued_Claims_UE.csv'))
  ])
    .then(ready)
    .catch(err => console.log('Failed on', err))
    const tip = d3
    .tip()
    .attr('class', 'd3-tip d3-tip-scrolly')
    .style('pointer-events', 'none')
    .offset([-10, 0])
    .html(function(d) {
    //   if (d['type']==='initial'){
          return `${d['value'].toLocaleString()} ${d['type']} claims<br>
          on ${d['New Claim Date']}`
    //   }

      // (d3.max(dates).getMonth()+1) + "-" + d3.max(dates).getDate()
    })
    
    svg.call(tip)


function ready([datapoints, datapoints1]) {
  // Sort the countries from low to high


  datapoints.forEach(d => {

    // console.log((d["dateupdated"]))
    d.datetime = parseTime(d["New Claim Date"])
  })

//new
//   function sortByDateAscending(a, b) {
//     // Dates will be cast to numbers automagically:
//     return ad["New Claim Date"] - bd["New Claim Date"];
// }



const dates = datapoints.map(d => d.datetime)
//new
//dates = dates.sort(sortByDateAscending);


var dates_array = d3.timeDays(d3.min(dates), d3.max(dates))
dates_array.push(d3.max(dates))

// console.log(dates_array[dates_array.length-1], 'this')

const hosps = datapoints.map(d => +d['value'])

// xPositionScale.domain(dates_array)
xPositionScale.domain(dates)
yPositionScale.domain([0,d3.max(hosps)])

const arrayNames =[]
var nested = d3.nest()
      .key(k => k['variable'])
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
    .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%50)}));

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
        county.values.forEach(function(d){
            arrayHosps.push(d['value'])
            // const countyName = d['County']
        })
        console.log(Math.max.apply(null, arrayHosps), 'all of em')
        const maxValue = Math.max.apply(null, arrayHosps)
        // console.log(county.values[0]['county'], 'here I am')
        const container = d3.select(this)

        // console.log(county.values[0]['county'], 'countyName')
   
    
    
container        .append('g')
        .attr('class', 'axis x-axis')
        .call(xAxis)
        // .ticks(3)
        .lower()
    
      const yAxis = d3
        .axisLeft(yPositionScale)
        .tickSize(-width)
        .ticks(3)
        
    
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
        return `url_${d['New Claim Date']}`
    })
    .attr('width', xPositionScale.bandwidth())
    .attr('height', d => {
        // console.log('here')
        // console.log(d['Pop_Adjusted'], 'hsosp')
      return 50 - yPositionScale(d['value'])
    })
    .attr('x', d => {
      return xPositionScale(d.datetime)
    })
    .attr('y', d => {
      return yPositionScale(d['value'])
    })
    .attr('fill', function(d){
        if (d['type']=='initial'){
        return 'darkgreen'
        } else {
            return 'red'
        }
    })
     .attr('opacity',function(d){
        if (d['type']=='initial'){
        return 0.5
        } else {
            return 0.2
        }
    })
.on('mouseover', function(d){
    d3.selectAll(`#url_${d['New Claim Date']}`).attr('opacity',1)
    // d.value = d['hospitalization']
    // d.pct = 100*d['hospitalization']/maxValue
    tip.show.call(this, d)

})
.on('mouseout', function(d){
    d3.selectAll(`#url_${d['New Claim Date']}`).attr('opacity',function(d){
        if (d['type']=='initial'){
        return 0.5
        } else {
            return 0.2
        }
    })
  tip.hide.call(this, d)

})
    // .lower()


        
      container.attr('transform', `translate(${0},${0})`)
      if (county.values[0]['variable'] === 'Zero') {
      container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('Zero')
    .attr('x',-120)    .attr('y',25)
}

      if (county.values[0]['variable'] === 'Less than $20,000') {
        container.attr('transform', `translate(${0},${75})`)
        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('<$20,000')
    .attr('x',-120)    .attr('y',25)
      }
      if (county.values[0]['variable'] === '$20,000 to less than $35,000') {
        container.attr('transform', `translate(${0},${150})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('$20,000-$35,000')
    .attr('x',-120)    .attr('y',25)
      }

      if (county.values[0]['variable'] === '$35,000 to less than $50,000') {
        container.attr('transform', `translate(${0},${225})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('$35,000-$50,000')
    .attr('x',-120)    .attr('y',25)
      }

      if (county.values[0]['variable'] === '$50,000 to less than $75,000') {
        container.attr('transform', `translate(${0},${300})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('$50,000-$75,000')
    .attr('x',-120)    .attr('y',25)
      }


      if (county.values[0]['variable'] === '$75,000 to less than $150,000') {
        container.attr('transform', `translate(${0},${375})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('$75,000-$150,000')
    .attr('x',-120)    .attr('y',25)
      }

      if (county.values[0]['variable'] === '$150,000 or more ') {
        container.attr('transform', `translate(${0},${450})`)

        container
    .append('text').attr('font-size', '10px').attr('font-weight', 5)
    .text('$150,000<')
    .attr('x',-120)    .attr('y',25)
      }

    //   if (county.values[0]['county'] === 'Middlesex') {
    //     container.attr('transform', `translate(${0},${525})`)

    //     container
    // .append('text').attr('font-size', '10px').attr('font-weight', 5)
    // .text('Middlesex')
    // .attr('x',-80)    .attr('y',25)
    //   }

    //   const county = d

    //   console.log(county, 'county')

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
         .attr('width', xPositionScale.bandwidth())

    }

      window.addEventListener('resize', render)
    
    //   // And now that the page has loaded, let's just try
    //   // to do it once before the page has resized
      render()
}