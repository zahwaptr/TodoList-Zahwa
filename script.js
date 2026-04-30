function tambahTodo() {
  const input = document.getElementById("inputTodo");
  const list = document.getElementById("listTodo");

  if (input.value.trim() === "") return;

  const li = document.createElement("li");

  // CHECKBOX
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = input.value;

  // EVENT CHECKBOX
  checkbox.onchange = function () {
    if (checkbox.checked) {
      span.classList.add("completed");
    } else {
      span.classList.remove("completed");
    }
  };

  const actions = document.createElement("div");
  actions.classList.add("actions");

  // EDIT
  const btnEdit = document.createElement("button");
  btnEdit.textContent = "Edit";
  btnEdit.classList.add("btn-edit");
  btnEdit.onclick = function () {
    const newText = prompt("Edit tugas:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText;
    }
  };

  // DELETE
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Hapus";
  btnDelete.classList.add("btn-delete");
  btnDelete.onclick = function () {
    list.removeChild(li);
  };

  actions.appendChild(btnEdit);
  actions.appendChild(btnDelete);

  // WRAPPER biar checkbox + text sejajar
  const left = document.createElement("div");
  left.style.display = "flex";
  left.style.alignItems = "center";
  left.style.gap = "10px";

  left.appendChild(checkbox);
  left.appendChild(span);

  li.appendChild(left);
  li.appendChild(actions);

  list.appendChild(li);

  input.value = "";
}

document.getElementById("inputTodo").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    tambahTodo();
  }
});
