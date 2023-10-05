// (function () {
//   const dateHereDate = document.querySelectorAll("[data-here-date]");

//   if (!dateHereDate.length) {
//     return;
//   }

//   dateHereDate.forEach((input) => {
//     const parent = input.closest(".inspire--select");
//     const container = parent.querySelector(".datepicker__cal");
//     // const dateFrom = parent.querySelector("[name='date_from']");
//     // const dateTo = parent.querySelector("[name='date_to']");

//     // console.log(dateFrom);
//     // dateFrom.addEventListener("change", () => {
//     //   console.log("change");
//     // });

//     // dateFrom.addEventListener("input", function (event) {
//     //   console.log("input");
//     // });

//     // dateFrom.addEventListener("paste", () => {
//     //   console.log("paste");
//     // });

//     input.addEventListener("input", () => {
//       const inputDates = input.value.split(",");
//       const isClick = container.querySelectorAll(".is-click");
//       console.log(seconds);

//       if (isClick.length) {
//         isClick.forEach((el) => {
//           el.classList.remove("is-click");
//         });
//       }

//       inputDates.forEach((day) => {
//         const date = getDateCustom(day);
//         date.setHours(0, 0, 0, 0);
//         date.setDate(date.getDate() + 1);
//         const seconds = Math.floor(date.getTime());
//         const dataDay = container.querySelector(`[data-day="${seconds}"]`);

//         console.log(seconds);

//         if (dataDay) {
//           dataDay.classList.add("is-click");
//         }
//       });
//     });
//   });

//   function getDateCustom(str) {
//     const userLang = navigator.language || navigator.userLanguage;

//     // Проверяем формат даты и преобразуем его в формат ISO
//     if (str.includes(".")) {
//       str = str.split(".").reverse();
//     } else if (str.includes("/")) {
//       str = str.split("/").reverse();
//     }

//     if (userLang == "en-US") {
//       str[1] = str[1] ^ str[2];
//       str[2] = str[1] ^ str[2];
//       str[1] = str[1] ^ str[2];
//     }

//     str = str.join("-");

//     // Создаем объект Date из преобразованной строки
//     return new Date(str);
//   }
// })();
