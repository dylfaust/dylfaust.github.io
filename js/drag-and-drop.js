var currWindow;
var topmostZIndex = -9999;

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
    var child = this.getElementsByClassName("draggable")[0];
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
    let isFolder = this.appendParent != document.body;

    currWindow = this;
    // I dont understand why, but i need to offset this by 30 :'(
    currWindow.shiftX = event.clientX - currWindow.getBoundingClientRect().left + (isFolder ? 30.0 : 0.0); 
    currWindow.shiftY = event.clientY - currWindow.getBoundingClientRect().top + (isFolder ? 30.0 : 0.0);

    var posX = event.clientX;
    var posY = event.clientY;

    var top =  child.getBoundingClientRect().top;
    var bottom =  child.getBoundingClientRect().left;

    console.log(posX + " | " + posY + "\n" + left + " | " + top + "\n" + event.pageX + " | " + event.pageY);

    currWindow.style.position = 'absolute';
    currWindow.style.zIndex = topmostZIndex;
    currWindow.appendParent.append(currWindow);

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
  }