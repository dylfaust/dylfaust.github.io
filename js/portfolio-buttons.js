var lastDetailViewed = null;
// // Init
// var portfolioWindow = document.getElementById('large-window-portfolio');
// let contentPanes = portfolioWindow.getElementsByClassName('large-window-body-wrapper');
// var disableMouse = document.getElementsByClassName("large-window-wrapper")[0];
// var primaryContent = contentPanes[0];
// var secondaryContent = contentPanes[1];
// var buttons;
// var headers;
// var lastWindow;

// var fadeOutDelay = 200;
// var fadeOutInDelay = 200;

// var fadeInDelay = 200;

// console.assert(contentPanes.length == 2, "portfolio window doesn't have two children!");

// // Load html
// $(secondaryContent).load(portfolioWindow.getAttribute('secondary-html-ref'));

// initPortfolioDetailVars(secondaryContent);

// secondaryContent.style.opacity = '0%';

// // Repeatedly check that content is done loading
// var intervalId = window.setInterval(function ()
// {
//   if (primaryContent.loadStarted == true && (document.readyState === 'interactive' || document.readyState === 'complete'))
//   {
//     clearInterval(intervalId);
//     setupPortfolioButtons();
//   }
// }, 500);

// function setupPortfolioButtons()
// {
//   buttons = primaryContent.getElementsByClassName('image-clip-wrapper');
//   headers = primaryContent.getElementsByClassName('section-header');
//   let windows = primaryContent.getElementsByClassName('portfolio-slot-window');

//   for (let i = 0; i < buttons.length; i++)
//   {
//     let curButton = buttons[i];
//     curButton.window = windows[i];
//     curButton.addEventListener('click', portfolioButtonClicked);
//     curButton.addEventListener('mouseover', portfolioButtonHover);
//     curButton.addEventListener('mouseout', portfolioButtonExitHover);
//   }
//   console.log("done setting up portfolio buttons!");

//   let backButton = secondaryContent.getElementsByClassName('back-button')[0];
//   backButton.addEventListener('click', backButtonClicked);
// }

// function portfolioButtonClicked()
// {
//   populatePortfolioDetail(this.getAttribute("json-data"));

//   this.window.classList.remove("slow-trans");
//   this.window.classList.add("portfolio-slot-window-active");

//   for (let i = 0; i < buttons.length; i++)
//   {
//     let curWindow = buttons[i].window;
//     if (curWindow != this.window)
//     {
//       curWindow.classList.remove("slow-trans");
//       curWindow.classList.add("portfolio-slot-window-clear");
//     }
//   }

//   for (let i = 0; i < headers.length; i++)
//   {
//     let header = headers[i];
//     header.classList.remove("slow-trans");
//     header.classList.add("a-0-trans");
//   }
//   largeWindowWrapper.style.pointerEvents = "none";
//   lastWindow = this.window;
//   setTimeout(function ()
//   {
//     lastWindow.classList.add("a-0-trans");
//     lastWindow.classList.add("slow-trans");
//   }
//     , fadeOutDelay);

//     setTimeout(function ()
//   {
//     secondaryContent.classList.add('large-window-details-active');
//     largeWindowWrapper.style.pointerEvents = "auto";
//   }
//     , fadeOutDelay + fadeOutInDelay);
//   // secondaryContent.classList.add('large-window-details-active');
//   //  secondaryContent.style.zIndex = '9999';
// }

// function portfolioButtonHover()
// {

// }

// function portfolioButtonExitHover()
// {

// }

// function backButtonClicked()
// {
//   secondaryContent.classList.remove('large-window-details-active');
//   lastWindow.classList.remove("a-0-trans");
//   lastWindow.classList.remove("portfolio-slot-window-active");
//   // lastWindow.classList.remove("slow-trans");
//   // lastWindow.classList.remove("slow-trans");

//   setTimeout(function ()
//   {
//     for (let i = 0; i < buttons.length; i++)
//     {
//       let curWindow = buttons[i].window;
//       if (curWindow != lastWindow)
//       {
//         curWindow.classList.remove("portfolio-slot-window-clear");
//         curWindow.classList.add("slow-trans");
//       }
//     }

//     for (let i = 0; i < headers.length; i++)
//     {
//       let header = headers[i];
//       header.classList.remove("a-0-trans");
//       header.classList.add("slow-trans");
//     }

//     lastWindow = null;
//   }
//     , fadeInDelay);
// }

Element.prototype.documentOffsetTop = function ()
{
  return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
};

function scrollToContainer() 
{
  if (lastLinkClicked)
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