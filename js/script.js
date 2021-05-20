const overwiew = document.querySelector(".overview") //profile information
const repoList = document.querySelector(".repo-list");
const selectRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data"); 
const repos = document.querySelector(".repos")
const username = "Szo89";


const getUserInfo = async function(){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);    
    const data = await userInfo.json();
    //console.log(data);
    displayUserInfo(data);
};

getUserInfo();

const displayUserInfo = function(data){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
   `
   overwiew.append(div)
};

const userRepos = async function(){
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    const reposData = await fetchRepos.json();
    //console.log(repoData);
    displayRepo(reposData);
};

userRepos();

const displayRepo = function(reposData){
    for (const repo of reposData){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li)
    }
};

repoList.addEventListener("click", function(e){
    if(e.target.matches("h3")){
        const repoName = e.target.innerText;
        //console.log(repoName)        
        SpecificRepoInfo(repoName)
    }
});

const SpecificRepoInfo = async function(repoName){
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    //console.log(repoInfo)
    //creat an array of languagues - grab the languagues
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languagueData);
    //make a list of languagues
    const languages = [""];
    for(const language in languageData){
        languages.push(language)
    }
    //console.log(languagues);
    displayUserInfo(repoInfo, languages)
};

const displayRepoInfo = function(repoInfo, languages){
    repoData.innerHTML= "";    
    repoData.classList.remove(".hide");
    repos.classList.add(".hide");
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = 
    `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `
    repoData.append(infoDiv)
};