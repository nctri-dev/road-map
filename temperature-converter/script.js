const InputEle = document.getElementById("value");
const FromUnitEle = document.getElementById("from-unit");
const ToUnitEle = document.getElementById("to-unit");
const ButtonEle = document.getElementById("convert-unit");
const ResultEle = document.getElementById("result");

const FormEle = document.getElementById("form-converter");

FormEle.addEventListener("submit", function (ev) {
  ev.preventDefault();
  if (isConvert()) {
    calculateConverter();
  }
});

function calculateConverter() {
  const inputValue = Number(InputEle.value);
  const fromValue = FromUnitEle.value;
  const toValue = ToUnitEle.value;
  let result;
  switch (true) {
    case matchUnit("Celseus", "Fahrenheit"):
      result = inputValue * 1.8 + 32;
      break;
    case matchUnit("Celseus", "Kelvin"):
      result = inputValue + 273.15;
      break;
    case matchUnit("Fahrenheit", "Celseus"):
      result = (inputValue - 32) / 1.8;
      break;
    case matchUnit("Fahrenheit", "Kelvin"):
      result = (inputValue - 32) / 1.8 + 273.15;
      break;
    case matchUnit("Kelvin", "Celseus"):
      result = inputValue - 273.15;
      break;
    case matchUnit("Kelvin", "Fahrenheit"):
      result = (inputValue - 273.15) * 1.8 + 32;
      break;
    default:
      result = inputValue;
  }

  ResultEle.textContent = `${inputValue} ${fromValue} is ${result.toLocaleString(
    "en-US",
    { maximumFractionDigits: 2 }
  )} ${toValue}`;
}

function matchUnit(from, to) {
  const fromValue = FromUnitEle.value;
  const toValue = ToUnitEle.value;
  return fromValue === from && toValue === to;
}

function isConvert() {
  const inputValue = InputEle.value;
  const fromValue = FromUnitEle.value;
  const toValue = ToUnitEle.value;

  return inputValue && fromValue && toValue;
}

function checkValidate() {
  if (isConvert()) ButtonEle.removeAttribute("disabled");
  else ButtonEle.setAttribute("disabled", "");
}

InputEle.addEventListener("input", checkValidate);
FromUnitEle.addEventListener("change", checkValidate);
ToUnitEle.addEventListener("change", checkValidate);
