const overwiew = document.querySelector(".overview") //profile information
const repoList = document.querySelector(".repo-list");
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
}

const userRepos = async function(){
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    displayRepo(repoData);
}

userRepos();

const displayRepo = function(repoData){
    for (const repo of repoData){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerText = `${repo.name}`;
        repoList.appendChild(li)
    }
}