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

document.querySelector(".todo--tasks-list--item--description").textContent = itemsList[0].task;

console.log(document.querySelectorAll(".todo--tasks-list--item--description"));