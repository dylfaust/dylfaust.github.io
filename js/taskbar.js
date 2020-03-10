// -------------------------------------------
// Global Vars
// -------------------------------------------
var taskbarButton = document.getElementById("taskbar-button");
var taskbarButtonBoxRow = document.getElementById("taskbar-button-boxes-anim");
var submenu = document.getElementById("taskbar-submenu");
var overlay = null;

var submenuActive = false;

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
    setTimeout(function() {
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
  setTimeout(function() { goAnimState(overlay, "dark-overlay--active") });
  overlay.classList.add("unselectable-text");

  var page = document.getElementById("page");
  page.appendChild(overlay);

  var z = overlay.style.zIndex;
  submenu.style.zIndex = z+1;

  var taskbar = document.getElementById("taskbar");
  taskbar.style.zIndex = z+1;
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

  setTimeout(function() {
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