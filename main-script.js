const pickerMode = document.getElementById("pickerMode");
const shuffleMode = document.getElementById("shuffleMode");
const mainButton = document.getElementById("main-button");
const removeItemSelect = document.getElementById("removeItemSelect");
const inputDisplay = document.getElementById("input-display");
const textBox = document.getElementById("text-box");
const resultTarget = document.getElementById("results-list");
const errorMessage =
  '<li class="text-warning">Error! No items to pick from.</li>';
const header = document.getElementById("header");
let count = 1;

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

// Use event listeners on radio buttons
pickerMode.addEventListener("change", enableCheckbox);
shuffleMode.addEventListener("change", enableCheckbox);

function getArrFromTextBox() {
  let arr = Array.from(textBox.children);
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].innerHTML;
    newArr.push(item);
  }
  return newArr;
}

// Add li tags to array items
function addLITags(arr) {
  let newArr = [];
  arr.forEach((item) => {
    item = `<li>${item}</li>`;
    newArr.push(item);
  });
  return newArr;
}

function pickOneNoDuplicates(arr) {
  // define new array
  let newArr = [];

  if (count > 1) {
    // Capture array from ul#inputdisplay
    arr = getArrFromTextBox();
  }

  if (arr.length === 0) {
    resultTarget.innerHTML = errorMessage;
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
    resultTarget.innerHTML = `<li>${pickedItem}<li>`;

    count += 1;
  }
}

// Event Listener for button click
mainButton.onclick = function () {
  let inputArray = getArrFromTextBox();
  let shuffledArray = chance.shuffle(inputArray);

  if (shuffleMode.checked) {
    resultTarget.innerHTML = addLITags(shuffledArray).join("");
  } else if (pickerMode.checked) {
    console.log("Pick mode is checked.");
    let pickedItem = `<li>${chance.pickone(inputArray)}</li>`;
    resultTarget.innerHTML = pickedItem;
  }
};
