import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = { top: 20, left: 200, right: 0, bottom: 70 }

const height = 700 - margin.top - margin.bottom
const width = 600 - margin.left - margin.right

const svg = d3
  .select('#chart-4')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const parseTime = d3.timeParse('%Y')
let step = 'False'



Promise.all([
  d3.csv(require('/data/school.csv')),
  d3.csv(require('/data/schools-never.csv')),
  d3.csv(require('/data/ELLbySchool.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready([ces, wages,students]) {
  const dictName = {}


  const tip = d3
  .tip()
  .attr('class', 'd3-tip d3-tip-scrolly')
  .style('pointer-events', 'none')
  .offset([-10, 0])
  .html(function(d) {
    return `${d.SchoolName}`
  })

  svg.call(tip)

  let toolTipElement = d3.select(".d3-tip-scrolly")
  d3.select("#chart-4").append(d => toolTipElement.node())

  wages.forEach(function(d) {
    const newDict = {
      firstCol: +d['2014'],
      secondCol: +d['2019'],
      thirdCol: +d['2015'],
      fourthCol: +d['2016'],
      fifthCol: +d['2017'],
      sixthCol: +d['2018'],
    }

    const id = d.SchoolName
    dictName[id] = newDict
  })

  const dict2 = {}
  students.forEach(function(d) {
    const newDict = {
      firstCol: +d['ELLstudents']
    }

    const id = d.name
    dict2[id] = newDict
  })

  ces.forEach(function(d) {
    d.change_since_recession =
      ((+d['2019'] - +d['2014']) / +d['2014']) * 100

    d.avgElls = (d['2014'] + d['2015'] + d['2016'] + d['2017'] + d['2018'] + d['2019'])/5

    d.ypos = +d['2019']
    d.yos2=+d['2014']

    d.avgNElls = parseFloat(dictName[d.SchoolName].firstCol) + parseFloat(dictName[d.SchoolName].secondCol) + parseFloat(dictName[d.SchoolName].thirdCol) + parseFloat(dictName[d.SchoolName].fourthCol) + parseFloat(dictName[d.SchoolName].fifthCol) + parseFloat(dictName[d.SchoolName].sixthCol) /5

    d.change_never_ells =   
    ((parseFloat(dictName[d.SchoolName].secondCol) - parseFloat(dictName[d.SchoolName].firstCol)) / parseFloat(dictName[d.SchoolName].firstCol)) * 100

    d.diff2 = +d['2014'] - parseFloat(dictName[d.SchoolName].firstCol)
    d.diff = +d['2019'] - parseFloat(dictName[d.SchoolName].secondCol)

    // console.log(d.change_since_recession)
    // console.log(d.change_never_ells)
    // console.log(d.diff, d.SchoolName, 'difference')
    d.average =
      (parseFloat(dict2[d.SchoolName].firstCol)) 
  })

  ces = ces.filter(function(d) {
    return !isNaN(d.diff)
  })

  const yPositionScaleMacro = d3
    .scaleLinear()
    .domain([-10, 100])
    .range([height, 0])

  const xPositionScaleMacro = d3
    .scaleLinear()
    .domain([15, 50])
    .range([0, width - 50])

  const xPositionScaleFull = d3
    .scaleLinear()
    .domain([parseTime('2014'), parseTime('2019')])
    .range([0, width])

const yPositionScaleFull = d3
    .scaleLinear()
    .domain([15, 50])
    .range([width/2, width/2])

  const colorScale = d3
    .scaleThreshold()
    .domain([-50, 0, 300])
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
    .text('Ever ELL performance')
    .attr('id', 'jobs')
    .attr(
      'transform',
      `translate(${-120},${yPositionScaleMacro(0)}) rotate(-90)`
    )
    .attr('text-anchor', 'middle')
    .attr('font-size', 13)
    .attr('font-weight', 'bold')
    .attr('dy', -50)
    .attr('dx', 30)

  svg.append('text').attr('x', -150).attr('y',20).text('Hover for school').attr('id', 'schoolname')

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
    .attr('dy', -50)
    .attr('dx', -20)

//   svg
//     .append('text')
//     .attr('id', 'arrowTwo')
//     .text('<-----')
//     .attr(
//       'transform',
//       `translate(${-120},${yPositionScaleMacro(0) + 100}) rotate(-90)`
//     )
//     .attr('text-anchor', 'middle')
//     .attr('font-size', 13)
//     .attr('font-weight', 'bold')
//     .attr('dy', 0)
//     .attr('dx', -20)

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
    .text('Students')
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
      const color_diff = d.diff
      const schoolname = d.SchoolName

      const dataColumns1 = Object.keys(d).filter(d => d[0] === '2')

      const datapoints1 = dataColumns1.map(colName => {
        return {
          name: colName,
          jobs: +d[colName],
          date: parseTime(colName),
          pct_change:
            ((+d[colName] - +d['2014']) / +d['2014']) * 100,
          diff: d.diff,
          diff2:d.diff2,
          color_var: color_var
        }
      })

      const median = d3.median(datapoints1, function(d) {
        return d.pct_change
      })

      if(typeof(median) === 'undefined' || !isFinite(median) || isNaN(median)) {
          return
      }

      // d3.select('#step-highlight').on('stepin', function() {
      //   container.select('.path_next')
      //   console.log('highlight this')
      // })

      const chartDimensions = { heightCD: 20, widthCD: 100 }
      const xPositionScaleMicro = d3
        .scaleLinear()
        .domain([parseTime('2014'), parseTime('2019')])
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
          const y = yPositionScaleMicro(median) * -1
          // const y = 0
          return `translate(-${x},${y})`
          // return `translate(-${x})`
        })
        .append('path')
        .datum(datapoints1)
        .attr('class', 'path_next')
        .attr('d', function(d) {
          return line(d)
        })
        .attr('stroke', function(d) {
            // console.log(schoolname)
          return colorScale(color_var)
        })
        .attr('stroke-width', 2)
        .attr('fill', 'none')
    })
   
.on('mouseover', function(d) {
  // show the tooltip
  tip.show.call(this, d)

  let coords = this.getBoundingClientRect()
  let y = coords.y + (coords.height / 2)

  d3.select(".d3-tip-scrolly")
    .style('top', y + 'px')
})
.on('mouseout', tip.hide)
    .on('mouseout',
        tip.hide )

  d3.select('#step-jobs').on('stepin', function() {
   // console.log('jobs')
    svg
      .selectAll('.center_lines')
      .transition()
      .attr('transform', function(d) {
        const xpos = xPositionScaleMacro(d.average)
        const ypos = yPositionScaleMacro(d.ypos)
        return `translate(${xpos},${ypos})`
      })

    //   svg.selectAll('.path_next')      
    //   .transition()
    //   .delay(250)
    //   .attr('stroke', colorScale(d[0].color_var))
    // .delay(1000)
    // .transition()
    // .attr('transform', function(d) {
    //   const xpos = xPositionScaleMacro(d.average)
    //   const ypos = yPositionScaleMacro(0)
    //   return `translate(${xpos},${ypos})`
    // })

    // console.log('highlight')
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
      //console.log('highlight')
    // })
    // .on('stepout', function(d) {
      // svg
      // .selectAll('.center_lines')

      svg.selectAll('.path_next')
      .transition()
      .delay(250)
      .attr('opacity', 0.5).attr('stroke', function(d) {
        step = 'True'
        if (d[0].diff>0){
            // console.log('1')
            return 'purple'         
        }
        else {
            console.log('2')
            return 'grey'
        }
      })
    })
    .on('stepout', function() {
        step = 'False'
    })

d3.select('#step-last')
    .on('stepin', function() {
        console.log('here')

    // svg
    //     .selectAll('.center_lines')
    //     .transition()
    //     .attr('transform', function(d) {
    //       const xpos = xPositionScaleMacro(0)
    //       const ypos = yPositionScaleMacro(d.ypos2)
    //       return `translate(${xpos},${ypos})`
    //     })

      svg.selectAll('.path_next').attr('stroke', 'grey')
      // .transition()
      // .duration(1000)
      // .attr('stroke', function(d) {
      //   return colorScale(d.change_since_recession)
      // })
      //console.log('highlight')
    // })
    // .on('stepout', function(d) {
      // svg
      // .selectAll('.center_lines')

      svg.selectAll('.path_next')      
      .transition()
      .delay(250)
      .attr('opacity', 0.5).attr('stroke', function(d) {
        console.log(d[0].diff2, 'change since rec 2?')
        step = 'True'
        if (d[0].diff2>0){
            return 'purple'
        }
        else {
            return 'grey'
        }
      })
    })
    .on('stepout', function() {
        step = 'False'
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
