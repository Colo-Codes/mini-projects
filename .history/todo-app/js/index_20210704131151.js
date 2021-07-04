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

const startingTasks = Array.from(document.querySelectorAll(".todo--tasks-list--item--description"));

startingTasks.forEach((element, i) => {
    element.textContent = itemsList[i].task;
});

// document.querySelector(".todo--tasks-list--item--description").textContent = itemsList[0].task;
