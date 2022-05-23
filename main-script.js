// ON input event of picker mode, enable the Remove Items

// define the target radio button for the event listener
let pickerMode = document.getElementById("flexRadioDefault1");
let shuffleMode = document.getElementById("flexRadioDefault2");
let removeItemSelect = document.getElementById("flexCheckDefault");

function enableCheckbox() {
  if (pickerMode.checked) {
    removeItemSelect.disabled = false;
  } else {
    removeItemSelect.disabled = true;
    removeItemSelect.checked = false;
  }
}

function disableCheckbox() {
  if (shuffleMode.checked) {
    removeItemSelect.disabled = true;
    removeItemSelect.checked = false;
  } else {
    removeItemSelect.disabled = false;
  }
}

pickerMode.addEventListener("change", enableCheckbox);
shuffleMode.addEventListener("change", disableCheckbox);
