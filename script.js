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
const panelCount = 6;
const panelSize = 0.67;
const panelDivs = [];
for (let i = 0; i <= (panelCount + 1); i++){
  panelDivs[i]=document.getElementById('p'+i);
};

function calcPanelOpacity (scrollx, panelNum, winWidth, panelWidth = 0.67) {
  const currScrollPt = (scrollx / winWidth) + panelWidth;
  const panelScrollPoint = panelNum * panelWidth;
  const fadeOffset = Math.abs(currScrollPt - panelScrollPoint);
  let projOpacity = 1-(fadeOffset / panelWidth / 1.5 );
  return (projOpacity < 0) ? 0 : projOpacity;
}

const projDimmer = () => {
  const projects = document.getElementById('my-work__projects');
  let currentScroll = projects.scrollLeft;
  let projectsWidth = window.innerWidth; // subtract any padding

  let currentProj = Math.round(currentScroll/window.innerWidth / panelSize)+1;
  
  // console.log(`currentProj: ${currentProj}, currentScroll: ${currentScroll}, opacity ${calcPanelOpacity(currentScroll, currentProj, projectsWidth)},`)

  panelDivs[currentProj-1].style.opacity = calcPanelOpacity(currentScroll, currentProj-1, projectsWidth);
  panelDivs[currentProj].style.opacity = calcPanelOpacity(currentScroll, currentProj, projectsWidth);
  panelDivs[currentProj+1].style.opacity = calcPanelOpacity(currentScroll, currentProj+1, projectsWidth);;
}

document.getElementById('my-work__projects').addEventListener('scroll',projDimmer);

// Set initial dimming levels
projDimmer();
