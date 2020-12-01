import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

const margin = {
  top: 30,
  right: 20,
  bottom: 30,
  left: 120
}

const width = 700 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

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

  const tip = d3
.tip()
.attr('class', 'd3-tip d3-tip-scrolly')
.style('pointer-events', 'none')
.offset([-10, 0])
.html(function(d) {

  return `${parseFloat(d['value']).toFixed(2)}<br>
  ${parseTime(d['date']).getMonth()+1}/${parseTime(d['date']).getDate()}/${parseTime(d['date']).getFullYear()}` 
  // (d3.max(dates).getMonth()+1) + "-" + d3.max(dates).getDate()
})

svg.call(tip)
function ready([datapoints, datapoints_30]) {
  // Sort the countries from low to high

  svg.append('text').attr('x',0).attr('y',-5).text('Since March:').attr('font-size', '15px').attr('font-weight', 5).attr('id', 'dynamic_hed')

  datapoints.forEach(d => {

    console.log(parseTime(d["date"]))
    d.datetime = parseTime(d["date"])
  })





  const dates = datapoints.map(d => d.datetime)
var tomorrow = new Date();


var dates_array = d3.timeDays(d3.min(dates), d3.max(dates))
dates_array.push(d3.max(dates))

console.log(dates_array[dates_array.length-1], 'this')

const hosps = datapoints.map(d => +d['hospitalizedcases'])

xPositionScale.domain(dates_array)
yPositionScale.domain([0,d3.max(hosps)])

  svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'rect_all')
    .attr('width', xPositionScale.bandwidth())
    .attr('height', d => {
      return height - yPositionScale(d['hospitalizedcases'])
    })
    .attr('x', d => {
      return xPositionScale(d.datetime)
    })
    .attr('y', d => {
      return yPositionScale(d['hospitalizedcases'])
    })
    .attr('fill', '#FFA07A')
     .attr('opacity',0.5)

    .lower()


    const line = d3
    .line()
    .x(function(d) {
      return xPositionScale(parseTime(d["date"])) + xPositionScale.bandwidth()/2
    })
    .y(function(d) {
      return yPositionScale(d["Hosp_Avg"])
    })

 

    svg.append('path')
    .datum(datapoints)
    .attr('class', 'average_2')
    .attr('d', function(d) {
        return line(d)
    })
    .attr('stroke', '#FFA07A')
    .attr('stroke-width', 2)
    .attr('fill', 'none')




const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%b %d'))
    .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%50)}));


    svg
    .append('g')
    .attr('class', 'axis x-axis')
    .call(xAxis)
    .lower()

  const yAxis = d3
    .axisLeft(yPositionScale)
    .tickSize(-width)
    .ticks(5)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
    .lower()


    

    d3.select('.y-axis .domain').remove()

    d3.select('.x-axis .domain').remove()


    d3.select('#toggle3').on('click', () => {

        svg.selectAll('.average_2').remove()
        svg.selectAll('.rect_30').remove()

      
        
        datapoints.forEach(d => {

          console.log(parseTime(d["date"]))
          d.datetime = parseTime(d["date"])
        })
      
      
      
      
      
        const dates = datapoints.map(d => d.datetime)
      var tomorrow = new Date();
      
      
      var dates_array = d3.timeDays(d3.min(dates), d3.max(dates))
      dates_array.push(d3.max(dates))
      
      console.log(dates_array[dates_array.length-1], 'this')
      
      const hosps = datapoints.map(d => +d['hospitalizedcases'])
      
      xPositionScale.domain(dates_array)
      yPositionScale.domain([0,d3.max(hosps)])

        svg.append('path')
        .datum(datapoints)
        .attr('class', 'average_2')
        .attr('d', function(d) {
            return line(d)
        })
        .attr('stroke', '#FFA07A')
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
          return height - yPositionScale(d['hospitalizedcases'])
        })
        .attr('x', d => {
          return xPositionScale(d.datetime)
        })
        .attr('y', d => {
          return yPositionScale(d['hospitalizedcases'])
        })
        .attr('fill', '#FFA07A')
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

    d3.select('#toggle4').on('click', () => {

      svg.selectAll('.average_2').remove()
      svg.selectAll('.rect_all').remove()

      

        datapoints_30.forEach(d => {
    
            console.log(parseTime(d["date"]))
            d.datetime = parseTime(d["date"])
          })
        const dates2 = datapoints_30.map(d => d.datetime)
        const hosps2 = datapoints_30.map(d => +d['hospitalizedcases'])

      
      
      
      var tomorrow = new Date();
      var dates_array = d3.timeDays(d3.min(dates2), d3.max(dates2))
      dates_array.push(d3.max(dates2))
      
      console.log(dates_array[dates_array.length-1], 'this')
            
      xPositionScale.domain(dates_array)
        
        yPositionScale.domain([0,d3.max(hosps2)])




        svg
        .selectAll('rect')
        .data(datapoints_30)
        .enter()
        .append('rect')
        .attr('class', 'rect_30')
        .attr('width', xPositionScale.bandwidth())
        .attr('height', d => {
          return height - yPositionScale(d['hospitalizedcases'])
        })
        .attr('x', d => {
          return xPositionScale(d.datetime)
        })
        .attr('y', d => {
          return yPositionScale(d['hospitalizedcases'])
        })
        .attr('fill', '#FFA07A')
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
    
         d3.select('#toggle3').on('click', () => {

          d3.select('#dynamic_hed').text('Since March:')


          svg.selectAll('.average_2').remove()
          svg.selectAll('.rect_30').remove()
          svg.selectAll('.circles').remove() 

        
          
          datapoints.forEach(d => {

            console.log(parseTime(d["date"]))
            d.datetime = parseTime(d["date"])
          })
        
        
        
        
        
          const dates = datapoints.map(d => d.datetime)
        var tomorrow = new Date();
        
        var dates_array = d3.timeDays(d3.min(dates), d3.max(dates))
        dates_array.push(d3.max(dates))
        console.log(dates_array[dates_array.length-1], 'this')
        
        const hosps = datapoints.map(d => +d['hospitalizedcases'])
        
        xPositionScale.domain(dates_array)
        yPositionScale.domain([0,d3.max(hosps)])
  
          svg.append('path')
          .datum(datapoints)
          .attr('class', 'average_2')
          .attr('d', function(d) {
              return line(d)
          })
          .attr('stroke', '#FFA07A')
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
            return height - yPositionScale(d['hospitalizedcases'])
          })
          .attr('x', d => {
            return xPositionScale(d.datetime)
          })
          .attr('y', d => {
            return yPositionScale(d['hospitalizedcases'])
          })
          .attr('fill', '#FFA07A')
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
  
      d3.select('#toggle4').on('click', () => {

        d3.select('#dynamic_hed').text('Past 30 days')

  
        svg.selectAll('.average_2').remove()
        svg.selectAll('.rect_all').remove()
  
        datapoints_30.forEach(d => {
    
          console.log(parseTime(d["date"]))
          d.datetime = parseTime(d["date"])
        })
      const dates2 = datapoints_30.map(d => d.datetime)
      const hosps2 = datapoints_30.map(d => +d['hospitalizedcases'])

    
    
    
    var tomorrow = new Date();
    var dates_array = d3.timeDays(d3.min(dates2), d3.max(dates2))
    dates_array.push(d3.max(dates2))
    
    console.log(dates_array[dates_array.length-1], 'this')
          
    xPositionScale.domain(dates_array)
      
      yPositionScale.domain([0,d3.max(hosps2)])
  
          const xAxis = d3
          .axisBottom(xPositionScale)
          .tickSize(height)
          .tickFormat(d3.timeFormat('%b %d'))
          .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%4)}));
  
          svg.append('path')
          .datum(datapoints_30)
          .attr('class', 'average_2')
          .attr('d', function(d) {
              return line(d)
          })
          .attr('stroke', '#FFA07A')
          .attr('stroke-width', 2)
          .attr('fill', 'none')

          svg.selectAll('circle_stuff')
.data(datapoints_30)
.enter()
.append('circle')
.attr('class', 'circles')
.attr('cx', d=> xPositionScale(parseTime(d["date"])) + xPositionScale.bandwidth()/2)
.attr('cy', d=> yPositionScale(d["Hosp_Avg"]))
.attr('stroke', '#FFA07A')
.attr('fill', '#FFA07A')
.attr('r', 3)
.on('mouseover', function(d){
    d3.select(this).attr('r', 6)
    d.value = d.Hosp_Avg
    tip.show.call(this, d)

})
.on('mouseout', function(d){
  d3.select(this).attr('r', 3)
  tip.hide.call(this, d)

})

          svg
          .selectAll('rect')
          .data(datapoints_30)
          .enter()
          .append('rect')
          .attr('class', 'rect_30')
          .attr('width', xPositionScale.bandwidth())
          .attr('height', d => {
            return height - yPositionScale(d['hospitalizedcases'])
          })
          .attr('x', d => {
            return xPositionScale(d.datetime)
          })
          .attr('y', d => {
            return yPositionScale(d['hospitalizedcases'])
          })
          .attr('fill', '#FFA07A')
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


        svg.selectAll('.average_2')   
        .attr('d', function(d) {
          return line(d)
      })

      svg.selectAll('.circles')   
      .attr('cx', d=> xPositionScale(parseTime(d["date"])) + xPositionScale.bandwidth()/2)
         .attr('cy', d=> yPositionScale(d["Hosp_Avg"]))
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
    //       .attr('fill', '#FFA500').attr('opacity',0.xPositionScale.bandwidth())
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
//       .attr('fill', '#FFA07A')
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
