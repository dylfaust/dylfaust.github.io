let stickyItem;
let myselfWrap;
let largeWindowStickyRef;
let headshotImage;
let isAboutPage = false;

function testImageSizeKnown(){
  if(headshotImage.height && headshotImage.width)
  {
    adjustStickyTop();
    return true;
  }
  else if (isAboutPage)
  {
    setTimeout(testImageSizeKnown, 100); // check every 100 ms
    return false;
  }
}

function exitAboutPage() {
  clearTimeout(testImageSizeKnown, 100);
  isAboutPage = false;
}

function resetForNewPage(isAbout = false) {
  window.addEventListener("resize", adjustStickyTop);
  stickyItem = document.getElementsByClassName("custom-sticky-top")[0];
  largeWindowStickyRef = document.getElementsByClassName("large-window")[0];
  myselfWrap = document.getElementsByClassName("myself-wrap")[0];
  headshotImage = document.getElementById("about-me-image");

  if (isAbout)
  {
    isAboutPage = true;
    if (!testImageSizeKnown())
      adjustStickyTop();
  }
  else 
  {
    adjustStickyTop();
  }
}

function clearStickyTop()
{
  window.removeEventListener("resize", adjustStickyTop);
}

function adjustStickyTop() {
  
  // Get width and height of the window excluding scrollbars
  // var w = document.documentElement.clientHeight;

  // let stickyHeight = stickyItem.getBoundingClientRect().height;
  let windowHeight = largeWindowStickyRef.getBoundingClientRect().height;
  let wrapHeight = myselfWrap ? myselfWrap.getBoundingClientRect().height : stickyItem.getBoundingClientRect().height;

  let newTop = ((windowHeight - wrapHeight) / 2);
  stickyItem.style.top = newTop + "px";
}
