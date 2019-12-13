import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 100, left: 50, right: 50, bottom: 150 }

const height = 1000 - margin.top - margin.bottom

const width = 1500 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const parseTime = d3.timeParse('%Y')

const xPositionScale = d3.scaleLinear().range([0, width])
const yPositionScale = d3.scaleLinear().range([height, 0])

const colorScale = d3
  .scaleOrdinal()
  .range([
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#d9d9d9',
    '#bc80bd'
  ])

const line = d3
  .line()
  .x(function(d) {
    return xPositionScale(d.datetime)
  })
  .y(function(d) {
    return yPositionScale(d.rate)
  })

  const listYears = [2011,2012,2013,2014,2015,2016,2017]
  function draw(value) {
    svg
      .append('line')
      .attr('class','year') // attach a line
      .style('stroke', 'pink') // colour the line
      .style('stroke-dasharray', '3, 3')
      .attr('stroke-width', 3)
      .attr('x1', xPositionScale(parseTime(value))) // x position of the first end of the line
      .attr('y1', height) // y position of the first end of the line
      .attr('x2', xPositionScale(parseTime(value))) // x position of the second end of the line
      .attr('y2', 0)
      .attr('opacity',0.5)
  }  

d3.csv(require('/data/rape_rates_state.csv'))
  .then(ready)
  .catch(err => {
    console.log(err)
  })

function ready(datapoints) {
  datapoints.forEach(d => {
    d.datetime = parseTime(d.Year)
  })
  const dates = datapoints.map(d => d.datetime)
  const rates = datapoints.map(d => +d.rate)

  xPositionScale.domain([parseTime(2011),parseTime(2017)])
  yPositionScale.domain(d3.extent(rates))

  console.log(xPositionScale(2011), 'here I am')
//   draw(parseTime(2011))


    const tip = d3
    .tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
    return `${d.key}`
   })

   svg.call(tip)    

  const nested = d3
    .nest()
    .key(function(d) {
        console.log(d.State)
      return d.State
    })
    .entries(datapoints)

    svg
      .selectAll('path_next')
      .data(nested)
      .enter()
      .append('path')
      .attr('class', 'path_next')
      .attr('d', function(d) {
        console.log(d.key)
        return line(d.values)
      })
      .attr('stroke', function(d) {
        if (d.key ==='Delhi' || d.key ==='India') {
            return 'red'
        } else {return 'grey'
        }
      })
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('opacity',0.5)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
    //   .on('mouseover', function(d) {
    //     d3.select(this)
    //       .raise()
  
    //       .select('path')
    //       .attr('stroke', 'blue')
    //   })

    // svg.selectAll('circle').attr('fill', function(d) {
    //   return 'grey'
    // })

    // svg.selectAll('text').attr('fill', 'black')

//   svg
//     .selectAll('circle')
//     .data(nested)
//     .enter()
//     .append('circle')
//     .attr('fill', function(d) {
//       return 'grey'
//     })
//     .attr('r', 4)
//     .attr('cy', function(d) {
//       return yPositionScale(d.values[0].rate)
//     })
//     .attr('cx', function(d) {
//       return xPositionScale(d.values[0].datetime)
//     })

    // svg
    // .selectAll('circle-new')
    // .data(nested)
    // .enter()
    // .append('circle')
    // .attr('class','circle-new')
    // .attr('fill', function(d) {
    //   return 'grey'
    // })
    // .attr('r', 4)
    // .attr('cy', function(d) {
    //   return yPositionScale(d.values[6].rate)
    // })
    // .attr('cx', function(d) {
    //   return xPositionScale(parseTime(2017))
    // })
//   svg
//     .selectAll('text')
//     .data(nested)
//     .enter()
//     .append('text')
//     .attr('class', 'labels')
//     .attr('y', function(d) {
//       return yPositionScale(d.values[6].rate)
//     })
//     .attr('x', function(d) {
//       return 1500
//     })
//     .text(function(d) {
//       return d.key
//     })
//     .attr('dx', 6)
//     .attr('dy', 4)
//     .attr('font-size', '12')

//   svg
//     .append('text')
//     .attr('font-size', '24')
//     .attr('id', 'title')
//     .attr('text-anchor', 'middle')
//     .text('Delhi')
//     .attr('x', width / 2)
//     .attr('y', -50)
//     .attr('dx', 40)


  svg
  .append('text')
  .attr('font-size', '24')
  .attr('id', '2017')
  .attr('text-anchor', 'middle')
  .text('2017')
  .attr('x', xPositionScale(parseTime(2017)))
  .attr('y', -40)
  .attr('dx', 100)


  // const rectWidth =
  //   xPositionScale(parseTime('February-17')) -
  //   xPositionScale(parseTime('November-16'))

  // svg
  //   .append('rect')
  //   .attr('x', xPositionScale(parseTime('December-16')))
  //   .attr('y', 0)
  //   .attr('width', rectWidth)
  //   .attr('height', height)
  //   .attr('fill', '#C2DFFF')
  //   .lower()

//   const xAxis = d3
//     .axisBottom(xPositionScale)
//     .tickFormat(d3.timeFormat('%Y'))
   
//   svg
//     .append('g')
//     .attr('class', 'axis x-axis')
//     .attr('transform', 'translate(0,' + height + ')')
//     .call(xAxis)

//   const yAxis = d3.axisLeft(yPositionScale)
//   svg
//     .append('g')
//     .attr('class', 'axis y-axis')
//     .call(yAxis)

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

    listYears.forEach(draw)

    svg.select('#title').attr('x', newWidth / 2)

    // svg.select('.x-axis').call(xAxis)
    // svg.select('.y-axis').call(yAxis)
    // // Update things you draw

    svg
      .selectAll('circle')
      .attr('cy', function(d) {
        return yPositionScale(d.values[0].rate)
      })
      .attr('cx', function(d) {
        return xPositionScale(d.values[0].datetime)
      })


    svg
    .selectAll('circle-new')
    .attr('cy', function(d) {
      return yPositionScale(d.values[6].rate)
    })
    .attr('cx', function(d) {
      return xPositionScale(parseTime(2017))
    })

    // svg
    // .select('2017')
    // .attr('x', xPositionScale(parseTime(2017)))
    // .attr('y', -40)
  

    svg
      .selectAll('.labels')
      .attr('y', function(d) {
        return yPositionScale(d.values[0].rate)
      })
      .attr('x', function(d) {
        return xPositionScale(d.values[0].datetime)
      })


    //  svg.select('text').attr('x', xPositionScale(parseTime(2017)))

    svg.selectAll('.path_next').attr('d', function(d) {
      return line(d.values)
    })
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
