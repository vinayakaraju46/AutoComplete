class Node {
  constructor(character) {
    this.data = character;
    this.left = null;
    this.right = null;
    this.middle = null;
    this.endOfWord = false;
  }
}

class TernarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(word)
  {
    this.root = this.insertNode(this.root, word, 0);
  }

  insertNode(node, word, index)
  {
    let c = word[index];
    if(node == null) {
      node = new Node(c);
    }
    if (c < node.data) {
      node.left = this.insertNode(node.left, word, index);
    }
    else if (c > node.data) {
      node.right = this.insertNode(node.right, word, index);
    }
    else if(index+1 < word.length) {
        node.middle = this.insertNode(node.middle, word, index+1);
      }
    else {
        node.endOfWord = true;
      }

      return node;

    }


  Search(word) {
    let stringBuilder = [""];
    let prefixRoot = this.crawlToPrefixLastNode(this.root, word, 0);
    this.findAllSuggestion(prefixRoot, "", stringBuilder, word);
    if(stringBuilder.length < 1) {
      return "No Matching String Found";
    }
    return stringBuilder;
  }

  crawlToPrefixLastNode(node, word, index) {
    if(node == null) {
      return null;
    }
    if(word[index] < node.data) {
      return this.crawlToPrefixLastNode(node.left, word, index);
    }
    else if (word[index] > node.data) {
      return this.crawlToPrefixLastNode(node.right, word, index);
    }

    else if(index < word.length-1) {
        return this.crawlToPrefixLastNode(node.middle, word, index+1);
    }
    else {
      return node;
    }

  }

  findAllSuggestion(node, str, stringBuilder, word) {

    if(node != null) {
      if (node.left) {
        this.findAllSuggestion(node.left, str, stringBuilder, word);
      }
      str = str + node.data;
      if(node.endOfWord == true) {
        stringBuilder.push(word + str.substring(1));
      }
      this.findAllSuggestion(node.middle, str, stringBuilder, word);
      str = str.substring(0, str.length-1);
      if(node.right){
        this.findAllSuggestion(node.right, str, stringBuilder, word);
      }

    }
  }


}

var tst = new TernarySearchTree();
var interval;
var timerRunning = false;
const textWrapper = document.querySelector(".text-wrapper");
const textArea = document.querySelector("#text-to-store");
const storeButton = document.querySelector("#storeButton");
const autocompleteArea = document.querySelector("#text-to-search");
const outputArea = document.querySelector("#search-output");
const resetbtn = document.querySelector("#reset");


// Store Words in a Tree
function storeInTree() {
  let inputWord = textArea.value;
  console.log(inputWord);
  tst.insert(inputWord);
  textArea.value = "";
}

function SearchAndReturnValue(searchKey) {
  let result = tst.Search(searchKey);
  for(let i=0; i<result.length; i++) {
    outputArea.value = outputArea.value + " " + result[i];
  }

}

function autocompleteFeatureMode() {
  storeButton.disabled = true;
  storeButton.style.cursor = "not-allowed";
  var searchKey = autocompleteArea.value;
  if(searchKey.length > 0) {
    outputArea.value = "";
    interval = setInterval(SearchAndReturnValue(searchKey), 10);
    console.log(interval);
  }
}

function resetSearchBox() {
  clearInterval(interval);
  interval = null;
  outputArea.value = "";
  storeButton.disabled = false;
  storeButton.style.cursor = "allowed";
  autocompleteArea.value = "";

  textArea.value = "";
}



// Event Listeners for keyboard input and autocomplete Mode
storeButton.addEventListener("click", storeInTree, false);
autocompleteArea.addEventListener("keyup", autocompleteFeatureMode, false);
resetbtn.addEventListener("click", resetSearchBox, false);
