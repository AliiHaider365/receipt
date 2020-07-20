let disharry = [];
let count = 0;
let originalTable = someContainer.innerHTML;
function updateDishes() {
  let dishes = document.querySelectorAll(".dishRow");

  for (let item of dishes) {
    if (+item.lastElementChild.innerText > +dishRanger.value) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
  }
}

function calculateBill() {
  // date
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentdate = day + "/" + month + "/" + year;
  // Time
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  //   let s = today.getSeconds();
  time = h + ":" + m;
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  //   tConvert(time);

  let dishCheckboxes = document.getElementsByClassName("dish");
  count++;
  let discount = 0;
  let netBil = 0;
  let totalBill = 0;

  for (let item of dishCheckboxes) {
    item.parentNode.parentNode.style.background = "white";
    if (item.checked) {
      item.parentNode.parentNode.classList.remove("nonPrint");
      item.parentNode.parentNode.style.background = "green";
      let price = item.parentNode.nextElementSibling.innerText;
      let qty = item.parentNode.previousElementSibling.firstChild.value;

      if (qty < 0) {
        item.parentNode.previousElementSibling.firstChild.value = 1;
        qty = 1;
      } else {
        item.parentNode.parentNode.classList.add("nonPrint");
      }
      let dishBill = price * qty;
      totalBill += dishBill;

      let name =
        item.parentNode.previousElementSibling.previousElementSibling.innerText;
      let dis = {
        quanty: qty,
        dishname: name,
        dishprice: dishBill,
      };
      disharry.push(dis);
      console.log(disharry);
    }
  }

  grossBill.innerText = totalBill;

  if (totalBill > 600) {
    discount.innerText = totalBill * 0.2;
    discount = totalBill * 0.2;

    netBill.innerText = totalBill - discount.innerText;
    netBil = totalBill - discount;
  } else {
    netBill.innerText = totalBill;
    netBil = totalBill;
  }

  let list = disharry.map((dis) => {
    return (
      "<tr>\
              <td>" +
      dis.quanty +
      "</td>\
              <td>" +
      dis.dishname +
      "</td>\
              <td>" +
      dis.dishprice +
      "</td>\
            </tr>"
    );
  });
  let element = document.createElement("div");
  element.classList.add("reciptCotainer");
  element.innerHTML =
    ' <p class="rcptname">EyE of thai-GER</p>\
      <p class="rcpttitle">\
        3077 STONe LANE <br />\
        Phil thai-GER\
      </p>\
      <div>\
        <span class="date">' +
    currentdate +
    '</span>\
        <span class="time">' +
    tConvert(time) +
    '</span>\
      </div>\
      <div><span class="tab">TAB' +
    count +
    '</span></div>\
      <div style="margin: 10px 0px;">\
        <span>AMEX</span><span class="Host">HOST Alia</span>\
      </div>\
      <div class="tableContainer">\
        <table >\
          <tr  >\
            <td>QTY</td>\
            <td>Name</td>\
            <td>AMT</td>\
          </tr>\
          <div class="line" ></div>\
             ' +
    list +
    '\
        </table>\
      </div>\
      <div class="content amount "><span>AMT</span> <span>' +
    totalBill +
    '</span></div>\
      <div class="content total"><span>SUB-TOTAL</span> <span>' +
    totalBill +
    '</span></div>\
      <div class="content tax"><span>Discount</span> <span>' +
    discount +
    '</span></div>\
      <div class="content balace"><span>Net Bill</span> <span>' +
    netBil +
    "</span></div>";
  main.appendChild(element);
  let original = "";

  original = document.body.innerHTML;
  document.body.innerHTML = element.innerHTML;
  window.print();
  totalBill = 0;
  discount = 0;
  netBil = 0;
  disharry = [];
  document.body.innerHTML = original;
  for (let item of dishCheckboxes) {
    item.parentNode.parentNode.style.background = "white";
    item.parentNode.previousElementSibling.firstChild.value = 1;
    item.checked = false;
  }
  // someContainer.innerHTML = originalTable
}
