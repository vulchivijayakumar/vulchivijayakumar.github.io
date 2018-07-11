let $ = jQuery;
$(function () {
  console.log('I am ready');
  // variables
  let taskInputEle = $('#input_task');
  let addTaskBtn = $('#addTaskBtn');
  let currentTaskBlock = $('#current_task_block');
  let completedTaskBlock = $('#completed_task_block');

  const editSVG = 'Edit';
  const removeSVG = 'Delete';

  addTaskBtn.on('click', function (e) {
    addTask();
    e.preventDefault();
  });

  let addTask = function () {
    var listItem = createTask(taskInputEle.val());
    currentTaskBlock.append(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInputEle.value = '';
  };

  let createTask = function (inputValue) {
    let taskCard = $('<div class="card card-task mb-sm"></div>');
    let inputsGroups = $('<div class="inputs-group"></div>');
    let checkBox = document.createElement('input');
    let label = document.createElement('label');
    let editInput = document.createElement('input');
    let buttonGroups = $('<div class="btns-group"></div>');
    var editButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    label.innerText = inputValue;
    // Each elements, needs appending
    checkBox.type = 'checkbox';
    editInput.type = 'text';
    editButton.innerHTML = editSVG;
    editButton.className = 'edit';
    deleteButton.innerHTML = removeSVG;
    deleteButton.className = 'delete';
    // and appending.
    inputsGroups.append(checkBox);
    inputsGroups.append(label);
    inputsGroups.append(editInput);
    buttonGroups.append(editButton);
    buttonGroups.append(deleteButton);
    taskCard.append(inputsGroups);
    taskCard.append(buttonGroups);
    return taskCard;
  };

  let bindTaskEvents = function (taskListItem, taskCompletedItem) {
    var checkBox = taskListItem.find('input[type=checkbox]');
    var editButton = taskListItem.find('button.edit');
    var deleteButton = taskListItem.find('button.delete');
    editButton.on('click', editTask);
    deleteButton.on('click', deleteTask);
    checkBox.on('click', taskCompletedItem);
  };

  let editTask = function () {
    var listItem = $(this).parent().parent();
    var editInput = listItem.find('input[type=text]');
    var label = listItem.find('label');
    var containsClass = listItem.hasClass('editMode');
    // If class of the parent is .editmode
    if (containsClass) {
      label.text(editInput.val());
    } else {
      editInput.val(label.text());
    }
    listItem.toggleClass('editMode');
  };

  let taskCompleted = function () {
    var listItem = $(this).parent().parent();
    completedTaskBlock.append(listItem);
    bindTaskEvents(listItem, currentTask);
  };

  let deleteTask = function () {
    var listItem = $(this).parent().parent();
    listItem.remove();
  };

  let currentTask = function () {
    var listItem = $(this).parent().parent();
    currentTaskBlock.append(listItem);
    bindTaskEvents(listItem, taskCompleted);
  };
});
