
var button = document.getElementsByClassName("back-button")[0];
let backAnimController = bodymovin.loadAnimation({
    container: document.getElementsByClassName("lottie-anim")[0],
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: "../anims/logo-anim.json"
});

backAnimController.playSegments([0, 2*30+2], true);