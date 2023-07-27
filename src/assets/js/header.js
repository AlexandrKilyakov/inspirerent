const HEADER = document.querySelector(".header");

if (HEADER) {
  document.body.style.setProperty(
    "--height-header",
    `${HEADER.offsetHeight}px`
  );
}
