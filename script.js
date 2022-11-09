const pageBody = document.getElementById("root");

const searchInput = document.querySelector("input");

let pageContent = `
<input type="text">

`;

async function fetchGithubUser() {
  let response = await fetch("https://api.github.com/users");
  let data = await response.json();

  console.log(data);

  for (let i = 0; i < data.length; i++) {
    const infoButton = document.createElement("button");
    infoButton.innerText = "Show more";
    let counter = 0;
    const userRank = document.createElement("p");
    const isAdmin = document.createElement("p");

    infoButton.addEventListener("click", function () {
      counter++;
      if (counter % 2 !== 0) {
        infoButton.innerText = "Show less";
        userRank.innerText = "Rank: " + data[i].type;
        isAdmin.innerText = "Admin: " + data[i].site_admin;
        userInfoCard.appendChild(userRank);
        userInfoCard.appendChild(isAdmin);
      } else {
        infoButton.innerText = "Show more";
        userInfoCard.removeChild(userRank);
        userInfoCard.removeChild(isAdmin);
      }
    });

    const userInfoCard = document.createElement("div");
    userInfoCard.classList.add("userCard");
    const userNameTag = document.createElement("p");
    userNameTag.innerText = data[i].login;

    const userImg = document.createElement("img");
    userImg.src = data[i].avatar_url;

    userInfoCard.appendChild(userImg);
    userInfoCard.appendChild(userNameTag);
    userInfoCard.appendChild(infoButton);

    pageBody.appendChild(userInfoCard);
  }
}

window.addEventListener("load", (event) => {
  fetchGithubUser();
});

pageBody.innerHTML = pageContent;
