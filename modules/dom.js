import { fakeServerResponse } from "./utils.js";

export async function renderTodos(todoList, onDelete, onToggle) {
  showLoading();

  await fakeServerResponse();

  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todoList.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.done) li.classList.add("done");

    li.addEventListener("click", () => {
      onToggle(todo.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      onDelete(todo.id);
    });

    li.appendChild(deleteButton);

    list.appendChild(li);
  });

  hideLoading();
}

export function showLoading() {
  document.getElementById("loading").style.display = "block";
}

export function hideLoading() {
  document.getElementById("loading").style.display = "none";
}
