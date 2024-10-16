/* eslint-disable */

import '@babel/polyfill'
import { login } from './login'

const loginForm = document.querySelector('.form');

console.log('initiated')

if (loginForm) {
  console.log('has login')

  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('loginnn')
    login(email, password);
  });  
}
