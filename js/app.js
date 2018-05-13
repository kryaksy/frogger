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
Enemy.prototype.update = function(dt) {
	// dt parameter will ensure the game runs at the same
	// speed for all computers.
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

		player.isActive = false;

		setTimeout(function() {
			player.resetLocation();
			player.reset();
		}, 300);
		this.speed = 0;
		setTimeout(function() {
			this.speed = Math.random() * 600 + 150;
		}.bind(this), 400);

		// TODO: Losing Count ++

	}

	// After reaching the sea, player wins and game restarts
	if (player.y < 50) {

		// TODO: Winning Count ++
		setTimeout(function() {
			player.resetLocation();
			player.reset();
		}, 300);

	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Class
var Player = function(x, y) {
	this.x = x;
	this.y = y;
	
	this.player = 'images/char-boy.png';
	this.isActive = true;
}

// This is necessary
Player.prototype.update = function(dt) {

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

// Player resetting location to initial point
Player.prototype.reset = function() {
	this.x = 3 * 101;
	this.y = 6 * 83 - 10;
	this.isActive = true;
}

// Instantiating your objects.
var enemy1 = new Enemy(0, 60, 100);
var enemy2 = new Enemy(-100, 60 + 83, 200);
var enemy3 = new Enemy(-100, 60 + 83 * 2, 300);
var enemy4 = new Enemy(-200, 60 + 83 * 3, 400);
var enemy5 = new Enemy(0, 60 + 83 * 4, 500);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

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
