const customSelects = document.querySelectorAll(".custom--select");

if (customSelects.length) {
  customSelects.forEach((cs) => {
    const csName = cs.querySelector(".custom--select .name");
    const csInput = cs.querySelectorAll(".custom--select .options input");

    cs.addEventListener("click", (e) => {
      const target = e.target;

      if (target.classList.contains("active")) {
        const x = e.pageX > e.target.offsetWidth || e.pageX < 0;
        const y = e.pageY > e.target.offsetHeight || e.pageY < 0;

        if (x || y) {
          target.classList.remove("active");
        }
      }
    });

    if (csName && csInput) {
      csInput.forEach((input) => {
        input.addEventListener("change", () => {
          let text = input.closest(".triggers").querySelector(".chips");
          let dataSort = input.dataset.sort;
          csName.textContent = text.textContent;

          if (dataSort && sortArray[dataSort]) {
            filterArray = sortArray[dataSort];

            filterArraySort();
          }
        });
      });

      csInput[0].click();
    }
  });
}
function filterArraySort() {
  const slides = document.querySelectorAll(".filter--car .scroll--car .slide");

  filterArray.forEach((item, i) => {
    slides[item.id].style.order = i;
    slides[0].parentElement.scrollLeft = 0;
  });
}
