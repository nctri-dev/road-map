const LanguageAPI = fetch(
  "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"
);

let languages = [];
let selected;
const dropdownEle = document.querySelector(".dropdown");
const dropdownListEle = document.querySelector(".dropdown ul.dropdown-list");
const dropdownBtnEle = document.querySelector(".dropdown button.dropdown-btn");
const informationEle = document.querySelector(".github-information");
const btnRefresh = document.querySelector(".github-information .btn-refresh");
const btnRetry = document.querySelector(".github-information .btn-retry");
const defaultText = dropdownBtnEle.textContent;

dropdownBtnEle.addEventListener("blur", function () {
  setTimeout(() => dropdownEle.removeAttribute("open"), 150);
});

dropdownBtnEle.addEventListener("click", function () {
  dropdownListEle.focus();
  const isOpen = dropdownEle.toggleAttribute("open");
  if (isOpen) {
    const arrLiEle = dropdownListEle.childNodes;
    arrLiEle.forEach((ele) => {
      if (ele.hasAttribute("checked")) ele.scrollIntoView({ block: "nearest" });
    });
  }
});

function fetchLanguages() {
  LanguageAPI.then((res) => {
    if (!res.ok) throw new Error("Lỗi mạng khi phản hồi không thành công!");
    return res.json();
  })
    .then((data) => {
      Array.from(data)
        .slice(1, data.length)
        .forEach((lang) => {
          const liEle = createItemEle(lang);
          dropdownListEle.appendChild(liEle);
        });
    })
    .catch((err) => console.error(err));
}
function createItemEle({ value, title = "" }) {
  const dropdownItemEle = document.createElement("li");
  dropdownItemEle.classList.add("dropdown-item");
  dropdownItemEle.setAttribute("value", value);
  dropdownItemEle.textContent = title;
  dropdownItemEle.addEventListener("click", function (ev) {
    handleClick(ev, { value, title });
  });
  return dropdownItemEle;
}

function handleClick(ev, { value, title }) {
  const otherDropdownItem = Array.from(
    ev.currentTarget.parentNode.children
  ).filter((ele) => ele !== ev.currentTarget);

  otherDropdownItem.forEach((item) => item.removeAttribute("checked"));

  const isChecked = ev.currentTarget.toggleAttribute("checked");
  if (isChecked) {
    selected = value;

    dropdownBtnEle.textContent = title;
    fetchRepositories();
  } else {
    selected = undefined;
    dropdownBtnEle.textContent = defaultText;
    renderDisplay({});
  }

  dropdownEle.removeAttribute("open");
}

function repositoriesURL() {
  return (
    "https://api.github.com/search/repositories?q=language:" +
    selected +
    "&sort=stars&order=desc"
  );
}

function renderDisplay({ text = "Please select a language", html, error }) {
  btnRefresh.setAttribute("hidden", "");
  informationEle.classList.remove("error");
  const display = informationEle.querySelector(".github-display");

  if (error) {
    display.textContent = error;
    informationEle.classList.add("error");
  } else if (html) {
    display.innerHTML = html;
    btnRefresh.removeAttribute("hidden");
  } else display.textContent = text;
}

function fetchRepositories() {
  renderDisplay({ text: "Loading, please wait..." });
  const url = repositoriesURL();

  if (![undefined, null].includes(selected))
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          renderDisplay({ error: "Error fetching repositories" });
          throw new Error("Error fetching repositories");
        }

        return res.json();
      })
      .then((data) => {
        languages = data?.items;
        const random = randomNumber({ max: languages.length - 1 });
        const repository = languages[random];
        renderDisplay({ html: cardGithub(repository) });
      })
      .catch((err) => {
        renderDisplay({ error: "Error fetching repositories" });
        console.error(err);
      });
}

function randomNumber({ min = 0, max }) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cardGithub({
  name,
  full_name,
  description,
  language,
  stargazers_count,
  forks,
  open_issues,
  html_url,
}) {
  return `
    <div class="card">
      <p class="name">${name || full_name}</p>
      <p class="description">${description}</p>
      <a class="url-icon" target="_blank" href="${html_url}" ></a>
      <div class="metrics">
        <div class="language"><div class="dot-icon"></div>${language}</div>
        <div class="star"><div class="star-icon"></div>${stargazers_count.toLocaleString()}</div>
        <div class="fork"><div class="fork-icon"></div>${forks.toLocaleString()}</div>
        <div class="issue"><div class="exclamation-mark-icon"></div>${open_issues.toLocaleString()}</div>
      </div>
    </div>
  `;
}

btnRetry.addEventListener("click", fetchRepositories);
btnRefresh.addEventListener("click", function () {
  fetchRepositories();
  // const random = randomNumber({ max: languages.length - 1 });
  // renderDisplay({ html: cardGithub(languages[random]) });
});

fetchLanguages();
