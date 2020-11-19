import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = {
  top: 30,
  right: 20,
  bottom: 30,
  left: 50
}

const width = 700 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const svg = d3
  .select('#chart-5')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3.scaleBand().range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 85])
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

  const tip = d3
.tip()
.attr('class', 'd3-tip d3-tip-scrolly')
.style('pointer-events', 'none')
.offset([-10, 0])
.html(function(d) {

  return `${parseFloat(d['value']).toFixed(2)}%<br>
  ${d['date']}` 

})



const parseTime = d3.timeParse('%Y-%m-%d')

Promise.all([
  "https://test-uploading-file.s3.amazonaws.com/df.csv",
  "https://test-uploading-file.s3.amazonaws.com/df_minus_30.csv",
  ]
  .map(function(url) {
    return fetch(url).then(function(response) {
      return response.ok ? response.text() : Promise.reject(response.status);
    }).then(function(text) {
      return d3.csvParse(text);
    });
  })).then(ready)
  .catch(err => console.log('Failed on', err))

svg.call(tip)

function ready([datapoints, datapoints_30]) {
  // Sort the countries from low to high

  svg.append('text').attr('x',0).attr('y',-5).text('Past 30 days:').attr('font-size', '15px').attr('font-weight', 5).attr('id', 'dynamic_hed')


  datapoints_30.forEach(d => {
    
    d.datetime = parseTime(d["date"])
  })
const dates2 = datapoints_30.map(d => d.datetime)
const cases2 = datapoints_30.map(d => +d["P_Rate"])



var tomorrow = new Date();


console.log(d3.max(dates2), tomorrow.setDate(d3.max(dates2).getDate()+1), 'these')
var dates_array = d3.timeDays(d3.min(dates2), tomorrow)

console.log(dates_array[dates_array.length-1], 'this')



xPositionScale.domain(dates_array)
yPositionScale.domain([0,d3.max(cases2)])

svg.append("line")
.attr("class", "mean-line")
.attr('x1', xPositionScale(d3.min(dates2))+ xPositionScale.bandwidth()/2)
.attr('y1',yPositionScale(5)) 
.attr('x2',xPositionScale(d3.max(dates2))+ xPositionScale.bandwidth()/2)
.attr('y2',yPositionScale(5))
.attr('stroke', 'red')
.attr('opacity',0.5)
.attr('stroke-width', 2)

const line = d3
.line()
.x(function(d) {
  return xPositionScale(parseTime(d["date"])) + xPositionScale.bandwidth()/2
})
.y(function(d) {
  return yPositionScale(d["P_Rate_Avg"])
})


svg.append('path')
.datum(datapoints_30)
.attr('class', 'average')
.attr('d', function(d) {
    return line(d)
})
.attr('stroke', '#FED000')
.attr('stroke-width', 2)
.attr('fill', 'none')

svg
.selectAll('rect')
.data(datapoints_30)
.enter()
.append('rect')
.attr('class', 'rect_30')
.attr('width', xPositionScale.bandwidth())
.attr('height', d => {
  return height - yPositionScale(+d["P_Rate"])
})
.attr('x', d => {
  return xPositionScale(d.datetime)
})
.attr('y', d => {
  return yPositionScale(+d["P_Rate"])
})
.attr('fill', '#FED000').attr('opacity',0.3)
.lower()


svg.selectAll('circle_stuff')
.data(datapoints_30)
.enter()
.append('circle')
.attr('class', 'circles')
.attr('cx', d=> xPositionScale(parseTime(d["date"])) + xPositionScale.bandwidth()/2)
.attr('cy', d=> yPositionScale(d["P_Rate_Avg"]))
.attr('stroke', '#FED000')
.attr('fill', '#FED000')
.attr('r', 3)
.on('mouseover', function(d){

    d.value = d.P_Rate_Avg
    tip.show.call(this, d)

})
.on('mouseout', tip.hide)


 
const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%b %d'))
    .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%4)}));


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

    d3.select('#toggle9').on('click', () => {

        datapoints.forEach(d => {

            d.datetime = parseTime(d["date"])
          })
        const dates = datapoints.map(d => d.datetime)
        const cases = datapoints.map(d => +d["P_Rate"])

        svg.selectAll('.average').remove() 
        svg.selectAll('.mean-line').remove() 

        svg.selectAll('.rect_30').remove()

       
    var tomorrow = new Date();


    console.log(d3.max(dates), tomorrow.setDate(d3.max(dates).getDate()+1), 'these')
    var dates_array = d3.timeDays(d3.min(dates), tomorrow)

    console.log(dates_array[dates_array.length-1], 'this')
    xPositionScale.domain(dates_array)
    yPositionScale.domain([0,d3.max(cases)])


        svg.append('path')
        .datum(datapoints)
        .attr('class', 'average')
        .attr('d', function(d) {
            return line(d)
        })
        .attr('stroke', '#FED000')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        

        svg
        .selectAll('rect')
        .data(datapoints)
        .enter()
        .append('rect')
        .attr('class', 'rect_all')
        .attr('width', xPositionScale.bandwidth())
        .attr('height', d => {
          return height - yPositionScale(d["P_Rate"])
        })
        .attr('x', d => {
          return xPositionScale(d.datetime)
        })
        .attr('y', d => {
          return yPositionScale(d["P_Rate"])
        })
        .attr('fill', '#FED000').attr('opacity',0.3)
        .attr('id', d=> d["date"])
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

    d3.select('#toggle10').on('click', () => {



        svg.selectAll('.average').remove()
        svg.selectAll('.rect_all').remove()

        datapoints_30.forEach(d => {
    
            d.datetime = parseTime(d["date"])
          })
        const dates2 = datapoints_30.map(d => d.datetime)
        const cases2 = datapoints_30.map(d => +d["P_Rate"])

        

    var tomorrow = new Date();


    console.log(d3.max(dates2), tomorrow.setDate(d3.max(dates2).getDate()+1), 'these')
    var dates_array = d3.timeDays(d3.min(dates2), tomorrow)

    console.log(dates_array[dates_array.length-1], 'this')
    xPositionScale.domain(dates_array)
    yPositionScale.domain([0,d3.max(cases)])


        xPositionScale.domain(dates_array)
        yPositionScale.domain([0,d3.max(cases2)])

        svg.append("line")
        .attr("class", "mean-line")
       .attr('x1', xPositionScale(d3.min(dates2))+ xPositionScale.bandwidth()/2)
       .attr('y1',yPositionScale(5)) 
       .attr('x2',xPositionScale(d3.max(dates2))+ xPositionScale.bandwidth()/2)
       .attr('y2',yPositionScale(5))
       .attr('stroke', 'red')
       .attr('opacity',0.5)
       .attr('stroke-width', 2)


     
        svg.append('path')
        .datum(datapoints_30)
        .attr('class', 'average')
        .attr('d', function(d) {
            return line(d)
        })
        .attr('stroke', '#FED000')
        .attr('stroke-width', 2)
        .attr('fill', 'none')

        svg
        .selectAll('rect')
        .data(datapoints_30)
        .enter()
        .append('rect')
        .attr('class', 'rect_30')
        .attr('width', xPositionScale.bandwidth())
        .attr('height', d => {
          return height - yPositionScale(+d["P_Rate"])
        })
        .attr('x', d => {
          return xPositionScale(d.datetime)
        })
        .attr('y', d => {
          return yPositionScale(+d["P_Rate"])
        })
        .attr('fill', '#FED000').attr('opacity',0.3)
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
//       .attr('fill', '#FED000').attr('opacity',0.3)
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
     svg.select('.x-axis').call(xAxis)
     d3.select('.x-axis .domain').remove()

     d3.select('#toggle9').on('click', () => {

        // svg.append('text').attr('x',0).attr('y',0).text('Past 30 days:').attr('font-size', '15px').attr('font-weight', 5).attr('id', 'dynamic_hed')

        d3.select('#dynamic_hed').text('Since March:')

        datapoints.forEach(d => {

            d.datetime = parseTime(d["date"])
          })
        const dates = datapoints.map(d => d.datetime)
        const cases = datapoints.map(d => +d["P_Rate"])

        svg.selectAll('.circles').remove() 

        svg.selectAll('.average').remove() 
        svg.selectAll('.mean-line').remove() 

        svg.selectAll('.rect_30').remove()

       
    var tomorrow = new Date();


    console.log(d3.max(dates), tomorrow.setDate(d3.max(dates).getDate()+1), 'these')
    var dates_array = d3.timeDays(d3.min(dates), tomorrow)

    console.log(dates_array[dates_array.length-1], 'this')
    xPositionScale.domain(dates_array)
    yPositionScale.domain([0,d3.max(cases)])


    const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%b %d'))
    .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%20)}));

        svg.append('path')
        .datum(datapoints)
        .attr('class', 'average')
        .attr('d', function(d) {
            return line(d)
        })
        .attr('stroke', '#FED000')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        

        svg
        .selectAll('rect')
        .data(datapoints)
        .enter()
        .append('rect')
        .attr('class', 'rect_all')
        .attr('width', xPositionScale.bandwidth())
        .attr('height', d => {
          return height - yPositionScale(d["P_Rate"])
        })
        .attr('x', d => {
          return xPositionScale(d.datetime)
        })
        .attr('y', d => {
          return yPositionScale(d["P_Rate"])
        })
        .attr('fill', '#FED000').attr('opacity',0.3)
        .attr('id', d=> d["date"])
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

    d3.select('#toggle10').on('click', () => {

        d3.select('#dynamic_hed').text('Past 30 days:')

        svg.selectAll('.circles').remove()

        svg.selectAll('.average').remove()
        svg.selectAll('.rect_all').remove()

        datapoints_30.forEach(d => {
    
            d.datetime = parseTime(d["date"])
          })
        const dates2 = datapoints_30.map(d => d.datetime)
        const cases2 = datapoints_30.map(d => +d["P_Rate"])

        

    var tomorrow = new Date();


    console.log(d3.max(dates2), tomorrow.setDate(d3.max(dates2).getDate()+1), 'these')
    var dates_array = d3.timeDays(d3.min(dates2), tomorrow)

    console.log(dates_array[dates_array.length-1], 'this')
    xPositionScale.domain(dates_array)
    yPositionScale.domain([0,d3.max(cases2)])


        const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%b %d'))
    .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%4)}));

        svg.append("line")
        .attr("class", "mean-line")
        .attr('x1', xPositionScale(d3.min(dates2))+ xPositionScale.bandwidth()/2)
        .attr('y1',yPositionScale(5)) 
        .attr('x2',xPositionScale(d3.max(dates2))+ xPositionScale.bandwidth()/2)
       .attr('y2',yPositionScale(5))
       .attr('stroke', 'red')
       .attr('opacity',0.5)
       .attr('stroke-width', 2)


       svg.selectAll('circle_stuff')
       .data(datapoints_30)
       .enter()
       .append('circle')
       .attr('class', 'circles')
       .attr('cx', d=> xPositionScale(parseTime(d["date"])) + xPositionScale.bandwidth()/2)
       .attr('cy', d=> yPositionScale(d["P_Rate_Avg"]))
       .attr('stroke', '#FED000')
       .attr('fill', '#FED000')
       .attr('r', 3)
       .on('mouseover', function(d){

        d.value = d.P_Rate_Avg
        tip.show.call(this, d)
    
    })
    .on('mouseout', tip.hide)
     
        svg.append('path')
        .datum(datapoints_30)
        .attr('class', 'average')
        .attr('d', function(d) {
            return line(d)
        })
        .attr('stroke', '#FED000')
        .attr('stroke-width', 2)
        .attr('fill', 'none')

        svg
        .selectAll('rect')
        .data(datapoints_30)
        .enter()
        .append('rect')
        .attr('class', 'rect_30')
        .attr('width', xPositionScale.bandwidth())
        .attr('height', d => {
          return height - yPositionScale(+d["P_Rate"])
        })
        .attr('x', d => {
          return xPositionScale(d.datetime)
        })
        .attr('y', d => {
          return yPositionScale(+d["P_Rate"])
        })
        .attr('fill', '#FED000').attr('opacity',0.3)
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

//     svg
//       .select('.y-axis')
//       .transition()
//       .call(yAxis)

    svg
      .selectAll('rect')
      .attr('x', d => {
        return xPositionScale(d.datetime)
      })

      svg.selectAll('.average')   
      .attr('d', function(d) {
        return line(d)
    })

    svg.selectAll('.circles')   
    .attr('cx', d=> xPositionScale(parseTime(d["date"])) + xPositionScale.bandwidth()/2)
       .attr('cy', d=> yPositionScale(d["P_Rate_Avg"]))
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
//       .attr('fill', '#FFA500').attr('opacity',0.5)
//       .attr('class', d => {
//         return d.continent.toLowerCase().replace(/[^a-z]*/g, '')
//       })

//     svg.select('#label-1').attr('x', newWidth * 0.75)
//     //  .attr('y', newHeight + 15)

//     svg.select('#label-2').attr('x', newWidth * 0.25)
//     //   .attr('y', newHeight + 15)

//     d3.select('.y-axis .domain').remove()
  }

//   // When the window resizes, run the function
//   // that redraws everything
  window.addEventListener('resize', render)

//   // And now that the page has loaded, let's just try
//   // to do it once before the page has resized
  render()

}
