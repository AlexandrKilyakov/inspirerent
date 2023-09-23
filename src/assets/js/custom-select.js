const selects = document.querySelectorAll(".inspire--select");
const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];
const year = new Date().getFullYear();

if (selects.length) {
  selects.forEach((select) => {
    const header = select.querySelector(".inspire--select-header");
    const dateClick = select.querySelector("[data-click-date]");

    if (!header) return;

    header.addEventListener("click", () => {
      select.classList.toggle("active");
    });

    select.addEventListener("click", ({ target }) => {
      if (select == target) {
        select.classList.toggle("active");
      }
    });

    if (dateClick) {
      dateClick.addEventListener("click", () => {
        let parent = dateClick.closest("[select-date]");

        if (!parent) {
          return;
        }

        let text = parent.querySelector(".inspire--select-header .name");
        let assets = parent.querySelector("[data-here-date]");
        let dateStart = parent.querySelector("[select-times-start]");
        let dateEnd = parent.querySelector("[select-times-end]");

        if (!(text && assets)) {
          return;
        }

        let dates = assets.value.split(",");

        if (dates.length) {
          text.textContent = "";
          dates.forEach((day, i) => {
            let elements = getDateCustom(day);
            let yearCheck = elements.getFullYear();

            text.textContent += i > 0 ? " — " : "";
            text.textContent += elements.getDate();
            text.textContent += " " + months[elements.getMonth()];
            text.textContent += year != yearCheck ? " " + yearCheck : "";

            if (!(dateStart && dateEnd)) {
              return;
            }

            let times = [dateStart.textContent, dateEnd.textContent];

            try {
              text.textContent += " " + times[i];
            } catch {
              console.log("Нет времени");
            }
          });

          try {
            if (dates.length > 1) {
              text.dataset.start = dates[0];
              text.dataset.end = dates[1];
              selectDate(text.parentElement);
            } else {
              text.dataset.start = "";
              text.dataset.end = "";
              selectDate(text.parentElement);
            }
          } catch {
            console.log("Нет диапазона дат");
          }
        }

        select.classList.remove("active");
      });
    }

    const selectType = header.dataset.type;

    if (selectType) {
      switch (selectType) {
        case "point-issue":
          break;
        case "date":
          selectDate(header);
          break;
        default:
          break;
      }
    }
  });
}

// Работаем с селектом даты
function selectDate(item) {
  const dataStart = item.querySelector("[data-start]");
  const dataEnd = item.querySelector("[data-end]");

  if (!(dataStart && dataEnd)) return;
  if (dataStart.dataset.start == "" || dataEnd.dataset.end == "") return;

  let tmp = getDateCustom(dataStart.dataset.start);

  const start = tmp.getDate();
  const startMonth = tmp.getMonth() + 1;
  const startYear = tmp.getFullYear();

  tmp = getDateCustom(dataEnd.dataset.end);

  const end = tmp.getDate();
  const endMonth = tmp.getMonth() + 1;
  const endYear = tmp.getFullYear();

  const output = item.querySelector("[data-output]");

  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const d1 = `${startYear || year}.${startMonth || month}.${start || day}`;
  const d2 = `${endYear || year}.${endMonth || month}.${end || day}`;

  output.dataset.output = getDiffInDaysWeeksMonths(d1, d2);
}

function getDateCustom(str) {
  // Проверяем формат даты и преобразуем его в формат ISO
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(str)) {
    str = str.split(".").reverse().join("-");
  } else if (/^\d{4}\.\d{2}\.\d{2}$/.test(str)) {
    str = str.replace(/\./g, "-");
  } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
    str = str.split("/").reverse().join("-");
  }

  console.log(new Date(str));

  // Создаем объект Date из преобразованной строки
  return new Date(str);
}

// Получаем индекс окончания
function getDeclension(number, one, few, many) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return one;
  } else if (
    [2, 3, 4].includes(number % 10) &&
    ![12, 13, 14].includes(number % 100)
  ) {
    return few;
  } else {
    return many;
  }
}

// Выводи дни и  месяцы
function getDiffInDaysWeeksMonths(d1, d2) {
  d1 = new Date(d1);
  d2 = new Date(d2);

  const ONE_DAY = 24 * 60 * 60 * 1000;
  const diff = Math.round(Math.abs((d2 - d1) / ONE_DAY));

  const months = Math.floor(diff / 30.44);
  const days = Math.floor(diff - months * 30.44);

  const daysStr = `${days} ${getDeclension(days, "день", "дня", "дней")}`;
  const monthsStr = `${months} ${getDeclension(
    months,
    "месяц",
    "месяца",
    "месяцев"
  )}`;

  let result = days ? `${daysStr}` : "";
  result += months ? ` ${monthsStr}` : "";

  return result;
}
