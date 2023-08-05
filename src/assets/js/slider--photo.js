const SLIDER_PHOTO = document.querySelectorAll(".slider--photo");

if (SLIDER_PHOTO.length) {
  SLIDER_PHOTO.forEach((slider) => {
    const PREVIEW = slider.querySelector(".preview img");
    const STEPS = slider.querySelector(".steps");
    const BTN = slider.querySelector("[data-step]");

    if (PREVIEW && STEPS) {
      STEPS.addEventListener("click", ({ target }) => {
        if (target.nodeName == "IMG") {
          let ctv = STEPS.querySelector(".active");
          if (ctv) {
            ctv.classList.remove("active");
          }
          PREVIEW.src = target.src;
          target.classList.add("active");

          if (STEPS.offsetHeight > STEPS.offsetWidth) {
            let targetSize = target.offsetTop + target.offsetHeight;
            let stepsSize = STEPS.scrollTop + STEPS.offsetHeight;

            if (target.offsetTop < target.offsetHeight) {
              STEPS.scroll(0, 0);
            } else if (targetSize > stepsSize) {
              STEPS.scroll(0, target.offsetHeight + STEPS.scrollTop);
            }
          } else if (STEPS.offsetHeight < STEPS.offsetWidth) {
            let targetSize = target.offsetLeft + target.offsetWidth;
            let stepsSize = STEPS.scrollLeft + STEPS.offsetWidth;

            if (target.offsetLeft < target.offsetWidth) {
              STEPS.scroll(0, 0);
            } else if (targetSize > stepsSize) {
              STEPS.scroll(target.offsetWidth + STEPS.scrollLeft, 0);
            }
          }
        }
      });

      if (BTN) {
        BTN.addEventListener("click", () => {
          let ctv = STEPS.querySelector(".active");

          if (ctv) {
            let next = ctv.nextElementSibling;

            if (next) {
              next.click();
            } else {
              STEPS.children[0].click();
            }
          } else {
            STEPS.children[0].click();
          }
        });
      }
    }
  });
}
