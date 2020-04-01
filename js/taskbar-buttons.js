//  Data
// ----------------------------------------------------

const page = {
  DETAIL: 'detail',
  MAIN: 'main',
  ABOUT: 'about',
  PORTFOLIO: 'portfolio',
  RESUME: 'resume'
}

// ---------------------------
const defaultClickAnim = {
  name: 'clicked',
  normalStart: 30 * 4,
  activeStart: 30 * 30,
  duration: 16,
  inactiveDuration: 11,
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

const defaultDudAnim = {
  name: 'dud',
  normalStart: 30 * 2,
  activeStart: 30 * 15,
  duration: 22,
  earlyExitFrame: null
};


const defaultAnims =
{
  normal: defaultNormalAnim,
  hover: defaultHoverAnim,
  dud: defaultDudAnim,
  click: defaultClickAnim
};

var loadedAnimCount = 0;
// ---------------------------

const portfolioClickAnim = {
  name: 'clicked',
  normalStart: 30 * 4,
  activeStart: 30 * 30 + 10,
  duration: 20 + 10,
  earlyExitFrame: 18,
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
  dud: defaultDudAnim,
  click: portfolioClickAnim
};

//  Setup
// ----------------------------------------------------

let infoButton = document.getElementById('about-link');
let portButton = document.getElementById('portfolio-link');
let homeButton = document.getElementById('home-link');
let buttons = [
  homeButton.getElementsByClassName("lottie-button-wrapper")[0], infoButton.getElementsByClassName("lottie-button-wrapper")[0],
  portButton.getElementsByClassName("lottie-button-wrapper")[0]
];

setupButtonAnims(infoButton, '../anims/info-button-anims.json', defaultAnims);
setupButtonAnims(portButton, '../anims/portfolio-button-anims.json', portfolioAnims);
setupButtonAnims(homeButton, '../anims/home-button-anims.json', defaultAnims);

//  Anim Funcs
// ==============================================================================

//------------------------------
function jumpToEndFrame(anim, active)
{
  this.goAnimState(anim, active);
  let duration = active && anim.inactiveDuration ? anim.inactiveDuration : anim.duration;
  this.goToAndStop(duration, true);
}

//------------------------------
function animComplete(animController)
{
  let domElement = animController.domElement;
  if (animController.queuedState != null)
  {
    animController.goAnimState(animController.queuedState, domElement.active);
    animController.queuedState = null;
  }
  else
  {
    animController.reset();
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

  if (active && animData.inactiveDuration)
  {
    let breakhere = true;
    if (breakhere)
      console.log("cool");
  }

  let duration = active && animData.inactiveDuration ? animData.inactiveDuration : animData.duration;

  endFrame = startFrame + duration;

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


  if (animData.currState.transitionLinkFrame && !animData.linkFired && animData.domElement.awaitingLinkTransition)
  {
    if (currFrame >= animData.currState.transitionLinkFrame)
    {
      let link = animData.domElement.link;
      link.click();
      animData.linkFired = true;
      animData.domElement.awaitingLinkTransition = false;
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
  this.awaitingLinkTransition = false;
}

//  Button Event Funcs
// ==============================================================================

//------------------------------
function initButtonAnims(pageState)
{
  let activeButton;
  if (pageState == page.DETAIL || pageState == page.PORTFOLIO)
  {
    activeButton = buttons[2];
  }
  else if (pageState == page.ABOUT)
  {
    activeButton = buttons[1];
  }
  else
  {
    activeButton = buttons[0];
  }

  for (let i = 0; i < buttons.length; i++)
  {
    let button = buttons[i];

    button.active = (button == activeButton);

    if (button.animController && button.animController.loaded)
    {
      button.animController.jumpToEndFrame(button.anims.normal, button.active);
    }
  }
}

//------------------------------
function animControllerLoaded(animController, button)
{
  animController.loaded = true;
  loadedAnimCount++;
  if (button.active)
  {
    animController.jumpToEndFrame(button.anims.normal, true);
  }
  else
  {
    animController.jumpToEndFrame(button.anims.normal, false);
  }

  if (loadedAnimCount == 3)
  {
    var taskbarContent = document.getElementById("taskbar-contents");
    taskbarContent.style.opacity = "100%";
  }
}

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

  this.text.classList.remove("nav-text-active");

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

  this.text.classList.add("nav-text-active");

  this.hovered = true;
}

//------------------------------
function infoButtonClick(event, buttonOverride = null)
{
  let clickedButton;
  if (buttonOverride)
    clickedButton = buttonOverride;
  else
    clickedButton = this;

  let animController = clickedButton.animController;
  let anims = clickedButton.anims;
  let desiredState = anims.click;

  if (!clickedButton.active)
  {
    animController.goAnimState(desiredState, clickedButton.active);

    clickedButton.active = !clickedButton.active;

    clickedButton.awaitingLinkTransition = true;

    for (let i = 0; i < buttons.length; i++)
    {
      let button = buttons[i];
      if (button != clickedButton)
      {
        let wasActive = button.active;
        button.active = false;
        if (wasActive)
        {
          button.animController.goAnimState(button.anims.click, true);
          // button.animController.queueAnimState(button.anims.normal, true);
        }
      }
    }
  }
  else
  {
    if (animController.currState != anims.click)
    {
      clickedButton.classList.add("button-dud-anim");
      let body = document.getElementsByClassName("large-window-body")[0];
      let button = clickedButton;
      if (clickedButton == buttons[0])
      {
        body = document.getElementsByClassName("dud-wrapper")[0];
        let windows = document.getElementsByClassName("window");
        for (let i = 0; i < windows.length; i++)
        {
          let window = windows[i];
          let outline = window.getElementsByClassName("window-outline")[0];
          window.classList.remove("window-close");
          outline.classList.remove("window-outline-close");
          makeWindowDraggable(window, window.zIndexInt);
        }
      }

      body.classList.add("dud-anim");

      body.addEventListener("animationend", function ()
      {
        body.classList.remove("dud-anim");
        button.classList.remove("button-dud-anim");
      });
    }
  }
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
  animController.jumpToEndFrame = jumpToEndFrame;

  button.anims = anims;
  button.animController = animController;
  button.text = buttonWrapper.getElementsByClassName("nav-text")[0];
  animController.domElement = button;

  animController.addEventListener('DOMLoaded',
    function (e) { animControllerLoaded(animController, button); }
  );

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