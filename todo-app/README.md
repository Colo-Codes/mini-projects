# Why did I choose to build this project? 🤷‍♂️

Doing courses and tutorials is great, but sometimes is difficult to evaluate how much are we actually learning. Watching video after video and coding along with the instructor gives us very good guidance, but it is not a realistic scenario. In a real-world job, we will have to solve problems and start figuring things out by ourselves (with the help of Google, of course 😉). So, to test how much I was actually learning during the JavaScript course I was doing I decided to make a simple To-Do app in HTML, CSS and vanilla JavaScript.

👉  **You can take a look at the finished live project  [here](https://colo-codes.github.io/mini-projects/todo-app/).** 👈

# What did I want to implement in the project?

As my very first JavaScript project, I decided to apply the following concepts around Object Oriented Programming (OOP):
- Classes
- Properties
- Methods (private and public)

I also wanted to experiment with the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) manipulation, and use [dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat), which had been a synonym of headaches for me in the past on other scripting languages 😖.

Finally, I also wanted to experiment with the whole process of building a website from scratch, starting with the **user stories**, the definition of **features**, and the **design** stage, and finishing with the **testing** and **deployment**, to gain a feel of how much work (and time) was involved in the operation.

# Time harvesting

Speaking about time, to gain insights about how much time the different tasks demanded, and to start gaining experience on calculating how much time projects like this one will take me to complete, I used a time harvesting tool during the whole process.

I used  [Clockify](https://clockify.me/tracker)  for this, as it is my preferred tool and I have been using it for a couple of years now.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1629278115655/5dfJ1t90M.png)

At the end of the project, I could see that the whole undertaking took almost 19 hours to be completed. Apart from the almost one hour of designing on Figma, and almost 2.5 hours of the initial HTML and CSS code, the bulk of the time was allocated between complex CSS and JavaScript coding tasks.

# Workflow

The workflow I chose to follow to build the project looks like this:

**Initial planning**
1. Define user stories
2. Define features based on user stories
3. Create a flow chart linking the features
4. Define the architecture the program will have (due to the simplicity of this project, I skipped this step)

**Design**
1. Search for inspiration
2. Define colour scheme and typography
3. Make a graphic design of the site

**Code**
1. Build HTML structure
2. Build the needed CSS to implement the graphic design into actual code
3. Build JavaScript code to implement the features defined during the initial planning

**Review and deploy**
1. Test for browser compatibility
2. Test for responsiveness
3. Validate HTML and CSS code
4. Deploy the project 

# Initial planning

The initial planning for this project was somewhat simple due to its low complexity.

## User stories

I started by putting myself in the shoes of the users and, thus, I could write the following  [user stories](https://en.wikipedia.org/wiki/User_story):

- As a user, I want to be able to create a new to-do item, specifying a due date, so I can keep track of what I need to do.
- As a user, I want to be able to check off the completed items.
- As a user, I want to be able to delete items, so I can remove unwanted or erroneous tasks.
- As a user, I want to see all the to-do items I have added, even if I reload the page (actually, this user story was born from the feedback I received on the application).

## Defining features

Based on the previously defined user stories, I proceeded to determine the features that the To-Do app will implement. I also include some *nice to have* features to improve the user experience.

- Show the current date.
- Creation of to-do items, including the due date.
- Completion of to-do items.
- Deletion of to-do items.
- Storage of to-do items on user's device.
- Change background gradient according to time of day.
- Responsive design (mobile-first).

## Going visual: making a flowchart

Having all the features written down is great, but I have found that usually looking to a graphical representation of the features shines more light on how the application should behave. This is why I built the following flowchart.

![to-do-app-diagram.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1629348490259/18tJ433ff.png)

## Defining tasks on Kanban board

I decided to use a framework to address the defined features and start working on them. In this case, I chose to use a Kanban board, because the project is fairly simple and because I have experience managing projects on this type of board. I could have used an Agile framework, but I don't have experience with it.

I used   [ClickUp](https://app.clickup.com/) for building the Kanban board, but I could have chosen [Asana](https://app.asana.com/), [Trello](https://trello.com/en), [Notion](https://www.notion.so/), or [GitHub Projects](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards). I chose ClickUp because I wanted to learn how to use it, and the free version of it showed some promising features.

It's worth mentioning that I also included the project workflow in the Kanban board, so I could keep track of all the needed actions to complete the project, from the initial planning stage to the final deployment.

I started by inputting all the tasks that were related to the project, and assigning the correspondent tag to each task:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1629351424520/dU3eeB_7S.png)

All the tasks were assigned to the "TO DO" column, making them available to start working on them.

During the project, the Kanban board was useful to keep track of what needed to get done. This is a snapshot of how it looked during the project:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1629351523486/bBA1Gpzhs.png)

You can take a closer look at the board  [here](https://sharing.clickup.com/b/h/6-42668765-2/da4e8c82f7edfa4).

# Design

I'm not a design expert, and my main focus on this project was set on the code side of the application. That being said, I often do my best effort to come up with a design that is pleasing to the eye, always keeping in mind the importance of a good user experience.

## Searching for inspiration

As I didn't want to allocate too much time to this phase, hence I googled to-do lists designs to jump-start my design inspiration. I came across several great designs, and I decided to take inspiration from the [Apple Reminders app](https://www.igeeksblog.com/wp-content/uploads/2021/03/How-to-Use-Reminders-App-on-iPhone-or-iPad-1536x864.jpg):

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1629274587212/vGiAFOhPa.png)

I also got inspired by Sergiu Radu's [work](https://dribbble.com/shots/2417288-Todo-List-Day-42-dailyui):

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1629274678003/KfaismtX-.png)
 
## Defining the colour scheme and fonts

Next, I decided to use warm colours for the app, so I search for some cool gradients on  [uiGradients](https://uigradients.com/)  ( [this](https://uigradients.com/#KingYna)  is my favourite! 😎).

Regarding fonts, I used  [Google fonts](https://fonts.google.com/specimen/Comfortaa?query=Comfortaa)  to get the Comfortaa font for its Apple-like look.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1629274940612/VdrgQHOzI.png)

## Designing for desktop and mobile

To make the actual design I used  [Figma](https://www.figma.com/). In it, I combined the ideas that I gathered from the previous step, and the design ended up [looking like this](https://www.figma.com/file/NhKLKYmIqJ6HwsujA8IVLx/ToDo-app?node-id=1%3A2) :

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1629275236694/OEP_BKLFK.png)

I focused on doing just one design that could work on a desktop computer as well as on a mobile device because I wanted to make focus on the JavaScript section of the project and not so much on dealing with responsiveness.

# Coding the foundations: HTML, CSS and JavaScript

## Starting point: HTML

Once I had a clear idea of what I needed to do, I started working on the HTML by defining the semantic elements I was going to use, and the classes I most likely was going to need.

You can take a look at the code  [here](https://github.com/Colo-Codes/mini-projects/tree/main/todo-app).

The classes names are a bit funny, but more on that on the "Lessons learned" section.

## Going crazy with CSS

As the app had unique design features (I'm looking at you "bottom section of the to-do list" 😠), I spent a great deal of time working on CSS. I must admit that often I find CSS harder than JavaScript, but that might be due to a lack of experience with it.

## Using JavaScript to make everything come to life

Once I had the basics of HTML and CSS in place, I started working on the JavaScript code.

I decided to create a single class called `App` with a constructor containing the buttons used to create, complete and delete tasks, the actual list of items (an array of objects), and all the involved event listeners.

```
class App {
    constructor() {
        this.addTaskBtn = document.querySelector('#add-task');
        this.modal = document.getElementById("myModal");
        this.span = document.getElementsByClassName("close")[0];
        this.addBtn = document.getElementById('btn-add-task');
        this.addInput = document.getElementById('input-task');
        this.currentDate = document.getElementById('due-date--input');

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
// (to be continued...)
```

The `App` class also included a series of private methods that handled the behaviour of the modal that gets activated when a new task is being created, the changing background according to the time of the day, the behaviour of the tasks, the handling of due dates, and the initialisation of the application, among other things.

```
// (...continuing)
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
                this._setLocalStorage();
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

        // Get items from local storage
        this._getLocalStorage();

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

                this._setLocalStorage();
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

            this._setLocalStorage();

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

    _setLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.itemsList));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('tasks'));

        if (!data) return;

        this.itemsList = data;
    }

    _init() {
        this._setBackground('automatic');
        this._displayTasks();
        this._setHeaderDate();
    }
}

const app = new App();
```

# Testing the app and asking for feedback

During the building process, I was constantly testing how the app was behaving. Doing this triggered a series of modifications to the HTML and CSS code.

I asked friends and family to test the app, and they suggested that the items in the task list should be able to remain on the app despite updating the page. This is why I implemented the use of local storage. I included this as a user story for convenience whilst writing this article.

# Publishing

I used Git to keep track of the changes in the project and to be able to publish it on GitHub so I could share it with others.

In this case, I used  [GitHub pages](https://colo-codes.github.io/mini-projects/todo-app/) to deploy and publish the project due to its simplicity and educational purposes, but I could have used  [Netlify](https://www.netlify.com/)  or  [my own hosting](https://www.damiandemasi.com/)  service.

# Lessons learned

Thanks to this project I could have a taste of how much work an application like this one takes.

I learned about the importance of structuring HTML in a meaningful semantic way, and how a good HTML structure can make our lives easy when we start working on CSS and JavaScript in later stages of the project.

I underestimated CSS 😅. The classes names are a bit funny and messy, so in the future, I'll try to implement  [BEM notation](http://getbem.com/introduction/)  and maybe  [SASS](https://sass-lang.com/). I discovered that some behaviour that initially thought of was in the realm of JavaScript can easily be achieved with CSS, such as animations on elements.

Regarding JavaScript, this was the first time I coded following the OOP paradigm and, despite feeling a bit out of my element, I now can see the potential that following this paradigm has.

The project has a lot of room for improvement, but I wanted to live it like that to have a "snapshot" of my knowledge and skills up to the point in time where I was working on it.

As always, I'm open to any suggestions you may have about this writing or the project itself.

#html #css #javascript #project #webdevelopment #webdev 
