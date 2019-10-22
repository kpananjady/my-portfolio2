import * as d3 from 'd3'

const margin = { top: 20, left: 0, right: 0, bottom: 0 }
const height = 450 - margin.top - margin.bottom
const width = 400 - margin.left - margin.right

const svg = d3
  .select('#chart-8')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`)

d3.csv(require('/data/nba.csv'))
  .then(ready)
  .catch(err => console.log('Failed with', err))

const categories = [
  'MP',
  'PTS',
  'FG',
  'three_p',
  'FT',
  'TRB',
  'AST',
  'STL',
  'BLK'
]
const radius = 150

const angleScale = d3
  .scaleBand()
  .domain(categories)
  .range([0, Math.PI * 2])

const radiusScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([0, radius])

function ready(datapoints) {
  const player = datapoints[0]
  console.log(player, 'player')

  const line = d3
    .radialLine()
    .angle(d => angleScale(d.name))
    .radius(d => radiusScale(+d.value))

  //  console.log(customDatapoints, 'datapoints')

  const bands = [0.2, 0.4, 0.6, 0.8, 1]

  const maxMinutes = 60
  const maxPoints = 30
  const maxFG = 10
  const maxthreePoint = 5
  const maxfreeThrows = 10
  const maxRebounds = 15
  const maxAssists = 10
  const maxSteals = 5
  const maxBlocks = 5

  const customDatapoints = [
    { name: 'MP', value: +player.MP / maxMinutes },
    { name: 'PTS', value: +player.PTS / maxPoints },
    { name: 'FG', value: +player.FG / maxFG },
    { name: 'three_p', value: +player.three_P / maxthreePoint },
    { name: 'FT', value: +player.FT / maxfreeThrows },
    { name: 'TRB', value: +player.TRB / maxRebounds },
    { name: 'AST', value: +player.AST / maxAssists },
    { name: 'STL', value: +player.STL / maxSteals },
    { name: 'BLK', value: +player.BLK / maxBlocks },
    { name: 'MP', value: +player.MP / maxMinutes }
  ]
  console.log(customDatapoints, 'LeBron')
  console.log(customDatapoints.name, 'names')

  svg
    .append('g')
    .attr('mask', 'url(#myMask)')
    .selectAll('.band')
    .data(bands)
    .enter()
    .append('circle')
    .attr('fill', 'none')
    .attr('stroke', 'lightgrey')
    .attr('r', function(d) {
      return radiusScale(d)
    })
    .attr('fill', (d, i) => {
      if (i % 2 === 0) {
        return '#c94435'
      } else {
        return '#FFB81C'
      }
    })
    .lower()

  svg
    .append('mask')
    .attr('id', 'myMask')
    .append('path')
    .datum(customDatapoints)
    .attr('d', line)
    .attr('stroke', 'black')
    .attr('fill', 'white')

  svg

    .selectAll('.bands')
    .data(bands)
    .enter()
    .append('circle')
    .attr('fill', 'none')
    .attr('stroke', 'lightgrey')
    .attr('r', function(d) {
      return radiusScale(d)
    })
    .attr('fill', (d, i) => {
      if (i % 2 === 0) {
        return '#e8e7e5'
      } else {
        return '#f6f6f6'
      }
    })
    .lower()

  svg
    .selectAll('.label')
    .data(customDatapoints)
    .enter()
    .append('text')
    .text(d => d.name)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale(d.name)}rad)`
    })
    .attr('y', -radius - 10)

  svg
    .selectAll('.ticks')
    .data(bands)
    .enter()
    .append('text')
    .text(d => d * maxMinutes)
    .attr('x', 0)
    .attr('y', function(d) {
      return -radiusScale(d)
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')

  svg
    .selectAll('.ticks')
    .data(bands)
    .enter()
    .append('text')
    .text(d => d * maxPoints)
    .attr('x', 0)
    .attr('y', function(d) {
      return -radiusScale(d)
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('PTS')}rad)`
    })

  svg
    .selectAll('.ticks')
    .data(bands)
    .enter()
    .append('text')
    .text(d => d * maxFG)
    .attr('x', 0)
    .attr('y', function(d) {
      return -radiusScale(d)
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('FG')}rad)`
    })

  svg
    .selectAll('.ticks')
    .data(bands)
    .enter()
    .append('text')
    .text(d => d * maxFG)
    .attr('x', 0)
    .attr('y', function(d) {
      return -radiusScale(d)
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('FG')}rad)`
    })

  svg
    .selectAll('.ticks')
    .data(bands)
    .enter()
    .append('text')
    .text(d => d * maxthreePoint)
    .attr('x', 0)
    .attr('y', function(d) {
      return -radiusScale(d)
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('three_p')}rad)`
    })

  svg
    .selectAll('.ticks')
    .data(bands)
    .enter()
    .append('text')
    .text(d => d * maxfreeThrows)
    .attr('x', 0)
    .attr('y', function(d) {
      return -radiusScale(d)
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('FT')}rad)`
    })

  svg
    .selectAll('.ticks')
    .data(bands)
    .enter()
    .append('text')
    .text(d => d * maxRebounds)
    .attr('x', 0)
    .attr('y', function(d) {
      return -radiusScale(d)
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('TRB')}rad)`
    })

  svg
    .selectAll('.ticks')
    .data(bands)
    .enter()
    .append('text')
    .text(d => d * maxAssists)
    .attr('x', 0)
    .attr('y', function(d) {
      return -radiusScale(d)
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('AST')}rad)`
    })

  svg
    .selectAll('.ticks')
    .data(bands)
    .enter()
    .append('text')
    .text(d => d * maxSteals)
    .attr('x', 0)
    .attr('y', function(d) {
      return -radiusScale(d)
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('STL')}rad)`
    })

  svg
    .selectAll('.ticks')
    .data(bands)
    .enter()
    .append('text')
    .text(d => d * maxBlocks)
    .attr('x', 0)
    .attr('y', function(d) {
      return -radiusScale(d)
    })
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('transform', function(d) {
      console.log(angleScale(d))
      return `rotate(${angleScale('BLK')}rad)`
    })

  svg
    .append('text')
    .text(0)
    .attr('x', 0)
    .attr('y', 0)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')

  svg
    .append('text')
    .text('LeBron James')
    .attr('x', 0)
    .attr('y', -200)
    .attr('text-anchor', 'middle')
    .style('font-size', '18px')
    .attr('alignment-baseline', 'middle')

  svg
    .append('text')
    .text('Cleveland Cavaliers')
    .attr('x', 0)
    .attr('y', -180)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
}
