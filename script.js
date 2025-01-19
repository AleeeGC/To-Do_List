const list = document.querySelector("ul");

loadTasks();

const addTaskButton = document.getElementById("add-task-button");
const inputField = document.getElementById("input-task");

function addTask(task, checked) {
    if (!task) {
        return;
    }
    list.insertAdjacentHTML("beforeend", `<li>
            <label>
                <input type="checkbox" onclick="saveTasks();" ${checked ? "checked" : ""}><span class="task">${task}</span>
            </label>
            <button class="delete-btn" onClick="this.parentNode.remove(); saveTasks();"><img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg" width="20px" height="20px" alt="Remove task from list"></button>
        </li>`);
    saveTasks();
}

addTaskButton.addEventListener("click", () => {
    let task = inputField.value;
    addTask(task, false);
    inputField.value = "";
});

function saveTasks() {
    let taskList = [];
    document.querySelectorAll("li").forEach((task) => {
        taskList.push([task.querySelector("span").textContent, task.querySelector("input[type='checkbox']").checked]);
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
    let taskList = JSON.parse(localStorage.getItem("tasks"));
    taskList.forEach((pair) => {
        addTask(pair[0], pair[1]);
    })
}