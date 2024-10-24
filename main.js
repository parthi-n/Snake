/*-------------------------------- Constants --------------------------------*/
const gameEl = document.getElementById("game-area");
const area = 10;

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

// To create game area with area variable
const gameArea = () => {
	for (let i = 0; i < area * area; i++) {
		const square = document.createElement("div");
		square.className = "square";
		gameEl.appendChild(square);
	}
};

gameArea();

// Draw Snake
const drawSnake = () => {
	// Reset game area -- by clearing the class name
	// draw snake  -- ?
	// Draw Food -- ?
};

// Move snake
const moveSnake = () => {
	// Check collision with food
	// Check Collision with self / wall
	// Add length to snake
};

// Generate food
const addFood = () => {
	// add at random place
};

//Game controll

// Change Direction

// GameLoop
const gameLoop = () => {
	//Set interval
};

// Init game
const initGame = () => {
	// Invoke Create game area
	// Invoke generate food
	// invoke game loop
};

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
