var settings = document.querySelector(".settings");

/* initialise variables */

var inputWord = document.querySelector(".new-note input");
var container = document.querySelector(".note-container");
var addBtn = document.querySelector(".add");

/*  add event listeners to buttons */

addBtn.addEventListener("click", addNote);

/* generic error handler */
function onError(error) {
  console.log(error);
}

/* display previously-saved stored notes on startup */

initialize();

function initialize() {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      displayNote(noteKey, curValue);
    }
  }, onError);
}

/* Add a note to the display, and storage */

function addNote() {
  var gettingWords = browser.storage.local.get("userWords");
  gettingWords.then((result) => {
    addWord(inputWord.value, result);
  }, onError);
  var noteTitle = "word" + Math.random();
  var noteBody = inputWord.value;
  var gettingItem = browser.storage.local.get(noteTitle);
  gettingItem.then((result) => {
    var objTest = Object.keys(result);
    if (objTest.length < 1 && noteBody !== "") {
      inputWord.value = "";
      storeNote(noteTitle, noteBody);
    }
  }, onError);
}

function addWord(word, localStorage) {
  var words = getWords(localStorage);
  words.push(word);
  var JSONwords = JSON.stringify(words);
  console.log("words :" + words);
  storeNote("userWords", JSONwords);
}

function getWords(localStorage) {
  try {
    var words = JSON.parse(localStorage);
    console.log("words get :" + words);
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

/* function to store a new note in storage */

function storeNote(title, body) {
  var storingNote = browser.storage.local.set({ [title]: body });
  storingNote.then(() => {
    displayNote(title, body);
    browser.tabs.sendMessage(currentTabId, { [title]: body });
  }, onError);
}

/* function to display a note in the note box */

function displayNote(title, body) {
  /* create note display box */
  var note = document.createElement("div");
  var noteDisplay = document.createElement("div");
  var notePara = document.createElement("p");
  var deleteBtn = document.createElement("button");
  var clearFix = document.createElement("div");
  var title = "newWord" + Math.random();

  note.setAttribute("class", "note");

  notePara.textContent = body;
  deleteBtn.setAttribute("class", "delete");
  deleteBtn.textContent = "Supprimer";
  clearFix.setAttribute("class", "clearfix");

  noteDisplay.appendChild(notePara);
  noteDisplay.appendChild(deleteBtn);
  noteDisplay.appendChild(clearFix);

  note.appendChild(noteDisplay);

  /* set up listener for the delete functionality */

  deleteBtn.addEventListener("click", (e) => {
    const eventTarget = e.target;
    eventTarget.parentNode.parentNode.parentNode.removeChild(
      eventTarget.parentNode.parentNode
    );
    browser.storage.local.remove(title);
  });

  /* create note edit box */
  var noteEdit = document.createElement("div");
  var noteBodyEdit = document.createElement("textarea");
  var clearFix2 = document.createElement("div");

  var updateBtn = document.createElement("button");
  var cancelBtn = document.createElement("button");

  updateBtn.setAttribute("class", "update");
  updateBtn.textContent = "Update note";
  cancelBtn.setAttribute("class", "cancel");
  cancelBtn.textContent = "Cancel update";

  noteEdit.appendChild(noteBodyEdit);
  noteBodyEdit.textContent = body;
  noteEdit.appendChild(updateBtn);
  noteEdit.appendChild(cancelBtn);

  noteEdit.appendChild(clearFix2);
  clearFix2.setAttribute("class", "clearfix");

  note.appendChild(noteEdit);

  container.appendChild(note);
  noteEdit.style.display = "none";
}
