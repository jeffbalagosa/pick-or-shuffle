const {
  classifyResult,
  getRemainingItems,
  normalizePickCount,
  parseItems,
  pickItem,
  pickItems,
  shuffleItems
} = require("./app-logic");

describe("core list behavior", () => {
  test("parses newline-delimited input with blank lines removed and order preserved", () => {
    const text = "alpha\n\nbeta\r\n   \ncharlie";

    expect(parseItems(text)).toEqual(["alpha", "beta", "charlie"]);
  });

  test("normalizes pick count to positive whole numbers", () => {
    expect(normalizePickCount(1)).toBe(1);
    expect(normalizePickCount(5)).toBe(5);
    expect(normalizePickCount(0)).toBe(1);
    expect(normalizePickCount(-3)).toBe(1);
    expect(normalizePickCount(2.5)).toBe(1);
    expect(normalizePickCount(null)).toBe(1);
    expect(normalizePickCount(undefined)).toBe(1);
    expect(normalizePickCount("")).toBe(1);
    expect(normalizePickCount("3")).toBe(3);
    expect(normalizePickCount("invalid")).toBe(1);
  });

  test("picks multiple items without replacement using an injected shuffler", () => {
    const items = ["alpha", "beta", "charlie", "delta"];
    const shuffler = (list) => [list[3], list[0], list[2], list[1]]; // delta, alpha, charlie, beta

    expect(pickItems(items, 2, shuffler)).toEqual(["delta", "alpha"]);
    expect(pickItems(items, 10, shuffler)).toEqual([
      "delta",
      "alpha",
      "charlie",
      "beta"
    ]);
    expect(items).toEqual(["alpha", "beta", "charlie", "delta"]);
  });

  test("picks an item with an injected picker", () => {
    const items = ["alpha", "beta", "charlie"];
    const picker = (availableItems) => availableItems[1];

    expect(pickItem(items, picker)).toBe("beta");
    expect(items).toEqual(["alpha", "beta", "charlie"]);
  });

  test("shuffles items with an injected shuffler", () => {
    const items = ["alpha", "beta", "charlie"];
    const shuffler = (availableItems) => [
      availableItems[2],
      availableItems[0],
      availableItems[1]
    ];

    expect(shuffleItems(items, shuffler)).toEqual(["charlie", "alpha", "beta"]);
    expect(items).toEqual(["alpha", "beta", "charlie"]);
  });

  test("removes multiple picked items when removal is enabled", () => {
    const items = ["alpha", "beta", "beta", "charlie", "delta"];
    const picked = ["beta", "delta"];

    expect(getRemainingItems(items, picked, true)).toEqual([
      "alpha",
      "beta",
      "charlie"
    ]);
  });

  test("removes one matching picked item when removal is enabled", () => {
    const items = ["alpha", "beta", "beta", "charlie"];

    expect(getRemainingItems(items, "beta", true)).toEqual([
      "alpha",
      "beta",
      "charlie"
    ]);
    expect(items).toEqual(["alpha", "beta", "beta", "charlie"]);
  });

  test("keeps original items when removal is disabled", () => {
    const items = ["alpha", "beta", "charlie"];

    expect(getRemainingItems(items, "beta", false)).toEqual(items);
    expect(getRemainingItems(items, "missing", true)).toEqual(items);
  });

  test("classifies absolute http and https URLs as linkable", () => {
    expect(classifyResult("http://example.com")).toEqual({
      text: "http://example.com",
      isLinkable: true
    });
    expect(classifyResult("https://example.com/path")).toEqual({
      text: "https://example.com/path",
      isLinkable: true
    });
  });

  test("classifies non-http URLs and plain text as plain text", () => {
    expect(classifyResult("ftp://example.com")).toEqual({
      text: "ftp://example.com",
      isLinkable: false
    });
    expect(classifyResult("plain text")).toEqual({
      text: "plain text",
      isLinkable: false
    });
    expect(classifyResult("/relative/path")).toEqual({
      text: "/relative/path",
      isLinkable: false
    });
  });
});
