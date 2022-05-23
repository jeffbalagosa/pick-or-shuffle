// define the target radio button for the event listener
const pickerMode = document.getElementById("pickerMode");
const shuffleMode = document.getElementById("shuffleMode");
const mainButton = document.getElementById("main-button");
let removeItemSelect = document.getElementById("removeItemSelect");

// define function to enable checkbox if picker mode is checked
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

mainButton.onclick = function () {
  let originalArr = textBox.value.replace(/\r\n/g, "\n").split("\n");
  console.log("The original array is:");
  console.log(originalArr);
  const shuffledArr = chance.shuffle(originalArr);
  console.log("The shuffled array is:");
  console.log(shuffledArr);
};
