// DOM selecting
const url = "http://api.tvmaze.com/singlesearch/shows?q=";
const castUrl = " http://api.tvmaze.com/shows/";
const noImg = "https://image.flaticon.com/icons/png/512/37/37943.png";
const errorMsg = document.querySelector(".error");
const loading = document.querySelector(".loading");
const searchBtn = document.querySelector(".search-btn");
const searchedTerm = document.querySelector(".searched-term");
// Show Info Tab
const infoCard = document.querySelector(".info-card");
const tabShowName = document.querySelector(".tab-show-name");
const showImg = document.querySelector(".card-img-top");
const cardTitle = document.querySelector(".card-title");
const cardText = document.querySelector(".card-text");
const showSite = document.querySelector(".show-website");
const nextEpisode = document.querySelector(".next-ep");
// Cast Tab
const castImg = document.querySelectorAll(".cast-img");
const castName = document.querySelectorAll(".cast-name");
const castCharacter = document.querySelectorAll(".cast-character");

loading.style.display = "none";
infoCard.style.display = "none";
showSite.style.display = "none";

//this function displays the error flash message
const displayErrorMsg = () => {
  errorMsg.classList.add("hidden");
  loading.style.display = "none";
  infoCard.style.display = "none";
  errorMsg.innerHTML += `<div class="alert alert-danger alert-dismissible 
       fade show" role="alert">
       Show Not Found - Please Try Again!
     </div>`;
};
// Summary Tab
const displayInfo = (data) => {
  infoCard.style.display = "";
  tabShowName.textContent = data.name;
  showImg.setAttribute("src", data.image.medium);
  cardTitle.textContent = data.name;
  let summary = data.summary.replace(
    /<p>|<\/p>|<b>|<\/b>|<em>|<\/em>|<i>|<\/i>/gi,
    ""
  );
  summary = summary.substring(0, 200);
  cardText.textContent = `${summary} ....`;

  if (data.officialSite != null) {
    showSite.style.display = "";
    showSite.href = data.officialSite;
  }

  if (data.status === "Running") {
    const time = data.schedule.time;
    const days = data.schedule.days;
    let sched = "Schedule: On ";
    days.forEach((day) => {
      sched += `${day},`;
    });
    sched += `@ ${time}`;
    nextEpisode.textContent = sched;
  } else {
    nextEpisode.textContent = "Show Ended";
  }
};
const displayCast = async (id) => {
  try {
    const response = await fetch(`${castUrl}${id}/cast`);
    const json = await response.json();

    //set all the cast tab attributes to empty strings
    for (let i = 0; i < 6; i++) {
      castImg[i].setAttribute(
        "src",
        "https://image.flaticon.com/icons/png/512/37/37943.png"
      );
      castName[i].textContent = "";
      castName[i].setAttribute("href", "#");
      castCharacter[i].textContent = "";
    }
    /*iterate over json response and if not null, displays the image, name
   and character's name
  */
    for (let i = 0; i < 6; i++) {
      if (json[i].person.image != null) {
        castImg[i].setAttribute("src", json[i].person.image.medium);
      }
      if (json[i].person.name != null) {
        castName[i].textContent = json[i].person.name;
        castName[i].setAttribute("href", json[i].person.url);
      }
      if (json[i].character.name != null) {
        castCharacter[i].textContent = json[i].character.name;
      }
    }
  } catch (e) {
    console.log(e);
  }
};
const getShowInfo = async (input) => {
  try {
    const response = await fetch(url + input);
    const json = await response.json();
    // console.log(json);
    displayInfo(json);
    displayCast(json.id);
    loading.style.display = "none";
  } catch {
    displayErrorMsg();
  }
};

searchBtn.addEventListener("click", (e) => {
  loading.style.display = "";
  errorMsg.innerHTML = "";
  errorMsg.classList.remove("hidden");

  const searched = searchedTerm.value;
  searchedTerm.value = "";
  getShowInfo(searched);
  e.preventDefault();
});
