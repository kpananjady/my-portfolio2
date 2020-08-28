import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import { exportDefaultSpecifier } from '@babel/types'
d3.tip = d3Tip

var margin = { top: 120, left: 100, right: 50, bottom: 50 }
const height = 500 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


  var xPositionScale = d3.scaleBand()
    .domain([2015,2016,2017,2018,2019])
    .range([0,width])
    .padding(0.5)


    var colorScale = d3.scaleOrdinal()
    .domain([2015,2016,2017,2018,2019])
    .range(['grey','lightgrey','lightgrey','lightgrey','grey'])


    const yPositionScale = d3
    .scaleLinear()
    .range([height, 0])

    d3.csv(require('/data/competency.csv')).then(ready)

    function ready(datapoints)
{

    svg.append('text').attr('class', 'town_name').text('Competency evaluations increase as new cases decrease').attr('alignment-baseline', 'middle').attr('y',-100).attr('font-size', '20px').attr('font-weight', 5)
    svg.append('text').attr('class', 'label_1').text('Cases added increased by 10% between 2015 and 2019 while ').attr('x', width/35).attr('y',-65).attr('font-weight', 5)
    svg.append('text').attr('class', 'label_1').text('the number of competency evaluations increased by 20%').attr('x', width/35).attr('y',-45).attr('font-weight', 5)
    svg.append('text').attr('class', 'label_1').text('in the same period.').attr('x', width/35).attr('y',-25).attr('font-weight', 5)



    yPositionScale.domain([0,3050])


    svg
    .append('rect')
    .attr('class', 'pchange')
    .attr('width', xPositionScale.bandwidth())
    .attr('height', d => {
        
      return height - yPositionScale(2891)
    })
    .attr('x', d => {
      return xPositionScale(2019)
    })
    .attr('y', d => {
      return yPositionScale(2891)
    })
    .attr('fill', '#E9967A')
    .attr('opacity',1)


    svg
    .selectAll('rect_stuff')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'rect_grey')
    .attr('width', xPositionScale.bandwidth())
    .attr('height', d => {
        
      return height - yPositionScale(+d['cases_total_added'])
    })
    .attr('x', d => {
      return xPositionScale(+d['year'])
    })
    .attr('y', d => {
        console.log(d['cases_total_added'], d['year'])
      return yPositionScale(+d['cases_total_added'])
    })
    .attr('fill', 'grey')
    .attr('opacity',1)
    // .on('click', lower())

    d3.select('#toggle').on('click', () => {
        yPositionScale.domain([0,3000])

        svg.select('#label-20').remove()
    svg.append('text').attr('id','label-10').attr('x', xPositionScale(2019)).attr('y', yPositionScale(2700)).text('—10%').attr('font-weight', 5).attr('font-size', 10).attr('fill', 'white')


        svg.select('#y-label').text('Cases')

        svg.select('.pchange').remove()

        svg
    .append('rect')
    .attr('class', 'pchange')
    .attr('width', xPositionScale.bandwidth())
    .attr('height', d => {
        
      return height - yPositionScale(2891)
    })
    .attr('x', d => {
      return xPositionScale(2019)
    })
    .attr('y', d => {
      return yPositionScale(2891)
    })
    .attr('fill', '#E9967A')
    .attr('opacity',1)
    .lower()
        
        svg
        .selectAll('.rect_grey')
        .attr('height', d => {
          return height - yPositionScale(d['cases_total_added'])
        })
        .attr('y', d => {
          return yPositionScale(d['cases_total_added'])
        })
        .attr('fill', 'grey')
        .attr('x', d => {
            return xPositionScale(d['year'])
          })
          .attr('width', xPositionScale.bandwidth())

          svg
          .select('.y-axis')
          .transition()
          .duration(1000)
          .call(yAxis)

          d3.select('.y-axis .domain').remove()

      })

    
    
      d3.select('#toggle2').on('click', () => {
        yPositionScale.domain([0,1500])


        svg.select('#label-10').remove()
        svg.append('text').attr('id','label-20').attr('x', xPositionScale(2015)+2).attr('y', yPositionScale(1100)).text('+20%').attr('font-weight', 5).attr('font-size', 10).attr('fill', 'white')


        svg.select('#y-label').text('Evals')


        console.log(evals)
      

        svg.select('.pchange').remove()

        svg
        .append('rect')
        .attr('class', 'pchange')
        .attr('width', xPositionScale.bandwidth())
        .attr('height', d => {
            
          return height - yPositionScale(1299)
        })
        .attr('x', d => {
          return xPositionScale(2015)
        })
        .attr('y', d => {
          return yPositionScale(1299)
        })
        .attr('fill', '#E9967A')
        .attr('opacity',1)
        .lower()

        const evals = datapoints.map(d => +d['competency_evals'])

       
        svg
        .selectAll('.rect_grey')
        .attr('height', d => {
          return height - yPositionScale(d['competency_evals'])
        })
        .attr('y', d => {
          return yPositionScale(d['competency_evals'])
        })
        .attr('fill', 'grey')
        .attr('x', d => {
            return xPositionScale(d['year'])
          })
          .attr('width', xPositionScale.bandwidth())

        //  yAxis = d3
        //   .axisLeft(yPositionScale)
        //   .tickSize(-width)
        //   .ticks(5)

          svg
          .select('.y-axis')
          .transition()
          .duration(1000)
          .call(yAxis)

          d3.select('.y-axis .domain').remove()


      })


      const xAxis = d3
      .axisBottom(xPositionScale)
      .tickSize(height)
      .ticks(5)
  
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

    // svg.append('text').text('1').attr('id', 'one').attr('y', height+10).attr('x',xPositionScale(1)+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    // svg.append('text').text('2').attr('id', 'two').attr('y', height+10).attr('x',xPositionScale(2)+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    // svg.append('text').text('3').attr('id', 'three').attr('y', height+10).attr('x',xPositionScale(3)+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    // svg.append('text').text('4').attr('id', 'four').attr('y', height+10).attr('x',xPositionScale(4)+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    // svg.append('text').text('5').attr('id', 'five').attr('y', height+10).attr('x',xPositionScale(5)+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    // svg.append('text').text('Mental Health Need Scores').attr('id','label').attr('y', height+40).attr('x',width/2).attr('font-weight', 5).attr('font-size', 10)

    svg.append('text').attr('id','y-label').text('Cases').attr('y', height/2).attr('x',-70).attr('font-weight', 5).attr('font-size', 10)

    svg.append('text').text('Total').attr('y', height/2-50).attr('x',-70).attr('font-weight', 5).attr('font-size', 10)
    
    svg.append('circle').attr('r', 5).attr('cx', -90).attr('cy',  height/2-100).attr('fill', '#E9967A')
    svg.append('circle').attr('r', 5).attr('cx', -90).attr('cy',  height/2-55).attr('fill', 'grey')

    svg.append('text').text('Diff. ').attr('y', height/2-100).attr('x',-70).attr('font-weight', 5).attr('font-size', 10)
    svg.append('text').text("'15-'19").attr('y', height/2-90).attr('x',-70).attr('font-weight', 5).attr('font-size', 10)

    function render() {
        const svgContainer = svg.node().closest('div')
        const svgWidth = svgContainer.offsetWidth
        // Do you want it to be full height? Pick one of the two below
        const svgHeight = height + margin.top + margin.bottom
        // const svgHeight = window.innerHeight
    
        const actualSvg = d3.select(svg.node().closest('svg'))
        actualSvg.attr('width', svgWidth).attr('height', svgHeight)
    
        const newWidth = svgWidth - margin.left - margin.right

        svg.select('.town_name').attr('font-size', '20px').attr('font-weight', 5).attr('x',-70)
        svg.selectAll('.label_1').attr('font-size', '15px').attr('font-weight', 5).attr('x',-70)

    //     // const newHeight = svgHeight - margin.top - margin.bottom
    
    //     // Update our scale
        xPositionScale.range([0, newWidth])
        // yPositionScale.range([newHeight, 0])
    
        // Update things you draw
    
        // Update axes
         svg.select('.x-axis').call(xAxis)
    //     svg
    //       .select('.y-axis')
    //       .transition()
    //       .call(yAxis)

    //       svg
    //       .selectAll('.rect_race')
    //       .attr('width', xPositionScale.bandwidth())
    //       .attr('x', d => {
    //           return xPositionScale(d['year'])
    //         })
    svg
    .select('.pchange')
    .attr('width', xPositionScale.bandwidth())
    .attr('height', d => {
        
      return height - yPositionScale(2891)
    })
    .attr('x', d => {
      return xPositionScale(2019)
    })
    .attr('y', d => {
      return yPositionScale(2891)
    })
    .attr('fill', '#E9967A')
    .attr('opacity',1)
    .lower()

        svg
          .selectAll('.rect_grey')
          .attr('width', xPositionScale.bandwidth())
          .attr('height', d => {
        
            return height - yPositionScale(+d['cases_total_added'])
          })
          .attr('x', d => {
            return xPositionScale(+d['year'])
          })
          .attr('y', d => {
              console.log(d['cases_total_added'], d['year'])
            return yPositionScale(+d['cases_total_added'])
          })
     
         
    //       d3.select('#toggle').on('click', () => {
      
    //         svg
    //         .selectAll('.rect_race')
    //         .attr('height', d => {
    //           return height - yPositionScale(d['Black_%'])
    //         })
    //         .attr('y', d => {
    //           return yPositionScale(d['Black_%'])
    //         })
    //         .attr('fill', 'green')
    //         .attr('opacity',0.2)
    //         .attr('x', d => {
    //             return xPositionScale(d['Classification'])
    //           })
    //           .attr('width', xPositionScale.bandwidth())

    //       })
    
        
        
    //       d3.select('#toggle2').on('click', () => {
          
    //         svg
    //         .selectAll('.rect_race')
    //         .attr('height', d => {
    //           return height - yPositionScale(d['Hispanic_%'])
    //         })
    //         .attr('y', d => {
    //           return yPositionScale(d['Hispanic_%'])
    //         })
    //         .attr('fill', 'green')
    //         .attr('opacity',0.2)
    //         .attr('x', d => {
    //             return xPositionScale(d['Classification'])
    //           })
    //           .attr('width', xPositionScale.bandwidth())

    //       })
    // d3.select('#toggle').on('click', () => {
      
    

    //     yPositionScale.domain([0,3000])

    //     svg.select('#y-label').text('Cases')

    //     svg.select('.pchange').remove()

    //     svg
    // .append('rect')
    // .attr('class', 'pchange')
    // .attr('width', xPositionScale.bandwidth())
    // .attr('height', d => {
        
    //   return height - yPositionScale(2891)
    // })
    // .attr('x', d => {
    //   return xPositionScale(2019)
    // })
    // .attr('y', d => {
    //   return yPositionScale(2891)
    // })
    // .attr('fill', '#E9967A')
    // .attr('opacity',1)
    // .lower()
        
    //     svg
    //     .selectAll('.rect_grey')
    //     .attr('height', d => {
    //       return height - yPositionScale(d['cases_total_added'])
    //     })
    //     .attr('y', d => {
    //       return yPositionScale(d['cases_total_added'])
    //     })
    //     .attr('fill', 'grey')
    //     .attr('x', d => {
    //         return xPositionScale(d['year'])
    //       })
    //       .attr('width', xPositionScale.bandwidth())

    //       svg
    //       .select('.y-axis')
    //       .transition()
    //       .duration(1000)
    //       .call(yAxis)

    //       d3.select('.y-axis .domain').remove()

    //   })

    
    
    //   d3.select('#toggle2').on('click', () => {

    //     svg.select('#y-label').text('Evals')


    //     console.log(evals)
    //     yPositionScale.domain([0,1500])
      

    //     svg.select('.pchange').remove()

    //     svg

    //     .select('.pchange')
    //     .attr('width', xPositionScale.bandwidth())
    //     .attr('height', d => {
            
    //       return height - yPositionScale(1299)
    //     })
    //     .attr('x', d => {
    //       return xPositionScale(2015)
    //     })
    //     .attr('y', d => {
    //       return yPositionScale(1299)
    //     })
    //     .attr('fill', '#E9967A')
    //     .attr('opacity',1)
    //     .lower()

    //     const evals = datapoints.map(d => +d['competency_evals'])

       
    //     svg
    //     .selectAll('.rect_grey')
    //     .attr('height', d => {
    //       return height - yPositionScale(d['competency_evals'])
    //     })
    //     .attr('y', d => {
    //       return yPositionScale(d['competency_evals'])
    //     })
    //     .attr('fill', 'grey')
    //     .attr('x', d => {
    //         return xPositionScale(d['year'])
    //       })
    //       .attr('width', xPositionScale.bandwidth())

    //     //  yAxis = d3
    //     //   .axisLeft(yPositionScale)
    //     //   .tickSize(-width)
    //     //   .ticks(5)

    //       svg
    //       .select('.y-axis')
    //       .transition()
    //       .duration(1000)
    //       .call(yAxis)

    //       d3.select('.y-axis .domain').remove()
    //     //   d3.select('.x-axis .domain').remove()


    //   })
    
    //       d3.select('#toggle3').on('click', () => {
    //         svg
    //         .selectAll('.rect_race')
    //         .attr('height', d => {
    //           return height - yPositionScale(d['White_%'])
    //         })
    //         .attr('y', d => {
    //           return yPositionScale(d['White_%'])
    //         })
    //         .attr('fill', 'green')
    //         .attr('opacity',0.2)
    //         .attr('x', d => {
    //             return xPositionScale(d['Classification'])
    //           })
    //           .attr('width', xPositionScale.bandwidth())

    
    
    //     })

    //     //   svg
    //     //   .selectAll('.rect_race')
    //     //   .attr('width', xPositionScale.bandwidth())
    //     //   .attr('height', d => {
    //     //     return height - yPositionScale(d['Black_%'])
    //     //   })
    //     //   .attr('x', d => {
    //     //     return xPositionScale(d['Classification'])
    //     //   })
    //     //   .attr('y', d => {
    //     //     return yPositionScale(d['Black_%'])
    //     //   })
    //     //   .attr('fill', 'green')
    //     //   .attr('opacity', 0.2)
    //     // svg.select('#label-1').attr('x', newWidth * 0.75)
    //     // //  .attr('y', newHeight + 15)
    
    //     // svg.select('#label-2').attr('x', newWidth * 0.25)
    //     //   .attr('y', newHeight + 15)


    d3.select('.y-axis .domain').remove()
  
    d3.select('.x-axis .domain').remove()

    //     d3.select('#one').attr('x',xPositionScale(1)+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    //     d3.select('#two').attr('x',xPositionScale(2)+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    //     d3.select('#three').attr('x',xPositionScale(3)+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    //     d3.select('#four').attr('x',xPositionScale(4)+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    //     d3.select('#five').attr('x',xPositionScale(5)+xPositionScale.bandwidth()/2).attr('font-weight', 5).attr('font-size', 10)
    //     d3.select('#label').attr('x', newWidth/2-40)
      }
    
    //   // When the window resizes, run the function
    //   // that redraws everything
      window.addEventListener('resize', render)
    
      // And now that the page has loaded, let's just try
      // to do it once before the page has resized
      render()
}  