// By Damian Demasi (damian.demasi.1@gmail.com) - July 2021

'use strict';

// SECTION Default tasks items

const itemsList = [
    {
        task: 'This is task #1',
        dueDate: '06/07/2021',
        completed: false
    },
    {
        task: 'This is task #2',
        dueDate: '06/07/2021',
        completed: false
    },
    {
        task: 'This is task #3',
        dueDate: '06/07/2021',
        completed: false
    },
];

// SECTION Function definitions

const setBackground = (method) => {
    let currentHour = 0; // Default

    if (method === 'automatic') {
        currentHour = new Date().getHours();
    } else if (method === 'morning') {
        currentHour = 7;
    } else if (method === 'afternoon') {
        currentHour = 12;
    } else if (method === 'night') {
        currentHour = 19;
    }

    const background = document.querySelector('body');
    background.className = ""; // Remove all properties

    if (currentHour > 6 && currentHour < 12) {
        // Morning
        background.classList.add('background-morning');
        background.classList.add('background-stretch');
        document.querySelector('#morning').checked = true;
    } else if (currentHour >= 12 && currentHour < 19) {
        // Afternoon
        background.classList.add('background-afternoon');
        background.classList.add('background-stretch');
        document.querySelector('#afternoon').checked = true;
    } else {
        // Night
        if (method !== 'manual') {
            background.classList.add('background-night');
            background.classList.add('background-stretch');
            document.querySelector('#night').checked = true;
        }
    }
}

const updateDeleteButtons = () => {
    const deleteButtons = document.querySelectorAll('.delete-task');
    deleteButtons.forEach((button, i) => {
        button.removeEventListener('click', () => { });
    });
    deleteButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
            console.log('click:', i);
            console.log(Array.from(document.querySelectorAll('li'))[i]);
            itemsList.splice(i, 1);

            displayTasks();
        });
    });
};

const displayTasks = () => {
    const list = document.getElementById('todo--tasks-list--items-list');
    // Clear list
    const li = document.querySelectorAll('li');
    li.forEach(element => {
        element.remove();
    })
    // Display list
    itemsList.reverse().forEach((_, i) => {
        list.insertAdjacentHTML('afterbegin', `<li class="todo--tasks-list--item">
            <div class="todo--tasks-list--item--checkbox"></div>
            <div class="todo--tasks-list--item--description">${itemsList[i].task}</div>
            <div class="todo--tasks-list--item--due-date">${itemsList[i].hasOwnProperty('dueDate') ? `<div class="due-date-bubble" style="padding: 2px;">${itemsList[i].dueDate}</div>` : ''}</div>
            <div class="delete-task"><img src="./images/remove.png" alt="" width="16px" height="16px"/>
                <div class="delete-text">Delete</div>
            </div>
        </li>`); // TODO todo--tasks-list--item--description should have a maximum char count to display and not overflow
    });
    itemsList.reverse(); // Back to normal FIXME

    // Checkboxes
    const checkBox = document.querySelectorAll('.todo--tasks-list--item--checkbox');
    checkCheckBox(checkBox);

    // Delete buttons
    updateDeleteButtons();
};

const lineThroughText = (i) => {
    const itemToLineThrough = Array.from(document.querySelectorAll('.todo--tasks-list--item--description'));
    itemToLineThrough[i].classList.toggle('todo--tasks-list--item--description--checked');
};

const checkCheckBox = checkBox => {
    checkBox.forEach((element, i) => {
        if (itemsList[i].completed) {
            element.classList.toggle('todo--tasks-list--item--checkbox--checked');
            lineThroughText(i);
        }
        element.addEventListener('click', function () {
            element.classList.toggle('todo--tasks-list--item--checkbox--checked');
            itemsList[i].completed = !itemsList[i].completed;
            lineThroughText(i);
        });
    });
}

const addNewTask = function () {
    const newTask = {};
    if (document.getElementById('input-task').value !== '') {
        newTask.task = document.getElementById('input-task').value;
        const dueDate = document.getElementById('due-date--input').value;
        if (dueDate !== '') {
            const dueDateArr = dueDate.split('-');
            newTask.dueDate = `${dueDateArr[2]}/${dueDateArr[1]}/${dueDateArr[0]}`;
        }
        newTask.completed = false;
        itemsList.unshift(newTask);

        displayTasks();

        modal.style.display = "none";
        document.getElementById('input-task').value = '';

    } else {
        document.getElementById('input-task').style.border = '1px solid red';
        document.getElementById('input-task').focus();
        setTimeout(() => document.getElementById('input-task').style.border = '1px solid #c9c9c9', 500);
    }
};

// SECTION Initialisation

setBackground('automatic');
displayTasks();

// SECTION Header date

const locale = navigator.language;
const dateOptionsDay = {
    weekday: 'long',
}
const dateOptionsDate = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
}
const day = new Intl.DateTimeFormat(locale, dateOptionsDay).format(new Date());
const date = new Intl.DateTimeFormat(locale, dateOptionsDate).format(new Date());
document.querySelector('#todo--header--today').textContent = day;
document.querySelector('#todo--header--date').textContent = date;

// SECTION Add new task

const addTaskBtn = document.querySelector('#add-task');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const addBtn = document.getElementById('btn-add-task');
const addInput = document.getElementById('input-task');
const currentDate = document.getElementById('due-date--input');
// const today = new Date();

// 'Today' as default on date picker
// currentDate.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

addTaskBtn.onclick = function () {
    modal.style.display = "block";
    document.getElementById('input-task').focus();
}

// When user presses Esc key, exit modal
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape')
        modal.style.display = "none";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function () {
    modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (event) {
    if (event.target === modal)
        modal.style.display = "none";
});

addInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter')
        addNewTask();
});

addBtn.addEventListener('click', function () {
    addNewTask();
});

// SECTION Background on demand

// Event delegation (to prevent repeating the listener function for each element)
document.querySelector('#time-of-day').addEventListener('click', function (e) {
    // e.preventDefault();
    console.log(e);

    // Matching strategy
    if (e.target.value !== undefined) {
        console.log(e.target.value);
        setBackground(e.target.value);
    }
});