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

const loadStartingTasks = () => {
    const startingTasks = Array.from(document.querySelectorAll(".todo--tasks-list--item--description"));

    startingTasks.forEach((element, i) => {
        element.textContent = itemsList[i].task;

    });
}

const lineThroughText = (i) => {
    const itemToLineThrough = Array.from(document.querySelectorAll('.todo--tasks-list--item--description'));
    itemToLineThrough[i].classList.toggle('todo--tasks-list--item--description--checked');
};

// SECTION ToDo list behaviour

loadStartingTasks();

const checkBox = Array.from(document.querySelectorAll('.todo--tasks-list--item--checkbox'));

checkBox.forEach((element, i) => {
    element.addEventListener('click', function () {
        element.classList.toggle('todo--tasks-list--item--checkbox--checked');
        itemsList[i].completed = !itemsList[i].completed;
        lineThroughText(i);
    });
})

// SECTION Add new task

const addTaskButton = document.querySelector('#add-task');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

addTaskButton.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal)
        modal.style.display = "none";
}