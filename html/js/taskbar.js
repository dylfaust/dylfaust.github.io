// -------------------------------------------
// Global Vars
// -------------------------------------------
var boxRowAnim = document.getElementById("taskbar-button-boxes-anim");
var submenu = document.getElementById("taskbar-submenu");

// -------------------------------------------
// Listeners
// -------------------------------------------

{

  let button = document.getElementById("taskbar-button");
  
  // Hover and click
  button.addEventListener("mouseover", 
    function(event){ onMouseOver(event, boxRowAnim) }
    );
  button.addEventListener("mouseout", 
   function(event){ onMouseOut(event, boxRowAnim) }
   );
  button.addEventListener("click", 
    function(event){ onClick(event, boxRowAnim) }
    );

  // Transitions
  boxRowAnim.addEventListener("transitionend", onTransitionEnd, event);

}

// -------------------------------------------
// Setup
// -------------------------------------------

goAnimState(boxRowAnim, "taskbar-button--normal");
goAnimState(submenu, "taskbar-submenu--off");

// -------------------------------------------
// Funcs
// -------------------------------------------

// taskbar-button-box-row
function onMouseOver(event, element)
{
  if (!element.active)
    goAnimState(element, "taskbar-button--hover");
}
function onMouseOut(event, element)
{
  if (!element.active)
    goAnimState(element, "taskbar-button--normal");
}

function onClick(event, element)
{
  element.active = true;
  goAnimState(element, "taskbar-button--active");
}

function onTransitionEnd(event)
{
  if (this.animState == "taskbar-button--active")
  {  
    goAnimState(submenu, "taskbar-submenu--active");
    var overlay = document.createElement("overlay");
    overlay.classList.add("dark-overlay");
    setTimeout(function() { overlay.classList.add("dark-overlay-fade-in"); });
    overlay.classList.add("unselectable-text");

    var page = document.getElementById("page");
    page.appendChild(overlay);

    var z = overlay.style.zIndex;
    submenu.style.zIndex = z+1;

    var taskbar = document.getElementById("taskbar");
    taskbar.style.zIndex = z+1;
  }
}

function goAnimState(element, stateId)
{
  if (element.animState)
  {
    element.classList.remove(element.animState);
  }
  element.animState = stateId;
  element.classList.add(element.animState);
}