// Select the form, input field, task list, and completed task list
const form = document.getElementById('todo-form');
const input = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const completedList = document.getElementById('completedList');
let completedTasks = 0;
let totalTasks = 0;

// Function to add a new task
function addTask(taskText) {
    // Create a new list item
    const li = document.createElement('li');
    // Set the inner HTML of the list item
    li.innerHTML = `
        <span>${taskText}</span>
        <span class="actions">
            <button class="complete-btn"><i class="fas fa-check" style="color:#9E78CF;  cursor:pointer; margin-right:20px; margin-left:150px;"></i></button>
            <button class="delete-btn"><i class="fas fa-trash-alt" style="color:#9E78CF; cursor:pointer;"></i></button>
        </span>
    `;
    // Append the new list item to the task list
    taskList.appendChild(li);
    totalTasks++;
    updateTaskCounter();
}

// Function to update the task counter
function updateTaskCounter() {
    const taskCounter = document.getElementById('taskCounter');
    taskCounter.textContent = `Tasks - ${totalTasks}`;
    taskCounter.style.display = 'block'; // Show the task counter
}

// Function to update the completed task counter
function updateCompletedCounter() {
    const completedCounter = document.getElementById('completedCounter');
    completedCounter.textContent = `Done - ${completedTasks}`;
    completedCounter.style.display = 'block'; // Show the completed task counter
}

// Event listener for form submission
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission
    const taskText = input.value.trim(); // Get the trimmed value of the input field
    if (taskText !== '') { // If the input is not empty
        addTask(taskText); // Add the task
        input.value = ''; // Clear the input field
    }
});


// Function to mark a task as completed
function markAsCompleted(task) {
    task.style.textDecoration = 'line-through'; // Apply a line-through style to mark it as completed
    completedTasks++; // Increment the completed tasks counter
    const doneDiv = document.createElement('div'); // Create a new div for the completed task
    doneDiv.textContent = task.textContent; // Set the text content of the div to the task text
    doneDiv.style.textDecoration = 'line-through'; // Apply a line-through style to the completed task in the "Done" section
    const undoBtn = document.createElement('button'); // Create an undo button
    undoBtn.innerHTML = '<i class="fa fa-undo"  style="color:#9E78CF; cursor:pointer;"></i>'; // Set the inner HTML of the undo button
    undoBtn.classList.add('undo-btn'); // Add a class to the undo button
    doneDiv.appendChild(undoBtn); // Append the undo button to the div
    completedList.appendChild(doneDiv); // Append the div to the completed tasks list
    task.parentElement.remove(); // Remove the task container from the task list
    totalTasks--; // Decrement the task counter
    updateTaskCounter(); // Update the task counter
    updateCompletedCounter(); // Update the completed task counter
    updateCounterVisibility(); // Update the visibility of the task counter
}

// Function to update the visibility of the task counter
function updateCounterVisibility() {
    const taskCounter = document.getElementById('taskCounter');
    if (totalTasks === 0) {
        taskCounter.style.display = 'none'; // Hide the task counter
    } else {
        taskCounter.style.display = 'block'; // Show the task counter
    }
}

// // Event listener for completing or deleting tasks
// document.addEventListener('click', function(e) {
//     if (e.target.classList.contains('complete-btn')) { // If the clicked element is the complete button
//         markAsCompleted(e.target.parentElement.previousElementSibling); // Mark the task as completed
//     } else if (e.target.classList.contains('delete-btn')) { // If the clicked element is the delete button
//         e.target.parentElement.parentElement.remove(); // Remove the task from the task list
//         totalTasks--;
//         updateTaskCounter();
//     }
// });

// Event listener for completing or deleting tasks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('complete-btn') || e.target.parentElement.classList.contains('complete-btn')) { // If the clicked element is the complete button or its parent
        markAsCompleted(e.target.closest('li').querySelector('span')); // Mark the task as completed
    } else if (e.target.classList.contains('delete-btn') || e.target.parentElement.classList.contains('delete-btn')) { // If the clicked element is the delete button or its parent
        e.target.closest('li').remove(); // Remove the task from the task list
        totalTasks--;
        updateTaskCounter();
    } else if (e.target.classList.contains('undo-btn') || e.target.parentElement.classList.contains('undo-btn')) { // If the clicked element is the undo button or its parent
        const taskText = e.target.closest('div').textContent.trim(); // Get the text content of the completed task
        markAsUndone(taskText); // Mark the task as undone
        e.target.closest('div').remove(); // Remove the completed task from the completed tasks list
    }
});

// Function to mark a task as undone
function markAsUndone(taskText) {
    addTask(taskText); // Add the task back to the task list
    completedTasks--; // Decrement the completed tasks counter
    updateCompletedCounter(); // Update the completed task counter
    if (completedTasks === 0) {
        document.getElementById('completedCounter').style.display = 'none'; // Hide the "Done - 0" counter
    }
}

// Event listener for undoing a completed task
completedList.addEventListener('click', function(e) {
    if (e.target.classList.contains('undo-btn')) { // If the clicked element is the undo button
        const taskText = e.target.parentElement.textContent.trim(); // Get the text content of the completed task
        markAsUndone(taskText); // Mark the task as undone
        e.target.parentElement.remove(); // Remove the completed task from the completed tasks list
    }
});