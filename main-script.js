const pickerMode = document.getElementById("pickerMode");
const shuffleMode = document.getElementById("shuffleMode");
const mainButton = document.getElementById("main-button");
let removeItemSelect = document.getElementById("removeItemSelect");
const inputDisplay = document.getElementById("input-display");
const textBox = document.getElementById("text-box");
const resultTarget = document.getElementById("results-list");

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

// Shuffle and display Output
function shuffle(array) {
  let taggedArr = addLiTags(array);
  inputDisplay.innerHTML = taggedArr.join("");
  let newArr = chance.shuffle(taggedArr);
  resultTarget.innerHTML = newArr.join("");
}

// Event Listener for button click
mainButton.onclick = function () {
  const arr = textBox.value.replace(/\r\n/g, "\n").split("\n");

  if (shuffleMode.checked) {
    copyArrToInputDisplay(arr);
    shuffle(arr);
    console.log("shuffleMode is checked");
  }

  if (pickerMode.checked) {
    copyArrToInputDisplay(arr);
    // get input-display array
    console.log("pickMode is checked");
  }
};
