const swup = new Swup({ animationSelector: '[class*="swup-transition-"]' });

const aboutLink = document.getElementById("about-a");
const resumeLink = document.getElementById("resume-link");
const portfolioLink = document.getElementById("portfolio-a");

updateLinks();
newPageLogic();

// AOS.init();

swup.on('animationOutDone', updateLinks);

swup.on('animationOutStart', disableClicks);

swup.on('contentReplaced', newPageLogic);

swup.on('popState', popState);

swup.on('pageView', pageLoaded);

window.addEventListener("load", pageLoaded);

function disableClicks() {
    // document.getElementById("taskbar-nav-buttons-container").style.pointerEvents = "none";
}

function updateLinks(popState = false) {
    // document.getElementById("taskbar-nav-buttons-container").style.pointerEvents = "auto";
    // let pageData = lastLinkClicked;

    let pageState = getPageState();

    // if (aboutLink)
    // {
    //   let resetLink = pageState == page.ABOUT;
    //   aboutLink.href = resetLink ? "/main.html" : "/about.html";
    // }

    // if (resumeLink)
    // {
    //   let resetLink = pageState == page.RESUME;
    //   resumeLink.href = resetLink ? "/main.html" : "/resume.html";
    // }

    // if (portfolioLink)
    // {
    //   let resetLink = pageState == page.PORTFOLIO || pageState == page.DETAIL;
    //   portfolioLink.href = resetLink ? "/main.html" : "/portfolio.html";
    // }

    if (pageState != page.PORTFOLIO && pageState != page.DETAIL)
        lastDetailViewed = null;

    if (pageState != page.MAIN && pageState != page.MAINLOGO) {
        document.documentElement.classList.add('window-active');
    } else {
        document.documentElement.classList.remove('window-active');
    }

    if (lastLinkClicked == null || popState) {
        if (pageState == page.DETAIL) {
            // initPortfolioDetailVars();
        }

        initButtonAnims(pageState);
    }
}

function pageLoaded() {
    let pageState = getPageState();

    if (pageState != page.MAIN && pageState != page.MAINLOGO) {

        // largeWindow = document.getElementsByClassName("large-window")[0];
        // let aosItems = document.getElementsByClassName("aos-item");
        // for (let i = 0; i < aosItems.length; i++) {
        //     let aosItem = aosItems[i];
        //     aosItem.classList.remove("aos-animate");
        // }

        AOS.init();
    };
}

function newPageLogic(event) {
    let transitioned = event!= null;

    let pageState = getPageState();

    setPortfolioActive(pageState == page.PORTFOLIO);

    if (pageState == page.DETAIL) 
        initPortfolioDetailVars();
    else
        disablePortfolioDetailVars();
    

    if (pageState == page.PORTFOLIO) {
        scrollToContainer();
    } else if (pageState == page.MAIN || pageState == page.MAINLOGO) {
        let infoButton = document.getElementById('about-link');
        let infoButtonContent = infoButton.getElementsByClassName("lottie-button-wrapper")[0];
        let aboutButtonAlias = document.getElementsByClassName("about-button-alias")[0];
        aboutButtonAlias.addEventListener("click", function() {
            infoButtonClick(event, infoButtonContent, true);
        });

        initDraggables();
        setupEmailButton();
        setupYtPlayer();

        if ((pageState == page.MAIN || pageState == page.MAINLOGO) && transitioned)
        {
            logoOutroFrame(null, true);
        }
    }

    if (pageState == page.ABOUT || pageState == page.DETAIL)
    {
        let isAbout = pageState == page.ABOUT;
        // HACK to delay by a millisecond as the data i get here is wrong
        setTimeout(function(){
        resetForNewPage(isAbout);}, 100);

        if (!isAbout)
        {
            exitAboutPage();
        }
    }
}

function popState() {
    lastLinkClicked = null;
    updateLinks(true);
}