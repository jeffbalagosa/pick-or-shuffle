(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./app-logic"));
  } else {
    const app = factory(root.PickOrShuffleLogic);
    root.PickOrShuffleApp = app;

    if (root.document && root.chance) {
      app.initPickOrShuffle(root.document, root.chance);
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (logic) {
  function initPickOrShuffle(document, randomizer) {
    if (!logic) {
      throw new Error("PickOrShuffleLogic must be loaded before main-script.js");
    }

    const pickerMode = document.getElementById("pickerMode");
    const shuffleMode = document.getElementById("shuffleMode");
    const mainButton = document.getElementById("main-button");
    const removeItemSelect = document.getElementById("removeItemSelect");
    const inputDisplay = document.getElementById("input-display");
    const resultTarget = document.getElementById("results-list");
    const header = document.getElementById("header");
    const textBoxEl = document.getElementById("text-box");
    const pickCountInput = document.getElementById("pickCountInput");
    const pickCountWrapper = document.getElementById("pickCountWrapper");

    function createResultNode(item, tagName) {
      const element = document.createElement(tagName);
      const result = logic.classifyResult(item);

      if (result.isLinkable) {
        const link = document.createElement("a");
        link.href = result.text;
        link.textContent = result.text;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        element.appendChild(link);
      } else {
        element.textContent = result.text;
      }

      return element;
    }

    function renderPickInput(items) {
      inputDisplay.innerHTML = "";
      items.forEach((item) => {
        const div = createResultNode(item, "div");
        div.className = "pick-input-item";
        inputDisplay.appendChild(div);
      });
    }

    function renderResultItems(items) {
      resultTarget.innerHTML = "";
      items.forEach((item) => {
        resultTarget.appendChild(createResultNode(item, "li"));
      });
    }

    function enableCheckbox() {
      if (pickerMode.checked) {
        removeItemSelect.disabled = false;
        mainButton.value = "Pick";
        header.style.backgroundImage = "url('img/roulette.jpg')";
        textBoxEl.style.display = "block";
        inputDisplay.style.display = "none";
        if (pickCountWrapper) pickCountWrapper.style.display = "block";
      }

      if (shuffleMode.checked) {
        removeItemSelect.disabled = true;
        removeItemSelect.checked = false;
        mainButton.value = "Shuffle";
        header.style.backgroundImage = "url('img/card-shuffle.jpg')";
        textBoxEl.style.display = "block";
        inputDisplay.style.display = "none";
        if (pickCountWrapper) pickCountWrapper.style.display = "none";
      }
    }

    textBoxEl.onpaste = function (event) {
      event.preventDefault();

      const text = (event.originalEvent || event).clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    };

    pickerMode.addEventListener("change", enableCheckbox);
    shuffleMode.addEventListener("change", enableCheckbox);
    enableCheckbox();

    mainButton.onclick = function () {
      const inputArray = logic.parseItems(textBoxEl.value);

      if (shuffleMode.checked) {
        const shuffledArray = logic.shuffleItems(inputArray, (items) =>
          randomizer.shuffle(items)
        );
        renderResultItems(shuffledArray);
        return;
      }

      if (pickerMode.checked) {
        const pickCount = logic.normalizePickCount(
          pickCountInput ? pickCountInput.value : 1
        );

        if (pickCount === 1) {
          const pickedItem = logic.pickItem(inputArray, (items) =>
            randomizer.pickone(items)
          );
          renderResultItems([pickedItem]);

          if (removeItemSelect.checked && inputArray.length > 0) {
            const remainingItems = logic.getRemainingItems(inputArray, pickedItem, true);
            textBoxEl.value = remainingItems.join("\n");
            renderPickInput(remainingItems);
          }
        } else {
          const pickedItems = logic.pickItems(inputArray, pickCount, (items) =>
            randomizer.shuffle(items)
          );
          renderResultItems(pickedItems);

          if (removeItemSelect.checked && inputArray.length > 0) {
            const remainingItems = logic.getRemainingItems(
              inputArray,
              pickedItems,
              true
            );
            textBoxEl.value = remainingItems.join("\n");
            renderPickInput(remainingItems);
          }
        }
      }
    };
  }

  return {
    initPickOrShuffle
  };
});
