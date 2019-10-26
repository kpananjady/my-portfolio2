import * as d3 from 'd3'

const margin = { top: 0, left: 0, right: 0, bottom: 0 }
const height = 600 - margin.top - margin.bottom
const width = 600 - margin.left - margin.right

const svg = d3
  .select('#chart-7')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`)

d3.csv(require('/data/time-binned.csv'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

const bands = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '00:00'
]

const colorScale = d3.scaleOrdinal().range(['blue', 'orange'])

const angleScale = d3.scaleBand().range([0, Math.PI * 2])

const radius = 150

const radiusScale = d3
  .scaleLinear()
  .domain([10000, 50000])
  .range([0, radius])
const line = d3
  .radialArea()
  .innerRadius(d => radiusScale(d.total))
  .angle(d => angleScale(d.time))
  .outerRadius(radius - 35)

const arc = d3
  .arc()
  .radius(d => radiusScale(radius + 30))
  .startAngle(d => angleScale(d.time))
  .endAngle(d => angleScale(d.time) + angleScale.bandwidth())

const blueTimes = [
  '19:00',
  '19:15',
  '19:30',
  '19:45',
  '20:00',
  '20:15',
  '20:30',
  '20:45',
  '21:00',
  '21:15'
]
function ready(datapoints) {
  datapoints.push(datapoints[0])

  const times = datapoints.map(d => d.time)
  console.log(times, 'times')
  angleScale.domain(times)

  const gradient = svg
    .append('svg:defs')
    .append('svg:linearGradient')
    .attr('id', 'gradient')
    .attr('x1', '50%')
    .attr('y1', '40%')
    .attr('x2', '50%')
    .attr('y2', '100%')
    .attr('spreadMethod', 'pad')

  gradient
    .append('svg:stop')
    .attr('offset', '0%')
    .attr('stop-color', 'blue')
    .attr('stop-opacity', 1)

  gradient
    .append('svg:stop')
    .attr('offset', '100%')
    .attr('stop-color', 'orange')
    .attr('stop-opacity', 1)

  // gradient
  //   .selectAll('stop')
  //   .data([
  //     { offset: '0%', color: '#2c7bb6' },
  //     { offset: '12.5%', color: '#00a6ca' },
  //     { offset: '25%', color: '#00ccbc' },
  //     { offset: '37.5%', color: '#90eb9d' },
  //     { offset: '50%', color: '#ffff8c' },
  //     { offset: '62.5%', color: '#f9d057' },
  //     { offset: '75%', color: '#f29e2e' },
  //     { offset: '87.5%', color: '#e76818' },
  //     { offset: '100%', color: '#d7191c' }
  //   ])
  //   .enter()
  //   .append('stop')
  //   .attr('offset', function(d) {
  //     return d.offset
  //   })
  //   .attr('stop-color', function(d) {
  //     return d.color
  //   })
  //   .attr('stop-opacity', 1)

  svg
    .append('mask')
    .attr('id', 'newMask')
    .append('path')
    .datum(datapoints)
    //   .attr('fill', 'orange')
    .attr('d', line)
    .attr('stroke', 'none')
    //   .datum(datapoints)
    //   .attr('d', line)
    //   .attr('stroke', 'black')
    .attr('fill', 'white')

  svg
    .append('g')
    .attr('mask', 'url(#newMask)')
    .selectAll('.circle-round')
    .data(bands)
    .enter()
    .append('circle')
    .attr('class', '.circle-round')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale(d)}rad)`
    })
    .attr('cy', function(d) {
      return -radius - 30
    })
    .attr('r', 3)
    .attr('fill', 'grey')
    .lower()

  svg
    .append('g')
    .attr('mask', 'url(#newMask)')
    .append('path')
    .datum(datapoints)
    .attr('fill', 'url(#gradient)')
    .attr('d', line)
    .attr('stroke', 'none')
    .lower()

  svg
    .append('circle')
    .attr('r', radius + 30)
    .attr('stroke', 'grey')
    .attr('fill', 'none')
    .lower()

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('Midnight')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('00:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('01')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('01:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('02')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('02:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('03')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('03:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('04')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('04:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('05')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('05:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('06')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('06:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('07')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('07:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('08')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('08:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('09')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('09:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('10')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('10:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('11')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('11:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('12')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('12:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('13')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('13:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('13')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('13:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('14')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('14:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('15')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('15:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('16')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('16:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('17')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('17:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('18')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('18:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('19')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('19:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('20')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('20:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('21')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('21:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('22')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('22:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('23')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('23:00')}rad)`
    })
    .attr('y', -radius - 10)
    .attr('stroke', 'grey')
    .attr('font-size', '9px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('EVERYONE!')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('dy', -30)
    .attr('dx', -30)
    .attr('stroke', 'grey')
    .attr('font-size', '12px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('EVERYONE!')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('dy', -30)
    .attr('dx', -30)
    .attr('stroke', 'grey')
    .attr('font-size', '12px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('is born at 8 am.')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('dy', -10)
    .attr('dx', -30)
    .attr('stroke', 'grey')
    .attr('font-size', '12px')

  svg
    // .selectAll('.ticks')
    // .data(bands)
    // .enter()
    .append('text')
    .text('(Read Macbeth for details)')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('dy', 5)
    .attr('dx', -30)
    .attr('stroke', 'grey')
    .attr('font-size', '12px')
    .style('stroke-weight', 1)
  svg
    .selectAll('.path')
    .data(datapoints)
    .enter()
    .append('path')
    .attr('class', 'arc')
    .attr('d', d => arc(d))
    .attr('stroke', 'black')
  //  .lower()
}
