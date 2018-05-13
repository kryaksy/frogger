// Enemies our player must avoid
var Enemy = function(x, y, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt;

	// If an enemy is out of screen, it will go back to
	// initial point
	if (this.x > 700) {
		this.x = -Math.random() * 500;
		this.speed = Math.random() * 800 + 150;
	}

	// When collision happens between an enemy and the Player
	// Player turns back to initial point
	if (((this.x - player.x) < 80) &&
		((this.y - player.y) < 40) &&
		((this.x - player.x) > -80) &&
		((this.y - player.y) > -50)) {
		setTimeout(function() {
			player.resetLocation();
		}, 300);
	}
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.player = 'images/char-boy.png';

	this.isActive = true;
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

Player.prototype.handleInput = function(pressedKey) {
	if (this.isActive) {
		if (pressedKey == 'left' && this.x > 0) {
			this.x -= 101;
			console.log(this.x + ', ' + this.y);
		}
		if (pressedKey == 'up' && this.y > 0) {
			this.y -= 83;
			console.log(this.x + ', ' + this.y);
		}
		if (pressedKey == 'right' && this.x < 101 * 6) {
			this.x += 101;
			console.log(this.x + ', ' + this.y);
		}
		if (pressedKey == 'down' && this.y < 83 * 5) {
			this.y += 83;
			console.log(this.x + ', ' + this.y);
		}
	}
}

Player.prototype.resetLocation = function() {
	this.x = 3 * 101;
	this.y = 6 * 83 - 10;
	this.isActive = true;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0, 60, 100);
var enemy2 = new Enemy(-100, 60 + 83, 200);
var enemy3 = new Enemy(-100, 60 + 83 * 2, 300);
var enemy4 = new Enemy(-200, 60 + 83 * 3, 400);
var enemy5 = new Enemy(0, 60 + 83 * 4, 500);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

var player = new Player(3 * 101, 6 * 83 - 10);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});