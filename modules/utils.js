export function createTodo(text) {
  return {
    id: Date.now(),
    text,
    done: false,
  };
}

export function fakeServerResponse(data = null, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}
