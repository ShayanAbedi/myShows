// //   for (var key in json) {
// //     if (json.hasOwnProperty(key)) {
// //       var val = json[key];
// //       var name = val.show.name;
// //       console.log(name);
// //     }
// //   }

const API_URL = "http://api.tvmaze.com/singlesearch/shows?q=";
var getit = async () => {
  var searched = document.getElementById("searchTerm").value;
  const response = await fetch(API_URL + searched);
  const json = await response.json();
  var summary = json.summary.replace(/<p>|<\/p>|<b>|<\/b>|<em>|<\/em>/gi, "");
  summary = summary.substring(0, 200);
  document.getElementById("card-img").setAttribute("src", json.image.medium);
  document.getElementById("c-title").textContent = json.name;
  document.getElementById("card-text").textContent = summary + "...";
  document.getElementById("text-muted").textContent =
    "Rating: " + json.rating.average;
  document.getElementById("container").style.visibility = "visible";
};
