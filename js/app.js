// Enemies our player must avoid
var Enemy = function(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	// The image/sprite for our enemies, this uses
	// a helper to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// dt parameter will ensure the game runs at the same
// speed for all computers.
Enemy.prototype.update = function(dt) {
	this.x += this.speed * dt;
	this.reProduce();
	this.collision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// If an enemy is out of screen, it will go back to
// initial point
Enemy.prototype.reProduce = function() {
	if (this.x > 700) {
		this.x = -100 - 900 * Math.random();
		this.y = 60 + 83 * Math.floor(Math.random() * 5);
		this.speed = Math.random() * 600 + 150;
	}
}

// When collision happens between an enemy and the Player
// Player turns back to initial point
Enemy.prototype.collision = function() {
	if (((this.x - player.x) < 80) &&
		((this.y - player.y) < 40) &&
		((this.x - player.x) > -80) &&
		((this.y - player.y) > -50) &&
		!player.collided) {

		player.collided = true;
		player.hearts--;
		player.isActive = false;
		player.player = 'images/char-boy-burned.png';
		player.updateHearts();

		this.speed = 0;

		setTimeout(function() {
			player.resetPlayer();
		}, 300);

		setTimeout(function() {
			this.speed = Math.random() * 600 + 150;
		}.bind(this), 400);

	}
}

// Player Class
var Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.isActive = true;
	this.score = 0;
	this.hearts = 3;
	this.collided = false;
	this.howMuchWin = 0;

	this.player = 'images/char-boy.png';
}

// This is necessary
Player.prototype.update = function(dt) {
	this.success();
}

// Rendering player
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

// Player Controlling
Player.prototype.handleInput = function(pressedKey) {
	if (this.isActive) {
		if (pressedKey == 'left' && this.x > 0) {
			this.x -= 101;
		}
		if (pressedKey == 'up' && this.y > 0) {
			this.y -= 83;
		}
		if (pressedKey == 'right' && this.x < 101 * 6) {
			this.x += 101;
		}
		if (pressedKey == 'down' && this.y < 83 * 5) {
			this.y += 83;
		}
		this.updateScore();
	}
}

// Calculating score, each time player moves
Player.prototype.updateScore = function() {
	let tempA = this.x / 101,
		tempB = (this.y + 10) / 83;
	const scoreArray = [
		[8, 7, 6, 5, 4, 3, 2],
		[35, 34, 33, 32, 31, 30, 29],
		[28, 27, 26, 25, 24, 23, 22],
		[21, 20, 19, 18, 17, 16, 15],
		[14, 13, 12, 11, 10, 9, 8],
		[7, 6, 5, 4, 3, 2, 1],
		[0, 0, 0, 0, 0, 0, 0]
	]

	if (tempB == 0) {
		this.score *= scoreArray[tempB][tempA];
	} else {
		this.score += scoreArray[tempB][tempA];
	}
	this.updateHTML();
}

// Resets the player
Player.prototype.resetPlayer = function() {
	this.x = 3 * 101;
	this.y = 6 * 83 - 10;
	this.isActive = true;
	this.player = 'images/char-boy.png';
	this.collided = false;
	this.updateScore();

	// If all hearts finished, game ends
	if (!this.hearts) {
		let scrBrd = document.getElementById('scoreBoard');
		const scrBrdCache = scrBrd.innerHTML;
		if (!this.howMuchWin) {
			scrBrd.innerHTML = "Game Over!";
			scrBrd.setAttribute('class', 'lost');
			this.isActive = false;

			setTimeout(function() {
				scrBrd.innerHTML = scrBrdCache;
				scrBrd.removeAttribute('class', 'lost');
				this.isActive = true;
				this.score = 0;
				this.hearts = 3;

				this.resetPlayer();
				this.updateScore();
			}.bind(this), 2000)
		} else {
			scrBrd.innerHTML = "Congratulations!";
			scrBrd.setAttribute('class', 'win');
			this.isActive = false;

			setTimeout(function() {
				scrBrd.innerHTML = "<div class = 'black'>" + this.score + " pt.<div>"
			}.bind(this), 1000)

			setTimeout(function() {
				scrBrd.innerHTML = scrBrdCache;
				this.isActive = true;
				scrBrd.removeAttribute('class', 'win');
				this.score = 0;
				this.hearts = 3;
				this.howMuchWin = 0;

				this.resetPlayer();
				this.updateScore();
			}.bind(this), 2000)
		}
	}
}

// This one will update all HTML elements
Player.prototype.updateHTML = function() {
	let scr = document.getElementById('score');
	let zeroCount = 4 - this.score.toString().length;
	let zeroString = '';
	for (var i = 0; i < zeroCount; i++) {
		zeroString += '0';
	}

	scr.innerHTML = zeroString + '' + this.score;
	this.updateHearts();
}

// After reaching the sea, player wins and game restarts
Player.prototype.success = function() {
	if (this.y < 50) {
		this.isActive = false;
		this.player = 'images/char-boy-cool.png';
		this.howMuchWin++;

		setTimeout(function() {
			this.resetPlayer();
		}.bind(this), 300);
	}
}

// This function gets hearts element and hearts count
// and updates html
Player.prototype.updateHearts = function() {
	let hrts = document.getElementById('hearts');
	let img = hrts.getElementsByTagName('img')
	if (player.hearts > 0) {
		img[0].src = "images/Heart.png";
		if (player.hearts > 1) {
			img[1].src = "images/Heart.png";
			if (player.hearts > 2) {
				img[2].src = "images/Heart.png";
			} else {
				img[2].src = "images/Heart-passive.png";
			}
		} else {
			img[1].src = "images/Heart-passive.png";
		}
	} else {
		img[0].src = "images/Heart-passive.png";
	}
}

//Generate enemies and push them into allEnemies array
function enemyGenerator() {
	let x = -Math.random() * 600 - 100,
		y = 60 + 83 * Math.floor(Math.random() * 4),
		speed = Math.random() * 600 + 150;
	allEnemies.push(new Enemy(x, y, speed));
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Instantiating your objects.
while (allEnemies.length < 7) {
	enemyGenerator();
}

// Place the player object in a variable called player
var player = new Player(3 * 101, 6 * 83 - 10);

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});