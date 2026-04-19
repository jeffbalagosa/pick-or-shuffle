const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

describe("Pick mode input behavior", () => {
  function setupDom(chanceOverrides = {}) {
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
    const dom = new JSDOM(html, {
      runScripts: "outside-only",
      url: "http://localhost"
    });

    // Stub Chance API used by main-script.js
    dom.window.chance = {
      shuffle: (arr) => [...arr],
      pickone: (arr) => arr[0],
      ...chanceOverrides
    };

    const logicScript = fs.readFileSync(path.join(__dirname, "app-logic.js"), "utf8");
    dom.window.eval(logicScript);

    const script = fs.readFileSync(path.join(__dirname, "main-script.js"), "utf8");
    dom.window.eval(script);

    return dom.window.document;
  }

  test("pick count field defaults to 1 and is visible in Pick mode", () => {
    const document = setupDom();
    const pickCountWrapper = document.getElementById("pickCountWrapper");

    expect(pickCountWrapper).not.toBeNull();
    expect(pickCountWrapper.style.display).not.toBe("none");
  });

  test("pick count field is hidden in Shuffle mode", () => {
    const document = setupDom();
    const shuffleMode = document.getElementById("shuffleMode");
    const pickCountWrapper = document.getElementById("pickCountWrapper");

    shuffleMode.checked = true;
    shuffleMode.dispatchEvent(new document.defaultView.Event("change", { bubbles: true }));

    expect(pickCountWrapper.style.display).toBe("none");
  });

  test("pick workflow renders multiple results when pick count > 1", () => {
    const document = setupDom({
      shuffle: (arr) => [arr[2], arr[0], arr[1]] // charlie, alpha, beta
    });
    const textBox = document.getElementById("text-box");
    const pickCountInput = document.getElementById("pickCountInput");
    const mainButton = document.getElementById("main-button");

    textBox.value = "alpha\nbeta\ncharlie";
    pickCountInput.value = "2";
    mainButton.click();

    const results = [...document.querySelectorAll("#results-list li")].map(
      (li) => li.textContent
    );
    expect(results).toEqual(["charlie", "alpha"]);
  });

  test("remove multiple picked items updates textarea correctly", () => {
    const document = setupDom({
      shuffle: (arr) => [arr[2], arr[0], arr[1]] // charlie, alpha, beta
    });
    const textBox = document.getElementById("text-box");
    const pickCountInput = document.getElementById("pickCountInput");
    const removeItemSelect = document.getElementById("removeItemSelect");
    const mainButton = document.getElementById("main-button");

    textBox.value = "alpha\nbeta\ncharlie\ndelta";
    pickCountInput.value = "2";
    removeItemSelect.checked = true;
    mainButton.click();

    const results = [...document.querySelectorAll("#results-list li")].map(
      (li) => li.textContent
    );
    expect(results).toEqual(["charlie", "alpha"]);
    expect(textBox.value).toBe("beta\ndelta");
  });

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

  test("pick workflow renders a link for URL results", () => {
    const document = setupDom({
      pickone: (arr) => arr[1]
    });
    const textBox = document.getElementById("text-box");
    const mainButton = document.getElementById("main-button");

    textBox.value = "plain text\nhttps://example.com/path";
    mainButton.click();

    const link = document.querySelector("#results-list li a");
    expect(link).not.toBeNull();
    expect(link.textContent).toBe("https://example.com/path");
    expect(link.href).toBe("https://example.com/path");
    expect(link.target).toBe("_blank");
    expect(link.rel).toBe("noopener noreferrer");
  });

  test("pick workflow renders non-URL results as plain text", () => {
    const document = setupDom({
      pickone: (arr) => arr[0]
    });
    const textBox = document.getElementById("text-box");
    const mainButton = document.getElementById("main-button");

    textBox.value = "plain text\nhttps://example.com/path";
    mainButton.click();

    const item = document.querySelector("#results-list li");
    expect(item.textContent).toBe("plain text");
    expect(item.querySelector("a")).toBeNull();
  });

  test("shuffle workflow renders shuffled line-based input", () => {
    const document = setupDom({
      shuffle: (arr) => [arr[2], arr[0], arr[1]]
    });
    const shuffleMode = document.getElementById("shuffleMode");
    const textBox = document.getElementById("text-box");
    const mainButton = document.getElementById("main-button");

    shuffleMode.checked = true;
    shuffleMode.dispatchEvent(new document.defaultView.Event("change", { bubbles: true }));
    textBox.value = "alpha\nbeta\ncharlie";
    mainButton.click();

    const items = [...document.querySelectorAll("#results-list li")].map(
      (item) => item.textContent
    );
    expect(items).toEqual(["charlie", "alpha", "beta"]);
  });

  test("remove picked items workflow updates textarea with remaining items", () => {
    const document = setupDom({
      pickone: (arr) => arr[1]
    });
    const textBox = document.getElementById("text-box");
    const removeItemSelect = document.getElementById("removeItemSelect");
    const mainButton = document.getElementById("main-button");

    textBox.value = "alpha\nbeta\nbeta\ncharlie";
    removeItemSelect.checked = true;
    mainButton.click();

    expect(document.querySelector("#results-list li").textContent).toBe("beta");
    expect(textBox.value).toBe("alpha\nbeta\ncharlie");
  });
});
