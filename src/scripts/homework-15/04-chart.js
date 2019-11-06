// import * as d3 from 'd3'

// const margin = { top: 20, left: 50, right: 0, bottom: 70 }

// const height = 1500 - margin.top - margin.bottom
// const width = 1000 - margin.left - margin.right

// const svg = d3
//   .select('#chart-4')
//   .append('svg')
//   .attr('height', height + margin.top + margin.bottom)
//   .attr('width', width + margin.left + margin.right)
//   .append('g')
//   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Promise.all([
//   d3.csv(require('/data/ces.csv')),
//   d3.csv(require('/data/wages.csv'))
// ])
//   .then(ready)
//   .catch(err => console.log('Failed on', err))

// function ready([ces, wages]) {
//   console.log(ces[0], 'first row')
//   console.log(Object.keys(ces[0]).filter(d => d[0] === '2'), 'attributes')
//   // const dataColumns1 = Object.keys(ces).filter(ces => ces[0] === '2')
//   // console.log(dataColumns1)

//   // const datapoints1 = dataColumns1.map(colName => {
//   //   return {
//   //     name: colName,
//   //     jobs: +ces[colName]
//   //   }
//   // })

//   // const dataColumns2 = Object.keys(wages).filter(d => d[0] === '2')
//   // console.log(dataColumns2)

//   // const datapoints2 = dataColumns1.map(colName => {
//   //   return {
//   //     name: colName,
//   //     jobs: +wages[colName]
//   //   }
//   // })

//   // console.log(datapoints1, '1')
//   // console.log(datapoints2, '2')

//   const dictName = {}
//   wages.forEach(function(d) {
//     const newDict = {
//       firstCol: +d['2006-03-01'],
//       secondCol: +d['2014-04-01']
//     }

//     const id = d.seriesid
//     dictName[id] = newDict
//   })

//   console.log(dictName, 'work pls')

//   // console.log(wageStore, 'wageStore')
//   ces.forEach(function(d) {
//     // ;((+d['2014-01-01'] - +d['2007-12-01']) / +d['2007-12-01']) * 100

//     // console.log(
//     //   'recession',
//     //   ((+d['2014-01-01'] - +d['2007-12-01']) / +d['2007-12-01']) * 100
//     // )

//     // parseFloat(d['firstcol']) + parseFloat(d['secondcol'])
//     d.change_since_recession =
//       ((+d['2014-01-01'] - +d['2007-12-01']) / +d['2007-12-01']) * 100
//     // console.log(d, 'recession?')
//     d.average =
//       (parseFloat(dictName[d.cescode].firstCol) +
//         parseFloat(dictName[d.cescode].secondCol)) /
//       2

//     console.log(d.average)
//   })

//   const yPositionScaleMacro = d3
//     .scaleLinear()
//     .domain([-100, 130])
//     .range([200, 0])
//   // console.log(
//   //   'adding recession',
//   //   ces.forEach(
//   //     ((+ces['2014-01-01'] - +ces['2007-12-01']) / +ces['2007-12-01']) * 100
//   //   )
//   // )

//   const xPositionScaleMacro = d3
//     .scaleLinear()
//     .domain([15, 50])
//     .range([0, 400])

//   svg
//     .selectAll('.player-data')
//     .data(ces)
//     .enter()
//     // .append('svg')
//     // .attr('height', 450)
//     // .attr('width', 400)
//     // .append('svg')
//     // .attr('height', 1000)
//     // .attr('width', 1000)
//     .append('g')
//     // .attr(
//     //   'transform',
//     //   function(d) {
//     //     return `translate(${xPositionScaleMacro(
//     //       d.average
//     //     )},${yPositionScaleMacro(d.change_since_recession)}`
//     //   }
//     //   //  `translate(${0},${d => yPositionScaleMacro(d.change_since_recession)})`
//     // )
//     .on('mouseover', function(d) {
//       d3.select(this)
//         .raise()
//         .select('path')
//         .attr('stroke', 'red')
//       // console.log(d.industry, d.change_since_recession)
//     })
//     .on('mouseout', function(d) {
//       d3.select(this)
//         .select('path')
//         .attr('stroke', 'black')
//     })
//     .each(function(d, i) {
//       const container = d3.select(this)

//       // container.attr()

//       container.attr(
//         'transform',
//         function(d) {
//           return `translate(${xPositionScaleMacro(
//             +d.average
//           )},${yPositionScaleMacro(+d.change_since_recession)}`
//         }
//         //  `translate(${0},${d => yPositionScaleMacro(d.change_since_recession)})`
//       )

//       if (i === 2) {
//         container.attr('transform', `translate(${100},${50})`)
//       }

//       // console.log(d.change_since_recession, 'change')

//       // eslint-disable-next-line camelcase
//       const color_var = d.change_since_recession
//       // console.log(color_var, 'color_var')

//       const dataColumns1 = Object.keys(d).filter(d => d[0] === '2')
//       //   console.log(dataColumns1)

//       const parseTime = d3.timeParse('%Y-%m-%d')

//       const colorScale = d3
//         .scaleThreshold()
//         .domain([0, 1, 2])
//         .range(['#c94a38', '#e67950', '#b2d16d', '#7cb564', '#479050'])

//       const datapoints1 = dataColumns1.map(colName => {
//         return {
//           name: colName,
//           jobs: +d[colName],
//           date: parseTime(colName),
//           pct_change:
//             ((+d[colName] - +d['2004-01-01']) / +d['2004-01-01']) * 100
//         }
//       })

//       const median = d3.median(datapoints1, d => d.pct_change)

//       const chartDimensions = { heightCD: 200, widthCD: 400 }
//       const xPositionScaleMicro = d3
//         .scaleLinear()
//         .domain([parseTime('2004-01-01'), parseTime('2014-04-01')])
//         .range([100, chartDimensions.widthCD])
//       const yPositionScaleMicro = d3
//         .scaleLinear()
//         .domain([0, 200])
//         .range([chartDimensions.heightCD, 0])

//       const line = d3
//         .line()
//         .x(function(d) {
//           return xPositionScaleMicro(d.date)
//         })
//         .y(function(d) {
//           return yPositionScaleMicro(d.pct_change)
//         })

//       container
//         .append('path')
//         .datum(datapoints1)
//         .attr('class', 'path_next')
//         .attr('d', function(d) {
//           return line(d)
//         })
//         .attr('stroke', function(d) {
//           // console.log(d.change_since_recession)
//           //  console.log(color_var)
//           //   console.log(colorScale(color_var))
//           return colorScale(color_var)
//         })
//         .attr('stroke-width', 2)
//         .attr('fill', 'none')

//       // const datapoints1 = dataColumns1.map(colName => {
//       //     return {
//       //       name: colName,
//       //       jobs: +ces[colName]
//       //     }
//       //   // })
//       // console.log(datapoints1, 'datapoints')
//     })
// }
