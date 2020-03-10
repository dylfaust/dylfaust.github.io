var currWindow;
var topmostZIndex = "-9999";

var draggables = document.getElementsByClassName("window");
for (let i = 0; i < draggables.length; i++)
{
  makeWindowDraggable(draggables[i]);
}

function makeWindowDraggable(draggable, appendParent=null)
{
  draggable.classList.add("window");
  draggable.addEventListener("mousedown", mouseDown,false);
  draggable.addEventListener("mouseup", mouseUp, false);

  if (appendParent == null)
    appendParent=document.body;

  draggable.appendParent = appendParent;

  if (draggable && draggable.style.zIndex > topmostZIndex)
    topmostZIndex = draggable.style.zIndex;

  if (draggable.appendParent == document.body)
  {
    currWindow=draggable;
    currWindow.shiftX=0;
    currWindow.shiftY=0;
    document.body.append(currWindow);
    moveAt(draggable.getBoundingClientRect().left, draggable.getBoundingClientRect().top);
    currWindow=null;
  }

}

function disableWindowDraggable(draggable)
{
  draggable.classList.remove("window");
  draggable.removeEventListener("mousedown", mouseDown,false);
  draggable.removeEventListener("mouseup", mouseUp, false);
  if (draggable && draggable.style.zIndex > topmostZIndex)
    topmostZIndex = draggable.style.zIndex;

}

function mouseDown(event)
{
  var canDrag = false;
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

      var top =  child.getBoundingClientRect().top;
      var bottom =  child.getBoundingClientRect().bottom;
      var left =  child.getBoundingClientRect().left;
      var right =  child.getBoundingClientRect().right;

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

    var top =  child.getBoundingClientRect().top;
    var bottom =  child.getBoundingClientRect().left;

    currWindow.style.position = 'absolute';
    var append = (currWindow.style.zIndex != topmostZIndex);

    // currWindow.style.zIndex = topmostZIndex;
    if (append)
     document.body.append(currWindow);

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
    moveAt(event.pageX, event.pageY);
    pauseEvent(event);
  }
function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}