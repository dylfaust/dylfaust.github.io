let stickyItem;
let myselfWrap;
let largeWindowStickyRef;

function resetForNewPage() {
  window.addEventListener("resize", adjustStickyTop);
  stickyItem = document.getElementsByClassName("custom-sticky-top")[0];
  largeWindowStickyRef = document.getElementsByClassName("large-window")[0];
  myselfWrap = document.getElementsByClassName("myself-wrap")[0];
  adjustStickyTop();
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
