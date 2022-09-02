import './style.css';
import Leaderboard from './modules/leaderboard.js';
import Display from './modules/display';

const name = document.getElementById('name');
const score = document.getElementById('score');
const submit = document.querySelector('.submit');
const refresh = document.querySelector('.refresh');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1RNqSQbA3bstzmvGd8as';
const api = new Leaderboard(url);

// Display
const requestUrl = `${url}/scores/`;
api.getData(requestUrl);

setTimeout(() => {
    document.addEventListener('DOMContentLoaded', () => {
        api.getData(requestUrl);
    });
}, 1000);

const display = new Display();

// Submit Button
submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
        submit.click();
    }
    if (!name.value.trim()) {
        name.setCustomValidity('Please check input field.');
        name.reportValidity();
    } else if (!score.value) {
        score.setCustomValidity('Please check input field.');
        score.reportValidity();
    } else if (name.value.trim() && score.value) {
        api.addData(requestUrl, name.value.trim(), score.value);
        submit.setCustomValidity('Score created succesfully.');
        submit.reportValidity();
        name.value = '';
        score.value = '';
    }
    setTimeout(() => {
        api.getData(requestUrl);
        const arr = JSON.parse(localStorage.getItem('data'));
        display.createList(arr);
    }, 1000);
});

// Refresh Button
refresh.addEventListener('click', () => {
    api.getData(requestUrl);
    if (localStorage.getItem('data')) {
        const arr = JSON.parse(localStorage.getItem('data'));
        display.createList(arr);
    }
});

// On Page Load
window.onload = () => {
    if (localStorage.getItem('data')) {
        const arr = JSON.parse(localStorage.getItem('data'));
        display.createList(arr);
    }
};