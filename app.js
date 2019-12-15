/*
Summary tab 
*/
const apiUrl = "http://api.tvmaze.com/singlesearch/shows?q=";
const searchButton = document.querySelector(".searchButton");
const searched = document.getElementById("searchTerm");
const errorMsg = document.querySelector(".error");
const loading = document.querySelector(".loading");
const card = document.getElementById("container");
const showCover = document.querySelector(".show-img");
const showSummary = document.querySelector(".showSum");
const title = document.getElementById("c-title");
const description = document.getElementById("card-text");
const showSite = document.querySelector(".site");
const rating = document.querySelector(".rating");
const nextEp = document.querySelector(".nextEp");

loading.style.display = "none";
card.style.display = "none";
showSite.style.display = "none";

searchButton.addEventListener("click", e => {
  loading.style.display = "";
  errorMsg.innerHTML = "";
  errorMsg.classList.remove("hidden");
  const searchedTerm = searched.value;
  searched.value = "";
  callApi(searchedTerm);
  e.preventDefault();
});

const callApi = async input => {
  //error handling - flash message will be displayed
  try {
    const response = await fetch(apiUrl + input);
    const json = await response.json();
    displayInfo(json);
    nextEpInfo(json.id);
    getCast(json.id);
    loading.style.display = "none";
  } catch {
    dispalyErrorMsg();
  }
};

//this function displays the error flash message
const dispalyErrorMsg = () => {
  errorMsg.classList.add("hidden");
  loading.style.display = "none";
  card.style.display = "none";
  errorMsg.innerHTML += `<div class="alert alert-danger alert-dismissible 
       fade show" role="alert">
       Show Not Found - Please Try Again!
       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
     </div>`;
};

//this function displays the title, image, summary, and rating for the show
const displayInfo = data => {
  card.style.display = "";
  showCover.setAttribute("src", data.image.medium);
  title.textContent = data.name;
  showSummary.textContent = data.name;

  let summary = data.summary.replace(
    /<p>|<\/p>|<b>|<\/b>|<em>|<\/em>|<i>|<\/i>/gi,
    ""
  );
  summary = summary.substring(0, 200);
  description.textContent = summary + "...";

  if (data.officialSite != null) {
    showSite.style.display = "";
    showSite.href = data.officialSite;
  }

  let dataRating = data.rating.average;
  if (dataRating == null) {
    rating.textContent = "";
  } else {
    rating.textContent = "Rating: " + dataRating;
  }
};

//api request to display the time and date of the next episode
const nextEpInfo = async id => {
  const response = await fetch(
    "http://api.tvmaze.com/shows/" + id + "?embed=nextepisode"
  );
  const json = await response.json();

  //check if the show still running - if not displays "Show ended"
  if (json.status === "Running") {
    let time = json.schedule.time;
    let days = json.schedule.days[0];
    nextEp.textContent = "Next Episode: " + days + " at " + time;
  } else {
    nextEp.textContent = "Show ended";
  }
};

/*
Cast tab 
*/
const castImgs = {
  0: document.querySelector(".cast-img-one"),
  1: document.querySelector(".cast-img-two"),
  2: document.querySelector(".cast-img-three")
};
const personNames = {
  0: document.querySelector(".cast-person-one"),
  1: document.querySelector(".cast-person-two"),
  2: document.querySelector(".cast-person-three")
};

const charNames = {
  0: document.querySelector(".cast-char-one"),
  1: document.querySelector(".cast-char-two"),
  2: document.querySelector(".cast-char-three")
};

//api request to get the cats of the show
const getCast = async id => {
  const response = await fetch(" http://api.tvmaze.com/shows/" + id + "/cast");
  const json = await response.json();

  //set all the cast tab attributes to empty strings
  for (let i = 0; i < 3; i++) {
    castImgs[i].setAttribute(
      "src",
      "https://image.flaticon.com/icons/png/512/37/37943.png"
    );
    personNames[i].textContent = "";
    personNames[i].setAttribute("href", "#");
    charNames[i].textContent = "";
  }

  /*iterate over json response and if not null, displays the image, name
   and character's name
  */
  for (let i = 0; i < 3; i++) {
    if (json[i].person.image != null) {
      castImgs[i].setAttribute("src", json[i].person.image.medium);
    }
    if (json[i].person.name != null) {
      personNames[i].textContent = json[i].person.name;
      personNames[i].setAttribute("href", json[i].person.url);
    }
    if (json[i].character.name != null) {
      charNames[i].textContent = json[i].character.name;
    }
  }
};
