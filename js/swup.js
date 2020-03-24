const swup = new Swup();

const aboutLink = document.getElementById("about-link");
const resumeLink = document.getElementById("resume-link");
const portfolioLink = document.getElementById("portfolio-link");

updateLinks();

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
    let resetLink = pageState == page.PORTFOLIO;
    portfolioLink.href = resetLink ? "/main.html" : "/portfolio.html";
  }

  if (pageState != page.INVALID && pageState != page.MAIN)
  {
    document.documentElement.classList.add('window-active');
  }
  else
  {
    document.documentElement.classList.remove('window-active');
  }

}