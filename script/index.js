const choiceLam = document.querySelector(".choice-wrap-lam");
const choiceGlass = document.querySelector(".choice-wrap-glass");
const choiceCab = document.querySelector(".choice-wrap-cab");
const choiceOpt = document.querySelectorAll(".choice-options");
const inputs = document.querySelectorAll(".main-input");
const info = document.querySelector(".info");
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
const curWid = document.querySelector(".block-width");
const curHei = document.querySelector(".reverse-text");
const widthInp = document.querySelector("#widthInp");
const heightInp = document.querySelector("#heightInp");
let currentWindow = 1;
let dataArray = [];
for (const i of inputs) {
  i.addEventListener("keypress", checkNum);
  i.addEventListener("blur", checkMax);
  i.addEventListener("blur", setParam);
}
extendBtn.addEventListener("click", refreshItems);
for (const i of selects) {
  i.addEventListener("change", checkSelect);
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
info.addEventListener("mouseover", showMessage);
info.addEventListener("mouseout", closeMessage);
for (const i of choiceOpt) {
  i.children[0].addEventListener("click", changeOptions);
  i.children[2].addEventListener("click", changeOptions);
  i.children[0].addEventListener("click", showSum);
  i.children[2].addEventListener("click", showSum);
}
for (const i of extendItems) {
  i.addEventListener("click", choiceExtend);
  i.addEventListener("click", showSum);
}

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
function choiceExtend() {
  this.classList.toggle("extend-item--active");
}
function refreshItems() {
  for (const i of extendItems) {
    i.classList.remove("extend-item--active");
  }
}
function setParam() {
  curWid.textContent = widthInp.value + " мм";
  curHei.textContent = heightInp.value + " мм";
}
function closeMessage() {
  warning.classList.add("hidden");
}
function showMessage() {
  warning.classList.remove("hidden");
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
  choiceLam.innerHTML = `<span class="choice-text">${dataArray[curr][0].title}</span>`;
  choiceGlass.innerHTML = `<span class="choice-text">${dataArray[0][0].title}</span>`;
  choiceCab.innerHTML = `<span class="choice-text">${dataArray[5][0].title}</span>`;
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
      choiceCab.innerHTML = `<span class="choice-text">${dataArray[5][0].title}</span>`;
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
  totalBlock.innerText =
    countLam +
    countGlass +
    countWidth +
    countHeight +
    countProf +
    countPack +
    countFur +
    countStyle;
}
function checkSelect() {
  if (selects[0].value && selects[1].value && selects[2].value) {
    mainBlock.classList.remove("hidden");
  }
}
function checkMax() {
  showSum();
  if (this.attributes.placeholder.value === "Ширина, мм") {
    if (this.value > 2700) {
      this.value = 2700;
      showSum();
      showMessage();
      setTimeout(() => closeMessage(), 2000);
    }
  }
  if (this.attributes.placeholder.value === "Высота, мм") {
    if (this.value > 1600) {
      this.value = 1600;
      showSum();
      showMessage();
      setTimeout(() => closeMessage(), 2000);
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
  currentWindow = +this.attributes[0].value;
  switch (currentWindow) {
    case 1:
      blockGlass.className = "window-glass";
      nameType.innerText = "Одностворчетое";
      refreshData(1);
      break;
    case 2:
      blockGlass.className = "window-glass-double";
      nameType.innerText = "Двухстворчатое";
      refreshData(2);
      break;
    case 3:
      blockGlass.className = "window-glass-triple";
      nameType.innerText = "Трехстворчетое";
      refreshData(3);
      break;
    case 4:
      blockGlass.className = "window-glass-quad";
      nameType.innerText = "Четырехстворчетое";
      refreshData(4);
      break;

    default:
      nameType.innerText = "Одностворчетое";
      refreshData(1);
      break;
  }
}
function changeOptions() {
  if (this.parentNode.attributes[1].value === "lam") {
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
    if (this.firstElementChild.attributes[0].value === "prev") {
      let curElem;
      for (let i = 0; i < dataArray[0].length; i++) {
        if (
          dataArray[5][i].title ===
          this.parentNode.children[1].firstElementChild.innerText
        ) {
          curElem = i;
        }
      }
      choiceCab.innerHTML = `<span class="choice-text">${
        dataArray[5][curElem - 1]
          ? dataArray[5][curElem - 1].title
          : dataArray[5][dataArray[5].length - 1].title
      }</span>`;
    } else {
      let curElem;
      for (let i = 0; i < dataArray[5].length; i++) {
        if (
          dataArray[5][i].title ===
          this.parentNode.children[1].firstElementChild.innerText
        ) {
          curElem = i;
        }
      }
      choiceCab.innerHTML = `<span class="choice-text">${
        dataArray[5][curElem + 1]
          ? dataArray[5][curElem + 1].title
          : dataArray[5][0].title
      }</span>`;
    }
  }
}
