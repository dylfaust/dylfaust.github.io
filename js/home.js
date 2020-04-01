var emailButton = document.getElementsByClassName("email-button")[0];
var emailText = document.getElementsByClassName("email-text")[0];

emailButton.addEventListener("click", emailButtonClick, true);

let anim = document.getElementById("check-anim");

// button.link = buttonWrapper.getElementsByClassName("nav-link")[0];

var checkAnimController = bodymovin.loadAnimation({
  container: anim.getElementsByClassName("lottie-anim")[0],
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: "../anims/checkmark.json"
});


function emailButtonClick()
{
  emailButton.classList.add("button-collapse");
  let buttonText = emailButton.getElementsByClassName("taskbar-button-text")[0];
  buttonText.classList.add("button-text-collapse");

  emailButton.addEventListener("animationend", function ()
  {
    checkAnimController.play();
  });

  checkAnimController.addEventListener("complete", function ()
  {

    let origText = emailText.textContent;
    // let newString = "";
    let substring = origText;
    let i = origText.length;
    let interval = setInterval(function ()
    {
      substring = substring.substring(1, substring.length);
      let newString = new Array(origText.length - i + 2).join("-");
      emailText.textContent = newString + substring;

      i--;
      if (i == -1)
      {
        clearInterval(interval);

        let delay = setTimeout(function ()
        {
          emailText.textContent = "";
          // clearInterval(delay);
        }, 500);
      }
    }
      ,
      15
    );
    // emailText.style.opacity = "0%";
  });
  // checkAnimController.play();
}