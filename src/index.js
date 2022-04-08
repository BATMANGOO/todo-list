import _ from 'lodash';
import './style.css';

let app = document.querySelector('#app');
let navBar = document.querySelector('.nav-bar');
let addTodoBtn = document.querySelector('.add-todo')
let form = document.querySelector('form');
let formContainer = document.querySelector('.form-container');
let formCancelBtn = document.querySelector('.cancel-button');
let todoContainer = document.querySelector('.todo-container');
class Project {}


class Todo {
    constructor(title, description, dueDate, priority, completed) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    render() {
        let todo = document.createElement('div');
        todo.classList.add('todo-item');
        todo.style.width = '300px';
        todo.innerHTML = `
            <p class="todo-name">${this.title}</p>
            <p class="todo-description">${this.description}</p>
            <p class="todo-date">${this.dueDate}</p>
            <p class="todo-priority">${this.priority}</p>
            <div class="todo-buttons">
              <button class="edit-todo">Edit</button>
              <button class="delete-todo">Delete</button>
              <button class="check-todo">Check</button>
            </div>
        `;
        return todo;
    }
}

addTodoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formContainer.classList.toggle('hide');
  form.reset();
});

formCancelBtn.addEventListener('click', (e) => { 
  e.preventDefault();
  formContainer.classList.toggle('hide');
  form.reset();
});
  
// document.body.appendChild(component());