function setclock() {
  var clock = document.querySelector("#clock");
  var boob = new Date();
  let minutes = boob.getMinutes();
  minutes = minutes <= 9 ? '0' + minutes : minutes;
  time = boob.getHours() + ":" + minutes
  clock.innerText = time;
} setInterval(setclock, 100)

const links = document.querySelectorAll("li a");
links.forEach(link => {
  const img = document.createElement("img");
  img.setAttribute("height", "15px");
  img.setAttribute("width", "auto");
  img.setAttribute("src", `https://cdn.simpleicons.org/${link.textContent}/cdd6f4`);
  link.insertAdjacentElement("beforebegin", img);
});

var photo = document.querySelector("#foto");
photo.src = "photos/001.png";

const repoUrl = "repositoy-for-images";
const folderPath = "folder-in-repository";

const accessToken = "accessToken for your repository";

async function fetchFromGithub(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return await response.json();
}

async function loadFilesFromFolder() {
  const folderUrl = `${repoUrl}/contents/${folderPath}`;
  const files = await fetchFromGithub(folderUrl);
  return files.filter(file => file.type === "file");
}

function getRandomFile(files) {
  const index = Math.floor(Math.random() * files.length);
  return files[index];
}

async function updateImage() {
  const files = await loadFilesFromFolder();
  const randomFile = getRandomFile(files);
  const imageUrl = randomFile.download_url;
  const image = document.getElementById("foto");
  image.src = imageUrl;
}

setInterval(updateImage, 5000);

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  var query = document.getElementById("search-input").value;
  search(query);
});

function search(query) {
  var searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
  window.location.href = searchUrl;
}