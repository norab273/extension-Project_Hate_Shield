// reçoit message de background ici la valeur image et color
browser.runtime.onMessage.addListener(updateAppearance);

function updateAppearance(request) {
  var html = document.querySelector("html");
  var body = document.querySelector("body");
  if (request.image) {
    html.style.cursor = "url(" + request.image + "), auto";
    body.style.cursor = "url(" + request.image + "),, auto";
  }
  //else if (request.tab) {
  //   html.style.scrollbarColor = "red";
  //   html.style.MozScrollbarTrack = "background-color: rgb(46, 87, 221)";}
  else if (request.reset) {
    html.style.cursor = "";
    body.style.cursor = "";
  }
}
