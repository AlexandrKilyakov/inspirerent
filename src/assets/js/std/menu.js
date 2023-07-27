const active = "active";

const menu = document.getElementById("#menu");
const btn = document.querySelector("[data-click='menu']");

if (menu) {
  menu.addEventListener("click", (e) => {
    let el = e.target;

    if (el.id === "menu" || el.closest("a")) {
      if (btn) {
        btn.click();
      } else {
        menu.classList.toggle(active);
      }
    }
  });

  menuChilds(menu);
}

// Функция для эллементов меню, а точнее для тех, у кого есть дочерние элементы и они должны быть показаны при клике
function menuChilds(menu, active = "active") {
  const childs = menu.querySelectorAll(".child");

  if (!childs.length) {
    return;
  }

  childs.forEach((child) => {
    const element = child.parentElement;

    element.addEventListener("click", (e) => {
      let el = e.target;

      if (!el.closest("a") && !el.closest("child")) {
        let ctv = menu.querySelector(`.${active}`);

        if (ctv) {
          ctv.classList.remove(active);

          if (ctv !== element) {
            element.classList.add(active);
          }
        } else {
          element.classList.add(active);
        }
      }
    });
  });
}
