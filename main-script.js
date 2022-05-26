const pickerMode = document.getElementById("pickerMode");
const shuffleMode = document.getElementById("shuffleMode");
const mainButton = document.getElementById("main-button");
const removeItemSelect = document.getElementById("removeItemSelect");
const inputDisplay = document.getElementById("input-display");
const textBox = document.getElementById("text-box");
const resultTarget = document.getElementById("results-list");
let count = 1;

// define function to enable checkbox if pick mode radio is checked
function enableCheckbox() {
  if (pickerMode.checked) {
    removeItemSelect.disabled = false;
    mainButton.value = "Pick";
  }
  // Enable checkbox if suffle mode is checked
  if (shuffleMode.checked) {
    removeItemSelect.disabled = true;
    removeItemSelect.checked = false;
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
  console.log(newArr);
  return newArr;
}

// Shuffle and display Output
function shuffle(arr) {
  let taggedArr = addLiTags(arr);
  inputDisplay.innerHTML = taggedArr.join("");
  let newArr = chance.shuffle(taggedArr);
  resultTarget.innerHTML = newArr.join("");
}

function pickOneNoDuplicates(arr) {
  // define new array
  let newArr = [];

  if (count > 1) {
    // Capture array from ul#inputdisplay
    arr = copyArrFromInputDisplay();
    // Pick an item from the newly created arr
  }

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
  console.log(count);
}

// Event Listener for button click
mainButton.onclick = function () {
  // Capture array from text area and save to variable
  const arr = textBox.value.replace(/\r\n/g, "\n").split("\n");

  if (shuffleMode.checked) {
    copyArrToInputDisplay(arr);
    shuffle(arr);
    console.log("shuffleMode is checked");
  }

  if (removeItemSelect.checked) {
    pickOneNoDuplicates(arr);
    console.log("pickMode w/ removeItemSelect is checked");
  } else if (pickerMode.checked) {
    copyArrToInputDisplay(arr);
    console.log("pickMode w/o removeItemSelect is checked");
  }
  // Hide textarea and unhide input-display div
  document.getElementById("textAreaDiv").style.display = "none";
};
