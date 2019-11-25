const API_URL = "http://api.tvmaze.com/singlesearch/shows?q=";
const errormsg = document.querySelector(".error");
const card = document.getElementById("container");
var getit = async () => {
  var searched = document.getElementById("searchTerm").value;
  const response = await fetch(API_URL + searched); //make a GET request (by default) to the URL
  if (!response.ok) {
    // throw new Error("Network response was not ok.");
    errormsg.innerHTML += `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    Show Not Found - Please Try Again! 
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
  }
  const json = await response.json();
  var summary = json.summary.replace(
    /<p>|<\/p>|<b>|<\/b>|<em>|<\/em>|<i>|<\/i>/gi,
    ""
  );
  summary = summary.substring(0, 200);
  document.getElementById("card-img").setAttribute("src", json.image.medium);
  document.getElementById("c-title").textContent = json.name;
  document.getElementById("card-text").textContent = summary + "...";
  document.getElementById("text-muted").textContent =
    "Rating: " + json.rating.average;
  document.getElementById("container").style.visibility = "visible";

  json.genres.forEach(element => {
    var genres = document.querySelector(".list-group");
    var entry = document.createElement("li");
    entry.classList.add("list-group-item");
    entry.style.width = "211px";
    entry.appendChild(document.createTextNode(element));
    genres.appendChild(entry);
  });
};
