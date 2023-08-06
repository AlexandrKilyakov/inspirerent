document.addEventListener("click", (e) => {
  let el = e.target;

  if (!el) {
    return false;
  }

  let dataStep = el.closest("[data-step]");

  if (dataStep) {
    let input = el.parentElement.querySelector("input");

    if (!input) {
      return;
    }
    switch (dataStep.dataset.step) {
      case "up":
        input.stepUp();
        break;
      case "down":
        input.stepDown();
        break;
      default:
        break;
    }
  }
});
