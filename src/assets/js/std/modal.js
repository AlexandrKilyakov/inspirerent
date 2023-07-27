document.addEventListener("DOMContentLoaded", () => {
  // Собираю все модалки на странице
  const modals = document.querySelectorAll(".modal");

  // Если модалок нет, тогда дальнейший код нам не нужен
  if (!modals.length) {
    return;
  }

  // Перебираем все модалки и даем им действие на клик
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      let el = e.target; // Записываем в переменную для личного удобства

      // Если клик произошел за пределами тела модалки, или по кнопке закрытия, тогда нужно скрыть модалку
      if (
        el.classList.contains("modal") ||
        el.closest("[data-click='close']")
      ) {
        e.preventDefault();
        modal.classList.toggle("active"); // Скрываем модалку
      }
    });
  });
});
