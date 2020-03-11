// var windows = document.getElementsByClassName("window");
for (let i = 0; i < draggables.length; i++)
{
  let closeButton = draggables[i].getElementsByClassName("close-button")[0];
  closeButton.window = draggables[i];

  closeButton.addEventListener("click", closeClick, false);
}

function closeClick()
{
  let elem = this.window;

  disableWindowDraggable(elem);
  elem.parentNode.removeChild(elem);
}