// Scroll To Top
var toTopButton = document.getElementById('to-top');
window.onscroll = function() { detectScroll() };
function detectScroll() {
  var screenHeight = document.documentElement.clientHeight;
  var screenWidth = document.documentElement.clientWidth;
  // batas scroll versi mobile
  var threshold =  screenHeight * 30 / 100;
  // batas scroll versi desktop & tablet
  if (screenWidth > 768) {
    threshold =  screenHeight * 75 / 100;
  }
  if (document.body.scrollTop > threshold || document.documentElement.scrollTop > threshold) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Dynamic Year
var nows = document.getElementsByClassName('now');
for (let el = 0; el < nows.length; el++) {
  nows[el].innerHTML = new Date().getFullYear();
}

// Carousel
var carousel = document.querySelector('.carousel');
var carouselContent = document.querySelector('.carousel-content');
var slides = document.querySelectorAll('.slide');
var arrayOfSlides = Array.prototype.slice.call(slides);
var carouselDisplaying;
var screenSize;
setScreenSize();
var lengthOfSlide;
function addClone() {
   var lastSlide = carouselContent.lastElementChild.cloneNode(true);
   lastSlide.style.left = (-lengthOfSlide) + "px";
   carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
}
function removeClone() {
  var firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
}
function moveSlidesRight() {
  var slides = document.querySelectorAll('.slide');
  var slidesArray = Array.prototype.slice.call(slides);
  var width = 0;
  slidesArray.forEach(function(el, i){
    el.style.left = width + "px";
    width += lengthOfSlide;
  });
  addClone();
}
moveSlidesRight();
function moveSlidesLeft() {
  var slides = document.querySelectorAll('.slide');
  var slidesArray = Array.prototype.slice.call(slides);
  slidesArray = slidesArray.reverse();
  var maxWidth = (slidesArray.length - 1) * lengthOfSlide;
  slidesArray.forEach(function(el, i){
    maxWidth -= lengthOfSlide;
    el.style.left = maxWidth + "px";
  });
}
window.addEventListener('resize', setScreenSize);
function setScreenSize() {
  if ( window.innerWidth >= 769 ) {
    carouselDisplaying = 3;
  } else {
    carouselDisplaying = 1;
  }
  getScreenSize();
}
function getScreenSize() {
  var slides = document.querySelectorAll('.slide');
  var slidesArray = Array.prototype.slice.call(slides);
  lengthOfSlide = ( carousel.offsetWidth  / carouselDisplaying );
  var initialWidth = -lengthOfSlide;
  slidesArray.forEach(function(el) {
    el.style.width = lengthOfSlide + "px";
    el.style.left = initialWidth + "px";
    initialWidth += lengthOfSlide;
  });
}
var rightNav = document.querySelector('.nav-right');
rightNav.addEventListener('click', moveLeft);
var moving = true;
function moveRight() {
  if ( moving ) {
    moving = false;
    var lastSlide = carouselContent.lastElementChild;
    lastSlide.parentNode.removeChild(lastSlide);
    carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
    removeClone();
    var firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener('transitionend', activateAgain);
    moveSlidesRight();
  }
}
function activateAgain() {
  var firstSlide = carouselContent.firstElementChild;
  moving = true;
  firstSlide.removeEventListener('transitionend', activateAgain);
}
var leftNav = document.querySelector('.nav-left');
leftNav.addEventListener('click', moveRight);
function moveLeft() {
  if ( moving ) {
    moving = false;
    removeClone();
    var firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener('transitionend', replaceToEnd);
    moveSlidesLeft();
  }
}
function replaceToEnd() {
  var firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
  carouselContent.appendChild(firstSlide);
  firstSlide.style.left = ( (arrayOfSlides.length -1) * lengthOfSlide) + "px";
  addClone();
  moving = true;
  firstSlide.removeEventListener('transitionend', replaceToEnd);
}
carouselContent.addEventListener('mousedown', seeMovement);
var initialX;
var initialPos;
function seeMovement(e) {
  initialX = e.clientX;
  getInitialPos();
  carouselContent.addEventListener('mousemove', slightMove);
  document.addEventListener('mouseup', moveBasedOnMouse);
}
function slightMove(e) {
  if ( moving ) {
    var movingX = e.clientX;
    var difference = initialX - movingX;
    if ( Math.abs(difference) < (lengthOfSlide/4) ) {
      slightMoveSlides(difference);
    }  
  }
}
function getInitialPos() {
  var slides = document.querySelectorAll('.slide');
  var slidesArray = Array.prototype.slice.call(slides);
  initialPos = [];
  slidesArray.forEach(function(el){
    var left = Math.floor( parseInt( el.style.left.slice(0, -2 ) ) ); 
    initialPos.push( left );
  });
}
function slightMoveSlides(newX) {
  var slides = document.querySelectorAll('.slide');
  var slidesArray = Array.prototype.slice.call(slides);
  slidesArray.forEach(function(el, i){
    var oldLeft = initialPos[i];
    el.style.left = (oldLeft + newX) + "px";
  });
}
function moveBasedOnMouse(e) { 
  var finalX = e.clientX;
  if ( initialX - finalX > 0) {
    moveRight();
  } else if ( initialX - finalX < 0 ) {
    moveLeft();
  }
  document.removeEventListener('mouseup', moveBasedOnMouse);
  carouselContent.removeEventListener('mousemove', slightMove);
}