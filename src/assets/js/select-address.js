const SELECT_ADDRESS = document.querySelectorAll("[select-address]");

if (SELECT_ADDRESS.length) {
  SELECT_ADDRESS.forEach((address) => {
    const name = address.querySelector(".inspire--select-header .name");

    let text1 = "";
    let text2 = "";

    let palce = address.querySelector("[js-refund-same-place]");

    let br = palce ? "<br>" : "";

    address.addEventListener("click", ({ target }) => {
      let pointIssue = target.closest("[js-point-of-issue]");
      let pointReturn = target.closest("[js-point-of-return]");
      let pointPlace = target.closest("[js-refund-same-place]");

      if (!(pointIssue || pointReturn || pointPlace)) {
        return;
      }

      if (pointIssue) {
        text1 = "Пункт выдачи " + pointIssue.dataset.text;
      } else if (pointReturn) {
        text2 = br + "Пункт возврата " + pointReturn.dataset.text;
      } else if (pointPlace) {
        let input = pointPlace.querySelector("input");

        if (input.checked) {
          text2 = "";
        }
      }

      name.innerHTML = text1 + text2;
    });
  });
}
