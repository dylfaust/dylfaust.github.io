var bounceBg = document.getElementById("bounce-bg");

var x = 0.0;
var y = 0.0;
var startAngleX = 0.3;
var startAngleY = 0.1;
var angleX = startAngleX;
var angleY = startAngleY;
var speed = 0.5;

var timeWhenLastUpdate;

bounceBg.style.position = "absolute";

function step(startTime) 
{

  let dt = startTime - timeWhenLastUpdate;
  timeWhenLastUpdate = startTime;

  if (dt)
  {
    if ((x + $(bounceBg).width()) >= window.innerWidth)
      angleX = (startAngleX * -1.0);
    else if (x <= 0.0)
      angleX = startAngleX;

    if (y +  $(bounceBg).height() >= window.innerHeight)
      angleY = (startAngleY * -1.0);
    else if (y <= 0.0)
      angleY = startAngleY;


    let changeX = (angleX * speed * dt);
    let changeY = (angleY * speed * dt);

    x += changeX;
    y += changeY;

    bounceBg.style.left = x + 'px';
    bounceBg.style.top = y + 'px';
  }

  requestAnimationFrame(step);
}

requestAnimationFrame(step);