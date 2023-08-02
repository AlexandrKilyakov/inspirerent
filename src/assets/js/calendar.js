// const calendar = document.querySelectorAll("[data-calendar]");

// if (calendar.length) {
//   const hdr =
//     '<div class="week">пн</div><div class="week">вт</div><div class="week">ср</div><div class="week">чт</div><div class="week">пт</div><div class="week">сб</div><div class="week">вс</div>';
//   const getTitle = (d, y) => `<div class="title">${d + 1 + "." + y}</div>`;
//   calendar.forEach((cal) => {
//     let dStart = Date.now();
//     let dEnd = new Date(new Date().getFullYear(), 11, 31);

//     let ds = new Date(dStart);
//     let de = new Date(dEnd);

//     ds.setDate(1);
//     de.setMonth(dEnd.getMonth() + 1, 1);
//     de.setHours(0, 0, 0, 0);

//     let eMonth = null;

//     while (ds < de) {
//       let day = ds.getDate();
//       let dayOfWeek = ds.getDay() == 0 ? 7 : ds.getDay();
//       let dayDiv = document.createElement("div");

//       if (day == 1) {
//         cal.appendChild((eMonth = document.createElement("div")));
//         eMonth.innerHTML = getTitle(ds.getMonth(), ds.getFullYear()) + hdr;
//         dayDiv.style.gridColumn = dayOfWeek;
//       }

//       dayDiv.innerText = day;

//       if (ds < dStart || ds > dEnd) dayDiv.className = "not-in-range";
//       else if (dayOfWeek > 5) dayDiv.className = "holiday";

//       eMonth.appendChild(dayDiv);

//       ds.setDate(ds.getDate() + 1);
//     }
//   });
// }
