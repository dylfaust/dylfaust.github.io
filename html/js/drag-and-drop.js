var currWindow;

var draggables = document.getElementsByClassName("window");
for (let i = 0; i < draggables.length; i++)
{
  makeWindowDraggable(draggables[i]);
}
// makeWindowDraggable("window-notes");
// makeWindowDraggable("window-console");
// makeWindowDraggable("window-wip");

function makeWindowDraggable(draggable)
{
  // var draggable = document.getElementById(id);
  draggable.addEventListener("mousedown", function(event){ mouseDown(event, draggable) });
  draggable.addEventListener("mouseup", function(event){ mouseUp(event) });
}

function mouseDown(event, window)
{
  var canDrag = false;
  if (window.classList.contains("draggable"))
  {
    canDrag = true;
  }
  else
  {
    var child = window.getElementsByClassName("draggable")[0];
    if (child)
    {
      canDrag = true;

      var posX = event.clientX;
      var posY = event.clientY;

      var top =  child.getBoundingClientRect().top;
      var bottom =  child.getBoundingClientRect().bottom;

      console.log(posX + " " + posY + " | " + top + " " + bottom);
      var withinY = posY > top && posY < bottom;

      canDrag = withinY;
    }
  }


  if (canDrag)
  {
    currWindow = window;
    currWindow.shiftX = event.clientX - currWindow.getBoundingClientRect().left;
    currWindow.shiftY = event.clientY - currWindow.getBoundingClientRect().top;
    currWindow.style.position = 'absolute';
    currWindow.style.zIndex = 1000;
    document.body.append(currWindow);

    moveAt(event.pageX, event.pageY);
    // move the draggable on mousemove
    document.addEventListener('mousemove', onMouseMove, event);
  }
}

function mouseUp(event)
{
  document.removeEventListener('mousemove', onMouseMove);
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
    console.log("swag");
  }