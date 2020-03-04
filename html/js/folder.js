// -------------------------------------------
// Setup
// -------------------------------------------
{
  let taskbarButtons = document.getElementsByClassName("program-button");

// window.alert("swag");

for (let i = 0; i < taskbarButtons.length; i++)
{
  let programButton = taskbarButtons[i];

  icon = programButton.getElementsByClassName("program-icon")[0];
  icon.text = programButton.getElementsByClassName("program-text")[0];
  icon.fg = programButton.getElementsByClassName("folder-fg")[0];

  goAnimState(icon.fg, "folder-fg--normal");
  
  icon.addEventListener("mouseover", onMouseOverProgram, true);
  icon.addEventListener("mouseout", onMouseOutProgram, true);
  icon.addEventListener("click", onClickProgram, true);
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
    goAnimState(this, "program-icon--hover");
    goAnimState(this.text, "program-text--hover");
  }
}

function onMouseOutProgram()
{
  this.hovered = false;
  if (!this.active)
  {
    goAnimState(this, "program-icon--normal");
    goAnimState(this.text, "program-text--normal");
    goAnimState(this.fg, "folder-fg--normal");
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
    goAnimState(thisElement, "program-icon--active");
    goAnimState(thisElement.text, "program-text--active");
     goAnimState(thisElement.fg, "folder-fg--active");
  });
 // window.alert("click");
}