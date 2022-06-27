const pickerMode = document.getElementById("pickerMode");
const shuffleMode = document.getElementById("shuffleMode");
const mainButton = document.getElementById("main-button");
const removeItemSelect = document.getElementById("removeItemSelect");
const inputDisplay = document.getElementById("input-display");
let textBox = document.getElementById("text-box").value;
const textBoxArr = textBox.split(/\r?\n/);
const resultTarget = document.getElementById("results-list");
const errorMessage =
  '<li class="text-warning">Error! No items to pick from.</li>';
const header = document.getElementById("header");
let count = 0;

console.log(textBoxArr);

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

  // get text representation of clipboard
  let text = (e.originalEvent || e).clipboardData.getData("text/plain");

  // insert text manually
  document.execCommand("insertText", false, text);
};

// Use event listeners on radio buttons
pickerMode.addEventListener("change", enableCheckbox);
shuffleMode.addEventListener("change", enableCheckbox);

// Event Listener for button click
mainButton.onclick = function () {
  let inputArray = textBoxArr;
  let shuffledArray = chance.shuffle(inputArray);

  if (shuffleMode.checked) {
    resultTarget.innerHTML = addHTMLTags(shuffledArray, "li").join("");
  } else if (pickerMode.checked) {
    let pickedItem = chance.pickone(inputArray);
    let pickedlistItem = `<li>${pickedItem}</li>`;
    resultTarget.innerHTML = pickedlistItem;
    if (removeItemSelect.checked) {
      // Remove item from textBox
      while (count > 0) {
        let itemIndex = inputArray.indexOf(pickedItem);
        inputArray.splice(itemIndex, 1);
        console.log(inputArray);
        textBox = inputArray.join("/n");
        count += 1;
        console.log(count);
      }
    }
  }
};
