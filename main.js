/*-------------------------------- Constants --------------------------------*/
const rightBtnEl = document.getElementById("right");
const leftBtnEl = document.getElementById("left");
const upBtnEl = document.getElementById("up");
const downBtnEl = document.getElementById("down");
const startBtnEl = document.getElementById("start");

console.log(upBtnEl);

const startPoint = document.getElementById("1-1");
console.log(startPoint);

/*---------- Variables (state) ---------*/

// Snake - array with object
let snake = [{ x: 1, y: 1 }];

// Direction
//let direction = right;

// Food postion
let food = { x: 2, y: 2 };

// Score
// let score = 0

// Gameover
// let gameOver = false

/*-------------- Functions -------------*/

const rightBtnClick = () => {
	console.log("clicked");
};

const leftBtnClick = () => {
	console.log("clicked");
};
const upBtnClick = () => {
	console.log("clicked");
};
const downBtnClick = () => {
	console.log("clicked");
};

const startBtnClick = () => {
	console.log("Game started");
	startPoint.classList.add("snake");
};

// start game
const startGame = () => {
	// set snake position

	console.log("test");
	// Food position randomly
	// Initialize game variables and start loop
};

startGame();

// Update Position
// ???

// GrowSnake

// check collions + end game

// check food eaten + add score

// generate food at position

// Set timer for food postion?

// Clear game area

/*----------- Event Listeners ----------*/

// Direction based on key input
rightBtnEl.addEventListener("click", rightBtnClick);
leftBtnEl.addEventListener("click", leftBtnClick);
upBtnEl.addEventListener("click", upBtnClick);
downBtnEl.addEventListener("click", downBtnClick);
startBtnEl.addEventListener("click", startBtnClick);
