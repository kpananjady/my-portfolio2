import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip



var margin = { top: 0, left: 20, right: 0, bottom: 0 }
const height = 500 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right


const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

 
                
                svg.append("rect").attr("width",315).attr("height",500).attr("x",0).attr("y",90).attr('fill', '#fff1e0')
            

                svg.append("defs")
                .append("g")
                .attr("id","iconCustom")
                .append("path")
                .attr('d',"M166.63,305.22c-2,0-2.39-1-.77-2.14l1.09-1.69c3.53-5.47,2.4-13.09-2.51-17s-11.75-2.68-15.28,2.8-2.4,13.09,2.51,17l.5.4c.58.35-.62.63-2.68.63s-3.75,4.5-3.75,10v7.43c0,5.5,1.12,10,2.48,10s2.47,2.72,2.47,6.05,1.51,6.06,3.37,6.06,3.37-2.73,3.37-6.06.33-6.05.74-6.05.75,2.72.75,6.05,1.51,6.06,3.35,6.06,3.36-2.73,3.36-6.06,1.07-6.05,2.37-6.05,2.37-4.5,2.37-10v-7.43C170.37,309.72,168.69,305.22,166.63,305.22Z" )



                
            //specify the number of columns and rows for pictogram layout
            var numCols = 9;
            var numRows = 6;
            
            //padding for the grid
            var xPadding =0;
            var yPadding = 0;
            
            //horizontal and vertical spacing between the icons
            var hBuffer = 80;
            var wBuffer = 30;
            
            //generate a d3 range for the total number of required elements
            var myIndex=d3.range(numCols*numRows);

            const xPositionScale = d3
            .scaleLinear()
            .domain([0, 300])
            .range([-10, width])
          
          const yPositionScale = d3
            .scaleLinear()
            .domain([0, 120])
            .range([height, 0])
            var trianglePoints = xPositionScale(0) + ' ' + yPositionScale(100) +' ' + xPositionScale(145) + ' ' + yPositionScale(100) + ' ' + xPositionScale(70) + ' ' + yPositionScale(120) + ' ' + xPositionScale(0) + ' ' + yPositionScale(100);

            console.log(trianglePoints);

svg.append('polyline')
    .attr('points', trianglePoints)
    .style('stroke', '#8B0000')
    .style('fill', '#8B0000')


       

            //create group element and create an svg <use> element for each icon
            svg
                .selectAll("use")
                .data(myIndex)
                .enter()
                .append("use")
                    .attr("xlink:href","#iconCustom")
                    .attr("id",function(d)    {
                        return "icon"+d;
                    })
                    .attr("x",function(d) {

                        
                        var remainder=d % numCols;//calculates the x position (column number) using modulus
                        return xPadding+(remainder*wBuffer)-120;//apply the buffer and return value
                    })
                      .attr("y",function(d) {
                        
                        var whole=Math.floor(d/numCols)//calculates the y position (row number)
                        return yPadding+(whole*hBuffer)-180;//apply the buffer and return the value
                    })
                    .classed("iconPlain",true)
                    .attr("class",function(d,i){
                        if (d<17)  {
                            return "iconSelected";
                        }    else    {
                            return "iconPlain";
                        }
                    })

                    svg.append("text")
                    .attr("id","txtValue")
                    .attr("x",90)
                    .attr("y",70)
                    .attr('font-size', '15px').attr('font-weight', 5)
                    .text('234 kids in 2011-12')

                    svg.append("text")
                    .attr("id","txtValue2")
                    .attr("x",110)
                    .attr("y",50)
                    .attr('font-size', '15px').attr('font-weight', 5)
                    .text('Hotels/Motels')
                     

svg.append('rect').attr('x', 350).attr('y', (height-100)/2+120).attr('height', (height-100)/2-10)




// var sankey = Sankey()

const sankey = function() {
  const sankey = {}
  let nodeWidth = 24
  let nodePadding = 8
  let size = [1, 1]
  let nodes = []
  let links = []

  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth
    nodeWidth = +_
    return sankey
  }

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding
    nodePadding = +_
    return sankey
  }

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes
    nodes = _
    return sankey
  }

  sankey.links = function(_) {
    if (!arguments.length) return links
    links = _
    return sankey
  }

  sankey.size = function(_) {
    if (!arguments.length) return size
    size = _
    return sankey
  }

  sankey.layout = function(iterations) {
    computeNodeLinks()
    computeNodeValues()
    computeNodeBreadths()
    computeNodeDepths(iterations)
    computeLinkDepths()
    return sankey
  }

  sankey.relayout = function() {
    computeLinkDepths()
    return sankey
  }

  sankey.link = function() {
    let curvature = 0.5

    function link(d) {
      const x0 = d.source.x + d.source.dx
      const x1 = d.target.x
      const xi = d3.interpolateNumber(x0, x1)
      const x2 = xi(curvature)
      const x3 = xi(1 - curvature)
      const y0 = d.source.y + d.sy + d.dy / 2
      const y1 = d.target.y + d.ty + d.dy / 2
      return (
        'M' +
        x0 +
        ',' +
        y0 +
        'C' +
        x2 +
        ',' +
        y0 +
        ' ' +
        x3 +
        ',' +
        y1 +
        ' ' +
        x1 +
        ',' +
        y1
      )
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature
      curvature = +_
      return link
    }

    return link
  }

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    nodes.forEach(function(node) {
      node.sourceLinks = []
      node.targetLinks = []
    })
    links.forEach(function(link) {
      let source = link.source
      let target = link.target
      if (typeof source === 'number') source = link.source = nodes[link.source]
      if (typeof target === 'number') target = link.target = nodes[link.target]
      source.sourceLinks.push(link)
      target.targetLinks.push(link)
    })
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      )
    })
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    let remainingNodes = nodes
    let nextNodes
    let x = 0

    while (remainingNodes.length) {
      nextNodes = []
      remainingNodes.forEach(function(node) {
        node.x = x
        node.dx = nodeWidth
        node.sourceLinks.forEach(function(link) {
          if (nextNodes.indexOf(link.target) < 0) {
            nextNodes.push(link.target)
          }
        })
      })
      remainingNodes = nextNodes
      ++x
    }

    //
    moveSinksRight(x)
    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1))
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x =
          d3.min(node.sourceLinks, function(d) {
            return d.target.x
          }) - 1
      }
    })
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1
      }
    })
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function(node) {
      node.x *= kx
    })
  }

  function computeNodeDepths(iterations) {
    const nodesByBreadth = d3
      .nest()
      .key(function(d) {
        return d.x
      })
      .sortKeys(d3.ascending)
      .entries(nodes)
      .map(function(d) {
        return d.values
      })

    //
    initializeNodeDepth()
    resolveCollisions()
    for (let alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft((alpha *= 0.99))
      resolveCollisions()
      relaxLeftToRight(alpha)
      resolveCollisions()
    }

    function initializeNodeDepth() {
      const ky = d3.min(nodesByBreadth, function(nodes) {
        return (
          (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value)
        )
      })

      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          console.log(node, i, 'values')
          node.y = i
          node.dy = node.value * ky
        })
      })

      links.forEach(function(link) {
        link.dy = link.value * ky
      })
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function(nodes, breadth) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            const y =
              d3.sum(node.targetLinks, weightedSource) /
              d3.sum(node.targetLinks, value)
            node.y += (y - center(node)) * alpha
          }
        })
      })

      function weightedSource(link) {
        return center(link.source) * link.value
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth
        .slice()
        .reverse()
        .forEach(function(nodes) {
          nodes.forEach(function(node) {
            if (node.sourceLinks.length) {
              const y =
                d3.sum(node.sourceLinks, weightedTarget) /
                d3.sum(node.sourceLinks, value)
              node.y += (y - center(node)) * alpha
            }
          })
        })

      function weightedTarget(link) {
        return center(link.target) * link.value
      }
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function(nodes) {
        let node
        let dy
        let y0 = 0
        const n = nodes.length
        let i

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth)
        for (i = 0; i < n; ++i) {
          node = nodes[i]
          dy = y0 - node.y
          if (dy > 0) node.y += dy
          y0 = node.y + node.dy + nodePadding
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1]
        if (dy > 0) {
          y0 = node.y -= dy

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i]
            dy = node.y + node.dy + nodePadding - y0
            if (dy > 0) node.y -= dy
            y0 = node.y
          }
        }
      })
    }

    function ascendingDepth(a, b) {
      return a.y - b.y
    }
  }

  function computeLinkDepths() {
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth)
      node.targetLinks.sort(ascendingSourceDepth)
    })
    nodes.forEach(function(node) {
      let sy = 0
      let ty = 0
      node.sourceLinks.forEach(function(link) {
        link.sy = sy
        sy += link.dy
      })
      node.targetLinks.forEach(function(link) {
        link.ty = ty
        ty += link.dy
      })
    })

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y
    }
  }

  function center(node) {
    return node.y + node.dy / 2
  }

  function value(link) {
    return link.value
  }

  return sankey
}


const sankey1 = sankey()
  .nodeWidth(36)
  .nodePadding(20)
  .size([width/2-170, (height-100)/2 -50])

console.log(sankey1)
console.log(sankey1.nodePadding())

Promise.all([
    d3.json(require('/data/dummydata.json')),
    d3.json(require('/data/dummydata3.json')),
    d3.csv(require('/data/homeless.csv'))
  ])
  .then(ready)
  .catch(err => console.log('Failed on', err))

  
function ready([datapoints, datapoints2, datapoints3]) {
  sankey1
    .nodes(datapoints.nodes)
    .links(datapoints.links)
    .layout(1)

  console.log(sankey1)
  console.log(sankey1.links(), 'links')

  const link = svg
    .append('g')
    .attr('transform', 'translate(' + 330+ ',' +320 + ')')

    .selectAll('.link')
    .data(datapoints.links)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', sankey1.link())
    .style('stroke-width', function(d) {
      return Math.max(1, d.dy)
    })
    .sort(function(a, b) {
      return b.dy - a.dy
    })


  const node = svg
    .append('g')
    .attr('transform', 'translate(' + 330+ ',' +320 + ')')

    .selectAll('.node')
    .data(datapoints.nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function(d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    })
    .call(
      d3
        .drag()
        .subject(function(d) {
          return d
        })
        .on('start', function() {
          this.parentNode.appendChild(this)
        })
        .on('drag', dragmove)
    )

  node
    // .selectAll('rect')
    // .data(datapoints.nodes)
    .append('rect')
    .attr('height', function(d) {
      // return d.dy
      return d.dy
    })
    .attr('width', sankey1.nodeWidth())
    .style('fill', function(d) {
      return d.color;
    })
    // Add hover text
    .append('title')
    .text(function(d) {
      return d.name + '\n' + '' + d.value + '%'
    })
    .attr('opacity', 0.2)

  // add in the title for the nodes
  node
    .append('text')
    .attr('x', -6)
    .attr('y', function(d) {
      return d.dy / 2
    })
    .attr('dy', '.35em')
    .attr('class','textCat')
    .attr('text-anchor', 'end')
    .attr('transform', null)
    .text(function(d) {
      return d.name
    })
    .filter(function(d) {
      return d.x < width / 2
    })
    .attr('x', 6 + sankey1.nodeWidth())
    .attr('text-anchor', 'start')
    .attr('fill', 'black')
    .attr('font-size', '10px').attr('font-weight', 5)

  function dragmove(d) {
    d3.select(this).attr(
      'transform',
      'translate(' +
        // (d.x = Math.max(0, Math.min(width - d.dy, d3.event.y))) +
        d.x +
        ',' +
        (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) +
        ')'
    )
    sankey1.relayout()
    link.attr('d', sankey1.link())
  }


var chart = svg
    .append('g')
    .attr('transform', 'translate(' + 330+ ',' +100 + ')')
    .append('rect').attr('x', 0).attr('y', 0).attr('height', (height-100)/2-10).attr('width', width/2-60).attr('fill', 'white').attr('id', 'where')


    console.log(chart.node().getBBox().x )

const xPositionScale = d3
  .scaleLinear()
  .range([370, width-100])

const yPositionScale = d3
  .scaleLinear()  .range([height/2,110])

  const line = d3
  .line()
  .x(function(d) {
    return xPositionScale(d['Year'])
  })
  .y(function(d) {
    return yPositionScale(d['Pop'])
  })

  xPositionScale.domain(d3.extent(datapoints3, function(d) { return d['Year'] }));
  yPositionScale.domain([0,6000])


  svg.append('circle') .attr('class', 'circle-points')
  .attr('r', 5)
  .attr('cx', d => xPositionScale(2011))
  .attr('cy', d => yPositionScale(2804))
  .style('fill', '#8B0000')  .attr('opacity', 0.55)




  const yAxis = d3.axisLeft(yPositionScale).ticks(4)      .tickSize(-chart.node().getBBox().width+50)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .attr('transform', 'translate(' + 360+ ',' +0 + ')')

    .attr('color', 'grey')

    .call(yAxis)

  var xAxis = d3.axisBottom(xPositionScale).ticks(9).tickFormat(d3.format("d"))
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(' + 0+ ',' + (height/2) + ')')
    .attr('color', 'grey')
		.call(xAxis)
		.selectAll("text")	
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", function(d) {
				return "rotate(-35)" 
                });
                

                d3.select('.y-axis .domain').remove()
  
                d3.select('.x-axis .domain').remove()
            
                svg.append('text').attr('x', 330).attr('y', 90).text("CT's child homeless population").attr('font-size', '12px').attr('font-weight', 5).attr('id', 'label')
            
                function render() {
                    const svgContainer = svg.node().closest('div')
                    const svgWidth = svgContainer.offsetWidth
                    // Do you want it to be full height? Pick one of the two below
                    // margin = { top: 100, left: 100, right: 50, bottom: 50 }
            
                    const svgHeight = height + margin.top + margin.bottom
                    // const svgHeight = window.innerHeight
                
                    const actualSvg = d3.select(svg.node().closest('svg'))
                    actualSvg.attr('width', svgWidth).attr('height', svgHeight)
                
                    const newWidth = svgWidth - margin.left - margin.right
                    const newHeight = svgHeight - margin.top - margin.bottom
            
                    d3.select('#toggle').on('click', () => {

                        svg.transition().duration(0).selectAll('.link').remove()
                        svg.transition().duration(0).selectAll('.node').remove()
                    
                        sankey1
                    .nodes(datapoints2.nodes)
                    .links(datapoints2.links)
                    .layout(1)
                    
                    console.log(sankey1)
                    console.log(sankey1.links(), 'links')
                    
                    const link = svg
                    .append('g')
                    .attr('transform', 'translate(' + 330+ ',' +320 + ')')
                    .selectAll('.link')
                    .data(datapoints2.links)
                    .enter()
                    .append('path')
                    .attr('class', 'link')
                    .attr('d', sankey1.link())
                    .style('stroke-width', function(d) {
                      return Math.max(1, d.dy)
                    })
                    .sort(function(a, b) {
                      return b.dy - a.dy
                    })
                    
                    const node = svg
                    .append('g')
                    .attr('transform', 'translate(' + 330+ ',' +320 + ')')
                    .selectAll('.node')
                    .data(datapoints2.nodes)
                    .enter()
                    .append('g')
                    .attr('class', 'node')
                    .attr('transform', function(d) {
                      return 'translate(' + d.x + ',' + d.y + ')'
                    })
                    .call(
                      d3
                        .drag()
                        .subject(function(d) {
                          return d
                        })
                        .on('start', function() {
                          this.parentNode.appendChild(this)
                        })
                        .on('drag', dragmove)
                    )
                    
                    node
                    // .selectAll('rect')
                    // .data(datapoints.nodes)
                    .append('rect')
                    .attr('height', function(d) {
                      // return d.dy
                      return d.dy
                    })
                    .attr('width', sankey1.nodeWidth())
                    .style('fill', function(d) {
                      return d.color;
                    })
                    // Add hover text
                    .append('title')
                    .text(function(d) {
                      return d.name + '\n' + '' + d.value + '%'
                    })
                    .attr('opacity', 0.2)
                    
                    // add in the title for the nodes
                    node
                    .append('text')
                    .attr('x', -6)
                    .attr('y', function(d) {
                      return d.dy / 2
                    })
                    .attr('dy', '.35em')
                    .attr('class','textCat')
                    .attr('text-anchor', 'start')
                    .attr('transform', null)
                    .text(function(d) {
                      return d.name
                    })
                    .filter(function(d) {
                      return d.x < width / 2
                    })
                    .attr('x', 6 + sankey1.nodeWidth())
                    .attr('text-anchor', 'start')
                    .attr('fill', 'black')
                    .attr('font-size', '10px').attr('font-weight', 5)
                    
                    function dragmove(d) {
                    d3.select(this).attr(
                      'transform',
                      'translate(' +
                        // (d.x = Math.max(0, Math.min(width - d.dy, d3.event.y))) +
                        d.x +
                        ',' +
                        (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) +
                        ')'
                    )
                    sankey1.relayout()
                    link.attr('d', sankey1.link())
                    }
                    
                    
                        svg.select("#txtValue")
                        .transition()
                        .duration(1000)
                        .ease(d3.easeElastic)
                        .text('568 kids in 2019-20');
                    
                    
                        svg.select("#txtValue2")
                        .transition()
                        .duration(1000)
                        .ease(d3.easeElastic)
                        .text('Hotels/Motels')
                         
                    
                        d3.selectAll("use")
                        .transition().duration(1000)
                        .ease(d3.easeBounce)
                        .attr("class",function(d,i){
                            if (d<40)  {
                                return "iconSelected";
                            }    else    {
                                return "iconPlain";
                            }
                        });
                    
                    
                        svg.append('path')
                      .datum(datapoints3)
                      .attr('class', 'path_next')
                      .attr('d', function(d) {
                          return line(d)
                      })
                      .attr('stroke', '#ffc17b')
                      .attr('stroke-width', 2)
                      .attr('fill', 'none')
                      .attr('opacity',0.5)
                     
                    
                    
                    svg
                      .selectAll('circle-points')
                      .data(datapoints3)
                      .enter()
                      .append('circle')
                      .attr('class', 'circle-points')
                      .attr('r', 5)
                      .attr('cx', d => xPositionScale(d['Year']))
                      .attr('cy', d => yPositionScale( d['Pop']))
                      .style('fill', '#8B0000')  .attr('opacity', 0.55)
                    })

                    console.log(newWidth)
                    if (newWidth < 590){
                        console.log('here')
                        svg.transition().duration(0).selectAll('.link').remove()
                        svg.transition().duration(0).selectAll('.node').remove()

                        svg.selectAll('.circle-points').remove()
                        svg.select('.path_next').remove()
                        svg.select('.x-axis').remove()
                        svg.select('.y-axis').remove()
                        svg.select('#label').remove()



                    }
                }
                window.addEventListener('resize', render)
            
                // And now that the page has loaded, let's just try
                // to do it once before the page has resized
                render()
            }
