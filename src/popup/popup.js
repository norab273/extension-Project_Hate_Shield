/* initialise variables theme & cursor */

var cursorBtns = document.querySelectorAll(".cursor-container button");
var themeBtns = document.querySelectorAll(".theme-container button");
var wordPick = document.querySelector("input");
var reset = document.querySelector(".cursor-reset button");
var cookieVal = { image: "", word: "", theme: "" };
var settings = document.querySelector(".settings");

function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

/* add listener so that when clicked, button applies background to page HTML */

for (var i = 0; i < cursorBtns.length; i++) {
  var imgName = cursorBtns[i].getAttribute("class");
  var cursorImg = "url('images/" + imgName + ".png')";
  cursorBtns[i].style.backgroundImage = cursorImg;
  cursorBtns[i].style.backgroundRepeat = "no-repeat";

  cursorBtns[i].onclick = function (e) {
    getActiveTab().then((tabs) => {
      var imgName = e.target.getAttribute("class");
      var fullURL = browser.extension.getURL(
        "popup/images/" + imgName + ".png"
      );
      browser.tabs.sendMessage(tabs[0].id, { image: fullURL });

      cookieVal.image = fullURL;
      browser.cookies.set({
        url: tabs[0].url,
        name: "appearancePicker",
        value: JSON.stringify(cookieVal),
      });
    });
  };
}

/* apply theme to buttons */
/* add listener so that when clicked, button applies theme to page HTML */

// for (var i = 0; i < themeBtns.length; i++) {
//   var themeName = themeBtns[i].getAttribute("class");
//   var themeImg = "url('images/" + themeName + ".png')";
//   themeBtns[i].style.backgroundImage = themeImg;

//   themeBtns[i].onclick = function (e) {
//     getActiveTab().then((tabs) => {
//       var themeName = e.target.getAttribute("class");
//       var themeURL = browser.extension.getURL(
//         "popup/images/" + themeName + ".png"
//       );
//       browser.tabs.sendMessage(tabs[0].id, { tab: themeURL });

//       cookieVal.tab = themeURL;
//       browser.cookies.set({
//         url: tabs[0].url,
//         name: "appearancePicker",
//         value: JSON.stringify(cookieVal),
//       });
//     });
//   };
// }

/* apply chosen word to HTML background */

wordPick.onchange = function (e) {
  getActiveTab().then((tabs) => {
    var currWord = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, { word: currWord });

    cookieVal.word = currWord;
    browser.cookies.set({
      url: tabs[0].url,
      name: "appearancePicker",
      value: JSON.stringify(cookieVal),
    });
  });
};

/* reset background */

reset.onclick = function () {
  getActiveTab().then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { reset: true });

    cookieVal = { image: "", word: "" };
    browser.cookies.remove({
      url: tabs[0].url,
      name: "appearancePicker",
    });
  });
};

/* Report cookie changes to the console */

// browser.cookies.onChanged.addListener((changeInfo) => {
//   console.log(`Cookie changed:\n
//               * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
//               * Cause: ${changeInfo.cause}\n
//               * Removed: ${changeInfo.removed}`);
// });

/* Settings button*/

settings.onclick = function () {
  browser.runtime.openOptionsPage();
};
