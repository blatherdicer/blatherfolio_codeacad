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
const stars = document.getElementById('intro-star-wrapper');
const fadePoint = window.innerHeight;
const starDimmer = (e) => {
  const currentScroll = document.getElementsByTagName('main')[0].scrollTop;
  if (currentScroll <= fadePoint) {
    opacity = 1 - currentScroll / fadePoint;
  } else {
    opacity = 0;
  }
    if (stars.style.opacity !== opacity) {stars.style.opacity = opacity};
}

document.getElementsByTagName('main')[0].addEventListener('scroll',starDimmer);

// Implement project fading
const projectCount = 6;
const projectElements = [];
for (let i = 0; i <= (projectCount + 1); i++){
  projectElements[i]=document.getElementById('p'+i);
};

const projDimmer = () => {
  const projects = document.getElementById('my-work__projects');
  const currentScroll = projects.scrollLeft;
  const projectsWidth = window.innerWidth; // subtract any padding

  let currentProj = Math.round(currentScroll/window.innerWidth / 0.67)+1;
  let projCenterPoint = (currentProj - 1) * window.innerWidth * 0.67;

  console.log(`currentProj: ${currentProj}, currentScroll: ${currentScroll}, projCenterPoint ${projCenterPoint},`)

  projectElements[currentProj-1].className = 'project lolite' + ((currentProj === 1) ? ' pad' : '');
  projectElements[currentProj].className = 'project hilite';
  projectElements[currentProj+1].className = 'project lolite' + ((currentProj === projectCount) ? ' pad' : '');

  console.log(currentProj);
}

document.getElementById('my-work__projects').addEventListener('scroll',projDimmer);

// Set initial dimming levels
projDimmer();
