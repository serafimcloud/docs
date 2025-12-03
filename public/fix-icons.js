// Force icon colors in dark theme cards
(function () {
  function fixCardIcons() {
    if (!document.documentElement.classList.contains("dark")) {
      return;
    }

    const cards = document.querySelectorAll('g.card, [class*="card"]');
    const iconColor = "#0034FF";

    // Fix icons using mask-image (card icons)
    const cardIcons = document.querySelectorAll(
      '[data-component-part="card-icon"]'
    );
    cardIcons.forEach((icon) => {
      const svg = icon.querySelector("svg");
      if (
        svg &&
        (svg.style.maskImage ||
          svg.getAttribute("style")?.includes("mask-image"))
      ) {
        // Icons with mask-image need ONLY background-color, preserve mask-image
        svg.style.backgroundColor = iconColor;
        // Don't override background property, only backgroundColor
        // This preserves the mask-image functionality
      }
    });

    cards.forEach((card) => {
      // Find all SVG elements inside the card
      const svgs = card.querySelectorAll("svg");

      svgs.forEach((svg) => {
        // Check if SVG uses mask-image
        if (
          svg.style.maskImage ||
          svg.getAttribute("style")?.includes("mask-image")
        ) {
          // Icons with mask-image need background-color
          svg.style.backgroundColor = iconColor;
          svg.style.background = iconColor;
        } else {
          // Regular SVG elements
          svg.style.color = iconColor;
          svg.style.fill = iconColor;
          svg.style.stroke = iconColor;
        }

        // Find all paths, circles, rects, etc.
        const elements = svg.querySelectorAll(
          "path, circle, rect, polygon, line, polyline, ellipse, g"
        );

        elements.forEach((el) => {
          el.style.fill = iconColor;
          el.style.stroke = iconColor;
          el.style.color = iconColor;

          // Override fill attribute
          if (el.hasAttribute("fill")) {
            el.setAttribute("fill", iconColor);
          }

          // Override stroke attribute
          if (el.hasAttribute("stroke")) {
            el.setAttribute("stroke", iconColor);
          }
        });
      });
    });
  }

  // Run on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fixCardIcons);
  } else {
    fixCardIcons();
  }

  // Run after a short delay to catch dynamically loaded content
  setTimeout(fixCardIcons, 100);
  setTimeout(fixCardIcons, 500);
  setTimeout(fixCardIcons, 1000);

  // Watch for theme changes
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        fixCardIcons();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
})();
