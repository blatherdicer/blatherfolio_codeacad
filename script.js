// Add a starfield to welcome screen TO DO: Refactor to canvas
const introSection = document.getElementById("introduction");
const minStarSize = 10;
const starSizeRange = 20;
const numOfStars = 250;
const starWrapper = document.getElementById('intro-star-wrapper');

for (let i = 0; i < numOfStars; i++) {
  let starSize = Math.floor(Math.random() * starSizeRange + minStarSize);
  let starX = Math.floor(Math.random() * 100);
  let starY = Math.floor(Math.random() * 100);
  let starPara = document.createElement('p');
  starPara.className = 'star';
  starPara.style.color = '#FFFFFF';
  starPara.style.fontSize = `${starSize}px`;
  starPara.style.position = 'absolute';
  starPara.style.top = `${starX}%`;
  starPara.style.left = `${starY}%`;
  starPara.innerHTML = "<p>.</p>";
  starPara.zIndex = "1";
  starWrapper.appendChild(starPara);
}

// Add scroll handler to fade stars on scroll down
const stars = document.getElementById('intro-star-wrapper');
const fadePoint = window.innerHeight;
const starDimmer = (e) => {
  const currentScroll = document.getElementsByTagName('main')[0].scrollTop;
  if (currentScroll <= fadePoint) {
    opacity = 1 - currentScroll / fadePoint;
  } else {
    opacity = 0;
  }
  if (stars.style.opacity !== opacity) { stars.style.opacity = opacity };
}
document.getElementsByTagName('main')[0].addEventListener('scroll', starDimmer);

// Implement project panels, scrolling, fading and buttons
gPanels = {
  panelCount: 6,
  panelSize: 0.70,
  panelPadding: 0,
  panelDivs: [],
  minOpacity: 0,
  lastPanel: 1,
};

// get initial references to panel divs based on Id
for (let i = 0; i <= (gPanels.panelCount + 1); i++) {
  gPanels.panelDivs[i] = document.getElementById('p' + i);
}

// get the scroll X position to center a given panel on screen
function getPanelX(panelNum) {
  return ((panelNum - 1) * gPanels.panelSize * (window.innerWidth - (2 * gPanels.panelPadding)))
}

// get the panel for a given X scroll position
function getCurrPanel(scrollX) {
  return Math.round(scrollX / (window.innerWidth - (2 * gPanels.panelPadding)) / gPanels.panelSize) + 1;
}

// get the offset for a given X scroll position as a ratio from the panel scroll position
function getXOffset(scrollX) {
  return Math.abs(scrollX - getPanelX(getCurrPanel(scrollX))) / ((window.innerWidth - (2 * gPanels.panelPadding)) * gPanels.panelSize)
}

// Add scroll event handler to show and hide panels based on scroll position
const panelDimmer = () => {
  const projects = document.getElementById('my-work__projects');
  const currPanel = getCurrPanel(projects.scrollLeft);
  if (currPanel !== gPanels.lastPanel) {
    gPanels.panelDivs[gPanels.lastPanel].style.opacity = gPanels.minOpacity;
  }
  gPanels.lastPanel = currPanel;
  gPanels.panelDivs[currPanel].style.opacity = 1;
}
document.getElementById('my-work__projects').addEventListener('scroll', panelDimmer);

panelDimmer()

// Add click handler for buttons to scroll to the next or previous pane
const scrollPanes = (direction) => {
  const panels = document.getElementById('my-work__projects');
  const currPanel = getCurrPanel(panels.scrollLeft);
  let nextPanel = currPanel;
  if (direction === 'left' && currPanel > 1) {
    nextPanel = currPanel - 1;
  } else if (direction === 'right' && currPanel < gPanels.panelCount) {
    nextPanel = currPanel + 1;
  };
  panels.scrollTo({
    left: getPanelX(nextPanel),
    behavior: 'smooth'
  })
}
document.getElementById('my-work__left-button').addEventListener('click', () => scrollPanes('left'));
document.getElementById('my-work__right-button').addEventListener('click', () => scrollPanes('right'));

// Add starfield to contact section
// Already made one manually so let's use a library
// warpspeed.js - https://github.com/adolfintel/warpspeed
const warp = new WarpSpeed('starField','{"speed":0.7,"speedAdjFactor":0.03,"density":2,"shape":"circle","warpEffect":true,"warpEffectLength":6,"depthFade":true,"starSize":3,"backgroundColor":"rgba(16,10,26,1)","starColor":"#FFFFFF"}');