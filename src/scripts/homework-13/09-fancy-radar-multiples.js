import * as d3 from 'd3'

const margin = { top: 20, left: 0, right: 0, bottom: 0 }
const height = 450 - margin.top - margin.bottom
const width = 400 - margin.left - margin.right

const svg = d3
  .select('#chart-9')
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

const bands = [0.2, 0.4, 0.6, 0.8, 1]

const circleScale = d3
  .scalePoint()
  .range([-width / 2, width / 2])
  .padding(0.2)

function ready(datapoints) {
  const maxMinutes = 60
  const maxPoints = 30
  const maxFG = 10
  const maxthreePoint = 5
  const maxfreeThrows = 10
  const maxRebounds = 15
  const maxAssists = 10
  const maxSteals = 5
  const maxBlocks = 5

  const line = d3
    .radialLine()
    .angle(d => angleScale(d.name))
    .radius(d => radiusScale(+d.value))

  svg
    .selectAll('.player-data')
    .data(datapoints)
    .enter()
    .append('g')
    .attr('transform', function(d) {
      console.log(d, 'data')
      return `translate(${circleScale(d.Name)},0)`
    })
    .each(function(d) {
      const container = d3.select(this)
      container
        .append('circle')
        .attr('r', 3)
        .attr('fill', 'black')

      const player = d

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
    })
}
