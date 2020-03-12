var windows = $(".large-window");
var activeWindowIndex = -1;
var largeWindowWrapper = document.getElementsByClassName("large-window-wrapper")[0];
var activationButton = null;
var curHtml = null;

for (let i = 0; i < windows.length; i++)
{
  let curWindow = $(windows[i])[0];
  curWindow.content = curWindow.getElementsByClassName("large-window-body")[0];
}

toggleWindow("./html/portfolio.html", 0);

function toggleWindow(sourceHtml, curActivationButton)
{
  if (curActivationButton != null && (activationButton == null || (curActivationButton.id != activationButton.id)))
  {
    if (activeWindowIndex >= 0)
    {
      let curWindowDom = windows[activeWindowIndex];
      curWindowDom.classList.toggle("large-window-active");
      activationButton.classList.toggle("taskbar-nav-button-active");
      curWindowDom.removeEventListener("transitionend", windowAnimOnComplete);
    }

    activationButton = curActivationButton;

    if (activationButton != 0) // debug
      activationButton.classList.toggle("taskbar-nav-button-active");

    if (activeWindowIndex == 0)
      activeWindowIndex = 1;
    else
      activeWindowIndex = 0;

    let curWindowJq = $(windows[activeWindowIndex]);
    let curWindowDom = curWindowJq[0];
    curWindowDom.classList.toggle("large-window-active");
    curWindowDom.addEventListener("transitionend", windowAnimOnComplete);

    largeWindowWrapper.style.pointerEvents = "auto";

    curHtml = sourceHtml;
    $(curWindowDom.content).load(curHtml);
  }
  else
  {
    $(windows[activeWindowIndex])[0].classList.toggle("large-window-active");
    activationButton.classList.toggle("taskbar-nav-button-active");
    activationButton = null;
    activeWindowIndex = -1;
    largeWindowWrapper.style.pointerEvents = "none";
  }
}

function windowAnimOnComplete()
{
  var contentDom = windows[activeWindowIndex].content;
  // $(contentDom).load(curHtml);
}