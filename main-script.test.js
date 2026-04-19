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
