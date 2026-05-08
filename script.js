let todos = [];
let filter = "all";

// Load Data
window.onload = function () {
  const data = localStorage.getItem("todos");

  if (data) {
    todos = JSON.parse(data);
  }

  render();
};

// Save Data
function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function tambahTodo() {

  const input = document.getElementById("inputTodo");

// Trim whitespace
  const text = input.value.trim();

// Validation input kosong
  if (text === "") {
    alert("Task tidak boleh kosong!");
    return;
  }

// Character limit
  if (text.length > 50) {
    alert("Task maksimal 50 karakter!");
    return;
  }

// Duplicate task validation
  const isDuplicate = todos.some(todo =>
    todo.text.toLowerCase() === text.toLowerCase()
  );

  if (isDuplicate) {
    alert("Task sudah ada!");
    return;
  }

// Tambah ke array
  todos.push({
    text: text,
    done: false
  });

  input.value = "";

  save();
  render();
}

// Render Todo
function render() {
  const list = document.getElementById("listTodo");
  const info = document.getElementById("info");

  list.innerHTML = "";

  let filtered = todos.filter(todo => {

    if (filter === "done") {
      return todo.done;
    }

    if (filter === "pending") {
      return !todo.done;
    }

    return true;
  });

  filtered.forEach((todo, index) => {

    const li = document.createElement("li");

    // Left Side 
    const left = document.createElement("div");
    left.classList.add("left");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.onchange = function () {
      todo.done = checkbox.checked;

      save();
      render();
    };

    // Text
    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.done) {
      span.classList.add("completed");
    }

    left.appendChild(checkbox);
    left.appendChild(span);

    // Action Buttons
    const actions = document.createElement("div");
    actions.classList.add("actions");

    // Edit
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

    // Delete 
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

  // Info
  const doneCount = todos.filter(todo => todo.done).length;

  info.textContent = `Total: ${todos.length} | Done: ${doneCount}`;
}

// Filter
function setFilter(type) {
  filter = type;
  render();
}

// Enter key
document.getElementById("inputTodo").addEventListener("keypress", function(e) {

  if (e.key === "Enter") {
    tambahTodo();
  }

});
