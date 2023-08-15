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
            let elements = day.split(".");

            text.textContent += i > 0 ? " — " : "";
            text.textContent += elements[0];
            text.textContent += " " + months[~~elements[1] - 1];
            text.textContent += year < ~~elements[2] ? " " + elements[2] : "";

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

        select.classList.toggle("active");
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

  let tmp = dataStart.dataset.start.split(".");

  const start = tmp[0];
  const startMonth = tmp[1];
  const startYear = tmp[2];

  tmp = dataEnd.dataset.end.split(".");
  const end = tmp[0];
  const endMonth = tmp[1];
  const endYear = tmp[2];

  const output = item.querySelector("[data-output]");

  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const d1 = `${startYear || year}.${startMonth || month}.${start || day}`;
  const d2 = `${endYear || year}.${endMonth || month}.${end || day}`;

  output.dataset.output = getDiffInDaysWeeksMonths(d1, d2);
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
