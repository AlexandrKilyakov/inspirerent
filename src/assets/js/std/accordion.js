const accordion = document.querySelectorAll(".accordion");
let accordionMaxHeight = [];
let accordionMinHeight = [];

if (accordion) {
  setTimeout(function () {
    accordion.forEach((acc) => {
      let child = acc.querySelector(".accordion--child");
      accordionMaxHeight.push(child.children[0].offsetHeight);
      child.style.height = "0px";
      accordionMinHeight.push(child.offsetHeight);
    });

    accordion.forEach((acc, i) => {
      let child = acc.querySelector(".accordion--child");
      let arrow = acc.querySelector(".accordion--name");

      arrow.addEventListener("click", function () {
        child.style.height = `${
          child.offsetHeight == accordionMinHeight[i]
            ? accordionMaxHeight[i]
            : accordionMinHeight[i]
        }px`;
        acc.classList.toggle("active");
      });
    });
  }, 500);
}
