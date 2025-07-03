export async function loadTodos() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  const data = await res.json();
  return data.map((todo) => ({
    id: todo.id,
    text: todo.title,
    done: todo.completed,
  }));
}

export async function saveTodoToAPI(todo) {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      title: todo.text,
      completed: todo.done,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return await response.json();
}
