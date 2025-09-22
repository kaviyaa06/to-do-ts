"use strict";
// DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const container = document.querySelector(".container");
// Tasks array
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
// Category buttons
const categoryButtons = document.querySelectorAll(".category-btn");
let selectedCategory = "all";
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedCategory = btn.getAttribute("data-category") || "all";
        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTasks();
    });
});
// Category select dropdown for new tasks
const categorySelect = document.createElement("select");
["Work", "Personal", "Other"].forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.toLowerCase();
    option.textContent = cat;
    categorySelect.appendChild(option);
});
document.querySelector(".input-section")?.prepend(categorySelect);
// Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    let filteredTasks = tasks;
    if (selectedCategory !== "all") {
        filteredTasks = tasks.filter(task => task.category === selectedCategory);
    }
    const pendingTasks = filteredTasks.filter(task => !task.completed);
    const completedTasks = filteredTasks.filter(task => task.completed);
    if (pendingTasks.length > 0) {
        const pendingHeader = document.createElement("h2");
        pendingHeader.textContent = "Pending Tasks";
        taskList.appendChild(pendingHeader);
    }
    pendingTasks.forEach(task => {
        const li = createTaskElement(task, tasks.indexOf(task));
        taskList.appendChild(li);
    });
    if (completedTasks.length > 0) {
        const doneHeader = document.createElement("h2");
        doneHeader.textContent = "Completed Tasks";
        taskList.appendChild(doneHeader);
        completedTasks.forEach(task => {
            const li = createTaskElement(task, tasks.indexOf(task));
            taskList.appendChild(li);
        });
        // Clear all completed button
        const clearBtn = document.createElement("button");
        clearBtn.textContent = "Clear All Completed";
        clearBtn.className = "clear-btn";
        clearBtn.addEventListener("click", clearCompletedTasks);
        taskList.appendChild(clearBtn);
    }
}
// Create <li> for a task
function createTaskElement(task, index) {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;
    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleComplete(index));
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteTask(index, li));
    li.appendChild(span);
    li.appendChild(delBtn);
    return li;
}
// Add task
function addTask() {
    const taskText = taskInput.value.trim();
    const taskCategory = (categorySelect.value || "other").toLowerCase();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    const newTask = { text: taskText, completed: false, category: taskCategory };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
}
// Toggle completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}
// Delete with animation
function deleteTask(index, li) {
    li.classList.add("deleting");
    setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }, 300);
}
// Clear completed
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}
// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Event listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter")
        addTask();
});
// Dark mode button
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙 Dark Mode";
document.querySelector(".container")?.prepend(darkModeBtn);
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
// Initial render
renderTasks();
