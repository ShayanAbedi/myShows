const API_URL = "http://api.tvmaze.com/search/shows?q=";
var getit = async () => {
  //   var imageshow = document.getElementById("showimg");
  var title = document.getElementsByClassName("card-title");
  var searched = document.getElementById("mysearch").value;
  const response = await fetch(API_URL + searched);
  const json = await response.json();
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      var val = json[key];
      var name = val.show.name;
      //   title.innerHTML(name[0]);
    }
  }
  //   const img = json[0].show.image.medium;
  //
  //   imageshow.setAttribute("src", img);
};
