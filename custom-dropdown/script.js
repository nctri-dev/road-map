const dropdown = document.querySelector(".dropdown");
const button = document.querySelector(".dropdown .dropdown-button");
const items = document.querySelectorAll(".dropdown .dropdown-item");

const defaultText = button.textContent;

dropdown.addEventListener("click", function () {
  this.classList.toggle("open");
});

items.forEach((item) => {
  item.addEventListener("click", function () {
    items.forEach((ele) => {
      if (item !== ele) ele.classList.remove("selected");
    });
    const isSelected = item.classList.toggle("selected");
    if (isSelected) button.textContent = item.textContent;
    else button.textContent = defaultText;
  });
});
