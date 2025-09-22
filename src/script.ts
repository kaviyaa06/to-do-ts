document.addEventListener("DOMContentLoaded", () => {
  interface Task {
    text: string;
    completed: boolean;
  }

  const taskInput = document.getElementById("taskInput") as HTMLInputElement;
  const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
  const taskList = document.getElementById("taskList") as HTMLUListElement;

  let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

  function renderTasks(): void {
    taskList.innerHTML = "";
    tasks.forEach((task: Task, index: number) => {
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

  function addTask(): void {
    const taskText = taskInput.value.trim();
    if (!taskText) {
      alert("Please enter a task!");
      return;
    }
    const newTask: Task = { text: taskText, completed: false };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }

  function toggleComplete(index: number): void {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index: number): void {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addBtn.addEventListener("click", addTask);

  renderTasks();
});
