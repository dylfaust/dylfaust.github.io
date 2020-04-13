var stallMainPage = false;
var loadingFrames = [24, 27, 32, 35, 40, 44, 47, 52, 55, 59];
var outroAnim = [59, 30 * 5 + 6];
var loadIndex = -1;
var outroState = 0;
var outroStateFrames = [3 * 30, 5 * 30, outroAnim[1] - 1];

var lastLinkClicked;

var loadDone = false;
var timerDone = false;
var hasPlayed = false;

var lastTimeAnimated = -1;

const page = {
    DETAIL: 'detail',
    MAIN: 'main',
    MAINLOGO: 'main-logo',
    ABOUT: 'about',
    PORTFOLIO: 'portfolio',
    RESUME: 'resume'
}

// var button = document.getElementsByClassName("back-button")[0];
let logoAnim = document.getElementById("logo-anim");
let loadAnimController;
let allowLogoAnims = allowLottie();

if (logoAnim)
{
    stallMainPage = true;

    let state = getPageState();
    if (state == page.MAINLOGO && allowLogoAnims)
    {
        loadAnimController = bodymovin.loadAnimation({
            container: logoAnim,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: "../anims/logo-anim.json"
        });
        // loadAnimController.setSpeed(0.1);
        loadAnimController.addEventListener("DOMLoaded",
            function ()
            {
                loadDone = true;
                attemptPlayLogo();
            });

        setTimeout(function()
        {
            timerDone = true;
            attemptPlayVideo();
        }, 500);


    }
    else
    {
        logoOutroFrame(null, true);
    }
}

function attemptPlayVideo()
{
    if (loadDone && timerDone && !hasPlayed)
    {
        hasPlayed = true;
        loadAnimController.playSegments([0, 22], false);
        loadAnimController.addEventListener("complete", startLoading);
    }
}

function allowLottie()
{
    return window.navigator.userAgent.toLowerCase().indexOf("edge") <= -1;
}

function getPageState()
{
    let pageState;
    if (lastLinkClicked == null)
    {
        let currUrl = window.location.href;
        if (currUrl.indexOf("/index") != -1)
            pageState = page.MAIN;
        else if (currUrl.indexOf("/about") != -1)
            pageState = page.ABOUT;
        else if (currUrl.indexOf("/portfolio") != -1)
            pageState = page.PORTFOLIO;
        else if (currUrl.indexOf("/resume") != -1)
            pageState = page.RESUME;
        else if (currUrl.indexOf("/games") != -1)
            pageState = page.DETAIL;
        else
            pageState = page.MAINLOGO;
    }

    // Cheap
    else
    {
        if (lastLinkClicked == "/index.html")
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

// MIT license

(function ()
{
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x)
    {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element)
        {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id)
        {
            clearTimeout(id);
        };
}());

function startLoading()
{
    loadAnimController.removeEventListener("complete", startLoading);
    requestAnimationFrame(loadingAnim);
}

function loadingAnim(timestamp)
{
    let timeSince = timestamp - lastTimeAnimated;
    if (timeSince > 50.0 || lastTimeAnimated == -1)
    {
        lastTimeAnimated = timestamp;
        loadAnimController.goToAndStop(loadingFrames[0], true);
        let desiredIndex = (Pace.bar.progress / 10) - 1;
        if (desiredIndex > loadIndex)
        {
            loadIndex += 1;
            loadAnimController.goToAndStop(loadingFrames[loadIndex], true);
        }

        if (loadIndex == loadingFrames.length - 1)
        {
            cancelAnimationFrame(loadingAnim);
            playOutro();
        }
        else
        {
            requestAnimationFrame(loadingAnim);
        }
    }
    else
    {
        requestAnimationFrame(loadingAnim);
    }
}

function playOutro()
{
    loadAnimController.playSegments(outroAnim, true);
    setTimeout(function ()
    {
        loadAnimController.addEventListener("enterFrame", logoOutroFrame);
    }, 500);
}

function logoOutroFrame(event, forceStates = false)
{
    let curFrame = event != null ? event.currentTime + outroAnim[0] : 0;

    if (outroState < outroStateFrames.length || forceStates)
    {
        let frameToCheck = outroStateFrames[outroState];
        if (curFrame >= frameToCheck || forceStates)
        {
            if (outroState == 0 || forceStates)
            {
                let taskbarLine = document.getElementById("taskbar-line");
                taskbarLine.classList.remove("line-hidden");

                if (forceStates)
                    taskbarLine.classList.add("line-reveal-quick");

            }
            if (outroState == 1 || forceStates)
            {
                stallMainPage = false;
                let taskbarLine = document.getElementById("taskbar-contents");
                if (taskbarLine.loaded)
                {
                    taskbarLine.classList.remove("taskbar-hidden");
                }
                // let windowBg = document.getElementsByClassName("background-gradient")[0];
                // windowBg.classList.remove("background-hidden");

            }
            if (outroState == 2 || forceStates)
            {
                if (loadAnimController)
                {
                    loadAnimController.removeEventListener("enterFrame", logoOutroFrame);
                }

                let logo = document.getElementById("logo-container");
                logo.classList.remove("logo-hidden");
                logo.classList.add("logo-reveal");

                if (forceStates)
                    logo.classList.add("reveal-instant");

                let revealBgDelay = forceStates ? 0 : 200;
                let windowsDelay = forceStates ? 0 : 200;

                setTimeout(function ()
                {

                    let windowBg = document.getElementsByClassName("background-gradient")[0];
                    windowBg.classList.remove("background-hidden");

                    if (forceStates)
                        windowBg.classList.add("reveal-instant");

                    let stars = document.getElementById("stars-reveal-container");
                    stars.classList.remove("stars-hidden");

                    if (forceStates)
                        stars.classList.add('reveal-instant');

                    let starsFgAnim = document.getElementById("stars-fg-wrapper");
                    starsFgAnim.classList.add("stars-anim");

                    attemptPlayVideo(true);
                    setTimeout(function ()
                    {
                        let revealWindows = document.getElementsByClassName("window");
                        let i = 0;

                        let revealWindow = revealWindows[i];

                        revealWindow.classList.remove("window-hidden");

                        revealWindow.classList.add("window-reveal");
                        i++;

                        let overlay = document.getElementById("youtube-overlay");

                        overlay.classList.add("yt-overlay-hide");

                        let windowRevealInterval = setInterval(function ()
                        {
                            revealWindow = revealWindows[i];

                            revealWindow.classList.remove("window-hidden");

                            revealWindow.classList.add("window-reveal");

                            // revealWindow.style.animationDelay = 1*i + "s";

                            i++;

                            if (i == revealWindows.length)
                            {
                                clearInterval(windowRevealInterval);
                            }
                        }, 100);
                    }, windowsDelay);
                }, revealBgDelay);
            }

            outroState += 1;
        }
    }
}