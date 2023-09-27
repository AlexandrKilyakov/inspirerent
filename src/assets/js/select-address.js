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
    let btnAddress = address.querySelector("[data-click-address]");

    let br = palce ? "<br>" : "";

    if (btnAddress) {
      btnAddress.addEventListener("click", () => {
        setText();
        address.classList.remove("active");
      });
    }

    address.addEventListener("click", ({ target }) => {
      let pointIssue = target.closest("[js-point-of-issue]");
      let pointReturn = target.closest("[js-point-of-return]");
      let pointPlace = target.closest("[js-refund-same-place]");

      if (!(pointIssue || pointReturn || pointPlace)) {
        return;
      }

      let dataTrigger = target.parentElement.dataset.triggersNotChange;

      if (pointIssue) {
        text1 = getText1(pointIssue);
      } else if (pointReturn) {
        text2 = getText2(pointReturn);
      } else if (pointPlace && (!dataTrigger || dataTrigger === "false")) {
        let input = pointPlace.querySelector("input");

        if (input.checked) {
          text2 = "";
        }
      }

      if (!btnAddress) {
        setText();
      }
    });

    function getText1(el) {
      return subtext1 + twoWord(el.dataset.text);
    }

    function getText2(el) {
      return br + subtext2 + twoWord(el.dataset.text);
    }

    function getText() {
      let tmp;

      if (!text1) {
        tmp = address.querySelector("[js-point-of-issue] input[checked]");

        if (tmp) {
          text1 = getText1(tmp.closest("[data-text]"));
        }
      }
      if (!text2) {
        tmp = address.querySelector("[js-point-of-return] input[checked]");

        if (tmp) {
          text2 = getText2(tmp.closest("[data-text]"));
        }
      }
    }

    function setText() {
      getText();
      name.innerHTML = text1 + text2;
    }
  });
}

function twoWord(str) {
  let words = str.split(" ");
  return words.slice(0, 2).join(" ");
}
