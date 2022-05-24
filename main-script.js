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

// Use event listeners on radio buttons to run functions
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

// Shuffle and display Output
function shuffle() {
  const startingArr = textBox.value.replace(/\r\n/g, "\n").split("\n");
  let taggedArr = addLiTags(startingArr);
  inputDisplay.innerHTML = taggedArr.join("");
  let newArr = chance.shuffle(taggedArr);
  resultTarget.innerHTML = newArr.join("");
}

// Pick one at a time but allow duplicates
function pick() {
  const startingArr = textBox.value.replace(/\r\n/g, "\n").split("\n");
  let taggedItem = `<li>${chance.pickone(startingArr)}</li>`;
  resultTarget.innerHTML = taggedItem;
}

// Pick one at a time but DO NOT allow duplicates
function pick2() {
  let newArr = shuffleArr();
  let picked = newArr.pop();
  resultTarget.innerHTML = picked;
  textBox.value = newArr.split(",").join("\n");
}

//Test
mainButton.onclick = shuffle;

// Event Listener for button.
// mainButton.onclick = function () {
//   if (shuffleMode.checked) {
//     shuffle();
//   }
//   if (pickerMode.checked) {
//     pick();
//   }
// };
