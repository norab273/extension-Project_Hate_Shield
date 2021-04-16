/*
 * This file is responsible for performing the logic of replacing
 * all occurrences of each mapped word with its emoji counterpart.
 */

/*global sorteddictionary*/

/**
 * Substitutes emojis into text nodes.
 * If the node contains more than just text (ex: it has child nodes),
 * call replaceText() on each of its children.
 *
 * @param  {Node} node    - The target DOM Node.
 * @return {void}         - Note: the emoji substitution is done inline.
 */
// Setting textContent on a node removes all of its children and replaces
// them with a single text node. Since we don't want to alter the DOM aside
// from substituting text, we only substitute on single text nodes.
// @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent

// This node only contains text.
// @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType.

// Skip textarea nodes due to the potential for accidental submission
// of substituted emoji where none was intended.

// Because DOM manipulation is slow, we don't want to keep setting
// textContent after every replacement. Instead, manipulate a copy of
// this string outside of the DOM and then perform the manipulation
// once, at the end.

// Replace every occurrence of 'word' in 'content' with its emoji.
// Use the dictionary for replacements.

// Grab the search regex for this word.

// Actually do the replacement / substitution.
// Note: if 'word' does not appear in 'content', nothing happens.
// Now that all the replacements are done, perform the DOM manipulation.
// This node contains more than just text, call replaceText() on each
// of its children.

// Start the recursion from the body tag.

// Now monitor the DOM for additions and substitute emoji into new nodes.
// @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver.
// This DOM change was new nodes being added. Run our substitution
// algorithm on each newly added node.
