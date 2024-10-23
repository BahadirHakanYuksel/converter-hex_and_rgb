const red = document.getElementById("red"),
  green = document.getElementById("green"),
  blue = document.getElementById("blue"),
  hex_code = document.getElementById("hex_code"),
  genareteHexButton = document.getElementById("generateHexButton"),
  hex = document.getElementById("hex"),
  rgb_code = document.getElementById("rgb_code"),
  generateRgbButton = document.getElementById("generateRgbButton");
(rgbInputs = document.querySelectorAll(".rgbInput")),
  (copyHexCodeBtn = document.getElementById("copyHexCodeBtn"));

const letters = ["A", "B", "C", "D", "E", "F"];

const HexTimeCounterConstant = 1.5;
const decraseOfHexIntervalCounterQuantity = 0.5;

let HexTimeInterval;
let HexTimeCounter = HexTimeCounterConstant;

const RgbTimeCounterConstant = 1.5;
const decraseOfRgbIntervalCounterQuantity = 0.5;

let RgbTimeInterval;
let RgbTimeCounter = RgbTimeCounterConstant;

const convertToHex = (value) => {
  if (value <= 255 && value >= 0) {
    let first = Math.floor(value / 16);
    let second = value - first * 16;

    if (first >= 10 && first < 16) first = letters[first - 10];
    if (second >= 10 && second < 16) second = letters[second - 10];
    return `${first}` + `${second}`;
  } else {
    return "00";
  }
};

const convertToHexFromRGB = (R, G, B) => {
  return `#${convertToHex(R)}${convertToHex(G)}${convertToHex(B)}`;
};

const convertToRGBFromHex = (hexCode) => {
  const hexToDecimal = (hex) => {
    const hexDigits = "0123456789ABCDEF";
    let decimal = 0;

    // Hexadecimal sayıyı büyük harflere çeviriyoruz (küçük harf olursa uyum için)
    hex = hex.toUpperCase();

    // Her basamağı tek tek işliyoruz
    for (let i = 0; i < hex.length; i++) {
      const value = hexDigits.indexOf(hex[i]); // Hex basamağının 10'luk değeri
      decimal = decimal * 16 + value; // 16'lık sisteme göre çarpma ve toplama işlemi
    }

    return decimal;
  };

  hexCode = hexCode.slice(1);
  hexCode = [
    hexCode[0] + hexCode[1],
    hexCode[2] + hexCode[3],
    hexCode[4] + hexCode[5],
  ];
  let rgb = "";

  hexCode.forEach((hex) => {
    rgb += hexToDecimal(hex) + " ";
  });

  console.log(rgb);

  rgb = rgb.split(" ");
  const redCode = rgb[0];
  const greenCode = rgb[1];
  const blueCode = rgb[2];

  return `rgb(${redCode},${greenCode},${blueCode})`;
};

const otoPasteTheRGBCode = async (e) => {
  e.preventDefault();

  let text = await window.navigator.clipboard.readText();
  text = text.slice(4, -1).split(",");
  red.value = text[0];
  green.value = text[1];
  blue.value = text[2];
};

genareteHexButton.addEventListener("click", () => {
  HexTimeCounter = HexTimeCounterConstant;
  clearInterval(HexTimeInterval);
  const HEX = convertToHexFromRGB(red.value, green.value, blue.value);
  hex_code.textContent = HEX;
  hex_code.style.backgroundColor = HEX;
  hex_code.style.color = "#ffffff";
  hex_code.style.width = "320px";
  hex_code.style.height = "80px";
  hex_code.style.borderColor = "transparent";

  if (
    Number(red.value) >= 230 ||
    Number(green.value) >= 230 ||
    Number(blue.value) >= 230
  ) {
    hex_code.style.color = "#000000";
  }
  if (
    Number(red.value) === 0 &&
    Number(green.value) === 0 &&
    Number(blue.value) === 0
  ) {
    hex_code.style.borderColor = "white";
  }
});

hex_code.addEventListener("click", () => {
  if (
    hex_code.textContent !== "" &&
    HexTimeCounter === HexTimeCounterConstant
  ) {
    clearInterval(HexTimeInterval);
    const temp = hex_code.textContent;
    window.navigator.clipboard.writeText(temp);
    HexTimeInterval = setInterval(() => {
      hex_code.textContent = `Copied | ${HexTimeCounter}s`;
      if (HexTimeCounter > 0)
        HexTimeCounter -= decraseOfHexIntervalCounterQuantity;
      else {
        clearInterval(HexTimeInterval);
        hex_code.textContent = temp;
        HexTimeCounter = HexTimeCounterConstant;
      }
    }, decraseOfHexIntervalCounterQuantity * 1000);
  }
});

generateRgbButton.addEventListener("click", () => {
  RgbTimeCounter = RgbTimeCounterConstant;
  clearInterval(RgbTimeInterval);
  let value = hex.value !== "" ? hex.value : "#000000";
  let controlRGBParse = convertToRGBFromHex(value).slice(4, -1).split(",");
  rgb_code.textContent = convertToRGBFromHex(value);
  rgb_code.style.backgroundColor = value;
  rgb_code.style.color = "#ffffff";
  rgb_code.style.width = "320px";
  rgb_code.style.height = "80px";
  rgb_code.style.borderColor = "transparent";

  if (
    Number(controlRGBParse[0]) >= 230 ||
    Number(controlRGBParse[1]) >= 230 ||
    Number(controlRGBParse[2]) >= 230
  ) {
    rgb_code.style.color = "#000000";
  }
  if (
    Number(controlRGBParse[0]) === 0 &&
    Number(controlRGBParse[1]) === 0 &&
    Number(controlRGBParse[2]) === 0
  ) {
    rgb_code.style.borderColor = "white";
  }
});

rgb_code.addEventListener("click", () => {
  if (
    rgb_code.textContent !== "" &&
    RgbTimeCounter === RgbTimeCounterConstant
  ) {
    clearInterval(RgbTimeInterval);
    const temp = rgb_code.textContent;
    window.navigator.clipboard.writeText(temp);
    RgbTimeInterval = setInterval(() => {
      rgb_code.textContent = `Copied | ${RgbTimeCounter}s`;
      if (RgbTimeCounter > 0)
        RgbTimeCounter -= decraseOfRgbIntervalCounterQuantity;
      else {
        clearInterval(RgbTimeInterval);
        rgb_code.textContent = temp;
        RgbTimeCounter = RgbTimeCounterConstant;
      }
    }, decraseOfRgbIntervalCounterQuantity * 1000);
  }
});

red.addEventListener("paste", (e) => otoPasteTheRGBCode(e));
blue.addEventListener("paste", (e) => otoPasteTheRGBCode(e));
green.addEventListener("paste", (e) => otoPasteTheRGBCode(e));

rgbInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target.value > 255) {
      e.target.value = 255;
    }
    if (e.target.value < 0) {
      e.target.value = 0;
    }
  });
});
