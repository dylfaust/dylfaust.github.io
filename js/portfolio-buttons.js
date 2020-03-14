// Init
var portfolioWindow = document.getElementById('large-window-portfolio');
let contentPanes = portfolioWindow.getElementsByClassName('large-window-body-wrapper');
var disableMouse = document.getElementsByClassName("large-window-wrapper")[0];
var primaryContent = contentPanes[0];
var secondaryContent = contentPanes[1];
var buttons;
var headers;
var lastWindow;

console.assert(contentPanes.length == 2, "portfolio window doesn't have two children!");

// Load html
$(secondaryContent).load(portfolioWindow.getAttribute('secondary-html-ref'));

secondaryContent.style.opacity = '0%';

// Repeatedly check that content is done loading
var intervalId = window.setInterval(function ()
{
  if (primaryContent.loadStarted == true && (document.readyState === 'interactive' || document.readyState === 'complete'))
  {
    clearInterval(intervalId);
    setupPortfolioButtons();
  }
}, 500);

function setupPortfolioButtons()
{
  buttons = primaryContent.getElementsByClassName('image-clip-wrapper');
  headers = primaryContent.getElementsByClassName('section-header');
  let windows = primaryContent.getElementsByClassName('portfolio-slot-window');

  for (let i = 0; i < buttons.length; i++)
  {
    let curButton = buttons[i];
    curButton.window = windows[i];
    curButton.addEventListener('click', portfolioButtonClicked);
    curButton.addEventListener('mouseover', portfolioButtonHover);
    curButton.addEventListener('mouseout', portfolioButtonExitHover);
  }
  console.log("done setting up portfolio buttons!");

  let backButton = secondaryContent.getElementsByClassName('back-button')[0];
  backButton.addEventListener('click', backButtonClicked);
}

function portfolioButtonClicked()
{
  this.window.classList.remove("slow-trans");
  this.window.classList.add("portfolio-slot-window-active");

  for (let i = 0; i < buttons.length; i++)
  {
    let curWindow = buttons[i].window;
    if (curWindow != this.window)
    {
      curWindow.classList.remove("slow-trans");
      curWindow.classList.add("portfolio-slot-window-clear");
    }
  }

  for (let i = 0; i < headers.length; i++)
  {
    let header = headers[i];
    header.classList.remove("slow-trans");
    header.classList.add("a-0-trans");
  }
  largeWindowWrapper.style.pointerEvents = "none";
  lastWindow = this.window;
  setTimeout(function ()
  {
    lastWindow.classList.add("a-0-trans");
    lastWindow.classList.add("slow-trans");
    secondaryContent.classList.add('large-window-details-active');
    largeWindowWrapper.style.pointerEvents = "auto";
  }
    , 200);
  // secondaryContent.classList.add('large-window-details-active');
  //  secondaryContent.style.zIndex = '9999';
}

function portfolioButtonHover()
{

}

function portfolioButtonExitHover()
{

}

function backButtonClicked()
{
  secondaryContent.classList.remove('large-window-details-active');
  lastWindow.classList.remove("a-0-trans");
  lastWindow.classList.remove("portfolio-slot-window-active");
  // lastWindow.classList.remove("slow-trans");
  // lastWindow.classList.remove("slow-trans");

  setTimeout(function ()
  {
    for (let i = 0; i < buttons.length; i++)
    {
      let curWindow = buttons[i].window;
      if (curWindow != lastWindow)
      {
        curWindow.classList.remove("portfolio-slot-window-clear");
        curWindow.classList.add("slow-trans");
      }
    }

    for (let i = 0; i < headers.length; i++)
    {
      let header = headers[i];
      header.classList.remove("a-0-trans");
      header.classList.add("slow-trans");
    }

    lastWindow = null;
  }
    , 400);
}