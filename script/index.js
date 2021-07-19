const choiceLam = document.querySelector(".choice-wrap-lam");
const choiceGlass = document.querySelector(".choice-wrap-glass");
const choiceCab = document.querySelector(".choice-wrap-cab");
const choiceOpt = document.querySelectorAll(".choice-options");
const inputs = document.querySelectorAll(".main-input");
const info = document.querySelector(".info");
const infoCart = document.querySelector(".info-cart");
const blockGlass = document.querySelector(".window-glass");
const blockFrame = document.querySelector(".window-frame");
const selectType = document.querySelectorAll(".window");
const nameType = document.querySelector("#type-window");
const selects = document.querySelectorAll(".main-select");
const mainBlock = document.querySelector(".choice-window-block");
const extendItems = document.querySelectorAll(".extend-item");
const extendBtn = document.querySelector(".extend-button");
const typeWindowChange = document.querySelector(".type-window-wrap");
const dataWindows = "./data/windows.json";
const totalBlock = document.querySelector("#result");
const refreshBtn = document.querySelectorAll(".refresh-button");
const warning = document.querySelector(".warning-block");
const warningCart = document.querySelector(".warning-block-cart");
const mainOrder = document.querySelector("#main-order");
const form = document.querySelector(".form-wrap");
const curWid = document.querySelector(".block-width");
const curHei = document.querySelector(".reverse-text");
const widthInp = document.querySelector("#widthInp");
const heightInp = document.querySelector("#heightInp");
const frameGlassWrap = document.querySelector(".frame-glass-wrap");
const infoWrap = document.querySelector(".info-wrap");
const orderButton = document.querySelectorAll(".order-button");
const contentWrap = document.querySelector(".content-wrap");
const addCart = document.querySelector(".add-pos-dis");
const addCartSm = document.querySelector(".add-pos-dis-sm");
const messageAdd = document.querySelector("#messageAdd");
const cart = document.querySelector("#cart");
const cartCount = document.querySelectorAll(".cart-count");
const backCal = document.querySelector("#back-cal");
const preMessage = document.querySelector(".pre-message");
const resultPrice = document.querySelector(".result-price");
const uah = document.querySelectorAll("#uah");
const warningUah = document.querySelectorAll(".warning-block-uah");
const overlay = document.querySelector(".dark-body");
const ariaTable = document.querySelector("#aria-table");
const body = document.querySelector("body");
var totalCount;
var tableForMail = "";
let currentWindow = 1;
var products = { extends: {} };
if (localStorage.getItem("UserData")) {
  var userData = JSON.parse(localStorage.getItem("UserData"));
} else {
  var userData = {
    person: {
      fullName: "Васян",
      phone: 380993344555,
      city: "dnipro",
      mail: "ivan@mail.com",
      comment: "кола без льда и детское меню пожалуйста",
    },
    products: [],
  };
}
function showCount() {
  for (const i of cartCount) {
    userData.products.length === 0
      ? (i.innerText = "")
      : (i.innerText = userData.products.length);
  }
}
showCount();
var currentOrder = [];
localStorage.setItem("UserData", JSON.stringify(userData));
let dataArray = [];
for (const i of inputs) {
  i.addEventListener("keypress", checkNum);
  i.addEventListener("blur", checkMax);
  i.addEventListener("blur", setParam);
  i.addEventListener("focus", showPlace);
}
extendBtn.addEventListener("click", refreshItems);
for (const i of selects) {
  i.addEventListener("change", checkSelect);
  i.addEventListener("change", removeOption);
  i.addEventListener("change", showSum);
}
for (const i of selectType) {
  i.addEventListener("click", changeType);
  i.addEventListener("click", showSum);
}
for (const i of refreshBtn) {
  i.addEventListener("click", goStart);
  i.addEventListener("click", showSum);
}
mainOrder.addEventListener("click", showForm);
info.addEventListener("mouseover", showMessage);
info.addEventListener("mouseout", closeMessage);
for (const i of uah) {
  i.addEventListener("mouseover", showUah);
  i.addEventListener("mouseout", closeUah);
}
infoCart.addEventListener("mouseover", showCartMessage);
infoCart.addEventListener("mouseout", closeCartMessage);
for (const i of choiceOpt) {
  i.children[0].addEventListener("click", changeOptions);
  i.children[2].addEventListener("click", changeOptions);
  i.children[0].addEventListener("click", showSum);
  i.children[2].addEventListener("click", showSum);
}
for (const i of orderButton) {
  i.addEventListener("click", showCart);
}
for (const i of extendItems) {
  i.addEventListener("click", choiceExtend);
  i.addEventListener("click", showSum);
}
backCal.addEventListener("click", showCalc);
function sendRequest(url) {
  return fetch(url)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((parseData) => {
      takeData(parseData);
    });
}
sendRequest(dataWindows);
function refreshItems() {
  for (const i of extendItems) {
    i.classList.remove("extend-item--active");
  }
}
function showUah() {
  for (const i of warningUah) {
    i.classList.remove("hidden");
  }
}
function closeUah() {
  for (const i of warningUah) {
    i.classList.add("hidden");
  }
}
function showCalc() {
  showCount();
  cart.classList.add("hidden");
  contentWrap.classList.remove("hidden");
}
function hideForm() {
  form.classList.add("hidden");
  overlay.classList.add("hidden");
  body.setAttribute("style", "overflow:auto");
}
function showForm() {
  window.scrollTo(0, 0);
  overlay.classList.remove("hidden");
  overlay.addEventListener("click", hideForm);
  body.setAttribute("style", "overflow:hidden");
  let fromFile = userData.products;
  form.classList.remove("hidden");
  for (let i = 0; i < fromFile.length; i++) {
    let nameType;
    for (let j = 0; j < dataArray[fromFile[i].type].length; j++) {
      switch (fromFile[i].type) {
        case 1:
          nameType = "Одностворчатое";
          break;
        case 2:
          nameType = "Двухстворчатое";
          break;
        case 3:
          nameType = "Трехстворчатое";
          break;
        case 4:
          nameType = "Четырехстворчатое";
          break;
        case 5:
          nameType = "Балконная дверь";
          break;
        default:
          nameType = "Одностворчатое";
          break;
      }
    }
    let currExt = "";
    for (var key in fromFile[i].extends) {
      fromFile[i].extends[key] ? (currExt += key += ", ") : (currExt += "");
    }
    currExt = currExt.substring(0, currExt.length - 2);
    let tableItem = ``;
    tableItem += `
    <tr>
      <td>
        <div class="table-cell-wrap">
          <h2 class="table-title">${nameType}, ${fromFile[i].height}х${fromFile[i].width}</h2>
          <span class="table-text">Профиль - ${fromFile[i].profile}, 
          Стеклопакет - ${fromFile[i].paket},Фурнитура - ${fromFile[i].fittings},<br> </span>
          <span class="table-text">Ламинация - ${fromFile[i].lam}, 
          Стекло - ${fromFile[i].glass},<br> Ручка - ${fromFile[i].cab}</span><br><br>
          Дополнительная комплектация: ${currExt}<br><br>
          Количество: ${fromFile[i].multiply}<br><br>
          <!--  <div class="table-price">${fromFile[i].count} ₴</div> -->
        </div>
      </td>
    </tr>
    `;

    tableForMail += tableItem;
  }
  ariaTable.value = tableForMail;
}
function addingToCart() {
  let extendsW = {
    Замок: false,
    Подоконник: false,
    Отлив: false,
    Сетка: false,
    Откос: false,
  };
  messageToCart();
  function zeroSpace(num) {
    num = num.split("");
    let index = num.indexOf(" ");
    num.splice(index, 1);
    return num.join("");
  }

  products.glass = choiceGlass.firstChild.innerText;
  products.lam = choiceLam.firstChild.innerText;
  products.type = currentWindow;
  products.width = inputs[0].value;
  products.height = inputs[1].value;
  products.cab = choiceCab.innerText;
  products.profile = selects[0].value;
  products.paket = selects[1].value;
  products.fittings = selects[2].value;
  products.multiply = 1;
  products.count = zeroSpace(totalBlock.innerText);
  for (const i of extendItems) {
    if (i.classList.contains("extend-item--active")) {
      extendsW[i.attributes[0].value] = true;
    }
  }
  products.extends = extendsW;
  userData.products.push(products);
  localStorage.setItem("UserData", JSON.stringify(userData));
  refreshData(currentWindow);
  showCount();
}
function choiceExtend() {
  this.classList.toggle("extend-item--active");
}
function showCart() {
  contentWrap.classList.add("hidden");
  cart.classList.remove("hidden");
  ariaTable.addEventListener("blur", function () {
    console.log(ariaTable.value);
  });
  const tableBody = document.querySelector("#tableBody");
  if (tableBody.firstChild) {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  }
  let fromFile = userData.products;
  let totalCartCount = 0;
  for (let i = 0; i < fromFile.length; i++) {
    let currLam;
    let currGlass;
    let classGlass;
    let nameType;
    for (let j = 0; j < dataArray[fromFile[i].type].length; j++) {
      switch (fromFile[i].type) {
        case 1:
          classGlass = "table-window-glass";
          nameType = "Одностворчатое";
          break;
        case 2:
          classGlass = "table-window-glass-double";
          nameType = "Двухстворчатое";
          break;
        case 3:
          classGlass = "table-window-glass-triple";
          nameType = "Трехстворчатое";
          break;
        case 4:
          classGlass = "table-window-glass-quad";
          nameType = "Четырехстворчатое";
          break;
        case 5:
          classGlass = "table-window-glass";
          nameType = "Балконная дверь";
          break;
        default:
          classGlass = "table-window-glass";
          nameType = "Одностворчатое";
          break;
      }
      if (dataArray[fromFile[i].type][j].title === fromFile[i].lam) {
        currLam = dataArray[fromFile[i].type][j].image;
      }
    }

    for (let j = 0; j < dataArray[0].length; j++) {
      if (dataArray[0][j].title === fromFile[i].glass) {
        currGlass = dataArray[0][j].image;
      }
    }
    let tableItem = `
    <tr>
      <td class="col-wrap">
      <button data-id="${i}" class="change-button"><img class="change-image" src="./images/change-icon.svg" alt=""></button>
        <div class="window-frame animation--active table-window-frame" style="background-image: url('${currLam}">
          <div class=" table-window-glass ${classGlass}" style="background-image: url('${currGlass}"></div>
        </div>
      </td>
      <td>
        <div class="table-cell-wrap">
          <h2 class="table-title">${nameType}, ${fromFile[i].height}х${
      fromFile[i].width
    }</h2>
          <span class="table-text">Профиль - ${fromFile[i].profile}, 
          Стеклопакет - ${fromFile[i].paket},Фурнитура - ${
      fromFile[i].fittings
    },<br> </span>
          <span class="table-text">Ламинация - ${fromFile[i].lam}, 
          Стекло - ${fromFile[i].glass},<br> Ручка - ${fromFile[i].cab}</span>
          <div data-id="${i}" class="table-price">${
      +fromFile[i].count * fromFile[i].multiply
    } ₴</div>
        </div>
      </td>
      <td> 
      <div class="multiplier-wrap">
          <button class="button-table-multiply button-toggle" data-id="${i}" data-value="decrease">
            <img
              class="button-arrow"
              src="./images/arrow.svg"
              alt=""
            />
          </button>
          <span class="multiplier-count">${fromFile[i].multiply} </span>
          <button class="button-table-multiply button-toggle" data-id="${i}" data-value="increase">
            <img
              class="button-right-arrow"
              src="./images/arrow.svg"
              alt=""
            />
          </button>
      </div></td>
      <td>
        <button data-id="${i}" class="button-table-trash remove-item">
          <img class="table-image" src="./images/trash.svg" alt="">
        </button>
      </td>
      <td class="table-trash"></td>
    </tr>
    `;

    tableBody.innerHTML += tableItem;
    totalCartCount += fromFile[i].count * fromFile[i].multiply;
  }
  function refreshCount() {
    let totalCartCount = 0;
    for (let i = 0; i < fromFile.length; i++) {
      totalCartCount += fromFile[i].count * fromFile[i].multiply;
    }
    return totalCartCount;
  }
  function prettify(num) {
    var n = num.toString();
    n = n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
    return n;
  }
  resultPrice.innerText = prettify(totalCartCount);
  if (resultPrice.innerText === "0") {
    showCalc();
  }
  const changeButton = document.querySelectorAll(".change-button");
  const removeItem = document.querySelectorAll(".remove-item");
  const buttonMultiply = document.querySelectorAll(".button-table-multiply");
  for (const i of buttonMultiply) {
    i.addEventListener("click", changeMultiply);
  }
  for (const i of changeButton) {
    i.addEventListener("click", changeItem);
  }
  for (const i of removeItem) {
    i.addEventListener("click", removedItem);
  }
  function changeItem() {
    let changeData = JSON.parse(localStorage.getItem("UserData"));
    let changeDataItem = changeData.products[this.attributes[0].value];
    fromFile.splice(this.attributes[0].value, 1);
    localStorage.setItem("UserData", JSON.stringify(userData));
    currentWindow = changeDataItem.type;
    showCalc();
    showOther();
    addCart.addEventListener("click", addingToCart);
    addCart.classList.add("add-pos-act");
    addCartSm.addEventListener("click", addingToCart);
    addCartSm.classList.add("add-pos-act");
    switch (changeDataItem.type) {
      case 1:
        blockGlass.className = "window-glass";
        blockFrame.className = "window-frame";
        nameType.innerText = "Одностворчатое";
        refreshData(1);
        break;
      case 2:
        blockGlass.className = "window-glass-double";
        blockFrame.className = "window-frame";
        nameType.innerText = "Двухстворчатое";
        refreshData(2);
        break;
      case 3:
        blockGlass.className = "window-glass-triple";
        blockFrame.className = "window-frame";
        nameType.innerText = "Трехстворчатое";
        refreshData(3);
        break;
      case 4:
        blockGlass.className = "window-glass-quad";
        blockFrame.className = "window-frame";
        nameType.innerText = "Четырехстворчатое";
        refreshData(4);
        break;
      case 5:
        blockGlass.className = "window-glass";
        blockFrame.className = "window-frame";
        nameType.innerText = "Балконная дверь";
        refreshData(5);
        break;

      default:
        blockGlass.className = "window-glass";
        nameType.innerText = "Одностворчатое";
        refreshData(1);
        break;
    }
    for (const i of selectType) {
      i.classList.remove("window--active");
      if (
        i.firstElementChild.attributes[0].value.length <
        i.firstElementChild.attributes[1].value.length
      ) {
        [
          i.firstElementChild.attributes[0].value,
          i.firstElementChild.attributes[1].value,
        ] = [
          i.firstElementChild.attributes[1].value,
          i.firstElementChild.attributes[0].value,
        ];
      }
    }
    [
      selectType[changeDataItem.type - 1].firstElementChild.attributes[1].value,
      selectType[changeDataItem.type - 1].firstElementChild.attributes[0].value,
    ] = [
      selectType[changeDataItem.type - 1].firstElementChild.attributes[0].value,
      selectType[changeDataItem.type - 1].firstElementChild.attributes[1].value,
    ];
    selectType[changeDataItem.type - 1].classList.add("window--active");
    selects[0].value = changeDataItem.profile;
    selects[1].value = changeDataItem.paket;
    selects[2].value = changeDataItem.fittings;
    inputs[0].value = changeDataItem.width;
    inputs[1].value = changeDataItem.height;
    curWid.textContent = widthInp.value + " см";
    curHei.textContent = heightInp.value + " см";
    choiceLam.firstChild.innerText = changeDataItem.lam;
    choiceGlass.firstChild.innerText = changeDataItem.glass;
    choiceCab.innerHTML = `<span class="choice-text">${changeDataItem.cab}</span>`;
    for (let i = 0; i < dataArray[0].length; i++) {
      if (dataArray[0][i].title === changeDataItem.glass) {
        blockGlass.setAttribute(
          "style",
          `background-image: url('${dataArray[0][i].image}')`
        );
      }
    }
    console.log(changeDataItem);
    for (let i = 0; i < dataArray[changeDataItem.type].length; i++) {
      if (dataArray[changeDataItem.type][i].title === changeDataItem.lam) {
        blockFrame.setAttribute(
          "style",
          `background-image: url('${dataArray[changeDataItem.type][i].image}');`
        );
      }
    }
    showSum();
  }
  let newCount;
  function changeMultiply() {
    newCount = this.parentNode.parentNode.parentNode.children[1]
      .firstElementChild.children[
      this.parentNode.parentNode.parentNode.children[1].firstElementChild
        .children.length - 1
    ];
    if (this.attributes[2].value === "decrease") {
      if (fromFile[this.attributes[1].value].multiply <= 1) {
        preventDefault();
      } else {
        fromFile[this.attributes[1].value].multiply--;
        newCount.innerText =
          fromFile[newCount.attributes[0].value].multiply *
            fromFile[newCount.attributes[0].value].count +
          " ₴";
        resultPrice.innerText = prettify(refreshCount());
      }
    } else if (this.attributes[2].value === "increase") {
      fromFile[this.attributes[1].value].multiply++;
      newCount.innerText =
        fromFile[newCount.attributes[0].value].multiply *
          fromFile[newCount.attributes[0].value].count +
        " ₴";
      resultPrice.innerText = prettify(refreshCount());
    }
    localStorage.setItem("UserData", JSON.stringify(userData));
    this.parentNode.children[1].innerText =
      fromFile[this.attributes[1].value].multiply;
  }
  function removedItem() {
    fromFile.splice(this.attributes[0].value, 1);
    localStorage.setItem("UserData", JSON.stringify(userData));
    showCart();
  }
}
function messageToCart() {
  messageAdd.firstElementChild === null
    ? (messageAdd.innerHTML = `
  <div class="cart-message">
    <span
      >ТОВАР ДОБАВЛЕН В КОРЗИНУ<br> вы можете просчитать следующую позицию</span
    >
  </div>`)
    : messageAdd.classList.remove("hidden");
  products = {};
  body.setAttribute("style", "height:100vh; overflow:hidden");
  overlay.classList.remove("hidden");
  setTimeout(() => messageAdd.classList.add("hidden"), 2000);
  setTimeout(
    () => body.setAttribute("style", "height:auto; overflow:auto"),
    2000
  );
  setTimeout(() => overlay.classList.add("hidden"), 2000);
  window.scrollTo(0, 0);
}
function setParam() {
  curWid.textContent = widthInp.value + " см";
  curHei.textContent = heightInp.value + " см";
  if (inputs[0].value && inputs[1].value) {
    addCart.addEventListener("click", addingToCart);
    addCart.classList.add("add-pos-act");
    addCartSm.addEventListener("click", addingToCart);
    addCartSm.classList.add("add-pos-act");
  } else {
    addCart.removeEventListener("click", addingToCart);
    addCartSm.removeEventListener("click", addingToCart);
  }
}
function showPlace() {
  this.placeholder = "";
}
function closeMessage() {
  warning.classList.add("hidden");
  if (currentWindow === 5) {
    warning.innerText = `Внимание! Значение высоты и ширины ограничены Ширина от 500, см до 950, см Высота от 500, см до 2250, см`;
  } else {
    warning.innerText = `Внимание! Значение высоты и ширины ограничены Ширина от 500, см до 2700, см Высота от 500, см до 1600, см`;
  }
}
function showMessage() {
  warning.classList.remove("hidden");
}
function showCartMessage() {
  warningCart.classList.remove("hidden");
}
function closeCartMessage() {
  warningCart.classList.add("hidden");
}
function takeData(data) {
  for (let i = 0; i < data.length; i++) {
    dataArray.push(data[i]);
  }
  refreshData();
}
function refreshData(curr = 1) {
  while (typeWindowChange.firstChild) {
    typeWindowChange.removeChild(typeWindowChange.firstChild);
  }
  if (curr === 4) {
    let newInput = `
    <div class="select-window-wrap col-${12}">
      <select class="main-select" name="select" required="">
        <option value="twistFol">Поворотно-откидное</option>
        <option value="twist">Поворотное</option>
        <option value="folding">Откидное</option>
        <option value="deaf">Глухое</option>
      </select>
    </div>`;
    typeWindowChange.innerHTML += newInput;

    for (let i = 0; i < 3; i++) {
      let newInput = `
    <div class="select-window-wrap col-${4}">
      <select class="main-select" name="select" required="">
        <option value="twistFol">Поворотно-откидное</option>
        <option value="twist">Поворотное</option>
        <option value="folding">Откидное</option>
        <option value="deaf">Глухое</option>
      </select>
    </div>`;
      typeWindowChange.innerHTML += newInput;
    }
  } else if (curr === 5) {
    for (let i = 0; i < 1; i++) {
      let newInput = `
      <div class="select-window-wrap col-12">
        <select class="main-select" name="select" required="">
          <option value="twistFol">Поворотно-откидное</option>
          <option value="twist">Поворотное</option>
          <option value="folding">Откидное</option>
          <option value="deaf">Глухое</option>
        </select>
      </div>`;
      typeWindowChange.innerHTML += newInput;
    }
  } else {
    for (let i = 0; i < curr; i++) {
      let newInput = `
      <div class="select-window-wrap col-${12 / curr}">
        <select class="main-select" name="select" required="">
          <option value="twistFol">Поворотно-откидное</option>
          <option value="twist">Поворотное</option>
          <option value="folding">Откидное</option>
          <option value="deaf">Глухое</option>
        </select>
      </div>`;
      typeWindowChange.innerHTML += newInput;
    }
  }
  choiceLam.innerHTML = `<span class="choice-text animation--active">${dataArray[curr][0].title}</span>`;
  choiceGlass.innerHTML = `<span class="choice-text animation--active">${dataArray[0][0].title}</span>`;
  choiceCab.innerHTML = `<span class="choice-text animation--active">${dataArray[6][0].title}</span>`;
  for (const i of extendItems) {
    i.classList.remove("extend-item--active");
  }
  blockFrame.className = "window-frame-mirror";
  blockFrame.setAttribute(
    "style",
    `background-image: url('${dataArray[curr][0].image}');`
  );
  blockGlass.setAttribute(
    "style",
    `background-image: url('${dataArray[0][0].image}')`
  );
}
function goStart() {
  let curRefresh = this.parentNode.parentNode.firstElementChild
    .firstElementChild.innerText;
  switch (curRefresh) {
    case "ЛАМИНАЦИЯ":
      choiceLam.innerHTML = `<span class="choice-text">${dataArray[currentWindow][0].title}</span>`;
      blockFrame.setAttribute(
        "style",
        `background-image: url('${dataArray[currentWindow][0].image}');`
      );
      break;
    case "СТЕКЛО":
      choiceGlass.innerHTML = `<span class="choice-text">${dataArray[0][0].title}</span>`;
      blockGlass.setAttribute(
        "style",
        `background-image: url('${dataArray[0][0].image}')`
      );
      break;
    case "РУЧКА":
      choiceCab.innerHTML = `<span class="choice-text">${dataArray[6][0].title}</span>`;
      break;

    default:
      break;
  }
}
function showSum() {
  let countLam = choiceLam.firstChild.innerText === "Стандарт" ? 1 : 300;
  let countGlass = choiceGlass.firstChild.innerText === "Стандарт" ? 1 : 300;
  let countWidth = inputs[0].value * 1.2;
  let countHeight = inputs[1].value * 1.2;
  let countProf;
  let countPack;
  let countFur;
  let countStyle;
  switch (currentWindow) {
    case 1:
      countStyle = 1000;
      break;
    case 2:
      countStyle = 1500;
      break;
    case 3:
      countStyle = 3000;
      break;
    case 4:
      countStyle = 4000;
      break;
    case 5:
      countStyle = 4500;
      break;
    default:
      countStyle = 4000;
      break;
  }
  switch (selects[0].value) {
    case "8000":
      countProf = 2000;
      break;
    case "7000":
      countProf = 1800;
      break;
    case "4000":
      countProf = 1600;
      break;
    case "2000":
      countProf = 1500;
      break;
    case "V90":
      countProf = 2000;
      break;
    case "S700":
      countProf = 1400;
      break;
    case "S500":
      countProf = 1300;
      break;
    case "S400":
      countProf = 1200;
      break;

    default:
      countProf = 20;
      break;
  }
  switch (selects[1].value) {
    case "1":
      countPack = 1000;
      break;
    case "2":
      countPack = 1500;
      break;
    case "1+":
      countPack = 1800;
      break;
    case "2+":
      countPack = 2500;
      break;
    case "sndw":
      countPack = 2000;
      break;

    default:
      countPack = 1000;
      break;
  }
  switch (selects[2].value) {
    case "Steko":
      countFur = 800;
      break;
    case "ELITE":
      countFur = 1000;
      break;
    case "Komfort":
      countFur = 800;
      break;
    case "Maco":
      countFur = 1200;
      break;

    default:
      countFur = 1200;
      break;
  }
  let totalCount =
    countLam +
    countGlass +
    countWidth +
    countHeight +
    countProf +
    countPack +
    countFur +
    countStyle +
    "";

  totalCount = Math.round(totalCount);
  function prettify(num) {
    var n = num.toString();
    n = n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
    return n;
  }
  totalBlock.innerText = prettify(totalCount);
}
function removeOption() {
  this.options[0].remove();
  this.removeEventListener("change", removeOption);
}
function checkSelect() {
  if (selects[0].value && selects[1].value && selects[2].value) {
    showOther();
  }
}
function showOther() {
  mainBlock.classList.remove("hidden");
  preMessage.classList.add("hidden");
}
function checkMax() {
  showSum();
  if (currentWindow === 5) {
    if (this.attributes.id.value === "widthInp") {
      if (+this.value > 950) {
        this.value = 950;
        showSum();
        showMessage();
        setTimeout(() => closeMessage(), 2000);
      }
    }
    if (this.attributes.id.value === "heightInp") {
      if (this.value > 2250) {
        this.value = 2250;
        showSum();
        showMessage();
        setTimeout(() => closeMessage(), 2000);
      }
    }
  } else {
    if (this.attributes.id.value === "widthInp") {
      if (+this.value > 2700) {
        this.value = 2700;
        showSum();
        showMessage();
        setTimeout(() => closeMessage(), 2000);
      }
    }
    if (this.attributes.id.value === "heightInp") {
      if (this.value > 1600) {
        this.value = 1600;
        showSum();
        showMessage();
        setTimeout(() => closeMessage(), 2000);
      }
    }
  }
  if (this.value < 500) {
    this.value = 500;
    showSum();
    showMessage();
    setTimeout(() => closeMessage(), 2000);
  }
}
function checkNum(e) {
  if (isNaN(parseFloat(e.key))) {
    e.preventDefault();
  }
}
function changeType() {
  for (const i of selectType) {
    i.classList.remove("window--active");
    if (
      i.firstElementChild.attributes[0].value.length <
      i.firstElementChild.attributes[1].value.length
    ) {
      [
        i.firstElementChild.attributes[0].value,
        i.firstElementChild.attributes[1].value,
      ] = [
        i.firstElementChild.attributes[1].value,
        i.firstElementChild.attributes[0].value,
      ];
    }
  }
  [
    this.firstElementChild.attributes[1].value,
    this.firstElementChild.attributes[0].value,
  ] = [
    this.firstElementChild.attributes[0].value,
    this.firstElementChild.attributes[1].value,
  ];
  this.classList.add("window--active");
  currentWindow = +this.attributes[0].value;
  switch (currentWindow) {
    case 1:
      blockGlass.className = "window-glass";
      blockFrame.className = "window-frame";
      nameType.innerText = "Одностворчатое";
      refreshData(1);
      break;
    case 2:
      blockGlass.className = "window-glass-double";
      blockFrame.className = "window-frame";
      nameType.innerText = "Двухстворчатое";
      refreshData(2);
      break;
    case 3:
      blockGlass.className = "window-glass-triple";
      blockFrame.className = "window-frame";
      nameType.innerText = "Трехстворчатое";
      refreshData(3);
      break;
    case 4:
      blockGlass.className = "window-glass-quad";
      blockFrame.className = "window-frame";
      nameType.innerText = "Четырехстворчатое";
      refreshData(4);
      break;
    case 5:
      blockGlass.className = "window-glass";
      blockFrame.className = "window-frame";
      nameType.innerText = "Балконная дверь";
      refreshData(5);
      break;

    default:
      blockGlass.className = "window-glass";
      nameType.innerText = "Одностворчатое";
      refreshData(1);
      break;
  }
}
function changeOptions() {
  if (this.parentNode.attributes[1].value === "lam") {
    console.log(this.firstElementChild.attributes[0].value);
    if (this.firstElementChild.attributes[0].value === "prev") {
      let curElem;
      for (let i = 0; i < dataArray[currentWindow].length; i++) {
        if (
          dataArray[currentWindow][i].title ===
          this.parentNode.children[1].firstElementChild.innerText
        ) {
          curElem = i;
        }
      }
      choiceLam.innerHTML = `<span class="choice-text">${
        dataArray[currentWindow][curElem - 1]
          ? dataArray[currentWindow][curElem - 1].title
          : dataArray[currentWindow][dataArray[currentWindow].length - 1].title
      }</span>`;
      blockFrame.setAttribute(
        "style",
        `background-image: url('${
          dataArray[currentWindow][curElem - 1]
            ? dataArray[currentWindow][curElem - 1].image
            : dataArray[currentWindow][dataArray[currentWindow].length - 1]
                .image
        }');background-repeat: no-repeat;background-size: contain; background-position: center;`
      );
    } else {
      let curElem;
      for (let i = 0; i < dataArray[currentWindow].length; i++) {
        if (
          dataArray[currentWindow][i].title ===
          this.parentNode.children[1].firstElementChild.innerText
        ) {
          curElem = i;
        }
      }
      choiceLam.innerHTML = `<span class="choice-text">${
        dataArray[currentWindow][curElem + 1]
          ? dataArray[currentWindow][curElem + 1].title
          : dataArray[currentWindow][0].title
      }</span>`;
      blockFrame.setAttribute(
        "style",
        `background-image: url('${
          dataArray[currentWindow][curElem + 1]
            ? dataArray[currentWindow][curElem + 1].image
            : dataArray[currentWindow][0].image
        }');background-repeat: no-repeat;background-size: contain;background-position: center;`
      );
    }
  } else if (this.parentNode.attributes[1].value === "win") {
    if (this.firstElementChild.attributes[0].value === "prev") {
      let curElem;
      for (let i = 0; i < dataArray[0].length; i++) {
        if (
          dataArray[0][i].title ===
          this.parentNode.children[1].firstElementChild.innerText
        ) {
          curElem = i;
        }
      }
      choiceGlass.innerHTML = `<span class="choice-text">${
        dataArray[0][curElem - 1]
          ? dataArray[0][curElem - 1].title
          : dataArray[0][dataArray[0].length - 1].title
      }</span>`;
      blockGlass.setAttribute(
        "style",
        `background-image: url('${
          dataArray[0][curElem - 1]
            ? dataArray[0][curElem - 1].image
            : dataArray[0][dataArray[0].length - 1].image
        }')`
      );
    } else {
      let curElem;
      for (let i = 0; i < dataArray[0].length; i++) {
        if (
          dataArray[0][i].title ===
          this.parentNode.children[1].firstElementChild.innerText
        ) {
          curElem = i;
        }
      }
      choiceGlass.innerHTML = `<span class="choice-text">${
        dataArray[0][curElem + 1]
          ? dataArray[0][curElem + 1].title
          : dataArray[0][0].title
      }</span>`;
      blockGlass.setAttribute(
        "style",
        `background-image: url('${
          dataArray[0][curElem + 1]
            ? dataArray[0][curElem + 1].image
            : dataArray[0][0].image
        }')`
      );
    }
  } else if (this.parentNode.attributes[1].value === "cab") {
    if (currentWindow === 5) {
      if (this.firstElementChild.attributes[0].value === "prev") {
        let curElem;
        for (let i = 0; i < dataArray[7].length; i++) {
          if (
            dataArray[7][i].title ===
            this.parentNode.children[1].firstElementChild.innerText
          ) {
            curElem = i;
          }
        }
        choiceCab.innerHTML = `<span class="choice-text">${
          dataArray[7][curElem - 1]
            ? dataArray[7][curElem - 1].title
            : dataArray[7][dataArray[7].length - 1].title
        }</span>`;
      } else {
        let curElem;
        for (let i = 0; i < dataArray[7].length; i++) {
          if (
            dataArray[7][i].title ===
            this.parentNode.children[1].firstElementChild.innerText
          ) {
            curElem = i;
          }
        }
        choiceCab.innerHTML = `<span class="choice-text">${
          dataArray[7][curElem + 1]
            ? dataArray[7][curElem + 1].title
            : dataArray[7][0].title
        }</span>`;
      }
    } else {
      if (this.firstElementChild.attributes[0].value === "prev") {
        let curElem;
        for (let i = 0; i < dataArray[6].length; i++) {
          if (
            dataArray[6][i].title ===
            this.parentNode.children[1].firstElementChild.innerText
          ) {
            curElem = i;
          }
        }
        choiceCab.innerHTML = `<span class="choice-text">${
          dataArray[6][curElem - 1]
            ? dataArray[6][curElem - 1].title
            : dataArray[6][dataArray[6].length - 1].title
        }</span>`;
      } else {
        let curElem;
        for (let i = 0; i < dataArray[6].length; i++) {
          console.log(this.parentNode.children[1].firstElementChild);
          if (
            dataArray[6][i].title ===
            this.parentNode.children[1].firstElementChild.innerText
          ) {
            curElem = i;
          }
        }
        choiceCab.innerHTML = `<span class="choice-text">${
          dataArray[6][curElem + 1]
            ? dataArray[6][curElem + 1].title
            : dataArray[6][0].title
        }</span>`;
      }
    }
  }
}
