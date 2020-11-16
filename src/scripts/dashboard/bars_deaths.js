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

const xPositionScale = d3.scaleBand().range([0, width])

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


function ready([datapoints, datapoints_30]) {
  // Sort the countries from low to high

  console.log(datapoints_30)
  
  datapoints.forEach(d => {
    console.log(d["date"])
    d.datetime = parseTime(d["date"])
  })
const dates = datapoints.map(d => d.datetime)
const deaths = datapoints.map(d => +d['Deaths_per_day'])

xPositionScale.domain(dates)
yPositionScale.domain(d3.extent(deaths))




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
      .attr('fill', '#CD5C5C')
        .attr('opacity',0.5)

    .lower()
    // .attr('class', d => {
    //   return d.continent.toLowerCase().replace(/[^a-z]*/g, '')
    // })

    const line = d3
    .line()
    .x(function(d) {
      return xPositionScale(parseTime(d["date"]))
    })
    .y(function(d) {
      return yPositionScale(d["Death_Avg"])
    })

 

    svg.append('path')
    .datum(datapoints)
    .attr('class', 'path_this_3')
    .attr('d', function(d) {
        return line(d)
    })
    .attr('stroke', '#CD5C5C')
    .attr('stroke-width', 2)
    .attr('fill', 'none')

const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%b %d'))
    .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%20)}));



    svg
    .append('g')
    .attr('class', 'axis x-axis')
    .call(xAxis)
    .style("text-anchor", "left")
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

        svg.selectAll('.path_this_3').remove()
        svg.selectAll('.rect_30').remove()



        

        
        xPositionScale.domain(dates)
        yPositionScale.domain(d3.extent(deaths))


        svg.append('path')
        .datum(datapoints)
        .attr('class', 'path_this_3')
        .attr('d', function(d) {
            return line(d)
        })
        .attr('stroke', '#CD5C5C')
        .attr('stroke-width', 2)
        .attr('fill', 'none')


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
          .attr('fill', '#CD5C5C')
        .attr('opacity',0.5)
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

        svg.selectAll('.path_this_3').remove()
        svg.selectAll('.rect_all').remove()



        datapoints_30.forEach(d => {
            console.log(datapoints_30["date"])
            console.log(parseTime(d.date))
            d.datetime = parseTime(d.date)
          })
        const dates2 = datapoints_30.map(d => d.datetime)
        const deaths2 = datapoints_30.map(d => +d['Deaths_per_day'])

        
        xPositionScale.domain(dates2)
        yPositionScale.domain([0,d3.max(deaths2)])

 

        svg.append('path')
        .datum(datapoints_30)
        .attr('class', 'path_this_3')
        .attr('d', function(d) {
            return line(d)
        })
        .attr('stroke', '#CD5C5C')
        .attr('stroke-width', 2)
        .attr('fill', 'none')

        // svg.append('path')
        // .datum(datapoints)
        // .attr('class', 'path_this_3')
        // .attr('d', function(d) {
        //     return line(d)
        // })
        // .attr('stroke', '#CD5C5C')
        // .attr('stroke-width', 2)
        // .attr('fill', 'none')

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
          .attr('fill', '#CD5C5C')
        .attr('opacity',0.5)
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
    
         d3.select('#toggle5').on('click', () => {

          svg.selectAll('.path_this_3').remove()
          svg.selectAll('.rect_30').remove()
  
  
  
          
  
          
          xPositionScale.domain(dates)
          yPositionScale.domain(d3.extent(deaths))
  
  
          svg.append('path')
          .datum(datapoints)
          .attr('class', 'path_this_3')
          .attr('d', function(d) {
              return line(d)
          })
          .attr('stroke', '#CD5C5C')
          .attr('stroke-width', 2)
          .attr('fill', 'none')
  
  
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
            .attr('fill', '#CD5C5C')
          .attr('opacity',0.5)
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
  
          svg.selectAll('.path_this_3').remove()
          svg.selectAll('.rect_all').remove()
  
          datapoints_30.forEach(d => {
              console.log(datapoints_30["date"])
              console.log(parseTime(d.date))
              d.datetime = parseTime(d.date)
            })
          const dates2 = datapoints_30.map(d => d.datetime)
          const deaths2 = datapoints_30.map(d => +d['Deaths_per_day'])
  
          
          xPositionScale.domain(dates2)
          yPositionScale.domain([0,d3.max(deaths2)])

          const xAxis = d3
          .axisBottom(xPositionScale)
          .tickSize(height)
          .tickFormat(d3.timeFormat('%b %d'))
          .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%4)}));
  
          svg.append('path')
          .datum(datapoints_30)
          .attr('class', 'path_this_3')
          .attr('d', function(d) {
              return line(d)
          })
          .attr('stroke', '#CD5C5C')
          .attr('stroke-width', 2)
          .attr('fill', 'none')
  
          // svg.append('path')
          // .datum(datapoints)
          // .attr('class', 'path_this_3')
          // .attr('d', function(d) {
          //     return line(d)
          // })
          // .attr('stroke', '#CD5C5C')
          // .attr('stroke-width', 2)
          // .attr('fill', 'none')
  
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
            .attr('fill', '#CD5C5C')
          .attr('opacity',0.5)
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

          svg.selectAll('.path_this_3')   
          .attr('d', function(d) {
            return line(d)
        })
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
    //       .attr('fill', '#FFA500').attr('opacity',0.3)
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
//         .attr('fill', '#CD5C5C')
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
