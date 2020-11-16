import * as d3 from 'd3'

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

  datapoints.forEach(d => {

    d.datetime = parseTime(d["date"])
  })
const dates = datapoints.map(d => d.datetime)
const cases = datapoints.map(d => +d["P_Rate"])

xPositionScale.domain(dates)
yPositionScale.domain(d3.extent(cases))

function movingAverage(values, N) {
    let i = 0;
    let sum = 0;
    const means = new Float64Array(values.length).fill(NaN);
    for (let n = Math.min(N - 1, values.length); i < n; ++i) {
      sum += values[i];
    }
    for (let n = values.length; i < n; ++i) {
      sum += values[i];
      means[i] = sum / N;
      sum -= values[i - N + 1];
    }
    return means;
  }


  datapoints.forEach(function(d) {
    d.key = parseTime((d["date"]));
    d.value = +d["P_Rate"];
  });

//   var pppppPrevVal = 0;
//   var ppppPrevVal = 0;
//   var pppPrevVal = 0;
//   var ppPrevVal = 0;

     


      // var curVal = 0
      // var valOne = 0
      // var valTwo = 0
      // var valThree = 0
      // var valFour = 0
      // var valFive = 0
      // var valSix = 0
      // var valSeven = 0
      // var movingAverageLine = d3.line()
      // .x(function(d,i) { return xPositionScale(d.key); })
      // .y(function(d,i) {
      //     if (i == 0) {
      //       console.log('hre')
      //         valOne  = yPositionScale(d.value);
      //         valTwo  = yPositionScale(d.value);
      //         valThree  = yPositionScale(d.value);
      //         valFour  = yPositionScale(d.value);
      //         valFive  = yPositionScale(d.value);
      //         valSix  = yPositionScale(d.value);
      //         valSeven = yPositionScale(d.value);

      //         curVal =  yPositionScale(0);
      //     } else if (i == 1) {
      //       // console.log(d.value)

      //         valOne = valTwo;
      //         valTwo  = yPositionScale(d.value);
      //         valThree  = yPositionScale(d.value);
      //         valFour  = yPositionScale(d.value);
      //         valFive  = yPositionScale(d.value);
      //         valSix  = yPositionScale(d.value);
      //         valSeven = yPositionScale(d.value);

      //         curVal =  yPositionScale(0);
      //     } else if (i == 2) {

      //       valOne = valTwo;
      //       valTwo  = valThree;
      //       valThree  = yPositionScale(d.value);
      //       valFour  = yPositionScale(d.value);
      //       valFive  = yPositionScale(d.value);
      //       valSix  = yPositionScale(d.value);
      //       valSeven = yPositionScale(d.value);

             
      //       curVal =  yPositionScale(0);
      //     }  else if (i == 3) {
           
      //       valOne = valTwo;
      //       valTwo  = valThree;
      //       valThree  = valFour;
      //       valFour  = yPositionScale(d.value);
      //       valFive  = yPositionScale(d.value);
      //       valSix  = yPositionScale(d.value);
      //       valSeven = yPositionScale(d.value);

      //       curVal =  yPositionScale(0);


      //   }  else if (i == 4) {
      //     valOne = valTwo;
      //     valTwo  = valThree;
      //     valThree  = valFour;
      //     valFour  = valFive;
      //     valFive  = yPositionScale(d.value);
      //     valSix  = yPositionScale(d.value);
      //     valSeven = yPositionScale(d.value);

      //     curVal =  yPositionScale(0);

      //   } else if (i == 5) {
      //     valOne = valTwo;
      //     valTwo  = valThree;
      //     valThree  = valFour;
      //     valFour  = valFive;
      //     valFive  = valSix;
      //     valSix  = yPositionScale(d.value);
      //     valSeven = yPositionScale(d.value);

      //     curVal =  yPositionScale(0);
        
      //     } else {
      //       valOne = valTwo;
      //     valTwo  = valThree;
      //     valThree  = valFour;
      //     valFour  = valFive;
      //     valFive  = valSix;
      //     valSix  = valSeven;
      //     valSeven = yPositionScale(d.value);

      //     curVal = (valOne + valTwo + valThree + valFour + valFive +valSix + valSeven)/7
      //     } 
      //     console.log(curVal,'MEAN')
      //     return curVal;
      // })


         
      // svg
      // .selectAll('circle-points')
      // .data(datapoints)
      // .enter()
      // .append('circle')
      // .attr('class', 'circle-points')
      // .attr('r', 5)
      // .attr('cx', d => xPositionScale(parseTime(d["date"])))
      // .attr('cy', d => yPositionScale( d['P_Rate_Avg']))
      // .style('fill', '#8B0000')  .attr('opacity', 0.35)



      const line = d3
      .line()
      .x(function(d) {
        return xPositionScale(parseTime(d["date"]))
      })
      .y(function(d) {
        return yPositionScale(d["P_Rate_Avg"])
      })


   

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
    .lower()
 
const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%b %d'))
    .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%20)}));


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

        svg.selectAll('.average').remove() 
        svg.selectAll('.mean-line').remove() 

        svg.selectAll('.rect_30').remove()

        xPositionScale.domain(dates)
        yPositionScale.domain(d3.extent(cases))


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

        
        xPositionScale.domain(dates2)
        yPositionScale.domain([0,d3.max(cases2)])

        svg.append("line")
        .attr("class", "mean-line")
       .attr('x1', xPositionScale(d3.min(dates2)))
       .attr('y1',yPositionScale(5)) 
       .attr('x2',xPositionScale(d3.max(dates2)))
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

        svg.selectAll('.average').remove() 
        svg.selectAll('.mean-line').remove() 

        svg.selectAll('.rect_30').remove()

        xPositionScale.domain(dates)
        yPositionScale.domain(d3.extent(cases))


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

        
        xPositionScale.domain(dates2)
        yPositionScale.domain([0,d3.max(cases2)])

        const xAxis = d3
    .axisBottom(xPositionScale)
    .tickSize(height)
    .tickFormat(d3.timeFormat('%b %d'))
    .tickValues(xPositionScale.domain().filter(function(d,i){ return !(i%4)}));

        svg.append("line")
        .attr("class", "mean-line")
       .attr('x1', xPositionScale(d3.min(dates2)))
       .attr('y1',yPositionScale(5)) 
       .attr('x2',xPositionScale(d3.max(dates2)))
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
