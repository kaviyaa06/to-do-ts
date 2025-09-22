"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `task ${task.completed ? "completed" : ""}`;
            const span = document.createElement("span");
            span.textContent = task.text;
            span.addEventListener("click", () => toggleComplete(index));
            const delBtn = document.createElement("button");
            delBtn.textContent = "Delete";
            delBtn.addEventListener("click", () => deleteTask(index));
            li.appendChild(span);
            li.appendChild(delBtn);
            taskList.appendChild(li);
        });
    }
    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert("Please enter a task!");
            return;
        }
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    addBtn.addEventListener("click", addTask);
    renderTasks();
});
