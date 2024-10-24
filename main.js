/*-------------------------------- Constants --------------------------------*/
const gameEl = document.getElementById("game-area");
const area = 20; // length of the area

const rightBtnEl = document.getElementById("right");
const leftBtnEl = document.getElementById("left");
const upBtnEl = document.getElementById("up");
const downBtnEl = document.getElementById("down");
const startBtnEl = document.getElementById("start");
const scoreDisplay = document.getElementById("score");

const right = { x: 1, y: 0 };
const left = { x: -1, y: 0 };
const up = { x: 0, y: -1 };
const down = { x: 0, y: 1 };

/*---------- Variables (state) ---------*/
let snake = [{ x: 5, y: 4 }];
let direction = right;
let food = { x: 2, y: 2 };
let score = 0;
let gameOver = false;
let game; // Store the game interval

/*-------------- Functions -------------*/

// Create game area
const gameArea = () => {
	for (let i = 0; i < area * area; i++) {
		const tile = document.createElement("div");
		tile.className = "tile";
		gameEl.appendChild(tile);
	}
};

// Draw Snake
const drawSnake = () => {
	const tiles = document.querySelectorAll(".tile");
	tiles.forEach((tile) => (tile.className = "tile"));

	snake.forEach((seg) => {
		const index = seg.y * area + seg.x;
		tiles[index].classList.add("snake");
	});

	// Draw Food
	const foodPos = food.y * area + food.x;
	tiles[foodPos].classList.add("food");
};

// Move snake
const moveSnake = () => {
	const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

	// Check collision with food
	if (head.x === food.x && head.y === food.y) {
		score++;
		addFood(); // Generate new food
	} else {
		snake.pop(); // Remove last segment if not eating
	}

	// Check Collision with self / wall
	if (head.x < 0 || head.x >= area || head.y < 0 || head.y >= area || snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
		alert(`Game Over! Your score: ${score}`);
		clearInterval(game);
		return;
	}

	// Add new head
	snake.unshift(head);
	scoreDisplay.innerText = score;
	drawSnake();
};

// Generate food
const addFood = () => {
	do {
		food.x = Math.floor(Math.random() * area);
		food.y = Math.floor(Math.random() * area);
	} while (snake.some((segment) => segment.x === food.x && segment.y === food.y));
};

// Initialize game
const initGame = () => {
	snake = [{ x: 5, y: 4 }];
	score = 0;
	direction = right; // Reset direction
	gameOver = false; // Reset gameOver flag
	scoreDisplay.innerText = score;
	drawSnake();
	addFood();
};

// Start game
const startBtnClick = () => {
	console.log("Game started");
	initGame();
	if (game) clearInterval(game); // Clear any existing game loop
	game = setInterval(moveSnake, 500);
};

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

// Initialize game area on page load
gameArea();
