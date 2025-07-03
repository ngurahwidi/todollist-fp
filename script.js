const pipe =
  (...fns) =>
  (input) =>
    fns.reduce((acc, fn) => fn(acc), input);

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let currentFilter = "all";
let todos = loadTodos();
renderTodos(todos);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    const newTodo = createTodo(text);
    todos.push(newTodo);
    saveTodos(todos);
    renderTodos(todos);
    input.value = "";
  }
});

function fakeSereverResponse(data = null, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

function showLoading() {
  document.getElementById("loading").style.display = "block";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

function createTodo(text) {
  return {
    id: Date.now(),
    text,
    done: false,
  };
}

document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", (e) => {
    currentFilter = button.dataset.filter;
    renderTodos(todos);
  });
});

const filterTodos = (todos) => {
  if (currentFilter === "done") return todos.filter((todo) => todo.done);
  if (currentFilter === "pending") return todos.filter((todo) => !todo.done);
  return todos;
};

const clearList = () => {
  list.innerHTML = "";
  return null;
};

const renderItem = (todo) => {
  const li = document.createElement("li");
  li.textContent = todo.text;
  if (todo.done) li.classList.add("done");

  li.addEventListener("click", () => {
    toggleDone(todo.id);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "🗑";
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTodo(todo.id);
  });

  li.appendChild(deleteButton);
  list.appendChild(li);
};

const renderList = (todos) => todos.forEach(renderItem);

async function renderTodos(todoList) {
  showLoading();
  await fakeSereverResponse();

  pipe(clearList, () => filterTodos(todoList), renderList)();

  hideLoading();
}

function saveTodos(todoList) {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

function loadTodos() {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
}

function toggleDone(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  saveTodos(todos);
  renderTodos(todos);
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos(todos);
  renderTodos(todos);
}
