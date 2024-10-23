const convertRGB = document.getElementById("convertRGB"); // id : 1
const convertHEX = document.getElementById("convertHEX"); // id : 0

const convertHEXButton = document.getElementById("convertHEXButton");
const convertRGBButton = document.getElementById("convertRGBButton");

const pageTitle = document.getElementById("pageTitle");

let activeConverterId = 0;

const checkActiveConverter = () => {
  convertRGB.classList.remove("activeConverter");
  convertHEX.classList.remove("activeConverter");

  if (activeConverterId === 0) {
    convertRGB.classList.add("activeConverter");
    pageTitle.textContent = "HEX to RGB Converter";
  } else {
    convertHEX.classList.add("activeConverter");
    pageTitle.textContent = "RGB to HEX Converter";
  }
};

const checkActiveConvertButton = () => {
  convertRGBButton.classList.remove("activeControlButton");
  convertHEXButton.classList.remove("activeControlButton");

  if (activeConverterId === 0) {
    convertRGBButton.classList.add("activeControlButton");
  } else {
    convertHEXButton.classList.add("activeControlButton");
  }
};

const pageFirstLoad = () => {
  activeConverterId = 1;
  checkActiveConverter();
  checkActiveConvertButton();
};

const events = () => {
  document.addEventListener("DOMContentLoaded", () => pageFirstLoad());
  convertRGBButton.addEventListener("click", () => {
    activeConverterId = 0;
    checkActiveConvertButton();
    checkActiveConverter();
  });
  convertHEXButton.addEventListener("click", () => {
    activeConverterId = 1;
    checkActiveConvertButton();
    checkActiveConverter();
  });
};

events();
