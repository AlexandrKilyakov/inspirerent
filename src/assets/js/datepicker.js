// const dateHereDate = document.querySelectorAll("[data-here-date]");

// if (dateHereDate.length) {
//   dateHereDate.forEach((input) => {
//     const parent = input.closest(".inspire--select");
//     const container = parent.querySelector(".datepicker__container");
//     const clickDate = parent.querySelector("[data-click-date]");
//     const inputDates = input.value.split(",");

//     const dates =
//       inputDates.length > 1
//         ? getDates(inputDates[0], inputDates[1])
//         : getDates();

//     let start = new Date(dates[0]);
//     let end = new Date(dates[dates.length - 1]);

//     if (inputDates.length < 2) {
//       input.value = `${start.getDate()}.${
//         start.getMonth() + 1
//       }.${start.getFullYear()},${end.getDate()}.${
//         end.getMonth() + 1
//       }.${end.getFullYear()}`;
//     }

//     dates.forEach((date) => {
//       let day = container.querySelector(`[data-day="${date}"]`);

//       if (day) {
//         day.classList.add("is-selected");
//       }
//     });

//     clickDate.click();
//   });
// }

// function getDates(start = false, end = false) {
//   const dates = [];

//   if (!start || !end) {
//     for (let i = 0; i < 3; i++) {
//       const date = new Date();
//       date.setHours(0, 0, 0, 0);
//       date.setDate(date.getDate() + i + 1);
//       const seconds = Math.floor(date.getTime());
//       dates.push(seconds);
//     }
//   } else {
//     start = getDateCustom(start);
//     end = getDateCustom(end);

//     let startDate = new Date(start);
//     let endDate = new Date(end);

//     endDate.setHours(0, 0, 0, 0);
//     endDate.setDate(endDate.getDate());

//     let i = 0;

//     while (startDate.getTime() < endDate.getTime()) {
//       startDate = new Date(start);
//       startDate.setHours(0, 0, 0, 0);
//       startDate.setDate(startDate.getDate() + i++);
//       let seconds = Math.floor(startDate.getTime());
//       dates.push(seconds);
//     }
//   }

//   return dates;
// }

// function getDateCustom(item) {
//   let tmp = item.split(".");

//   if (tmp.length && tmp[0].length < 3) {
//     tmp = tmp.reverse();
//   }

//   return tmp.join(".");
// }
