//@ts-nocheck
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const taskStats = document.getElementById('taskStats');
const priorityInput = document.getElementById('priorityInput');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

todoForm.addEventListener('submit', handleFormSubmit);

function saveToLocal() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';

  for (let index = 0; index < todos.length; index++) {
    const li = document.createElement('li');
    li.className = todos[index].completed ? 'completed' : '';

    const priorityLabel = document.createElement('span');
    priorityLabel.textContent = `(${todos[index].priority})`;
    priorityLabel.className = `priority ${todos[index].priority.toLowerCase()}`;

    const span = document.createElement('span');
    span.textContent = todos[index].todo;
    span.addEventListener('click', () => toggleComplete(index));

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', () => editTodo(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => deleteTodo(index));

    span.appendChild(priorityLabel);
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(buttonGroup);
    todoList.appendChild(li);
  }
  updateTaskStats();
}

function updateTaskStats() {
  const total = todos.length;
  // how many completed
  let completed = 0;
  for (index = 0; index < todos.length; index++) {
    if (todos[index].completed === true) {
      completed++;
    }
  }
  taskStats.textContent = `${completed} of ${total} task(s) completed`;
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveToLocal();
  renderTodos();
}

function addTodo(todo, priority) {
  todos.push({ todo, priority, completed: false });
  saveToLocal();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveToLocal();
  renderTodos();
}

function editTodo(index) {
  const newTodo = prompt('Edit your todo: ', todos[index].todo);

  if (newTodo !== null && newTodo.trim() !== '') {
    todos[index].todo = newTodo.trim();
    saveToLocal();
    renderTodos();
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const text = todoInput.value.trim();
  const priority = priorityInput.value;
  if (text !== '') {
    addTodo(text, priority);
    todoInput.value = '';
  }
}

renderTodos();

// sort tasks by priority automatically
// add searching option
// allow editing the priority 