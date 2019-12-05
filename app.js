const apiUrl = "http://api.tvmaze.com/singlesearch/shows?q=";
const searchButton = document.querySelector(".searchButton");
const searched = document.getElementById("searchTerm");
const errormsg = document.querySelector(".error");
const loading = document.querySelector(".loading");
const card = document.getElementById("container");
const showCover = document.getElementById("card-img");
const showSummary = document.querySelector(".showSum");
const title = document.getElementById("c-title");
const description = document.getElementById("card-text");
const rating = document.querySelector(".rating");
const nextEp = document.querySelector(".nextEp");
const castBtn = document.querySelector(".cast");

loading.style.display = "none";
card.style.display = "none";

searchButton.addEventListener("click", e => {
  loading.style.display = "";
  errormsg.innerHTML = "";
  errormsg.classList.remove("hidden");
  const searchedTerm = searched.value;
  searched.value = "";
  callApi(searchedTerm);
  e.preventDefault();
});

const callApi = async input => {
  const response = await fetch(apiUrl + input); //make a GET request (by default) to the URL
  if (!response.ok) {
    dispalyFlashMsg();
  }
  const json = await response.json();
  displayInfo(json);
  nextEpInfo(json.id);
  loading.style.display = "none";
};

const dispalyFlashMsg = () => {
  errormsg.classList.add("hidden");
  loading.style.display = "none";
  card.style.display = "none";
  errormsg.innerHTML += `<div class="alert alert-danger alert-dismissible fade show" role="alert">
       Show Not Found - Please Try Again!
       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
     </div>`;
};

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
  let dataRating = data.rating.average;
  if (dataRating == null) {
    rating.textContent = "";
  } else {
    rating.textContent = "Rating: " + dataRating;
  }

  //   json.genres.forEach(element => {
  //   var genres = document.querySelector(".list-group");
  //   var entry = document.createElement("li");
  //   entry.classList.add("list-group-item");
  //   entry.style.width = "211px";
  //   entry.appendChild(document.createTextNode(element));
  //   genres.appendChild(entry);
  // });
};

const nextEpInfo = async id => {
  const response = await fetch(
    "http://api.tvmaze.com/shows/" + id + "?embed=nextepisode"
  );
  const json = await response.json();
  if (json.status === "Running") {
    let time = json.schedule.time;
    let days = json.schedule.days[0];
    nextEp.textContent = "Next Episode: " + days + " at " + time;
  } else {
    nextEp.textContent = "Show ended";
  }
};

showSummary.addEventListener("click", e => {
  castBtn.classList.remove("active");
  showSummary.classList.add("active");
  e.preventDefault();
});
castBtn.addEventListener("click", e => {
  showCast();
  e.preventDefault();
});

const showCast = () => {
  showSummary.classList.remove("active");
  castBtn.classList.add("active");
  title.textContent = "Cast";
};
