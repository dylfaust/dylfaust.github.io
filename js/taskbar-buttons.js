//  Data
// ----------------------------------------------------

// ---------------------------
const defaultClickAnim = {
  name: 'clicked',
  normalStart: 30 * 4,
  activeStart: 30 * 30,
  duration: 16,
  earlyExitFrame: 11,
  transitionLinkFrame: 11,
};

const defaultHoverAnim = {
  name: 'hover',
  normalStart: 0,
  activeStart: 30 * 8,
  duration: 38,
  earlyExitFrame: null
};

const defaultNormalAnim = {
  name: 'normal',
  normalStart: 30 * 2,
  activeStart: 30 * 6,
  duration: 18,
  earlyExitFrame: null
};


const defaultAnims =
{
  normal: defaultNormalAnim,
  hover: defaultHoverAnim,
  click: defaultClickAnim
};
// ---------------------------

const portfolioClickAnim = {
  name: 'clicked',
  normalStart: 30 * 4,
  activeStart: 30 * 30,
  duration: 16,
  earlyExitFrame: 11,
  transitionLinkFrame: 11,
};

const portfolioHoverAnim = {
  name: 'hover',
  normalStart: 0,
  activeStart: 30 * 6,
  duration: 38,
  earlyExitFrame: null
};

const portfolioNormalAnim = {
  name: 'normal',
  normalStart: 30 * 2,
  activeStart: 30 * 8,
  duration: 18,
  earlyExitFrame: null
};


const portfolioAnims =
{
  normal: portfolioNormalAnim,
  hover: portfolioHoverAnim,
  click: portfolioClickAnim
};

//  Setup
// ----------------------------------------------------

let infoButton = document.getElementById('about-link');
let portButton = document.getElementById('portfolio-link');
let homeButton = document.getElementById('home-link');

setupButtonAnims(infoButton, './anims/info-button-anims.json', defaultAnims);
setupButtonAnims(portButton, './anims/portfolio-button-anims.json', portfolioAnims);
setupButtonAnims(homeButton, './anims/home-button-anims.json', defaultAnims);

//  Anim Funcs
// ==============================================================================

//------------------------------
function animComplete(anims)
{
  let domElement = anims.domElement;
  if (anims.queuedState != null)
  {
    anims.goAnimState(anims.queuedState, domElement.active);
    anims.queuedState = null;
  }
  else
  {
    anims.reset();
  }
}

//------------------------------
function goAnimState(animData, active)
{

  let wantsEarlyExit;
  let startFrame;
  let endFrame;

  wantsEarlyExit = animData.earlyExitFrame != null;
  startFrame = active ? animData.activeStart : animData.normalStart;
  endFrame = startFrame + animData.duration;

  let animId = animData.name;

  this.playSegments([startFrame, endFrame], true);
  this.startFrame = startFrame;
  this.currState = animData;
  this.currStateId = animId;
  this.wantsEarlyExit = wantsEarlyExit;
}

//------------------------------
function queueAnimState(animData)
{
  this.queuedState = animData;
}

//------------------------------
function enterFrame(currFrame, animData)
{
  if (animData.currState == null)
    return;


  if (animData.currState.transitionLinkFrame && !animData.linkFired)
  {
    if (currFrame >= animData.currState.transitionLinkFrame)
    {
      let link = animData.domElement.link;
      link.click();
      animData.linkFired = true;
    }
  }
  if (animData.queuedState && animData.currState.earlyExitFrame)
  {
    if (currFrame >= animData.currState.earlyExitFrame)
    {
      animData.goAnimState(animData.queuedState, animData.domElement.active);
      animData.queuedState = null;
    }
  }
}

//------------------------------
function reset()
{
  this.currState = null;
  this.currStateId = null;
  this.wantsEarlyExit = false;
  this.queuedState = null;
  this.linkFired = false;
}

//  Button Event Funcs
// ==============================================================================

//------------------------------
function infoButtonMouseOut()
{
  let animController = this.animController;
  let anims = this.anims;
  let desiredState = anims.normal;

  if (animController.currState != anims.click)
  {
    animController.goAnimState(desiredState, this.active);
  }
  else
  {
    animController.queueAnimState(desiredState);
  }

  this.hovered = false;
}

//------------------------------
function infoButtonMouseOver()
{
  let animController = this.animController;
  let anims = this.anims;
  let desiredState = anims.hover;

  if (!this.hovered)
  {
    if (animController.currState != anims.click)
    {
      animController.goAnimState(desiredState, this.active);
    }
    else
    {
      animController.queueAnimState(desiredState);
    }
  }

  this.hovered = true;
}

//------------------------------
function infoButtonClick()
{
  let animController = this.animController;
  let anims = this.anims;
  let desiredState = anims.click;

  animController.goAnimState(desiredState, this.active);

  this.active = !this.active;
}

//------------------------------
function setupButtonAnims(buttonWrapper, animPath, anims)
{
  let button = buttonWrapper.getElementsByClassName("lottie-button-wrapper")[0];

  button.link = buttonWrapper.getElementsByClassName("nav-link")[0];

  var animController = bodymovin.loadAnimation({
    container: button.getElementsByClassName("lottie-anim")[0],
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: animPath
  })
  animController.goAnimState = goAnimState;
  animController.queueAnimState = queueAnimState;
  animController.reset = reset;

  button.anims = anims;
  button.animController = animController;
  animController.domElement = button;

  animController.addEventListener("complete", function (event)
  {
    animComplete(animController);
  });

  animController.addEventListener("enterFrame", function (event)
  {
    enterFrame(event.currentTime, animController);
  });

  button.addEventListener("mouseover", infoButtonMouseOver, true);
  button.addEventListener("mouseout", infoButtonMouseOut, true);
  button.addEventListener("click", infoButtonClick, true);
}