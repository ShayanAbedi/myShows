// //   for (var key in json) {
// //     if (json.hasOwnProperty(key)) {
// //       var val = json[key];
// //       var name = val.show.name;
// //       console.log(name);
// //     }
// //   }

// const API_URL = "http://api.tvmaze.com/singlesearch/shows?q=";
// const response = await fetch(API_URL + searched);
//   // const json = await response.json();
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
  searchBtn.classList.toggle("close");
  input.classList.toggle("square");
};
searchBtn.addEventListener("click", expand);
input.addEventListener("keydown", e => {
  if (e.key == "Enter") {
    console.log(e.returnValue);
  }
});
