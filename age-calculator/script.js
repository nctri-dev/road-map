const formEle = document.querySelector("form.age-calculator");
const resultEle = document.getElementById("result");
const ageEle = document.getElementById("age");
const errorEle = document.getElementById("error");
const DateTime = luxon.DateTime;

let resultAge;

const datepickerInput = document.getElementById("datepicker");
const picker = datepicker(datepickerInput, {
  formatter: (input, date, instance) => {
    const value = DateTime.fromISO(date.toISOString());
    input.value = value.toFormat("dd/LL/yyyy");
  },
  onSelect: (instance, date) => {
    if (date) resultAge = date.toISOString();
    else {
      resultAge = undefined;
      resultEle.hidden = true;
      validateDate();
    }
  },
});

function validateDate() {
  let isValid;
  const start = DateTime.fromISO(resultAge);
  const end = DateTime.now();

  const diffInYears = end.diff(start, ["days"]).toObject();
  if (diffInYears.days < 0) {
    errorEle.hidden = false;
    errorEle.textContent = "Invalid Date";
    isValid = false;
    resultEle.hidden = true;
  } else {
    errorEle.hidden = true;
    isValid = true;
  }

  return isValid;
}

formEle.addEventListener("submit", function (ev) {
  ev.preventDefault();
  const isValid = validateDate();
  if (resultAge) {
    if (!isValid) return;
    const start = DateTime.fromISO(resultAge);
    const end = DateTime.now();

    const diffInYears = end.diff(start, ["years", "months", "days"]).toObject();

    const age = diffInYears.years + " years " + diffInYears.months + " months";
    resultEle.hidden = false;
    ageEle.textContent = age;
  } else {
    errorEle.hidden = false;
    errorEle.textContent = "Please enter your birth date!";
  }
});
