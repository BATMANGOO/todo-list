import _ from 'lodash';
import './style.css';

let app = document.querySelector('#app');
let navBar = document.querySelector('.nav-bar');
let addTodoBtn = document.querySelector('.add-todo')
let form = document.querySelector('form');
let formContainer = document.querySelector('.form-container');
let formCancelBtn = document.querySelector('.cancel-button');
let todoContainer = document.querySelector('.todo-container');
let projectsContainer = document.querySelector('.project-list');
let projects = projectsContainer.childNodes;

// create project form in index.html
class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
      this.todos.push(todo);
    }

  showtodos() {
    return this.todos;
  }

  render() {
    let project = document.createElement('div');
    project.classList.add('project');
    project.innerHTML = `
      <p class="project-name">${this.name}</p>
      <button class="project-delete">X</button>
    `;
    return project;
  }
};

class displayTodos extends Project {
  constructor(todos) {
    super(todos);
    this.todos = todos;
  }

  render() {
    this.todos.forEach(todo => {
      todo.style.width = '300px';
      todo.innerHTML = `
      <div class='todo-item'>
        <p class="todo-name">${this.title}</p>
        <p class="todo-description">${this.description}</p>
        <p class="todo-date">${this.dueDate}</p>
        <p class="todo-priority">${this.priority}</p>
        <div class="todo-buttons">
          <button class="edit-todo">Edit</button>
          <button class="delete-todo">Delete</button>
          <button class="check-todo">Check</button>
        </div>
      </div>
      `;
    });
  }
 }

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
};

let todo1 = new Todo('Buy Milk', 'Buy milk for the family', '2020-01-01', 'High', false);

let project1 = new Project('Project 1');
project1.addTodo(todo1);

projectsContainer.appendChild(project1.render());

projects.forEach(project => {
  project.addEventListener('click', e => {
    console.log(e.target);
  })
});

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

console.log(projects);