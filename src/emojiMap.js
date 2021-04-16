/*
 * This file contains the Map of word --> emoji substitutions.
 */

let dictionary = new Map();
dictionary.set("allumeuse", "🌸");
dictionary.set("babtou", "🌸");
dictionary.set("bamboula", "🌸");
dictionary.set("bâtard", "🌸");
dictionary.set("bâtard noir", "🌸");
dictionary.set("bécasse", "🌸");
dictionary.set("bimbo", "🌸");
dictionary.set("blondasse", "🌸");
dictionary.set("bobonne", "🌸");
dictionary.set("bonasse", "🌸");
dictionary.set("boniche", "🌸");
dictionary.set("boucaque", "🌸");
dictionary.set("bouffeur de chiens", "🌸");
dictionary.set("bouffeuse de chiens", "🌸");
dictionary.set("bougnoule", "🌸");
dictionary.set("cagole", "🌸");
dictionary.set("catin", "🌸");
dictionary.set("chagnasse", "🌸");
dictionary.set("chaudasse", "🌸");
dictionary.set("chinetoque", "🌸");
dictionary.set("ching chong", "🌸");
dictionary.set("connard", "🌸");
dictionary.set("connasse", "🌸");
dictionary.set("crouille", "🌸");
dictionary.set("débile", "🌸");
dictionary.set("donzelle", "🌸");
dictionary.set("enculé", "🌸");
dictionary.set("enculer", "🌸");
dictionary.set("fais pas ta meuf", "🌸");
dictionary.set("fatma", "🌸");
dictionary.set("FDP", "🌸");
dictionary.set("fille de joie", "🌸");
dictionary.set("fille facile", "🌸");
dictionary.set("fille légère", "🌸");
dictionary.set("fils de pute", "🌸");
dictionary.set("fils de putain", "🌸");
dictionary.set("fiotte", "🌸");
dictionary.set("garce", "🌸");
dictionary.set("gogole", "🌸");
dictionary.set("gonzesse", "🌸");
dictionary.set("gouine", "🌸");
dictionary.set("grognasse", "🌸");
dictionary.set("grosse vache", "🌸");
dictionary.set("hystérique", "🌸");
dictionary.set("macaque", "🌸");
dictionary.set("mal-baisé", "🌸");
dictionary.set("mal-baisée", "🌸");
dictionary.set("mégère", "🌸");
dictionary.set("nègre", "🌸");
dictionary.set("négresse", "🌸");
dictionary.set("négro", "🌸");
dictionary.set("niakoué", "🌸");
dictionary.set("niakouée", "🌸");
dictionary.set("niaqué", "🌸");
dictionary.set("niaquée", "🌸");
dictionary.set("niaquoué", "🌸");
dictionary.set("niaquouée", "🌸");
dictionary.set("nigga", "🌸");
dictionary.set("nigger", "🌸");
dictionary.set("nique", "🌸");
dictionary.set("nique ta mère", "🌸");
dictionary.set("peau rouge", "🌸");
dictionary.set("pédale", "🌸");
dictionary.set("pédé", "🌸");
dictionary.set("PD", "🌸");
dictionary.set("pétasse", "🌸");
dictionary.set("pimbêche", "🌸");
dictionary.set("pouffiasse", "🌸");
dictionary.set("pouffiasse", "🌸");
dictionary.set("putain", "🌸");
dictionary.set("putasse", "🌸");
dictionary.set("pute", "🌸");
dictionary.set("racoleuse", "🌸");
dictionary.set("retourne dans ton pays", "🌸");
dictionary.set("sale arabe", "🌸");
dictionary.set("sale bridé", "🌸");
dictionary.set("sale juif", "🌸");
dictionary.set("sale juive", "🌸");
dictionary.set("sale musulman", "🌸");
dictionary.set("sale musulmane", "🌸");
dictionary.set("sale noir", "🌸");
dictionary.set("sale trans", "🌸");
dictionary.set("salope", "🌸");
dictionary.set("singe noir", "🌸");
dictionary.set("tafiole", "🌸");
dictionary.set("tantouze", "🌸");
dictionary.set("tapette", "🌸");
dictionary.set("tapineuse", "🌸");
dictionary.set("tarlouse", "🌸");
dictionary.set("tchoin", "🌸");
dictionary.set("teubé", "🌸");
dictionary.set("toubab", "🌸");
dictionary.set("trainée", "🌸");
dictionary.set("travelo", "🌸");
dictionary.set("va manger du chien", "🌸");
dictionary.set("vieille-peau", "🌸");
dictionary.set("youpin", "🌸");
dictionary.set("youpine", "🌸");

browser.runtime.onMessage.addListener(addToDictionary);

let regexs = new Map();
for (let word of dictionary.keys()) {
  regexs.set(word, new RegExp(word + "[:space:]*", "gi"));
}

function addToDictionary(request) {
  console.log("avant if");
  if (request.color) {
    console.log("dans le if");
    dictionary.set(request.color, "🌸");
    regexs.set(
      request.color,
      //new RegExp("^" + request.color + "$" + "[:space:]*", "gi")
      new RegExp(request.color + "[:space:]*", "gi")
    );
    replaceText(document.body);
    console.log(request.color);
    console.log(regexs);
  }
}

function replaceText(node) {
  console.log("replace text");
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && node.parentNode.nodeName === "TEXTAREA") {
      return;
    }

    let content = node.textContent;

    for (let [word, emoji] of dictionary) {
      let regex = regexs.get(word);

      content = content.replace(regex, emoji);
    }
    console.log("regexs:" + regexs.size);
    console.log("dictionary:" + dictionary.size);

    node.textContent = content;
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i]);
    }
  }
}

replaceText(document.body);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        replaceText(newNode);
      }
    }
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
