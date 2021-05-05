// reçoit message de background ici la valeur image et color
browser.runtime.onMessage.addListener(updateAppearance);

function updateAppearance(request) {
  var html = document.querySelector("html");
  var body = document.querySelector("body");
  if (request.image) {
    html.style.cursor = "url(" + request.image + "), auto";
    body.style.cursor = "url(" + request.image + "),, auto";
  } else if (request.reset) {
    html.style.cursor = "";
    body.style.cursor = "";
  }
}

// // pikachou
// let images = document.getElementsByTagName("img");
// // Loop through the image elements. On each element, we send a message to the background script. As you can tell, we are omitting the optional extensionId and options parameters. The first parameter is the message we are sending, and the second parameter is the callback function we want the background to execute after it fetches the image's link.
// for (let i = 0; i < images.length; i++) {
//   browser.runtime.sendMessage(
//     { msg: "image", index: i },
//     // This object has two properties. The first one is to specify what our message is about.
//     // The second property is to specify the index of the image the link is for in the images array.
//     function ({ data, index }) {
//       // (callback) data will be the data received from the API call, and index will be the index of the image in the array images.
//       images[index].src = data.link;
//       // Replace the image elements' src attributes with the links we retrieve.
//     }
//   );
// }
