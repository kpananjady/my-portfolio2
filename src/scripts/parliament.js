import * as d3 from 'd3'
import d3Tip from 'd3-tip'
d3.tip = d3Tip

var w = 500,
    h = 300,
    d = Math.min(w,h*1.5),
    r0 = d * 0.2,
    r1 = d * 0.45,
    cx = w * 0.4,
    cy = d * 0.5,
    dots = 545,
    rows = 12,
    radii = d3.range(rows).map(function(i) { return r0 + i * ((r1 - r0) / rows); }),
    phi = Math.PI * 1.1,
    total_l = 0;

radii.forEach(function(r) { total_l += phi * r; });

var dot_l = total_l / dots;

var color = 'red';

var svg = d3.select('#chart-3')
    .append('svg')
    .attr('height', h)
    .attr('width', w)
    .append('g').attr('transform', 'translate('+cx+','+cy+')');

var dots_total = 0;

radii.forEach(function(r, i) {
  var dot_cnt = i == radii.length-1 ? dots - dots_total : Math.round(phi * r / total_l * dots),
      arc = Arc(r);
  svg.append('g').attr('class', 'row')
    .selectAll('circle')
    .data(d3.range(0,1.000001, 1/dot_cnt))
    .enter().append('circle')
    .attr('transform', function(t) {
        // console.log(t)
        // console.log(arc(t))
      return 'translate('+arc(t)+')';
    })
    .attr('r', Math.min(dot_l*0.5-1, (r1-r0)/rows*0.5-1 ))
    .attr('fill','black')
    .attr('opacity', 0.5)
  dots_total += dot_cnt;
})

d3.select('#crimes').on('stepin', function() {
    svg.selectAll('circle')
    .transition()
    .ease(d3.easeCircle)
    .attr('fill',function(t){
        // console.log('--')
        // console.log(p)
        if (t > 0.30){
            return 'black'
        } else {    
        return 'red'
        }
    })
    .attr('opacity', 0.5)

  })

  d3.select('#rapists').on('stepin', function() {
    svg.selectAll('circle')
    .transition()
    .ease(d3.easeCircle)
    .attr('fill',function(t){
        // console.log('--')
        // console.log(p)
        if (t > 0.03){
            return 'black'
        } else {    
        return 'red'
        }
    })
    .attr('opacity', 0.5)

  })

  d3.select('#women').on('stepin', function() {
    svg.selectAll('circle')
    .transition()
    .ease(d3.easeElastic)
    .attr('fill',function(t){
        // console.log('--')
        // console.log(p)
        if (t > 0.14){
            return 'black'
        } else {    
        return 'red'
        }
    })
    .attr('opacity', 0.5)

  })


  d3.select('#parties2').on('stepin', function() {
    svg.selectAll('circle')
    .transition()
    .ease(d3.easeElastic)
    .attr('fill',function(t){
        // console.log('--')
        // console.log(p)
        if (t >= 0.82) {
            return 'purple'
        } 
        if (t >= 0.62 && t <= 0.82) {
            return 'blue'
        } if (t < 0.62) {    
        return 'orange'
        }
    })
    .attr('opacity', 0.5)

  })

  d3.select('#parties1').on('stepin', function() {
    svg.selectAll('circle')
    .transition()
    .ease(d3.easeElastic)
    .duration(2000)
    .attr('fill','black')
    .attr('opacity', 0.5)

  })
/* // preview arcs
svg.selectAll('.arc').data(radii)
    .enter().append('path')
    .attr('d', function(r) {
      var arc = Arc(r),
          p0 = arc(0),
          p1 = arc(1);
      return 'M'+p0+'A'+[r,r]+' 0 '+(phi > Math.PI ? 1 : 0)+',1 '+p1;
    });
// */
function Arc(r) {
  return function(t) {
    var p = t * phi - Math.PI * 0.5 - phi * 0.5;
    // console.log(p)
    if (p > 0){
        color = 'black'
    } else {
        color = 'yellow'
    }
    return [Math.cos(p) * r, Math.sin(p) * r];
  };
}

