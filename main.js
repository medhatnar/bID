const tasks = [];

function generateLabel(labelText, inputName, parent) {
  const newLabel = document.createElement("label");
  newLabel.setAttribute("for", inputName);
  newLabel.innerHTML = labelText;
  parent.appendChild(newLabel);
}

function createListItems() {
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "task-check";
    generateLabel(task, checkbox.name, listItem);
    listItem.prepend(checkbox);
    taskList.appendChild(listItem);
  });
}

function addTask(value) {
  tasks.unshift(value);
  potentialTaskList.append(`| ${value} |`);
}

const container = document.getElementById("container");
const form = document.getElementById("form");
const taskInput = form.elements["task-input"];
const submitButton = form.elements["submit-button"];
const confirmation = document.getElementById("confirmation-form");
const potentialTaskList = document.getElementById("potential-task-list");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(taskInput.value);
  taskInput.value = "";
  taskInput.setAttribute("disabled", "true");
  submitButton.setAttribute("disabled", "true");
  container.removeChild(form);
  confirmation.removeAttribute("disabled");
  confirmation.removeAttribute("hidden");
});

confirmation.addEventListener("change", () => {
  const yes = confirmation["elements"].yes_no[0];
  const no = confirmation["elements"].yes_no[1];

  if (yes.checked) {
    confirmation.setAttribute("disabled", "true");
    confirmation.setAttribute("hidden", "true");
    createListItems();
    taskList.prepend("Then do it!");
    container.removeChild(potentialTaskList);
  } else {
    no.checked = false;
    confirmation.setAttribute("disabled", "true");
    confirmation.setAttribute("hidden", "true");
    taskInput.removeAttribute("disabled");
    submitButton.removeAttribute("disabled");
    container.prepend(form);
  }
});
