# Frogger

Frogger is a classic arcade game which is also my fourth project on Udacity Front-end Nanodegree program. It's a game which player has one simple purpose which is reaching sea without collided with moving frogs.

## How to run

1.  Clone this repo
2.  Open index.html with browser

or

1.  [Go to Github Page](https://kryaksy.github.io/frogger)

## How to play

1.  Purpose is reaching the sea without collided with an enemy
2.  Player is allowed to move left, right, up and down with arrow keys
3.  Every time collision occurs, player loses one heart
4.  Every time collision occurs, score will be half of itself
5.  Every block has its own value which is added to the score every time when player comes on that block
6.  Every sea block has its own factor by which score is multiplied every time when player comes on that block

### Game Ends if:

1.  Player has no more heart - game over!
2.  Once player reaches the sea - player wins!

### Block values

| x8  | x7  | x6  | x5  | x4  | x3  | x2  |
| --- | --- | --- | --- | --- | --- | --- |
| +35 | +34 | +33 | +32 | +31 | +30 | +29 |
| +28 | +27 | +26 | +25 | +24 | +23 | +22 |
| +21 | +20 | +19 | +18 | +17 | +16 | +15 |
| +14 | +13 | +12 | +11 | +10 | +9  | +8  |
| +7  | +6  | +5  | +4  | +3  | +2  | +1  |
| 0   | 0   | 0   | 0   | 0   | 0   | 0   |

## Features

-   Enemy-player collides accurately
-   Certain amount of enemies are produced at the start with random x, y positions and random speed values
-   When an enemy goes out of canvas, it simply will be reproduced with new random positions and speed values
-   When an enemy collides with player, enemy slows down for a time and then go on with a new random speed
-   When an enemy collides with player, player will go back to initial position

## Tech Used

-   HTML5/Canvas
-   CSS
-   JavaScript
-   Atom Editor
-   GitKraken
-   Photoshop CC

## Credits

 [Guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).
 [Youtube Video](https://www.youtube.com/watch?v=7PHhRrjgTDA&t)
