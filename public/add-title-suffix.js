// Add "- Help center" suffix to page title after Mintlify's "- 21st" suffix
(function () {
  const suffix = " - Help center";
  const existingSuffix = " - 21st";

  function updateTitle() {
    const currentTitle = document.title;

    if (!currentTitle) return;

    // If title already ends with "- Help center", do nothing
    if (currentTitle.endsWith(suffix)) {
      return;
    }

    // If title ends with "- 21st", add "- Help center" after it
    if (currentTitle.endsWith(existingSuffix)) {
      document.title = currentTitle + suffix;
      return;
    }

    // If title doesn't end with "- 21st" yet, wait a bit for Mintlify to set it
    // In this case, we'll try again later
  }

  // Run immediately
  updateTitle();

  // Run on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      updateTitle();
      // Run again after delays to catch late title updates from Mintlify
      setTimeout(updateTitle, 100);
      setTimeout(updateTitle, 500);
      setTimeout(updateTitle, 1000);
      setTimeout(updateTitle, 2000);
    });
  } else {
    // Run again after delays to catch late title updates from Mintlify
    setTimeout(updateTitle, 100);
    setTimeout(updateTitle, 500);
    setTimeout(updateTitle, 1000);
    setTimeout(updateTitle, 2000);
  }

  // Watch for title changes (some frameworks update title dynamically)
  const titleElement = document.querySelector("title");
  if (titleElement) {
    const observer = new MutationObserver(function (mutations) {
      // Use a small delay to avoid interfering with title updates
      setTimeout(updateTitle, 0);
    });

    observer.observe(titleElement, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  }

  // Also watch document.title property changes (for SPAs)
  let lastTitle = document.title;
  setInterval(function () {
    if (document.title !== lastTitle) {
      lastTitle = document.title;
      updateTitle();
    }
  }, 200);
})();
