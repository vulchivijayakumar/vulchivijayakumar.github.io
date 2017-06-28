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
var level = 'easy';

function startGame() {

	var current_score = 0;
	set_current_score[0].textContent = current_score;
	set_current_score[1].textContent = current_score;
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

	// setting bomb class
	var divs = document.querySelectorAll('.container div');
	if (level === 'easy') {
	  var random_numbers = [];
	  var random_num = 0;
	  for(var i=0; i<6; i++) {
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
	  for(var i=0; i<random_numbers.length; i++) {
	  	divs[random_numbers[i]].className += ' bomb ';
	  }
	  // click boxes
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
	else if (level === 'medium') {
		console.log('medium');
	}
	else if (level === 'difficult') {
		console.log('difficult');
	}
	else {
		console.log('else level');
	}
}

startGame();

function gameInit() {
	var existing_boxes = document.querySelector(".container");
	while (existing_boxes.lastChild) {
	  existing_boxes.removeChild(existing_boxes.lastChild);
	}
	app_overlay.style.display = "none";
  startGame();
}

var start_game_btn = document.querySelectorAll('.startGameBtn');

for(var i=0; i<start_game_btn.length; i++) {
	start_game_btn[i].addEventListener('click', function() {
		gameInit();
	});
}

function bestScore(data) {
	set_best_score.textContent = Math.max(...data);
}