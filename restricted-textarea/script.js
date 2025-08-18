const textareaEle = document.querySelector(".restricted-textarea textarea");
const charCountEle = document.querySelector(".restricted-textarea .char-count");
const textareaContainer = document.querySelector(
  ".restricted-textarea .textarea-container"
);
let maxCount = 250;

setCountChar(0);

textareaEle.addEventListener("input", function (ev) {
  const valueTextarea = ev.currentTarget.value;
  const finalValue = valueTextarea.substring(0, maxCount);
  ev.currentTarget.value = finalValue;
  setCountChar(finalValue.length);

  if (finalValue.length < maxCount) {
    charCountEle.classList.remove("error");
    textareaEle.classList.remove("error");
  } else {
    charCountEle.classList.add("error");
    textareaEle.classList.add("error");
  }
});

function setCountChar(number) {
  charCountEle.textContent = number + " / " + maxCount;
}
