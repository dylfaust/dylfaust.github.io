var currWindow;
var topmostZIndex = 9999;
var draggables;

function initDraggables()
{
  draggables = document.getElementsByClassName("window");
  for (let i = 0; i < draggables.length; i++)
  {
    j = draggables.length - 1 - i;
    makeWindowDraggable(draggables[j], i);
    setupCloseButton(draggables[j], closeClick);
    topmostZIndex = j;
  }
}

function makeWindowDraggable(draggable, zIndex = 1)
{
  $(draggable).resizable();

  draggable.classList.add("window");
  draggable.addEventListener("mousedown", mouseDown, false);
  draggable.addEventListener("mouseup", mouseUp, false);
  draggable.zIndexInt = zIndex;
  draggable.style.zIndex = draggable.zIndexInt;
}

function disableWindowDraggable(draggable)
{
  // draggable.classList.remove("window");
  draggable.removeEventListener("mousedown", mouseDown, false);
  draggable.removeEventListener("mouseup", mouseUp, false);
  for (let i = 0; i < topmostZIndex + 1; i++)
  {
    if (draggables[i] == draggable)
      draggables[i] = null;
  }
}

function shiftWindowToFront(newTopDraggable)
{
  priorIndex = newTopDraggable.zIndexInt;
  for (let j = 0; j < topmostZIndex + 1; j++)
  {
    let currDraggable = draggables[j];
    if (currDraggable)
    {
      if (currDraggable == newTopDraggable)
      {
        currDraggable.zIndexInt = topmostZIndex;
        currDraggable.style.zIndex = newTopDraggable.zIndexInt;
      }
      else if (currDraggable.zIndexInt > priorIndex)
      {
        currDraggable.zIndexInt -= 1;
        currDraggable.style.zIndex = currDraggable.zIndexInt;
      }
    }
  }
}

function mouseDown(event)
{
  var canDrag = false;
  shiftWindowToFront(this);
  if (this.classList.contains("draggable"))
  {
    canDrag = true;
  }
  else
  {
    var child = this.getElementsByClassName("topbar")[0];
    if (child)
    {
      canDrag = true;

      var posX = event.clientX;
      var posY = event.clientY;

      var top = child.getBoundingClientRect().top;
      var bottom = child.getBoundingClientRect().bottom;
      var left = child.getBoundingClientRect().left;
      var right = child.getBoundingClientRect().right;

      var withinY = posY > top && posY < bottom;
      var withinX = posX > left && posX < right;

      canDrag = withinY && withinX;
    }
  }


  if (canDrag)
  {
    currWindow = this;
    currWindow.shiftX = event.clientX - currWindow.getBoundingClientRect().left + 0.0;
    currWindow.shiftY = event.clientY - currWindow.getBoundingClientRect().top + 0.0;

    var posX = event.clientX;
    var posY = event.clientY;

    var top = child.getBoundingClientRect().top;
    var bottom = child.getBoundingClientRect().left;

    currWindow.style.position = 'absolute';

    // if (append)
    //  document.body.append(currWindow);

    moveAt(event.pageX, event.pageY);
    // move the draggable on mousemove
    document.addEventListener('mousemove', onMouseMove, true);
  }
}

function mouseUp(event)
{
  document.removeEventListener('mousemove', onMouseMove, true);
  currWindow = null;
}



// moves the draggable at (pageX, pageY) coordinates
// taking initial shifts into account
function moveAt(pageX, pageY) 
{
  currWindow.style.left = pageX - currWindow.shiftX + 'px';
  currWindow.style.top = pageY - currWindow.shiftY + 'px';
}

function onMouseMove(event) 
{
  if (event.pageX < 0 || event.pageX  > document.body.clientWidth || event.pageY < 0 || event.pageY > document.body.clientHeight)
  {
    mouseUp(null);
  }
  else
  {
    moveAt(event.pageX, event.pageY);
  }
  pauseEvent(event);
}
function pauseEvent(e)
{
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}