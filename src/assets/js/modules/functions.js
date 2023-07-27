export function hide(el) {
  try {
    for (let i = 0; i < el.length; i++) {
      if (!el[i].classList.contains("hide")) {
        el[i].classList.add("hide");
      }
    }
  } catch (error) {
    if (!el.classList.contains("hide")) {
      el.classList.add("hide");
    }
  }
}

export function show(el) {
  if (el.classList.contains("hide")) {
    el.classList.remove("hide");
  }
}

export function targetClass(e, cls) {
  return e.target && !e.target.classList.contains(cls);
}

export function changeActive(e, el, cls) {
  el.querySelector(`.${cls}`).classList.remove(cls);
  e.target.classList.add(cls);
}

export function getNumberChildren(parent, child) {
  for (let i = 0; i < parent.childElementCount; i++) {
    if (parent.childNodes[i] == child) {
      return i;
    }
  }
}

export function getCss(el, style) {
  return window.getComputedStyle(el, null).getPropertyValue(style);
}

export function getNumber(el) {
  return parseInt(el.match(/\d+/g).join(""));
}

export function getTranslateX(el) {
  let transformValue = getComputedStyle(el).getPropertyValue("transform");
  let matrix = new DOMMatrix(transformValue);
  return matrix.m41;
}
