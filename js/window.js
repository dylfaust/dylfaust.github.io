var useDefaultAnim = allowLottie();

let windowsSmall = document.getElementsByClassName("window");
for (let i = 0; i < windowsSmall.length; i++)
{
  let window = windowsSmall[i];
  setupCloseButton(window, closeClick);
}

// let windowsLarge = document.getElementsByClassName("large-window");
// for (let i = 0; i < windowsLarge.length; i++)
// {
//   let windowLarge = windowsLarge[i];
//   setupCloseButton(windowLarge, closeLarge);
// }

function setupCloseButton(window, clickFunc)
{
  let closeButton = window.getElementsByClassName("close-button")[0];
  closeButton.window = window;

  closeButton.addEventListener("click", clickFunc, false);
  closeButton.addEventListener("mousedown", closeMouseDown, false);
}

function closeClick()
{
  let elem = this.window;
  let outline = elem.getElementsByClassName("window-outline")[0];

  disableWindowDraggable(elem);
  // elem.parentNode.removeChild(elem);
  if (useDefaultAnim)
  {
    console.log("a");
  elem.classList.add("window-close");
  outline.classList.add("window-outline-close");
  }
  else
  {
    console.log("b");
    elem.classList.add("window-close-msedge")
  }
}

function closeLarge()
{
 toggleWindow(null, null);
}

function closeMouseDown(event)
{
  event.stopPropagation();
}

function allowLottie()
{
  return window.navigator.userAgent.toLowerCase().indexOf("edge") <= -1;
}
