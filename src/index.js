import _, { create, uniqueId } from 'lodash';
import './style.css';

let addTodoBtn = document.querySelector('.add-todo')
let createTodoBtn = document.querySelector('.create-todo');
let projectFormBtn = document.querySelector('.add-project');
let createProjBtn = document.querySelector('.create-project');
let projectFormContainer = document.querySelector('.proj-form-container');
let projectForm = document.querySelector('.project-form');
let form = document.querySelector('.todo-form');
let formContainer = document.querySelector('.form-container');
let formCancelBtn = document.querySelector('.cancel-button');
let todoContainer = document.querySelector('.todo-container');
let projectsContainer = document.querySelector('.project-list');
let projects = projectsContainer.childNodes;
let projects2 = document.getElementsByClassName('project');
let projectFormName = document.querySelector('.project-form-name');

// console.log({projects});

let projectsArray = [];
let currentProject = null;

const Project = (name) => {
  const project = {};
  project.id = _.uniqueId();
  project.name = name;
  project.todos = [];

  project.addTodo = (todo) => {
    project.todos.push(todo);
  };

  project.getTodos = () => {
    return project.todos;
  }

  project.getId = () => {
    return project.id;
  }

  project.renderTodos = () => {
    let todos = project.getTodos();
    todoContainer.innerHTML = '';
    if(todos.length <= 0) {
      return todoContainer.innerHTML = `<p>No todos for this project</p>`;
    }
    return todos.forEach(todo => {
      todoContainer.appendChild(todo.render());
    });
  }

  project.render = () => {
    projectsContainer.innerHTML += `
      <div data-id=${project.id} class="project project-name">${project.name}<button class="project-delete">X</button></div>
    `;
    return projectsContainer;
  }

  return project
};

const Todo = (title, description, dueDate, priority, completed) => {
  const todo = {};
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = priority;
  todo.completed = completed;

  todo.render = () => {
    let todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-item');
    todoContainer.style.width = '300px';
    todoContainer.innerHTML = `
      <p class="todo-name">${todo.title}</p>
      <p class="todo-description">${todo.description}</p>
      <p class="todo-date">${todo.dueDate}</p>
      <p class="todo-priority">${todo.priority}</p>
      <div class="todo-buttons">
        <button class="edit-todo">Edit</button>
        <button class="delete-todo">Delete</button>
        <button class="check-todo">Check</button>
      </div>
    `;
    return todoContainer;
  }
  return todo;
};

let todo1 = Todo('Buy Milk', 'Buy milk for the family', '2020-01-01', 'High', false);

let project1 = Project('Family time');
projectsArray.push(project1);
console.log(projectsArray);
project1.addTodo(todo1);

// console.log(projects)
project1.render();

projects.forEach(project => {
  project.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-delete')) {
      projectsContainer.removeChild(project);
    }
    // if () {
    //   console.log('project exists');
    // } else {
    //   console.log('project does not exist');
    // }
    projectsArray.find(project => {
      if (project.getId() === e.target.getAttribute('data-id')) {
        console.log('project exists');
        currentProject = project;
        currentProject.renderTodos();
      } else {
        console.log('project does not exist');
      }
    })
    // if(projectsArray.includes(e.target.getAttribute('data-id'))) {
    //   console.log('project exists');
    // } else {
    //   console.log('project does not exist');
    // }
    console.log(e.target.getAttribute('data-id'));

  })
});

addTodoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formContainer.classList.toggle('hide');
  form.reset();
});

projectFormBtn.addEventListener('click', (e) => {
  e.preventDefault();
  projectFormContainer.classList.toggle('hide2');
});

createProjBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let projectName = projectForm.elements.name.value;
  let project = Project(projectName);
  projectsArray.push(project);
  project.render();
  console.log(projectsArray);
  currentProject = project;
  currentProject.renderTodos();
  console.log({currentProject})
  projectForm.reset();
  projectFormContainer.classList.toggle('hide2');
});

createTodoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let dueDate = form.elements.date.value;
  let priority = form.elements.priority.value;
  let completed = false;
  console.log({ title, description, dueDate, priority, completed });
  let todo = Todo(title, description, dueDate, priority, completed);
  let project = currentProject.addTodo(todo);
  currentProject.renderTodos();
  form.reset();
  formContainer.classList.toggle('hide');
});



formCancelBtn.addEventListener('click', (e) => { 
  e.preventDefault();
  formContainer.classList.toggle('hide');
  form.reset();
});
  
// document.body.appendChild(component());

// console.log(projects);
