// By Damian Demasi (damian.demasi.1@gmail.com) - July 2021

'use strict';

// I'm using OOP here...

class App {
    constructor() {
        this.addTaskBtn = document.querySelector('#add-task');
        this.modal = document.getElementById("myModal");
        this.span = document.getElementsByClassName("close")[0];
        this.addBtn = document.getElementById('btn-add-task');
        this.addInput = document.getElementById('input-task');
        this.currentDate = document.getElementById('due-date--input');
        // this.today = new Date();

        // SECTION Initial test data

        this.itemsList = [
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

        // SECTION Initialisation

        this._init();

        // SECTION Event listeners

        // 'Today' as default on date picker
        // currentDate.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        // When user presses Esc key, exit modal
        document.addEventListener('keydown', this._escModal.bind(this));
        // When the user clicks on <span> (x), close the modal
        this.span.addEventListener('click', this._hideModal.bind(this));
        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener('click', this._clickOutsideModalClose.bind(this));

        // Add new task
        this.addTaskBtn.addEventListener('click', this._showModal.bind(this));
        this.addInput.addEventListener('keydown', this._createTask.bind(this));
        this.addBtn.addEventListener('click', this._addNewTask.bind(this));

        // SECTION Background on demand

        // Event delegation (to prevent repeating the listener function for each element)
        document.querySelector('#time-of-day').addEventListener('click', this._checkForSetBackground.bind(this));
    }

    _checkForSetBackground(e) {
        // e.preventDefault();
        // console.log(e);

        // Matching strategy
        if (e.target.value !== undefined) {
            // console.log(e.target.value);
            this._setBackground(e.target.value);
        }
    }

    _escModal(e) {
        if (e.key === 'Escape')
            this.modal.style.display = "none";
    }

    _clickOutsideModalClose(e) {
        if (e.target === this.modal)
            this.modal.style.display = "none";
    }

    _showModal() {
        this.modal.style.display = "block";
        document.getElementById('input-task').focus();
    }

    _hideModal() {
        this.modal.style.display = "none";
    }

    _createTask(e) {
        if (e.key === 'Enter')
            this._addNewTask();
    }

    _setBackground(method) {
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
            document.querySelector('#morning').checked = true;
        } else if (currentHour >= 12 && currentHour < 19) {
            // Afternoon
            background.classList.add('background-afternoon');
            document.querySelector('#afternoon').checked = true;
        } else {
            // Night
            if (method !== 'manual') {
                background.classList.add('background-night');
                document.querySelector('#night').checked = true;
            }
        }
        background.classList.add('background-stretch');
    }

    _lineThroughText(i) {
        const itemToLineThrough = Array.from(document.querySelectorAll('.todo--tasks-list--item--description'));
        itemToLineThrough[i].classList.toggle('todo--tasks-list--item--description--checked');
    }

    _checkCheckBox(checkBox) {
        const processItem = function (element, i) {
            const toggleCheckBox = function () {
                element.classList.toggle('todo--tasks-list--item--checkbox--checked');
                this.itemsList[i].completed = !this.itemsList[i].completed;
                this._lineThroughText(i);
            }

            if (this.itemsList[i].completed) {
                element.classList.toggle('todo--tasks-list--item--checkbox--checked');
                this._lineThroughText(i);
            }
            element.addEventListener('click', toggleCheckBox.bind(this));
        }

        checkBox.forEach(processItem.bind(this));
    }

    _displayTasks() {
        const list = document.getElementById('todo--tasks-list--items-list');
        // Clear list
        const li = document.querySelectorAll('li');
        li.forEach(element => {
            element.remove();
        })
        // Display list
        this.itemsList.reverse().forEach((_, i) => {
            list.insertAdjacentHTML('afterbegin', `<li class="todo--tasks-list--item">
            <div class="todo--tasks-list--item--checkbox"></div>
            <div class="todo--tasks-list--item--description">${this.itemsList[i].task}</div>
            <div class="todo--tasks-list--item--due-date">${this.itemsList[i].hasOwnProperty('dueDate') ? `<div class="due-date-bubble" style="padding: 2px;">${this.itemsList[i].dueDate}</div>` : ''}</div>
            <div class="delete-task"><img src="./images/remove.png" alt="" width="16px" height="16px"/>
                <div class="delete-text">Delete</div>
            </div>
        </li>`);
        });
        this.itemsList.reverse();

        // Checkboxes
        const checkBox = document.querySelectorAll('.todo--tasks-list--item--checkbox');
        this._checkCheckBox(checkBox);

        // Delete buttons
        this._updateDeleteButtons();
    }

    _updateDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete-task');
        deleteButtons.forEach((button) => {
            button.removeEventListener('click', () => { });
        });
        deleteButtons.forEach((button, i) => {
            button.addEventListener('click', () => {
                // console.log('click:', i);
                // console.log(Array.from(document.querySelectorAll('li'))[i]);
                this.itemsList.splice(i, 1);

                this._displayTasks();
            });
        });
    }

    _addNewTask() {
        const newTask = {};
        const inputTask = document.getElementById('input-task');

        if (inputTask.value !== '') {
            newTask.task = inputTask.value;
            const dueDate = document.getElementById('due-date--input').value;
            if (dueDate !== '') {
                const dueDateArr = dueDate.split('-');
                newTask.dueDate = `${dueDateArr[2]}/${dueDateArr[1]}/${dueDateArr[0]}`;
            }
            newTask.completed = false;
            this.itemsList.unshift(newTask);

            this._displayTasks();

            this.modal.style.display = "none";
            inputTask.value = '';

        } else {

            inputTask.style.border = '1px solid red';
            inputTask.focus();
            setTimeout(() => inputTask.style.border = '1px solid #c9c9c9', 500);
        }
    }

    _setHeaderDate() {
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
    }

    _init() {
        this._setBackground('automatic');
        this._displayTasks();
        this._setHeaderDate();
    }
}

const app = new App();