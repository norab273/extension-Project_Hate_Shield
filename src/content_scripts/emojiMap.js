let dictionaryBadWords = new Map();
dictionaryBadWords.set("allumeuse", "🌸");
dictionaryBadWords.set("babtou", "🌸");
dictionaryBadWords.set("bamboula", "🌸");
dictionaryBadWords.set("bâtard", "🌸");
dictionaryBadWords.set("bâtard noir", "🌸");
dictionaryBadWords.set("bécasse", "🌸");
dictionaryBadWords.set("bimbo", "🌸");
dictionaryBadWords.set("blondasse", "🌸");
dictionaryBadWords.set("bobonne", "🌸");
dictionaryBadWords.set("bonasse", "🌸");
dictionaryBadWords.set("boniche", "🌸");
dictionaryBadWords.set("boucaque", "🌸");
dictionaryBadWords.set("bouffeur de chiens", "🌸");
dictionaryBadWords.set("bouffeuse de chiens", "🌸");
dictionaryBadWords.set("bougnoule", "🌸");
dictionaryBadWords.set("cagole", "🌸");
dictionaryBadWords.set("catin", "🌸");
dictionaryBadWords.set("chagnasse", "🌸");
dictionaryBadWords.set("chaudasse", "🌸");
dictionaryBadWords.set("chinetoque", "🌸");
dictionaryBadWords.set("ching chong", "🌸");
dictionaryBadWords.set("connard", "🌸");
dictionaryBadWords.set("connasse", "🌸");
dictionaryBadWords.set("crouille", "🌸");
dictionaryBadWords.set("débile", "🌸");
dictionaryBadWords.set("donzelle", "🌸");
dictionaryBadWords.set("enculé", "🌸");
dictionaryBadWords.set("enculer", "🌸");
dictionaryBadWords.set("fais pas ta meuf", "🌸");
dictionaryBadWords.set("fatma", "🌸");
dictionaryBadWords.set("FDP", "🌸");
dictionaryBadWords.set("fille de joie", "🌸");
dictionaryBadWords.set("fille facile", "🌸");
dictionaryBadWords.set("fille légère", "🌸");
dictionaryBadWords.set("fils de pute", "🌸");
dictionaryBadWords.set("fils de putain", "🌸");
dictionaryBadWords.set("fiotte", "🌸");
dictionaryBadWords.set("garce", "🌸");
dictionaryBadWords.set("gogole", "🌸");
dictionaryBadWords.set("gonzesse", "🌸");
dictionaryBadWords.set("gouine", "🌸");
dictionaryBadWords.set("grognasse", "🌸");
dictionaryBadWords.set("grosse vache", "🌸");
dictionaryBadWords.set("hystérique", "🌸");
dictionaryBadWords.set("macaque", "🌸");
dictionaryBadWords.set("mal-baisé", "🌸");
dictionaryBadWords.set("mal-baisée", "🌸");
dictionaryBadWords.set("mégère", "🌸");
dictionaryBadWords.set("nègre", "🌸");
dictionaryBadWords.set("négresse", "🌸");
dictionaryBadWords.set("négro", "🌸");
dictionaryBadWords.set("niakoué", "🌸");
dictionaryBadWords.set("niakouée", "🌸");
dictionaryBadWords.set("niaqué", "🌸");
dictionaryBadWords.set("niaquée", "🌸");
dictionaryBadWords.set("niaquoué", "🌸");
dictionaryBadWords.set("niaquouée", "🌸");
dictionaryBadWords.set("nigga", "🌸");
dictionaryBadWords.set("nigger", "🌸");
dictionaryBadWords.set("nique", "🌸");
dictionaryBadWords.set("nique ta mère", "🌸");
dictionaryBadWords.set("peau rouge", "🌸");
dictionaryBadWords.set("pédale", "🌸");
dictionaryBadWords.set("pédé", "🌸");
dictionaryBadWords.set("PD", "🌸");
dictionaryBadWords.set("pétasse", "🌸");
dictionaryBadWords.set("pimbêche", "🌸");
dictionaryBadWords.set("pouffiasse", "🌸");
dictionaryBadWords.set("pouffiasse", "🌸");
dictionaryBadWords.set("putain", "🌸");
dictionaryBadWords.set("putasse", "🌸");
dictionaryBadWords.set("pute", "🌸");
dictionaryBadWords.set("racoleuse", "🌸");
dictionaryBadWords.set("retourne dans ton pays", "🌸");
dictionaryBadWords.set("sale arabe", "🌸");
dictionaryBadWords.set("sale bridé", "🌸");
dictionaryBadWords.set("sale juif", "🌸");
dictionaryBadWords.set("sale juive", "🌸");
dictionaryBadWords.set("sale musulman", "🌸");
dictionaryBadWords.set("sale musulmane", "🌸");
dictionaryBadWords.set("sale noir", "🌸");
dictionaryBadWords.set("sale trans", "🌸");
dictionaryBadWords.set("salope", "🌸");
dictionaryBadWords.set("singe noir", "🌸");
dictionaryBadWords.set("tafiole", "🌸");
dictionaryBadWords.set("tantouze", "🌸");
dictionaryBadWords.set("tapette", "🌸");
dictionaryBadWords.set("tapineuse", "🌸");
dictionaryBadWords.set("tarlouse", "🌸");
dictionaryBadWords.set("tchoin", "🌸");
dictionaryBadWords.set("teubé", "🌸");
dictionaryBadWords.set("toubab", "🌸");
dictionaryBadWords.set("trainée", "🌸");
dictionaryBadWords.set("travelo", "🌸");
dictionaryBadWords.set("va manger du chien", "🌸");
dictionaryBadWords.set("vieille-peau", "🌸");
dictionaryBadWords.set("youpin", "🌸");
dictionaryBadWords.set("youpine", "🌸");

browser.runtime.onMessage.addListener(addNew);

addNew([]);
function addNew(words) {
  console.log("✽" + words);
  for (let word of words) {
    addToDictionary(word);
    console.log("word ❓: " + word);
  }
  replaceText(document.body);
}

//function that replaces letters with accents
String.prototype.sansAccents = function () {
  return this.replace(/[ùûü]/g, "u")
    .replace(/[îï]/g, "i")
    .replace(/[àâä]/g, "a")
    .replace(/[ôö]/g, "o")
    .replace(/[éèêë]/g, "e")
    .replace(/ç/g, "c");
};

let regexBadWords = new Map();

for (let element of dictionaryBadWords.keys()) {
  regexBadWords.set(
    element,
    new RegExp("\\b" + element.sansAccents() + "\\b", "gi")
  );
}

//gets active tab
function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

// The user can add new words to dictionnary

function addToDictionary(word) {
  if (word) {
    dictionaryBadWords.set(word, "🌸");
    regexBadWords.set(word, new RegExp("\\b" + word + "\\b", "gi"));
  }
}

function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && node.parentNode.nodeName === "TEXTAREA") {
      return;
    }

    let content = node.textContent;
    for (let [element, emoji] of dictionaryBadWords) {
      let regex = regexBadWords.get(element);

      if (!document.getElementById("badWordsList")) {
        content = content.sansAccents().replace(regex, emoji);
      }
    }

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
