const formEle = document.querySelector("form.form-container");
const taskListEle = document.querySelector("ul.task-list");

let tasks = [
  {
    checked: false,
    title: "New task is created and added to the list",
  },
  {
    checked: false,
    title: "Clicking the checkbox toggles the completeness",
  },
  {
    checked: false,
    title: "Delete button will delete the task from the list",
  },
  {
    checked: true,
    title: "Complete tasks show at the end with strikethrough",
  },
  {
    checked: true,
    title: "Marking in complete will put it back in pending list",
  },
];

renderTasks();

formEle.addEventListener("submit", function (ev) {
  ev.preventDefault();
  const formData = new FormData(this);
  const value = formData.get("task-tracker").trim();
  this.reset();

  if (!value.length) return;

  const task = { checked: false, title: value };
  tasks.unshift(task);
  renderTasks();
});

function renderTasks() {
  if (tasks.length) {
    taskListEle.innerHTML = "";
    tasks.forEach((task, index) => {
      const key = (Date.now() + index).toString();
      const taskEle = createTaskElement(task);

      if (!task.key) task.key = key;

      taskEle.setAttribute("key", task.key);
      taskListEle.appendChild(taskEle);
    });
  }
}

function createTaskElement({ checked = false, title = "" }) {
  const liEle = document.createElement("li");
  const inputEle = document.createElement("input");
  const pEle = document.createElement("p");
  const btnELe = document.createElement("button");

  // input
  inputEle.name = "task";
  inputEle.type = "checkbox";
  inputEle.className = "task-checkbox";
  inputEle.checked = checked;
  inputEle.addEventListener("change", handleCheck);

  // p
  pEle.className = "task-content";
  pEle.textContent = title;

  // button
  btnELe.type = "button";
  btnELe.className = "trash-icon";
  btnELe.addEventListener("click", handleRemove);

  // li
  liEle.className = "task-item";

  liEle.appendChild(inputEle);
  liEle.appendChild(pEle);
  liEle.appendChild(btnELe);

  return liEle;
}

function handleCheck(ev) {
  const parent = ev.currentTarget.parentNode;
  const key = parent.getAttribute("key");

  const checked = ev.currentTarget.checked;

  tasks.forEach((task) => {
    if (task.key === key) task.checked = checked;
  });
}

function handleRemove(ev) {
  const parent = ev.currentTarget.parentNode;
  const key = parent.getAttribute("key");
  tasks = tasks.filter((task) => task.key !== key);
  parent.remove();
}
