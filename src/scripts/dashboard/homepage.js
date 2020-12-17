import * as d3 from 'd3'

const margin = {
  top: 0,
  right: 50,
  bottom: 0,
  left: 0
}

const width = 600 - margin.left - margin.right
const height = 100 - margin.top - margin.bottom

const svg = d3
  .select('#chart-0')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height',100)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3.scaleBand().range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 85])
  .range([35, 0])

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
  "https://test-uploading-file.s3.amazonaws.com/df_minus_30.csv" 
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

  console.log(datapoints[datapoints.length-1])
  svg.append('rect').attr('x', 0).attr('y',40).attr('width',440).attr('height',100).attr('fill','#FFFACD')
  
  svg.append('rect').attr('y',4*height/5-20).attr('x',width/80).attr('width', 4*height/4).attr('height',35).attr('fill','white')
  svg.append('text').text('Positivity').attr('font-size', '12px').attr('font-weight', 30).attr('x', 10).attr('y', 4*height/5-25).attr('class', 'label').attr('fill', 'black')
  svg.append('text').text(`${parseFloat(datapoints[datapoints.length-1]['P_Rate']).toFixed(2)}%`).attr('font-size', '20px').attr('font-weight', 5).attr('x', 10).attr('y', 4*height/5).attr('class', 'daily_nos').attr('fill', 'darkred')
  svg.append('text').text(`on ${datapoints[datapoints.length-1]['date']}`).attr('font-size', '10px').attr('font-weight', 5).attr('x', 10).attr('y', 4*height/5+10).attr('class', 'time').attr('fill', 'darkred')

  svg.append('rect').attr('y',4*height/5-20).attr('x',4*height/4+2*width/80).attr('width', 4*height/4).attr('height',35).attr('fill','white')
  svg.append('text').text('Cases').attr('font-size', '12px').attr('font-weight', 5).attr('x', 4*height/4+2*width/80).attr('y', 4*height/5-25).attr('class', 'label').attr('fill', 'black')
  svg.append('text').text(`+${parseFloat(datapoints[datapoints.length-1]['Total']).toFixed()}`).attr('font-size', '20px').attr('font-weight', 5).attr('x', 4*height/4+2*width/80).attr('y', 4*height/5).attr('class', 'daily_nos').attr('fill', 'darkred')
  svg.append('text').text(`on ${datapoints[datapoints.length-1]['date']}`).attr('font-size', '10px').attr('font-weight', 5).attr('x', 4*height/4+2*width/80).attr('y', 4*height/5+10).attr('class', 'time').attr('fill', 'darkred')

  svg.append('rect').attr('y',4*height/5-20).attr('x',2*4*height/4+3*width/80).attr('width', 4*height/4).attr('height',35).attr('fill','white')
  svg.append('text').text('Hospitalizations').attr('font-size', '12px').attr('font-weight', 5).attr('x', 2*4*height/4+3*width/80).attr('y', 4*height/5-25).attr('class', 'label').attr('fill', 'black')
  svg.append('text').text(`${parseFloat(datapoints[datapoints.length-1]['hospitalizedcases']).toFixed()}`).attr('font-size', '20px').attr('font-weight', 5).attr('x',2*4*height/4+3*width/80).attr('y', 4*height/5).attr('class', 'daily_nos').attr('fill', 'darkred')
  svg.append('text').text(`currently in hospital`).attr('font-size', '10px').attr('font-weight', 5).attr('x',2*4*height/4+3*width/80).attr('y', 4*height/5+10).attr('class', 'time').attr('fill', 'darkred')
  
  svg.append('rect').attr('y',4*height/5-20).attr('x',3*4*height/4+4*width/80).attr('width', 4*height/4).attr('height',35).attr('fill','white')
  svg.append('text').text('Deaths').attr('font-size', '12px').attr('font-weight', 5).attr('x', 3*4*height/4+4*width/80).attr('y', 4*height/5-25).attr('class', 'label').attr('fill', 'black')
  svg.append('text').text(`+${parseFloat(datapoints[datapoints.length-1]['Deaths_per_day']).toFixed()}`).attr('font-size', '20px').attr('font-weight', 5).attr('x', 3*4*height/4+4*width/80).attr('y', 4*height/5).attr('class', 'daily_nos').attr('fill', 'darkred')
  svg.append('text').text(`on ${datapoints[datapoints.length-1]['date']}`).attr('font-size', '10px').attr('font-weight', 5).attr('x', 3*4*height/4+4*width/80).attr('y', 4*height/5+10).attr('class', 'time').attr('fill', 'darkred')



      function render() {
        const svgContainer = svg.node().closest('div')
        const svgWidth = svgContainer.offsetWidth
        // Do you want it to be full 4*height? Pick one of the two below
        const svgHeight = 4*height + margin.top + margin.bottom
        // const svgHeight = window.innerHeight
    
        const actualSvg = d3.select(svg.node().closest('svg'))
        // actualSvg.attr('width', svgWidth).attr('height', svgHeight)
    
        const newWidth = svgWidth - margin.left - margin.right
        // const newHeight = svgHeight - margin.top - margin.bottom
    
        // Update our scale
        xPositionScale.range([0, newWidth])
        // yPositionScale.range([newHeight, 0])
    
    //     // Update things you draw
    
    //     // Update axes
        

    //       .attr('width', xPositionScale.bandwidth())
    //       .attr('height', d => {
    //         return 4*height - yPositionScale(d.life_expectancy)
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
}
