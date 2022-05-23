const pickerMode = document.getElementById("pickerMode");
const shuffleMode = document.getElementById("shuffleMode");
const mainButton = document.getElementById("main-button");
let removeItemSelect = document.getElementById("removeItemSelect");

// define function to enable checkbox if pick mode radio is checked
function enableCheckbox() {
  if (pickerMode.checked) {
    removeItemSelect.disabled = false;
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

// Turn text box list into an array
const textBox = document.getElementById("text-box");
function shuffleArr() {
  const originalArr = textBox.value.replace(/\r\n/g, "\n").split("\n");
  const shuffledArr = chance.shuffle(originalArr);
  return shuffledArr;
}

// Add li html tags to shuffledArr
function addLiTags(array) {
  let newArr = [];
  const resultTarget = document.getElementById("results-list");
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    newArr.push(`<li>${element}</li>`);
  }
  return newArr;
}

// Build Shuffle and Display It
const resultTarget = document.getElementById("results-list");
function shuffle() {
  let startArr = shuffleArr();
  let taggedArr = addLiTags(startArr);
  resultTarget.innerHTML = taggedArr.join("");
}

// Pick one at a time
function pick() {
  const originalArr = textBox.value.replace(/\r\n/g, "\n").split("\n");
  let taggedItem = `<li>${chance.pickone(originalArr)}</li>`;
  resultTarget.innerHTML = taggedItem;
}

// Event Listener for button.
mainButton.onclick = shuffle;
