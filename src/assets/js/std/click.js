document.addEventListener("click", (e) => {
  const el = e.target;

  if (!el) {
    return;
  }

  const dataActive = el.closest("[data-active]");
  const dataClose = el.closest("[data-close]");
  const dataClick = el.closest("[data-click]");
  const dataAside = el.closest("[data-aside]");
  const dataToggleFavorites = el.closest("[data-toggle-favorites]");

  if (dataClose) {
    const notice = el.closest(`[data-${dataClose.dataset.close}]`);

    if (notice) {
      notice.remove();
    }
  }

  if (dataActive) {
    const active = document.querySelector(
      `[data-${dataActive.dataset.active}]`
    );

    if (active) {
      active.classList.toggle("active");
    }
  }

  if (dataAside) {
    if (e.pageX > el.offsetWidth) {
      dataAside.classList.toggle("active");
    }
  }

  if (dataClick) {
    switch (dataClick.dataset.click) {
      case "this":
        const elClick = el.dataset.click;
        // Если клик произошел за пределами тела модалки, или по кнопке закрытия, тогда нужно скрыть модалку
        if (elClick && elClick == "this") {
          e.preventDefault();
          dataClick.classList.toggle("active"); // Скрываем модалку

          bodyToggleClass(dataClick);
        }
        break;
      case "custom--select":
        const customSelect = dataClick.closest(".custom--select");

        if (customSelect) {
          customSelect.classList.toggle("active");
        }
        break;
      case "choice-post":
        const posts = document.querySelectorAll("[data-posts] .post");

        if (posts.length) {
          posts.forEach((post) => {
            if (
              dataClick.checked &&
              !post.querySelector(`[data-type="${dataClick.name}"]`)
            ) {
              post.style.display = "none";
            } else {
              post.style.display = "";
            }
          });
        }

        break;
      default:
        let element = document.querySelector(`#${dataClick.dataset.click}`);

        if (element) {
          const afterClick = dataClick.dataset.afterClick;

          element.classList.toggle("active");

          // Добавляем/Убираем класс для кнопки
          if (afterClick) {
            dataClick.classList.toggle(afterClick);
          }

          bodyToggleClass(dataClick);
        }
    }
  }

  if (dataToggleFavorites) {
    dataToggleFavorites.dataset.toggleFavorites =
      dataToggleFavorites.dataset.toggleFavorites === "true" ? "" : "true";
  }
});

function bodyToggleClass(dataClick) {
  // Добавим/Убираем класс для body
  const bodyClass = dataClick.dataset.body;

  if (bodyClass) {
    document.body.classList.toggle(bodyClass);
  }
}
