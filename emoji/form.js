//on crée une variable form, on va recuperer la valeur de son input.

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); //pour empecher le comportement par defaut qui est d'envoyer le form.
  const word = document.getElementById("input").value;
  //console.log(word);
  console.log(word);
});

//fonction qui add le word a notre dictionnaire créé dans emojiMap.js

//console.log(tempArray);

// //fonction qui active l'extension
// function enableTheme(e) {
//   browser.management.setEnabled(e.target.value, true);
//   e.preventDefault();
//   window.close();
// }

// //
// browser.management.getAll().then((extensions) => {
//   for (let extension of extensions) {
//     if (extension.type !== "theme") {
//       continue;
//     }
//     let option = document.createElement("option");
//     option.textContent = extension.name;
//     option.value = extension.id;
//     if (extension.enabled) {
//       option.selected = true;
//     }
//     themeList.appendChild(option);
//   }
// });

// form.addEventListener("submit", addWord);
