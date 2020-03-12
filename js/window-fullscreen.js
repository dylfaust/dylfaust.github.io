var windows = $(".large-window");
var activeWindowIndex = -1;
var activationButton = null;

for (let i = 0; i < windows.length; i++)
{
  let curWindow = $(windows[i])[0];
  curWindow.content = curWindow.getElementsByClassName("window-body")[0];
}

function toggleWindow(sourceHtml, curActivationButton)
{
  if (activeWindowIndex >= 0)
  {
    $(windows[activeWindowIndex])[0].classList.toggle("large-window-active");
  }

  if (activationButton==null || (curActivationButton.id != activationButton.id))
  {
    activationButton = curActivationButton;
    if (activeWindowIndex == 0)
      activeWindowIndex = 1;
    else
      activeWindowIndex = 0;

    let curWindowJq = $(windows[activeWindowIndex]);
    let curWindowDom = curWindowJq[0];
    curWindowDom.classList.toggle("large-window-active");

    $(curWindowDom.content).load(sourceHtml);
  }
  else
  {
    activationButton = null;
    activeWindowIndex = -1;
  }
}