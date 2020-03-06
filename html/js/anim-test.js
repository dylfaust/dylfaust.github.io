var item = document.getElementById("click-detect");
var anim = document.getElementById("lottie-test");

// var animation = bodymovin.loadAnimation({
//       container: document.getElementById('click-detect'),
//       renderer: 'svg',
//       loop: false,
//       autoplay: false,
//       path: "https://assets10.lottiefiles.com/packages/lf20_Sx1ypp.json"
// })

var params = {
  container: document.getElementById('folder-anim'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: "https://assets10.lottiefiles.com/packages/lf20_Sx1ypp.json"
};

var animData;
animData= bodymovin.loadAnimation(params);

item.addEventListener("click", click, true);
  // icon.addEventListener("mouseout", onMouseOutProgram, true);

  function click ()

  {
    // window.alert("swag");
    animData.play();

    this.active = true;
    let posX = this.style.posX;
    let posY = this.style.posY;
    goAnimState(this, "origin-top-left");
    posX -= this.style.width/2.0;
    posY -= this.style.width/2.0;
    this.style.transformOrigin = "0 0"; 

    var thisElement = this;
  // this.style.transformOrigin.posX = posX;
  // this.style.transformOrigin.posY = posY;
  setTimeout(function() {
    goAnimState(thisElement, "program-icon--active");
    goAnimState(thisElement.text, "program-text--active");
    goAnimState(thisElement.fg, "folder-fg--active");
  });
}