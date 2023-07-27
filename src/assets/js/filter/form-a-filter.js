window.filterArray = [];
window.sortArray = {};

const slides = document.querySelectorAll(".filter--car .scroll--car .slide");

if (slides.length) {
  slides.forEach((slide, i) => {
    let dataNew =
      slide.querySelector("[data-new]") || slide.closest("[data-new]");
    let dataView =
      slide.querySelector("[data-view]") || slide.closest("[data-view]");
    let dataBoxTypes =
      slide.querySelector("[data-box-types]") ||
      slide.closest("[data-box-types]");
    let dataFavorites =
      slide.querySelector("[data-toggle-favorites]") ||
      slide.closest("[data-toggle-favorites]");
    let dataDiscount =
      slide.querySelector("[data-discount]") ||
      slide.closest("[data-discount]");
    let dataOldPrice =
      slide.querySelector("[data-old-price]") ||
      slide.closest("[data-old-price]");
    let dataPrice =
      slide.querySelector("[data-price]") || slide.closest("[data-price]");
    let dataRent =
      slide.querySelector("[data-rent]") || slide.closest("[data-rent]");

    const filterObject = {
      id: 0,
      new: false,
      view: 0,
      box_types: null,
      favorites: false,
      discount: 0,
      old_price: 0,
      price: 0,
      rent: 0,
    };

    filterObject.id = i;

    if (dataNew) {
      filterObject.new = dataNew.dataset.new.length ? true : false;
    }

    if (dataView) {
      let tmp = ~~dataView.dataset.view.replace(/\s+/g, "");
      filterObject.view = tmp > 0 ? tmp : 0;
    }

    if (dataBoxTypes) {
      let tmp = dataBoxTypes.dataset.boxTypes;
      filterObject.box_types = tmp.length ? tmp : null;
    }

    if (dataFavorites) {
      filterObject.favorites = dataFavorites.dataset.toggleFavorites.length
        ? true
        : false;
    }

    if (dataDiscount) {
      let tmp = ~~dataDiscount.dataset.discount.replace(/\s+/g, "");
      filterObject.discount = tmp > 0 ? tmp : 0;
    }

    if (dataOldPrice) {
      let tmp = ~~dataOldPrice.dataset.oldPrice.replace(/\s+/g, "");
      filterObject.old_price = tmp > 0 ? tmp : 0;
    }

    if (dataPrice) {
      let tmp = ~~dataPrice.dataset.price.replace(/\s+/g, "");
      filterObject.price = tmp > 0 ? tmp : 0;
    }

    if (dataRent) {
      let tmp = ~~dataRent.dataset.rent.replace(/\s+/g, "");
      filterObject.rent = tmp > 0 ? tmp : 0;
    }

    filterArray.push(filterObject);
  });

  sortArray["default"] = filterArray.slice();

  sortArray = {
    by_popularity: (a, b) => b.view - a.view,
    ascending_price: (a, b) => a.price - b.price,
    descending_price: (a, b) => b.price - a.price,
    by_new: (a, b) => b.new - a.new,
    profitable_first: (a, b) => {
      const aDiscount = a.old_price * (a.discount / 100);
      const bDiscount = b.old_price * (b.discount / 100);
      return bDiscount - aDiscount;
    },
  };

  for (let key in sortArray) {
    sortArray[key] = filterArray.slice().sort(sortArray[key]);
  }
}
