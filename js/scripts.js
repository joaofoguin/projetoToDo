// SELEÇÃO DE ELEMENTOS ---------------------------------------------------------------------------------
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// FUNÇÕES -------------------------------------------------------------------------------------------------
const saveTodo = (text) => {

    //Cria a div de objetos no console
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    // console.log(todo);

    //Cria botões
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

}

// Esconde listas para edição
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) =>{

    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
}

// EVENTOS -------------------------------------------------------------------------------------------------

    // envia elementos pela caixa add tarefa, é possivel verifica na ferramenta do desenvolvedor
todoForm.addEventListener("submit", (e) => {

    e.preventDefault();

    // console.log("Enviou o form");

    const inputValue = todoInput.value; 

    /* envia informação digitada na caixa
    if (inputValue){
        console.log(inputValue);
        // save todo
    }
    */

    if (inputValue){
        saveTodo(inputValue);
    }
})


document.addEventListener("click", (e) => {

    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        //console.log("Clicou para finalizar");

        // "toggle" para marcar e desmarcar a caixa, caso quisesse deixar marcado, seria "add"
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        //muda o valor do input, por ser edição
        editInput.value = todoTitle;
        //como um histórico, salva o valor antigo
        oldInputValue = todoTitle;
    }
})

// Edita lista
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms(); 
})