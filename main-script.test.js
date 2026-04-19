const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

describe("Pick mode input behavior", () => {
  function setupDom() {
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
    const dom = new JSDOM(html, {
      runScripts: "outside-only",
      url: "http://localhost"
    });

    // Stub Chance API used by main-script.js
    dom.window.chance = {
      shuffle: (arr) => [...arr],
      pickone: (arr) => arr[0]
    };

    const script = fs.readFileSync(path.join(__dirname, "main-script.js"), "utf8");
    dom.window.eval(script);

    return dom.window.document;
  }

  test("initial mode is Pick and Shuffle is unselected", () => {
    const document = setupDom();
    const pickerMode = document.getElementById("pickerMode");
    const shuffleMode = document.getElementById("shuffleMode");

    expect(pickerMode.checked).toBe(true);
    expect(shuffleMode.checked).toBe(false);
  });

  test("initial controls match Pick mode", () => {
    const document = setupDom();
    const mainButton = document.getElementById("main-button");
    const removeItemSelect = document.getElementById("removeItemSelect");
    const textBox = document.getElementById("text-box");
    const inputDisplay = document.getElementById("input-display");
    const header = document.getElementById("header");

    expect(mainButton.value).toBe("Pick");
    expect(removeItemSelect.disabled).toBe(false);
    expect(textBox.style.display).toBe("block");
    expect(inputDisplay.style.display).toBe("none");
    expect(header.style.backgroundImage).toContain("roulette.jpg");
  });

  test("switching from default Pick mode to Shuffle mode updates controls", () => {
    const document = setupDom();
    const pickerMode = document.getElementById("pickerMode");
    const shuffleMode = document.getElementById("shuffleMode");
    const mainButton = document.getElementById("main-button");
    const removeItemSelect = document.getElementById("removeItemSelect");

    removeItemSelect.checked = true;
    shuffleMode.checked = true;
    shuffleMode.dispatchEvent(new document.defaultView.Event("change", { bubbles: true }));

    expect(shuffleMode.checked).toBe(true);
    expect(pickerMode.checked).toBe(false);
    expect(mainButton.value).toBe("Shuffle");
    expect(removeItemSelect.disabled).toBe(true);
    expect(removeItemSelect.checked).toBe(false);
  });

  test("switching back to Pick mode restores Pick controls", () => {
    const document = setupDom();
    const pickerMode = document.getElementById("pickerMode");
    const shuffleMode = document.getElementById("shuffleMode");
    const mainButton = document.getElementById("main-button");
    const removeItemSelect = document.getElementById("removeItemSelect");
    const textBox = document.getElementById("text-box");
    const inputDisplay = document.getElementById("input-display");
    const header = document.getElementById("header");

    shuffleMode.checked = true;
    shuffleMode.dispatchEvent(new document.defaultView.Event("change", { bubbles: true }));
    pickerMode.checked = true;
    pickerMode.dispatchEvent(new document.defaultView.Event("change", { bubbles: true }));

    expect(pickerMode.checked).toBe(true);
    expect(shuffleMode.checked).toBe(false);
    expect(mainButton.value).toBe("Pick");
    expect(removeItemSelect.disabled).toBe(false);
    expect(textBox.style.display).toBe("block");
    expect(inputDisplay.style.display).toBe("none");
    expect(header.style.backgroundImage).toContain("roulette.jpg");
  });

  test("textarea remains visible and editable in Pick mode", () => {
    const document = setupDom();
    const pickerMode = document.getElementById("pickerMode");
    const textBox = document.getElementById("text-box");

    pickerMode.checked = true;
    pickerMode.dispatchEvent(new document.defaultView.Event("change", { bubbles: true }));

    expect(textBox.style.display).not.toBe("none");

    textBox.value = "https://example.com\nplain text item";
    expect(textBox.value).toContain("plain text item");
  });

  test("pick mode does not show a second input box", () => {
    const document = setupDom();
    const pickerMode = document.getElementById("pickerMode");
    const inputDisplay = document.getElementById("input-display");

    pickerMode.checked = true;
    pickerMode.dispatchEvent(new document.defaultView.Event("change", { bubbles: true }));

    expect(inputDisplay.style.display).toBe("none");
  });
});
