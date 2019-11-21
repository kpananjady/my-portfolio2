// import * as d3 from 'd3'
// import d3Tip from 'd3-tip'
// d3.tip = d3Tip

// <div class="scene">
//   <div class="carousel">
//     <div class="carousel__cell">1</div>
//     <div class="carousel__cell">2</div>
//     <div class="carousel__cell">3</div>
//     <div class="carousel__cell">4</div>
//     <div class="carousel__cell">5</div>
//     <div class="carousel__cell">6</div>
//     <div class="carousel__cell">7</div>
//     <div class="carousel__cell">8</div>
//     <div class="carousel__cell">9</div>
//   </div>
// </div>
const carousel = document.querySelector('.carousel')
const cells = carousel.querySelectorAll('.carousel__cell')
let cellCount // cellCount set from cells-range input value
let selectedIndex = 0
const cellWidth = carousel.offsetWidth
const cellHeight = carousel.offsetHeight
let isHorizontal = true
let rotateFn = isHorizontal ? 'rotateY' : 'rotateX'
let radius, theta
// console.log( cellWidth, cellHeight );

function rotateCarousel() {
  const angle = theta * selectedIndex * -1
  carousel.style.transform =
    'translateZ(' + -radius + 'px) ' + rotateFn + '(' + angle + 'deg)'
}

const prevButton = document.querySelector('.previous-button')
prevButton.addEventListener('click', function() {
  selectedIndex--
  rotateCarousel()
})

const nextButton = document.querySelector('.next-button')
nextButton.addEventListener('click', function() {
  selectedIndex++
  rotateCarousel()
})

const cellsRange = document.querySelector('.cells-range')
cellsRange.addEventListener('change', changeCarousel)
cellsRange.addEventListener('input', changeCarousel)

function changeCarousel() {
  cellCount = 10
  theta = 360 / cellCount
  const cellSize = isHorizontal ? cellWidth : cellHeight
  radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellCount))
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i]
    if (i < cellCount) {
      // visible cell
      cell.style.opacity = 1
      const cellAngle = theta * i
      cell.style.transform =
        rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)'
    } else {
      // hidden cell
      cell.style.opacity = 0
      cell.style.transform = 'none'
    }
  }

  rotateCarousel()
}

const orientationRadios = document.querySelectorAll('input[name="orientation"]')
;(function() {
  for (let i = 0; i < orientationRadios.length; i++) {
    const radio = orientationRadios[i]
    radio.addEventListener('change', onOrientationChange)
  }
})()

function onOrientationChange() {
  const checkedRadio = document.querySelector(
    'input[name="orientation"]:checked'
  )
  isHorizontal = checkedRadio.value === 'horizontal'
  rotateFn = isHorizontal ? 'rotateY' : 'rotateX'
  changeCarousel()
}

// set initials
onOrientationChange()

window.onload = function() {
  document.getElementById('my_audio').play()
}
