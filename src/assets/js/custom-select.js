const selects = document.querySelectorAll(".inspire--select");

if (selects.length) {
  selects.forEach((select) => {
    const header = select.querySelector(".inspire--select-header");
    // const dates = select.querySelectorAll("[type='date']");

    if (!header) return;

    header.addEventListener("click", () => {
      select.classList.toggle("active");
    });

    select.addEventListener("click", ({ target }) => {
      if (select == target) {
        select.classList.toggle("active");
      }
    });

    // if (dates.length) {
    //   dates.forEach((item) => {
    //     item.addEventListener("change", () => {
    //       console.log(item.value);
    //     });
    //   });
    // }

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
