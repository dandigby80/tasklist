// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all Event Listeners Function
loadEventListeners();

// Load all Event Listeners
function loadEventListeners() {
  // DOM LOAD EVENT
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove Task Event
  taskList.addEventListener("click", removeTask);
  // Clear all tasks button
  clearBtn.addEventListener("click", clearTasks);
  // Filter Tasks
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Create li Element
    const li = document.createElement("li");
    // Add a class
    li.className = "collection-item";
    // Creat Text Node and Append to li
    li.appendChild(document.createTextNode(task));
    // Create new Link Element
    const link = document.createElement("a");
    // Add a class
    link.className = "delete-item secondary-content";
    // Add Icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);
    // Append the li to the ul
    taskList.appendChild(li);
  });
}

// Add task Function
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  }

  // Create li Element
  const li = document.createElement("li");
  // Add a class
  li.className = "collection-item";
  // Creat Text Node and Append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new Link Element
  const link = document.createElement("a");
  // Add a class
  link.className = "delete-item secondary-content";
  // Add Icon html
  link.innerHTML = '<i class="fa fa-trash-alt"></i>';
  // Append the link to the li
  li.appendChild(link);
  // Append the li to the ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = "";

  e.preventDefault();
}

// Store task function
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task Function using event delegation
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure")) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from ls function
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all task button
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from ls
  clearTasksFromLocalStorage();
}

// Clear tasks from ls
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks function
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
