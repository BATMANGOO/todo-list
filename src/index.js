import _, {
  create,
  uniqueId
} from 'lodash';
import './style.css';

const addTodoBtn = document.querySelector('.add-todo')
const currentProjTitle = document.querySelector('.current-proj-title');
const createTodoBtn = document.querySelector('.create-todo');
const projectFormBtn = document.querySelector('.add-project');
const createProjBtn = document.querySelector('.create-project');
const closeProjForm = document.querySelector('.close-project-form');
const newProjectname = document.querySelector('input[name="name"]');
const projectFormContainer = document.querySelector('.proj-form-container');
const form = document.querySelector('.todo-form');
const formContainer = document.querySelector('.form-container');
const formCancelBtn = document.querySelector('.cancel-button');
const todoContainer = document.querySelector('.todo-container');
const todos = todoContainer.childNodes;
const projectsContainer = document.querySelector('.project-list');
const projects = projectsContainer.childNodes;

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

  project.getTodo = (id) => {
    return project.todos.find(todo => todo.id === id);
  }

  project.editTodo = (id, title, description, dueDate, priority) => {
    const todo = project.todos.find(todo => todo.id === id);
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
    return todo;
  }

  project.renderTodos = () => {
    let todos = project.getTodos();
    todoContainer.innerHTML = '';
    if (todos.length <= 0) {
      return todoContainer.innerHTML = `<p>No todos for this project</p>`;
    }
    return todos.forEach(todo => {
      todoContainer.appendChild(todo.render());
    });
  }

  project.render = () => {
    projectsContainer.innerHTML += `
      <div data-id=${project.id} class="project project-name">${project.name}<button class="project-delete btn btn-danger">X</button></div>
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
      <div class='todo-info'>
        <p class="todo-name">${todo.title}</p>
        <p class="todo-description">${todo.description}</p>
        <p class="todo-date">${todo.dueDate}</p>
        <p class="todo-priority">Priority:</br>${todo.priority}</p>
      </div>
      <div class="todo-buttons">
        <button class="edit-todo btn btn-success">Edit</button>
        <button class="delete-todo btn btn-danger">Delete</button>
        <button class="check-todo btn btn-warning">Check</button>
      </div>
    `;
    return todoContainer;
  }
  return todo;
};

// set selected project as current and render their todos
function setCurrentProj() {
  projects.forEach(project => {
    project.addEventListener('click', (e) => {
      let targetClassList = e.target.classList;
      const projectID = e.target.getAttribute('data-id')
      const clickedProject = projectsArray.find(project => project.getId() === projectID);

      if (targetClassList.contains('project-delete')) {
        deleteProjEvent(project, e);
      } else {
        currentProject = clickedProject;
        currentProjTitle.innerHTML = currentProject.name;
        currentProject.renderTodos();
        todoEvents();
      }
    })
  })
};

function deleteProjEvent(project, e) {
  projectsContainer.removeChild(project);
  projectsArray = projectsArray.filter(project => project.getId() !== e.target.parentNode.getAttribute('data-id'));
  currentProject = projectsArray[projectsArray.length - 1];
  currentProjTitle.innerHTML = currentProject.name;
  return currentProject.renderTodos();
};

function deleteTodoEvent(currentProject) {
  todos.forEach(todo => {
    todo.addEventListener('click', e => {
      if (e.target.classList.contains('delete-todo')) {
        todoContainer.removeChild(todo);
        currentProject.deleteTodo(e.target.parentNode.parentNode.getAttribute('data-id'));
      }
    })
  })
};

// check todo as completed/incomplete
function toggleTodoCheck(currentProject) {
  todos.forEach(todo => {
    todo.addEventListener('click', e => {
      if (e.target.classList.contains('check-todo')) {
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
};

// edit clicked todo
function editTodoEvent(currentProject) {
  todos.forEach(todo => {
    todo.addEventListener('click', e => {
      if (e.target.classList.contains('edit-todo')) {
        // formContainer.classList.toggle('hide');
        const todoID = e.target.parentNode.parentNode.getAttribute('data-id');
        const chosenTodo = currentProject.getTodo(todoID);
        const editForm = document.createElement('form');
        // replace todo with edit form
        editForm.innerHTML = `
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" value="${chosenTodo.title}">
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" id="description" value="${chosenTodo.description}">
          </div>
          <div class="form-group">
            <label for="dueDate">Due Date</label>
            <input type="date" class="form-control" id="dueDate" value="${chosenTodo.dueDate}">
          </div>
          <div class="form-group">
            <label for="priority">Priority</label>
            <select class="form-control" id="priority">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button type="submit" class="submit-edit btn btn-primary">Submit</button>
        `;
        todoContainer.replaceChild(editForm, todo);
        const submitEditButton = editForm.querySelector('.submit-edit');

        submitEditButton.addEventListener('click', (e) => {
          e.preventDefault();
          const title = editForm.querySelector('#title').value;
          const description = editForm.querySelector('#description').value;
          const dueDate = editForm.querySelector('#dueDate').value;
          const priority = editForm.querySelector('#priority').value;
          const editedTodo = currentProject.editTodo(todoID, title, description, dueDate, priority);
          todoContainer.replaceChild(editedTodo.render(), editForm);
          todoEvents();
        });
      }
    })
  })
};

// bundle repetitive functions into one function
function todoEvents() {
  deleteTodoEvent(currentProject);
  toggleTodoCheck(currentProject);
  editTodoEvent(currentProject);
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
  localStorage.clear();
  localStorage.setItem('projects', JSON.stringify(projectsArray));
  todoEvents();
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
  localStorage.clear();
  localStorage.setItem('projects', JSON.stringify(projectsArray));
  newProjectname.value = '';
  projectFormContainer.classList.toggle('hide2');
});

formCancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formContainer.classList.toggle('hide');
  form.reset();
});

closeProjForm.addEventListener('click', (e) => {
  e.preventDefault();
  projectFormContainer.classList.toggle('hide2');
  newProjectname.value = '';
});

// set events for current project on initial page load

if (projectFormContainer.length <= 0) {
   projectFormContainer.append('<p>No projects yet!</p>');
}

// retreiving projects from local storage
window.addEventListener('load', () => {
  const getItems = localStorage.getItem('projects');
  const parsedProjects = JSON.parse(getItems);
  const objArray = [...parsedProjects]
  // set projectsArray to an empty array to prevent duplicate objects
  projectsArray = [];
  objArray.forEach(project => {
    const projectObj = Project(project.name);
    projectsArray.push(projectObj);
    project.todos.forEach(todo => {
      const todoObj = Todo(todo.title, todo.description, todo.dueDate, todo.priority);
      projectObj.addTodo(todoObj);
    });
    projectObj.render();
    currentProjTitle.innerHTML = projectObj.name;
  });
  currentProject = projectsArray[projectsArray.length - 1];
  currentProjTitle.innerHTML = currentProject.name;
  currentProject.renderTodos();
  setCurrentProj();
  todoEvents();
});

