var title;
var role;
var desc;
var roleTitle;
// var a_skills;
var a_skillWrappers;
var a_images;
var a_quotes;
var innerJson;
var leftSkills;
var anyQuotes;

var allowLottie = allowLottie();

// initPortfolioDetailVars();

function initPortfolioDetailVars(myPortfolioDetail)
{
  title = document.getElementsByClassName("port-det-title")[0];
  role = document.getElementsByClassName("port-det-role")[0];
  roleTitle = document.getElementsByClassName("role-title")[0];
  desc = document.getElementsByClassName("port-det-desc")[0];
  a_quotes = document.getElementsByClassName("portfolio-quote");
  for (let i = 0; i < a_quotes.length; i++)
  {
    let quote = a_quotes[i];
    quote.text = quote.getElementsByClassName("quote-text")[0];
    quote.image = quote.getElementsByClassName("quote-image")[0];
    quote.name = quote.getElementsByClassName("quote-cit")[0];
  }

  a_skillWrappers = document.getElementsByClassName("skills");
  for (let i = 0; i < a_skillWrappers.length; i++)
  {
    a_skillWrappers[i].skills = a_skillWrappers[i].getElementsByClassName("skill");
  }

  a_images = document.getElementsByClassName("port-det-image");
  for (let i = 0; i < a_images.length; i++)
  {
    let image = a_images[i];
    image.img = image.getElementsByClassName("img-fluid")[0];
  }
  innerJson = document.getElementById('json-data').innerHTML;
  populatePortfolioDetail(innerJson);

  // Attaching the event listener function to window's resize event
  window.addEventListener("resize", checkResize);
  checkResize();
}

function checkResize()
{
  // Get width and height of the window excluding scrollbars
  var w = document.documentElement.clientWidth;

  if (leftSkills)
  {
    if (w < 1300)
    {
      a_skillWrappers[0].style.display = "none";
      a_skillWrappers[1].style.display = "block";
      if (anyQuotes)
        a_quotes[0].style.display = "none";
    }
    else
    {
      a_skillWrappers[0].style.display = "block";
      a_skillWrappers[1].style.display = "none";
      if (anyQuotes)
        a_quotes[0].style.display = "block";
    }
  }
}


function populatePortfolioDetail(jsonFile)
{
  if (allowLottie)
  {
    var button = document.getElementsByClassName("back-button")[0];
    let backAnimController = bodymovin.loadAnimation({
      container: button.getElementsByClassName("lottie-anim")[0],
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: "../anims/back-button.json"
    });

    button.animController = backAnimController;
    button.addEventListener("mouseover", backHover, true);
    button.addEventListener("mouseout", backEndHover, true);
    button.addEventListener("click", backClick, true);

    backAnimController.addEventListener('DOMLoaded',
      function (e)
      {

        let normIcon = button.getElementsByClassName("back-button-image")[0];
        let lottieLink = button.getElementsByClassName("lottie-link")[0];
        let backImageWrapper = button.getElementsByClassName("back-image-wrapper")[0];
        // pointer-events: none;
        button.link = lottieLink;
        if (normIcon)
        {
          backImageWrapper.style.pointerEvents="none";
          normIcon.style.pointerEvents = "none";
          lottieLink.style.pointerEvents = "none";
          normIcon.style.opacity = "0.0";
        }

      }
    );
  }


  var path = window.location.pathname;
  var page = path.split("/").pop();
  lastDetailViewed = "/games/" + page;
  // document.scrollTo(0, 0);
  // window.alert(jsonFile);
  // var obj = JSON.parse(jsonFile);
  var json = JSON.parse(jsonFile);
  if (json)
  {
    title.innerHTML = json.title;
    role.innerHTML = json.role;
    desc.innerHTML = json.description;

    roleTitle.innerHTML = json.roleTitle;

    let quotesJson = json.quotes;
    for (let i = 0; i < a_quotes.length; i++)
    {
      let curQuote = a_quotes[i];
      anyQuotes = quotesJson.length > i;
      if (quotesJson.length > i)
      {
        curQuote.style.display = "block";
        let curQuoteJson = quotesJson[i];
        curQuote.text.innerHTML = curQuoteJson.quote;
        curQuote.image.src = curQuoteJson.picture;
        curQuote.name.innerHTML = curQuoteJson.title;
      }
      else
      {
        curQuote.style.display = "none";
      }
    }

    let skillsJson = json.skills;
    for (let i = 0; i < a_skillWrappers.length; i++)
    {
      let a_skills = a_skillWrappers[i].skills;
      for (let i = 0; i < a_skills.length; i++)
      {
        let curSkill = a_skills[i];
        if (skillsJson.length > i)
        {
          curSkill.style.display = "inline";
          let curSkillJson = skillsJson[i];
          curSkill.innerHTML = curSkillJson;
        }
        else
        {
          curSkill.style.display = "none";
        }
      }
    }

    leftSkills = json.leftSkills == true;
    if (json.leftSkills == true)
    {
      a_skillWrappers[0].style.display = "inline";
      a_skillWrappers[1].style.display = "none";
    }
    else
    {
      a_skillWrappers[0].style.display = "none";
      a_skillWrappers[1].style.display = "inline";
    }

    let imagesJson = json.pictures;
    for (let i = 0; i < a_images.length; i++)
    {
      let curImage = a_images[i];
      if (imagesJson.length > i)
      {
        curImage.style.display = "block";
        let curImageJson = imagesJson[i];
        if (i == 0)
        {
          curImage.href = json.video;
        }
        else
        {
          curImage.href = curImageJson;
        }

        curImage.img.src = curImageJson;
      }
      else
      {
        curImage.style.display = "none";
      }
    }
  }
}

function backHover()
{
  if (!this.active)
  {
    if (!this.hovered)
      this.animController.playSegments([0, 13], true);

    this.hovered = true;
  }
}

function backEndHover()
{
  if (!this.active)
  {
    this.hovered = false;
    this.animController.playSegments([60, 66], true);
  }
}

function backClick()
{
  let start = (30 * 3) + 27;
  duration = 24;
  if (!this.active)
  {
    this.active = true;
    this.animController.playSegments([start, start + duration]);
    var button = this;
    setTimeout(function()
    {
      button.link.click();
    }, 450);
  }
}
