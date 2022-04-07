import _ from 'lodash';
import './style.css';

let app = document.querySelector('#app');
let navBar = document.querySelector('.nav-bar');
let addTodoBtn = document.querySelector('.add-todo')
let form = document.querySelector('form');
let formContainer = document.querySelector('.form-container');
let formCancelBtn = document.querySelector('.cancel-button');




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