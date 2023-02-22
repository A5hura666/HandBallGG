import '@babel/polyfill'
import { login, logout } from './login.js';
import {init, matchInformation, test} from './match.js';

// Select elements
const loginForm = document.querySelector('.loginForm');
const logOutBtn = document.querySelector('.nav-right');

const searchBtn = document.querySelector('#searchBtn');

if (searchBtn) {
    searchBtn.addEventListener('click', matchInformation);
}

// Delegation
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        // const email = document.querySelector('#email').value;
        // const password = document.querySelector('#password').value;
        login(email, password);
    })
}


if (logOutBtn) {
    logOutBtn.addEventListener('click', logout);
}
