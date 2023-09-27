addEventSelect(document.querySelectorAll("[select-times]"));
addEventSelect(document.querySelectorAll("[select-text]"));

function addEventSelect(element) {
  if (element.length) {
    element.forEach((parent) => {
      const selectTimesHeader = parent.querySelector(".inspire--select-header");
      const selectTimesName = parent.querySelector(
        ".inspire--select-header .name"
      );
      const selectTimesTriggers = parent.querySelectorAll(
        ".content .triggers input"
      );

      selectTimesTriggers.forEach((trigger) => {
        trigger.addEventListener("change", () => {
          if (trigger.dataset.indicator) {
            selectTimesHeader.dataset.indicator = trigger.dataset.indicator;
          }

          selectTimesName.innerHTML =
            trigger.parentElement.querySelector(".txt").innerHTML;

          parent.classList.remove("active");
        });
      });
    });
  }
}
