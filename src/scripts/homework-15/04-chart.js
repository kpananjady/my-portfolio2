import * as d3 from 'd3'

const margin = { top: 20, left: 150, right: 0, bottom: 70 }

const height = 700 - margin.top - margin.bottom
const width = 600 - margin.left - margin.right

const svg = d3
  .select('#chart-4')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

Promise.all([
  d3.csv(require('/data/ces.csv')),
  d3.csv(require('/data/wages.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready([ces, wages]) {
  const dictName = {}
  wages.forEach(function(d) {
    const newDict = {
      firstCol: +d['2006-03-01'],
      secondCol: +d['2014-04-01']
    }

    const id = d.seriesid
    dictName[id] = newDict
  })

  ces.forEach(function(d) {
    d.change_since_recession =
      ((+d['2014-01-01'] - +d['2007-12-01']) / +d['2007-12-01']) * 100

    d.average =
      (parseFloat(dictName[d.cescode].firstCol) +
        parseFloat(dictName[d.cescode].secondCol)) /
      2
  })

  const yPositionScaleMacro = d3
    .scaleLinear()
    .domain([-60, 130])
    .range([height, 0])

  const xPositionScaleMacro = d3
    .scaleLinear()
    .domain([15, 50])
    .range([0, width - 50])

  const colorScale = d3
    .scaleThreshold()
    .domain([-15, 0, 15])
    .range(['#c94a38', '#e67950', '#b2d16d', '#7cb564', '#479050'])

  svg
    .append('line')
    .attr('class', 'growth-0')
    .attr('x0', -60)
    .attr('y0', 0)
    .attr('x1', 500)
    .attr('y1', 0)
    .attr('stroke', 'black') // end of the line
    .attr('transform', `translate(0,${yPositionScaleMacro(0)})`)
    .style('stroke-dasharray', '3')
  // )

  svg
    .append('text')
    .text('Jobs since recession')
    .attr('id', 'jobs')
    .attr(
      'transform',
      `translate(${-120},${yPositionScaleMacro(0)}) rotate(-90)`
    )
    .attr('text-anchor', 'middle')
    .attr('font-size', 13)
    .attr('font-weight', 'bold')
    .attr('dy', 0)

  svg
    .append('text')
    .text('----->')
    .attr('id', 'arrowOne')
    .attr(
      'transform',
      `translate(${-120},${yPositionScaleMacro(0) - 150}) rotate(-90)`
    )
    .attr('text-anchor', 'middle')
    .attr('font-size', 13)
    .attr('font-weight', 'bold')
    .attr('dy', 0)
    .attr('dx', -20)

  svg
    .append('text')
    .attr('id', 'arrowTwo')
    .text('<-----')
    .attr(
      'transform',
      `translate(${-120},${yPositionScaleMacro(0) + 100}) rotate(-90)`
    )
    .attr('text-anchor', 'middle')
    .attr('font-size', 13)
    .attr('font-weight', 'bold')
    .attr('dy', 0)
    .attr('dx', -20)

  svg
    .append('text')
    .text('<-----')
    .attr('id', 'arrowThree')
    .attr('transform', `translate(0,${height})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', 13)
    .attr('font-weight', 'bold')
    .attr('dy', 0)
    .attr('dx', -20)

  svg
    .append('text')
    .attr('id', 'wages')
    .text('Wages')
    .attr('transform', `translate(${width / 2},${height})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', 13)
    .attr('font-weight', 'bold')
    .attr('dy', 0)
    .attr('dx', -20)

  svg
    .append('text')
    .text('----->')
    .attr('id', 'arrowFour')
    .attr('transform', `translate(${width - 10},${height})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', 13)
    .attr('font-weight', 'bold')
    .attr('dy', 0)
    .attr('dx', -20)
  svg
    .selectAll('.player-data')
    .data(ces)
    .enter()
    .append('g')
    .attr('class', 'center_lines')
    .each(function(d, i) {
      const container = d3.select(this)

      container.attr('transform', function(d) {
        return `translate(${xPositionScaleMacro(
          +d.average
        )},${yPositionScaleMacro(0)})`
        // return `translate(${xPositionScaleMacro(
        //   +d.average
        // )},${yPositionScaleMacro(+d.change_since_recession)})`
      })

      const color_var = d.change_since_recession

      const dataColumns1 = Object.keys(d).filter(d => d[0] === '2')

      const parseTime = d3.timeParse('%Y-%m-%d')

      const datapoints1 = dataColumns1.map(colName => {
        return {
          name: colName,
          jobs: +d[colName],
          date: parseTime(colName),
          pct_change:
            ((+d[colName] - +d['2004-01-01']) / +d['2004-01-01']) * 100
        }
      })

      const median = d3.median(datapoints1, function(d) {
        return d.pct_change
      })

      // d3.select('#step-highlight').on('stepin', function() {
      //   container.select('.path_next')
      //   console.log('highlight this')
      // })

      const chartDimensions = { heightCD: 100, widthCD: 100 }
      const xPositionScaleMicro = d3
        .scaleLinear()
        .domain([parseTime('2004-01-01'), parseTime('2014-04-01')])
        .range([0, chartDimensions.widthCD])
      const yPositionScaleMicro = d3
        .scaleLinear()
        .domain([0, 150])
        .range([chartDimensions.heightCD, 0])

      const line = d3
        .line()
        .x(function(d) {
          return xPositionScaleMicro(d.date)
        })
        .y(function(d) {
          return yPositionScaleMicro(d.pct_change)
        })

      container
        .append('g')
        .attr('class', 'chart')
        .attr('transform', () => {
          const x = chartDimensions.widthCD / 2
          const y = yPositionScaleMicro(median)
          // const y = 0
          return `translate(-${x},-${y})`
          // return `translate(-${x})`
        })
        .append('path')
        .datum(datapoints1)
        .attr('class', 'path_next')
        .attr('d', function(d) {
          return line(d)
        })
        .attr('stroke', function(d) {
          return colorScale(color_var)
        })
        .attr('stroke-width', 2)
        .attr('fill', 'none')
    })
    .on('mouseover', function(d) {
      d3.select(this)
        .raise()

        .select('path')
        .attr('stroke', 'blue')
    })
    .on('mouseout', function(d) {
      const color_var = d.change_since_recession

      const colorScale = d3
        .scaleThreshold()
        .domain([-15, 0, 15])
        .range(['#c94a38', '#e67950', '#b2d16d', '#7cb564', '#479050'])
      d3.select(this)
        .select('path')
        .attr('stroke', function(d) {
          return colorScale(color_var)
        })
    })

  d3.select('#step-jobs').on('stepin', function() {
    console.log('jobs')
    svg
      .selectAll('.center_lines')
      .transition()
      .attr('transform', function(d) {
        const xpos = xPositionScaleMacro(d.average)
        const ypos = yPositionScaleMacro(d.change_since_recession)
        return `translate(${xpos},${ypos})`
      })

    // .delay(1000)
    // .transition()
    // .attr('transform', function(d) {
    //   const xpos = xPositionScaleMacro(d.average)
    //   const ypos = yPositionScaleMacro(0)
    //   return `translate(${xpos},${ypos})`
    // })

    console.log('highlight')
  })

  d3.select('#step-centered').on('stepout', function() {
    svg
      .selectAll('.center_lines')
      .transition()
      .attr('transform', function(d) {
        const xpos = xPositionScaleMacro(d.average)
        const ypos = yPositionScaleMacro(0)
        return `translate(${xpos},${ypos})`
      })
  })

  d3.select('#step-highlight')
    .on('stepin', function() {
      svg.selectAll('.path_next').attr('stroke', 'grey')
      // .transition()
      // .duration(1000)
      // .attr('stroke', function(d) {
      //   return colorScale(d.change_since_recession)
      // })
      console.log('highlight')
    })
    .on('stepout', function(d) {
      // svg
      // .selectAll('.center_lines')

      svg.selectAll('.path_next').attr('stroke', function(d) {
        console.log(d.pct_change, 'change since rec?')
        return 'blue'
      })
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
    const newHeight = svgHeight - margin.top - margin.bottom

    // Update our scale
    yPositionScaleMacro.range([newHeight, 0])
    xPositionScaleMacro.range([0, newWidth])
    // console.log(newHeight, 'newheight')

    // Update axes
    svg
      .select('#wages')
      .attr('transform', `translate(${newWidth / 2},${newHeight})`)

    svg
      .select('#jobs')
      .attr(
        'transform',
        `translate(${-120},${yPositionScaleMacro(0)}) rotate(-90)`
      )

    svg
      .select('#arrowOne')
      .attr(
        'transform',
        `translate(${-120},${yPositionScaleMacro(0) - 150}) rotate(-90)`
      )
    svg
      .select('#arrowTwo')
      .attr(
        'transform',
        `translate(${-120},${yPositionScaleMacro(0) + 100}) rotate(-90)`
      )
    svg.select('#arrowThree').attr('transform', `translate(0,${height})`)
    svg
      .select('#arrowFour')
      .attr('transform', `translate(${width - 30},${height})`)

    // Update drawings

    svg
      .selectAll('.center_lines')
      .transition()
      .attr('transform', function(d) {
        const xpos = xPositionScaleMacro(d.average)
        const ypos = yPositionScaleMacro(0)
        return `translate(${xpos},${ypos})`
      })
  }

  // When the window resizes, run the function
  // that redraws everything
  window.addEventListener('resize', render)

  // And now that the page has loaded, let's just try
  // to do it once before the page has resized
  render()
  // d3.select('#final').on('stepin', function() {
  //   console.log('here now')
  //   svg.selectAll('.path_next').attr('stroke', 'blue')
  // })
}
