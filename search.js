// Fake Google results page. Every search finds Tom Stepp, one way or another.
// typing.js loads first and handles the resume links and the theme button.

const DEFAULT_QUERY = "Tom Stepp";

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const typed = (params.get("q") || "").trim();
  const query = typed || DEFAULT_QUERY;

  document.getElementById("sr-q").value = query;
  document.title = query + " - Tom Stepp Search";

  const elapsed = (performance.now() / 1000).toFixed(2);
  const stats = document.getElementById("sr-stats");
  stats.textContent = "About 1 Tom Stepp (" + elapsed + " seconds)";

  if (isAboutTom(query)) return;

  // "Search instead for ..." leads to Google's no-results page.
  if (params.get("instead") === "1") {
    stats.hidden = true;
    document.getElementById("sr-list").hidden = true;
    document.getElementById("sr-none-q").textContent = query;
    document.getElementById("sr-none").hidden = false;
    return;
  }

  const instead = document.getElementById("sr-instead");
  instead.textContent = query;
  instead.href = "search.html?q=" + encodeURIComponent(query) + "&instead=1";
  document.getElementById("sr-dym").hidden = false;
});

function isAboutTom(query) {
  return /\b(tom|thomas|stepp|tomstepp)\b/i.test(query);
}
