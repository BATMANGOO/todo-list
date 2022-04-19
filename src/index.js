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
const todos = todoContainer.childNodes;
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

  project.deleteTodo = (id) => {
    project.todos = project.todos.filter(todo => todo.id !== id);
  }

  project.checkTodo = id => {
    const todo = project.todos.find(todo => todo.id === id);
    if (todo.completed === false) {
      todo.completed = true;
    } else {
      todo.completed = false;
    }
    return todo;
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

const Todo = (title, description, dueDate, priority) => {
  const todo = {};
  todo.id = _.uniqueId();
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = priority;
  todo.completed = false;

  todo.completedStatus = () => {
    return todo.completed;
  }

  todo.render = () => {
    let todoContainer = document.createElement('div');
    todoContainer.setAttribute('data-id', todo.id);
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

function setCurrentProj() {
  projects.forEach(project => {
    project.addEventListener('click', (e) => {
      let targetClassList = e.target.classList;
      const projectID = e.target.getAttribute('data-id')
      const clickedProject = projectsArray.find(project => project.getId() === projectID);

      if (targetClassList.contains('project-delete')) {
        deleteProjEvent(project, e);
        console.log({currentProject})
      } else {
        currentProject = clickedProject;
        currentProjTitle.innerHTML = currentProject.name;
        currentProject.renderTodos();
        deleteTodoEvent(currentProject);
        toggleTodoCheck(currentProject);
      }
    })
  })
};

function deleteProjEvent(project, e) {
  projectsContainer.removeChild(project);
  projectsArray = projectsArray.filter(project => project.getId() !== e.target.parentNode.getAttribute('data-id'));
  currentProject = projectsArray[projectsArray.length - 1];
  return currentProject.renderTodos();
};

function deleteTodoEvent(currentProject) {
  todos.forEach(todo => {
    todo.addEventListener('click', e => {
      if(e.target.classList.contains('delete-todo')) {
        todoContainer.removeChild(todo);
        currentProject.deleteTodo(e.target.parentNode.parentNode.getAttribute('data-id'));
        console.log(currentProject.getTodos());
      }
    });
  });
};

function toggleTodoCheck(currentProject) {
  todos.forEach(todo => {
    todo.addEventListener('click', e => {
      if(e.target.classList.contains('check-todo')) {
        const todoID = e.target.parentNode.parentNode.getAttribute('data-id');
        const todo = currentProject.checkTodo(todoID);
        e.target.parentNode.parentNode.classList.toggle('checked');
        // change innerHTML of check-todo button
        if (todo.completedStatus() === true) {
          e.target.innerHTML = 'Uncheck';
        } else {
          e.target.innerHTML = 'Check';
        }
      }
    })
  })
}

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
  let todo = Todo(title, description, dueDate, priority);
  currentProject.addTodo(todo);
  currentProject.renderTodos();
  deleteTodoEvent(currentProject);
  toggleTodoCheck(currentProject);
  form.reset();
  formContainer.classList.toggle('hide');
});

createProjBtn.addEventListener('click', (e) => {
  const project = Project(newProjectname.value);
  projectsArray.push(project);
  currentProject = project;
  currentProject.render();
  currentProject.renderTodos();
  setCurrentProj();
  newProjectname.value = '';
  projectFormContainer.classList.toggle('hide2');
});

formCancelBtn.addEventListener('click', (e) => { 
  e.preventDefault();
  formContainer.classList.toggle('hide');
  form.reset();
});
  
// set events for current project on initial page load

let todo1 = Todo('Buy Milk', 'Buy milk for the family', '2020-01-01', 'High');
let todo2 = Todo('Buy Bread', 'Buy bread for the family', '2020-01-01', 'High');
let project1 = Project('Family time');
let project2 = Project('Work');

project1.addTodo(todo1);
project2.addTodo(todo2);
projectsArray.push(project1, project2);
project1.render();
project2.render();
currentProject = projectsArray[0];
currentProjTitle.innerHTML = currentProject.name;
currentProject.renderTodos();
setCurrentProj();
deleteTodoEvent(currentProject);
toggleTodoCheck(currentProject);
