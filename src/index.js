import _, { create, uniqueId } from 'lodash';
import './style.css';

const addTodoBtn = document.querySelector('.add-todo')
const currentProjTitle = document.querySelector('.current-proj-title');
const createTodoBtn = document.querySelector('.create-todo');
const projectFormBtn = document.querySelector('.add-project');
const createProjBtn = document.querySelector('.create-project');
const newProjectname = document.querySelector('input[name="name"]');
const projectFormContainer = document.querySelector('.proj-form-container');
const projectForm = document.querySelector('.project-form');
const form = document.querySelector('.todo-form');
const formContainer = document.querySelector('.form-container');
const formCancelBtn = document.querySelector('.cancel-button');
const todoContainer = document.querySelector('.todo-container');
const projectsContainer = document.querySelector('.project-list');
const projects = projectsContainer.childNodes;
const projectFormName = document.querySelector('.project-form-name');

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

function addEvent() {
  projects.forEach(project => {
    project.addEventListener('click', (e) => {
      let targetClassList = e.target.classList;
      const projectID = e.target.getAttribute('data-id')
      const clickedProject = projectsArray.find(project => project.getId() === projectID);

      if (targetClassList.contains('project-delete')) {
        projectsContainer.removeChild(project);
        projectsArray = projectsArray.filter(project => project.getId() !== e.target.parentNode.getAttribute('data-id'));
        currentProject = projectsArray[projectsArray.length - 1];
        return currentProject.renderTodos();
      };
      currentProject = clickedProject;
      currentProjTitle.innerHTML = currentProject.name;
      return currentProject.renderTodos();
    })
  });
}

let todo1 = Todo('Buy Milk', 'Buy milk for the family', '2020-01-01', 'High', false);
let todo2 = Todo('Buy Bread', 'Buy bread for the family', '2020-01-01', 'High', false);
let project1 = Project('Family time');
let project2 = Project('Work');
project1.addTodo(todo1);
project2.addTodo(todo2);
projectsArray.push(project1, project2);

project1.render();
project2.render();

addTodoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formContainer.classList.toggle('hide');
  form.reset();
});

projectFormBtn.addEventListener('click', (e) => {
  projectFormContainer.classList.toggle('hide2');
});

createTodoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let dueDate = form.elements.date.value;
  let priority = form.elements.priority.value;
  let completed = false;
  let todo = Todo(title, description, dueDate, priority, completed);
  currentProject.addTodo(todo);
  currentProject.renderTodos();
  form.reset();
  formContainer.classList.toggle('hide');
});

createProjBtn.addEventListener('click', (e) => {
  const project = Project(newProjectname.value);
  projectsArray.push(project);
  currentProject = project;
  currentProject.render();
  currentProject.renderTodos();
  addEvent();
  newProjectname.value = '';
  projectFormContainer.classList.toggle('hide2');
});

formCancelBtn.addEventListener('click', (e) => { 
  e.preventDefault();
  formContainer.classList.toggle('hide');
  form.reset();
});
  
// document.body.appendChild(component());

// console.log(projects);
currentProject = projectsArray[0];
currentProjTitle.innerHTML = currentProject.name;
currentProject.renderTodos();
addEvent();