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

  function normalizePickCount(count) {
    const n = parseInt(count, 10);
    if (isNaN(n) || n < 1 || !Number.isInteger(Number(count))) {
      return 1;
    }
    return n;
  }

  function pickItems(items, count, shuffler) {
    const shuffled = shuffler([...items]);
    return shuffled.slice(0, count);
  }

  function getRemainingItems(items, picked, removePickedItems) {
    if (!removePickedItems) {
      return [...items];
    }

    const pickedItems = Array.isArray(picked) ? picked : [picked];
    let remaining = [...items];

    for (const item of pickedItems) {
      const itemIndex = remaining.indexOf(item);
      if (itemIndex !== -1) {
        remaining = [
          ...remaining.slice(0, itemIndex),
          ...remaining.slice(itemIndex + 1)
        ];
      }
    }

    return remaining;
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
    normalizePickCount,
    parseItems,
    pickItem,
    pickItems,
    shuffleItems
  };
});
