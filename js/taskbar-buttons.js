//  Data
// ----------------------------------------------------

const infoClickAnim = {
  name: 'infoClicked',
  normalStart: 30 * 4,
  activeStart: 30 * 30,
  duration: 16,
  earlyExitFrame: 11,
  transitionLinkFrame: 11,
};

const infoHoverAnim = {
  name: 'infoHover',
  normalStart: 0,
  activeStart: 30 * 8,
  duration: 38,
  earlyExitFrame: null
};

const infoNormalAnim = {
  name: 'infoNormal',
  normalStart: 30 * 2,
  activeStart: 30 * 6,
  duration: 18,
  earlyExitFrame: null
};

//  Setup
// ----------------------------------------------------

let infoButton = document.getElementById('about-link');
let portButton = document.getElementById('portfolio-link');
let homeButton = document.getElementById('home-link');

setupButtonAnims(infoButton, './anims/info-button-anims.json');
setupButtonAnims(portButton, './anims/portfolio-button-anims.json');
setupButtonAnims(homeButton, './anims/home-button-anims.json');

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
  let anims = this.anims;

  if (anims.currState != infoClickAnim)
  {
    anims.goAnimState(infoNormalAnim, this.active);
  }
  else
  {
    anims.queueAnimState(infoNormalAnim);
  }

  this.hovered = false;
}

//------------------------------
function infoButtonMouseOver()
{
  let anims = this.anims;

  if (!this.hovered)
  {
    if (anims.currState != infoClickAnim)
    {
      anims.goAnimState(infoHoverAnim, this.active);
    }
    else
    {
      anims.queueAnimState(infoHoverAnim);
    }
  }

  this.hovered = true;
}

//------------------------------
function infoButtonClick()
{
  let anims = this.anims;

  anims.goAnimState(infoClickAnim, this.active);

  this.active = !this.active;
}

//------------------------------
function setupButtonAnims(buttonWrapper, animPath)
{
  let button = buttonWrapper.getElementsByClassName("lottie-button-wrapper")[0];

  button.link = buttonWrapper.getElementsByClassName("nav-link")[0];

  var buttonAnims = bodymovin.loadAnimation({
    container: button.getElementsByClassName("lottie-anim")[0],
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: animPath
  })
  buttonAnims.goAnimState = goAnimState;
  buttonAnims.queueAnimState = queueAnimState;
  buttonAnims.reset = reset;

  button.anims = buttonAnims;
  buttonAnims.domElement = button;

  buttonAnims.addEventListener("complete", function (event)
  {
    animComplete(buttonAnims);
  });

  buttonAnims.addEventListener("enterFrame", function (event)
  {
    enterFrame(event.currentTime, buttonAnims);
  });

  button.addEventListener("mouseover", infoButtonMouseOver, true);
  button.addEventListener("mouseout", infoButtonMouseOut, true);
  button.addEventListener("click", infoButtonClick, true);
}