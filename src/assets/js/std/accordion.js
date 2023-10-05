(() => {
  const accordion = document.querySelectorAll(".accordion");
  let accordionMaxHeight = [];
  let accordionMinHeight = [];

  if (accordion) {
    let width = 0;

    setTimeout(function () {
      accordion.forEach((acc) => {
        let child = acc.querySelector(".accordion--child");
        accordionMaxHeight.push(child.children[0].offsetHeight);
        child.style.height = "0px";
        accordionMinHeight.push(child.offsetHeight);

        if (acc.classList.contains("active")) {
          child.style.height = `${
            accordionMaxHeight[accordionMaxHeight.length - 1]
          }px`;
        }
      });

      accordion.forEach((acc, i) => {
        const child = acc.querySelector(".accordion--child");
        const arrow = acc.querySelector(".accordion--name");
        const input = acc.querySelector(".accordion--name.triggers input");

        child.addEventListener("transitionend", () => {
          if (child.offsetHeight == accordionMaxHeight[i]) {
            child.style.height = "auto";
          }
        });

        arrow.addEventListener("click", function (event) {
          event.preventDefault();
          if (acc.dataset.accordionOnly) {
            const accordionOnly = acc.parentElement.querySelectorAll(
              "[data-accordion-only]"
            );

            accordionOnly.forEach((item) => {
              if (item === acc) {
                return;
              }

              if (item.classList.contains("active")) {
                triggerClick(item);
              }
            });
          }
          if (child.offsetHeight == accordionMinHeight[i]) {
            width = accordionMaxHeight[i];
          } else {
            child.style.height = `${child.offsetHeight}px`;
            accordionMaxHeight[i] = child.offsetHeight;
            width = accordionMinHeight[i];
          }
          child.style.height = `${width}px`;

          acc.classList.toggle("active");

          if (acc.dataset.triggersNotChange == "true") {
            acc.dataset.triggersNotChange = "false";
          } else if (acc.dataset.triggersNotChange == "") {
            acc.dataset.triggersNotChange = "true";
          } else {
            if (input) {
              input.checked = !input.checked;
            }
          }
        });
      });
    }, 500);
  }

  function triggerClick(item) {
    let trigger = item.querySelector(".accordion--name");

    if (trigger) {
      if (trigger.classList.contains("triggers")) {
        item.dataset.triggersNotChange = "";
      }

      trigger.click();
    }
  }
})();
