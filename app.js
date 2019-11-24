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
  document.getElementById("card-img").setAttribute("src", json.image.medium);
  document.getElementById("card-title").textContent = json.name;
  document.getElementById("card-text").textContent = json.summary;
  document.getElementById("text-muted").textContent += json.rating.average;
  document.getElementById("container").style.visibility = "visible";
};
