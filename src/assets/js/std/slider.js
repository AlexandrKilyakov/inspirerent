// Дождитесь загрузки содержимого DOM
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      // Найдите все ползунки на странице
      const sliders = document.querySelectorAll("[data-role='slider']");
      // Создайте массив для хранения значений хода выполнения ползунка
      const sliderProgress = [];
  
      // Если на странице есть ползунки
      if (sliders.length) {
        // Пройдитесь по каждому слайдеру и создайте новый объект слайдера
        sliders.forEach((slider) => {
          sliderProgress.push(new Slider(slider));
        });
      }
    }, 500);
  });
  
  class Slider {
    constructor(slider) {
      this.slider = slider;
      this.window = slider.querySelector("[data-slider='window']");
      this.track = slider.querySelector("[data-slider='track']");
      this.btnLeft = slider.querySelector('[data-slide="left"]');
      this.btnRight = slider.querySelector('[data-slide="right"]');
      this.radio = slider.querySelector("[data-slider='radio']");
      this.slides = [];
      this.step = 0;
      this.n = 0;
      this.x = 0;
  
      this.start();
    }
  
    start() {
      this.slides.push(...this.track.children);
      this.steps = [0];
      this.setSteps();
      this.setTrackTransform(this.steps[0]);
  
      if (this.btnLeft && this.btnRight) {
        this.addTriggers();
        this.interactiveScreen();
      }
    }
  
    setSteps() {
      const slidesLength = this.slides.length - 1;
      const slideWidth = this.slides[slidesLength].offsetWidth;
      const slideLeft = this.slides[slidesLength].offsetLeft;
  
      let slideStep = 0;
      let windowWidth = this.window.offsetWidth;
      let maxWidth = slideWidth + slideLeft;
  
      if (this.slides.length > 1) {
        this.slides.forEach((slide, i) => {
          if (slide.offsetLeft + slide.offsetWidth > windowWidth) {
            this.steps.push(slide.offsetLeft);
            windowWidth = this.window.offsetWidth + slide.offsetLeft;
            slideStep = i;
          }
        });
      }
  
      let slidesLW =
        this.slides[slideStep].offsetLeft + this.slides[slideStep].offsetWidth;
  
      if (windowWidth - slidesLW < this.window.offsetWidth) {
        this.steps[this.steps.length - 1] = maxWidth - this.window.offsetWidth;
      }
  
      if (this.radio) {
        this.radio.innerHTML = "";
  
        if (this.steps.length > 1) {
          this.steps.forEach((step, i) => {
            this.radio.innerHTML += `<label class="triggers" data-slide="step" data-step="${i}">
                                            <input type="radio" name="radio" />
                                            <span class="trigger"></span>
                                        </label>`;
          });
  
          this.radio.addEventListener("click", (e) => {
            let el = e.target;
  
            if (el.dataset.step) {
              let id = ~~el.dataset.step;
              this.setTrackTransform(this.steps[id]);
              this.step = id;
            }
          });
  
          this.radio.children[0].click();
        }
      }
    }
  
    addTriggers() {
      this.n = this.steps.length;
  
      if (this.n > 1) {
        this.btnLeft.classList.remove("hide");
        this.btnRight.classList.remove("hide");
  
        this.slider.style.height = "";
  
        this.btnLeft.onclick = () => {
          this.actionAfterButton(-1);
        };
        this.btnRight.onclick = () => {
          this.actionAfterButton(1);
        };
      } else {
        this.btnLeft.classList.add("hide");
        this.btnRight.classList.add("hide");
        this.slider.style.height = `${this.slider.offsetHeight + 2}px`;
      }
    }
  
    setTrackTransform(x) {
      this.track.style.transform = `translateX(-${x}px)`;
    }
  
    actionAfterButton(i) {
      this.step =
        i > 0
          ? ++this.step > this.n - 1
            ? 0
            : this.step
          : --this.step < 0
          ? this.n - 1
          : this.step;
      this.setTrackTransform(this.steps[this.step]);
  
      if (this.radio) {
        this.radio.children[this.step].querySelector("input").checked = true;
      }
    }
  
    interactiveScreen() {
      this.slider.addEventListener("mousedown", (e) => {
        this.x = e.pageX;
      });
  
      this.slider.addEventListener("mouseup", (e) => {
        if (this.x > e.pageX) {
          this.btnRight.click();
        } else if (this.x < e.pageX) {
          this.btnLeft.click();
        }
      });
  
      this.slider.addEventListener("touchstart", (e) => {
        this.x = e.touches[0].pageX;
      });
  
      this.slider.addEventListener("touchend", (e) => {
        if (this.x > e.changedTouches[0].pageX) {
          this.btnRight.click();
        } else if (this.x < e.changedTouches[0].pageX) {
          this.btnLeft.click();
        }
      });
    }
  }
  