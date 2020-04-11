var stallMainPage = true;
var loadingFrames = [24, 27, 32, 35, 40, 44, 47, 52, 55, 59];
var outroAnim = [59, 30 * 5 + 6];
var loadIndex = -1;
var outroState = 0;
var outroStateFrames = [3 * 30, 5 * 30, 6 * 30];

var lastTimeAnimated = -1;

// var button = document.getElementsByClassName("back-button")[0];
let loadAnimController = bodymovin.loadAnimation({
    container: document.getElementById("logo-anim"),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "../anims/logo-anim.json"
});


loadAnimController.playSegments([0, 22], false);
loadAnimController.addEventListener("complete", startLoading);

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
    setTimeout(function(){
    loadAnimController.addEventListener("enterFrame", logoOutroFrame);}, 500);
}

function logoOutroFrame(event)
{
    let curFrame = event.currentTime + outroAnim[0];

    if (outroState < outroStateFrames.length)
    {
        let frameToCheck = outroStateFrames[outroState];
        if (curFrame >= frameToCheck)
        {
            if (outroState == 0)
            {
                let taskbarLine = document.getElementById("taskbar-line");
                taskbarLine.classList.remove("line-hidden");

            }
            if (outroState == 1)
            {
                let taskbarLine = document.getElementById("taskbar-contents");
                taskbarLine.classList.remove("taskbar-hidden");
                let windowBg = document.getElementsByClassName("background-gradient")[0];
                windowBg.classList.remove("background-hidden");

            }
            if (outroState == 2)
            {
                let taskbarLine = document.getElementById("taskbar-contents");
                taskbarLine.classList.remove("taskbar-hidden");

            }

            outroState += 1;
        }
    }
}