const form = document.getElementById("accessible-form");
const fullnameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const togglePasswordIcon = passwordInput.nextElementSibling;
const toggleConfirmPasswordIcon = confirmPasswordInput.nextElementSibling;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    // alert("Ok!!");
  }
});

togglePasswordIcon.addEventListener("click", function (event) {
  const eyeIcon = event.currentTarget.querySelector(".icon-eye");
  const eyeOffIcon = event.currentTarget.querySelector(".icon-eye-off");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.style.display = "block";
    eyeOffIcon.style.display = "none";
  } else {
    passwordInput.type = "password";
    eyeIcon.style.display = "none";
    eyeOffIcon.style.display = "block";
  }
});

toggleConfirmPasswordIcon.addEventListener("click", function (event) {
  const eyeIcon = event.currentTarget.querySelector(".icon-eye");
  const eyeOffIcon = event.currentTarget.querySelector(".icon-eye-off");

  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
    eyeIcon.style.display = "block";
    eyeOffIcon.style.display = "none";
  } else {
    confirmPasswordInput.type = "password";
    eyeIcon.style.display = "none";
    eyeOffIcon.style.display = "block";
  }
});

fullnameInput.addEventListener("blur", validateFullname);
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);
// confirmPasswordInput.addEventListener("blur", validateConfirmPassword);

function validateFullname() {
  let isValid = true;
  const field = fullnameInput.closest(".field");
  const inputContainer = field.querySelector(".input-container");
  const error = field.querySelector(".error-message");

  if (fullnameInput.value.length < 6) {
    inputContainer.classList.add("invalid");
    error.textContent = "Full name least 6 characters.";
    isValid = false;
  } else {
    error.textContent = "";
    const errorElements = field.querySelectorAll(".invalid");
    errorElements.forEach((el) => el.classList.remove("invalid"));
  }

  return isValid;
}

function validateEmail() {
  let isValid = true;
  const field = emailInput.closest(".field");
  const inputContainer = field.querySelector(".input-container");
  const error = field.querySelector(".error-message");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailValue = emailInput.value.trim();

  if (!emailRegex.test(emailValue)) {
    inputContainer.classList.add("invalid");
    error.textContent = "Email invalid";
    isValid = false;
  } else {
    error.textContent = "";
    const errorElements = field.querySelectorAll(".invalid");
    errorElements.forEach((el) => el.classList.remove("invalid"));
  }

  return isValid;
}

function validatePassword() {
  let isValid = true;
  const field = passwordInput.closest(".field");
  const inputContainer = field.querySelector(".input-container");
  const error = field.querySelector(".error-message");

  if (passwordInput.value.length < 8) {
    inputContainer.classList.add("invalid");
    error.textContent = "Password least 8 characters.";
    isValid = false;
  } else {
    error.textContent = "";
    const errorElements = field.querySelectorAll(".invalid");
    errorElements.forEach((el) => el.classList.remove("invalid"));
  }

  return isValid;
}

function validateConfirmPassword() {
  let isValid = true;
  const field = confirmPasswordInput.closest(".field");
  const inputContainer = field.querySelector(".input-container");
  const error = field.querySelector(".error-message");

  if (confirmPasswordInput.value !== passwordInput.value) {
    inputContainer.classList.add("invalid");
    error.textContent = "Password do not match";
    isValid = false;
  } else {
    error.textContent = "";
    const errorElements = field.querySelectorAll(".invalid");
    errorElements.forEach((el) => el.classList.remove("invalid"));
  }

  return isValid;
}

function validateForm() {
  let isValid = true;

  const errorElements = document.querySelectorAll(".invalid");
  errorElements.forEach((el) => el.classList.remove("invalid"));

  isValid = ![
    validateFullname(),
    validateEmail(),
    validatePassword(),
    validateConfirmPassword(),
  ].some((item) => !item);

  return isValid;
}
