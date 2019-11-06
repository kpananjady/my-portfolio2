import * as d3 from 'd3'

const margin = { top: 20, left: 0, right: 0, bottom: 0 }
const height = 1600 - margin.top - margin.bottom
const width = 1500 - margin.left - margin.right

const svg = d3
  .select('#chart-3')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
// .append('g')
// .attr('transform', `translate(${width / 2},${height / 2})`)

d3.csv(require('/data/class-brown-bball.csv'))
  .then(ready)
  .catch(err => console.log('Failed with', err))

const categories = ['FR', 'SO', 'JR', 'SR']
const radius = 150

const angleScale = d3
  .scaleBand()
  .domain(categories)
  .range([0, Math.PI * 2])

const radiusScale = d3
  .scaleLinear()
  .domain([0, 0.6])
  .range([0, radius])

const bands = [0.2, 0.4, 0.6]

// const names = [
//   'LeBron James',
//   'Kevin Durant',
//   'James Harden',
//   'Stephen Curry',
//   'Kawhi Leonard',
//   'Chris Paul',
//   'Anthony Davis',
//   'Giannis Antetokounmpo',
//   'Russell Westbrook',
//   'Joel Embiid',
//   'Jimmy Butler'
// ]

// .domain(names)
// .padding(0.2)

function ready(datapoints) {
  //   const maxMinutes = 60
  //   const maxPoints = 30
  //   const maxFG = 10
  //   const maxthreePoint = 5
  //   const maxfreeThrows = 10
  //   const maxRebounds = 15
  //   const maxAssists = 10
  //   const maxSteals = 5
  //   const maxBlocks = 5
  const max = 1

  svg
    .selectAll('.player-data')
    .data(datapoints)
    .enter()
    // .append('svg')
    // .attr('height', 450)
    // .attr('width', 400)
    // .append('svg')
    // .attr('height', 1000)
    // .attr('width', 1000)
    .append('g')
    // .append('g')
    //  .attr('transform', `translate(${400 / 2},${400 / 2})`)
    //  .attr('transform', function(d, i) {
    //  console.log(d, 'data')
    // console.log(d.Name, 'name')
    // console.log(circleScale(d.Name), 'circleScale')
    //     return `translate(${circleScale(d.Name)},50)`
    // })
    .each(function(d, i) {
      const container = d3.select(this)
      container.attr('transform', `translate(${200},${200})`)

      if (i === 2) {
        container.attr('transform', `translate(${900},${200})`)
      }

      if (i === 3) {
        container.attr('transform', `translate(${200},${600})`)
      }

      if (i === 4) {
        container.attr('transform', `translate(${550},${600})`)
      }

      if (i === 5) {
        container.attr('transform', `translate(${900},${600})`)
      }

      if (i === 6) {
        container.attr('transform', `translate(${200},${1000})`)
      }

      if (i === 7) {
        container.attr('transform', `translate(${550},${1000})`)
      }

      if (i === 7) {
        container.attr('transform', `translate(${900},${1000})`)
      }

      if (i === 8) {
        container.attr('transform', `translate(${200},${1400})`)
      }

      if (i === 9) {
        container.attr('transform', `translate(${550},${1400})`)
      }

      if (i === 10) {
        container.attr('transform', `translate(${900},${1400})`)
      }

      if (i === 10) {
        container.attr('transform', `translate(${900},${1400})`)
      }

      if (i === 11) {
        container.attr('transform', `translate(${550},${1000})`)
      }

      if (i === 12) {
        container.attr('transform', `translate(${900},${1400})`)
      }

      if (i === 1) {
        container.attr('transform', `translate(${550},${200})`)
      }
      const player = d

      //  const name = player.Name
      // const team = player.team

      //  console.log(name, team, 'name and team')
      const customDatapoints = [
        // { name: 'name', value: player.Name },
        // { name: 'team', value: player.Team },
        { name: 'FR', value: +player.FR / max },
        { name: 'SO', value: +player.SO / max },
        { name: 'JR', value: +player.JR / max },
        { name: 'SR', value: +player.SR / max }
      ]
      console.log(customDatapoints, 'custom')

      const line = d3
        .radialLine()
        .angle(d => angleScale(d.name))
        .radius(d => radiusScale(+d.value))

      //   const name = d.Name.replace(' ', '')
      //   const nameFinal = d.Name
      const team = d.year
      const name = d.year

      // cons
      //   console.log(nameFinal)

      const index = i

      container
        .append('g')
        .attr('mask', `url(#${name})`)
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
          if (index % 2 === 0) {
            if (i % 2 === 0) {
              return '#c94435'
            } else {
              return '#FFB81C'
            }
          } else {
            if (i % 2 === 0) {
              return '#0000ff'
            } else {
              return '#FFB81C'
            }
          }
        })
        .lower()

      container
        .append('mask')
        .attr('id', `${name}`)
        .append('path')
        .datum(customDatapoints)
        .attr('d', line)
        .attr('stroke', 'black')
        .attr('fill', 'white')

      console.log('index', index)
      container
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

      container
        .selectAll('.label')
        .data(customDatapoints)
        .enter()
        .append('text')
        .text(d => d.year)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('transform', function(d) {
          console.log(angleScale(d))
          return `rotate(${angleScale(d.year)}rad)`
        })
        .attr('y', -radius - 10)

      container
        .selectAll('.ticks')
        .data(bands)
        .enter()
        .append('text')
        .text(d => d * max)
        .attr('x', 0)
        .attr('y', function(d) {
          return -radiusScale(d)
        })
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')

      container
        .selectAll('.ticks')
        .data(bands)
        .enter()
        .append('text')
        .text(d => d * max)
        .attr('x', 0)
        .attr('y', function(d) {
          return -radiusScale(d)
        })
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('transform', function(d) {
          console.log(angleScale(d))
          return `rotate(${angleScale('FR')}rad)`
        })

      container
        .selectAll('.ticks')
        .data(bands)
        .enter()
        .append('text')
        .text(d => d * max)
        .attr('x', 0)
        .attr('y', function(d) {
          return -radiusScale(d)
        })
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('transform', function(d) {
          console.log(angleScale(d))
          return `rotate(${angleScale('SO')}rad)`
        })

      container
        .selectAll('.ticks')
        .data(bands)
        .enter()
        .append('text')
        .text(d => d * max)
        .attr('x', 0)
        .attr('y', function(d) {
          return -radiusScale(d)
        })
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('transform', function(d) {
          console.log(angleScale(d))
          return `rotate(${angleScale('JR')}rad)`
        })

      container
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
        .attr('y', -radius - 15)

      const nameFinal = d.year

      container
        .append('text')
        // .data(customDatapoints)
        //   .enter()
        .text(nameFinal)
        .attr('x', 0)
        .attr('y', -200)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .attr('alignment-baseline', 'middle')

      container
        .selectAll('.ticks')
        .data(bands)
        .enter()
        .append('text')
        .text(d => d * max)
        .attr('x', 0)
        .attr('y', function(d) {
          return -radiusScale(d)
        })
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('transform', function(d) {
          console.log(angleScale(d))
          return `rotate(${angleScale('SR')}rad)`
        })
    })
}
