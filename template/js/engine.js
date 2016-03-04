window.onload = login;

var map;
var ctxMap;

var player;
var ctxPlayer;

var enemy;
var ctxEnemy;

var rate;

var gameWidth = 800;
var gameHeight = 511;

var background = new Image();
background.src = "template/img/bg.png";

var tiles = new Image();
tiles.src = "template/img/player.png";

var ebg = new Image();
ebg.src = "template/img/enemy1.png";

var pl;
var enemises = [];

var wave = 1;

var enemySpeed = 2;

var pauseStatus = 0;

var requestAnimFrame = window.requestAnimFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.msRequestAnimationFrame;

var isPlaying;

var heal;

var audioStatus = 1;

var login;

function login() {
	login = prompt('Введите ваш логин');
	init();
}

function init() {

	document.getElementById('audio').play();

	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	player = document.getElementById("player");
	ctxPlayer = map.getContext("2d");

	enemy = document.getElementById("enemy");
	ctxEnemy = enemy.getContext("enemy");

	var waves = document.getElementById("waves");
	var wavesCtx = waves.getContext("2d");

	enemy.width = gameWidth;
	enemy.height = gameHeight;

	map.width = gameWidth;
	map.height = gameHeight;

	player.width = gameWidth;
	player.height = gameHeight;

	heal = 10;

	pl = new Player();

	DrawBg();
	draw();	
	startloop();

	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
	Spawn(5);
	setInterval(function() {
		Spawn(5);
	}, 8000);
}

function Spawn(count) {
	wave++;
	for(var i = 0; i < getRandom(4, 7); i++) {
		enemises[i] = new Enemy();
	}

}

function loop() {
	if (isPlaying) {
		draw();
		update();
		requestAnimFrame(loop);
	}
}

function startloop() {
	isPlaying = true;
	loop();
}

function stopLoop() {
	document.getElementById('audio').pause();
	isPlaying = false;
}

function draw() {
	pl.draw();
	for(var i = 0; i < enemises.length; i++) {
		enemises[i].draw();
	}
}
function update() {
	pl.update();
	for(var i = 0; i < enemises.length; i++) {
		enemises[i].update();
	}

}

function Player() {
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 0;
	this.drawY = 320;
	this.width = 128;
	this.height = 128;
	this.jump = 0;

	this.isDown;
	this.isUp;
	this.isLeft;
	this.isRight;

	this.speed = 5;
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function Enemy() {
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = getRandom(0, 700);
	this.drawY = getRandom(-512, -60);
	this.width = 50;
	this.height = 50;

	this.speed = 2;
	if (this.speed < 20) {
		if (wave > 3) {
			this.speed =this.speed + wave/5;
			console.log('speed = '+this.speed);	
		}else {
			this.speed = this.speed;
		}
	}
	if(this.speed > 20) {
		this.speed = 18;
	}

}

Enemy.prototype.draw = function() {			
	ctxPlayer.drawImage(ebg, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
};

Enemy.prototype.update = function() {		
	this.drawY += this.speed;
	if (this.drawY >= 512) {
		this.destroy();
	}
};

Enemy.prototype.destroy = function() {
	enemises.splice(enemises.indexOf(this), 1);
};

Player.prototype.draw = function() {
	clearCtxPlayer();
	DrawBg();
	ctxPlayer.drawImage(tiles, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function() {
	updateStats();
	if (this.drawX < 0) {
		this.drawX = 0;
	}
	if (this.drawX > gameWidth - this.width) {
		this.drawX = gameWidth - this.width;
	}

	for (var i = 0; i < enemises.length; i++) {
		if (this.drawX >= enemises[i].drawX && 
			this.drawY >= enemises[i].drawY &&
			this.drawX <= enemises[i].drawX + enemises[i].width &&
			this.drawY <= enemises[i].drawY + enemises[i].height) 
		{
			heal--;
			if (heal < 0) {
				heal = 0;
				gameOver();
			}
			$('#heal').text('Heals - '+heal);
		}	
	}	


	this.navigation();
};


Player.prototype.navigation = function() {
	var curentPosition = this.drawY;
	if (this.drawY != 320) {
		if (curentPosition <= 230) {
			pl.isUp = false;
			console.log('Zalupa');	
			this.drawY = 320;
		}
	}
	if (this.isUp) {
		this.drawY = 230;
	}
	if (this.isDown) {
		this.drawY += this.speed;
	}
	if (this.isLeft) {
		this.drawX -= this.speed;
	}
	if (this.isRight) {
		this.drawX += this.speed;
	}
}

function checkKeyDown(e) {
	var keyId = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyId);

	if (keyChar == 'A') {
		pl.isLeft = true;
		e.preventDefault();
	}

	if (keyChar == 'D') {
		pl.isRight = true;
		e.preventDefault();
	}
}


function checkKeyUp(e) {
	var keyId = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyId);

	if (keyChar == 'W') {
		pl.isUp = false;
		e.preventDefault();
	}

	if (keyChar == 'S') {
		pl.isDown = false;
		e.preventDefault();
	}

	if (keyChar == 'A') {
		pl.isLeft = false;
		e.preventDefault();
	}

	if (keyChar == 'D') {
		pl.isRight = false;
		e.preventDefault();
	}
}

function ClearRect() {
	ctxMap.clearRect(0,0,gameWidth,gameHeight);
}

function clearCtxPlayer() {
	ctxPlayer.clearRect(0,0,gameWidth,gameHeight);
}

function clearCtxEnemy() {
	ctxEnemy.clearRect(0,0,gameWidth,gameHeight);
}

function DrawBg() {
	ctxMap.drawImage(background, 0, 0, 1000, 600,
		0,0, 1000, 600);
}

function restart() {
	location.reload(true)
}

function stopSound() {
	document.getElementById('audio').pause();
	$('#mute').hide();
	$('#unmute').show();
}

function playSound() {
	document.getElementById('audio').play();
	$('#mute').show();
	$('#unmute').hide();
}


function updateStats() {
	
}

function gameOver() {
	document.getElementById('audio').pause();
	document.getElementById('over').play();
	$('#wavesresult').text(wave);
	$.post("index.php", { login: login, wave: wave } );
	$('.result').show();
	stopLoop();
}