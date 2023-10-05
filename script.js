const accessKey = "xESoFG49rydwFvWk-smq2Y410QN16bcCnOVJjb246rg";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
const searchResult = document.querySelector(".search-result");
const closeBtn = document.querySelector(".close__button");
const imagePopup = document.querySelector(".popup-img");
const overlay = document.getElementById("overlay");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    const imagePop = document.createElement("img");
    const popupLink = document.createElement("a");

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);

    image.addEventListener("click", () => {
      imagePop.src = result.urls.small;
      imagePopup.appendChild(imagePop);
      imagePopup.classList.add("active");

      popupLink.href = result.links.html;
      popupLink.target = "_blank";
      popupLink.textContent = result.alt_description;
      popupLink.classList.add("popup-link");
      imagePopup.appendChild(popupLink);

      overlay.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
      imagePopup.classList.remove("active");
      overlay.classList.remove("active");
      imagePop.src = null;
      imagePopup.removeChild(imagePop);

      imagePopup.removeChild(popupLink);
    });
  });

  page++;

  if (page > 1) {
    showMore.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", (event) => {
  searchImages();
});

overlay.addEventListener("click", () => {
  imagePopup.forEach((modal) => {
    imagePopup.classList.remove("active");
    overlay.classList.remove("active");
  });
});
