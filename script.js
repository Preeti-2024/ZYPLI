function loadSection(section) {
  fetch(`sections/${section}.html`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Page not found");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      window.scrollTo(0, 0); // scroll to top on page change
    })
    .catch((error) => {
      document.getElementById("content").innerHTML =
        "<h2 style='padding:40px;text-align:center;'>Page not found</h2>";
      console.error(error);
    });
}

/* Load Home by default */
window.onload = () => {
  loadSection("home");
};
