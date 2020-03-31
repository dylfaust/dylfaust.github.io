var lastDetailViewed = null;

Element.prototype.documentOffsetTop = function ()
{
  return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
};

function scrollToContainer() 
{
  if (lastDetailViewed)
  {
    var imageLinks = document.getElementsByClassName('image-clip-wrapper');
    for (let i = 0; i < imageLinks.length; i++)
    {
      if (imageLinks[i].getAttribute("href") == lastDetailViewed)
      {
        let curImage = imageLinks[i];
        let offsetTop = curImage.documentOffsetTop() + (curImage.offsetParent ? curImage.offsetParent.documentOffsetTop() : 0);

        // offsetTop += curImage.style.transform.translateX
        if (curImage.classList.contains("is-right"))
          offsetTop += 50;


        let largeWindow = document.getElementsByClassName("large-window")[0];
        var top = offsetTop - (largeWindow.offsetHeight);
        largeWindow.scrollTo(0, top);
      }
    }
  }
}