/* initialise variables scroll & cursor */

var cursorBtns = document.querySelectorAll(".cursor-container button");
var scrollBtns = document.querySelectorAll(".scroll-container button");
var colorPick = document.querySelector("input");
var reset = document.querySelector(".color-reset button");
var cookieVal = { image: "", color: "", tab: "" };

function getActiveTab() {
  //Obtient tous les onglets qui ont les propriétés spécifiées, ou tous les onglets si aucune propriété n'est spécifiée.
  //C'est une fonction asynchrone qui renvoie une Promise.
  return browser.tabs.query({ active: true, currentWindow: true });
}

/* apply backgrounds to buttons */
/* add listener so that when clicked, button applies background to page HTML */

for (var i = 0; i < cursorBtns.length; i++) {
  var imgName = cursorBtns[i].getAttribute("class");
  var cursorImg = "url('images/" + imgName + ".png')";
  cursorBtns[i].style.backgroundImage = cursorImg;

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
        name: "bgpicker",
        value: JSON.stringify(cookieVal),
      });
    });
  };
}

/* apply scroll to buttons */
/* add listener so that when clicked, button applies scroll to page HTML */

for (var i = 0; i < scrollBtns.length; i++) {
  var scrollName = scrollBtns[i].getAttribute("class");
  var scrollImg = "url('images/" + scrollName + ".png')";
  scrollBtns[i].style.backgroundImage = scrollImg;

  scrollBtns[i].onclick = function (e) {
    getActiveTab().then((tabs) => {
      var scrollName = e.target.getAttribute("class");
      var scrollURL = browser.extension.getURL(
        "popup/images/" + scrollName + ".png"
      );
      browser.tabs.sendMessage(tabs[0].id, { tab: scrollURL });

      cookieVal.tab = scrollURL;
      browser.cookies.set({
        url: tabs[0].url,
        name: "bgpicker",
        value: JSON.stringify(cookieVal),
      });
    });
  };
}

/* apply chosen color to HTML background */

colorPick.onchange = function (e) {
  getActiveTab().then((tabs) => {
    var currColor = e.target.value;
    browser.tabs.sendMessage(tabs[0].id, { color: currColor });

    cookieVal.color = currColor;
    browser.cookies.set({
      url: tabs[0].url,
      name: "bgpicker",
      value: JSON.stringify(cookieVal),
    });
  });
};

/* reset background */

reset.onclick = function () {
  getActiveTab().then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { reset: true });

    cookieVal = { image: "", color: "" };
    browser.cookies.remove({
      url: tabs[0].url,
      name: "bgpicker",
    });
  });
};

/* Report cookie changes to the console */

browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`Cookie changed:\n
              * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
              * Cause: ${changeInfo.cause}\n
              * Removed: ${changeInfo.removed}`);
});
