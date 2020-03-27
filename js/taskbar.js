// -------------------------------------------
// Global Vars
// -------------------------------------------
var taskbarButton = document.getElementById("taskbar-button");
var taskbarButtonBoxRow = document.getElementById("taskbar-button-boxes-anim");
var submenu = document.getElementById("taskbar-submenu");
var overlay = null;

var submenuActive = false;

var navButtons = document.getElementsByClassName("taskbar-nav-button");

for (let i = 0; i < navButtons.length; i++)
{
  let curButton = navButtons[i];
  curButton.addEventListener("click", navButtonClick);
}

var infoHover = [0, 38];
var infoNormal = [60, 78];

var infoClicked = [120,136];
var infoActiveClicked = [30*30,(30*30)+16];

var infoActiveNormal = [30*6,(30*6)+18];
var infoActiveHover = [30*8,(30*8)+38];

var infoButton = document.getElementById('info-button-anim');
var infoAnim = infoButton.getElementsByClassName("lottie-anim")[0];

var animation = bodymovin.loadAnimation({
  container: infoAnim,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: './anims/info-button-anims.json'
})

infoButton.addEventListener("mouseover", infoButtonMouseOver, true);
infoButton.addEventListener("mouseout", infoButtonMouseOut, true);
infoButton.addEventListener("click", infoButtonClick, true);

function infoButtonMouseOut()
{
  infoButton.hovered = false;

  let desiredState = infoButton.active ? infoActiveNormal : infoNormal;
  animation.playSegments(desiredState, true);
}

function infoButtonMouseOver()
{
  if (!infoButton.hovered)
  {
    let desiredState = infoButton.active ? infoActiveHover : infoHover;
    animation.playSegments(desiredState, true);
  }
  infoButton.hovered = true;
}

function infoButtonClick()
{
  let desiredState = infoButton.active ? infoActiveClicked : infoClicked;
  animation.playSegments(desiredState, true);
  infoButton.active = !infoButton.active;
}

// -------------------------------------------
// Listeners
// -------------------------------------------

// Hover and click
// taskbarButton.addEventListener("mouseover", onMouseOverTb, true);
// taskbarButton.addEventListener("mouseout", onMouseOutTb, true);
// taskbarButton.addEventListener("click", onClickTb, true);

// // Transitions
// taskbarButtonBoxRow.addEventListener("transitionend", onTransitionEnd, event);

// -------------------------------------------
// Setup
// -------------------------------------------

// goAnimState(taskbarButtonBoxRow, "taskbar-button-row--normal");
// goAnimState(submenu, "taskbar-submenu--off");

function navButtonClick()
{
  // toggleWindow(this.getAttribute("data-active"), this);
  // window.alert(this.getAttribute("data-active"));
}

// -------------------------------------------
// States
// -------------------------------------------
function beginSubmenuOpen()
{
  if (!submenuActive)
  {
    submenuActive = true;
    goAnimState(taskbarButtonBoxRow, "taskbar-button-row--active");
    goAnimState(taskbarButton, "taskbar-button-fill--active");
    setTimeout(function ()
    {
      // window.alert("county");
      document.addEventListener("click", onClickOutside, true);
    });
  }

  taskbarButton.removeEventListener("click", onClickTb, true);
}

function endSubmenuOpen()
{
  goAnimState(submenu, "taskbar-submenu--active");
  if (overlay == null)
    overlay = document.createElement("overlay");
  overlay.classList.add("dark-overlay");
  setTimeout(function () { goAnimState(overlay, "dark-overlay--active") });
  overlay.classList.add("unselectable-text");

  var page = document.getElementById("page");
  page.appendChild(overlay);

  var z = overlay.style.zIndex;
  submenu.style.zIndex = z + 1;

  var taskbar = document.getElementById("taskbar");
  taskbar.style.zIndex = z + 1;
}

function onClickOutside(event)
{
  if (!event.target.closest("#taskbar-submenu"))
    goSubmenuClosed();
}

function goSubmenuClosed()
{
  // window.alert("swag");
  submenuActive = false;
  document.removeEventListener("click", onClickOutside, true);
  if (overlay != null)
  {
    goAnimState(overlay, "dark-overlay--off");
    overlay.addEventListener("transitionend", onFadeComplete, event);
  }

  goAnimState(submenu, "taskbar-submenu--off");
  goAnimState(taskbarButton, "taskbar-button-fill--normal");

  let targetButtonState = taskbarButton.hovered ? "taskbar-button-row--hover" : "taskbar-button-row--normal";
  goAnimState(taskbarButtonBoxRow, targetButtonState);

  setTimeout(function ()
  {
    // window.alert("county");
    taskbarButton.addEventListener("click", onClickTb, true);
  });
}

// -------------------------------------------
// Funcs
// -------------------------------------------

function onMouseOverTb()
{
  taskbarButton.hovered = true;
  if (!submenuActive)
    goAnimState(taskbarButtonBoxRow, "taskbar-button-row--hover");
}
function onMouseOutTb()
{
  taskbarButton.hovered = false;
  if (!submenuActive)
    goAnimState(taskbarButtonBoxRow, "taskbar-button-row--normal");
}

function onClickTb()
{
  beginSubmenuOpen();
}

function onTransitionEnd(event)
{
  if (this.animState == "taskbar-button-row--active")
  {
    endSubmenuOpen();
  }
}

function onFadeComplete()
{
  if (!submenuActive && overlay)
  {
    var page = document.getElementById("page");
    page.removeChild(overlay);
    overlay = null;
  }
}