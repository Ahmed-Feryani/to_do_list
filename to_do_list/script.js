const taskInput = document.querySelector(".task-input");
const addBtn = document.querySelector(".add-btn");
const removeAllDoneBtn = document.querySelector(".btn-remove-done");
const box = document.querySelector(".box");
const modalBtn = document.querySelector(".modal-btn");
const backDrop = document.querySelector(".back-drop");
const modal = document.querySelector(".modal");
const titleInputEl = document.querySelector(".title");
const descriptionInputEl = document.querySelector(".description");
let toDoList = [];

function renderTasks(list) {
  box.innerHTML = "";
  if (!list.length) {
    box.classList.remove("visible");
  }
  list.forEach((task) => {
    const cardItem = document.createElement("li");
    const toDoCard = `<div class="card ${task.isDone ? "is-done" : ""}">
                        <div class="card-header">
                          <h4>${task.title}</h4>
                          <div class="card-actions">
                            <i class="fa fa-trash delete-btn" aria-hidden="true"></i>
                            ${
                              !task.isDone
                                ? "<button class = 'done-btn btn btn-success'>done</button>"
                                : "<button class='done-btn btn btn-danger'>Undo</button>"
                            } 
                          </div>
                        </div>
                        <p class="card-body">
                            ${task.description}
                        </p>
                      </div>`;
    cardItem.innerHTML = toDoCard;
    box.appendChild(cardItem);
    const delBtnEl = cardItem.querySelector(".card .delete-btn");
    delBtnEl.addEventListener("click", () => delTask(task.id));
    const isDoneBtn = cardItem.querySelector(".card .done-btn");
    isDoneBtn.addEventListener("click", () =>
      isDone(task.id, cardItem.querySelector(".card"))
    );
  });
}

function toggelModal() {
  backDrop.classList.toggle("visible");
  modal.classList.toggle("visible");
}

function addTask() {
  if (!titleInputEl.value && !descriptionInputEl.value) {
    alert("Enter somthing at least");
    return;
  }
  box.classList.add("visible");
  const task = {
    id: Date.now(),
    title: titleInputEl.value,
    description: descriptionInputEl.value,
    isDone: false,
  };
  titleInputEl.value = "";
  descriptionInputEl.value = "";
  toDoList.push(task);
  renderTasks(toDoList);
}

function delTask(id) {
  const taskIndex = toDoList.findIndex((task) => id === task.id);
  toDoList.splice(taskIndex, 1);
  renderTasks(toDoList);
}

function isDone(id) {
  const taskIndex = toDoList.findIndex((task) => id === task.id);
  toDoList[taskIndex].isDone = !toDoList[taskIndex].isDone;
  renderTasks(toDoList);
}

function removeAllDone(list) {
  toDoList = list.filter((task) => !task.isDone);
  renderTasks(toDoList);
}


removeAllDoneBtn.addEventListener("click", () => removeAllDone(toDoList));
modalBtn.addEventListener("click", toggelModal);
backDrop.addEventListener("click", toggelModal);
addBtn.addEventListener("click", () => {
  addTask();
  toggelModal();
});
