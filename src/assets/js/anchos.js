document.addEventListener("DOMContentLoaded", () => {
  if (innerWidth < 1000) return;

  const ANCHOS_LI = document.querySelectorAll(".anchos li");
  const HEADER = document.querySelector("[data-role='header']");
  const points = [];

  if (!ANCHOS_LI.length) return;

  ANCHOS_LI.forEach((li) => {
    let anchos = li.querySelector("a");
    points.push(
      document.querySelector(`#${anchos.hash.substring(1)}`).offsetTop -
        HEADER.offsetHeight
    );

    anchos.addEventListener("click", () => {
      setAnchor(li);
    });
  });

  document.addEventListener("scroll", (e) => {
    points.forEach((point, i) => {
      if (point <= scrollY) {
        setAnchor(ANCHOS_LI[i]);
      }
    });
  });
});

function setAnchor(li) {
  let ctv = document.querySelector(".anchos li.current");

  if (ctv) {
    ctv.classList.remove("current");
  }
  li.classList.add("current");
}
