/* initialise variables */
var settings = document.querySelector(".settings");
var inputWord = document.querySelector(".new-word input");
var container = document.querySelector(".word-container");
var addBtn = document.querySelector(".add");

/* generic error handler */
function onError(error) {
  console.log(error);
}

/*  add event listeners to buttons */

addBtn.addEventListener("click", addUserWordtoStorage);

/* display previously-saved stored words on startup */

initialize();

function initialize() {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var wordKeys = Object.keys(results);
    for (let wordKey of wordKeys) {
      var curValue = results[wordKey];
      displayWord(wordKey, curValue);
    }
  }, onError);
}

/* Add a word to the storage */

function addUserWordtoStorage() {
  var word = inputWord.value;
  var gettingWords = browser.storage.local.get(null);
  gettingWords.then((result) => {
    addUserWordToArrayAndStringify(word, result["userWords"]);
  }, onError);
}

function addUserWordToArrayAndStringify(word, localStorage) {
  var words = getWordsFromStorageInArray(localStorage);
  words.push(word);
  var JSONwords = JSON.stringify(words);
  storeWordAndSendIt("userWords", JSONwords);
}

function getWordsFromStorageInArray(localStorage) {
  try {
    var words = JSON.parse(localStorage);
    return words;
  } catch (e) {
    console.error("Parsing error:", e);
    return [];
  }
}

//gets active tab
function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

let currentTabId;

getActiveTab()
  .then((tabs) => {
    console.log(tabs);
    console.log(tabs.find((tab) => tab.active).id);
    currentTabId = tabs.find((tab) => tab.active).id;
  })
  .catch((err) => console.log(err));

function storeWordAndSendIt(title, body) {
  var storingWord = browser.storage.local.set({ [title]: body });
  var hello = "Hello 🤓";
  storingWord.then(() => {
    displayWord(title, body);
    browser.tabs.sendMessage(currentTabId, { word: body });
  }, onError);
}

/* function to display a word in the word box */

function displayWord(title, body) {
  /* create word display box */
  var word = document.createElement("div");
  var wordDisplay = document.createElement("div");
  var wordPara = document.createElement("p");
  var deleteBtn = document.createElement("button");
  var clearFix = document.createElement("div");
  var title = "newWord" + Math.random();

  word.setAttribute("class", "word");

  wordPara.textContent = body;
  deleteBtn.setAttribute("class", "delete");
  deleteBtn.textContent = "Supprimer";
  clearFix.setAttribute("class", "clearfix");

  wordDisplay.appendChild(wordPara);
  wordDisplay.appendChild(deleteBtn);
  wordDisplay.appendChild(clearFix);

  word.appendChild(wordDisplay);

  /* set up listener for the delete functionality */

  deleteBtn.addEventListener("click", (e) => {
    const eventTarget = e.target;
    eventTarget.parentNode.parentNode.parentNode.removeChild(
      eventTarget.parentNode.parentNode
    );
    browser.storage.local.remove(title);
  });

  /* create word edit box */
  var wordEdit = document.createElement("div");
  var wordBodyEdit = document.createElement("textarea");
  var clearFix2 = document.createElement("div");

  var updateBtn = document.createElement("button");
  var cancelBtn = document.createElement("button");

  updateBtn.setAttribute("class", "update");
  updateBtn.textContent = "Update word";
  cancelBtn.setAttribute("class", "cancel");
  cancelBtn.textContent = "Cancel update";

  wordEdit.appendChild(wordBodyEdit);
  wordBodyEdit.textContent = body;
  wordEdit.appendChild(updateBtn);
  wordEdit.appendChild(cancelBtn);

  wordEdit.appendChild(clearFix2);
  clearFix2.setAttribute("class", "clearfix");

  word.appendChild(wordEdit);

  container.appendChild(word);
  wordEdit.style.display = "none";
}
