const pickerMode = document.getElementById("pickerMode");
const shuffleMode = document.getElementById("shuffleMode");
const mainButton = document.getElementById("main-button");
const removeItemSelect = document.getElementById("removeItemSelect");
const inputDisplay = document.getElementById("input-display");
const resultTarget = document.getElementById("results-list");
const header = document.getElementById("header");
const textBoxEl = document.getElementById("text-box");
let textBox = textBoxEl.value;

// Parse newline-delimited text into a filtered array of non-empty items.
function parseItems(text) {
  return text.split(/\r?\n/).filter((line) => line.trim() !== "");
}

// Return true only for absolute http/https URLs.
function isUrl(item) {
  try {
    const url = new URL(item);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// Render the Pick-mode input display from an array of items.
function renderPickInput(items) {
  inputDisplay.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "pick-input-item";
    if (isUrl(item)) {
      const a = document.createElement("a");
      a.href = item;
      a.textContent = item;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      div.appendChild(a);
    } else {
      div.textContent = item;
    }
    inputDisplay.appendChild(div);
  });
}

function enableCheckbox() {
  if (pickerMode.checked) {
    removeItemSelect.disabled = false;
    mainButton.value = "Pick";
    header.style.backgroundImage = "url('img/roulette.jpg')";
    textBoxEl.style.display = "block";
    inputDisplay.style.display = "none";
  }
  // Enable checkbox if shuffle mode is checked
  if (shuffleMode.checked) {
    removeItemSelect.disabled = true;
    removeItemSelect.checked = false;
    mainButton.value = "Shuffle";
    header.style.backgroundImage = "url('img/card-shuffle.jpg')";
    textBoxEl.style.display = "block";
    inputDisplay.style.display = "none";
  }
}

// Add li tags to array items
function addHTMLTags(arr, tagType) {
  let newArr = [];
  arr.forEach((item) => {
    item = `<${tagType}>${item}</${tagType}>`;
    newArr.push(item);
  });
  return newArr;
}

// Turn anything pasted into the textbox into plain text
textBoxEl.onpaste = function (e) {
  // cancel paste
  e.preventDefault();

  // get plain text representation of clipboard
  let text = (e.originalEvent || e).clipboardData.getData("text/plain");

  // insert text manually
  document.execCommand("insertText", false, text);
};

// Use event listeners on radio buttons
pickerMode.addEventListener("change", enableCheckbox);
shuffleMode.addEventListener("change", enableCheckbox);

// Event Listener for button click
mainButton.onclick = function () {
  textBox = textBoxEl.value;
  const inputArray = parseItems(textBox);

  if (shuffleMode.checked) {
    let shuffledArray = chance.shuffle(inputArray);
    resultTarget.innerHTML = addHTMLTags(shuffledArray, "li").join("");
  } else if (pickerMode.checked) {
    let pickedItem = chance.pickone(inputArray);

    // Render picked item as anchor if it is a URL, otherwise plain text
    const li = document.createElement("li");
    if (isUrl(pickedItem)) {
      const a = document.createElement("a");
      a.href = pickedItem;
      a.textContent = pickedItem;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
    } else {
      li.textContent = pickedItem;
    }
    resultTarget.innerHTML = "";
    resultTarget.appendChild(li);

    if (removeItemSelect.checked && inputArray.length > 0) {
      // Remove item from textBox and update rendered input
      let itemIndex = inputArray.indexOf(pickedItem);
      inputArray.splice(itemIndex, 1);
      textBoxEl.value = inputArray.join("\n");
      renderPickInput(inputArray);
    }
  }
};
