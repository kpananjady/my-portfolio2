import * as d3 from 'd3'

const margin = {
  top: 30,
  right: 20,
  bottom: 30,
  left: 120
}

const width = 700 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const svg = d3
  .select('#chart-3')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3.scaleLinear().range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .range([height, 0])

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

Promise.all([
    d3.csv(require('/data/hosp_and_deaths.csv')),
    d3.csv(require('/data/30_days_deaths_hosp.csv'))
  ]).then(ready)
  .catch(err => console.log('Failed on', err))


function ready([datapoints, datapoints_30]) {
  // Sort the countries from low to high

  console.log(datapoints_30)
  
  datapoints.forEach(d => {

    console.log(parseTime(d.Date))
    d.datetime = parseTime(d.Date)
  })
const dates = datapoints.map(d => d.datetime)
const deaths = datapoints.map(d => +d['Deaths_per_day'])

xPositionScale.domain(d3.extent(dates))
yPositionScale.domain(d3.extent(deaths))

// function movingAverage(values, N) {
//     let i = 0;
//     let sum = 0;
//     const means = new Float64Array(values.length).fill(NaN);
//     for (let n = Math.min(N - 1, values.length); i < n; ++i) {
//       sum += values[i];
//     }
//     for (let n = values.length; i < n; ++i) {
//       sum += values[i];
//       means[i] = sum / N;
//       sum -= values[i - N + 1];
//     }
//     return means;
//   }


//   datapoints.forEach(function(d) {
//     d.key = parseTime((d.Date));
//     d.value = +d.Total;
//   });

//   var pppppPrevVal = 0;
//   var ppppPrevVal = 0;
//   var pppPrevVal = 0;
//   var ppPrevVal = 0;

  var prevPrevVal = 0;
      var prevVal = 0;
      var curVal = 0
      var movingAverageLine = d3.line()
      .x(function(d,i) { return xPositionScale(d.key); })
      .y(function(d,i) {
          if (i == 0) {
            // pppppPrevVal = yPositionScale(d.value)
            // ppppPrevVal = yPositionScale(d.value)
            // pppPrevVal = yPositionScale(d.value)
            // ppPrevVal = yPositionScale(d.value)

              prevPrevVal  = yPositionScale(d.value);
              prevVal = yPositionScale(d.value);
              curVal =  yPositionScale(d.value);
          } else if (i == 1) {
              prevPrevVal = prevVal;
              prevVal = curVal;
              curVal = (prevVal + yPositionScale(d.value)) / 2.0;
        //   } else if (i == 1) {
        //       prevPrevVal = prevVal;
        //       prevVal = curVal;
        //       curVal = (prevPrevVal + prevVal + yPositionScale(d.value)) / 3.0;
        //   }  else if (i == 1) {
        //     prevPrevVal = prevVal;
        //     prevVal = curVal;
        //     curVal = (prevPrevVal + prevVal + yPositionScale(d.value)) / 3.0;
        // }  else if (i == 1) {
        //     prevPrevVal = prevVal;
        //     prevVal = curVal;
        //     curVal = (prevPrevVal + prevVal + yPositionScale(d.value)) / 3.0;
        // } else if (i == 1) {
        //     prevPrevVal = prevVal;
        //     prevVal = curVal;
        //     curVal = (prevPrevVal + prevVal + yPositionScale(d.value)) / 3.0;
        // } 
          } else {
            prevPrevVal = prevVal;
            prevVal = curVal;
            curVal = (prevPrevVal + prevVal + yPositionScale(d.value)) / 3.0;
        } 
          return curVal;
      })

      svg.append("path")
        .attr("class", "average")
        .attr("d", movingAverageLine(datapoints))
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .raise()
//   datapoints = datapoints.sort((a, b) => {
//     return a.life_expectancy - b.life_expectancy
//   })

//   // And set up the domain of the xPositionScale
//   // using the read-in data
//   const countries = datapoints.map(d => d.country)
//   xPositionScale.domain(countries)

  /* Add your rectangles here */

//   d3.select('#asia-btn').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.asia').attr('fill', '#4cc1fc')
//   })

//   d3.select('#africa-btn').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.africa').attr('fill', '#4cc1fc')
//   })

//   d3.select('#na-btn').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.namerica').attr('fill', '#4cc1fc')
//   })

//   d3.select('#low-gdp-btn').on('click', () => {
//     svg.selectAll('rect').attr('fill', d => {
//       if (d.gdp_per_capita < 3000) {
//         return '#4cc1fc'
//       } else {
//         return 'lightgrey'
//       }
//     })
//   })

//   d3.select('#continent-btn').on('click', () => {
//     svg.selectAll('rect').attr('fill', d => {
//       return colorScale(d.continent)
//     })
//   })

//   d3.select('#reset-btn').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//   })

//   d3.select('#asia-step').on('stepin', function() {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.asia').attr('fill', '#4cc1fc')
//   })

//   d3.select('#africa-step').on('stepin', function() {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.asia').attr('fill', '#4cc1fc')
//   })

//   d3.select('#namerica-step').on('stepin', function() {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.namerica').attr('fill', '#4cc1fc')
//   })

//   d3.select('#samerica-step').on('stepin', function() {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.samerica').attr('fill', '#4cc1fc')
//   })

//   d3.select('#lowgdp-step').on('stepin', function() {
//     svg.selectAll('rect').attr('fill', d => {
//       if (d.gdp_per_capita < 3000) {
//         return '#4cc1fc'
//       } else {
//         return 'lightgrey'
//       }
//     })
//   })

//   d3.select('#continent-step').on('stepin', function() {
//     svg.selectAll('rect').attr('fill', d => {
//       return colorScale(d.continent)
//     })
//   })

//   d3.select('#reset-step').on('stepin', function() {
//     svg.selectAll('circle').attr('fill', 'lightgrey')
//   })
  svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class','rect_all')
    .attr('width', 3)
    .attr('height', d => {
      return height - yPositionScale(d['Deaths_per_day'])
    })
    .attr('x', d => {
      return xPositionScale(d.datetime)
    })
    .attr('y', d => {
      return yPositionScale(d['Deaths_per_day'])
    })
    .attr('fill', 'lightgrey')
    .lower()
    // .attr('class', d => {
    //   return d.continent.toLowerCase().replace(/[^a-z]*/g, '')
    // })

//   svg
//     .append('text')
//     .text('higher GDP ⟶')
//     .attr('class', 'gdp-note')
//     .attr('id', 'label-1')
//     .attr('text-anchor', 'middle')
//     .attr('font-size', 12)
//     .attr('x', width * 0.75)
//     .attr('y', height + 15)

//   svg
//     .append('text')
//     .text('⟵ lower GDP')
//     .attr('class', 'gdp-note')
//     .attr('id', 'label-2')
//     .attr('text-anchor', 'middle')
//     .attr('font-size', 12)
//     .attr('x', width * 0.25)
//     .attr('y', height + 15)

const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%b %d'))
    .ticks(5)

    svg
    .append('g')
    .attr('class', 'axis x-axis')
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

    d3.select('#toggle5').on('click', () => {

        svg.selectAll('.average').remove()
        svg.selectAll('.rect_30').remove()

        

        
        xPositionScale.domain(d3.extent(dates))
        yPositionScale.domain(d3.extent(deaths))


      svg.append("path")
      .attr("class", "average")
      .attr("d", movingAverageLine(datapoints_30))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .raise()



        svg
        .selectAll('rect')
        .data(datapoints)
        .enter()
        .append('rect')
        .attr('class', 'rect_all')
        .attr('width', 3)
        .attr('height', d => {
          return height - yPositionScale(d['Deaths_per_day'])
        })
        .attr('x', d => {
          return xPositionScale(d.datetime)
        })
        .attr('y', d => {
          return yPositionScale(d['Deaths_per_day'])
        })
        .attr('fill', 'lightgrey')
        .lower()

        svg.select('.x-axis').transition().duration(1000).call(xAxis)

            svg
              .select('.y-axis')
              .transition()
              .duration(1000)
              .call(yAxis)

              d3.select('.y-axis .domain').remove()

              d3.select('.x-axis .domain').remove()

    
      })

    d3.select('#toggle6').on('click', () => {

        svg.selectAll('.average').remove()
        svg.selectAll('.rect_all').remove()

        datapoints_30.forEach(d => {
    
            console.log(parseTime(d.Date))
            d.datetime = parseTime(d.Date)
          })
        const dates2 = datapoints_30.map(d => d.datetime)
        const deaths2 = datapoints_30.map(d => +d['Deaths_per_day'])

        
        xPositionScale.domain(d3.extent(dates2))
        yPositionScale.domain(d3.extent(deaths2))


      svg.append("path")
      .attr("class", "average")
      .attr("d", movingAverageLine(datapoints_30))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .raise()



        svg
        .selectAll('rect')
        .data(datapoints_30)
        .enter()
        .append('rect')
        .attr('class', 'rect_30')
        .attr('width', 20)
        .attr('height', d => {
          return height - yPositionScale(d['Deaths_per_day'])
        })
        .attr('x', d => {
          return xPositionScale(d.datetime)
        })
        .attr('y', d => {
          return yPositionScale(d['Deaths_per_day'])
        })
        .attr('fill', 'lightgrey')
        .lower()

        svg.select('.x-axis').transition().duration(1000).call(xAxis)

            svg
              .select('.y-axis')
              .transition()
              .duration(1000)
              .call(yAxis)

              d3.select('.y-axis .domain').remove()

              d3.select('.x-axis .domain').remove()

    
      })

//   function render() {
//     const svgContainer = svg.node().closest('div')
//     const svgWidth = svgContainer.offsetWidth
//     // Do you want it to be full height? Pick one of the two below
//     const svgHeight = height + margin.top + margin.bottom
//     // const svgHeight = window.innerHeight

//     const actualSvg = d3.select(svg.node().closest('svg'))
//     actualSvg.attr('width', svgWidth).attr('height', svgHeight)

//     const newWidth = svgWidth - margin.left - margin.right
//     // const newHeight = svgHeight - margin.top - margin.bottom

//     // Update our scale
//     xPositionScale.range([0, newWidth])
//     // yPositionScale.range([newHeight, 0])

//     // Update things you draw

//     // Update axes
//     //  svg.select('.x-axis').call(xAxis)
//     svg
//       .select('.y-axis')
//       .transition()
//       .call(yAxis)

//     svg
//       .selectAll('rect')
//       .attr('width', xPositionScale.bandwidth())
//       .attr('height', d => {
//         return height - yPositionScale(d.life_expectancy)
//       })
//       .attr('x', d => {
//         return xPositionScale(d.country)
//       })
//       .attr('y', d => {
//         return yPositionScale(d.life_expectancy)
//       })
//       .attr('fill', 'lightgrey')
//       .attr('class', d => {
//         return d.continent.toLowerCase().replace(/[^a-z]*/g, '')
//       })

//     svg.select('#label-1').attr('x', newWidth * 0.75)
//     //  .attr('y', newHeight + 15)

//     svg.select('#label-2').attr('x', newWidth * 0.25)
//     //   .attr('y', newHeight + 15)

//     d3.select('.y-axis .domain').remove()
//   }

//   // When the window resizes, run the function
//   // that redraws everything
//   window.addEventListener('resize', render)

//   // And now that the page has loaded, let's just try
//   // to do it once before the page has resized
//   render()
}
