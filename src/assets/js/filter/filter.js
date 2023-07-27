const inputs = document.querySelectorAll(".filter--car .click--elements input");
const slides = document.querySelectorAll(".filter--car .scroll--car .slide");

if (inputs.length && slides.length) {
  const filter = {
    new: false,
    box_types: false,
    favorites: false,
  };

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (!filterArray.length) {
        return;
      }

      switch (input.name) {
        case "box-types":
          filter.box_types = input.checked ? input.value : input.checked;
          break;
        case "new":
          filter.new = input.checked;
          break;
        case "favorites":
          filter.favorites = input.checked;
          break;
      }

      filterArray.forEach((item) => {
        slides[item.id].style.display = "";
        Object.keys(filter).forEach((key) => {
          if (filter[key] && item[key] !== filter[key]) {
            slides[item.id].style.display = "none";
          }
        });
      });
    });
  });
}
