// menu controller 

var menu_btn = document.querySelector('.menuBtn');
menu_btn.addEventListener('click', function() {
	var getClassName = this.getAttribute('class');
	if(getClassName === "menuBtn") {
		this.className += ' -open ';
	}
	else {
		this.classList.remove('-open');
	}
});

// initial stuff

var container_width = document.querySelector('.container').clientWidth;
var container_height = document.querySelector('.container').clientHeight;
var box_width = (container_width / 10);
var box_height = (container_height / 10);
var empty_box = '';
var set_current_score = document.querySelectorAll('.current-score');
var end_game = document.querySelector('.end-game');
end_game.style.display = 'none';
var app_overlay = document.querySelector('.overlay');
var start_game = document.querySelector('.start-game');
var set_best_score = document.querySelector('.best-score');
var best_score = [];

// user input takes place here.

function startGame() {
	userSelectedLevel();
	if(menu_btn.matches('.-open')) {
		menu_btn.classList.remove('-open');
	}
	// generating 100 div elements
	for (var i=0; i<100; i++) {
		var box = document.createElement('div');
		box.style.width = box_width + 'px';
		box.style.height = box_height + 'px';
		document.querySelector('.container').appendChild(box);
	}

  // collect boxes and do other stuff
	if (level === 'easy-level') {
		var bombs = 6;
		generate_unique_bombs(bombs);
		click_boxes();
	}
	else if (level === 'medium-level') {
		var bombs = 12;
		generate_unique_bombs(bombs);
		click_boxes();
	}
	else if (level === 'difficult-level') {
		var bombs = 18;
		generate_unique_bombs(bombs);
		click_boxes();
	}
	else {
		alert('Something went wrong! Please try after some time. Thank you.');
	}
}

startGame();


function userSelectedLevel() {
	var selected_level = document.querySelectorAll('.level-set li input');
	for(var i=0; i<selected_level.length; i++) {
		if(selected_level[i].checked == true) {
			level = selected_level[i].value;
		}
	}	
}

function generate_unique_bombs(x) {
  var random_numbers = [];
  var random_num = 0;
  for(var i=0; i < x; i++) {
  	random_num = Math.floor(Math.random()*100);
  	if(random_numbers.indexOf(random_num) != -1) {
  		random_num = Math.floor(Math.random()*100);
  		random_numbers.push(random_num);
  	}
  	else {
			random_numbers.push(random_num);
  	}
  }
  // generate bombs
	var divs = document.querySelectorAll('.container div');
  for(var i=0; i<random_numbers.length; i++) {
  	divs[random_numbers[i]].className += ' bomb ';
  }
}

function click_boxes() {
  // click boxes
	var current_score = 0;
	set_current_score[0].textContent = current_score;
	set_current_score[1].textContent = current_score;
  var divs = document.querySelectorAll('.container div');
  for(var i=0; i< divs.length; i++) {
  	divs[i].addEventListener('click', function() {
  		if (!this.matches('.clicked')) {
	  		this.className += ' clicked ';
		  	if (this.matches(' .bomb ')) {
		  		setTimeout(function() {
		  			app_overlay.style.display = "block";
		  			start_game.style.display = "none";
		  			end_game.style.display = "block";
		  			set_current_score[0].textContent = current_score;
			  		set_current_score[1].textContent = current_score;
		  		}, 300);
		  		best_score.push(current_score);
	  			bestScore(best_score);
		  	}
		  	else {
		  		current_score += 5;
		  		set_current_score[0].textContent = current_score;
		  	}
	  	}
  	});
  }
}

function bestScore(data) {
	set_best_score.textContent = Math.max(...data);
}

function gameInit() {
	var existing_boxes = document.querySelector(".container");
	while (existing_boxes.lastChild) {
	  existing_boxes.removeChild(existing_boxes.lastChild);
	}
	app_overlay.style.display = 'none';
  startGame();
}

var start_game_btn = document.querySelectorAll('.startGameBtn');

for(var i=0; i<start_game_btn.length; i++) {
	start_game_btn[i].addEventListener('click', function() {
		gameInit();
	});
}

var game_levels_btn = document.querySelector('.gameLevels');
game_levels_btn.addEventListener('click', function() {
  end_game.style.display = 'none';
  app_overlay.style.display = 'block';
  start_game.style.display = 'block';
  if(menu_btn.matches('.-open')) {
		menu_btn.classList.remove('-open');
	}
});
