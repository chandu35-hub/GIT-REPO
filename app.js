let curPage = 1;
let perPage = 10;
let totalPages = 1;
const user = document.querySelector("#user");
const repoEle = document.getElementById("getRepo") 


function getRepos() {
  const username = document.getElementById("username").value;
  const url = `https://api.github.com/users/${username}/repos?page=${curPage}&per_page=${perPage}`;

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((userData) => {
      const userPhotoUrl = userData.avatar_url;
      document.getElementById("userPhoto").src = userPhotoUrl;

      const gitHubLink = document.getElementById("atag");
      gitHubLink.classList.add("atag");
      gitHubLink.setAttribute("href", `https://github.com/${username}`);
      gitHubLink.innerHTML = `https://github.com/${username}`;

      const userInfoElement = document.getElementById("userInfo");
      userInfoElement.innerHTML = `
                <p><strong> ${username || "Not available"}</strong></p>
                <p> ${userData.location || "Not available"}</p>
                <p> ${userData.followers || 0}</p>
                <p> ${userData.following || 0}</p>
            `;
    })
    .catch((error) => console.error(error));

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      repositories(data);
      updatePage();
    })
    .catch((error) => console.error(error));

    repoEle.remove();
}



function repositories(repos) {
  const reposList = document.getElementById("reposList");
  reposList.innerHTML = "";
  let totalNumerOfRepos = repos.length
  // console.log(repos.length)
  repos.forEach((repo) => {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repoItem");

    const userPhoto = document.createElement("img");
    userPhoto.src = ""; // Initial empty source, will be updated after fetching user information
    userPhoto.alt = "User Photo";
    userPhoto.style.width = "50px";

    const repoLink = document.createElement("a");
    repoLink.href = repo.html_url;
    repoLink.textContent = repo.name;

    const repoDescription = document.createElement("p");
    repoDescription.textContent =
      repo.description || "No description available.";

    const repoTech = document.createElement("button");
    repoTech.classList.add("repo-button");
    repoTech.textContent = ` ${repo.language || "Not specified"}`;

    repoItem.appendChild(repoLink);
    repoItem.appendChild(repoDescription);
    repoItem.appendChild(repoTech);
    reposList.appendChild(repoItem);
  });
}
user.appendChild(gitHubLink);

function nextPage() {
  curPage++;
  getRepos();
}

function prevPage() {
  if (curPage > 1) {
    curPage--;
  }
  getRepos();
}

function updatePage() {
  document.getElementById("curPage").innerText = `Current Page : ${curPage}`;
}

function updatePerPage() {
  perPage = parseInt(document.getElementById("perPage").value);
}
