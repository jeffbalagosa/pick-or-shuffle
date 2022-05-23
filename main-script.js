// define the target radio button for the event listener
let pickerMode = document.getElementById("flexRadioDefault1");
let shuffleMode = document.getElementById("flexRadioDefault2");
let removeItemSelect = document.getElementById("flexCheckDefault");

// define function to enable checkbox if picker mode is checked
function enableCheckbox() {
  if (pickerMode.checked) {
    removeItemSelect.disabled = false;
  }
}

// define function to enable checkbox if suffle mode is checked
function disableCheckbox() {
  if (shuffleMode.checked) {
    removeItemSelect.disabled = true;
    removeItemSelect.checked = false;
  }
}

// Use event listeners on radio buttons to run functions
pickerMode.addEventListener("change", enableCheckbox);
shuffleMode.addEventListener("change", disableCheckbox);
