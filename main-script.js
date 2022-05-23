// define the target radio button for the event listener
const pickerMode = document.getElementById("pickerMode");
const shuffleMode = document.getElementById("shuffleMode");
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
let textBox = document.getElementById("text-box");
let lineArr = area.value.replace(/\r\n/g, "\n").split("\n");
