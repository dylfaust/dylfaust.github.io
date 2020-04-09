
var button = document.getElementsByClassName("back-button")[0];
let backAnimController = bodymovin.loadAnimation({
    container: document.getElementsByClassName("lottie-anim")[0],
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "../anims/logo-anim.json"
});

backAnimController.playSegments([0, 1000], true);