const SELECT_ADDRESS = document.querySelectorAll("[select-address]");

if (SELECT_ADDRESS.length) {
  SELECT_ADDRESS.forEach((address) => {
    const headerSelect = address.querySelector(".inspire--select-header");
    const name = headerSelect.querySelector(".name");
    const pointIssue = headerSelect.dataset.type == "point-issue";

    let subtext1 = pointIssue ? "Пункт выдачи " : "";
    let subtext2 = pointIssue ? "Пункт возврата " : "";

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

      let dataTrigger = target.parentElement.dataset.triggersNotChange;

      if (pointIssue) {
        text1 = subtext1 + twoWord(pointIssue.dataset.text);
      } else if (pointReturn) {
        text2 = br + subtext2 + twoWord(pointReturn.dataset.text);
      } else if (pointPlace && (!dataTrigger || dataTrigger === "false")) {
        let input = pointPlace.querySelector("input");

        if (input.checked) {
          text2 = "";
        }
      }

      name.innerHTML = text1 + text2;
    });
  });
}

function twoWord(str) {
  let words = str.split(" ");
  return words.slice(0, 2).join(" ");
}
