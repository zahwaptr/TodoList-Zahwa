function tambahTodo() {
  const input = document.getElementById("inputTodo");
  const list = document.getElementById("listTodo");

  if (input.value.trim() === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = input.value;

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

  li.appendChild(span);
  li.appendChild(actions);

  list.appendChild(li);

  input.value = "";
}

document.getElementById("inputTodo").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    tambahTodo();
  }
});