let $ = jQuery; // $ defined to avoid jslinters to many $ errors.
$(function () {
  // variables
  let taskInputEle = $('#input_task');
  let addTaskBtn = $('#addTaskBtn');
  let currentTaskBlock = $('#current_task_block');
  let completedTaskBlock = $('#completed_task_block');
  let inputTaskError = $('#input_task_error');
  // localStorage
  let myLocalStorage = window.localStorage;
  let clearLocalStorage = $('#clear_localStorage');
  let clearedLocalStorage = $('#cleared_localStorage');
  let browserLocalStorageError = $('#browser_localStorage_status');
  // local storage table names like
  let myLocalStorageTaskCount;
  let currnetTasksObject = {};
  // icons
  const editSVG = '<img src="./img/edit.svg" alt="edit" title="edit"/>';
  const deleteSVG = '<img src="./img/delete.svg" alt="delete" title="delete"/>';
  const editSVGIcon = './img/edit.svg';
  const updatedSVGIcon = './img/update.svg';

  clearLocalStorage.on('click', function (e) {
    window.localStorage.clear();
    clearedLocalStorage.text('Cleared!');
    currentTaskBlock.empty();
    completedTaskBlock.empty();
    setTimeout(function () {
      clearedLocalStorage.text('');
    }, 2000);
    e.preventDefault();
  });

  taskInputEle.on('focus, change', function () {
    inputTaskError.text('');
  });

  // create task
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
    editButton.className = 'edit';
    deleteButton.className = 'delete';
    editButton.innerHTML = editSVG;
    deleteButton.innerHTML = deleteSVG;
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

  let addTask = function () {
    var listItem = createTask(taskInputEle.val());
    myLocalStorageTaskCount = JSON.parse(myLocalStorage.getItem('vj-tasks-count'));
    myLocalStorageTaskCount++;
    myLocalStorage.setItem('vj-tasks-count', myLocalStorageTaskCount);
    var key;
    if (myLocalStorage.getItem('vj-current-tasks')) {
      var myLocalStorageCurrentTask = JSON.parse(myLocalStorage.getItem('vj-current-tasks'));
      key = `task-${myLocalStorageTaskCount}`;
      myLocalStorageCurrentTask[key] = taskInputEle.val();
      myLocalStorage.setItem('vj-current-tasks', JSON.stringify(myLocalStorageCurrentTask));
    } else {
      key = `task-${myLocalStorageTaskCount}`;
      currnetTasksObject[key] = taskInputEle.val();
      myLocalStorage.setItem('vj-current-tasks', JSON.stringify(currnetTasksObject));
    }
    currentTaskBlock.append(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInputEle.val('');
  };

  let editTask = function () {
    var listItem = $(this).parent().parent();
    var editInput = listItem.find('input[type=text]');
    var label = listItem.find('label');
    var containsClass = listItem.hasClass('editMode');
    if (containsClass) {
      let localStorageJson = JSON.parse(myLocalStorage.getItem('vj-current-tasks'));
      for (var x in localStorageJson) {
        if (localStorageJson[x] === label.text()) {
          localStorageJson[x] = editInput.val();
        }
      }
      myLocalStorage.setItem('vj-current-tasks', JSON.stringify(localStorageJson));
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
    var label = listItem.find('label');
    listItem.remove();
    let localStorageJson = JSON.parse(myLocalStorage.getItem('vj-current-tasks'));
    for (var x in localStorageJson) {
      if (localStorageJson[x] === label.text()) {
        delete localStorageJson[x];
        myLocalStorage.setItem('vj-current-tasks', JSON.stringify(localStorageJson));
      }
    }
  };

  let currentTask = function () {
    var listItem = $(this).parent().parent();
    currentTaskBlock.append(listItem);
    bindTaskEvents(listItem, taskCompleted);
  };

  addTaskBtn.on('click', function (e) {
    if (taskInputEle.val() !== '') {
      addTask();
    } else {
      inputTaskError.text('This field can not be empty');
    }
    e.preventDefault();
  });

  // local storage
  if (typeof (Storage) !== 'undefined') {
    if (!myLocalStorage.getItem('vj-tasks-count')) {
      myLocalStorageTaskCount = myLocalStorage.setItem('vj-tasks-count', 0);
    } else {
      myLocalStorageTaskCount = myLocalStorage.getItem('vj-tasks-count');
    }
    if (myLocalStorage.getItem('vj-current-tasks')) {
      let localStorageJson = JSON.parse(myLocalStorage.getItem('vj-current-tasks'));
      for (var task in localStorageJson) {
        var listItem = createTask(localStorageJson[task]);
        currentTaskBlock.append(listItem);
        bindTaskEvents(listItem, taskCompleted);
      }
    }
  } else {
    browserLocalStorageError.text('Sorry! No Web Storage support...');
  }
});
