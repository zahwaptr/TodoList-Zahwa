let todos = [];
let filter = "all";

// LOAD data
window.onload = function () {
  const data = localStorage.getItem("todos");
  if (data) {
    todos = JSON.parse(data);
  }
  render();
};

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function tambahTodo() {
  const input = document.getElementById("inputTodo");

  if (input.value.trim() === "") return;

  todos.push({
    text: input.value,
    done: false
  });

  input.value = "";
  save();
  render();
}

function render() {
  const list = document.getElementById("listTodo");
  const info = document.getElementById("info");

  list.innerHTML = "";

  let filtered = todos.filter(todo => {
    if (filter === "done") return todo.done;
    if (filter === "pending") return !todo.done;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.gap = "10px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.done) span.classList.add("completed");

    checkbox.onchange = function () {
      todo.done = checkbox.checked;
      save();
      render();
    };

    left.appendChild(checkbox);
    left.appendChild(span);

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.classList.add("btn-edit");
    btnEdit.onclick = function () {
      const newText = prompt("Edit tugas:", todo.text);
      if (newText && newText.trim() !== "") {
        todo.text = newText;
        save();
        render();
      }
    };

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Hapus";
    btnDelete.classList.add("btn-delete");
    btnDelete.onclick = function () {
      todos.splice(index, 1);
      save();
      render();
    };

    actions.appendChild(btnEdit);
    actions.appendChild(btnDelete);

    li.appendChild(left);
    li.appendChild(actions);

    list.appendChild(li);
  });

  info.textContent = `Total: ${todos.length} | Done: ${todos.filter(t => t.done).length}`;
}

function setFilter(type) {
  filter = type;
  render();
}

// ENTER
document.getElementById("inputTodo").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    tambahTodo();
  }
});
