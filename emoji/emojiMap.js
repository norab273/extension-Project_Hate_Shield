/*
 * This file contains the Map of word --> emoji substitutions.
 */

/* exported sortedEmojiMap */

let dictionary = new Map();
dictionary.set("allumeuse", "🌸");
dictionary.set("babtou", "🌸");
dictionary.set("bamboula", "🌸");
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
dictionary.set("veille-peau", "🌸");
dictionary.set("youpin", "🌸");
dictionary.set("youpine", "🌸");

/*
 * After all the dictionary entries have been set, sort them by length.
 *
 * Because iteration over Maps happens by insertion order, this avoids
 * scenarios where words that are substrings of other words get substituted
 * first, leading to the longer word's substitution never triggering.
 *
 * For example, the 'woman' substitution would never get triggered
 * if the 'man' substitution happens first because the input term 'woman'
 * would become 'wo👨', and the search for 'woman' would not find any matches.
 */
let tempArray = Array.from(dictionary);
tempArray.sort((pair1, pair2) => {
  // Each pair is an array with two entries: a word, and its emoji.
  // Ex: ['woman', '👩']
  const firstWord = pair1[0];
  const secondWord = pair2[0];

  if (firstWord.length > secondWord.length) {
    // The first word should come before the second word.
    return -1;
  }
  if (secondWord.length > firstWord.length) {
    // The second word should come before the first word.
    return 1;
  }

  // The words have the same length, it doesn't matter which comes first.
  return 0;
});

// Now that the entries are sorted, put them back into a Map.
let sortedEmojiMap = new Map(tempArray);
