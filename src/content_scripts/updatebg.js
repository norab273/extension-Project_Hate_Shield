// reçoit message de background ici la valeur image et color
browser.runtime.onMessage.addListener(updateBg);

function updateBg(request, sender, sendResponse) {
  var html = document.querySelector("html");
  var body = document.querySelector("body");
  if (request.image) {
    html.style.cursor = "url(" + request.image + "), auto";
    body.style.cursor = "url(" + request.image + "),, auto";
  }
  //else if (request.tab) {
  //   html.style.scrollbarColor = "red";
  //   html.style.MozScrollbarTrack = "background-color: rgb(46, 87, 221)";}
  else if (request.color) {
    html.style.backgroundColor = request.color;
    body.style.backgroundColor = request.color;
  } else if (request.reset) {
    html.style.cursor = "";
    html.style.backgroundColor = "";
    body.style.cursor = "";
    body.style.backgroundColor = "";
  }
}

document.body.style.borderTop = "30px solid purple";
