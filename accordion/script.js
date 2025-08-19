const detailsEle = document.querySelectorAll("details");
let currentDetailOpen;

detailsEle.forEach((details) => {
  const summary = details.querySelector("summary");

  summary.addEventListener("click", function () {
    detailsEle.forEach((otherDetails) => {
      if (otherDetails !== details && otherDetails.open)
        otherDetails.open = false;
    });
  });
});
