const baseURL = "https://crudcrud.com/api/";
const apiKey = "22acb8691161449e8be96dade0fbf587";
const url = baseURL + apiKey + "/todos";

let todos = [];

loadTodos();

function newElement(){
  var inputValue = document.getElementById("newInput").value;
  if (!inputValue) {
    alert("Kegiatan tidak boleh kosong!");
  }

  const todo = {
    title: inputValue,
    checked: false,
  };

  fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())
    .then((todo) => {
        createList(todo);
    });
}

function createList(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo._id;
    li.innerText = todo.title;
    li.onclick = checkTodo;
    var span = document.createElement("SPAN");
    var txt = document.createTextNode();
    span.className = "close";
    span.onclick = closeTodo;
    span.appendChild(txt);

    if (todo.checked) {
        li.classList.toggle("checked");
    }
    li.appendChild(span);
    document.getElementById("newUL").appendChild(li);
}

function closeTodo(e) {

}

function checkTodo() {
    const id = this.dataset.id;
    if (todos !== null ) {
        const index = todos.findIndex((todo) => todo._id == id);
        const todo = todos[index];
        console.log(todo);
        if (todo) {
            todo.checked = !todo.checked;

            fetch(url + "/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: todo.title,
                    checked: todo.checked,
                }),
            })
                .then((response) => response.json())
                .then((todo) => {
                    todos[index] = todo;
                });
        }
    }
}

function loadTodos() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        todos = data;
        todos.forEach((todo) => {
            createList;
        });
    });
}