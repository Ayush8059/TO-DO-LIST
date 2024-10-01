const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');
        const undoBtn = document.getElementById('undoBtn'); // Undo button

        let lastTask = null; // Variable to store the last added task

        // Load tasks from localStorage
        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(task => {
                addTaskToDOM(task);
            });
        }

        // Add task to the DOM
        function addTaskToDOM(task) {
            const li = document.createElement('li');
            li.textContent = task;

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn'; // Add class for styling
            deleteBtn.onclick = () => {
                removeTaskFromDOM(task);
                removeTaskFromLocalStorage(task);
            };

            li.appendChild(deleteBtn); // Append delete button to the list item
            taskList.appendChild(li);
        }

        // Add task on button click
        addTaskBtn.addEventListener('click', () => {
            const task = taskInput.value.trim();
            if (task) {
                addTaskToDOM(task);
                saveTaskToLocalStorage(task);
                lastTask = task; // Store the last task added
                taskInput.value = ''; // Clear the input
            }
        });

        // Save task to localStorage
        function saveTaskToLocalStorage(task) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Undo the last task added
        undoBtn.addEventListener('click', () => {
            if (lastTask) {
                removeLastTaskFromDOM(lastTask);
                removeTaskFromLocalStorage(lastTask);
                lastTask = null; // Clear the last task
            }
        });

        // Remove last task from the DOM
        function removeLastTaskFromDOM(task) {
            const items = Array.from(taskList.children);
            for (let i = items.length - 1; i >= 0; i--) {
                if (items[i].textContent.includes(task)) {
                    taskList.removeChild(items[i]);
                    break; // Stop after removing the last occurrence
                }
            }
        }

        // Remove task from the DOM and localStorage
        function removeTaskFromDOM(task) {
            const items = Array.from(taskList.children);
            items.forEach(item => {
                if (item.textContent.includes(task)) {
                    taskList.removeChild(item);
                }
            });
        }

        // Remove task from localStorage
        function removeTaskFromLocalStorage(task) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.filter(t => t !== task);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }

        // Load tasks when the page is loaded
        window.onload = loadTasks;
