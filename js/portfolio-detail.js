var title;
var role;
var desc;
var a_skills;
var a_images;
var a_quotes;
var portfolioDetail;

function initPortfolioDetailVars(myPortfolioDetail)
{
  portfolioDetail = myPortfolioDetail;

  // Repeatedly check that content is done loading
  var intervalId = window.setInterval(function ()
  {
    if (document.readyState === 'interactive' || document.readyState === 'complete')
    {
      clearInterval(intervalId);
      title = portfolioDetail.getElementsByClassName("port-det-title")[0];
      role = portfolioDetail.getElementsByClassName("port-det-role")[0];
      desc = portfolioDetail.getElementsByClassName("port-det-desc")[0];
      a_quotes = portfolioDetail.getElementsByClassName("portfolio-quote");
      for (let i = 0; i < a_quotes.length; i++)
      {
        let quote = a_quotes[i];
        quote.text = quote.getElementsByClassName("quote-text")[0];
        quote.image = quote.getElementsByClassName("quote-image")[0];
        quote.name = quote.getElementsByClassName("quote-cit")[0];
      }
      a_skills = portfolioDetail.getElementsByClassName("port-det-skill");
      for (let i = 0; i < a_skills.length; i++)
      {
        let skill = a_skills[i];
        let skillTitles = skill.getElementsByClassName("skill-title");
        skill.myTitle = skillTitles[0];
        skill.desc = skill.getElementsByClassName("skill-desc")[0];
      }
      a_images = portfolioDetail.getElementsByClassName("port-det-image");
      for (let i = 0; i < a_images.length; i++)
      {
        let image = a_images[i];
        image.img = image.getElementsByClassName("img-fluid")[0];
      }
    }
  }, 500);
}


function populatePortfolioDetail(jsonFile)
{
  portfolioDetail.scrollTo(0, 0);
  // window.alert(jsonFile);
  // var obj = JSON.parse(jsonFile);
  $.getJSON(jsonFile, function (json)
  {
    title.innerHTML = json.title;
    role.innerHTML = json.role;
    desc.innerHTML = json.description;

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
        curSkill.style.display = "list-item";
        let curSkillJson = skillsJson[i];
        curSkill.myTitle.innerHTML = curSkillJson.title;
        curSkill.desc.innerHTML = curSkillJson.desc;
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

  });
}