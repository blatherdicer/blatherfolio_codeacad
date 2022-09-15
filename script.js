// Add stars to welcome screen

const introSection = document.getElementById("introduction");
const minStarSize = 10;
const starSizeRange = 20;
const numOfStars = 250;
const starWrapper = document.getElementById('intro-star-wrapper');

for (let i = 0; i < numOfStars; i++) {
  let starSize = Math.floor(Math.random()*starSizeRange + minStarSize);
  let starX = Math.floor(Math.random()*100);
  let starY = Math.floor(Math.random()*100);
  let starPara = document.createElement('p');
  starPara.className = 'star';
  starPara.style.color = '#FFFFFF';
  starPara.style.fontSize=`${starSize}px`;
  starPara.style.position='absolute';
  starPara.style.top = `${starX}%`;
  starPara.style.left = `${starY}%`;
  starPara.innerHTML="<p>.</p>"
  starWrapper.appendChild(starPara);
}

// Implement star fading on scroll down
const checkpoint = window.innerHeight;
const starDimmer = (e) => {
  const stars = document.getElementById('intro-star-wrapper');
  const currentScroll = document.getElementsByTagName('main')[0].scrollTop;
  if (currentScroll <= checkpoint) {
    opacity = 1 - currentScroll / checkpoint;
  } else {
    opacity = 0;
  }
    if (stars.style.opacity !== opacity) {stars.style.opacity = opacity};
}

document.getElementsByTagName('main')[0].addEventListener('scroll',starDimmer);

// Implement project fading
const projDimmer = (e) => {
  const projects = document.getElementById('my-work__projects');
  const currentScroll = projects.scrollLeft;
  console.log(`Window: ${window.innerWidth}, Scroll position: ${currentScroll}, proportion: ${currentScroll/window.innerWidth}`);
}

document.getElementById('my-work__projects').addEventListener('scroll',projDimmer);

