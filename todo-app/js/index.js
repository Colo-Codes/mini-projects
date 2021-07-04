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

const displayTasks = () => {
    const list = document.getElementById('todo--tasks-list--items-list');
    // Clear list
    const li = document.querySelectorAll('li');
    li.forEach(element => {
        element.remove();
    })
    // Display list
    itemsList.reverse().forEach((element, i) => {
        list.insertAdjacentHTML('afterbegin', `<li class="todo--tasks-list--item">
            <span class="todo--tasks-list--item--checkbox"></span>
            <span class="todo--tasks-list--item--description">${itemsList[i].task}</span>
        </li>`);
    });
    itemsList.reverse(); // Back to normal FIXME

    // Checkboxes
    const checkBox = Array.from(document.querySelectorAll('.todo--tasks-list--item--checkbox'));
    checkCheckBox(checkBox);
};

const lineThroughText = (i) => {
    const itemToLineThrough = Array.from(document.querySelectorAll('.todo--tasks-list--item--description'));
    itemToLineThrough[i].classList.toggle('todo--tasks-list--item--description--checked');
};

const checkCheckBox = checkBox => {
    checkBox.forEach((element, i) => {
        element.addEventListener('click', function () {
            element.classList.toggle('todo--tasks-list--item--checkbox--checked');
            itemsList[i].completed = !itemsList[i].completed;
            lineThroughText(i);
        });
    });
}

displayTasks();

// SECTION Add new task

const addTaskButton = document.querySelector('#add-task');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const add = document.getElementById('btn-add-task');

addTaskButton.onclick = function () {
    modal.style.display = "block";
    document.getElementById('input-task').focus();

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

add.addEventListener('click', function () {
    const newTask = {};
    if (document.getElementById('input-task').value !== '') {
        newTask.task = document.getElementById('input-task').value;
        newTask.dueDate = '10/10/2021'; // TODO get actual dueDate
        newTask.completed = false;
        itemsList.unshift(newTask);
        displayTasks();
        modal.style.display = "none";
        document.getElementById('input-task').value = '';
    } else {
        document.getElementById('input-task').style.border = '1px solid red'; // Fade this down TODO FIXME
        document.getElementById('input-task').focus();
    }
});