var windows = $(".large-window");
var largeWindowWrapper = document.getElementsByClassName("large-window-wrapper")[0];
var largeButtons = document.getElementsByClassName("taskbar-nav-button");
var activationButton = null;
var curHtml = null;

console.assert(windows.length == largeButtons.length);

for (let i = 0; i < windows.length; i++)
{
  let curWindowDom = $(windows[i])[0];
  curWindowDom.content = curWindowDom.getElementsByClassName("large-window-body-wrapper")[0];

  largeButtons[i].window = curWindowDom;

  let content = curWindowDom.content;
  $(content).load(curWindowDom.getAttribute("html-ref"));
  content.loadStarted = true;
}

// toggleWindow("./html/portfolio-detail.html", 0);

function toggleWindow(sourceHtml, curActivationButton)
{
  if (curActivationButton != null && (activationButton == null || (curActivationButton.id != activationButton.id)))
  {
    // If we have an active window
    if (activationButton != null)
    {
      let curWindowDom = activationButton.window;
      curWindowDom.classList.toggle("large-window-active");
      activationButton.classList.toggle("taskbar-nav-button-active");
      curWindowDom.removeEventListener("transitionend", windowAnimOnComplete);
    }

    activationButton = curActivationButton;

    // Button anim
    if (activationButton != 0) // debug
      activationButton.classList.toggle("taskbar-nav-button-active");


    let curWindowDom = activationButton.window;
    // let curWindowJq = $(curWindowDom);
    curWindowDom.classList.toggle("large-window-active");
    curWindowDom.addEventListener("transitionend", windowAnimOnComplete);

    largeWindowWrapper.style.pointerEvents = "auto";

  }
  else
  {
    activationButton.window.classList.toggle("large-window-active");
    activationButton.classList.toggle("taskbar-nav-button-active");
    activationButton = null;
    largeWindowWrapper.style.pointerEvents = "none";
  }
}

function windowAnimOnComplete()
{
  // var contentDom = windows[activeWindowIndex].content;
  // $(contentDom).load(curHtml);
}

function loadComplete ()
{
  this.doneLoading = true;
}