import * as d3 from 'd3'

const margin = {
  top: 0,
  right: 80,
  bottom: 0,
  left: 0
}

const width = 700 - margin.left - margin.right
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
  svg.append('rect').attr('x', 10).attr('y',40).attr('width',width).attr('height',100).attr('fill','#FFFACD')
  
  svg.append('rect').attr('y',4*height/5-20).attr('x',width/10+width/80).attr('width', 4*height/4).attr('height',35).attr('fill','white').attr('class', 'rate')
  svg.append('text').text('Positivity').attr('font-size', '12px').attr('font-weight', 30).attr('x', 10).attr('y', 4*height/5-25).attr('class', 'rate').attr('fill', 'black')
  svg.append('text').text(`${parseFloat(datapoints[datapoints.length-1]['P_Rate']).toFixed(2)}%`).attr('font-size', '20px').attr('font-weight', 5).attr('x', 10).attr('y', 4*height/5).attr('class', 'rate').attr('fill', 'darkred')
  svg.append('text').text(`on ${datapoints[datapoints.length-1]['date']}`).attr('font-size', '10px').attr('font-weight', 5).attr('x', 10).attr('y', 4*height/5+10).attr('class', 'rate').attr('fill', 'darkred').attr('id', 'date')

  svg.append('rect').attr('y',4*height/5-20).attr('x',2*width/10+2*width/80).attr('width', 4*height/4).attr('height',35).attr('fill','white').attr('class', 'cases')
  svg.append('text').text('Cases').attr('font-size', '12px').attr('font-weight', 5).attr('x', 4*width/4+2*width/80).attr('y', 4*height/5-25).attr('class', 'cases').attr('fill', 'black')
  svg.append('text').text(`+${parseFloat(datapoints[datapoints.length-1]['Total']).toFixed()}`).attr('font-size', '20px').attr('font-weight', 5).attr('x', 4*width/4+2*width/80).attr('y', 4*height/5).attr('class', 'cases').attr('fill', 'darkred')
  svg.append('text').text(`on ${datapoints[datapoints.length-1]['date']}`).attr('font-size', '10px').attr('font-weight', 5).attr('x', 4*width/4+2*width/80).attr('y', 4*height/5+10).attr('class', 'cases').attr('fill', 'darkred').attr('id', 'date')

  svg.append('rect').attr('y',4*height/5-20).attr('x',3*width/10+3*width/80).attr('width', 4*height/4).attr('height',35).attr('fill','white').attr('class', 'hosps')
  svg.append('text').text('Hospitalizations').attr('font-size', '12px').attr('font-weight', 5).attr('x', 2*4*height/4+3*width/80).attr('y', 4*height/5-25).attr('class', 'hosps').attr('fill', 'black').attr('id', 'hosp')
  svg.append('text').text(`${parseFloat(datapoints[datapoints.length-1]['hospitalizedcases']).toFixed()}`).attr('font-size', '20px').attr('font-weight', 5).attr('x',2*4*height/4+3*width/80).attr('y', 4*height/5).attr('class', 'hosps').attr('fill', 'darkred')
  svg.append('text').text(`currently in hospital`).attr('font-size', '10px').attr('font-weight', 5).attr('x',2*4*height/4+3*width/80).attr('y', 4*height/5+10).attr('class', 'hosps').attr('fill', 'darkred').attr('id', 'currently')
  
  svg.append('rect').attr('y',4*height/5-20).attr('x',4*width/10+4*width/80).attr('width', 4*height/4).attr('height',35).attr('fill','white').attr('class', 'deaths')
  svg.append('text').text('Deaths').attr('font-size', '12px').attr('font-weight', 5).attr('x', 3*4*height/4+4*width/80).attr('y', 4*height/5-25).attr('class', 'deaths').attr('fill', 'black')
  svg.append('text').text(`+${parseFloat(datapoints[datapoints.length-1]['Deaths_per_day']).toFixed()}`).attr('font-size', '20px').attr('font-weight', 5).attr('x', 3*4*height/4+4*width/80).attr('y', 4*height/5).attr('class', 'deaths').attr('fill', 'darkred')
  svg.append('text').text(`on ${datapoints[datapoints.length-1]['date']}`).attr('font-size', '10px').attr('font-weight', 5).attr('x', 3*4*height/4+4*width/80).attr('y', 4*height/5+10).attr('class', 'deaths').attr('fill', 'darkred').attr('id', 'date')

 



  const markerBoxWidth = 10;
  const markerBoxHeight = 10;
  const refX = markerBoxWidth / 2;
  const refY = markerBoxHeight / 2;
  const markerWidth = markerBoxWidth / 2;
  const markerHeight = markerBoxHeight / 2;
  const arrowPoints = [[0, 0], [0, 10], [10, 5]]
  svg
  .append('defs')
  .append('marker')
  .attr('id', 'arrow')
  .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
  .attr('refX', refX)
  .attr('refY', refY)
  .attr('markerWidth', markerBoxWidth)
  .attr('markerHeight', markerBoxHeight)
  .attr('orient', 'auto-start-reverse')
  .append('path')
  .attr('d', d3.line()(arrowPoints))
  .attr('stroke', 'lightblue')
  .attr('fill', 'black');

  svg
  .append('defs')
  .append('marker')
  .attr('id', 'arrow2')
  .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
  .attr('refX', refX)
  .attr('refY', refY)
  .attr('markerWidth', markerBoxWidth)
  .attr('markerHeight', markerBoxHeight)
  .attr('orient', 'auto-start-reverse')
  .append('path')
  .attr('d', d3.line()(arrowPoints))
  .attr('stroke', 'pink')
  .attr('fill', 'black');


  if (datapoints[datapoints.length-1]['P_Rate_Avg']<datapoints[datapoints.length-2]['P_Rate_Avg']){

    console.log('here')
  svg.append("line")
  .attr('class', 'my_line')
  .attr('id', 'rate_line')

    .attr("y1",  55)
    .attr("y2", 45)
    // .attr("x1", width/10-width/80)
    .attr("x1",  width/200+5*width/80+35)
    .attr("x2", width/200+5*width/80+35)
    .attr("stroke", 'black')
    .attr("stroke-width", "1px")
    .attr("marker-start", function(d){
    
          return "url(#arrow)"


      })

    } else {

      svg.append("line")
      .attr('class', 'my_line')
      .attr('id', 'rate_line')
    
        .attr("y1",  45)
        .attr("y2", 55)
        // .attr("x1", width/10-width/80)
        .attr("x1",  width/200+5*width/80+35)
        .attr("x2", width/200+5*width/80+35)
        .attr("stroke", 'black')
        .attr("stroke-width", "1px")
        .attr("marker-start", function(d){
        
              return "url(#arrow)"
    
    
          })

    }

    if (parseFloat(datapoints[datapoints.length-1]['Total_Avg'])<parseFloat(datapoints[datapoints.length-2]['Total_Avg'])){

  svg.append("line")
  .attr('class', 'cases')
  .attr('id', 'case_line')

    .attr("y1",  55)
    .attr("y2", 45)
    // .attr("x1", width/10-width/80)
    .attr("x1",  2*width/10+2*width/80+35)
    .attr("x2", 2*width/10+2*width/80+35)
    .attr("stroke", 'black')
    .attr("stroke-width", "1px")
    .attr("marker-start", function(d){


          return "url(#arrow)"

      })
    // .lower()

    } else {


  svg.append("line")
  .attr('class', 'cases')
  .attr('id', 'case_line')

    .attr("y1",  45)
    .attr("y2", 55)
    // .attr("x1", width/10-width/80)
    .attr("x1",  2*width/10+2*width/80+35)
    .attr("x2", 2*width/10+2*width/80+35)
    .attr("stroke", 'black')
    .attr("stroke-width", "1px")
    .attr("marker-start", function(d){


          return "url(#arrow)"

    })

  }

  if (datapoints[datapoints.length-1]['Hosp_Avg']<datapoints[datapoints.length-2]['Hosp_Avg']){

  svg.append("line")
  .attr('class', 'cases')
  .attr('id', 'hosp_line')

    .attr("y1",  55)
    .attr("y2", 45)
    // .attr("x1", width/10-width/80)
    .attr("x1",  10*width/20+5*width/80+75)
    .attr("x2", 10*width/20+5*width/80+75)
    .attr("stroke", 'black')
    .attr("stroke-width", "1px")
    .attr("marker-start", function(d){
        //  console.log()
          return "url(#arrow)"
      })

    } else {

      svg.append("line")
      .attr('class', 'cases')
      .attr('id', 'hosp_line')
    
        .attr("y1",  45)
        .attr("y2", 55)
        // .attr("x1", width/10-width/80)
        .attr("x1",  10*width/20+5*width/80+75)
        .attr("x2", 10*width/20+5*width/80+75)
        .attr("stroke", 'black')
        .attr("stroke-width", "1px")
        .attr("marker-start", function(d){
            //  console.log()
              return "url(#arrow)"
          })

    }

    if (datapoints[datapoints.length-1]['Death_Avg']<datapoints[datapoints.length-2]['Death_Avg']){

      console.log('hosps decreased')
      svg.append("line")
      .attr('class', 'cases')
      .attr('id', 'death_line')
    
        .attr("y1",  55)
        .attr("y2", 45)
        // .attr("x1", width/10-width/80)
        .attr("x1",  15*width/20+5*width/80+35)
        .attr("x2", 15*width/20+5*width/80+35)
        .attr("stroke", 'black')
        .attr("stroke-width", "1px")
        .attr("marker-start", function(d){
              return "url(#arrow)"

    
          })

        } else {
          svg.append("line")
          .attr('class', 'cases')
          .attr('id', 'death_line')
        
            .attr("y1",  45)
            .attr("y2", 55)
            // .attr("x1", width/10-width/80)
            .attr("x1",  15*width/20+5*width/80+35)
            .attr("x2", 15*width/20+5*width/80+35)
            .attr("stroke", 'black')
            .attr("stroke-width", "1px")
            .attr("marker-start", function(d){
                  return "url(#arrow)"
    
        
              })
        }
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
         d3.selectAll('.rate').attr('x',newWidth/200+5*newWidth/80)
        d3.selectAll('.cases').attr('x', 5*newWidth/20+5*newWidth/80)
        d3.selectAll('.hosps').attr('x',10*newWidth/20+5*newWidth/80)
        d3.selectAll('.deaths').attr('x',15*newWidth/20+5*newWidth/80)
        d3.select('#rate_line')    .attr("x1",  width/200+5*width/80+55)
        .attr("x2", width/200+5*width/80+55)

        d3.select('#hosp_line')   
        .attr("x1",  10*newWidth/20+5*newWidth/80+90)
        .attr("x2", 10*newWidth/20+5*newWidth/80+90)

        d3.select('#death_line')   
        .attr("x1",  15*newWidth/20+5*newWidth/80+55)
        .attr("x2", 15*newWidth/20+5*newWidth/80+55)

        d3.select('#case_line')    
        .attr("x1",  2*width/10+2*width/80+55)
        .attr("x2",  2*width/10+2*width/80+55)
        // .attr("x1",  newWidth/10+5*newWidth/80)
        // .attr("x2", newWidth/10+5*newWidth/80)

    //     // Update axes
        


    if (newWidth > 500) {

        console.log(newWidth, 'newWidth 1')



        d3.select('#case_line')    .attr("x1",  2*width/10+2*width/80+95)
        .attr("x2", 2*width/10+2*width/80+95)

    

      } else if (newWidth > 470) {

        console.log(newWidth, 'newWidth 1.5')




    

      } 
      else if (newWidth > 400){

      
        console.log(newWidth, 'newWidth 2')


   
      } else if (newWidth >370) {

        console.log(newWidth, 'newWidth 3')
 


      }

      else if (newWidth > 325) {

        console.log(newWidth, 'newWidth 3.5')
        d3.select('#currently').text('in hospital')
        d3.selectAll('#date').text(`${parseTime(datapoints[datapoints.length-1]['date']).getMonth()+1}/${parseTime(datapoints[datapoints.length-1]['date']).getDate()}`)
        d3.select('#hosp').text('Hosps.')

        d3.select('#hosp_line')   
        .attr("x1",  10*newWidth/20+5*newWidth/80+50)
        .attr("x2", 10*newWidth/20+5*newWidth/80+50)
        
        d3.select('#case_line')    .attr("x1",  2*width/10+2*width/80+15)
        .attr("x2", 2*width/10+2*width/80+15)

      } 
      else if (newWidth > 250) {

        console.log(newWidth, 'newWidth 3.5')
        d3.select('#currently').text('in hospital')
        d3.selectAll('#date').text(`${parseTime(datapoints[datapoints.length-1]['date']).getMonth()+1}/${parseTime(datapoints[datapoints.length-1]['date']).getDate()}`)
        d3.select('#hosp').text('Hosps.')

        console.log(newWidth, 'newWidth 4')
        d3.select('#hosp').text('Hosps.')
        d3.select('#rate_line')    .attr("x1",  width/200+5*width/80+35)
        .attr("x2", width/200+5*width/80+35)

        d3.select('#case_line')    .attr("x1",  2*width/10+2*width/80-5)
        .attr("x2", 2*width/10+2*width/80-5)

        d3.select('#hosp_line')   
        .attr("x1",  10*newWidth/20+5*newWidth/80+50)
        .attr("x2", 10*newWidth/20+5*newWidth/80+50)

      }      else if (newWidth > 200) {

        console.log(newWidth, 'newWidth 4.5')
        d3.select('#hosp').text('Hosps.')

        d3.select('#hosp_line')   
        .attr("x1",  10*newWidth/20+5*newWidth/80+50)
        .attr("x2", 10*newWidth/20+5*newWidth/80+50)


      }
      else {

        console.log(newWidth, 'newWidth 3.5')
        d3.select('#currently').text('in hospital')
        d3.selectAll('#date').text(`${parseTime(datapoints[datapoints.length-1]['date']).getMonth()+1}/${parseTime(datapoints[datapoints.length-1]['date']).getDate()}`)
        d3.select('#hosp').text('Hosps.')


        console.log(newWidth, 'newWidth 5')

        d3.select('#hosp').text('Hosps.')

 
      }
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
