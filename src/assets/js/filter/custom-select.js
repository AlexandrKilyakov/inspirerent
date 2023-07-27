document.addEventListener("DOMContentLoaded", () => {
  const customSelects = document.querySelectorAll(".custom--select");

  if (!customSelects.length) {
    return;
  }

  customSelects.forEach((cs) => {
    const csName = cs.querySelector(".custom--select .name");
    const csInput = cs.querySelectorAll(".custom--select .options input");

    if (!(csName && csInput)) {
      return;
    }

    csInput.forEach((input) => {
      input.addEventListener("change", () => {
        let dataSort = input.dataset.sort;
        csName.textContent = input.value;

        if (dataSort && sortArray[dataSort]) {
          filterArray = sortArray[dataSort];

          filterArraySort();
        }
      });
    });

    csInput[0].click();
  });
});

function filterArraySort() {
  const slides = document.querySelectorAll(".filter--car .scroll--car .slide");

  filterArray.forEach((item, i) => {
    slides[item.id].style.order = i;
    slides[0].parentElement.scrollLeft = 0;
  });
}
