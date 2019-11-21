import * as d3 from 'd3'
/* Hide all images on load */
const images = d3.selectAll('.image-stepper img')
images.classed('hide-image', true)

/* Show the first one */
d3.select('.image-stepper img:first-child').classed('hide-image', false)
d3.selectAll('.image-stepper .step').each(d => {
  console.log('this exists')
})
/* When you hit a step... */
d3.selectAll('.image-stepper .step').on('stepin', function() {
  // Hide all the images
  images.classed('hide-image', true)
  // Show one of the images
  const imageId = d3.select(this).attr('data-show-selector')
  d3.selectAll(imageId).classed('hide-image', false)
})
