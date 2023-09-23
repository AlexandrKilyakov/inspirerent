const cars = document.querySelectorAll(".scroll--car");

if (cars.length) {
  cars.forEach((car) => {
    eventScroll(car);
  });
}

function eventScroll(item) {
  let isDragging = false;
  let startX, scrollLeft;

  // Обработчик нажатия кнопки мыши
  item.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.pageX - this.offsetLeft;
    scrollLeft = this.scrollLeft;
  });

  // Обработчик отпускания кнопки мыши
  item.addEventListener("mouseup", function (e) {
    isDragging = false;
  });

  // Обработчик движения мыши при удержании кнопки
  item.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    let x = e.pageX - this.offsetLeft;
    let walk = (x - startX) * 3; // Множитель скорости скролла
    this.scrollLeft = scrollLeft - walk;
  });
}
