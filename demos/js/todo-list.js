let $ = jQuery; // $ defined to avoid jslinters to many $ errors.
$(function () {
  // variables
  let taskInputEle = $('#input_task');
  let addTaskBtn = $('#addTaskBtn');
  let currentTaskBlock = $('#current_task_block');
  let completedTaskBlock = $('#completed_task_block');
  let inputTaskError = $('#input_task_error');

  const editSVG = '<img src="./img/edit.svg" alt="edit" title="edit"/>';
  const deleteSVG = '<img src="./img/delete.svg" alt="delete" title="delete"/>';
  const editSVGIcon = './img/edit.svg';
  const updatedSVGIcon = './img/update.svg';

  taskInputEle.on('focus', function () {
    inputTaskError.text('');
  });

  addTaskBtn.on('click', function (e) {
    // validation input field
    if (taskInputEle.val() !== '') {
      addTask();
    } else {
      inputTaskError.text('This field can not be empty');
    }
    e.preventDefault();
  });

  let addTask = function () {
    var listItem = createTask(taskInputEle.val());
    currentTaskBlock.append(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInputEle.val('');
  };

  let createTask = function (inputValue) {
    let taskCard = $('<div class="card-box"></div>');
    let inputsGroups = $('<div class="inputs-group"></div>');
    let checkBox = document.createElement('input');
    let label = document.createElement('label');
    let editInput = document.createElement('input');
    let buttonGroups = $('<div class="buttons-group"></div>');
    var editButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    label.innerText = inputValue;
    // Each elements, needs appending
    checkBox.type = 'checkbox';
    editInput.type = 'text';
    editButton.innerHTML = editSVG;
    editButton.className = 'edit';
    deleteButton.innerHTML = deleteSVG;
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
    editButton.unbind('click').click(editTask);
    deleteButton.unbind('click').click(deleteTask);
    checkBox.unbind('click').click(taskCompletedItem);
  };

  let editTask = function () {
    var listItem = $(this).parent().parent();
    var editInput = listItem.find('input[type=text]');
    var label = listItem.find('label');
    var containsClass = listItem.hasClass('editMode');
    if (containsClass) {
      listItem.find('button.edit img').attr('src', editSVGIcon);
      label.text(editInput.val());
    } else {
      listItem.find('button.edit img').attr('src', updatedSVGIcon);
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
