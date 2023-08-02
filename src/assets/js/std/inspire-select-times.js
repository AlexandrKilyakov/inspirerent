const selectParent = document.querySelectorAll(
  ".inspire--select-times .inspire--select"
);

if (selectParent.length) {
  selectParent.forEach((parent) => {
    const selectTimesHeader = parent.querySelector(".inspire--select-header");
    const selectTimesInput = parent.querySelector(
      ".inspire--select-header input"
    );
    const selectTimesName = parent.querySelector(
      ".inspire--select-header .name"
    );
    const selectTimesTriggers = parent.querySelectorAll(
      ".content .triggers input"
    );

    selectTimesTriggers.forEach((trigger) => {
      trigger.addEventListener("change", () => {
        selectTimesHeader.dataset.indicator = trigger.dataset.indicator;
        selectTimesInput.value = trigger.value;
        selectTimesName.innerHTML = trigger.value;
      });
    });
  });
}
