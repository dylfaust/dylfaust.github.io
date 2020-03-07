// -------------------------------------------
// Setup
// -------------------------------------------
{
  let taskbarButtons = document.getElementsByClassName("program-button");

  var params = {
  container: document.getElementById('program-icon-anim'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: "https://assets5.lottiefiles.com/packages/lf20_gBxadp.json"
};

var animData;
animData= bodymovin.loadAnimation(params);


// window.alert("swag");

for (let i = 0; i < taskbarButtons.length; i++)
{
  let programButton = taskbarButtons[i];

  programButton.icon = programButton.getElementsByClassName("program-icon")[0];
  programButton.text = programButton.getElementsByClassName("program-text")[0];
  // icon.fg = programButton.getElementsByClassName("folder-fg")[0];

  goAnimState(programButton.icon, "program-icon--normal");
  goAnimState(programButton.text, "program-text--normal");
  
  programButton.addEventListener("mouseover", onMouseOverProgram, true);
  programButton.addEventListener("mouseout", onMouseOutProgram, true);
  programButton.addEventListener("click", onClickProgram, true);
}
}

// -------------------------------------------
// Funcs
// -------------------------------------------

function onMouseOverProgram()
{
  this.hovered = true;
  if (!this.active)
  {
    goAnimState(this.icon, "program-icon--hover");
    goAnimState(this.text, "program-text--hover");
  }
}

function onMouseOutProgram()
{
  this.hovered = false;
  if (!this.active)
  {
    goAnimState(this.icon, "program-icon--normal");
    goAnimState(this.text, "program-text--normal");
    // goAnimState(this.fg, "folder-fg--normal");
  }
}

function onClickProgram()
{
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
animData.play();
    goAnimState(thisElement.icon, "program-icon--active");
    goAnimState(thisElement.text, "program-text--active");
    // goAnimState(thisElement.fg, "folder-fg--active");
  });
 // window.alert("click");
}