document.addEventListener("DOMContentLoaded", function () {
  testWebP(document.body);
});

function testWebP(elem) {
  const webP = new Image();
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  webP.onload = webP.onerror = function () {
    webP.height === 2
      ? elem.classList.add("webp")
      : elem.classList.add("no-webp");
  };
}
