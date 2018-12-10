const request = superagent

function addDom(avatar, name, nick, bio, company, location, email, blog) {

  var card = document.createElement("div");
  var image = document.createElement("img");
  var fullname = document.createElement("h1");
  var nickname = document.createElement("h3");
  var biography = document.createElement("p");
  var follow = document.createElement("button")
  var space = document.createElement("hr")
  var work = document.createElement("p");
  var city = document.createElement("p");
  var mail = document.createElement("p");
  var url = document.createElement("p");

  card.className = "content__card";
  image.src = avatar;
  image.className = "content__img";
  fullname.textContent = name;
  nickname.textContent = nick;
  biography.className = "content__bio"
  biography.textContent = bio;
  follow.innerHTML = "Follow"
  work.textContent = company;
  city.textContent = location;
  mail.textContent = email;
  url.textContent = blog;

  card.appendChild(image);
  card.appendChild(fullname);
  card.appendChild(nickname);
  card.appendChild(biography);
  card.appendChild(follow);
  card.appendChild(space);
  card.appendChild(work);
  card.appendChild(city);
  card.appendChild(mail);
  card.appendChild(url);

  document.querySelector(".content__profile").appendChild(card);
}

function addDomRepos(name, desc, language, forks, updated){


  var list = document.createElement("div");
  var repoName = document.createElement ("h2");
  var repoDesc = document.createElement ("p");
  var repoLang = document.createElement("span");
  var repoFork = document.createElement("span");
  var repoDate = document.createElement("span");
  var space = document.createElement("hr")

  list.className = "content__list";
  repoName.textContent = name;
  repoDesc.className = "content__desc"
  repoDesc.textContent = desc;
  repoLang.textContent = language;
  repoFork.textContent = forks;
  repoDate.textContent = updated;

  list.appendChild(repoName);
  list.appendChild(repoDesc);
  list.appendChild(repoLang);
  list.appendChild(repoFork);
  list.appendChild(repoDate);
  list.appendChild(space);

  document.querySelector(".content__repos").appendChild(list);
}

var input = document.querySelector('.menu__input');

input.addEventListener('keydown', function(e){
  var userInput = ""
    if(e.keyCode === 13){
      userInput = input.value
        userSearch(userInput)
    }
    console.log(userInput)
  })

request.get('https://api.github.com/users/matthiasak')
  .then( res => {

    var data = res.body

    addDom(data.avatar_url, data.name, data.login, data.bio, data.company, data.location, data.email, data.blog);
    })
  .catch(err => {
        console.log("Not found", err)
  });

request.get('https://api.github.com/users/matthiasak/repos')
    .then(serverRes => {

      serverRes.body.forEach(function(reposData){
      addDomRepos(reposData.name, reposData.description, reposData.language, reposData.forks_count, reposData.updated_at)
      })
    })
    .catch(err => {
          console.log("Not found", err)
    });

function userSearch(event){
  request.get('https://api.github.com/users/' + event)
  .then( res => {

    var data = res.body

    addDom(data.avatar_url, data.name, data.login, data.bio, data.company, data.location, data.email, data.blog);
    })

  request.get('https://api.github.com/users/' + event + '/repos')

  .then(serverRes => {

    serverRes.body.forEach(function(reposData){
    addDomRepos(reposData.name, reposData.description, reposData.language, reposData.forks_count, reposData.updated_at)
    })
  })
  .catch(err => {
        console.log("Not found", err)
  });
}
