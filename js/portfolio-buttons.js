// console.log(this);
// window.alert(this);

var portfolioWindow = document.getElementById("large-window-portfolio");
let contentPanes = portfolioWindow.getElementsByClassName("large-window-body-wrapper");
var primaryContent = contentPanes[0];
var secondaryContent = contentPanes[1];

console.assert(contentPanes.length == 2, "portfolio window doesn't have two children!");

$(secondaryContent).load(portfolioWindow.getAttribute("secondary-html"));

window.alert(portfolioWindow.getAttribute("secondary-html-ref"));
// var largeButtons = this.getElementsByClassName("image-clip-wrapper");
// var activationButton = null;
// var curHtml = null;

// console.assert(windows.length == largeButtons.length);

// for (let i = 0; i < windows.length; i++)
// {
//   let curWindowDom = $(windows[i])[0];
//   curWindowDom.content = curWindowDom.getElementsByClassName("large-window-body-wrapper")[0];

//   largeButtons[i].window = curWindowDom;

//   $(curWindowDom.content).load(curWindowDom.getAttribute("data-active"));
// }