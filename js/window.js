// var windows = document.getElementsByClassName("window");
for (let i = 0; i < draggables.length; i++)
{
  let closeButton = draggables[i].getElementsByClassName("close-button")[0];
  closeButton.window = draggables[i];

  closeButton.addEventListener("click", closeClick, false);
  closeButton.addEventListener("mousedown", closeMouseDown, false);
}

function closeClick()
{
  let elem = this.window;
  let outline = elem.getElementsByClassName("window-outline")[0];

  disableWindowDraggable(elem);
  // elem.parentNode.removeChild(elem);
  elem.classList.add("window-close");
  outline.classList.add("window-outline-close");
}

function closeMouseDown(event)
{
  event.stopPropagation();
}