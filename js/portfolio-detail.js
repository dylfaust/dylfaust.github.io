var title;
var role;
var desc;
var roleTitle;
var a_skills;
var a_images;
var a_quotes;
var innerJson;

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
  a_skills = document.getElementsByClassName("skill");

  a_images = document.getElementsByClassName("port-det-image");
  for (let i = 0; i < a_images.length; i++)
  {
    let image = a_images[i];
    image.img = image.getElementsByClassName("img-fluid")[0];
  }
  innerJson = document.getElementById('json-data').innerHTML;
  populatePortfolioDetail(innerJson);
}


function populatePortfolioDetail(jsonFile)
{
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

    let imagesJson = json.pictures;
    for (let i = 0; i < a_images.length; i++)
    {
      let curImage = a_images[i];
      if (imagesJson.length > i)
      {
        curImage.style.display = "block";
        let curImageJson = imagesJson[i];
        curImage.img.src = curImageJson;
      }
      else
      {
        curImage.style.display = "none";
      }
    }
  }
}