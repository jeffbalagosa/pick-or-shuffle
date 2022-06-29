const pickerMode = document.getElementById("pickerMode");
const shuffleMode = document.getElementById("shuffleMode");
const mainButton = document.getElementById("main-button");
const removeItemSelect = document.getElementById("removeItemSelect");
const inputDisplay = document.getElementById("input-display");
const resultTarget = document.getElementById("results-list");
const header = document.getElementById("header");
let textBox = document.getElementById("text-box").value;

function enableCheckbox() {
  if (pickerMode.checked) {
    removeItemSelect.disabled = false;
    mainButton.value = "Pick";
    header.style.backgroundImage = "url('img/roulette.jpg')";
  }
  // Enable checkbox if suffle mode is checked
  if (shuffleMode.checked) {
    removeItemSelect.disabled = true;
    removeItemSelect.checked = false;
    mainButton.value = "Shuffle";
    header.style.backgroundImage = "url('img/card-shuffle.jpg')";
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
textBox.onpaste = function (e) {
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
  textBox = document.getElementById("text-box").value;
  const textBoxArr = textBox.split(/\r?\n/);
  let inputArray = textBoxArr;
  // trim empty lines off inputArray
  inputArray = inputArray.filter((e) => String(e).trim());

  if (shuffleMode.checked) {
    let shuffledArray = chance.shuffle(inputArray);
    resultTarget.innerHTML = addHTMLTags(shuffledArray, "li").join("");
  } else if (pickerMode.checked) {
    let pickedItem = chance.pickone(inputArray);
    let pickedlistItem = `<li>${pickedItem}</li>`;
    resultTarget.innerHTML = pickedlistItem;
    if (removeItemSelect.checked && inputArray.length > 0) {
      // Remove item from textBox
      let itemIndex = inputArray.indexOf(pickedItem);
      inputArray.splice(itemIndex, 1);
      document.getElementById("text-box").value = inputArray.join("\n");
    }
  }
};
