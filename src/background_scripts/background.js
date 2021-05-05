/* Retrieve any previously set cookie and send to content script */

function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

function cookieUpdate() {
  getActiveTab().then((tabs) => {
    //get any previously set cookie for the current tab

    var gettingCookies = browser.cookies.get({
      // tabs[0].url requires the `tabs` permission or a matching host permission.
      url: tabs[0].url,
      name: "appearancePicker",
    });
    gettingCookies.then((cookie) => {
      if (cookie) {
        var cookieVal = JSON.parse(cookie.value);
        browser.tabs.sendMessage(tabs[0].id, { image: cookieVal.image });
        browser.tabs.sendMessage(tabs[0].id, { word: cookieVal.word });
      }
    });
  });
}

// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);

// //pikachou
// // Perform a GET request to the API to retrieve a random Pikachu image link.
// // Listen to messages in our extension
// browser.runtime.onMessage.addListener(function (
//   message,
//   sender,
//   senderResponse
//   // Callback function to call (at most once) when you have a response
// ) {
//   if (message.msg === "image") {
//     // Check if the message is to get the image URL.
//     // This will use the msg attribute we passed when we sent the message in contentScript
//     fetch("https://some-random-api.ml/img/panda")
//       //We're accessing a website that, instead of rendering a web page, renders a string of information
//       .then((response) => response.text())
//       //we get the response text,
//       //The .then()s allow us to see that information, then use it in our app.
//       // we parse the JSON object and call senderResponse which is the callback function specified by the sender of the message.
//       .then((data) => {
//         // We pass with it an object with the parameters data (the data received through the API call)
//         let dataObj = JSON.parse(data);
//         senderResponse({ data: dataObj, index: message.index });
//       })
//       .catch((error) => console.log("error", error));
//     return true; // Will respond asynchronously.
//   }
// });
