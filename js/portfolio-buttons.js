// Init
var portfolioWindow = document.getElementById('large-window-portfolio');
let contentPanes = portfolioWindow.getElementsByClassName('large-window-body-wrapper');
var primaryContent = contentPanes[0];
var secondaryContent = contentPanes[1];

console.assert(contentPanes.length == 2, "portfolio window doesn't have two children!");

// Load html
$(secondaryContent).load(portfolioWindow.getAttribute('secondary-html'));

// Repeatedly check that content is done loading
window.setInterval(function ()
{
  if (primaryContent.doneLoading == true)
  {
    clearInterval();
    setupButtons();
  }
}, 5000);

function setupButtons()
{
    let buttons = primaryContent.getElementsByClassName('image-clip-wrapper');

  for (let i = 0; i < buttons.length; i++)
  {
    let curButton = buttons[i];
    curButton.addEventListener('click', portfolioButtonClicked);
    curButton.addEventListener('mouseenter')
  }
}