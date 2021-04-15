/* Retrieve any previously set cookie and send to content script */

//tabs.query() Obtient tous les onglets qui ont les propriétés spécifiées, ou tous les onglets si aucune propriété n'est spécifiée.

function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

function cookieUpdate() {
  getActiveTab().then((tabs) => {
    /*get any previously set cookie for the current tab
    La méthode get() de l'API cookies récupère les informations d'un seul cookie, par son nom et son URL.
    l'API cookies permet aux extensions d'obtenir et de définir des cookies, et d'être averti quand ils changent. 
    Cookies are small items of data, each consisting of a name and a value, stored on behalf of a website by visitors’ web browsers. 
    In JavaScript, cookies can be accessed through the document.cookie object, but the interface provided by this object is very primitive.*/
    var gettingCookies = browser.cookies.get({
      // tabs[0].url requires the `tabs` permission or a matching host permission.
      url: tabs[0].url,
      name: "bgpicker",
    });
    gettingCookies.then((cookie) => {
      /* tabs.sendMessage() Envoi un message unique depuis le script d'arrière plan d'extension vers n'importe quel script de contenu concerné par l'extension et qui s'execute dans l'onglet spécifié.
      Ce message sera reçu dans script de contenu par n'importe quel gestionnaire d'évènements à l'écoute de l'évènement runtime.onMessage ou en utilisant l'argument sendResponse. */
      //L'étiquette du lien, c'est-à-dire son texte, est définie à l'aide du titre de l'onglet (ou de l'ID, s'il n'a pas de titre
      if (cookie) {
        var cookieVal = JSON.parse(cookie.value);
        browser.tabs.sendMessage(tabs[0].id, { image: cookieVal.image });
        browser.tabs.sendMessage(tabs[0].id, { color: cookieVal.color });
        browser.tabs.sendMessage(tabs[0].id, { tab: cookieVal.tab });
      }
    });
  });
}

// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);
// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);
