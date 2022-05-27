const pickerMode = document.getElementById("pickerMode");
const shuffleMode = document.getElementById("shuffleMode");
const mainButton = document.getElementById("main-button");
const removeItemSelect = document.getElementById("removeItemSelect");
const inputDisplay = document.getElementById("input-display");
const textBox = document.getElementById("text-box");
const resultTarget = document.getElementById("results-list");
let count = 1;

function enableCheckbox() {
  if (pickerMode.checked) {
    removeItemSelect.disabled = false;
    mainButton.value = "Pick";
  }
  // Enable checkbox if suffle mode is checked
  if (shuffleMode.checked) {
    removeItemSelect.disabled = true;
    removeItemSelect.checked = false;
    mainButton.value = "Shuffle";
  }
}

// Use event listeners on radio buttons
pickerMode.addEventListener("change", enableCheckbox);
shuffleMode.addEventListener("change", enableCheckbox);

// Add li Tags to array items
function addLiTags(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    const arrayItem = arr[i];
    newArr.push(`<li>${arrayItem}</li>`);
  }
  return newArr;
}

// Copy text area items to ul#input-display
function copyArrToInputDisplay(arr) {
  const taggedArr = addLiTags(arr);
  inputDisplay.innerHTML = taggedArr.join("");
}

// Copy list items from ul#input-display and turn them into an arroay
function copyArrFromInputDisplay() {
  let newArr = [];
  const lisNodes = inputDisplay.getElementsByTagName("li");
  for (let i = 0; i < lisNodes.length; i++) {
    const element = lisNodes[i];
    newArr.push(element.innerHTML);
  }
  return newArr;
}

// Shuffle and display Output
function shuffle(arr) {
  let taggedArr = addLiTags(arr);
  inputDisplay.innerHTML = taggedArr.join("");
  let newArr = chance.shuffle(taggedArr);
  resultTarget.innerHTML = newArr.join("");
}

function pickOne(arr) {
  let pickedItem = chance.pickone(arr);
  pickedItem = `<li>${pickedItem}</li>`;
  resultTarget.innerHTML = pickedItem;
}

function pickOneNoDuplicates(arr) {
  // define new array
  let newArr = [];

  if (count > 1) {
    // Capture array from ul#inputdisplay
    arr = copyArrFromInputDisplay();
  }

  if (arr.length === 0) {
    resultTarget.innerHTML = `<li>Error: No items to pick from.</li>`;
  } else {
    // Pick random item from array and display to out put
    let pickedItem = chance.pickone(arr);
    // Find index of picked item to pass into splice
    let itemIndex = arr.indexOf(pickedItem);
    // Splice the item off the array and return the new array
    arr.splice(itemIndex, 1);
    // Display the new array on the input-display div of the Input card.
    newArr = addLiTags(arr);
    inputDisplay.innerHTML = newArr.join("");
    resultTarget.innerHTML = `<li>${pickedItem}</li>`;

    count += 1;
  }
}

// Event Listener for button click
mainButton.onclick = function () {
  // Capture array from text area and save to variable
  const arr = textBox.value.replace(/\r\n/g, "\n").split("\n");

  if (shuffleMode.checked) {
    copyArrToInputDisplay(arr);
    shuffle(arr);
  }

  if (removeItemSelect.checked) {
    pickOneNoDuplicates(arr);
  } else if (pickerMode.checked) {
    copyArrToInputDisplay(arr);
    pickOne(arr);
  }
  // Hide textarea and unhide input-display div
  document.getElementById("textAreaDiv").style.display = "none";
  inputDisplay.style.display = "block";
};
