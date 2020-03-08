// -------------------------------------------
// Setup
// -------------------------------------------

var test = true;

var folder = document.getElementById('program-icon-proc-anim');
var folderParent = document.getElementById("portfolio-spacer");
var folderContent = document.getElementById("portfolio-body");


var startLeft = null;
var startTop = null;

folder.button = folder.getElementsByClassName("window-button")[0];
folder.topbarText = folder.getElementsByClassName("topbar-text")[0];
folder.hoverAnim = document.getElementById("program-icon-svg-anim");
goAnimState(folder.button,"fade--off");
goAnimState(folder.topbarText,"fade--off");
goAnimState(folderContent,"fade--off");


var params = {
  container: document.getElementById("program-icon-svg-anim"),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: "https://assets2.lottiefiles.com/packages/lf20_mYP1kF.json"
};

var animData;
animData= bodymovin.loadAnimation(params);


// window.alert("swag");
{
  let programButtons = document.getElementsByClassName("program-button");
  for (let i = 0; i < programButtons.length; i++)
  {
    let programButton = programButtons[i];

    // var closeButton= 
    // folder.icon = programButton.getElementsByClassName("program-icon")[0];
    folder.text = document.getElementById("portfolio-text");
    folder.parentButton = programButton;
    // folder.button.folder = folder;
  // icon.fg = programButton.getElementsByClassName("folder-fg")[0];

  goAnimState(folder, "program-icon--normal");
  // goAnimState(folder.text, "program-text--normal");
  
  folder.addEventListener("mouseover", onMouseOverProgram, true);
  folder.addEventListener("mouseout", onMouseOutProgram, true);
  folder.addEventListener("click", onClickProgram, false);
}

}

if (test)
  onClickProgram();

// -------------------------------------------
// Funcs
// -------------------------------------------

function onMouseOverProgram()
{
  this.hovered = true;
  if (!this.active)
  {
    goAnimState(this.hoverAnim, "program-icon--hover");
    goAnimState(this.text, "program-text--hover");
  }
}

function onMouseOutProgram()
{
  this.hovered = false;
  if (!this.active)
  {
    goAnimState(this.hoverAnim, "program-icon--normal");
    goAnimState(this.text, "program-text--normal");
    // goAnimState(this.fg, "folder-fg--normal");
  }
}

function onClickProgram()
{
  let thisElement = this;
  if (test)
    thisElement = folder; 

  this.active = true;
  let posX = thisElement.parentButton.style.posX;
  let posY = thisElement.parentButton.style.posY;
  goAnimState(thisElement.hoverAnim, "program-icon--normal");
  // goAnimState(thisElement.parentButton, "origin-top-left");
  // posX -= thisElement.style.width/2.0;
  // posY -= thisElement.style.width/2.0;
  thisElement.parentButton.style.transformOrigin = "0 0"; 

   // goAnimState(thisElement, "program-icon--active");
  // this.style.transformOrigin.posX = posX;
  // this.style.transformOrigin.posY = posY;
  setTimeout(function() 
  {
    goAnimState(thisElement, "program-icon--active");
    goAnimState(thisElement.text, "program-text--active");

    animData.setDirection(1);
    animData.play();
    animData.addEventListener('complete', folderAnimBigComplete);
    // goAnimState(thisElement.fg, "folder-fg--active");
  });
 // window.alert("click");
}

function folderAnimBigComplete()
{
  makeWindowDraggable(folder, folderParent);

  if (startLeft == null)
  {
    startLeft = folder.style.left;
    startTop = folder.style.top;
  }

  folder.classList.add("no-transition-time");
  goAnimState(folder.button,"fade--in");
  folder.button.addEventListener("click", closeClick, true);

  folder.button.addEventListener("mousedown", onMouseDownClose, false);
  folder.button.addEventListener("mouseup", onMouseUpClose, false);
  goAnimState(folder.topbarText,"fade--in");
  goAnimState(folderContent,"fade--in");

  animData.removeEventListener('complete', folderAnimBigComplete);
}

function folderAnimSmallComplete()
{
  goAnimState(folder.text, "program-text--normal");
  animData.removeEventListener('complete', folderAnimSmallComplete);
}

function closeClick(event)
{
  // goAnimState(this.folder.parentButton, "origin-center");

  var thisElement = folder;

  disableWindowDraggable(folder);
  event.stopPropagation();
  // this.style.transformOrigin.posX = posX;
  // this.style.transformOrigin.posY = posY;
// goAnimState(thisElement, "program-icon--normal");

setTimeout(function() 
{
  animData.setDirection(-1);
  animData.play();
  animData.addEventListener('complete', folderAnimSmallComplete);
  thisElement.classList.remove("no-transition-time");
    // animData.addEventListener('complete', folderAnimBigComplete);
    goAnimState(thisElement, "program-icon--normal");
    folder.style.left = startLeft;
    folder.style.top = startTop;
    // goAnimState(thisElement.text, "program-text--normal");
    goAnimState(thisElement.button,"fade--off");
    goAnimState(thisElement.topbarText,"fade--off");
      goAnimState(folderContent,"fade--off");
  });
}

function onMouseDownClose(event)
{
  event.stopPropagation();
}
function onMouseUpClose()
{
}