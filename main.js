import { loadTodos, saveTodoToAPI } from "./modules/api.js";
import { hideLoading, renderTodos, showLoading } from "./modules/dom.js";
import { createTodo } from "./modules/utils.js";

let todos = [];

async function init() {
  showLoading();

  todos = await loadTodos();
  await renderTodos(todos, deleteTodo, toggleDone);

  hideLoading();
}

let currentFilter = "all";

function applyFilter(todos) {
  if (currentFilter === "done") return todos.filter((todo) => todo.done);
  if (currentFilter === "pending") return todos.filter((todo) => !todo.done);
  return todos;
}

document.getElementById("todo-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (text) {
    const newTodo = createTodo(text);
    const result = await saveTodoToAPI(newTodo);
    todos.push({
      ...newTodo,
      id: result.id,
    });
    await renderTodos(applyFilter(todos), deleteTodo, toggleDone);
    input.value = "";
  }
});

async function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  await renderTodos(todos, deleteTodo, toggleDone);
}

async function toggleDone(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  await renderTodos(applyFilter(todos), deleteTodo, toggleDone);
}

document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", async () => {
    currentFilter = button.dataset.filter;
    await renderTodos(applyFilter(todos), deleteTodo, toggleDone);
  });
});

init();
