const buttonCookie = document.getElementById("btn-cookie");
const cookieConsent = document.getElementById("cookie-consent");
const buttonExitCookie = document.querySelector(".cookie-consent .icon-x");

buttonCookie.addEventListener("click", function (ev) {
  const d = new Date();
  d.setTime(d.getTime() + 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = "cookie=true;" + expires + ";path=/";
  cookieConsent.style.scale = 0;
});

buttonExitCookie.addEventListener("click", function (ev) {
  cookieConsent.style.scale = 0;
});

initialCookie();

function getCookie(name) {
  const cookies = document.cookie;
  if (!cookies) return undefined;

  const ca = cookies.split("; ");
  for (c of ca) {
    if (c.startsWith(name + "=")) return c.substring(name.length + 1);
  }

  return null;
}

function initialCookie() {
  const cookie = getCookie("cookie");

  if (!cookie) {
    cookieConsent.style.scale = 1;
  } else {
    cookieConsent.remove();
  }
}
