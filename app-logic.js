(function (root, factory) {
  const logic = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = logic;
  } else {
    root.PickOrShuffleLogic = logic;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function parseItems(text) {
    return text.split(/\r?\n/).filter((line) => line.trim() !== "");
  }

  function pickItem(items, picker) {
    return picker([...items]);
  }

  function shuffleItems(items, shuffler) {
    return [...shuffler([...items])];
  }

  function getRemainingItems(items, pickedItem, removePickedItems) {
    if (!removePickedItems) {
      return [...items];
    }

    const itemIndex = items.indexOf(pickedItem);
    if (itemIndex === -1) {
      return [...items];
    }

    return [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
  }

  function isHttpUrl(item) {
    try {
      const url = new URL(item);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  function classifyResult(item) {
    return {
      text: item,
      isLinkable: isHttpUrl(item)
    };
  }

  return {
    classifyResult,
    getRemainingItems,
    isHttpUrl,
    parseItems,
    pickItem,
    shuffleItems
  };
});
