/*-------------------------------- Constants --------------------------------*/
const gameEl = document.getElementById("game-area");
const size = 30; // length of the area

const rightBtnEl = document.getElementById("right");
const leftBtnEl = document.getElementById("left");
const upBtnEl = document.getElementById("up");
const downBtnEl = document.getElementById("down");
const startBtnEl = document.getElementById("start");
const pauseBtnEl = document.getElementById("pause");
const restartBtnEl = document.getElementById("restart");
const scoreDisplay = document.getElementById("score");
const wallCheckboxEl = document.getElementById("wall");
const snakeBodyEl = document.getElementsByClassName("s-body");

const right = { x: 1, y: 0 }; // Right movement
const left = { x: -1, y: 0 }; // Left movement
const up = { x: 0, y: -1 }; // Up movement
const down = { x: 0, y: 1 }; // Down movement

const bodyClassID = [1, 2, 3, 4, 5];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFBD33"];

const foodAvlTime = 5000;

/*---------- Variables (state) ---------*/
let snake = [{ x: 0, y: 0 }]; // Initial Snake position
let direction = right; // Initial direction
let food = { x: 5, y: 0 }; // Initial direction
let score = 0; // Initial Score
let game; // Store the game interval
let gamePaused = false;
let wallsEnabled = false;
let foodTimer;

/*-------------- Functions -------------*/

// Create Game Area
const gameArea = () => {
	gameEl.style.width = `${size * 20}px`;
	gameEl.style.height = `${size * 20}px`;
	gameEl.style.gridTemplateColumns = `repeat(${size}, auto)`;
	gameEl.style.gridTemplateRows = `repeat(${size}, auto)`;

	for (let i = 0; i < size * size; i++) {
		const tile = document.createElement("div");
		tile.className = "tile";
		gameEl.appendChild(tile);
	}
};

// Draw Snake
const drawSnake = () => {
	const tiles = document.querySelectorAll(".tile");
	tiles.forEach((tile) => (tile.className = "tile"));

	snake.forEach((seg, index) => {
		const tilePos = seg.y * size + seg.x;
		tiles[tilePos].classList.add("snake"); // Add "snake" class to all segments
		if (index === 0) {
			tiles[tilePos].classList.add("s-head"); // Add "head" class to the first segment
		} else {
			tiles[tilePos].classList.add("s-body"); // Add "body" class to all segments after the first
		}
	});

	for (let i = 0; i < snakeBodyEl.length; i++) {
		// Generate a random index to pick a suffix
		const randomIndex = Math.floor(Math.random() * bodyClassID.length);
		const randomClass = `b-${bodyClassID[randomIndex]}`;

		// Add the random class to the element
		snakeBodyEl[i].classList.add(randomClass);
	}

	// Draw Food
	const foodPos = food.y * size + food.x;
	tiles[foodPos].classList.add("food");
};

// Generate food
const addFood = () => {
	do {
		food.x = Math.floor(Math.random() * size);
		food.y = Math.floor(Math.random() * size);
	} while (snake.some((segment) => segment.x === food.x && segment.y === food.y));
};

// Check Wall contact
const checkWall = (head) => {
	if (wallsEnabled && (head.x < 0 || head.x >= size || head.y < 0 || head.y >= size)) {
		console.log("Wall contact");
		return true;
	}
	return false;
};

// Check self contact
const selfCollision = (head) => {
	if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
		console.log("self collision");
		return true; // Collision detected
	}
	return false; // No collision
};

// Move Snake
const moveSnake = () => {
	if (gamePaused) return;
	const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

	// Check collision with food
	if (head.x === food.x && head.y === food.y) {
		score++;
		addFood(); // Generate new food
	} else {
		snake.pop(); // Remove last segment if not eating
	}

	// If walls are disabled, wrap around the edges
	if (!wallsEnabled) {
		if (head.x < 0) head.x = size - 1; // Wrap from left to right
		else if (head.x >= size) head.x = 0; // Wrap from right to left
		if (head.y < 0) head.y = size - 1; // Wrap from top to bottom
		else if (head.y >= size) head.y = 0; // Wrap from bottom to top
	} else {
		// Check collision with walls
		if (checkWall(head)) {
			gameOver();
		}
	}

	// Check self collision
	if (selfCollision(head)) {
		gameOver();
	}

	// Add new head
	snake.unshift(head);
	scoreDisplay.innerText = score;
	drawSnake();
};

// Food regenarate

const newFood = () => {
	addFood();
};

// Initialize game
const initGame = () => {
	snake = [
		{ x: 2, y: 0 },
		{ x: 1, y: 0 },
		{ x: 0, y: 0 },
	];
	score = 0;
	direction = right; // Reset direction
	scoreDisplay.innerText = score;
	drawSnake();
	addFood();
};

// Start game
const startBtnClick = () => {
	if (gamePaused) return;
	console.log("Game started");
	initGame();
	wallCheckboxEl.disabled = true;
	startBtnEl.disabled = true;
	if (game) clearInterval(game); // Clear any existing game loop
	game = setInterval(moveSnake, 100);
	foodTimer = setInterval(newFood, foodAvlTime);
	pauseBtnEl.disabled = false;
};

const gameOver = () => {
	//alert(`Game Over! Your score: ${score}`);
	clearInterval(game);
	clearInterval(foodTimer);
	pauseBtnEl.disabled = true;
	wallCheckboxEl.disabled = true;
	startBtnEl.disabled = false;
	return;
};

// Pause game
const pauseBtnClick = () => {
	gamePaused = !gamePaused; // Toggle pause state
	pauseBtnEl.innerText = gamePaused ? "Resume" : "Pause"; // Update button text
};

// // Restart game
// const restartGame = () => {
//     clearInterval(game);
//     clearInterval(foodTimer);
//     initGame(); // Restart game initialization
//     game = setInterval(moveSnake, 100);
//     foodTimer = setInterval(newFood, foodAvlTime); // Restart food timer
//     pauseBtnEl.disabled = false;
//     startBtnEl.disabled = false;
//     wallCheckboxEl.disabled = true;
// };

// Change Direction
const rightBtnClick = () => {
	if (direction.x !== -1) direction = right; // Prevent reversing
};
const leftBtnClick = () => {
	if (direction.x !== 1) direction = left; // Prevent reversing
};
const upBtnClick = () => {
	if (direction.y !== 1) direction = up; // Prevent reversing
};
const downBtnClick = () => {
	if (direction.y !== -1) direction = down; // Prevent reversing
};

/*----------- Event Listeners ----------*/
rightBtnEl.addEventListener("click", rightBtnClick);
leftBtnEl.addEventListener("click", leftBtnClick);
upBtnEl.addEventListener("click", upBtnClick);
downBtnEl.addEventListener("click", downBtnClick);
startBtnEl.addEventListener("click", startBtnClick);
pauseBtnEl.addEventListener("click", pauseBtnClick);
//restartBtnEl.addEventListener("click", restartGame);
wallCheckboxEl.addEventListener("change", () => {
	wallsEnabled = wallCheckboxEl.checked;
});
document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "ArrowRight":
			rightBtnClick();
			break;
		case "ArrowLeft":
			leftBtnClick();
			break;
		case "ArrowUp":
			upBtnClick();
			break;
		case "ArrowDown":
			downBtnClick();
			break;
		case " ":
			startBtnClick();
			break;
	}
});

// Initialize game area on page load
gameArea();
