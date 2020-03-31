const swup = new Swup(
  { animationSelector: '[class*="swup-transition-"]' }
);

const aboutLink = document.getElementById("about-a");
const resumeLink = document.getElementById("resume-link");
const portfolioLink = document.getElementById("portfolio-a");

updateLinks();
newPageLogic();

swup.on('animationOutDone', updateLinks);

swup.on('animationOutStart', disableClicks);

swup.on('contentReplaced', newPageLogic);

function disableClicks()
{
  // document.getElementById("taskbar-nav-buttons-container").style.pointerEvents = "none";
}

function getPageState()
{
  let pageState;
  if (lastLinkClicked == null)
  {
    let currUrl = window.location.href;
    if (currUrl.indexOf("/main") != -1)
      pageState = page.MAIN;
    else if (currUrl.indexOf("/about") != -1)
      pageState = page.ABOUT;
    else if (currUrl.indexOf("/portfolio") != -1)
      pageState = page.PORTFOLIO;
    else if (currUrl.indexOf("/resume") != -1)
      pageState = page.RESUME;
    else
      pageState = page.DETAIL;
  }

  // Cheap
  else
  {
    if (lastLinkClicked == "/main.html")
      pageState = page.MAIN;
    else if (lastLinkClicked == "/about.html")
      pageState = page.ABOUT;
    else if (lastLinkClicked == "/portfolio.html")
      pageState = page.PORTFOLIO;
    else if (lastLinkClicked == "/resume.html")
      pageState = page.RESUME;
    else
      pageState = page.DETAIL;
  }
  return pageState;
}

function updateLinks()
{
  // document.getElementById("taskbar-nav-buttons-container").style.pointerEvents = "auto";
  // let pageData = lastLinkClicked;

  let pageState = getPageState();

  if (aboutLink)
  {
    let resetLink = pageState == page.ABOUT;
    aboutLink.href = resetLink ? "/main.html" : "/about.html";
  }

  if (resumeLink)
  {
    let resetLink = pageState == page.RESUME;
    resumeLink.href = resetLink ? "/main.html" : "/resume.html";
  }

  if (portfolioLink)
  {
    let resetLink = pageState == page.PORTFOLIO || pageState == page.DETAIL;
    portfolioLink.href = resetLink ? "/main.html" : "/portfolio.html";
  }

  if (pageState != page.MAIN)
  {
    document.documentElement.classList.add('window-active');
  }
  else
  {
    document.documentElement.classList.remove('window-active');
  }

  if (lastLinkClicked == null)
  {
    if (pageState == page.DETAIL)
    {
      initPortfolioDetailVars();
    }

    initButtonAnims(pageState);
  }
}

function newPageLogic()
{
  let pageState = getPageState();

  if (pageState == page.DETAIL)
  {
    initPortfolioDetailVars();
  }
  else if (pageState == page.PORTFOLIO)
  {
    scrollToContainer();
  }
  else if (pageState == page.MAIN)
  {
    initDraggables();
  }
}
