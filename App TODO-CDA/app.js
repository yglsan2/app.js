



// éléments à faire
let todoInput = document.getElementById("todoInput");
let submitBtn = document.getElementById("submitBtn");
let todos = document.getElementById("todos");
let todosNb = document.getElementById("todosNb");
let deleteAllBtn = document.getElementById("deleteAll");


const loadTodos = () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// compteur de listes (todos)
let nbTodos = 0;
let listTodos = loadTodos();

// fonctions
const createDeleteBtn = () => {
  let deleteButton = document.createElement("div");
  deleteButton.classList.add("btn");
  deleteButton.innerHTML = '<ion-icon name="trash"></ion-icon>';

  // création de fonction effacement
  deleteButton.addEventListener("click", deleteTodo);

  return deleteButton;
};

const addTodo = () => {
  let todoText = todoInput.value;
  if (todoText == "") return;

  const newTodo = {
    name: todoText,
    status: "en cours"
  };

  todoInput.value = "";
  nbTodos++;
  listTodos.push(newTodo);
  saveTodos(listTodos);
  displayTodo(newTodo)
}

const displayTodo = (todoObject) => {

  let newTodo = document.createElement("div");
  newTodo.classList.add("todo");
  if (todoObject.status === "fini"){
    newTodo.classList.add("done");
  }
  newTodo.innerHTML = `<p>${todoObject.name}</p>`;

  newTodo.appendChild(createDeleteBtn());

  // ajout de nouvelle liste de choses à faire à la liste 'new todo' 
  if (todos != null) {
    todos.appendChild(newTodo);
  }
};


const effid = document.getElementById("EffLettreBouton");
effid.addEventListener("click", (event) => {
  document.getElementById("todoInput").value = "";
});

// effacement de liste avec le bouton 

const deleteTodo = (event) => {
  let todoEl = event.target.closest("div.todo");
  /*alternative : remonter de deux parents : event.target.parentNode.parentNode*/
  let todoText = todoEl.firstChild.textContent;
  /*child tableau  : firstChild, lastChild, childNodes[x] */

  // récupère l'index de ce todo dans la liste de tous les todos
  const todoIndex = listTodos.indexOf(todoText);
  // supprime de la liste des todos l'élement à l'index trouvé précédement
  listTodos.splice(todoIndex, 1);
  // finalement enregistre les modifications
  saveTodos(listTodos);
//ajout de bouton (terminé) qui raye de la liste mais sans supprimer


 todoEl.remove();
  nbTodos--;
  todosNb.innerText = nbTodos;
}


const deleteAll = () => {
  todos.innerHTML = "";
  nbTodos = 0;
  todosNb.innerText = nbTodos;
};

submitBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAll);
//création du bouton de marquage "tâches terminées"

/*const markedButton = () => {
  let markedButton = document.createElement("div");
  markedButton.classList.add("btn");
  markedButton.innerHTML = '';

  // création de fonction effacement
  markedButton.addEventListener("click", finies);*/


//affichage de todos au chargement de la page. 

listTodos.forEach(displayTodo);

// la ligne précédente est équivalente à ce code:
/*
listTodos.forEach((todo) => {
  displayTodo(todo);
});
*/


//stockage de données dans le local storage 

//localStorage.setItem("todos", 50);
//const todos2 = localStorage.getItem("todos");






