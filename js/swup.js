const swup = new Swup();

const aboutLinkAbout = document.getElementById("about-link");
const resumeLinkAbout = document.getElementById("resume-link");
const portfolioLinkAbout = document.getElementById("portfolio-link");



swup.on('animationOutDone', updateLinks);

function updateLinks()
{
  // let pageData = lastLinkClicked;
  const page = {
    INVALID: 'invalid',
    MAIN: 'main',
    ABOUT: 'about',
    PORTFOLIO: 'portfolio',
    RESUME: 'resume'
  }
  let pageState;

  if (lastLinkClicked == "/main.html")
    pageState = page.MAIN;
  else if (lastLinkClicked == "/about.html")
    pageState = page.ABOUT;
  else if (lastLinkClicked == "/portfolio.html")
    pageState = page.PORTFOLIO;
  else if (lastLinkClicked == "/resume.html")
    pageState = page.RESUME;
  else
    pageState = page.INVALID;

  if (aboutLinkAbout)
  {
    let resetLink = pageState == page.ABOUT;
    aboutLinkAbout.href = resetLink ? "/main.html" : "/about.html";
  }

  if (resumeLinkAbout)
  {
    let resetLink = pageState == page.RESUME;
    resumeLinkAbout.href = resetLink ? "/main.html" : "/resume.html";
  }

  if (portfolioLinkAbout)
  {
    let resetLink = pageState == page.PORTFOLIO;
    portfolioLinkAbout.href = resetLink ? "/main.html" : "/portfolio.html";
  }
}